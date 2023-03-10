import { defineStore } from "pinia";
import listeningService from "../../services/listening.service";
export const listeningQuizStore = defineStore("listening", {
  state: () => ({
    list: [],
    listeningQuiz: {},
    total: null,
  }),
  getters: {},
  actions: {
    async getList(limit, page, isForReference) {
      let res = await listeningService.getList(page, limit, isForReference)
      this.list = res.data.quizzes;
      this.total = res.data.total;
    },
    addQuiz(body) {
      return listeningService.addListeningQuiz(body);
    },
    async getById(id) {
      let res = await listeningService.getById(id);
      this.listeningQuiz = res.data;
    },
    updateQuiz(body, id) {
      return listeningService.updateQuiz(body, id);
    },
    async deleteQuizP(id) {
      let res = await listeningService.deleteQuiz(id);
      this.getList(10,5,true);
    },
    async updateQuizStatus(body) {
      let res = await listeningService.updateQuizStatus(body);
      this.list = res.data.quizzes;
      this.total = res.data.total
    }
  },
});
