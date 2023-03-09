import {$axios} from "./auth"

export default {
    getList() {
        
    },
    addListeningQuiz(formData) {
        return $axios.post("/listeningQuiz/add", formData)
    }
}