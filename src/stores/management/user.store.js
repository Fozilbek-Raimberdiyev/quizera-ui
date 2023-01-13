import { defineStore } from "pinia";

export const userStore = defineStore("userStore", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [],
    currentUser: {},
    currentIndex : ""
  }),
  actions: {
    createUser({ firstName, lastName, role, password }) {
       this.users.push({
        firstName: firstName,
        lastName: lastName,
        role: role,
        password: password,
      });
      localStorage.setItem("users", JSON.stringify(this.users))
    },
  },
});
