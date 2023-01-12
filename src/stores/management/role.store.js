import { defineStore } from "pinia";

export const roleStore = defineStore("roleStore", {
    state : () => ({
        roles : JSON.parse(localStorage.getItem("roles")) || []
    }),
    actions : {
        createRole () {

        }
    }
})