import {$axios} from "./auth"

export default {
    getSubjects(limit, page) {
        return $axios.get("/subjects", {params : {limit, page}})
    },
    addSubject(body) {
        return $axios.post("/subjects/add", body)
    },
    getById(id) {
        return $axios.get(`subjects/${id}`)
    },
    updateSubject(body, id) {
        return $axios.put("/subjects/update", body,{params : {ID : id}})
    },
    deleteSubjectAndQuestions(id) {
        return $axios.delete("/subjects/delete", {params : {ID : id}})
    }
}