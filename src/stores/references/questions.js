import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import questionsService from "../../services/questions.service";
export const questionStore = defineStore("question", {
  state: () => ({
    questions: [],
    answers: [],
    total: "",
    sum: null,
    isPassed: null,
    question: {},
    correctAnswersCount: "",
    inCorrectAnswersCount: "",
    notCheckedQuestionsCount: "",
  }),
  actions: {
    async getQuestions(subjectId, limit, page, boolean, subject) {
      let res = await await questionsService.getQuestions(
        subjectId,
        limit,
        page,
        boolean,
        subject
      );
      let questions = res.data?.questions || res.data;
      try {
        questions.forEach((q, i) => {
          return (q["number"] = i + 1);
        });
      } catch (e) {
        console.log(e);
      }
      this.questions = questions.filter(question => question);
      this.total = res.data?.total;
    },
    async addQuestion(body) {
      return questionsService.addQuestion(body);
    },
    async checkTests(body) {
      let res = await questionsService.checkTests(body);
      this.answers = res.data.answers;
      this.sum = res.data.sum;
      this.isPassed = res.data.isPassed;
      this.correctAnswersCount = res.data.correctAnswersCount;
      this.inCorrectAnswersCount = res.data.inCorrectAnswersCount;
      this.notCheckedQuestionsCount = res.data.notCheckedQuestionsCount;
    },
    async getById(id) {
      let res = await questionsService.getById(id);
      this.question = res.data.question;
    },
    async updateQuestion(id, data) {
      let res = await questionsService.updateQuestion(id, data);
      this.question = {};
      // if (res.status >= 200) {
      //   useToast().success(res.data.message);
      // } else {
      //   useToast().error(res.data.message);
      // }
    },
  },
});
