import axios from "axios"
const path = "http://localhost:3000/api"
export const  $axios = axios.create({
    baseURL : path,
    headers : {
        "Authorization" : localStorage.getItem("token")
    }
})

export default {
    register(form) {
        return $axios.post(`/auth/register`, form)
    },
    login(form) {
        return $axios.post(`/auth/login`, form)
    },
    setHeader(token) {
        axios.defaults.headers.common["authorization"] = token;
    }
}
