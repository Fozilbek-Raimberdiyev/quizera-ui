


<template>
  <a-layout has-sider style="min-height: 100vh">
    <a-layout-sider
      style="
        overflow: auto;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
      "
      :collapsed="smallScreen ? true : false"
    >
      <div class="logo" style="color: #fff; font-size: 18px; padding: 25px">
        <router-link v-if="!smallScreen" to="/"> Navigation</router-link>
        <router-link v-else to="/"> <i class='bx bx-briefcase'></i></router-link>
      </div>
      <a-menu theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span v-if="!smallScreen">Management</span>
            <span v-else><i class="bi bi-sliders"></i></span>
          </template>
          <a-menu-item key="3"
            ><router-link to="/management/users"
              >Users</router-link
            ></a-menu-item
          >
          <a-menu-item key="4"
            ><router-link to="/management/roles"
              >Roles</router-link
            ></a-menu-item
          >
          <a-menu-item key="5"
            ><router-link to="/management/permissions"
              >Permissions</router-link
            ></a-menu-item
          >
        </a-sub-menu>
        <a-menu-item key="2">
          <router-link v-if="!smallScreen" to="/quiz">Quiz</router-link>
          <router-link v-else to="/quiz"
            ><i class="bi bi-question-square"></i
          ></router-link>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link v-if="!smallScreen" to="/posts">Posts</router-link>
          <router-link v-else to="/posts"
            ><i class="bx bx-news"></i
          ></router-link>
        </a-menu-item>

        <a-menu-item key="9">
          <router-link v-if="!smallScreen" to="/movies">Movies</router-link>
          <router-link v-else to="/movies"
            ><i class="bi bi-film"></i></router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link v-if="!smallScreen" to="/todos">Todos</router-link>
          <router-link v-else to="/todos"
            ><i class="bi bi-check2-square"></i
          ></router-link>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <template #title>
            <span v-if="!smallScreen">Ma'lumotnomalar</span>
            <span v-else><i class="bx bx-building"></i></span>
          </template>
          <a-menu-item key="10"
            ><router-link to="/references/quiz">Quiz</router-link></a-menu-item
          >
          <a-menu-item key="11"
            ><router-link to="/references/subject"
              >Subject</router-link
            ></a-menu-item
          >
          <a-menu-item key="12"
            ><router-link to="">Item1</router-link></a-menu-item
          >
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout
      class="sidebar"
      :class="[smallScreen ? 'small-screen' : 'big-screen']"
    >
      <a-layout-header style="background: #fff; padding: 0">
        <header-menu
          :smallScreen="smallScreen"
          style="margin: 16px; padding: 0 24px"
        ></header-menu>
      </a-layout-header>
      <a-layout-content style="margin: 16px">
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '400px' }"
        >
          <!-- <router-view></router-view> -->
          <div v-show="!loading">
            <router-view v-slot="{ Component }">
              <transition name="el-fade-linear">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
          <div class="" v-show="loading">
            <a-spin />
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Fozilbek Raimberdiyev 2023-yil
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import Sidebar from "@/components/sidebar.vue";
import { mapState, mapStores } from "pinia";
import { authStore } from "../stores/counter";
import { ElNotification } from "element-plus";
import { loadingStore } from "../stores/loading.store";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import breadCrumbs from "../components/breadCrumbs.vue";
import headerMenu from "../components/header.vue";
import { subject } from "@casl/ability";
export default {
  components: { Sidebar, Loading, breadCrumbs, headerMenu },
  data() {
    return {
      isOpen: true,
      fullPage: false,
      collapsed: false,
      smallScreen: false,
    };
  },
  computed: {
    ...mapState(authStore, ["user", "authLogout", "authSucces"]),
    ...mapState(loadingStore, ["loading"]),
    ...mapStores(authStore),
    loadingC() {
      return;
    },
  },
  methods: {
    getState(value) {
      this.isOpen = value;
    },
    logOut() {
      localStorage.removeItem("user");
      this.authStore.$patch({
        authLogout: true,
        authSucces: false,
      });
      this.$router.push("/login");
    },
    checkScreenSize() {
      this.smallScreen = window.innerWidth < 600;
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize());
    this.checkScreenSize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize());
  },
};
</script>
<style scoped>
.example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.sidebar.small-screen {
  margin-left: 75px;
}
.sidebar.big-screen {
  margin-left: 200px;
}
</style>
