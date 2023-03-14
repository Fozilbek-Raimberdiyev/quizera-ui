import { $axios } from "./auth";

export default {
  getList(page, limit, isForReference) {
    return $axios.get("/listeningQuiz/", {
      params: {
        page,
        limit,
        isForReference,
      },
    });
  },
  addListeningQuiz(formData) {
    return $axios.post("/listeningQuiz/add", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  getById(id) {
    return $axios.get(`listeningQuiz/${id}`);
  },
  updateQuiz(body, id) {
    return $axios.put("/listeningQuiz/update", body, { params: { ID: id } });
  },
  deleteQuiz(id) {
    return $axios.delete("/listeningQuiz/delete", { params: { ID: id } });
  },
  updateQuizStatus(body) {
    return $axios.put("/listeningQuiz/statusUpdate", body);
  },
  checkQuiz(textArray) {
    return $axios.post('/listeningQuiz/check', textArray)
  },
  checkPasswordQuiz(quiz, password) {
    return $axios.post("/listeningQuiz/checkPassword", { quiz, password });
  }
};
