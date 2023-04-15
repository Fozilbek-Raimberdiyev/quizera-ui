 <template>
  <div class="back bg-slate-700">
    <!-- <h1 style="position: absolute; top: 50%; left: 50%; z-index: 99;"><pre>{{ loading }}</pre></h1> -->
    <q-inner-loading v-if="loading" :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    <router-view v-else></router-view>
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
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { loadingStore } from "./stores/loading.store";
import { useLoading } from "vue-loading-overlay";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
export default {
  data() {
    return {
      isMounted: false,
      loader: null,
      isLoaded: false,
    };
  },
  methods: {
    ...mapActions(loadingStore, ["setLoader", "startLoading", "hideLoading"]),
  },
  computed: {
    ...mapState(loadingStore, ["loading"]),
  },
  watch: {},
  async mounted() {
    // setTimeout(() => {
    //   (this.isMounted = true)
    // }, 100);
    this.isMounted = true
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
