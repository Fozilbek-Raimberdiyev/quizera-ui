import { defineStore } from "pinia";
import { app } from "../main";
export const loadingStore = defineStore("loading", {
    state : () => ({
        loading : false,
        isMounted : false
    }),
    actions : {
    }
})