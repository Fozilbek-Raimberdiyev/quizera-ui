<template>
  <div>
    <div class="create_user">
      <el-button
        style="float: right; margin-bottom: 2px"
        type="primary"
        @click="$router.push({ name: 'Role create' })"
        >Create role</el-button
      >
    </div>
    <div v-if="roles.length >= 1">
      <table>
        <thead>
          <th>№</th>
          <th>Role name</th>
          <th>Permission</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr v-for="(role, index) in roles" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ role.name }}</td>
            <td>{{ role.lastName }}</td>
            <td>
              <div>
                <el-button
                  @click="toUpdate(index)"
                  type="text"
                  style="cursor: pointer"
                  ><i class="bx bxs-edit"></i
                ></el-button>
                <el-button
                  style="cursor: pointer"
                  @click="deleteUser(index)"
                  type="text"
                  ><i class="bi bi-trash"></i
                ></el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <el-empty description="Roles not found"></el-empty>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import TableLite from "vue3-table-lite";
import { roleStore } from "../../../stores/management/role.store";
export default {
  components: {
    TableLite,
  },
  data() {
    return {};
  },
  setup() {},
  computed: {
    ...mapState(roleStore, ["roles"]),
  },
  mounted() {},
};
</script>
<style scoped>
/* @import url("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"); */
table {
  margin-top: 5rem;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
thead {
  background: #2a2a2e;
  color: #fff;
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