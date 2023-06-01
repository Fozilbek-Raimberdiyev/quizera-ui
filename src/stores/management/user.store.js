import { defineStore } from "pinia";
import auth from "../../services/auth";
import router from "../../router";
import { useToast } from "vue-toastification";
import { useLoadingBar } from "naive-ui";
import notificationsService from "../../services/notifications.service";
export const userStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || null,
    users : [],
    currentUserRole : "student",
    loading : false
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
      }
    },
    async createUser(form) {
      try {
        this.loading = true
        let res = await auth.register(form);
        this.user = res.data.user;
        let token = res.data.token;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", token);
        window.location.href = "/";
      } catch (e) {
        // useToast().error(e.response.data.message);
      }
      finally {
        this.loading = false
      }
    },
    async login(form) {
      try {
        this.loading = true
        let res = await auth.login(form);
        this.user = res.data.user;
        let token = res.data.token;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("token", token);
        window.location.href = "/";
      } catch (e) {
        console.log(e)
        // useToast().error(e.response.data.message);
      }
      finally {
        this.loading = false
      }
    },
    async getCurrentUserRole() {
      performance.mark('user')
    let res = await auth.getCurrentUser();
    this.currentUserRole = res.data;
    },
    getByEmail() {
      return 
    },
    async updateUser(body) {
      let res = await auth.updateUser(body);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      this.user = res.data.user;
    },
    async getUserInfos() {
      let res = await notificationsService.getNotifications();
      this.user= res.data.user;
    }
  },
});
