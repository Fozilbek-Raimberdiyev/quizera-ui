<template>
  <div class="back">
    <img  class="loading" v-if="!isMounted" src="./assets/gif/spinner.gif" alt="Loading">
    <router-view v-else></router-view>
  </div>
</template>
<script>
import { mapActions, mapState, mapStores } from 'pinia'
import { loadingStore } from './stores/loading.store'
export default {
  data() {
    return {
      stateMounted : false
    }
  },
  methods : {
    ...mapActions(loadingStore,["setLoader", "startLoading", "hideLoading"])
  },
  computed : {
    ...mapState(loadingStore, ["isMounted", "loading"]),
    ...mapStores(loadingStore),
    setLoader() {
      if(this.isMounted) {
        return this.stateMounted=false
      } else {
        return this.stateMounted=true
      }
    }
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
  mounted() {
    setTimeout(() => {
      this.loadingStore.$patch({isMounted : true})
    }, 1000);
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
  .loading  {
    position: absolute;
    top: 40%;
    left: 45%;
    width: 100px;
  }
</style>