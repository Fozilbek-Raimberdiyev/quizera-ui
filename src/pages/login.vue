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
        <h1>Kirish</h1>
        <form @submit.prevent="login(form)">
          <div class="txt_field">
            <input v-model="form.email" type="text" required />
            <label>Elektron pochta</label>
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="form.password" type="password" required />
            <label>Parol</label>
            <span></span>
          </div>

          <div class="pass">Parolni unutdingizmi?</div>
          <!-- <input type="submit" value="Kirish" /> -->
          <el-button
            class="submit"
            :loading="loading"
            native-type="submit"
            type="primary"
            >Kirish</el-button
          >
          <div class="signup_link">
            Akkauntingiz yo'qmi?
            <a href.prevent="#" @click="isRegister = true">Ro'yhatdan o'tish</a>
          </div>
        </form>
      </div>
      <div class="center" v-else>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <h1>Ro'yhatdan o'tish</h1>
        <form @submit.prevent="createUser(rForm)">
          <div class="txt_field">
            <input required v-model="rForm.firstName" type="text" />
            <label>Ismingiz</label>
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="rForm.lastName" type="text" required />
            <label>Familiyangiz</label>
            <span></span>
          </div>
          <div class="txt_field">
            <el-date-picker
              placeholder="Tu'gilgan kuningizmi kiriting"
              size="large"
              style="margin-top: 10px"
              v-model="rForm.birdthData"
              required
            />
            <!-- <label>Tug'ilgan vaqtingiz</label> -->
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="rForm.email" type="text" required />
            <label>Elektron pochta</label>
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="rForm.phoneNumber" type="number" required />
            <label>Telefon raqam</label>
            <span></span>
          </div>
          <div class="txt_field">
            <input v-model="rForm.password" type="password" required />
            <label>Parol</label>
            <span></span>
          </div>
          <!-- <input type="submit" value="Ro'yhatdan o'tish" /> -->
          <el-button
            class="submit"
            :loading="loading"
            native-type="submit"
            type="primary"
            >Ro'yhatdan o'tish</el-button
          >
          <div class="signup_link">
            Akkauntingiz bormi?
            <a href.prevent="#" @click="isRegister = false">Kirish</a>
          </div>
        </form>
      </div>
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
    this.loading = false
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
  top: 60%;
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

.submit,
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

.submit,
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