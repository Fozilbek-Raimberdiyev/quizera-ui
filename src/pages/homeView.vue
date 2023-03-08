


<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-if="!smallScreen && !fullScreen && !bigScreen"
      style="
        overflow: auto;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
      "
    >
      <div class="logo" style="color: #fff; font-size: 18px; padding: 25px">
        <router-link v-if="!smallScreen" to="/"> Portfolio</router-link>
        <!-- <router-link v-else to="/"> <i class='bx bx-briefcase'></i></router-link> -->
      </div>
      <a-menu theme="dark" mode="inline">
        <a-sub-menu v-if="currentUserRole == 'admin'" key="sub1">
          <template #title>
            <span v-if="!smallScreen"
              ><i class="bx bx-cog"></i>{{ $t("sidebar.control") }}</span
            >
            <!-- <span v-else><i class="bi bi-sliders"></i></span> -->
          </template>
          <a-menu-item key="3"
            ><router-link to="/management/users"
              ><i class="bx bx-user"></i>{{ $t("sidebar.users") }}</router-link
            ></a-menu-item
          >
          <a-menu-item key="4"
            ><router-link to="/management/roles"
              ><i class="bx bx-group"></i>{{ $t("sidebar.roles") }}</router-link
            ></a-menu-item
          >
          <a-menu-item key="5"
            ><router-link to="/management/permissions"
              ><i class="bx bxs-key"></i
              >{{ $t("sidebar.permissions") }}</router-link
            ></a-menu-item
          >
        </a-sub-menu>
        <a-menu-item key="2">
          <router-link v-if="!smallScreen" to="/quiz"
            ><i class="bx bxs-flag-checkered"></i>
            {{ $t("sidebar.workingTest") }}
          </router-link>
        </a-menu-item>
        <a-menu-item key="16" v-if="currentUserRole === 'admin'">
          <router-link v-if="!smallScreen" to="/posts"
            ><i class="bx bx-news"></i>{{ $t("sidebar.posts") }}</router-link
          >
          <!-- <router-link v-else to="/posts"
            ><i class="bx bx-news"></i
          ></router-link> -->
        </a-menu-item>

        <a-menu-item key="9" v-if="currentUserRole === 'admin'">
          <router-link v-if="!smallScreen" to="/movies"
            ><i class="bx bx-movie"></i> {{ $t("sidebar.movies") }}
          </router-link>
          <!-- <router-link v-else to="/movies"
            ><i class="bi bi-film"></i></router-link> -->
        </a-menu-item>
        <a-menu-item key="14">
          <router-link v-if="!smallScreen" to="/todos"
            ><i class="bx bx-task"></i>{{ $t("sidebar.todos") }}</router-link
          >
          <!-- <router-link v-else to="/todos"
            ><i class="bi bi-check2-square"></i
          ></router-link> -->
        </a-menu-item>
        <a-menu-item key="15">
          <router-link to="/statistic">
            <i class="bx bx-bar-chart-alt-2"></i>{{ $t("sidebar.statistics") }}
          </router-link>
        </a-menu-item>
        <a-sub-menu
          key="sub2"
          v-if="currentUserRole === 'teacher' || currentUserRole === 'admin'"
        >
          <template #title>
            <span v-if="!smallScreen"
              ><i class="bx bx-building"></i
              >{{ $t("sidebar.references") }}</span
            >
            <!-- <span v-else><i class="bx bx-building"></i></span> -->
          </template>
          <a-menu-item key="10">
            <router-link to="/references/quiz"
              ><i class="bx bx-question-mark"></i
              >{{ $t("sidebar.questions") }}</router-link
            ></a-menu-item
          >
          <a-menu-item key="11"
            ><router-link to="/references/subject"
              ><i class="bx bx-folder-plus"></i
              >{{ $t("sidebar.subjects") }}</router-link
            ></a-menu-item
          >
          <a-menu-item key="17"
            ><router-link to="/references/subject"
              ><i class="bi bi-people"></i
              >{{ $t("sidebar.groups") }}</router-link
            ></a-menu-item
          >
          <!-- <a-menu-item key="12"
            ><router-link to="">Item1</router-link></a-menu-item
          > -->
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout
      class="sidebar"
      :class="[
        smallScreen || fullScreen || bigScreen ? 'small-screen' : 'big-screen',
      ]"
    >
      <a-layout-header
        :class="[bigScreen ? 'big-header' : 'small-header']"
        style="background: #fff;"
      >
        <header-menu
          @getFullscreen="getFullscreen"
          @getBigscreen="getBigscreen"
          :smallScreen="smallScreen"
          :fullScreen="fullScreen"
        ></header-menu>
      </a-layout-header>
      <a-layout-content :style="[smallScreen ? 'margin: 5px' : 'margin: 16px']">
        <div
          style="background: #fff; min-height: 550px;"
          :style="[smallScreen ? `padding:15px;` : `padding: 24px;`]"
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
            <!-- <a-spin /> -->
            <loading
              v-model:active="loading"
              :can-cancel="false"
              :on-cancel="false"
              :is-full-page="true"
            />
          </div>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <CopyrightCircleOutlined></CopyrightCircleOutlined> Fozilbek
        Raimberdiyev 2023-yil
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import Sidebar from "@/components/sidebar.vue";
import { mapActions, mapState, mapStores } from "pinia";
import { authStore } from "../stores/counter";
import { ElNotification } from "element-plus";
import { loadingStore } from "../stores/loading.store";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import breadCrumbs from "../components/breadCrumbs.vue";
import headerMenu from "../components/header.vue";
import { subject } from "@casl/ability";
import { userStore } from "../stores/management/user.store";
import { CopyrightCircleOutlined } from "@ant-design/icons-vue";
import { NotificationStore } from "../stores/notifications.store";
export default {
  components: {
    Sidebar,
    Loading,
    breadCrumbs,
    headerMenu,
    CopyrightCircleOutlined,
  },
  data() {
    return {
      isOpen: true,
      fullPage: false,
      collapsed: false,
      smallScreen: false,
      fullScreen: false,
      bigScreen: false,
    };
  },
  computed: {
    ...mapState(NotificationStore, ["list"]),
    ...mapState(authStore, ["user", "authLogout", "authSucces"]),
    ...mapState(loadingStore, ["loading"]),
    ...mapState(userStore, ["currentUserRole"]),
    ...mapStores(authStore),
    loadingC() {
      return;
    },
  },
  provide() {
    return {
      currentUserRole: this.currentUserRole,
      smallScreen: this.smallScreen,
    };
  },
  methods: {
    ...mapActions(NotificationStore, ["getNotifications"]),
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
    getFullscreen(val) {
      this.fullScreen = val;
    },
    getBigscreen(val) {
      this.bigScreen = val;
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkScreenSize());
    this.checkScreenSize();
    this.getNotifications();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize());
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.example {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  align-content: center;
}
/* .sidebar.small-screen {
  margin-left: 75px;
} */
.sidebar.big-screen {
  margin-left: 200px;
}
a {
  text-decoration: none !important;
}
i {
  margin-right: 5px;
}
.small-header {
  margin: 0;
}
.ant-layout-header {
  height: 64px !important;
  padding: 10px 0;
}

.ant-layout-header.small-header {
  padding: 5px 20px !important;
  max-height: 45px !important;
}
</style>
