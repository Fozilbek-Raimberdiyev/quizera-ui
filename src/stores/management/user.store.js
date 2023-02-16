import { defineStore } from "pinia";
import auth from "../../services/auth";
import router from "../../router";
import { useToast } from "vue-toastification";
export const userStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuth() {
      if (this.token && this.user) return true;
      return false;
    },
  },
  actions: {
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
        this.user = res?.data?.user;
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        localStorage.setItem("token", res?.data?.token);
        // auth.setHeader(res.data.token);
      } catch (e) {
        useToast().error(e)
      }
    },
  },
});
