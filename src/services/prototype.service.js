import { useToast } from "vue-toastification";



import {app} from "../main"



export function prototypeVariables () {
    const toast = useToast();
    app.config.globalProperties.$toast = toast;
}
