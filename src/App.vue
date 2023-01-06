<template>
  <div class="back">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions, mapStores } from 'pinia'
import { loadingStore } from './stores/loading.store'
export default {
  methods : {
    ...mapActions(loadingStore,["setLoader", "startLoading", "hideLoading"])
  },
  computed : {
    ...mapStores(loadingStore)
  },
  watch : {
    // "loadingStore.loading"(val) {
    //   if(val) {
    //     this.startLoading()
    //   } else {
    //     this.hideLoading()
    //   }
    // }
  },
  created() {
    // this.setLoader()
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
  .back {
    /* background: #eef0f8;
    height: 100vh; */
  }
</style>