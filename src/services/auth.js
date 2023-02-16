import axios from "axios";
import { useRoute } from "vue-router";
import router from "../router/index"
// const path = "http://localhost:3000/.netlify/functions/api"
// let path = import.meta.env.SERVER_URL;
//"development"
// console.log(import.meta.env.MODE)
let path = import.meta.env.VITE_SERVER_URL;
export const $axios = axios.create({
  baseURL: path,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export default {
  register(form) {
    return $axios.post(`/auth/register`, form);
  },
  login(form) {
    return $axios.post(`/auth/login`, form)
  },
  setHeader(token) {
    axios.defaults.headers.common["authorization"] = token;
  },
};
