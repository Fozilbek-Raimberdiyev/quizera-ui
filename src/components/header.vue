<template>
<div class="d-flex justify-content-between header" :style="[isOpen ? 'min-width : 70vw' : 'min-width : 90vw']">
    <div>
    <breadCrumbs></breadCrumbs>
  </div>
  <div>
    <el-dropdown placement="bottom-start" trigger="click">
      <el-button style="padding: 10px" type="info">
        <i class="bx bx-user"></i>
        <!-- <span style="margin-left: 5px">{{ user.email }}</span> -->
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
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
import { mapState } from 'pinia';
import breadCrumbs from "./breadCrumbs.vue";
import { userStore } from '../stores/management/user.store';
export default {
  components: {
    breadCrumbs
  },
  computed : {
    ...mapState(userStore, ["currentUser"])
  },
  props : {
    isOpen : {
        type : Boolean,
        default : false
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("user");
      this.authStore.$patch({
        authLogout: true,
        authSucces: false,
      });
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.header {
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  background: #fff;
  padding: 20px 2.9rem 20px 2.2rem;
}
</style>