<template>
  <div class="login_wrapper">
    <div class="form">
      <form v-loading="loading" @submit.prevent="submit">
        <label>Login</label>
        <el-input
          required
          v-model="form.firstName"
          placeholder="Please input"
        />
        <label>Password</label>
        <el-input
          required
          type="password"
          v-model="form.password"
          show-password
          placeholder="Please input"
        />
        <button>
          <el-button
            style="background: #ccc; cursor: pointer"
            native-type="submit"
            >Login</el-button
          >
        </button>
        <!-- <el-button type="text" @click="loading=!loading">Loading</el-button> -->
        <!-- <button class="btn">Login</button> -->
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapStores } from "pinia";
import { authStore } from "../stores/counter";
import {useToast} from "vue-toastification"
import router from "../router";
export default {
  data: () => {
    return {
      form: {
        firstName: "",
        password: "",
      },
      loading: false,
    };
  },
  computed: {
    ...mapState(authStore, ["authSucces", "user"]),
    ...mapStores(authStore),
  },
  methods: {
    submit() {
        let firstName = this.form.firstName
        let password = this.form.password
      let users = JSON.parse(localStorage.getItem("users"));
    //    let isHasAccount =  users.map(user => {
    //         if("firstName" in user && "password" in user) {
    //             if(user.firstName===firstName && user.password===password) {
    //                 return true
    //             } else {
    //             return false
    //             }
    //         }
    //     })
    //     console.log(isHasAccount, "ishas")
    //     if(isHasAccount.filter(el => el ==el)) {
    //         this.authStore.$patch({
    //                     authSucces : true,
    //                     authLogout : false,
    //                     user : user,
    //                 })
    //                 return this.$router.push("/")
    //     } else {
    //         useToast()("Login yoki parol xato", {type : "error"})
    //     }
    let user = users.find(user => {
        return user.firstName===firstName && user.password === password
    })
    if(user) {
        localStorage.setItem("user", JSON.stringify(user))
        this.authStore.$patch({
                        authSucces : true,
                        authLogout : false,
                        user : user,
                    })
                    return this.$router.push("/")
    } else {
        useToast()("Login yoki parol xato", {
            type : "error"
        })
    }
    },
  },
};
</script>
<style scoped>
.login_wrapper {
  background: #fff;
  position: absolute;
  inset: 0;
}
.form {
  width: 500px;
  margin: 5rem auto;
}
button {
  background: none;
  border: none;
}
form div {
  margin: 2px 0;
}
</style>