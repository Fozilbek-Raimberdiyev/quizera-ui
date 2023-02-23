<template>
  <div id="background">
    <div :class="[smallScreen ? 'm-5' : 'form']">
      <form v-loading="loading" @submit.prevent="submit">
        <label>Firstname</label>
        <el-input
          required
          v-model="form.firstName"
          placeholder="Please input"
        />
        <label>Lastname</label>
        <el-input required v-model="form.lastName" placeholder="Please input" />
        <div class="birdthData">
          <label class="block">Birdth data</label>
          <el-date-picker class="" v-model="form.birdthData"></el-date-picker>
        </div>
        <label style="display: block">Email</label>
        <el-input required v-model="form.email" placeholder="Please input" />
        <label>Phone number</label>
        <el-input
          type="number"
          placeholder="Please input the your phone number"
          v-model="form.phoneNumber"
        ></el-input>
        <label>Password</label>
        <el-input
          required
          type="password"
          v-model="form.password"
          show-password
          placeholder="Please input"
        />
        <button>
          <el-button type="primary">Register</el-button>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { userStore } from "../stores/management/user.store";
export default {
  data: () => {
    return {
      form: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        birdthData: "",
        phoneNumber: null,
        role : "student"
      },
      loading: false,
      smallScreen : false
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(userStore, ["createUser"]),
    async submit() {
      let res = await this.createUser(this.form);
    },
  },
  created() {
    this.smallScreen = window.innerWidth < 600
  }
};
</script>
<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
.form {
  width: 500px;
  margin: 3rem auto;
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
  background-clip: content-box;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
}
label {
  color: rgb(27, 27, 27);
}
</style>