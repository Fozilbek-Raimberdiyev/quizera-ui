import { defineStore } from "pinia";
import resultService from "../../services/result.service";

export const resultStore = defineStore("result", {
    state : () => ({
        list : [],
        total : null
    }),
    actions : {
       async getList(query) {
        let res = await resultService.getResult(query);
        this.list = res.data.results;
        this.total = res.data.total;
        }
    }
})