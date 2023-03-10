<template>
  <div class="wrapper">
    <form ref="formEl" @submit.prevent="submit">
      <div :class="[smallScreen ? 'block' : 'flex  box items-start']">
        <label for="name">
          Sinov nomini kiriting
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
          Sinovga ajratiladigan daqiqani kiriting
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
        <label>
          Sinov ishtirokchilarini tanlang
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
            remote
            :disabled="form.isForAll"
            :clear-filter-after-select="false"
            @search="remoteMethod"
          />
        </label>
        <label>
          Hamma uchun belgilash
          <el-checkbox v-model="form.isForAll" name="isForAll" :value="form.isForAll"></el-checkbox>
        </label>
        <label>
          <b>Audioni tanlang</b>
          <input type="file" name="audio" id="" accept="audio" />
        </label>
        <label>
          <b>Matnni kiriting</b>
          <a-textarea
            placeholder="Sinov matnini kiriting"
            :auto-size="{ minRows: 2, maxRows: 50 }"
            @change="changeText"
          />
        </label>
        <label v-if="form.textArray.length && isStartedFill">
          <b>Matndagi so'zlar ro'yhati</b>
          <a-tag
            @close="closeTag(index)"
            v-for="(text, index) in form.textArray"
            :key="index"
            closable
            >{{ text.label }}</a-tag
          >
        </label>
        <label v-if="isStartedFill && form.textString">
          <b>Sinov matni</b>
          <div style="overflow-x: auto">
            {{ form.textString }}
          </div>
        </label>
        <!-- <label v-if="form.textArray && isStartedFill">
          <div v-for="(text, index) in form.textArray" :key="index">
            <span v-if="text.isVisible">{{ text.label }}</span>
            <a-input v-else v-model:value="text.value"></a-input>
          </div>
        </label> -->

        <label for="password">
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
      dialogTableVisible: false,
      currentIndex: "",
      isDefined: false,
      isEnterednumber: false,
      isClickedSave: false,
      usersList: [],
      isStartedFill: false,
      membersFrequency: [],
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
        text : {
          required,
          minLength : minLength(50),
          maxLength : maxLength(1000)
        }
      },
    };
  },
  computed: {
    ...mapState(subjectStore, ["list", "subject"]),
    ...mapState(userStore, ["users", "user"]),
  },
  watch: {
    "form.quizCount"(val) {
      if (val) return (this.isDefined = true);
      this.isDefined = false;
    },
    "form.isDifferent"(val) {
      if (val) {
        this.toModal();
        if (this.numbers.length < this.form.quizCount) {
          for (let i = 1; i < this.form.quizCount?.length; i++) {
            this.numbers.push(i);
          }
        }
      }
    },
    "$route.params.id"(val) {
      if (val) {
        this.setFormData(val);
      } else {
        this.form = {
          name: "",
          time: "",
          quizCount: "",
          isDifferent: false,
          grades: [
            {
              grade: null,
              count: null,
            },
          ],
        };
      }
    },
    "form.isForAll"(value) {
      const members = [...this.form.members];
      if(value) {
        this.form.members = []
      } else {
        this.form.members = [...members];
        console.log(members)
      }
    },
  },
  methods: {
    ...mapActions(subjectStore, [
      "addSubject",
      "updateSubject",
      "getById",
      "getList",
    ]),
    ...mapActions(userStore, ["getAllUsers"]),
    async submit(e) {
      this.v$.$validate();
      if (!this.$route.params.id) {
        if (!this.v$.$error) {
          let form = { ...this.form };
          // let res = await $axios.post("/listeningQuiz/add", formData);
          if (!form.isHasPassword) form.password = undefined;
          form.textString = undefined;
          form.finalyTextArray = undefined
          form.text = form.textArray.map(text => text.label).join(" ")
          form["authorPathImage"] = this.user.pathImage
          let members = [...form.members];
          members = members.map((member) => {
            return {
              value: member,
              label: member,
            };
          });
          form.members = members;
          form.authorId = this.user._id;
          let formData = new FormData()
          formData.append("audio", e.srcElement[4].files[0]);
          formData.append("form",JSON.stringify(form))
          // for (let key in form) {
          //   if (key === "audio") {
          //     formData.append("audio", e.srcElement[4].files[0]);
          //   } else {
          //     formData.append(key, JSON.stringify(form[key]))
          //   }
          // }

          // console.log(formData);
          let res = await $axios.post("/listeningQuiz/add", formData, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });
          this.$emit("created", res);
          this.$router.push("/references/listening");
          this.getList(10, 5, true);
        }
      } else {
        if (!this.v$.$error) {
          let form = { ...this.form };
          let members = [...form.members];
          members = members.map((member) => {
            return {
              value: member,
              label: member,
            };
          });
          form.members = members;
          form._id = undefined;
          form.__v = undefined;
          if (!form.isHasPassword) {
            form.password = undefined;
          }
          form.point = this.countPointSubject;
          let res = await this.updateSubject(form, this.$route.params.id);
          this.$router.push("/references/listening");
          this.getList(10, 5, true);
        }
      }
    },
    toModal() {
      // this.form.quizCount
      if (this.numbers.length < this.form.quizCount) {
        for (let i = 1; i < +this.form.quizCount; i++) {
          this.numbers.push(i);
        }
      }
      this.dialogTableVisible = true;
    },
    plusGradeOption() {
      if (
        this.form.grades[this.form.grades.length - 1].count &&
        this.form.grades[this.form.grades.length - 1].grade
      ) {
        this.form.grades.push({ grade: null, count: null });
      }
    },
    deleteGradeOption(index) {
      if (this.form.grades.length > 1) {
        let temp = [...this.form.grades];
        temp[index] = { grade: null, count: null };
        temp = temp.filter((grade) => grade.grade && grade.count);
        this.form.grades = temp;
      } else {
        let temp = [...this.form.grades];
        temp[index] = { grade: null, count: null };
        this.form.grades = temp;
      }
    },
    saveGradeOption() {
      if (this.sumCountGrades > this.form.quizCount) {
        return useToast().warning(
          "Test miqdoridan ballar bo'yicha biriktirilgan savollar soni oshib ketdi!"
        );
      }
      this.isClickedSave = true;
      let error = [...this.form.grades].map((grade) => {
        if (!grade.count || !grade.grade) {
          return "error";
        }
      });
      if (!error.some((error) => error === "error")) {
        this.dialogTableVisible = false;
      }
    },
    closeModal() {
      if (!this.form.grades.some((grade) => grade.count && grade.grade)) {
        this.form.isDifferent = false;
        this.form.grades = [{ grade: null, count: null }];
      }
    },
    async setFormData(val) {
      await this.getById(val);
      let form = { ...this.subject };
      form;
      form.members = form.members.map((member) => {
        return member.value;
      });
      // form.grades = [{grade : null, count : null}];
      form.isDifferent ? form.isDifferent : (form.isDifferent = false);
      this.form = form;
      // this.form = res;
    },
    // async watch(query) {
    //   this.search = query;
    // },
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
      this.form.textArray.filter((text, index) => {
        if (text.isVisible) {
          this.form.finalyTextArray[index] = text.label;
        } else {
          this.form.finalyTextArray[index] = "________";
        }
      });
      this.form.textString = this.form.finalyTextArray.join(" ");
    },
  },
  mounted() {
    this.v$.$validate();
  },
  beforeRouteLeave() {
    subjectStore().$patch({ list: [], total: null });
  },
  created() {
    this.getAllUsers();
    if (this.$route.params.id) {
      this.setFormData(this.$route.params.id);
    }
    this.smallScreen = window.innerWidth < 600;

    // this.getById(this.$route.params.id)
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
</style>