<template>
    <div>
        <h1>Movies</h1>
        <label>
            <el-input
        v-model="movieStore.search"
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="Search"
        @change="searchMovies(movieStore.search)"
      />
        </label>
        <div class="movies">
            <div class="movie" v-for="(movie) in movieStore?.list" :key="movie?.id">
            <!-- <pre>{{ movie }}</pre> -->
            <p class="title">{{ movie.original_title }}</p>
            <img :src="`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`" alt="">
            <p class="desc">{{ movie.overview }}</p>
            <p class="rating">{{ movie.vote_average }}</p>
        </div>
        </div>
        <div class="pagination">
            <el-pagination  
            :page-size="20"
            :pager-count="11"
            layout="prev, pager, next"
            :total="movieStore.total"
            background            
            />
        </div>
    </div>
</template>
<script>
import {  Search } from '@element-plus/icons-vue'
import { mapStores, mapActions } from 'pinia'
import { movieStore } from '../../stores/movie.store';
import axios from 'axios';
export default {
    data() {
        return {
            posts : [],
            Search,
        }
    },
    computed : {
        ...mapStores(movieStore, ["search"])
    },
    watch : {
       search(val) {
        // movieStore.search = val
        this.movieStore.search = val
       }
    },
    methods : {
        ...mapActions(movieStore, ["searchMovies"]),
       async getPosts() {
            // let res = await axios.get("http://jsonplaceholder.typicode.com/posts");
            let res = await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=fa61e6fa7724edd99048bc5f0b11ae72")
            this.posts = res
        }
    },
    created() {
        // this.getPosts()
        this.movieStore.getList()
    }
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