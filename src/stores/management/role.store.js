import { defineStore } from "pinia";
import rolesService from "../../services/management/roles.service";
export const roleStore = defineStore("roleStore", {
  state: () => ({
    roles: [],
  }),
  actions: {
    async getList() {
      const res = await rolesService.getList();
      this.roles = res.data?.roles;
    },
    addRole(data) {
      return rolesService.addRole(data);
    },
  },
});
