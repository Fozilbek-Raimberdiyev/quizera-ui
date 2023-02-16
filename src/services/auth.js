import axios from "axios";
// const path = "http://localhost:3000/.netlify/functions/api"
// let path = import.meta.env.SERVER_URL;
//"development"
// console.log(import.meta.env.MODE)
let path =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "https://fozilbek-quiz.netlify.app/.netlify/functions/api"; 
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
    alert("login");
    return $axios.post(`/auth/login`, form);
  },
  setHeader(token) {
    axios.defaults.headers.common["authorization"] = token;
  },
};
