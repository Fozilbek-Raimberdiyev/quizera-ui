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
          accept="image/png, image/jpeg"
        />
        <a-modal
            v-model:visible="isNoAccesFileSelected"
            title="Ruxsat etilgan audiolar"
            @ok="isNoAccesFileSelected = false"
          >
            <span>Ushbu audio turlaridan birini tanlang</span>
            <ul class="lists">
              <li><img src="../../assets/image/png.png" alt="png" /> png</li>
              <li><img src="../../assets/image/jpg.png" alt="jpg" /> jpg</li>
              <li><img src="../../assets/image/jpeg.png" alt="jpeg" /> jpeg</li>
            </ul>
          </a-modal>
        <img class="userImg" v-if="!clickedUpload" :src="user.pathImage" />
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
import { ElAlert, ElNotification } from "element-plus";
export default {
  data: () => ({
    clickedUpload: false,
    isFileSelected : false,
    isNoAccesFileSelected : false,
    isIncorrectFileType : false,
    form: {
      firstName: "",
      lastName: "",
      birdthData: "",
      email: "",
      phoneNumber: null,
      role: "",
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
      this.form.pathImage= user.pathImage,
        (this.form.lastName = user.lastName),
        (this.form.birdthData = user.birdthData),
        (this.form.phoneNumber = user.phoneNumber);
      this.form.email = user.email;
      this.form.role = user.role;
      this.form._id = user._id;
    },
    async submit(e) {
      if(this.isIncorrectFileType) {
        this.isNoAccesFileSelected = true;
        return 0
      }
      let form = { ...this.form };
      let formData = new FormData();
      let file = e.srcElement[0].files[0]
      if (
            (file.type === "image/png" ||
              file.type === "image/jpeg" ||
              file.type === "image/jpg") &&
            file.size / 1048576 <= 5
          ) {
            formData.append("file", e.srcElement[0].files[0]);
          } else {
            ElNotification({
              message:
                "Ruxsat etilmagan fayl turi tanlandi yoki 5mb dan katta fayl hajmi. Tanlangan fayl hajmi " +
                file.size / 1048576 +
                "mb",
            });
          }
      formData.append('form', JSON.stringify(form));
      this.updateUser(formData);
    },
    change(e) {
      this.isFileSelected = true
      let types = ['image/jpeg', 'image/png', 'image/jpg']
      if(!types.some(type => type===e.target.files[0].type)) {
        this.isIncorrectFileType = true;
        this.isNoAccesFileSelected = true
      }
      this.clickedUpload = true;
      const file = e.target.files[0];
      const reader = new FileReader();
      const preview = this.$refs.imagePreview;
      reader.addEventListener("load", () => {
        const image = new Image();
        image.src = reader.result;
        image.style.width = "200px";
        image.style.height = "200px";
        image.style.borderRadius = "50%";
        image.style.objectFit = "cover";
        image.style.margin = "20px 0";
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
/* 
#image-preview {
  max-width: 100px;
  max-height: 100px;
  margin: 20px auto;
  object-fit: cover;
}
#image-preview img {
  max-width: 100%;
  max-height: 100%;
} */
.userImg {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 20px 0;
}
.lists {
  margin: 0;
  padding: 0 5px;
}
.lists li  img {
  width: 22px;
}
.lists li {
  list-style: none;
  margin: 0;
}
</style>