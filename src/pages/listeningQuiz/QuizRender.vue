<template>
  <div v-if="Object.values(listeningQuiz).length" style="position: relative">
    <div
      v-if="!isEnded"
      class="flex header items-center justify-between shadow-md"
      :class="{ sticky: isSticky }"
    >
      <div class="left">
        <h5>{{ listeningQuiz.name }}</h5>
      </div>
      <div class="center">
        <vue-plyr v-if="isUploadedTrack">
          <audio controls crossorigin playsinline>
            <source :src="listeningQuiz.audioPath" type="audio/mpeg" />
          </audio>
        </vue-plyr>
        <div v-else>
          <h6>Trek yuklanmoqda...</h6>
        </div>
      </div>
      <div class="right flex items-center">
        <n-countdown
          v-if="isUploadedTrack"
          :on-finish="onFinish"
          :duration="listeningQuiz.time * 60 * 1000"
        ></n-countdown>
        <a-button
          :disabled="!isUploadedTrack"
          style="margin-left: 5px"
          @click="checkQuiz(listeningQuiz.textArray)"
          type="primary"
          >Yakunlash</a-button
        >
      </div>
      <!-- <pre>{{ isSticky }}</pre> -->
    </div>
    <div
      v-else
      class="flex header items-center justify-between shadow-md"
      :class="{ sticky: isSticky }"
    >
      <div class="left">
        <h5>{{ listeningQuiz.name }}</h5>
      </div>
      <div class="center">
        <vue-plyr v-if="isUploadedTrack">
          <audio controls crossorigin playsinline>
            <source :src="listeningQuiz.audioPath" type="audio/mpeg" />
          </audio>
        </vue-plyr>
        <div v-else>
          <h6>Trek yuklanmoqda...</h6>
        </div>
      </div>
      <div class="right flex items-center">
        <!-- <n-countdown
            :on-finish="onFinish"
            :duration="listeningQuiz.time * 60 * 1000"
          ></n-countdown> -->
        <el-button
          style="margin-left: 5px; cursor: pointer"
          @click="tryAgain()"
          type="info"
          >Qayta urinish</el-button
        >
      </div>
      <!-- <pre>{{ isSticky }}</pre> -->
    </div>
    <div v-if="!isEnded">
      <div class="flex items-center content-between quiz">
        <div
          v-for="(text, index) in listeningQuiz.textArray"
          :key="index"
          style="margin: 5px; font-size: 18px"
        >
          <span v-if="text.isVisible">{{ text.label }}</span>
          <el-input v-else v-model="text.value"> </el-input>
        </div>
      </div>
      <!-- <pre>{{ listeningQuiz }}</pre> -->
      <div class="author" style="font-size: 20px">
        <span>Sinov muallifi : </span>
        <span style="margin-left: 1rem">
          <img
            style="
              width: 30px;
              border-radius: 5px;
              display: inline-block;
              margin-right: 5px;
            "
            :src="listeningQuiz.authorPathImage"
            alt="author"
          />
          <span>{{ listeningQuiz.authorFullName }}</span>
        </span>
      </div>
    </div>
    <div v-else>
      <!-- <h4>Yakunlandi</h4> -->
      <div>
        Sizning matningiz
        <span v-for="(text, index) in result" :key="index">
          <span
            style="font-size: 20px; margin: 0 5px"
            :class="{
              true: text.isCorrectFilled,
              error: !text.isVisible && !text.isCorrectFilled,
            }"
            >{{ text.value || text.label }}</span
          >
        </span>
      </div>
      <div>
        <h5>Asl matn</h5>
        <span v-for="(text, index) in result" :key="index">
          <span style="font-size: 20px; margin: 0 5px">{{ text.label }}</span>
        </span>
      </div>
      <!-- <pre>{{ result }}</pre> -->
    </div>
  </div>
  <div v-else>
    <n-empty description="Sinov yuklanmadi..."></n-empty>
  </div>
  <el-dialog
    :show-close="false"
    v-model="isShow"
    title="Parolni kiriting..."
    :width="smallScreen ? '70%' : '30%'"
    :before-close="handleClose"
  >
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <a-input
        placeholder="Parolni kiriting..."
        v-model:value="quizPassword"
        type="password"
        show-password
        @keypress.enter="checkPasswordQuiz()"
      ></a-input>
      <el-button
        style="margin-left: 1px"
        type="primary"
        class="cursor-pointer"
        @click="checkPasswordQuiz()"
        >Kirish</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import Swal from "sweetalert2";
import { mapActions, mapState } from "pinia";
import { listeningQuizStore } from "../../stores/references/listeningQuiz.store";
import listeningService from "../../services/listening.service";
import questionsService from "../../services/questions.service";
import axios from "axios";
import { useToast } from 'vue-toastification';
export default {
  data() {
    return {
      listeningService,
      result: [],
      isEnded: false,
      isSticky: false,
      isUploadedTrack: false,
      isShow: false,
      quizPassword: "",
    };
  },
  computed: {
    ...mapState(listeningQuizStore, ["list", "loading", "listeningQuiz"]),
  },
  methods: {
    ...mapActions(listeningQuizStore, ["getById", "getList"]),
    async checkQuiz() {
      listeningService.checkQuiz(this.listeningQuiz.textArray).then((res) => {
        this.result = res.data.result;
        this.isUploadedTrack = false;
      });
      this.isEnded = true;
    },
    tryAgain() {
      this.isEnded = false;
      this.getById(this.$route.params.id);
    },
    onFinish() {
      setTimeout(() => {
        this.isEnded = true;
        this.checkQuiz();
      }, 1000);
    },
    async checkPasswordQuiz() {
      try {
      let quiz =   await listeningService.getById(this.$route.params.id)
        let res = await listeningService.checkPasswordQuiz(
          quiz.data,
          this.quizPassword
        );
        this.getById(this.$route.params.id);
        this.isShow =false
        useToast().success('Muvaffaqqiyatli')
      } catch (e) {}
    },
  },
  created() {
    // console.log(this.listeningQuiz)
    // await axios(this.listeningQuiz.audioPath)
    // let observer = new IntersectionObserver()
    window.addEventListener("scroll", (e) => {
      // this.isSticky = window.innerHeight;
      // console.log(top, this.isSticky)
      if (top.pageYOffset > 145) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
      // console.log(innerHeight)
    });
  },
  // async beforeRouteEnter(to, from) {
  //   let res = await listeningService.getById(to.params.id);
  //   if (from.fullPath != "/listeningQuizzes" && res.data.isHasPassword) {
  //     const { value: password } = await Swal.fire({
  //       title: "Enter your password",
  //       input: "password",
  //       inputLabel: "Password",
  //       inputPlaceholder: "Enter your password",
  //       inputAttributes: {
  //         maxlength: 10,
  //         autocapitalize: "off",
  //         autocorrect: "off",
  //       },
  //     });

  //     if (password) {
  //       Swal.fire(`Entered password: ${password}`);
  //     }
  //   }
  // },
  async mounted() {
    let res = await listeningService.getById(this.$route.params.id);
    fetch(res.data.audioPath).then((audio) => {
      this.isUploadedTrack = true;
    });
    if (
      res.data.isHasPassword &&
      this.$route.matched[2].path != "/listeningQuizzes"
    ) {
      this.isShow = true;
    } else {
      this.getById(this.$route.params.id);
    }
  },
};
</script>
<style scoped>
.ant-input {
  padding: 0 3px !important;
}
.right {
  border: 1px solid #e3e5e9;
  padding: 5px;
  border-radius: 5px;
  font-size: 20px;
}
.quiz {
  padding: 5px 10px;
  border: 1px solid #e3e5e9;
  border-radius: 10px;
  margin: 1rem 0;
  min-height: 300px;
}
.sticky {
  position: sticky;
  left: 0;
  top: 2px;
  background: #fff;
  z-index: 99;
  padding: 5px 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  transition: all ease-in 0.4s;
}
.header {
  transition: all ease-out -4s;
}

.true {
  background: yellowgreen;
  color: #fff;
  padding: 1px 5px;
  border-radius: 5px;
  font-size: 20px;
  margin: 0 5px;
}
.error {
  background: red;
  color: #fff;
  padding: 1px 5px;
  border-radius: 5px;
  font-size: 20px;
  margin: 0 5px;
}
</style>