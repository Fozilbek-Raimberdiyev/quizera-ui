
<template>
  <div>
    <el-button
      @click="$router.go(-1)"
      type="info"
      size="small"
      style="cursor: pointer; margin-bottom: 1rem"
      ><i class="bx bx-arrow-back" style="margin-right: 5px"></i>Back</el-button
    >
    <form @submit.prevent="submit">
      <div class="form">
        <div>
          <label for="firstName"><b>First name</b></label>
          <el-input
            placeholder="Enter the first name"
            size="large"
            v-model="form.firstName"
            id="firstName"
            @input="v$.$touch()"
          ></el-input>
          <span class="error" v-if="v$.form.firstName.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
          <label for="firstName"><b>Last name</b></label>
          <el-input
            placeholder="Enter the last name"
            size="large"
            v-model="form.lastName"
            id="firstName"
          ></el-input>
          <span class="error" v-if="v$.form.lastName.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
          <label for="firstName"><b>Role</b></label>
          <el-select
            placeholder="Select the role"
            size="large"
            v-model="form.role"
            id="firstName"
          >
            <el-option
              v-for="role in roles"
              :key="role.name"
              :label="role.name"
              :value="role.name"
            />
          </el-select>
          <span class="error" v-if="v$.form.role.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
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
        </div>
      </div>
      <el-button
        v-if="currentIndex<0"
        size="large"
        class="btn"
        type="primary"
        native-type="submit"
        >Create</el-button
      >
      <el-button
        v-else
        size="large"
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
export default {
  // setup: () => ({ v$: useVuelidate() }),
  data: () => ({
    v$: useVuelidate(),
    form: {
      firstName: "",
      lastName: "",
      role: null,
      password: "",
    },
  }),
  validations() {
    return {
      form: {
        firstName: {
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
      },
    };
  },
  computed: {
    ...mapState(roleStore, ["roles"]),
    ...mapState(userStore, ["currentIndex", "users"]),
  },
  methods: {
    ...mapActions(userStore, ["createUser"]),
    submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (!this.currentIndex) {
          this.createUser(this.form);
          this.$router.push("/management/users");
        } else {
          this.users[this.currentIndex] = this.form;
          this.$router.push("/management/users");
        }
      } else {
        this.v$.$touch();
      }
    },
  },
  mounted() {
    this.form = this.users[this.currentIndex];
  },
};
</script>
<style scoped>
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
