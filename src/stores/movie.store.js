import { defineStore } from "pinia";
import movieService from "../services/movie.service";
export const movieStore = defineStore("movie", {
    state : () => ({
        movies : [],
        search : "",
        total : 20,
    }),
    actions : {
       async getList() {
        this.movies = await movieService.getList();
        this.total = this.movies?.data?.total_results;
        this.movies = this.movies?.data?.results;   
        },
        async searchMovies (search) {
            try{
                let res = await movieService.searchMovie(search);
                this.movies = res?.data?.results;
                this.total = res?.data?.total_results;
            }
            catch(e) {
                this.movies = []
            }
            finally {
                
            }
            // this.isStartedSearch = false
        },
        async getPage(page) {
            try {
                let res = await movieService.getPage(page);
                this.movies = res?.data?.results;
                this.total = res?.data?.total_results;
            }
            catch(e) {
                this.movies = [];
                this.total = 20;
            }
        }
    },
    getters : {
        list() {
           return this.movies
        }
    }
})