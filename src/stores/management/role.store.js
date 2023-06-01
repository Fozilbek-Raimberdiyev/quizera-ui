import { defineStore } from "pinia";
import rolesService from "../../services/management/roles.service";
export const roleStore = defineStore("roleStore", {
    state : () => ({
        roles :  []
    }),
    actions : {
       async getList() {
        this.roles = await rolesService.getList()
        },
        addRole (data) {
            return rolesService.addRole(data)
        }
    }
})