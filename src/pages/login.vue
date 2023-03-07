<template>
  <div id="background">
    <div
      class="bg-gradient-to-tl background-image:linear-gradient(to top` left, var(--tw-gradient-stops))"
      :class="[smallScreen ? 'smallscreen' : 'login_wrapper']"
    >
      <div class="bg-container"></div>
      <div class="center" v-if="!isRegister">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <h1>Login</h1>
        <form @submit.prevent="login(form)">
          <div class="txt_field">
            <input v-model="form.email" type="text" required />
            <label>Username</label>
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="form.password" type="password" required />
            <label>Password</label>
            <span></span>
          </div>

          <div class="pass">Forgot Password?</div>
          <input type="submit" value="Login" />
          <div class="signup_link">Not a member? <a href="">Signup</a></div>
        </form>
      </div>
      <!-- <form
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
      </form> -->
      <form
        v-else
        @submit.prevent="submit"
        :style="[smallScreen ? 'width: 100%;' : 'width : 65%']"
      >
        <!-- <label>Firstname</label> -->
        <div :class="[smallScreen ? 'mt-5' : 'form']">
          <div class="flex items-center justify-center">
            <p style="font-size: 1.5rem" class="text-center">
              Ro'yhatdan o'tish
            </p>
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
body {
  margin: 0;
  padding: 0;
  font-family: Montserrat;
  background: linear-gradient(120deg, #2980b9, #8e44ad);
  height: 100vh;
  overflow: hidden;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 10px;
}

.center h1 {
  text-align: center;
  padding: 0 0 20px 0;
  border-bottom: 1px solid silver;
}

.center form {
  padding: 0 40px;
  box-sizing: border-box;
}

form .txt_field {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}

.txt_field input {
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}

.txt_field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.3s;
}

.txt_field span::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #2691d9;

  transition: 0.3s;
}

.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
  top: -5px;
  color: #2691d9;
}

.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
  width: 100%;
}

.pass {
  margin: -5px 0px 15px 5px;
  color: #a6a6a6;
  cursor: pointer;
}

.pass:hover {
  text-decoration: underline;
}

input[type="submit"] {
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  font-size: 18px;
  border-radius: 25px;

  font-weight: 700;
  color: #e9f4fb;
  outline: none;
  cursor: pointer;
}

input[type="submit"]:hover {
  border-color: #2691d9;
  transition: 0.5s;
}
.signup_link {
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}

.signup_link a {
  color: #2691d9;
  text-decoration: none;
}

.signup_link a:hover {
  text-decoration: underline;
}
</style>