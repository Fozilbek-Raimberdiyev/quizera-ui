// import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

// export const authStore = defineStore('auth', () => {
// state : () => {
//   user : {}
// },
// getters : {

// }
// })

export const authStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
    authSucces : false,
    authLogout : false
  }),
  getters: {
    isAuth (state) {
      if(state.user?.email && state.user?.password) {
        return true
      } else {
        return false
      }
    }
  },
})