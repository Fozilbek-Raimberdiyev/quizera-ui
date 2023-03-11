import { defineStore } from "pinia";
import resultService from "../../services/result.service";

export const resultStore = defineStore("result", {
    state : () => ({
        list : [],
        total : null,
        loading : false
    }),
    actions : {
       async getList(query,page,limit) {
        this.loading = true
        let res = await resultService.getResult(query,page,limit);
        this.list = res.data.results;
        this.total = res.data.total;
        this.loading = false
        }
    }
})