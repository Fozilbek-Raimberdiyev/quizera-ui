import { $axios } from "./auth"

export default {
    getNotifications() {
        return $axios.get("/")
    }
}