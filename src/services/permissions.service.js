import axios from "axios"
import {$axios} from "./auth"
let path = "http://localhost:8080/api"
export default {
    getList() {
        return $axios.get(`${path}/permissions`)
    },
    addPermissions (data) {
        return $axios.post(`${path}/permissions/add`, data)
    },
}