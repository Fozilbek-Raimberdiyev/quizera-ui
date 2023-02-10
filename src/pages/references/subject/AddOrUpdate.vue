<template>
  <div class="wrapper">
    <form @submit.prevent="submit">
      <div class="input flex justify-between">
        <label for="name">
          Fan nomini kiriting
          <el-input
            v-model="form.name"
            placeholder="Fan nomini kiriting..."
          ></el-input>
          <span style="color: red" v-if="v$.form.name.$error"
            >Maydon to'ldirilishi shart...</span
          >
        </label>
        <label for="limit">
          Test miqdorini kiriting
          <div style="display: flex; align-items: center">
            <el-input
              v-model="form.quizCount"
              type="number"
              placeholder="Savollar sonini kiriting..."
            ></el-input>
            <span style="margin-left: 5px">
              <el-checkbox
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
        <label for="time">
          Testga ajratiladigan daqiqani kiriting
          <el-input
          class="minute"
            v-model="form.time"
            placeholder="Ajratiladigan vaqtni kiriting(daqiqa hisobida)"
          >
          </el-input>
          <span style="color: red" v-if="v$.form.time.$error"
            >Maydon to'ldirilishi shart...</span
          >
        </label>
      </div>
      <el-button
        type="primary"
        style="margin-top: 5px"
        class="cursor-pointer"
        native-type="submit"
      >
        Kiritish
      </el-button>
    </form>

    <!--modal-->
    <el-dialog @close="closeModal" v-model="dialogTableVisible">
      <template #header>
        <h6>Savollarni ball tizimida sonini aniqlash</h6>
      </template>
      <div class="flex justify-between">
        <h6>
          <span :class="{ error: sumCountGrades > form.quizCount }">{{
            sumCountGrades
          }}</span>
          / {{ form.quizCount }}
        </h6>
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
              class="bx bx-trash"
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
          form.grades[form.grades.length - 1].count &&
          form.grades[form.grades.length - 1].grade
        "
        type="primary"
        style="margin-top: 5px"
        class="cursor-pointer"
        >Qo'shish</el-button
      >
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../../stores/references/subject";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
export default {
  data() {
    return {
      v$: useVuelidate(),
      dialogTableVisible: false,
      currentIndex: "",
      isDefined: false,
      isEnterednumber: false,
      isClickedSave: false,
      list: [],
      form: {
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
      },
      grades: [1, 2, 3, 4, 5, 6],
      numbers: [],
    };
  },
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
    ...mapState(subjectStore, ["list"]),
    sumCountGrades() {
      let sum = 0;
      for (let i = 0; i < this.form.grades.length; i++) {
        sum += this.form.grades[i].count;
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
        for (let i = 1; i < this.form.quizCount?.length; i++) {
          this.numbers.push(i);
        }
      }
    },
  },
  methods: {
    ...mapActions(subjectStore, ["addSubject", "updateSubject"]),
    async submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let res = await this.addSubject(this.form);
        this.$emit("created", res);
        this.$router.push("/references/subject");
      }
    },
    toModal() {
      // this.form.quizCount
      for (let i = 1; i < +this.form.quizCount + 1; i++) {
        this.numbers.push(i);
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
      let temp = [...this.form.grades];
      temp[index] = { grade: null, count: null };
      this.form.grades = temp;
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
  },
  mounted() {},
};
</script>
<style scoped>
.wrapper {
  border-bottom: 1px solid #e3e5e9;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
label {
  flex-basis: 25%;
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
</style>