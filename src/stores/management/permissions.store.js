import { defineStore } from "pinia";
import permissionsService from "../../services/permissions.service";
export const permissionStore = defineStore("permStore", {
  state: () => ({
    list : []
  }),
  actions : {
    async getList() {
        let res = await permissionsService.getList();
        this.list = res.data.permissions
    },
    addPermissions (data) {
        return permissionsService.addPermissions(data)
    }
  }
});
