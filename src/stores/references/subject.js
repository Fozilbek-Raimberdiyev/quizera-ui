import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import subjectService from "../../services/subject.service";
import swal from "sweetalert2";
export const subjectStore = defineStore("subject", {
  state: () => ({
    list: [],
    subject: {},
    total: "",
    loading: false,
  }),
  getters: {},
  actions: {
    async getList(params) {
      this.loading = true;
      let res = await subjectService.getSubjects(params);
      this.list = res.data.subjects;
      this.total = res.data.total;
      this.loading = false;
    },
    addSubject(body) {
      return subjectService.addSubject(body);
    },
    async getById(id) {
      let res = await subjectService.getById(id);
      this.subject = res.data;
    },
    updateSubject(body, id) {
      return subjectService.updateSubject(body, id);
    },
    async deleteSubjectAndQuestions(id) {
      let res = await subjectService.deleteSubjectAndQuestions(id);
      // Toast.fire({
      //   icon: "success",
      //   title: res.data.message,
      // });
      // useToast().success(res.data.message);
    },
    async updateSubjectStatus(body) {
      let res = await subjectService.updateStatusSubject(body);
    },
  },
});
