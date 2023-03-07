<template>
  <div>
    <form @submit.prevent="submit" class="flex justify-between items-center">
      <div>
        <label class="block font-extrabold">First name</label>
        <el-input
          v-model="form.firstName"
          placeholder="Enter the first name"
        ></el-input>
        <label class="block font-extrabold">Last name</label>
        <el-input
          v-model="form.lastName"
          placeholder="Enter the last name"
        ></el-input>
        <label class="block font-extrabold">Birdth date</label>
        <el-date-picker
          v-model="form.birdthData"
          placeholder="Type the birdth date"
        ></el-date-picker>
        <label class="block font-extrabold">Email</label>
        <el-input
          disabled
          v-model="form.email"
          placeholder="Enter the email"
        ></el-input>
        <label class="block font-extrabold">Role</label>
        <el-input disabled v-model="form.role"></el-input>
        <el-button
          native-type="submit"
          type="primary"
          class="cursor-pointer mt-10 block"
          >Save changes</el-button
        >
      </div>
      <div>
        <label for="file">Rasm yuklang</label>
        <input style="display: block;" type="file" placeholder="Select file" />
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { userStore } from "../../stores/management/user.store";
import { url } from "@vuelidate/validators";
import auth from "../../services/auth";
export default {
  data: () => ({
    form: {
      firstName: "",
      lastName: "",
      birdthData: "",
      email: "",
      phoneNumber: "",
      role: "",
      file: url,
      _id: "",
    },
  }),
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    getDatas() {
      let user = { ...this.user };
      (this.form.firstName = user.firstName),
        (this.form.lastName = user.lastName),
        (this.form.birdthData = user.birdthData),
        (this.form.email = user.email);
      this.form.role = user.role;
      this.form._id = user._id
    },
    async submit(e) {
      let form = { ...this.form };
      let formData = new FormData();
      for (let key in form) {
        if (key === "file") {
          formData.append("file", e.srcElement[6].files[0]);
        } else {
          formData.append(key, form[key]);
        }
      }
      let res = await auth.updateUser(formData);
    },
  },
  mounted() {
    this.getDatas();
  },
};
</script>
<style scoped>
label {
  margin-top: 5px;
}
button {
  margin-top: 5px;
}

form {
  width: 400px;
}
</style>