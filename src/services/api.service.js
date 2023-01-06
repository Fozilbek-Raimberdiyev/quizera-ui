import axios from "axios";
import { ElNotification } from "element-plus";
import { useToast } from "vue-toastification";
import { app } from "../main";
import { loadingStore } from "../stores/loading.store";
const toast = useToast()

export const reqinterceptor = axios.interceptors.request.use(function (config) {
    const loadStore = loadingStore()
    loadStore.$patch({loading : true})
    // loadStore.setLoader()
    return config;
  }
  // , function (error) {
  //   loading = true
  //   return Promise.reject(error);
  // }
  );
``
export const resInterceptor =  axios.interceptors.response.use(function (response) {
  const loadStore = loadingStore()
  loadStore.$patch({loading : false})
    return response;
  }, function (error) {
    const loadStore = loadingStore()
    loadStore.$patch({loading : false})
    // ElNotification({
    //   title : "Error",
    //   message : error.message || "Xatolik yuz berdi",
    //   type : "error",
    // })
    toast.error(error.message || "Xatolik yuz berdi")
    return Promise.reject(error);
  });

  export let $watchLoader = () => {
    let loadStore = loadingStore()
    setInterval(() => {
      if(loadStore.loading) {
        app.config.globalProperties.$loading.show({
          container : false
        })
      } else {
        app.config.globalProperties.$loading.show({
          container : false
        }).hide()
      }
    }, 1000);
  }
