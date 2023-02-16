import axios from "axios";
import { ElNotification } from "element-plus";
import { useToast } from "vue-toastification";
import { app } from "../main";
import { loadingStore } from "../stores/loading.store";
import auth from "./auth";
const toast = useToast();
let token = localStorage.getItem("token") || null;

export const reqinterceptor = axios.interceptors.request.use(
  function (config) {
    const loadStore = loadingStore();
    loadStore.$patch({ loading: true });
    // loadStore.setLoader()
    return config;
  }
  // , function (error) {
  //   loading = true
  //   return Promise.reject(error);
  // }
);
``;
export const resInterceptor = axios.interceptors.response.use(
  function (response) {
    const loadStore = loadingStore();
    loadStore.$patch({ loading: false });
    response.message
      ? ElNotification({
          title: response?.message || response.data.message,
          type: "success",
        })
      : "";
      let header = response.headers["Authorization"];
      auth.setHeader(response?.data?.token)
    return response;
  },
  function (error) {
    const loadStore = loadingStore();
    loadStore.$patch({ loading: false });
    ElNotification({
      title: "Error",
      message: error.message || "Xatolik yuz berdi",
      type: "error",
    });
    // toast.error(error.message || "Xatolik yuz berdi")
    return Promise.reject(error);
  }
);
