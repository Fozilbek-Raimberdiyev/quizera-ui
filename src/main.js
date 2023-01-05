import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
 import  {resInterceptor, reqinterceptor} from "./services/api.service"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


export const app = createApp(App)

//using plugins
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(OpenLayersMap)
app.use(Toast)
app.use(resInterceptor)
app.use(reqinterceptor)
app.mount('#app')
