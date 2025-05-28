import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { i18n } from "./plugins/i18n";

import "boxicons";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import naive from "naive-ui";

import { Quasar } from "quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const pinia = createPinia();

import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

export const app = createApp(App);

//using plugins
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(Toast);
app.use(naive);
app.use(i18n);
app.use(VuePlyr);

// app.use(LoadingPlugin)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});

app.use(Antd);
// app.use(abilitiesPlugin,ability)
// app.use(VueSweetalert2)
// app.use(VueSidebarMenu)
app.mount("#app");
