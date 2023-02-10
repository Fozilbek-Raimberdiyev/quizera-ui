<template>
  <div>
    <form @submit.prevent="submit">
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
      <el-input v-model="form.email" placeholder="Enter the email"></el-input>
      <el-button
        native-type="submit"
        type="primary"
        class="cursor-pointer mt-10 block"
        >Save changes</el-button
      >
    </form>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { userStore } from "../../stores/management/user.store";
export default {
  data: () => ({
    form: {
      firstName: "",
      lastName: "",
      birdthData: "",
      email: "",
      phoneNumber: "",
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