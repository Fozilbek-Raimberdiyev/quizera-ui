<template>
  <div id="background">
    <div
      class="bg-gradient-to-tl background-image:linear-gradient(to top` left, var(--tw-gradient-stops))"
      :class="[smallScreen ? 'smallscreen' : 'login_wrapper']"
    >
      <div class="bg-container"></div>
      <form
        v-if="!isRegister"
        :style="[smallScreen ? 'width: 100%;' : 'width : 65%']"
        class="shadow"
        @submit.prevent="login(form)"
      >
        <div :class="[smallScreen ? 'mt-5' : 'form']">
          <div class="flex items-center justify-center">
            <p style="font-size: 1.5rem" class="text-center">Tizimga kirish</p>
            <i
              style="font-size: 1.5rem"
              class="bi bi-box-arrow-in-right self-start"
            ></i>
          </div>
          <el-input
            :prefix-icon="Avatar"
            size="large"
            required
            v-model="form.email"
            placeholder="Please input your email..."
          />
          <el-input
            style="margin: 1rem 0"
            size="large"
            required
            type="password"
            v-model="form.password"
            show-password
            placeholder="Please input your password"
            :prefix-icon="Key"
          />
          <div class="flex justify-center">
            <el-button
              native-type="submit"
              :loading="loading"
              type="primary"
              style="cursor: pointer"
              >Login</el-button
            >
          </div>
          <div class="sign-up flex items-center justify-between">
            <p>
              Akkountingiz yo'qmi?
              <span
                @click="isRegister = true"
                class="register cursor-pointer"
                style="color: #409eef"
                >Ro'yhatdan o'tish</span
              >
            </p>
          </div>
        </div>
      </form>
      <form
        v-else
        @submit.prevent="submit"
        :style="[smallScreen ? 'width: 100%;' : 'width : 65%']"
      >
        <!-- <label>Firstname</label> -->
        <div  :class="[smallScreen ? 'mt-5' : 'form']">
          <div class="flex items-center justify-center">
          <p style="font-size: 1.5rem" class="text-center">Ro'yhatdan o'tish</p>
          <i
            style="font-size: 1.5rem"
            class="bi bi-box-arrow-in-right self-start"
          ></i>
        </div>
        <el-input
          size="large"
          required
          v-model="rForm.firstName"
          placeholder="Please input firstname"
          :prefix-icon="Avatar"
        />
        <!-- <label>Lastname</label> -->
        <el-input
          :prefix-icon="User"
          required
          size="large"
          style="margin-top: 10px"
          v-model="rForm.lastName"
          placeholder="Please input lastname"
        />
        <div class="birdthData">
          <!-- <label class="block">Birdth data</label> -->
          <el-date-picker
            size="large"
            style="margin-top: 10px"
            placeholder="Enter the birthdata"
            v-model="rForm.birdthData"
          ></el-date-picker>
        </div>
        <!-- <label style="display: block">Email</label> -->
        <el-input
          :prefix-icon="Message"
          required
          size="large"
          style="margin-top: 10px"
          v-model="rForm.email"
          placeholder="Please input email"
        />
        <!-- <label>Phone number</label> -->
        <el-input
          type="number"
          :prefix-icon="PhoneFilled"
          :controls="false"
          min="0"
          placeholder="Please input  phone number"
          v-model="rForm.phoneNumber"
          size="large"
          style="margin-top: 10px"
        ></el-input>
        <!-- <label>Password</label> -->
        <el-input
          required
          :prefix-icon="Key"
          type="password"
          v-model="rForm.password"
          show-password
          placeholder="Please input password"
          size="large"
          style="margin-top: 10px"
        />
        <div class="flex justify-center" style="margin-top: 1rem">
          <el-button :loading="loading" native-type="submit" type="primary"
            >Register</el-button
          >
        </div>
        <div class="sign-up flex items-center justify-between">
          <p>
            Akkountingiz bormi?
            <span
              @click="isRegister = false"
              class="register cursor-pointer"
              style="color: #409eef"
              >Tizimga kirish</span
            >
          </p>
        </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { userStore } from "../stores/management/user.store";
import { loadingStore } from "../stores/loading.store";
import {
  Avatar,
  Key,
  Phone,
  User,
  Management,
  Message,
} from "@element-plus/icons-vue";
import {
  PhoneFilled,
  AccountBookFilled,
  SignalFilled,
  ContactsFilled,
} from "@ant-design/icons-vue";
export default {
  data: () => {
    return {
      form: {
        email: "",
        password: "",
      },
      rForm: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        birdthData: "",
        phoneNumber: null,
        role: "student",
      },
      isSuccesfully: false,
      smallScreen: false,
      Avatar,
      Key,
      Phone,
      User,
      Management,
      Message,
      PhoneFilled,
      AccountBookFilled,
      SignalFilled,
      ContactsFilled,
      isRegister: false,
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
    ...mapState(loadingStore, ["loading"]),
  },
  watch: {},
  methods: {
    ...mapActions(userStore, ["login", "createUser"]),
    async submit() {
      let res = await this.createUser(this.rForm);
    },
  },
  created() {
    this.smallScreen = window.innerWidth < 600;
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.login_wrapper {
  margin: 0 auto;
  width: 70%;
}
.form {
  width: 500px;
  margin: 5rem auto;
}
button {
  padding: 17px 50px;
  font-weight: 600;
  font-size: 17px;
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
form {
  background: #fff;
  margin: 0.5rem auto;
  padding: 5px 10px;
  border-radius: 10px;
}
.btn {
  background: #eef429;
}
.smallscreen {
  width: 90%;
  margin: 0 auto;
}
a {
  text-decoration: none;
}
.sign-up {
  margin-top: 1rem;
}
/* .register {
  border: 1px solid #e3e5e9;
  padding: 5px;
  border-radius: 5px;
} */
i {
  font-size: 18px;
  display: inline-block;
}
</style>