<template>
  <div>
    <form
      @submit.prevent="submit"
      style="display: flex !important"
      class="flex justify-between items-center"
    >
      <div>
        <input
          @change="change"
          alt="profile image"
          type="file"
          id="image-input"
        /><img v-if="!clickedUpload" :src="user.pathImage" />
        <div ref="imagePreview" id="image-preview"></div>
      </div>
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
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { userStore } from "../../stores/management/user.store";
import { url } from "@vuelidate/validators";
import auth from "../../services/auth";
export default {
  data: () => ({
    clickedUpload: false,
    form: {
      firstName: "",
      lastName: "",
      birdthData: "",
      email: "",
      phoneNumber: "",
      role: "",
      file: url,
      _id: "",
      pathImage: null,
    },
  }),
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    ...mapActions(userStore, ["updateUser"]),
    getDatas() {
      let user = { ...this.user };
      (this.form.firstName = user.firstName),
        (this.form.lastName = user.lastName),
        (this.form.birdthData = user.birdthData),
        (this.form.email = user.email);
      this.form.role = user.role;
      this.form._id = user._id;
    },
    async submit(e) {
      let form = { ...this.form };
      let formData = new FormData();
      for (let key in form) {
        if (key === "file") {
          formData.append("file", e.srcElement[0].files[0]);
        } else {
          formData.append(key, form[key]);
        }
      }
      this.updateUser(formData);
    },
    change(e) {
      this.clickedUpload = true;
      const file = e.target.files[0];
      const reader = new FileReader();
      const preview = this.$refs.imagePreview;
      reader.addEventListener("load", () => {
        const image = new Image();
        image.src = reader.result;
        image.style.width = "200px";
        image.style.height = "130px";
        preview.innerHTML = "";
        preview.appendChild(image);
      });

      if (file) {
        reader.readAsDataURL(file);
      }
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

#image-preview {
  max-width: 100px;
  max-height: 100px;
  margin: 20px auto;
  object-fit: cover;
}
#image-preview img {
  max-width: 100%;
  max-height: 100%;
}
</style>