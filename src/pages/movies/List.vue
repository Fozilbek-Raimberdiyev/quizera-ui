<template>
    <div>
        <label style="text-align: right;">
            <el-input
            style="width: 300px;"
            clearable 
        size="large"
        v-model="movieStore.search"
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="Search"
      />
      <el-button type="primary" size="large" @click="movieStore.searchMovies(movieStore.search)">Izlash</el-button>
        </label>
        <div>
            <div class="movies" v-if="movieStore.list.length">
            <div class="movie" v-for="(movie) in movieStore?.list" :key="movie?.id">
            <!-- <router-link :to="`/movies/${movie.id}`">
            </router-link> -->
            
            <router-link @click="toInfo=true" :to="`/movies/${movie.id}`">
                <p class="title"><el-link :to="`/movies/${movie.id}`" :underline="false">{{ movie.original_title }}</el-link></p>
            </router-link>
            <!-- <el-link :underline="false">{{ movie.original_title }}</el-link> -->
            <!-- <img :src="`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`" alt="Photo"> -->
            <!-- <el-image
            style="width: 100px; height: 100px"
            :src="`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`"
            :zoom-rate="1.2"
            :preview-src-list="[`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`]"
            :initial-index="4"
            fit="cover"
            :hide-on-click-modal="true"
            :draggable="false"
            :lazy="true"
            loading="lazy"
            :preview-teleported="true"
            />
            <p class="desc">{{ movie.overview }}</p>
            <p class="rating">{{ movie.vote_average }}</p>
            <el-rate v-model="movie.vote_average" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" /> -->
            <el-skeleton :loading="loading">
                <template #template>
                    <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
                </template>
                <template #default>
                    <el-image
            style="width: 100px; height: 100px"
            :src="`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`"
            :zoom-rate="1.2"
            :preview-src-list="[`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`]"
            :initial-index="4"
            fit="cover"
            :hide-on-click-modal="true"
            :draggable="false"
            :lazy="true"
            loading="lazy"
            :preview-teleported="true"
            />
                </template>
            </el-skeleton>
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
            <el-empty  :image-size="350" size="large" description="Ma'lumot topilmadi" />
        </div>
        <!-- <div v-else>
        
        <loading 
        v-model:active="$loading"
        :is-full-page="true"/>
        </div> -->
        </div>
        <el-dialog
        v-model="toInfo"
        title="Tips"
        width="50%"
        >
        <router-view></router-view>
        </el-dialog>
    </div>
</template>
<script>
// Import component
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import {app} from "../../main"
import {  Search } from '@element-plus/icons-vue'
import { mapStores, mapActions, mapState } from 'pinia'
import { movieStore } from '../../stores/movie.store';
import { loadingStore } from '../../stores/loading.store';
export default {
    data() {
        return {
            Search,
            page: 1,
            app,
            rating : "",
            toInfo : false
        };
    },
    computed: {
        ...mapStores(movieStore, ["search"]),
        ...mapState(loadingStore, ["loading"])
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
        this.rating = ""
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
    .title a{
        font-size: 18px;
    }
</style>