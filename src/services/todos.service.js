import { $axios } from "./auth";
export default {
  getList(params) {
    return $axios.get(`/todos`, { params });
  },
  addTodo(body) {
    return $axios.post("/todos/add", body);
  },
  updateTodoById(id, body) {
    return $axios.put(`/todos/update`, body, {
      params: {
        ID: id,
      },
    });
  },
  updateStatusById(id, body) {
    return $axios.put("/todos/statusUpdate", body, {
      params : {
        ID : id
      }
    })
  },
  deleteTodo(id) {
    return $axios.delete(`/todos/delete`, {
      params: {
        ID: id,
      },
    });
  },
  getById(id) {
    return $axios.get(`/todos/${id}`);
  },
};
