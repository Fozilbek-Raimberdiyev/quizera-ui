import { defineStore } from "pinia";
import auth from "../services/auth";
import todosService from "../services/todos.service";

export const todoStore = defineStore("todoStore", {
  state: () => ({
    list: [],
    loading : false,
    total: "",
    params: {
      page: 1,
      limit: 10,
    },
  }),
  actions: {
    async getList(page, limit) {
      this.loading = true
      let res = (this.list = (await todosService.getList(this.params)).data);
      this.list = res.todos;
      this.total = res.total;
      this.loading = false
    },
    addTodo (data) {
      return todosService.addTodo(data)
    },
    async updateById(id, body) {
      return todosService.updateTodoById(id, body);
    },
    async getById(id) {
      return todosService.getById(id);
    },
    async deleteById(id) {
      return todosService.deleteTodo(id);
    },
    async updateStatusById(id, body) {
      let res = await todosService.updateStatusById(id,body);
      return this.getList()
    }
  },
});
