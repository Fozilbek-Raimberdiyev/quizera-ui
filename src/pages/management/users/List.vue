<template>
  <div>
    <div class="create_user">
      <el-button
        style="float: right; margin-bottom: 2px"
        type="primary"
        @click="$router.push({ name: 'User add' })"
        :style="[
          $ability.can('create', 'management') ? '' : 'pointer-events : none;',
        ]"
        :title="[
          $ability.can('create', 'management')
            ? ''
            : 'Sizning bu amalga ruxsatingiz yo\'/q',
        ]"
        >Create user</el-button
      >
      <!-- {{ $ability }} -->
    </div>
    <div v-if="users.length">
      <table class="responsive-table striped">
        <thead>
          <th>№</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Role</th>
          <th>Actions</th>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.role }}</td>
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
                  @click="dialogVisible = true"
                  type="text"
                  ><i class="bi bi-trash"></i
                ></el-button>
                <el-dialog
                  v-model="dialogVisible"
                  title="Tips"
                  width="30%"
                  :before-close="handleClose"
                >
                  <span>Do you want delete this user?</span>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button
                        :style="[
                          $ability.can('create', 'management')
                            ? ''
                            : 'pointer-events: none',
                        ]"
                        @click="dialogVisible = false"
                        >Cancel</el-button
                      >
                      <el-button
                        type="primary"
                        @click="deleteUser(index)"
                      >
                        Confirm
                      </el-button>
                    </span>
                  </template>
                </el-dialog>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <el-empty description="Users not found"></el-empty>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { userStore } from "../../../stores/management/user.store";
import { ability } from "../../../services/ability";
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState(userStore, ["users"]),
    ...mapStores(userStore),
  },
  methods: {
    ...mapActions(userStore, ["createUser"]),
    deleteUser(index) {
      this.currentIndex = index;
      this.users.splice(this.currentIndex, 1);
      localStorage.setItem("users", JSON.stringify(this.users));
      this.dialogVisible = false
    },
    toUpdate(index) {
      this.userStoreStore.$patch({ currentIndex: index });
      this.$router.push("/management/users/update");
    },
  },
};
</script>
<style scoped>
table {
  margin-top: 5rem;
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