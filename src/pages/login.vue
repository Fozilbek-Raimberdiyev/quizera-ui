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
      <form class="form" @submit.prevent="submit">
        <div class="form" v-loading="loading">
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
            <el-button native-type="submit" style="background: #ccc; cursor: pointer" @click="submit"
              >Login</el-button
            >
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { userStore } from "../stores/management/user.store";
import { useToast } from "vue-toastification";
import axios from "axios";
export default {
  data: () => {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
      isSuccesfully: false,
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  watch: {},
  methods: {
    ...mapActions(userStore, ["login"]),
    async submit() {
      await this.login(this.form);
      window.location.href = "/";
    },
  },
  created() {},
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