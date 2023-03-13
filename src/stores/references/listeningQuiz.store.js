import { defineStore } from "pinia";
import listeningService from "../../services/listening.service";
export const listeningQuizStore = defineStore("listening", {
  state: () => ({
    list: [],
    listeningQuiz: {},
    total: null,
    loading : false
  }),
  getters: {},
  actions: {
    async getList(limit, page, isForReference) {
      this.loading = true
      let res = await listeningService.getList(page, limit, isForReference)
      this.list = res.data.quizzes;
      this.total = res.data.total;
      this.loading = false
    },
    addQuiz(body) {
      return listeningService.addListeningQuiz(body);
    },
    async getById(id) {
      this.loading = true
      let res = await listeningService.getById(id);
      this.listeningQuiz = res.data;
      this.loading = false
    },
    updateQuiz(body, id) {
      return listeningService.updateQuiz(body, id);
    },
    async deleteQuizP(id) {
      this.loading = true
      let res = await listeningService.deleteQuiz(id);
      this.getList(10,5,true);
      this.loading = false
    },
    async updateQuizStatus(body) {
      this.loading = true
      let res = await listeningService.updateQuizStatus(body);
      this.list = res.data.quizzes;
      this.total = res.data.total
      this.loading = false
    }
  },
});
