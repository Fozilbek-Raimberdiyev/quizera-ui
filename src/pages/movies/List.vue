<template>
  <div>
    <label style="text-align: right">
      <el-input
        style="width: 300px"
        clearable
        size="large"
        v-model="searchName"
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="Search"
      />
      <el-button type="primary" size="large" @click="searchMovies(search)"
        >Izlash</el-button
      >
    </label>
    <div>
      <div class="movies" v-if="list.length">
          <a-row :gutter="[8,48]" class="movie" v-for="movie in list" :key="movie?.id">
            <a-card :span="12">
              <router-link @click="toInfo = true" :to="`/movies/${movie.id}`">
                <p class="title">
                  <el-link :to="`/movies/${movie.id}`" :underline="false"
                    ><b>{{ movie.original_title }}</b></el-link
                  >
                </p>
              </router-link>
              <el-skeleton :loading="loading">
                <template #template>
                  <el-skeleton-item
                    variant="image"
                    style="width: 240px; height: 240px"
                  />
                </template>
                <template #default>
                  <a-image
                    :width="200"
                    :src="`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`"
                  />
                </template>
              </el-skeleton>
              <p class="description">{{ movie.overview }}</p>
              <p class="rating">
                <b>Rating</b> :
                {{ movie.vote_average }}
              </p>
              <p class="realease_date">
                <b>Release date</b> :
                {{ movie.release_date }}
              </p>
            </a-card>
          </a-row>
        <div class="pagination">
          <el-pagination
            :page-size="20"
            :pager-count="11"
            layout="prev, pager, next"
            :total="total"
            background
            :v-model:current-page="page"
            @update:current-page="updateCurPage"
          />
        </div>
      </div>
      <div v-else>
        <!-- <el-empty
          :image-size="350"
          size="large"
          description="Ma'lumot topilmadi"
        /> -->
      <a-empty></a-empty>
      </div>
      <!-- <div v-else>
        
        <loading 
        v-model:active="$loading"
        :is-full-page="true"/>
        </div> -->
    </div>
  </div>
</template>
<script>
// Import component
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { app } from "../../main";
import { Search } from "@element-plus/icons-vue";
import { mapActions, mapState } from "pinia";
import { movieStore } from "../../stores/movie.store";
import { loadingStore } from "../../stores/loading.store";
export default {
  data() {
    return {
      Search,
      page: 1,
      app,
      rating: "",
      searchName: "",
    };
  },
  computed: {
    ...mapState(movieStore, ["list", "total", "search"]),
    ...mapState(loadingStore, ["loading"]),
  },
  props : ["size", "large","small", "default", "type", "primart", "info", "succes", "text", "native-type", "submit", "cancel"],
  watch: {
    search() {
      if (!this.search) {
        // this.movieStore.total = this.movieStore.movies?.total_results;
        this.getMovies();
      }
      // movieStore.search = val
      // this.movieStore.search = val;
      // this.movieStore.searchMovies(this.movieStore.search)
    },
  },
  methods: {
    ...mapActions(movieStore, ["searchMovies", "getPage", "getList"]),
    updateCurPage(v) {
      this.page = v;
      this.getPage(v);
    },
  },
  created() {
    this.getList();
    this.rating = "";
  },
  components: { Loading },
};
</script>
<style scoped>
.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
}
.movie {
  flex-basis: 45%;
}
.movie img {
  height: 250px;
}
.pagination {
  margin: 3rem 0;
  display: block;
  margin-left: 3rem;
}
.title a {
  font-size: 18px;
}
.description {
  height: 200px;
  overflow-y: auto;
}
</style>