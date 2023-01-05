import axios from "axios";
const apiKey = "fa61e6fa7724edd99048bc5f0b11ae72";
export default {
    getList() {
        return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
    },
    searchMovie(search) {
        return axios.get( `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}`)
    },
    getPage(page) {
        return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=fa61e6fa7724edd99048bc5f0b11ae72&page=${page}`)
    }
}