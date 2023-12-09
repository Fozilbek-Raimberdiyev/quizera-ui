<template>
  <div class="back bg-slate-700">
    <router-view></router-view>
  </div>
  <n-back-top
    :bottom="100"
    :visibility-height="300"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)',
    }"
  >
    <div
      style="
        width: 50px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
      "
    >
      <i class="bx bxs-to-top"></i>
      <!-- <i class='bx bxs-upvote'></i> -->
    </div>
  </n-back-top>
</template>
<script setup lang="ts">
import NProgress from "nprogress";
import { useRouter } from "vue-router";
import "./assets/css/nprogress.css";
const router = useRouter();
router.beforeEach(() => {
  NProgress.start();
});
router.afterEach(() => {
  NProgress.done();
});
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.loading {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 50px;
}
</style>
