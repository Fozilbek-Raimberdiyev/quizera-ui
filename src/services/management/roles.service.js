import { $axios } from "../api.service";
export default {
    async getList() {
        return $axios.get("/roles")
    },
    addRole(data) {
        return $axios.post("/roles/add", data)
    }
}