<template>
  <div class="">
    <div class="slider">
      <div class="flex items-center justify-center">
        <i class="bi bi-table" style="font-size: 1.2rem; margin-right: 5px"></i>
        <span style="font-size: 2rem">Doska</span>
      </div>
      <a-carousel arrows style="margin-bottom: 1rem">
        <template #prevArrow>
          <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
            <i class="bi bi-arrow-left-circle-fill"></i>
          </div>
        </template>
        <template #nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <i class="bi bi-arrow-right-circle-fill"></i>
          </div>
        </template>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </a-carousel>
    </div>
    <!-- <hr style="margin-bottom: 1rem; color: #e3e5e9;"> -->
    <div style="margin: 1rem 0">
      <div class="flex justify-center items-center">
        <i
          class="bx bx-bar-chart-alt-2"
          style="font-size: 1.2rem; margin-right: 5px"
        ></i>
        <span style="font-size: 2rem">Statistika</span>
      </div>
      <div class="bar flex shadow-md justify-between">
        <div class="teachers shadow-md">
          <i class="bi bi-briefcase"></i>
          <span>O'qituvchilar soni</span>
          <p>35</p>
        </div>
        <div class="students">
          <i class="bi bi-mortarboard"></i>
          <span>O'quvchilar soni</span>
          <p>75</p>
        </div>
        <div class="opentests">
          <i class="bi bi-question-square"></i>
          <span>Ochiq testlar soni</span>
          <p>100</p>
        </div>
      </div>
    </div>
    <div class="charts">
      <!-- <hr style="margin: 1rem 0; color: #e3e5e9;"> -->
      <div class="flex items-center justify-center">
        <i style="font-size: 1.2rem; margin-right: 5px;" class="bx bx-chart"></i>
        <span style="font-size: 2rem;">Infografika</span>
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
import BarChart from "../components/charts/BarChart.vue";
export default {
  components: {
    BarChart,
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.vue-chartjs .chart-title {
  font-size: 18px;
}
.bar > div {
  background: #fff;
  border: 1px solid #e3e5e9;
  padding: 10px 50px;
  box-shadow: 2px 2px 4px 0px #409eef, -2px -2px 4px 0px #409eef;
  flex-basis: 32%;
  border-radius: 10px;
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
</style>