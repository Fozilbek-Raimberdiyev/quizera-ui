import axios from "axios";
import { useRoute } from "vue-router";
import router from "../router/index"
import { loadingStore } from "../stores/loading.store";
// let path = import.meta.env.VITE_SERVER_URL;
const path = "https://quizera-api-production.up.railway.app/api"
export const $axios = axios.create({
  baseURL: path,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default {
  getAllUsers() {
    return $axios.get("/users")
  },
  register(form) {
    return $axios.post(`/auth/register`, form);
  },
  login(form) {
    return $axios.post(`/auth/login`, form)
  },
  setHeader(token) {
    axios.defaults.headers.common["authorization"] = token;
  },
  getCurrentUser() {
    return $axios.get("/auth/user")
  },
  getUserByEmail(email) {
    return $axios.get(`/auth/user/${email}`)
  },
  getByIDUser(id) {
    return $axios.get(`/auth/${id}/user`)
  },
  updateUser(form) {
    return $axios.put("/auth/updateUser", form)
  },
  deleteUser(ID) {
    return $axios.delete("/auth/delete", {params : {ID}})
  }
};