<template>
  <div>
    <BaseLoading v-if="loading"></BaseLoading>
    <div v-if="listeningQuiz" style="position: relative">
      <div
        v-if="!isEnded"
        class="flex header items-center justify-between shadow-md"
        :class="{ sticky: isSticky }"
      >
        <div class="left">
          <h5>{{ listeningQuiz.name }}</h5>
        </div>
        <div class="center">
          <vue-plyr v-if="listeningQuiz.audioPath">
            <audio controls playsinline>
              <source
                :src="apiBaseUrl + listeningQuiz.audioPath"
                type="audio/mpeg"
              />
            </audio>
          </vue-plyr>
        </div>
        <div class="right flex items-center">
          <n-countdown
            v-if="!loading"
            :on-finish="onFinish"
            :duration="listeningQuiz.time * 60 * 1000"
          ></n-countdown>
          <!-- <a-button
          :disabled="!isUploadedTrack"
          style="margin-left: 5px"
          @click="checkQuiz(listeningQuiz.textArray)"
          type="primary"
          >Yakunlash</a-button
        > -->
          <a-popconfirm
            title="Haqiqatdan yakunlamoqchimisiz?"
            ok-text="Ha"
            :disabled="loading"
            cancel-text="Yo'q"
            @confirm="checkQuiz"
            @cancel="cancel"
            class="cursor-pointer"
          >
            <a-button style="margin-left: 5px" type="primary"
              >Yakunlash</a-button
            >
          </a-popconfirm>
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
          <!-- <vue-plyr>
            <audio controls crossorigin playsinline>
              <source :src="listeningQuiz.audioPath" type="audio/mpeg" />
            </audio>
          </vue-plyr> -->
          <vue-plyr>
            <audio controls crossorigin playsinline>
              <source :src="listeningQuiz.audioPath" type="audio/mpeg" />
            </audio>
          </vue-plyr>
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
              :src="apiBaseUrl + listeningQuiz.authorPathImage"
              alt="author"
            />
            <span>{{ listeningQuiz.authorFullName }}</span>
          </span>
        </div>
      </div>
    </div>
    <div v-else-if="result">
      <div>
        <h5 class="font-medium">Sizning matningiz</h5>
        <div class="flex items-center justify-start flex-wrap">
          <span
            v-for="(text, index) in result?.result"
            :key="index"
            class="mx-1"
          >
            <span
              class="flex items-center justify-start flex-wrap font-normal text-lg font-[SF Pro Display]"
              :class="[
                text?.isCorrectFilled
                  ? 'text-[yellowgreen] border-b-2 border-solid border-[yellowgreen]'
                  : !text?.isVisible && !text?.isCorrectFilled
                  ? 'text-[red] border-b-2 border-solid border-[red]'
                  : '',
              ]"
              ><p v-if="text?.value" class="mr-2">
                {{ text.value }}
              </p>
              <p class="mr-2" v-else>{{ text?.label }}</p>
            </span>
          </span>
        </div>
      </div>
      <hr class="my-3" />
      <div>
        <h5>Asl matn</h5>
        <span v-for="(text, index) in result?.result" :key="index">
          <span
            style="font-size: 20px; margin: 0 5px; width: 100%; overflow: auto"
            ><span style="display: inline-block">
              {{ text.label }}
            </span></span
          >
        </span>
      </div>
      <!-- <pre>{{ result }}</pre> -->
    </div>
    <div v-else-if="loading">
      <a-skeleton :loading="loading" active> </a-skeleton>
    </div>
    <div v-else>
      <n-empty description="Sinov yuklanmadi..."></n-empty>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { listeningQuizStore } from "../../stores/references/listeningQuiz.store";
import listeningService from "../../services/listening.service";
import BaseLoading from "../../components/BaseLoading.vue";
export default {
  components: {
    BaseLoading,
  },
  data() {
    return {
      listeningService,
      quizPassword: "",
      isSticky: false,
      isEnded: false,
      result: [],
    };
  },
  computed: {
    ...mapState(listeningQuizStore, [
      "listeningQuiz",
      "loading",
      "isFromNotList",
    ]),
    apiBaseUrl() {
      return import.meta.env.VITE_API_BASE_URL;
    },
  },
  methods: {
    ...mapActions(listeningQuizStore, ["getById"]),
    async checkPasswordQuiz() {
      let res = await listeningService.checkPasswordQuiz(
        this.$route.params.id,
        this.quizPassword
      );
      if (res.data.isAllowed) {
        listeningQuizStore().$patch({ loading: true });
        listeningQuizStore().$patch({ isFromNotList: false });
        this.getById(this.$route.params.id);
        listeningQuizStore().$patch({ loading: false });
      }
    },
    async checkQuiz() {
      this.isEnded = true;
      let res = await listeningService.checkQuiz(this.listeningQuiz.textArray);
      listeningQuizStore().$patch({ listeningQuiz: null });
      this.result = res.data;
    },
  },
  mounted() {
    this.getById(this.$route.params.id);
    window.addEventListener("scroll", (e) => {
      if (top.pageYOffset > 145) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    });
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
  border-bottom: 1px solid yellowgreen;
  border-radius: 5px;
}
.error {
  border-bottom: 1px solid red;
  border-radius: 5px;
}
p {
  margin: 0 !important;
}
</style>
