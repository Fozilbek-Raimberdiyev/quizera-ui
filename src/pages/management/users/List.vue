<template>
  <div>
    <div class="create_user flex justify-end" style="margin: 5px 0">
      <el-button
        type="primary"
        class="cursor-pointer"
        @click="$router.push('/management/users/add')"
        >{{ $t('pages.management.addUser') }}</el-button
      >
      <!-- {{ $ability }} -->
    </div>
    <div class="q-pa-md" style="padding: 0">
      <q-markup-table :flat="smallScreen ? true : false" v-if="users.length">
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-right">{{ $t('pages.management.name') }}</th>
            <th class="text-right">{{ $t('pages.management.lastName') }}</th>
            <th class="text-right">{{ $t('pages.management.phoneNumber') }}</th>
            <th class="text-right">{{ $t('pages.management.email') }}</th>
            <th class="text-right">{{ $t('pages.management.role') }}</th>
            <th class="text-right">{{ $t('pages.management.registerDate') }}</th>
            <th class="text-right">{{ $t('sidebar.actions') }}</th>
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
                  @click="open(user._id)"
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
import {  ElMessageBox } from 'element-plus'
import { useToast } from 'vue-toastification';
import auth from '../../../services/auth';
import {QMarkupTable} from "quasar"

export default {
  components: {QMarkupTable},
  data() {
    return {
      dialogVisible: false,
      smallScreen : false
    };
  },
  computed: {
    ...mapState(userStore, ["user", "users"]),
  },
  methods: {
    ...mapActions(userStore, ["getAllUsers"]),
    dateParser,
     open(id) {
  ElMessageBox.confirm(
    this.$t('pages.management.confirmDelete'),
    this.$t('pages.management.warning'),
    {
      confirmButtonText: this.$t('sidebar.yes'),
      cancelButtonText: this.$t('sidebar.no'),
      type: 'warning',
    }
  )
    .then(async() => {
    let res = await  auth.deleteUser(id);
    this.getAllUsers()
    })
    .catch(() => {
      useToast().info(this.$t('sidebar.cancelled'))
    })
}
  },
  created() {
    this.getAllUsers();
    this.smallScreen = window.innerWidth < 600;
  },
};
</script>
<style scoped>
</style>