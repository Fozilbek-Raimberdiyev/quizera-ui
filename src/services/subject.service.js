import {$axios} from "./auth"

export default {
    getSubjects() {
        return $axios.get("/subjects")
    },
    addSubject(body) {
        return $axios.post("/subjects/add", body)
    },
    getById(id) {
        return $axios.get(`subjects/${id}`)
    },
    updateSubject(body) {
        return $axios.put("/subjects/update", body)
    }
}