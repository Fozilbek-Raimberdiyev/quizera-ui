import { $axios } from "./auth";
import { ElNotification } from "element-plus";
import auth from "./auth";
// import { loadingStore } from "../stores/loading.store";

export const reqinterceptor = $axios.interceptors.request.use(
  function (config) {
    // config.url != "/auth/user" ? loadingStore().$patch({ loading: true }) : ""; 
    document.body.style.opacity = '0.2'
    return config;
  },
  function (error) {
    alert(error);
    document.body.style.opacity = '1'
    return Promise.reject(error);
  }
);
``;
export const resInterceptor = $axios.interceptors.response.use(
  function (response) {
    // loadingStore().$patch({ loading: false });
    document.body.style.opacity = '1'
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
    // loadingStore().$patch({ loading: false });
    document.body.style.opacity = '1'
    error
      ? ElNotification({
          title: error?.response?.data.message || error?.message,
          type: "error",
        })
      : "";
    return Promise.reject(error);
  }
);
