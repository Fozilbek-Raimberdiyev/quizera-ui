<template>
  <div>
    <form @submit.prevent="submit">
      <div class="flex" :class="{ header: subjectId }">
        <p style="margin-right: 5px">Fanni tanlang:</p>
        <el-select
          v-model="subjectId"
          class="m-2"
          placeholder="Select"
          size="small"
        >
          <el-option
            v-for="item in list"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </div>
      <div v-if="subjectId">
        <label for="question">Savolni kiriting</label>
        <el-input
          type="textarea"
          placeholder="Savolni kiriting..."
          v-model="form.question"
          id="question"
        >
        </el-input>
        <span class="error" v-if="v$.form.question.$error"
          >Maydon to'ldirilishi shart</span
        >
      </div>
      <div v-show="subjectId" class="flex justify-between">
        <div class="options">
        <p>Variantlarni kiriting</p>
        <div
          for="questionLabel"
          v-for="(option, index) in form.options"
          :key="index"
          class="flex"
        >
          <label>
            <el-input
              type="textarea"
              :class="{ true: option.isTrue, false: !option.isTrue }"
              class="option"
              rows="1"
              cols="100"
              :placeholder="option.placeholder"
              v-model="option.optionLabel"
              id="questionLabel"
            ></el-input>
          </label>
          <span class="error" v-if="v$.form.options.$each"
            >Maydon to'ldirilishi shart...</span
          >
        </div>
      </div>
      <div class="ball-question">
        <p>Savol balini tanlang</p>
        <el-select
          v-model="form.ball"
          class="m-2"
          placeholder="Select"
          size="small"
        >
          <el-option
            v-for="(grade, i) in subject.grades"
            :key="i"
            :label="grade.grade"
            :value="grade.grade"
          />
        </el-select>
      </div>
      </div>
      <el-button v-if="subjectId" native-type="submit" type="primary"
        >Saqlash</el-button
      >
    </form>
    <div v-if="subjectId" class="list">
      <div v-show="questions?.length">
        <div class="top flex justify-between">
          <h5>Savollar ro'yxati</h5>
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="5"
              v-model:current-page="currentPage"
            />
          </div>
        </div>
        <div
          class="questions"
          v-for="(question, index) in questions"
          :key="index"
        >
          <div class="flex items-center">
            <h6 class="q-number">{{ question?.number }}.</h6>
            <h6>{{ question.question }}</h6>
          </div>
          <p
            class="option"
            v-for="(o, i) in question.options"
            :key="i"
            :class="{ error: !o.isTrue, true: o.isTrue }"
          >
            {{ o.optionLabel }}
          </p>
        </div>
      </div>
      <div v-show="!questions?.length">
        <h6>Savollar mavjud emas!</h6>
       
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../../stores/references/subject";
import { ElMessage, ElNotification } from "element-plus";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { questionStore } from "../../../stores/references/questions";
export default {
  data() {
    return {
      v$: useVuelidate(),
      isSaved : false,
      currentPage: 1,
      subjectId: "",
      items: [],
      form: {
        question: "",
        ball : null,
        options: [
          {
            optionLabel: "",
            isTrue: true,
            placeholder: "Tog'ri variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
        ],
      },
      numbers : [1,2,3,4,5,6],
      currentIndex: "",
    };
  },
  validations() {
    return {
      form: {
        question: {
          required,
        },
        ball : {
          // required
        },
        options: {
          $each: {
            required,
          },
        },
      },
    };
  },
  watch: {
    subjectId() {
      this.getById(this.subjectId)
      this.getQuestions(this.subjectId, 5, this.currentPage, true);
    },
    currentPage() {
      this.getQuestions(this.subjectId,5, this.currentPage, true)
    },
    isSaved() {
      this.getQuestions(this.subjectId,5, this.currentPage,true)
      this.isSaved = false
    }
  },
  computed: {
    ...mapState(subjectStore, ["list", "subject"]),
    ...mapState(questionStore, ["questions", "total"]),
  },
  methods: {
    ...mapActions(subjectStore, ["getList", "getById"]),
    ...mapActions(questionStore, ["addQuestion", "getQuestions"]),
    generetaInput() {
      let lastIndex = this.options.length - 1;
      let value = this.options[lastIndex].optionLabel;
      let form = { ...this.form };
      form.isTrue = false;
      form.optionLabel = "";
      if (value) {
        this.options.push(form);
      } else {
        this.currentIndex = lastIndex;
        ElMessage("Avval bo'sh maydonni to'ldiring...");
      }
    },
    async submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let body = { ...this.form };
        body.subjectId = this.subjectId;
        let res = await this.addQuestion(body);
        this.form.options.map((el) => (el.optionLabel = ""));
        this.form.question = null;
        this.form.ball = null
        this.subjectId = body.subjectId;
        if (res)
        this.isSaved = true
          return ElNotification({
            title: "Succes",
            message: "Succesfully added",
            type: "success",
          });
      }
    },
  },
  mounted() {
    this.getList();
    this.$emit("emit", true);
  },
  created() {},
};
</script>
<style scoped>
.icon {
  background: #409eff;
  margin: 0 5px;
  border-radius: 2px;
  color: #fff;
  padding: 5px 10px;
}
.header {
  border-bottom: 1px solid #e3e5e9;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
/* input.focus:focus {
  border: 1px solid blue;
} */
.option {
  margin: 5px 0;
}
.option.true {
  border: 1px solid greenyellow;
  border-radius: 5px;
}
.option.false {
  border: 1px solid rgb(251, 31, 31);
  border-radius: 5px;
}
span.error {
  color: red;
}
.list {
  border: 1px solid #e3e5e9;
  padding: 10px 3px;
  margin-top: 1rem;
}
form {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}
.questions {
  /* display: flex;
  flex-direction: column-reverse; */
}
.q-number {
  display: flex;
  flex-direction: row-reverse;
}
</style>