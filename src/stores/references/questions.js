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
    loading: false,
    loadingById: false,
  }),
  actions: {
    async getQuestions(subjectId, limit, page, boolean, subject, config) {
      let questions = [];
      let res = {};
      try {
        this.loading = true;
         res = await questionsService.getQuestions(
          subjectId,
          limit,
          page,
          boolean,
          subject,
          config
        );
        questions = res.data?.questions || res.data;
        questions.forEach((q, i) => {
          return (q["number"] = i + 1);
        });
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
      this.questions = questions.filter((question) => question);
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
      try {
        this.loadingById = true;
        let res = await questionsService.getById(id);
        this.question = res.data.question;
        this.loadingById = false;
      } catch (e) {
        this.loadingById = false;
        console.error(e);
      }
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
