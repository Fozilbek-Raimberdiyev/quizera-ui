import { $axios } from "./auth";

export default {
  getSubjects(params) {
    return $axios.get("/subjects", { params });
  },
  addSubject(body) {
    return $axios.post("/subjects/add", body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  getById(id) {
    return $axios.get(`subjects/${id}`);
  },
  updateSubject(body, id) {
    return $axios.put("/subjects/update", body, { params: { ID: id } });
  },
  deleteSubjectAndQuestions(id) {
    return $axios.delete("/subjects/delete", { params: { ID: id } });
  },
  updateStatusSubject(body) {
    return $axios.put("/subjects/statusUpdate", body);
  },
  checkPasswordSubject(subject, password) {
    return $axios.post("/subjects/checkPassword", { subject, password });
  },
};
