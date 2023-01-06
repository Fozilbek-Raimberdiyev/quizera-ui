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



export const app = createApp(App)

//using components
app.component('pulse-loader',PulseLoader);
app.component("grid-loader", ClipLoader),
app.component("grid-loader", GridLoader)
app.use("rise-loader", RiseLoader)
app.use("beat-loader", BeatLoader)
app.use("sync-loader", SyncLoader)
app.use("rotate-loader", RotateLoader)
app.use("fade-loader", FadeLoader)
app.use("pacman-loader", PacmanLoader)
app.use("square-loader", SquareLoader)
app.use("scale-loader", ScaleLoader)
app.use("skew-loader", SkewLoader)
app.use("moon-loader", MoonLoader)
app.use("ring-loader", RingLoader)
app.use("bounce-loader", BounceLoader)
app.use("dot-loader", DotLoader)



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
