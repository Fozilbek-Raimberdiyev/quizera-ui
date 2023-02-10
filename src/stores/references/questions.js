import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import questionsService from "../../services/questions.service";
export const questionStore = defineStore("question", {
  state: () => ({ questions: [], answers: [], total: "" }),
  actions: {
    async getQuestions(subjectId, limit, page, boolean, subject) {
      let res = await await questionsService.getQuestions(
        subjectId,
        limit,
        page,
        boolean,subject
      );
      let questions = res.data?.questions;
      questions.forEach((q, i) => {
        return (q["number"] = i + 1);
      });
      this.questions = questions;
      this.total = res.data?.total;
    },
    async addQuestion(body) {
      return questionsService.addQuestion(body);
    },
    async checkTests(body) {
      let res = await questionsService.checkTests(body);
      this.answers = res.data;
    },
  },
});
