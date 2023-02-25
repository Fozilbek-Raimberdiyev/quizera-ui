<template>
  <div>
    <div class="create_user flex justify-end" style="margin: 5px 0">
      <el-button
        type="primary"
        class="cursor-pointer"
        @click="$router.push('/management/users/add')"
        >Add user</el-button
      >
      <!-- {{ $ability }} -->
    </div>
    <!-- <div v-if="users.length">
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
                        @click="dialogVisible = false"
                        >Cancel</el-button
                      >
                      <el-button
                        type="primary"
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
    </div> -->
    <div class="q-pa-md" style="padding: 0">
      <q-markup-table v-if="users.length">
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-right">Ismi</th>
            <th class="text-right">Familiyasi</th>
            <th class="text-right">Telefon raqami</th>
            <th class="text-right">Email</th>
            <th class="text-right">Roli</th>
            <th class="text-right">Ro'yhatdan o'tgan sanasi</th>
            <th class="text-right">Harakatlar</th>
          </tr>
        </thead>
        <tbody v-for="(user, index) in users" :key="index">
          <tr>
            <td class="text-left">{{ index + 1 }}</td>
            <td class="text-right">{{ user.firstName }}</td>
            <td class="text-right">{{ user.lastName }}</td>
            <td class="text-right">{{ user.phoneNumber }}</td>
            <td class="text-right">{{ user.email }}</td>
            <td class="text-right">{{ user.role }}</td>
            <td class="text-right">{{ dateParser(user.dataRegister) }}</td>
            <td class="text-right">
              <div>
                <el-button @click="$router.push( `/management/users/${user._id}/update`)" type="text" style="cursor: pointer"
                  ><i class="bx bxs-edit"></i
                ></el-button>
                <el-button
                  style="cursor: pointer"
                  @click="open"
                  type="text"
                  ><i class="bi bi-trash"></i
                ></el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div v-else>
        <n-empty description="Foydalanuvchilar topilmadi..."></n-empty>
      </div>
    </div>
    <el-pagination
      style="margin-top: 1rem"
      v-model:current-page="page"
      background
      layout="prev, pager, next"
      :total="total"
    />
  </div>
</template>
<script>
import { mapActions, mapState, mapStores } from "pinia";
import { userStore } from "../../../stores/management/user.store";
import { dateParser } from "../../utils/date.formatter";
import { ElMessage, ElMessageBox } from 'element-plus'
import { useToast } from 'vue-toastification';
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState(userStore, ["user", "users"]),
  },
  methods: {
    ...mapActions(userStore, ["getAllUsers"]),
    dateParser,
    open() {
  ElMessageBox.confirm(
    'Ushbu foydalanuvchini haqiqatdan o\'chirmoqchimisiz?',
    'Ogohlantirish',
    {
      confirmButtonText: 'Davom etish',
      cancelButtonText: 'Bekor qilish',
      type: 'warning',
    }
  )
    .then(() => {
      
    })
    .catch(() => {
      useToast().info("Bekor qilindi")
    })
}
  },
  created() {
    this.getAllUsers();
  },
};
</script>
<style scoped>
</style>