<template>
  <div>
    <div class="flex header items-center justify-between">
      <div class="left">
        <h5>{{ listeningQuiz.name }}</h5>
      </div>
      <div class="center">
        <vue-plyr>
          <audio controls crossorigin playsinline>
            <source :src="listeningQuiz.audioPath" type="audio/mpeg" />
          </audio>
        </vue-plyr>
      </div>
      <div class="right flex items-center">
        <img
          style="width: 30px; border-radius: 5px"
          :src="listeningQuiz.authorPathImage"
          alt="author"
        />
        <n-countdown
          :on-finish="onFinish"
          :duration="listeningQuiz.time * 60 * 1000"
        ></n-countdown>
        <a-button style="margin-left: 5px;" @click="endQuiz" type="primary">Yakunlash</a-button>
      </div>
    </div>
    <div class="flex items-center content-between">
      <div v-for="(text, index) in listeningQuiz.textArray" :key="index" style="margin: 5px;font-size: 18px;">
        <span v-if="text.isVisible" >{{
          text.label
        }}</span>
        <el-input
          v-else
          v-model="text.value"
        >
    <pre>{{ text.value }}</pre></el-input>
      </div>
    </div>
    <!-- <pre>{{ listeningQuiz }}</pre> -->
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { listeningQuizStore } from "../../stores/references/listeningQuiz.store";
export default {
  computed: {
    ...mapState(listeningQuizStore, ["list", "loading", "listeningQuiz"]),
  },
  methods: {
    ...mapActions(listeningQuizStore, ["getById", "getList"]),
  },
  mounted() {
    this.getById(this.$route.params.id);
  },
};
</script>
<style scoped>
    .ant-input {
        padding: 0 3px !important;
    }
    .right {
      border: 1px solid #e3e5e9;
      padding:  5px;
      border-radius: 5px;
      font-size: 20px;
    }
</style>