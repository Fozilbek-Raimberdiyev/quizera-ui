import axios from "axios";
import swal from "sweetalert2";
import { $axios } from "./auth";
import { ElNotification } from "element-plus";
import { useToast } from "vue-toastification";
import auth from "./auth";
import { loadingStore } from "../stores/loading.store";
import { useLoading } from "vue-loading-overlay";
import nProgress from "nprogress";
// import "nprogress.css"
const toast = useToast();
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

const loader = null;

export const reqinterceptor = $axios.interceptors.request.use(
  function (config) {
    config.url != "/auth/user" ? loadingStore().$patch({ loading: true }) : "";
    // nProgress.done()
    // loader = useLoading().show({
    //   color: "#000000",
    //   loader: "spinner",
    //   width: 64,
    //   height: 64,
    //   backgroundColor: "#ffffff",
    //   opacity: 0.5,
    //   zIndex: 999,
    // });
    return config;
  },
  function (error) {
    alert(error);
    return Promise.reject(error);
  }
);
``;
export const resInterceptor = $axios.interceptors.response.use(
  function (response) {
    // Toast.fire({
    //   icon: "success",
    //   title: response.data.message || response.message || "succes",
    // });
    loadingStore().$patch({ loading: false });
    // loader.hide()
    response.data.message
      ? ElNotification({
          title: response?.message || response.data.message,
          type: "success",
          transition: true,
        })
      : "";
    auth.setHeader(response?.data?.token);
    return response;
  },
  function (error) {
    loadingStore().$patch({ loading: false });
    error
      ? ElNotification({
          title: error?.response?.data.message || error?.message,
          type: "error",
        })
      : "";
    return Promise.reject(error);
  }
);
