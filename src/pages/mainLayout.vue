<template>
  <div class="">
    <!-- <hr style="margin-bottom: 1rem; color: #e3e5e9;"> -->
    <div style="margin: 1rem 0">
      <div class="text-center">
        <i
          class="bx bx-bar-chart-alt-2"
          style="font-size: 1.2rem; margin-right: 5px"
        ></i>
        <span style="font-size: 2rem">{{
          $t("pages.dashboard.statistics")
        }}</span>
      </div>
      <div class="bar" :class="[smallScreen ? 'small-screen' : 'big-screen']">
        <div class="teachers shadow-md">
          <i class="bi bi-briefcase"></i>
          <span>{{ $t("pages.dashboard.countTeachers") }}</span>
          <p>35</p>
        </div>
        <div class="students">
          <i class="bi bi-mortarboard"></i>
          <span>{{ $t("pages.dashboard.countStudents") }}</span>
          <p>75</p>
        </div>
        <div class="opentests">
          <i class="bi bi-question-square"></i>
          <span>{{ $t("pages.dashboard.countOpenTests") }}</span>
          <p>100</p>
        </div>
      </div>
    </div>
    <div class="charts">
      <!-- <hr style="margin: 1rem 0; color: #e3e5e9;"> -->
      <div class="flex items-center justify-center">
        <i style="font-size: 1.2rem; margin-right: 5px" class="bx bx-chart"></i>
        <span style="font-size: 2rem">{{
          $t("pages.dashboard.infographics")
        }}</span>
      </div>
      <div class="flex justify-center">
        <div style="height: 200px">
          <bar-chart style="position: relative"></bar-chart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BarChart from "../components/charts/BarChart.vue";
import { mapState } from "pinia";
import { userStore } from "../stores/management/user.store";
import { listeningQuizStore } from '../stores/references/listeningQuiz.store';
export default {
  components: {
    BarChart,
  },
  data() {
    return {
      smallScreen: false,
    };
  },
  computed: {
    ...mapState(userStore, ["user"]),
  },
  methods: {
    async sendFile(e) {
      let audio = e.srcElement[0].files[0];
      let formData = new FormData();
      formData.append("audio", audio, audio.name);
      let res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  },
  mounted() {
    this.smallScreen = window.innerWidth < 600;
    listeningQuizStore().getList(10,1,false)
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.vue-chartjs .chart-title {
  font-size: 18px;
}
.bar.big-screen {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.bar.small-screen {
  display: block;
}
.bar > div {
  background: #fff;
  border: 1px solid #e3e5e9;
  padding: 10px 50px;
  box-shadow: 2px 2px 4px 0px #409eef, -2px -2px 4px 0px #409eef;
  flex-basis: 32%;
  border-radius: 10px;
  margin: 1rem 0;
}
.bar > div > span,
.bar > div > i {
  font-size: 1.5rem;
  margin: 0 5px;
}
.bar > div > p {
  font-size: 1.2rem;
  margin: 0 5px;
}

.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #63acec;
  overflow: hidden;
  user-select: none;
  border-radius: 10px;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  padding: 2rem 1rem;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
.content {
  padding: 1rem 0.5rem;
}
</style>