<template>
  <div class="wrapper">
    <form ref="formEl" @submit.prevent="submit">
      <div :class="[smallScreen ? 'block' : 'flex  box items-start']">
        <label for="name">
          <span class="title"
            >Sinov nomini kiriting<i class="bx bxs-star"></i
          ></span>
          <a-input
            v-model:value="form.name"
            name="name"
            :value="form.name"
            placeholder="Fan nomini kiriting..."
            style="position: relative"
          >
            <template #prefix>
              <CheckOutlined v-if="!v$.form.name.$error" />
              <a-tooltip v-else title="Extra information">
                <info-circle-outlined style="color: red" />
              </a-tooltip>
            </template>
          </a-input>
          <span style="color: red" v-if="v$.form.name.$error"
            >Maydon to'ldirilishi shart...</span
          >
        </label>
        <label class="components-input-demo-presuffix" for="time">
          <span class="title"
            >Sinovga ajratiladigan daqiqani kiriting<i class="bx bxs-star"></i
          ></span>
          <a-input-number
            name="time"
            :value="form.time"
            placeholder="Ajratiladigan vaqtni kiriting(daqiqa hisobida)"
            v-model:value="form.time"
            :controls="false"
            style="width: 100%"
            :min="0"
            :max="60"
          >
            <template #addonBefore>
              <CheckOutlined v-if="!v$.form.time.$error" />
              <a-tooltip v-else title="Extra information">
                <info-circle-outlined style="color: red" />
              </a-tooltip>
            </template>
          </a-input-number>
          <span style="color: red" v-if="v$.form.time.$error"
            >Maydon to'ldirilishi shart...</span
          >
        </label>
        <label class="flex items-center justify-between">
          <div>
            <span class="title">Sinov ishtirokchilarini tanlang</span>
            <n-select
              v-model:value="form.members"
              multiple
              name="members"
              :value="form.members"
              filterable
              placeholder="Search users"
              :options="usersList"
              :loading="loading"
              clearable
              :style="{
                'width: 225px': !smallScreen,
                'width : 200px': smallScreen,
              }"
              remote
              :disabled="form.isForAll"
              :clear-filter-after-select="false"
              @search="remoteMethod"
            />
          </div>
          <el-checkbox
            v-model="form.isForAll"
            name="isForAll"
            title="Hamma uchun belgilash"
            :value="form.isForAll"
          ></el-checkbox>
        </label>
        <label>
          <span class="title">Matnni kiriting<i class="bx bxs-star"></i></span>
          <a-textarea
            placeholder="Sinov matnini kiriting"
            :auto-size="{ minRows: 2, maxRows: 50 }"
            @change="changeText"
          >
            <template #prefix>
              <CheckOutlined v-if="!v$.form.textArray.$error" />
              <a-tooltip v-else title="Extra information">
                <info-circle-outlined style="color: red" />
              </a-tooltip> </template
          ></a-textarea>
          <span style="color: red" v-if="v$.form.textArray.$error"
            >Maydon to'ldirilishi shart...</span
          >
        </label>
        <label v-if="form.textArray.length && isStartedFill">
          <span class="title">Matndagi so'zlar ro'yhati</span>
          <a-tag
            @close="closeTag(index)"
            v-for="(text, index) in form.textArray"
            :key="index"
            closable
            >{{ text.label }}</a-tag
          >
        </label>
        <label v-if="isStartedFill && form.textString">
          <b class="title">Sinov matni</b>
          <div style="overflow-x: auto">
            {{ form.textString }}
          </div>
        </label>

        <label for="password">
          <span class="title">Parolni kiriting</span>
          <div style="display: flex">
            <a-input
              placeholder="Parol kiriting..."
              v-model:value="form.password"
              name="password"
              :value="form.password"
              size="middle"
              id="password"
              :disabled="!form.isHasPassword"
            >
            </a-input>
            <span style="margin-left: 5px">
              <el-checkbox
                style="display: inline-block; margin-top: 0"
                size="large"
                name="isHasPassword"
                :value="form.isHasPassword"
                v-model="form.isHasPassword"
                >Parol qo'yish</el-checkbox
              >
            </span>
          </div>
        </label>
        <label>
          <span class="title">Audioni tanlang<i class="bx bxs-star"></i></span>
          <input
            type="file"
            name="audio"
            accept="audio/mpeg, audio/wav, audio/ogg, audio/midi, audio/webm"
            @change="changeFile"
            id=""
          />
          <div v-if="fileSelected && $route.params.id">
            <span>Fayl tanlangan</span>
            <vue-plyr>
              <audio controls crossorigin playsinline>
                <source :src="form.audioPath" type="audio/mpeg" />
              </audio>
            </vue-plyr>
          </div>
          <span style="color: red; display: block" v-if="!fileSelected"
            >Fayl tanlanishi shart...</span
          >
          <a-modal
            v-model:visible="isNoAccesFileSelected"
            title="Ruxsat etilgan audiolar"
            @ok="isNoAccesFileSelected = false"
          >
            <span>Ushbu audio turlaridan birini tanlang</span>
            <ul class="lists">
              <li><img src="../../../assets/image/mp3.png" alt="" /> mp3</li>
              <li><img src="../../../assets/image/wav.png" alt="" /> wav</li>
              <li><img src="../../../assets/image/ogg.png" alt="" /> ogg</li>
              <li><img src="../../../assets/image/midi.png" alt="" /> midi</li>
              <li><img src="../../../assets/image/webm.png" alt="" /> webm</li>
            </ul>
          </a-modal>
        </label>
      </div>
      <el-button
        v-if="$route.params.id"
        type="primary"
        style="margin-top: 5px"
        class="cursor-pointer"
        native-type="submit"
      >
        Yangilash
      </el-button>
      <el-button
        v-else
        type="primary"
        style="margin-top: 5px"
        class="cursor-pointer"
        native-type="submit"
      >
        Kiritish
      </el-button>
    </form>
  </div>
</template>
  <script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../../stores/references/subject";
import { useVuelidate } from "@vuelidate/core";
import { email, maxLength, minLength, required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { userStore } from "../../../stores/management/user.store";
import AsyncMulSelect from "../../../components/form/AsyncMulSelect.vue";
import auth, { $axios } from "../../../services/auth";
import { CloseBold, Select } from "@element-plus/icons-vue";
import {
  InfoCircleOutlined,
  InfoCircleFilled,
  CheckOutlined,
} from "@ant-design/icons-vue";
import { listeningQuizStore } from "../../../stores/references/listeningQuiz.store";
export default {
  components: {
    AsyncMulSelect,
    CloseBold,
    Select,
    InfoCircleOutlined,
    InfoCircleFilled,
    CheckOutlined,
  },
  data() {
    return {
      v$: useVuelidate(),
      Select,
      CloseBold,
      currentIndex: "",
      isNoAccesFileSelected: false,
      isIncorrectFile: false,
      isDefined: false,
      isEnterednumber: false,
      isClickedSave: false,
      usersList: [],
      isStartedFill: false,
      fileSelected: false,
      search: "",
      form: {
        text: "",
        textArray: [],
        textString: "",
        finalyTextArray: [],
        name: "",
        time: "",
        isStarted: false,
        members: [],
        isForAll: false,
        password: "",
        isHasPassword: false,
      },
      smallScreen: false,
    };
  },
  props: [
    "size",
    "large",
    "small",
    "default",
    "type",
    "primary",
    "info",
    "succes",
    "text",
    "native-type",
    "submit",
    "cancel",
  ],
  validations() {
    return {
      form: {
        name: {
          required,
        },
        time: {
          required,
        },
        textArray: {
          required,
        },
      },
    };
  },
  computed: {
    ...mapState(listeningQuizStore, ["list", "listeningQuiz"]),
    ...mapState(userStore, ["users", "user"]),
  },
  watch: {
    "form.quizCount"(val) {
      if (val) return (this.isDefined = true);
      this.isDefined = false;
    },
    "$route.params.id"(val) {
      if (val) {
        this.setFormData(val);
      } else {
        this.form = {
          name: "",
          time: "",
          quizCount: "",
        };
      }
    },
    "form.isForAll"(value) {
      if (this.$route.params.id) {
        let members = [...this.listeningQuiz?.members] || [
          ...this.form.members,
        ];
        if (value) {
          this.form.members = [];
        } else {
          this.form.members = [...members];
        }
      }
    },
  },
  methods: {
    ...mapActions(listeningQuizStore, [
      // "addSubject",
      // "updateSubject",
      // "getById",
      // "getList",
      "addQuiz",
      "getById",
      "getList",
      "updateQuiz",
      "updateQuizStatus",
      "deleteQuiz",
    ]),
    ...mapActions(userStore, ["getAllUsers"]),
    async submit(e) {
      if (this.isIncorrectFile) {
        this.isNoAccesFileSelected = true;
        return 0;
      }
      this.v$.$validate();
      if (!this.$route.params.id) {
        if (!this.v$.$error) {
          let form = { ...this.form };
          if (!form.isHasPassword) form.password = undefined;
          form.textString = undefined;
          form.finalyTextArray = undefined;
          form.text = form.textArray.map((text) => text.label).join(" ");
          form["authorPathImage"] = this.user.pathImage;
          let members = [...form.members];
          members = members.map((member) => {
            return {
              value: member,
              label: member,
            };
          });
          form.members = members;
          form.fileSelected = undefined;
          form.authorId = this.user._id;
          let formData = new FormData();
          formData.append("audio", e.srcElement[7].files[0]);
          formData.append("form", JSON.stringify(form));
          let res = await this.addQuiz(formData);
          this.$emit("created", res);
          this.$router.push("/references/listening");
          this.getList(10, 5, true);
        }
      } else {
        if (!this.v$.$error) {
          let form = { ...this.form };
          let quizID = form._id;
          form._id = undefined;
          if (!form.isHasPassword) form.password = undefined;
          form.textString = undefined;
          form.finalyTextArray = undefined;
          form.text = form.textArray.map((text) => text.label).join(" ");
          form["authorPathImage"] = this.user.pathImage;
          let members = [...form.members];
          members = members.map((member) => {
            return {
              value: member,
              label: member,
            };
          });
          form.members = members;
          form.fileSelected = undefined;
          form.authorId = this.user._id;
          form.__v = undefined;

          let formData = new FormData();
          formData.append("audio", e.srcElement[7].files[0]);
          formData.append("form", JSON.stringify(form));
          let res = await this.updateQuiz(formData, quizID);
          this.$router.push("/references/listening");
          this.getList(10, 1, true);
        }
      }
    },
    async setFormData(val) {
      await this.getById(val);
      let form = { ...this.listeningQuiz };
      form.members = form.members.map((member) => {
        return member.value;
      });
      this.form = form;
    },
    remoteMethod(query) {
      if (query) {
        this.usersList = this.users.filter((user) => {
          return user.email
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase());
        });
        this.usersList = this.usersList.map((user) => {
          return {
            value: user.email,
            label: user.email,
          };
        });
      }
    },
    changeText(e) {
      this.isStartedFill = true;
      this.form.textString = "";
      this.form.textArray = [];
      this.form.finalyTextArray = [];
      let array = e.target.value.trim().split(" ");
      array = array.filter((el) => el);
      this.form.textArray = array.map((el) => {
        return {
          label: el,
          isVisible: true,
          value: "",
        };
      });
    },
    closeTag(index) {
      this.form.textArray[index].isVisible = false;
      this.form.textString = this.form.textArray.filter((text, index) => {
        if (text.isVisible) {
          this.form.finalyTextArray[index] = text.label;
        } else {
          this.form.finalyTextArray[index] = "________";
        }
      });
      this.form.textString = this.form.finalyTextArray.join(" ");
    },
    changeFile(e) {
      let types = [
        "audio/mpeg",
        "audio/wav",
        "audio/ogg",
        "audio/midi",
        "audio/webm",
      ];
      if (!types.some((type) => type === e.target.files[0].type)) {
        this.isNoAccesFileSelected = true;
        this.isIncorrectFile = true;
      } else {
        this.isIncorrectFile = false;
      }
      this.fileSelected = e.target.files[0] ? true : false;
    },
  },
  mounted() {
    this.v$.$validate();
  },
  beforeRouteLeave() {
    listeningQuizStore().$patch({ list: [], total: null });
  },
  created() {
    this.getAllUsers();
    if (this.$route.params.id) {
      this.setFormData(this.$route.params.id);
    }
    this.smallScreen = window.innerWidth < 600;

    // this.getById(this.$route.params.id)
  },
  updated() {
    if (this.$route.params.id) {
      if (this.form.audioPath) {
        this.fileSelected = true;
      } else {
        this.fileSelected = false;
      }
    }
  },
};
</script>
  <style scoped lang="scss">
input:active {
  border: 1px solid #409eef !important;
}
.wrapper {
  border-bottom: 1px solid #e3e5e9;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
label {
  flex-basis: 25%;
  margin: 0.5rem 1rem;
  // min-height: 60px;
}
b {
  display: block;
}
.error {
  color: red;
}
.minute:valid {
  border: 1px solid green;
}
.box > label {
  flex-basis: 30%;
}
.title {
  // font-size: 17px;
  display: block;
  // font-weight: 600;
}
.bxs-star {
  display: inline-block;
  color: red;
  font-size: 10px;
  margin-left: 2px;
}
.lists {
  margin: 0;
  padding: 0 5px;
}
.lists img {
  width: 22px;
}
.lists li {
  list-style: none;
  margin: 0;
}
</style>