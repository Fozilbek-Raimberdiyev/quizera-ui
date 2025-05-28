import { $axios } from "./api.service"

export default {
    getNotifications() {
        return $axios.get("/")
    }
}