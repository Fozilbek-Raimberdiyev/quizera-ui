import { defineStore } from "pinia";
import todosService from "../services/todos.service";

export const todoStore = defineStore("todoStore", {
  state: () => ({
    list: [],
    total : "",
    params : {
      page : 1,
      limit : 10
    }
  }),
  actions: {
    async getList(page, limit) {
      let res = this.list = (await todosService.getList(this.params)).data;
      this.list = res.todos;
      this.total = res.total;
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
  },
});
