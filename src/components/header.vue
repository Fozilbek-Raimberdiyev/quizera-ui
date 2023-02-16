<template>
  <div class="d-flex justify-content-between header">
    <div>
      <breadCrumbs v-if="!smallScreen"></breadCrumbs>
    </div>
    <div>
      <el-dropdown placement="bottom-start" trigger="click">
        <el-button style="padding: 10px" type="info">
          <i class="bx bx-user"></i>
          <span style="margin-left: 5px">{{
            user?.firstName + " " + user?.lastName
          }}</span>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/profile')"
              ><i class="bx bxs-edit"></i>Ma'lumotlarni
              tahrirlash</el-dropdown-item
            >
            <el-dropdown-item @click="logOut"
              ><i class="bx bx-exit"></i>Tizimdan chiqish</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState, mapStores } from "pinia";
import breadCrumbs from "./breadCrumbs.vue";
import { userStore } from "../stores/management/user.store";
import { authStore } from "../stores/counter";
export default {
  components: {
    breadCrumbs,
  },
  computed: {
    ...mapState(userStore, ["user"]),
    ...mapStores(authStore),
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    smallScreen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    logOut() {
      localStorage.removeItem("user");
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}
</style>