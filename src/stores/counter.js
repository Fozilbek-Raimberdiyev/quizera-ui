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
    token : localStorage.getItem("token"),
    authSucces : false,
    authLogout : false,
    permissions : []
  }),
  getters: {
    isAuth (state) {
      if(state.user?.firstName && state.token) {
        return true
      } else {
        return false
      }
    }
  },
})