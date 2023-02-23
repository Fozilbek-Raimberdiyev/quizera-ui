<template>
  <div id="background">
    <div
      class="login_wrapper bg-gradient-to-tl background-image:linear-gradient(to top` left, var(--tw-gradient-stops))"
    >
      <div class="bg-container"></div>
      <form @submit.prevent="login(form)">
        <div :class="[smallScreen ? 'mt-5' : 'form']">
          <!-- <label>Login</label> -->
          <el-input size="large" required v-model="form.email" placeholder="Please input your email..." />
          <!-- <label>Password</label> -->
          <el-input style="margin: 1rem 0;" size="large"
            required
            type="password"
            v-model="form.password"
            show-password
            placeholder="Please input your password"
          />
          <div class="flex justify-center">
            <el-button
            native-type="submit"
            :loading="loading"
            style="background: #ccc; cursor: pointer"
            >Login</el-button
          >
          </div>
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
import { loadingStore } from "../stores/loading.store";
export default {
  data: () => {
    return {
      form: {
        email: "",
        password: "",
      },
      isSuccesfully: false,
      smallScreen: false,
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
    ...mapState(loadingStore, ["loading"]),
  },
  watch: {},
  methods: {
    ...mapActions(userStore, ["login"]),
  },
  created() {
    this.smallScreen = window.innerWidth < 600;
    // this.loadingBar.start()
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
.login_wrapper {
  margin: 0 auto;
  width: 70%;
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