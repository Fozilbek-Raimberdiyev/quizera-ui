import axios from "axios";
import { ElNotification } from "element-plus";
export var loading = false;
import { useToast } from "vue-toastification";
const toast = useToast()

export const reqinterceptor = axios.interceptors.request.use(function (config) {
    loading = true;
    console.log("request started" ,loading)
    return config;
  }
  // , function (error) {
  //   loading = true
  //   return Promise.reject(error);
  // }
  );
``
export const resInterceptor =  axios.interceptors.response.use(function (response) {
    loading = false;
    console.log("request ended", loading)
    return response;
  }, function (error) {
    // ElNotification({
    //   title : "Error",
    //   message : error.message || "Xatolik yuz berdi",
    //   type : "error",
    //   customClass : "notitifacation"
    // })
    toast.error(error.message || "Xatolik yuz berdi")
    return Promise.reject(error);
  });
