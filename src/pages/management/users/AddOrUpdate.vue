
<template>
  <div>
    <a-button
      @click="$router.go(-1)"
      type="info"
      size="small"
      style="cursor: pointer; margin-bottom: 1rem"
      ><i class="bx bx-arrow-back" style="margin-right: 5px"></i>Back</a-button
    >
    <form @submit.prevent="submit">
      <div class="form">
        <div>
          <label for="firstName"><b>First name</b></label>
          <a-input
            placeholder="Enter the first name"
            size="middle"
            v-model:value="form.firstName"
            id="firstName"
            @input="v$.$touch()"
          ></a-input>
          <CInput></CInput>
          <span class="error" v-if="v$.form.firstName.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
          <label for="firstName"><b>Last name</b></label>
          <a-input
            placeholder="Enter the last name"
            size="middle"
            v-model:value="form.lastName"
            id="firstName"
          ></a-input>
          <span class="error" v-if="v$.form.lastName.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
          <label for="email"><b>Email</b></label>
          <a-input
            placeholder="Enter the email"
            size="middle"
            v-model:value="form.email"
            id="email"
          ></a-input>
          <span class="error" v-if="v$.form.email.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
          <label for="role"><b>Role</b></label>
          <a-select
            placeholder="Select the role"
            size="middle"
            v-model:value="form.role"
            :options="roles"
            id="role"
          >
            <!-- <el-option
              v-for="role in roles"
              :key="role"
              :label="role.name"
              :value="role"
            /> -->
          </a-select>
          <span class="error" v-if="v$.form.role.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
          <label for="phone"><b>Telefon raqami</b></label>
          <a-input
            placeholder="Enter the phone number"
            size="middle"
            v-model:value="form.phoneNumber"
            id="phone"
          ></a-input>
          <span class="error" v-if="v$.form.phoneNumber.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <!-- <div>
          <label for="firstName"><b>Password</b></label>
          <el-input
            placeholder="Enter the password"
            size="large"
            type="password"
            show-password
            v-model="form.password"
            id="firstName"
          ></el-input>
          <span class="error" v-if="v$.form.password.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div> -->
      </div>
      <el-button
        v-if="!$route.params.id"
        size="default"
        class="btn"
        type="primary"
        native-type="submit"
        >Create</el-button
      >
      <el-button
        v-else
        size="default"
        type="primary"
        native-type="submit"
        class="btn"
        >Update</el-button
      >
    </form>
  </div>
</template>
<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { roleStore } from "../../../stores/management/role.store";
import { mapActions, mapState } from "pinia";
import { userStore } from "../../../stores/management/user.store";
import auth from "../../../services/auth";
import CInput from "../../../components/form/CInput.vue";
export default {
  // setup: () => ({ v$: useVuelidate() }),
  components: {CInput},
  data: () => ({
    v$: useVuelidate(),
    auth,
    form: {
      firstName: "",
      lastName: "",
      role: null,
      password: "",
      rules: [],
    },
    roles: [
      { label: "admin", value: "admin" },
      { label: "teacher", value: "teacher" },
      { label: "student", value: "student" },
    ],
  }),
  props: [
    "size",
    "large",
    "small",
    "default",
    "type",
    "primart",
    "info",
    "succes",
    "text",
    "native-type",
    "submit",
    "cancel",
  ],
  validations() {
    return {
      form: {
        firstName: {
          required,
        },
        phoneNumber: {
          required,
        },
        lastName: {
          required,
        },
        role: {
          required,
        },
        password: {
          required,
        },
        email: {
          required,
        },
      },
    };
  },
  computed: {
    ...mapState(roleStore, ["roles"]),
    ...mapState(userStore, ["currentIndex", "users"]),
  },
  methods: {
    ...mapActions(userStore, ["createUser"]),
    async submit() {
      this.v$.$validate();
      if (!this.$route.params.id) {
        if (!this.v$.$error) {
          let body = { ...this.form };
          body.role = this.form.role.name;
          body.rules = this.form.role.rules;
          // console.log(body)
          let res = await this.createUser(body);
          this.$router.push("/management/users");
        } else {
          this.v$.$touch();
        }
      } else {
        let form = {...this.form}
        let res = await auth.updateUser(form);
        this.$router.push("/management/users");
      }
    },
    async setFormData() {
      if (this.$route.params.id) {
        this.form = (await auth.getByIDUser(this.$route.params.id)).data;
      }
    },
  },
  mounted() {
    this.setFormData();
  },
};
</script>
<style scoped>
form {
  background: #fff;
  padding: 50px 15px;
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.form > div > input,
.form > div > label,
.form > div > span {
  display: block;
}

form > .btn {
  /* margin-left: 1rem; */
  margin-top: 0.8rem;
  cursor: pointer;
  display: block !important;
}

.error {
  color: red;
}
</style>
