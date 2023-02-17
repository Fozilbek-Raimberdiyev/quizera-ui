import {$axios} from "./auth"
export default {
    getList() {
        return $axios.get(`/permissions`)
    },
    addPermissions (data) {
        return $axios.post(`/permissions/add`, data)
    },
}