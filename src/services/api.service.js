import axios from "axios";
import { ElNotification } from "element-plus";
const path = "https://quizera-api-production.up.railway.app/api";
import router from "../router";
export const $axios = axios.create({
  baseURL: path,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

$axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
$axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
    error
      ? ElNotification({
          title: error?.response?.data.message || error?.message,
          type: "error",
        })
      : "";
    return Promise.reject(error);
  }
);