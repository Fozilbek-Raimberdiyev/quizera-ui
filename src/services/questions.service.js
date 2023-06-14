import { $axios } from "./auth";
export default {
  getQuestions(subjectId, limit, page, boolean,subject, config) {
    return $axios.post("/questions", subject,{
      params: {
        subjectId,
        limit,
        page,
        forReference: boolean,
        config
      },
    });
  },
  addQuestion(body) {
    return $axios.post("/questions/add", body);
  },
  checkTests(body) {
    return $axios.post("/questions/check", body);
  },
  getById(id) {
    return $axios.get(`/questions/${id}`)
  },
  updateQuestion(id, body) {
    return $axios.put("/questions/update", body, {params : {ID : id}})
  },
  deleteTodo(id) {
    return $axios.delete(`/questions/delete`, {
      params: {
        ID: id,
      },
    });
  }
};
