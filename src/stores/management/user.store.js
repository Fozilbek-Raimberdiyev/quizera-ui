import { defineStore } from "pinia";
import auth from "../../services/auth";
import router from "../../router";
import { useToast } from "vue-toastification";
export const userStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || null,
    users : [],
    currentUserRole : "student"
  }),
  getters: {
    isAuth() {
      if (this.token && this.user) return true;
      return false;
    },
  },
  actions: {
    async getAllUsers() {
      try {
        let res = await auth.getAllUsers();
        this.users = res.data;
      } catch(e) {
        console.log(e)
      }
    },
    async createUser(form) {
      let res = await auth.register(form);
      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("token", res?.data?.token);
      auth.setHeader(res.data.token);
    },
    async login(form) {
      try {
        let res = await auth.login(form);
        this.user = res.data.user;
        let token = res.data.token;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", token);
        window.location.href = "/";
      } catch (e) {
        console.log(e)
        useToast().error(e.response.data.message);
      }
    },
    async getCurrentUserRole() {
    let res = await auth.getCurrentUser();
    this.currentUserRole = res.data;
    }
  },
});
