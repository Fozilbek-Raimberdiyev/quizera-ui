<template>
  <div class="header items-center" :class="[]">
    <div class="flex" style="margin-top: -35px">
      <div
        style="margin-right: 10px"
        v-if="smallScreen || fullScreen"
        class="self-stretch"
      >
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
          style="background: #001529"
          :size="smallScreen ? '75%' : '25%'"
          :show-close="false"
          direction="ltr"
          v-model="isshow"
        >
          <mobile-menu @select="select"></mobile-menu>
        </el-drawer>
      </div>
      <div v-if="!smallScreen" class="self-stretch" style="margin-top: 10px">
        <breadCrumbs></breadCrumbs>
      </div>
    </div>
    <div class="big-screen-size" v-if="bigScreen">
      <!-- <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptionsC"
      /> -->
      <div v-if="currentUserRole==='admin'">
        <el-dropdown>
          <span
            style="font-size: 18px; margin-top: -4px"
            :class="{
              active:
                currentIndex === 2 || currentIndex === 3 || currentIndex === 4,
            }"
            class="el-dropdown-link no-single"
          >
            <i class="bx bx-cog"></i>
            Boshqarish
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="currentIndex = 2"
                :class="{ active: currentIndex === 2 || currentIndex === 1 }"
              >
                <router-link to="/management/users"
                  ><i class="bx bx-user"></i>Foydalanuvchilar</router-link
                >
              </el-dropdown-item>
              <el-dropdown-item
                @click="currentIndex = 3"
                :class="{ active: currentIndex === 3 || currentIndex === 1 }"
              >
                <router-link to="/management/roles">
                  <i class="bx bx-group"></i>Rollar
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item
                @click="currentIndex = 4"
                :class="{ active: currentIndex === 4 || currentIndex === 1 }"
              >
                <router-link to="/management/permissions">
                  <i class="bx bxs-key"></i>Ruxsatlar
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="single">
        <router-link
          to="/quiz"
          @click="currentIndex = 5"
          :class="{ active: currentIndex === 5 }"
        >
          <i class="bx bxs-flag-checkered"></i>Test ishlash
        </router-link>
      </div>
      <div class="single" v-if="currentUserRole==='admin'">
        <router-link
          to="/posts"
          @click="currentIndex = 6"
          :class="{ active: currentIndex === 6 }"
        >
          <i class="bx bx-news"></i>Maqolalar
        </router-link>
      </div>
      <div class="single" v-if="currentUserRole==='admin'">
        <router-link
          to="/movies"
          @click="currentIndex = 7"
          :class="{ active: currentIndex === 7 }"
        >
          <i class="bx bx-movie"></i>Kinolar
        </router-link>
      </div>
      <div class="single">
        <router-link
          to="/todos"
          @click="currentIndex = 8"
          :class="{ active: currentIndex === 8 }"
        >
          <i class="bx bx-task"></i>Topshiriqlar
        </router-link>
      </div>
      <div class="single">
        <router-link
          to="/statistic"
          @click="currentIndex = 12"
          :class="{ active: currentIndex === 12 }"
        >
        <i class='bx bx-bar-chart-alt-2'></i>Statistika
        </router-link>
      </div>
      <div v-if="currentUserRole==='admin' || currentUserRole==='teacher'">
        <el-dropdown>
          <span
            style="font-size: 18px; margin-top: -2px"
            class="el-dropdown-link no-single"
            :class="{
              active:
                currentIndex === 9 || currentIndex === 10 || currentIndex === 1,
            }"
          >
            <i class="bx bx-building"></i>Ma'lumotnomalar
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="currentIndex = 9"
                :class="{ active: currentIndex === 9 }"
              >
                <router-link to="/references/quiz">
                  <i class="bx bx-question-mark"></i>Savollar
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item
                @click="currentIndex = 10"
                :class="{ active: currentIndex === 10 }"
              >
                <router-link to="/references/subject">
                  <i class="bx bx-folder-plus"></i>Fanlar
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item
                @click="currentIndex = 11"
                :class="{ active: currentIndex === 11 }"
              >
                <router-link to="/references">
                  <i class="bi bi-people"></i>Guruhlar
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      
    </div>
    <div class="flex items-center">
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
                ><i class="bi bi-box-arrow-left"></i>Tizimdan
                chiqish</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div
        v-if="!smallScreen && !bigScreen"
        @click="emitFullscreen"
        style="margin-top: -15px; margin-left: 10px; font-size: 18px"
        class="self-start cursor-pointer"
      >
        <i
          :class="[fullScreen ? 'bi bi-fullscreen-exit' : 'bi bi-fullscreen']"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapStores } from "pinia";
import breadCrumbs from "./breadCrumbs.vue";
import { userStore } from "../stores/management/user.store";
import { authStore } from "../stores/counter";
import mobileMenu from "./mobileMenu.vue";
import { NIcon } from "naive-ui";
import { h } from "vue";
import { RouterLink } from "vue-router";
import {
  DashboardOutlined,
  FlagOutlined,
  KeyOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
export default {
  data() {
    return {
      isshow: false,
      fullScreen: false,
      currentIndex: "",
      bigScreen : false
    };
  },
  components: {
    breadCrumbs,
    mobileMenu,
  },
  computed: {
    ...mapState(userStore, ["user", "currentUserRole"]),
    ...mapStores(authStore),
    menuOptionsC() {
      return this.menuOptions;
    },
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
    renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    },
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
    emitFullscreen() {
      this.fullScreen = !this.fullScreen;
      this.$emit("getFullscreen", this.fullScreen);
      
    },
  },
  created() {
    this.bigScreen = window.innerWidth > 1400;
    this.$emit("getBigscreen", this.bigScreen)
  }
};
</script>
<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.big-screen-size {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 25px;
  font-size: 18px;
}
.big-screen-size > div {
  margin: 0 0.5rem;
}
.big-screen-size > div.single {
  margin-top: -25px;
}
.big-screen-size > div.no-single {
  margin-bottom: -25px;
}
a {
  text-decoration: none;
  color: #000;
}
.active,
.active a {
  color: #409eff;
}
span.single,
span.no-single {
  color: #000;
} i {display: inline-block; margin-right: 5px;}
</style>