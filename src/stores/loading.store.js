import { defineStore } from "pinia";
import { app } from "../main";
export const loadingStore = defineStore("loading", {
    state : () => ({
        loading : false,
        isMounted : false
    }),
    actions : {
        setLoader() {
            let loader = app.config.globalProperties.$loading.show({
                    // Optional parameters
                    container: false,
                    canCancel: true,
                    loader : "bars",
                    opacity : "1"
                    // onCancel: true,
                })
            if(this.loading) {
                loader
                
            } else {
                loader.hide()
            }
            
        },
        startLoading() {
            app.config.globalProperties.$loading.show({
                // Optional parameters
                container: false,
                canCancel: true,
                onCancel: true,
            })
        },
        hideLoading () {
            app.config.globalProperties.$loading.show().hide()
        }
    }
})