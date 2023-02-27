import { $axios } from "./auth";
export default {
  getResult(query) {
    return $axios.get("/results", {
      params: {
        query,
      },
    });
  },
  addComment(data) {
    return $axios.post("/results/addComment", data)
  }
};
