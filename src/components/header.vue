<template>
  <div class="header items-center">
    <div v-if="!smallScreen" class="self-stretch" style="margin-top: 10px;">
      <breadCrumbs></breadCrumbs>
    </div>
    <div v-else class="self-stretch">
      <i
        style="
          display: block;
          font-size: 30px;
          margin-top: 3px;
          margin-left: -5px;
        "
        @click="isshow = true"
        class="bx bx-menu cursor-pointer"
      ></i>
      <el-drawer
        style="background: #001529;"
        size="85%"
        :show-close="false"
        direction="ltr"
        v-model="isshow"
      >
        <mobile-menu @select="select"></mobile-menu>
      </el-drawer>
    </div>
    <div>
      <el-dropdown placement="bottom-start" trigger="click">
        <el-button class="cursor-pointer" style="padding: 10px" type="info">
          <i class="bx bx-user"></i>
          <span style="margin-left: 5px">{{
            user?.firstName + " " + user?.lastName
          }}</span>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              class="cursor-pointer"
              @click="$router.push('/profile')"
              ><i class="bx bxs-edit"></i>Ma'lumotlarni
              tahrirlash</el-dropdown-item
            >
            <el-dropdown-item class="cursor-pointer" @click="logOut"
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
import mobileMenu from "./mobileMenu.vue";
export default {
  data() {
    return {
      isshow: false,
    };
  },
  components: {
    breadCrumbs,
    mobileMenu,
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
    select() {
      this.isshow = false;
    },
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
  align-items: center;
  justify-content: space-between;
}
</style>