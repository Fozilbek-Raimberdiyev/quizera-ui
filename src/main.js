import { createApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()

import App from './App.vue'
import router from './router'

import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
 import  {resInterceptor, reqinterceptor, $watchLoader} from "./services/api.service"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

export const app = createApp(App)

//using plugins
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(OpenLayersMap)
app.use(Toast)
app.use(resInterceptor)
app.use(reqinterceptor)
app.use(LoadingPlugin)
// app.use($watchLoader)
app.mount('#app')
