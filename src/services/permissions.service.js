import {$axios} from "./api.service"
export default {
    getList() {
        return $axios.get(`/permissions`)
    },
    addPermissions (data) {
        return $axios.post(`/permissions/add`, data)
    },
}