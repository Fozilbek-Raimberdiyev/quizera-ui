import {$axios} from "./auth"

export default {
    getSubjects(limit, page, isForReference) {
        return $axios.get("/subjects", {params : {limit, page, isForReference}})
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
    },
    updateStatusSubject(body) {
        return $axios.put("/subjects/statusUpdate", body)
    }
}