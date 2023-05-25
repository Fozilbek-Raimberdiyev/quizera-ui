<template>
  <div class="wrapper">
    <form @submit.prevent="submit">
      <div :class="[smallScreen ? 'block' : 'flex  box items-start']">
        <label for="name">
          Fan nomini kiriting
          <a-input
            v-model:value="form.name"
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
        <label for="limit">
          Test miqdorini kiriting
          <div style="display: flex">
            <a-input-number
              :controls="false"
              :min="0"
              :max="50"
              style="width: 100%"
              placeholder="Savollar sonini kiriting..."
              v-model:value="form.quizCount"
            >
              <template #addonBefore>
                <CheckOutlined v-if="!v$.form.quizCount.$error" />
                <a-tooltip v-else title="Extra information">
                  <info-circle-outlined style="color: red" />
                </a-tooltip>
              </template>
            </a-input-number>
            <span style="margin-left: 5px">
              <el-checkbox
                style="display: inline-block; margin-top: 0"
                size="large"
                v-if="isDefined"
                v-model="form.isDifferent"
                >Har xil</el-checkbox
              >
            </span>
          </div>
          <span style="color: red" v-if="v$.form.quizCount.$error"
            >Maydon to'ldirilishi shart...</span
          >
        </label>
        <label class="components-input-demo-presuffix" for="time">
          Testga ajratiladigan daqiqani kiriting
          <a-input-number
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
          Test ishtirokchilarini tanlang
          <n-select
            v-model:value="form.members"
            multiple
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
          <el-checkbox v-model="form.isForAll"></el-checkbox>
        </label>
        <label for="password">
          <div style="display: flex">
            <a-input
              placeholder="Parol kiriting..."
              v-model:value="form.password"
              size="middle"
              id="password"
              :disabled="!form.isHasPassword"
            >
            </a-input>
            <span style="margin-left: 5px">
              <el-checkbox
                style="display: inline-block; margin-top: 0"
                size="large"
                v-model="form.isHasPassword"
                >Parol qo'yish</el-checkbox
              >
            </span>
          </div>
        </label>
        <label>
          <span style="display: block" class="title">Fayl tanlang</span>
          <input type="file" name="file" @change="changeFile" />
          <div v-if="$route.params.id && form.audioPath">
            <span>Fayl tanlangan</span>
            <vue-plyr>
              <audio controls crossorigin playsinline>
                <source :src="form.audioPath" type="audio/mpeg" />
              </audio>
            </vue-plyr>
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

    <!--modal-->
    <el-dialog width="80%" @close="closeModal" v-model="dialogTableVisible">
      <template #header>
        <h6>Savollarni ball tizimida sonini aniqlash</h6>
      </template>
      <div class="flex justify-between items-center">
        <h6>
          <span :class="{ error: sumCountGrades > form.quizCount }">{{
            sumCountGrades
          }}</span>
          / {{ form.quizCount }}
        </h6>
        <h5 class="point">{{ countPointSubject }}</h5>
        <el-button
          type="primary"
          class="cursor-pointer"
          @click="saveGradeOption"
          >Saqlash</el-button
        >
      </div>
      <div class="flex" v-for="(grade, index) in form.grades" :key="index">
        <div class="left flex">
          <div>
            <b>Ball</b>
            <el-select
              v-model="grade.grade"
              class="m-2"
              placeholder="Select"
              size="small"
              @change="currentIndex = index"
            >
              <el-option
                v-for="(grade, i) in grades"
                :key="i"
                :label="grade"
                :value="grade"
              />
            </el-select>
          </div>
          <div>
            <b>Soni</b>
            <el-select
              v-model="grade.count"
              class="m-2"
              placeholder="Select"
              size="small"
            >
              <el-option
                v-for="(number, i) in numbers"
                :key="i"
                :label="number"
                :value="number"
              />
            </el-select>
          </div>
          <div
            v-if="form.grades[index]?.grade && form.grades[index]?.count"
            class="right self-end"
            style="margin-left: 5px"
          >
            <i
              @click="deleteGradeOption(index)"
              style="font-size: 1.2rem; color: #409eef"
              class="bx bx-trash cursor-pointer"
            ></i>
          </div>
        </div>
        <span
          class="self-end"
          v-if="isClickedSave && (grade.count == null || grade.grade == null)"
          style="color: red"
          >To'liq to'ldirish lozim</span
        >
      </div>
      <el-button
        @click="plusGradeOption"
        v-if="
          form?.grades[form.grades.length - 1].count &&
          form?.grades[form.grades.length - 1].grade
        "
        type="primary"
        style="margin-top: 5px"
        class="cursor-pointer"
        ><i class="bx bx-plus" style="margin-right: 5px"></i>Qo'shish</el-button
      >
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../../stores/references/subject";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import { userStore } from "../../../stores/management/user.store";
import AsyncMulSelect from "../../../components/form/AsyncMulSelect.vue";
import auth from "../../../services/auth";
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
      membersFrequency: [],
      search: "",
      form: {
        name: "",
        time: "",
        isStarted: false,
        quizCount: "",
        isDifferent: false,
        members: [],
        isForAll: false,
        grades: [
          {
            grade: null,
            count: null,
          },
        ],
        password: "",
        isHasPassword: false,
      },
      grades: [1, 2, 3, 4, 5, 6],
      numbers: [],
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
        quizCount: {
          required,
        },
      },
    };
  },
  computed: {
    ...mapState(subjectStore, ["list", "subject"]),
    ...mapState(userStore, ["users", "user"]),
    sumCountGrades() {
      let sum = 0;
      for (let i = 0; i < this.form.grades.length; i++) {
        sum += this.form.grades[i].count;
      }
      return sum;
    },
    countPointSubject() {
      let grades = [...this.form.grades];
      let sum = 0;
      for (let element of grades) {
        sum += +element.grade * +element.count;
      }
      return sum;
    },
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
    async search(val) {
      // let users = (await auth.getUserByEmail(val)).data;
      // console.log(users);
      // this.usersList = users?.map((user) => {
      //   return { value: user.email, label: user.email };
      // });
    },
    "form.isForAll"(value) {
      try {
        const members = [...this.form.members];
      if (value) {
        this.form.members = [];
      } else {
        this.form.members = [...members];
      }
      } catch(e) {console.log(e)}
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
      console.log(e);
      this.v$.$validate();
      if (!this.$route.params.id) {
        if (!this.v$.$error) {
          try{
            let form = { ...this.form };
          if (!form.isHasPassword) form.password = undefined;
          form.point = this.countPointSubject;
          let members = [...form.members];
          members = members.map((member) => {
            return {
              value: member,
              label: member,
            };
          });
          form.members = members;
          form.authorId = this.user._id;
          let formData = new FormData();
          formData.append("audio", e.srcElement[8].files[0]);
          formData.append("form", JSON.stringify(form));
          let res = await this.addSubject(formData);
          this.$emit("created", res);
          this.$router.push("/references/subject");
          } catch(e) {console.log(e)}
        } 
      } else {
        if (!this.v$.$error) {
          try {
            let form = { ...this.form };
            let members = [...form.members];
            members = members?.map((member) => {
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
            this.$router.push("/references/subject");
          } catch (e) {
            console.log(e);
          }
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