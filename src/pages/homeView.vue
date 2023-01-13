<!-- <template>
  <div class="wrapper">
    <aside class="left sidebar" :class="{ open: menuState, close: !menuState }">
      <sidebar @getState="getState"></sidebar>
    </aside>
    <aside
      ref="mainContent"
      class="right main-content"
      :class="{ open: menuState, close: !menuState }"
    >
      <div class="header" :class="{ open: menuState, close: !menuState }">
        <div>
          <bread-crumbs></bread-crumbs>
        </div>
        <div>
          <el-dropdown placement="bottom-start" trigger="click">
            <el-button style="padding: 10px" type="info">
              <i class="bx bx-user"></i>
              <span style="margin-left: 5px">{{ user.email }}</span>
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
      <div style="margin-right: 2rem">
        <div v-show="!loading">
          <router-view v-slot="{ Component }">
            <transition name="el-fade-linear">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
        <div class="loading vl-parent" v-show="loading">
          <loading
            v-model:active="loading"
            :can-cancel="true"
            :on-cancel="false"
            :is-full-page="fullPage ? null : $refs.mainContent"
            :container="fullPage ? null : $refs.mainContent"
            loader="bars"
            opacity="1"
          />
        </div>
      </div>
      <footer class="footer">
        <div class="author">
          <i class="bx bx-copyright"></i>
          <span>Fozilbek Raimberdiyev</span>
        </div>
        <div class="year">2023-yil</div>
      </footer>
      <el-footer> </el-footer>
    </aside>
  </div>
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
export default {
  components: { Sidebar, Loading, breadCrumbs },
  data() {
    return {
      menuState: true,
      fullPage: false,
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
      this.menuState = value;
    },
    logOut() {
      localStorage.removeItem("user");
      this.authStore.$patch({
        authLogout: true,
        authSucces: false,
      });
      this.$router.push("/login");
    },
  },
  mounted() {
    console.log();
  },
};
</script>
  <style scoped>
@import url("https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  margin: 0;
  padding: 0;
  display: flex;
  background: #eef0f8;
}
.left.open {
  margin-right: 18rem;
}
.left.close {
  flex-basis: 7%;
}
.right {
  flex-basis: 100%;
  background: #eef0f8;
  position: relative;
  min-height: 100vh;
}

.notitifacation {
  background: red;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 20px 2.9rem 20px 2.2rem;
}
.header.open {
  margin-left: -2.3rem;
  margin-bottom: 1rem;
}
.header.close {
  margin-left: -1.5rem;
}
.footer {
  background: #fff;
  padding: 0.5rem 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer span {
  margin-left: 5px;
}
.main-content.open .footer {
  left: -2.3rem;
}
</style> -->
<template>
  <div class="wrapper container">
    <div class="row">
      <div class="sidebar" :class="[isOpen ? 'col-3' : 'col-1']">
        <sidebar @getState="getState"></sidebar>
      </div>
      <div class="center" :class="[isOpen ? 'col-9' : 'col-11']">
        <header-menu :isOpen="isOpen"></header-menu>
        <router-view></router-view>
      </div>
    </div>
  </div>
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
export default {
  components: { Sidebar, Loading, breadCrumbs, headerMenu },
  data() {
    return {
      isOpen: true,
      fullPage: false,
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
  },
  mounted() {
    console.log();
  },
};
</script>

<style scoped>
@import url("../assets/styles/bootstrap.css");
.wrapper {
  /* width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0; */
  /* justify-content: space-between; */
}

.wrapper > .sidebar {
  /* flex-basis: 30%; */
  display: inline-block;
}

.wrapper > .center {
  /* flex-basis: 70%; */
  display: inline-block;
}

.v-sidebar-menu.vsm_expanded .vsm--link_level-1.vsm--link_open {
  background-color: none !important;
  color: #fff;
}
.v-sidebar-menu.vsm_expanded .vsm--link_level-1.vsm--link_open .vsm--icon {
  background-color: none !important;
}
</style>