<template>
    <div>
        <h1>Movies</h1>
        <label>
            <el-input
        v-model="movieStore.search"
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="Search"
      />
      <el-button @click="movieStore.searchMovies(movieStore.search)">Izlash</el-button>
        </label>
        <div>
            <div class="movies" v-if="movieStore.list.length">
            <div class="movie" v-for="(movie) in movieStore?.list" :key="movie?.id">
            <router-link :to="`/movies/${movie.id}`">
            <p class="title">{{ movie.original_title }}</p>
            </router-link>
            <img :src="`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`" alt="Photo">
            <p class="desc">{{ movie.overview }}</p>
            <p class="rating">{{ movie.vote_average }}</p>
        </div>
        <div class="pagination">
            <el-pagination  
            :page-size="20"
            :pager-count="11"
            layout="prev, pager, next"
            :total="movieStore.total"
            background
            :v-model:current-page="page"
            @update:current-page="updateCurPage"            
            />
        </div>
        </div>
        <div v-else>
            <el-empty  :image-size="350" description="Ma'lumot topilmadi" />
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import {app} from "../../main"
import {  Search } from '@element-plus/icons-vue'
import { mapStores, mapActions } from 'pinia'
import { movieStore } from '../../stores/movie.store';
export default {
    data() {
        return {
            Search,
            page: 1,
            app
        };
    },
    computed: {
        ...mapStores(movieStore, ["search"])
    },
    watch: {
        "movieStore.search"() {
            if (!this.movieStore.search) {
                // this.movieStore.total = this.movieStore.movies?.total_results;
                this.getMovies()
            }
            // movieStore.search = val
            // this.movieStore.search = val;
            // this.movieStore.searchMovies(this.movieStore.search)
        }
    },
    methods: {
        ...mapActions(movieStore, ["searchMovies"]),
        async getMovies() {
            try {   
                this.movieStore.getList();
            }
            catch(e) {
            }
        },
        updateCurPage(v) {
            this.page = v;
            this.movieStore.getPage(v);
        }
    },
    created() {
        this.getMovies();
    },
    components: { Loading }
}
</script>
<style scoped>
    .movies {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
    .movie {
        flex-basis: 45%;
    }
    .movie img {
        height: 250px;
    }
    .pagination {
        margin-top: 0.5rem;
        display: block;
        text-align: center;
    }
</style>