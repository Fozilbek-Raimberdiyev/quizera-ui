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
      <n-empty size="huge" description="Rollar topilmadi..."></n-empty>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { roleStore } from "../../../stores/management/role.store";
export default {
  components: {
    
  },
  data() {
    return {roles : []};
  },
  setup() {},
  computed: {
    // ...mapState(roleStore, ["roles"]),
  },
};
</script>
<style scoped>
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

tr:nth-child() {
  /* background-color: #dddddd; */
}
</style>