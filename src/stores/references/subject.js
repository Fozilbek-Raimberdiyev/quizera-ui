import { defineStore } from "pinia";
import subjectService from "../../services/subject.service";
export const subjectStore = defineStore("subject", {
  state: () => ({
    list: [],
    subject: {},
  }),
  getters: {},
  actions: {
    async getList() {
      let res = await subjectService.getSubjects();
      this.list = res.data;
    },
    addSubject(body) {
      return subjectService.addSubject(body);
    },
    async getById(id) {
      let res = await subjectService.getById(id);
      this.subject = res.data
    },
    updateSubject(body) {
      return subjectService.updateSubject(body);
    },
  },
});
