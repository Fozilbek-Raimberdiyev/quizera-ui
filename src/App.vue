 <template>
  <div class="back">
    <!-- <img
      class="loading"
      v-if="!isMounted"
      src="./assets/gif/spinner.gif"
      alt="Loading"
    /> -->
    <loading
      v-model:active="loading"
      :can-cancel="true"
      :on-cancel="false"
      :is-full-page="true"
    />
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
    <i class='bx bxs-to-top'></i>
    <!-- <i class='bx bxs-upvote'></i> -->
    </div>
  </n-back-top>
</template>
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { loadingStore } from "./stores/loading.store";
import { useLoading } from "vue-loading-overlay";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default {
  data() {
    return {
      stateMounted: false,
      loader: null,
      isLoaded: false,
    };
  },
  methods: {
    ...mapActions(loadingStore, ["setLoader", "startLoading", "hideLoading"]),
  },
  computed: {
    ...mapState(loadingStore, ["isMounted", "loading"]),
    ...mapStores(loadingStore),
    setLoader() {
      if (this.isMounted) {
        return (this.stateMounted = false);
      } else {
        return (this.stateMounted = true);
      }
    },
  },
  watch: {},
  mounted() {
    setTimeout(() => {
      this.loadingStore.$patch({ isMounted: true });
    }, 1000);
  },
  created() {},
};
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
