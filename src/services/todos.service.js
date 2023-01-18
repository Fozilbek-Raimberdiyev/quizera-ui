import axios from "axios";
const path = "http://localhost:8080/api";
export default {
  getList(params) {
    return axios.get(`${path}/todos`, {params});
  },
  addTodo(body) {
    return axios.post("/todos/add", body);
  },
  updateTodoById(id, body) {
    return axios.put(`${path}/todos/update`, body, {
      params: {
        ID: id,
      },
    });
  },
  deleteTodo(id) {
    return axios.delete(`${path}/todos/delete`, {
      params: {
        ID: id,
      },
    });
  },
  getById(id) {
    return axios.get(`${path}/todos/${id}`);
  },
};
