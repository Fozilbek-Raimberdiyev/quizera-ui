<template>
  <div id="background">
    <div
      class="
        login_wrapper
        bg-gradient-to-tl
        background-image:linear-gradient(to
        top`
        left,
        var(--tw-gradient-stops))
      "
    >
      <div class="bg-container"></div>
      <div class="form">
        <form v-loading="loading" @submit.prevent="submit">
          <label>Login</label>
          <el-input required v-model="form.email" placeholder="Please input" />
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
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { userStore } from "../stores/management/user.store";
import { useToast } from "vue-toastification";
import { authStore } from "../stores/counter";
export default {
  data: () => {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(userStore, ["login"]),
    async submit() {
      try {
        let res = await this.login(this.form);
        this.$router.push("/")
      } catch(e) {
        useToast().error(e?.response?.data?.message)
      }
      
    },
    created() {},
  },
};
</script>
<style scoped>
.login_wrapper {
  margin: 0;
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

#background {
  background-image: url("../assets/image/auth.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
</style>