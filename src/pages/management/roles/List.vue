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
            <td @click="expandData(index)" class="permissions">
              <p :data-index="index"
                v-for="item in role.permissions"
                :key="item.value"
              >
                {{ item.subject + " " + item.action }}
            </p>
            </td>
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
  components: {},
  data() {
    return {};
  },
  setup() {},
  computed: {
    ...mapState(roleStore, ["roles"]),
  },
  methods: {
    ...mapActions(roleStore, ["getList"]),
    expandData(index) {
     document.querySelector(`[data-index="${index}"]`).parentElement.classList.toggle("expanded")
      // document.querySelector(".permissions").dataset.index.classList.toggle("expanded");
    }
  },
  mounted() {
    this.getList();
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
  height: 40px;
}

tr:nth-child() {
  /* background-color: #dddddd; */
}
.permissions {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.permissions.expanded {
  display: block;
  height: 200px;
  overflow-y: auto;
}
</style>
