import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [],
    currentIndex : ""
  }),
  actions: {
    createUser({ firstName, lastName, role, password, rules }) {
       this.users.push({
        firstName: firstName,
        lastName: lastName,
        role: role,
        password: password,
        rules : rules
      });
      localStorage.setItem("users", JSON.stringify(this.users))
    },
  },
});
