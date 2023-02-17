import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import subjectService from "../../services/subject.service";
import swal from "sweetalert2";

const Toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", swal.stopTimer);
    toast.addEventListener("mouseleave", swal.resumeTimer);
  },
});
export const subjectStore = defineStore("subject", {
  state: () => ({
    list: [],
    subject: {},
    total: "",
  }),
  getters: {},
  actions: {
    async getList(limit, page) {
      let res = await subjectService.getSubjects(limit, page);
      this.list = res.data.subjects;
      this.total = res.data.total;
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
      this.getList();
      // Toast.fire({
      //   icon: "success",
      //   title: res.data.message,
      // });
      // useToast().success(res.data.message);
    },
  },
});
