<template>
  <div>
    <div class="create_user" style="display: block; text-align: right">
      <el-button type="primary" @click="$router.push({ name: 'Todo add' })"
        >Add todo</el-button
      >
      <!-- {{ $ability }} -->
    </div>
    <div v-if="list.length">
      <div style="min-height: 350px">
        <table class="responsive-table striped">
          <thead>
            <th>№</th>
            <th>Name</th>
            <th>Description</th>
            <th>Begin date</th>
            <th>End date</th>
            <th>Time left</th>
            <th>Actions</th>
          </thead>
          <tbody v-for="(todo, index) in list" :key="index">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ todo.name }}</td>
              <td>{{ todo.description }}</td>
              <td>{{ toDDMMYY(todo.date) }}</td>
              <td>{{ toDDMMYY(todo.endDate) }}</td>
              <td>{{ minusTwoDates(todo.endDate, Date.now()) }}</td>
              <td>
                <div
                  style="
                   display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                  "
                >
                  <el-button
                    @click="$router.push(`/todos/${todo._id}/update`)"
                    type="text"
                    style="cursor: pointer"
                    ><i class="bx bxs-edit"></i
                  ></el-button>
                  <a-popconfirm
                    title="Are you sure delete this todo?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteTodo(todo._id)"
                    @cancel="cancel"
                  >
                    <i
                      style="cursor: pointer; color: #429fff"
                      class="bi bi-trash"
                    ></i>
                  </a-popconfirm>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <el-pagination
        style="margin-top: 1rem"
        v-model:current-page="page"
        background
        layout="prev, pager, next"
        :total="total"
      />
    </div>
    <div v-else>
      <el-empty description="Todos not found"></el-empty>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { todoStore } from "../../stores/todos.store";
import { toDDMMYY, minusTwoDates } from "../utils/date.formatter";
export default {
  data: () => ({
    page: 1,
  }),
  computed: {
    ...mapState(todoStore, ["list", "total", "params"]),
  },
  watch: {
    page(value) {
      this.params.page = value;
      this.getList(this.params);
    },
  },
  methods: {
    ...mapActions(todoStore, ["getList", "deleteById"]),
    toDDMMYY,
    minusTwoDates,
    async deleteTodo(id) {
      await this.deleteById(id);
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
table {
  margin-top: 5px;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
}
thead {
  /* background: #2a2a2e; */
  color: #000;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  /* background-color: #dddddd; */
}
</style>