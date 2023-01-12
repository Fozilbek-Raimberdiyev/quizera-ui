import { createApp } from 'vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(abilityPlugin)
import App from './App.vue'
import router from './router'

import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'
 import  {resInterceptor, reqinterceptor} from "./services/api.service"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import { Quasar } from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ClipLoader from "vue-spinner/src/ClipLoader.vue"
import GridLoader from "vue-spinner/src/GridLoader.vue"
import RiseLoader from "vue-spinner/src/RiseLoader.vue"
import BeatLoader from "vue-spinner/src/BeatLoader.vue"
import SyncLoader from "vue-spinner/src/SyncLoader.vue"
import RotateLoader from "vue-spinner/src/RotateLoader.vue"
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'
import SquareLoader from 'vue-spinner/src/SquareLoader.vue'
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import SkewLoader from 'vue-spinner/src/SkewLoader.vue'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import RingLoader from 'vue-spinner/src/RingLoader.vue'
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import DotLoader from 'vue-spinner/src/DotLoader.vue'
import { abilityPlugin } from './services/ability'




export const app = createApp(App)

//using components
app.component('pulse-loader',PulseLoader);
app.component("grid-loader", ClipLoader),
app.component("grid-loader", GridLoader)
app.component("rise-loader", RiseLoader)
app.component("beat-loader", BeatLoader)
app.component("sync-loader", SyncLoader)
app.component("rotate-loader", RotateLoader)
app.component("fade-loader", FadeLoader)
app.component("pacman-loader", PacmanLoader)
app.component("square-loader", SquareLoader)
app.component("scale-loader", ScaleLoader)
app.component("skew-loader", SkewLoader)
app.component("ring-loader", RingLoader)
app.component("bounce-loader", BounceLoader)
app.component("dot-loader", DotLoader)




//using plugins
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(OpenLayersMap)
app.use(Toast)
app.use(resInterceptor)
app.use(reqinterceptor)
app.use(LoadingPlugin)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
app.use(VueSidebarMenu)
app.mount('#app')
