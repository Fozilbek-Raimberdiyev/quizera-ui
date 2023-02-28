import swal from "sweetalert2";
import { $axios } from "./auth";
import { ElNotification } from "element-plus";
import { useToast } from "vue-toastification";
import auth from "./auth";
import { loadingStore } from "../stores/loading.store";
import { NotificationStore } from "../stores/notifications.store";
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

export const reqinterceptor = $axios.interceptors.request.use(
  function (config) {
    config.url != "/auth/user" ? loadingStore().$patch({ loading: true }) : ""; return config;
  },
  function (error) {
    alert(error);
    return Promise.reject(error);
  }
);
``;
export const resInterceptor = $axios.interceptors.response.use(
  function (response) {
    loadingStore().$patch({ loading: false });
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
