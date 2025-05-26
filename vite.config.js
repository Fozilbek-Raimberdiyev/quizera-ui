import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from "@vitejs/plugin-vue";

import { transformAssetUrls } from "@quasar/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    // port: "8080",
  },
});
