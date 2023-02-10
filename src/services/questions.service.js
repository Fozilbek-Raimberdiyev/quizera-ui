import { $axios } from "./auth";
export default {
  getQuestions(subjectId, limit, page, boolean,subject) {
    return $axios.get("/questions", {
      params: {
        subjectId,
        limit,
        page,
        forReference: boolean,
        subject
      },
    });
  },
  addQuestion(body) {
    return $axios.post("/questions/add", body);
  },
  checkTests(body) {
    return $axios.post("/questions/check", body);
  },
};
