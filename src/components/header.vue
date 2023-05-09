<template>
  <div
    class="header items-center"
    :style="[smallScreen ? '' : 'margin : 0 24px']"
  >
    <div class="flex items-center">
      <div
        style="margin-right: 10px"
        v-if="smallScreen || fullScreen"
        class="self-stretch"
      >
        <i
          style="display: block; font-size: 30px; margin-left: -5px"
          @click="isshow = true"
          class="bx bx-menu cursor-pointer"
        ></i>
        <el-drawer
          style="background: #001529"
          :size="smallScreen ? '80%' : '25%'"
          :show-close="false"
          direction="ltr"
          v-model="isshow"
        >
          <mobile-menu @select="select"></mobile-menu>
        </el-drawer>
      </div>
      <div v-if="!smallScreen" class="self-center">
        <breadCrumbs></breadCrumbs>
      </div>
    </div>
    <div class="flex items-center big-screen-size" v-if="bigScreen">
      <div class="flex" v-if="currentUserRole === 'admin'">
        <el-dropdown>
          <span
            style="font-size: 18px"
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
                @click="setIndex(2)"
                :class="{ active: currentIndex === 2 || currentIndex === 1 }"
              >
                <router-link to="/management/users"
                  ><i class="bx bx-user"></i>Foydalanuvchilar</router-link
                >
              </el-dropdown-item>
              <el-dropdown-item
                @click="setIndex(3)"
                :class="{ active: currentIndex === 3 || currentIndex === 1 }"
              >
                <router-link to="/management/roles">
                  <i class="bx bx-group"></i>Rollar
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item
                @click="setindex(4)"
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
          @click="setIndex(5)"
          :class="{ active: currentIndex === 5 }"
        >
          <i class="bx bxs-flag-checkered"></i>Test ishlash
        </router-link>
      </div>
      <div class="single">
        <router-link
          to="/todos"
          @click="setIndex(8)"
          :class="{ active: currentIndex === 8 }"
        >
          <i class="bx bx-task"></i>Eslatmalar
        </router-link>
      </div>
      <div class="single">
        <router-link
          to="/statistic"
          @click="setIndex(12)"
          :class="{ active: currentIndex === 12 }"
        >
          <i class="bx bx-bar-chart-alt-2"></i>Statistika
        </router-link>
      </div>
      <div
        class="flex"
        v-if="currentUserRole === 'admin' || currentUserRole === 'teacher'"
      >
        <el-dropdown>
          <span
            style="font-size: 18px"
            class="el-dropdown-link no-single"
            :class="{
              active:
                currentIndex === 9 ||
                currentIndex === 10 ||
                currentIndex === 11 ||
                currentIndex === 18,
            }"
          >
            <i class="bx bx-building"></i>Ma'lumotnomalar
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="setIndex(9)"
                :class="{ active: currentIndex === 9 }"
              >
                <router-link to="/references/quiz">
                  <i class="bx bx-question-mark"></i>Savollar
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item
                @click="setIndex(10)"
                :class="{ active: currentIndex === 10 }"
              >
                <router-link to="/references/subject">
                  <i class="bx bx-folder-plus"></i>Fanlar
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item
                @click="setIndex(18)"
                :class="{ active: currentIndex === 18 }"
              >
                <router-link to="/references/listening">
                  <i class="bx bx-folder-plus"></i>Eshitish sinovlari
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <el-dropdown
        trigger="click"
        style="margin: 0 5px; font-size: 16px"
        :style="[smallScreen ? 'margin-right : 1rem' : 'margin-right : 3rem']"
      >
        <span class="el-dropdown-link">
          <flag style="width: 50px" :iso="this.$i18n.locale"></flag>
          <span
            style="margin-left: -13px"
            v-if="$i18n.locale === 'Uz' && !smallScreen"
            >O'zbek</span
          >
          <span
            style="margin-left: -13px"
            v-if="$i18n.locale === 'Ru' && !smallScreen"
            >Rus</span
          >
          <span
            style="margin-left: -13px"
            v-if="$i18n.locale === 'Gb' && !smallScreen"
            >English</span
          >
        </span>
        <template #dropdown>
          <el-dropdown-menu style="padding: 10px; font-size: 16px">
            <el-dropdown-item
              :class="{ activeLang: $i18n.locale === 'Gb' }"
              @click="$i18n.locale = 'Gb'"
              style="cursor: pointer"
            >
              <flag iso="gb"></flag>
              <span style="margin-left: 5px">English</span>
            </el-dropdown-item>
            <el-dropdown-item
              :class="{ activeLang: $i18n.locale === 'Ru' }"
              @click="$i18n.locale = 'Ru'"
              style="cursor: pointer"
            >
              <flag iso="ru"></flag>
              <span style="margin-left: 5px">Rus</span>
            </el-dropdown-item>
            <el-dropdown-item
              :class="{ activeLang: $i18n.locale === 'Uz' }"
              @click="$i18n.locale = 'Uz'"
              style="cursor: pointer"
            >
              <flag iso="uz"></flag>
              <span style="margin-left: 5px">O'zbek</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div
        class="flex"
        v-if="todos.length"
        @click="drawer = true"
        style="cursor: pointer"
      >
        <a-badge :count="todos.length" style="margin: 0 0.5rem">
          <BellOutlined style="margin: 0 0.5rem; font-size: 1.5rem" />
        </a-badge>
      </div>
      <div class="flex items-center">
        <n-skeleton
          v-if="loadingImage && user.pathImage"
          circle
          size="medium"
        />
        <img
          v-if="user.pathImage && !loadingImage"
          style="
            width: 35px;
            object-fit: cover;
            border-radius: 50%;
            height: 35px;
          "
          :src="user?.pathImage"
        />
        <i
          v-if="!loadingImage && !user.pathImage"
          style="font-size: 30px"
          class="bx bxs-user-circle"
        ></i>
        <el-dropdown placement="bottom-start" trigger="click">
          <span style="margin-left: 5px">{{
            user?.firstName + " " + user?.lastName
          }}</span>
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
        style="margin-left: 10px; font-size: 18px"
        class="self-start cursor-pointer"
      >
        <i
          :class="[fullScreen ? 'bi bi-fullscreen-exit' : 'bi bi-fullscreen']"
        ></i>
      </div>
    </div>
    <el-drawer
      style="background: teal; color: #fff"
      v-model="drawer"
      title="Bildirishnomalar"
      :size="smallScreen ? '75%' : '30%'"
      :with-header="false"
    >
      <div>
        <div v-if="todos.length">
          <div
            class="flex items-center"
            style="background: teal; color: #e3e5e9"
          >
            <i style="font-size: 1.5rem" class="bx bx-task"></i>
            <h5>Eslatmalar</h5>
          </div>
          <div v-for="(todo, index) in todos" :key="index">
            <div class="q-pa-md">
              <q-markup-table>
                <thead>
                  <tr>
                    <th style="width: 70px" class="text-left">Eslatma nomi</th>
                    <th style="width: 70px" class="text-right">
                      Tugashiga qolgan muddat
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="width: 70px" class="text-left">
                      {{ todo.name }}
                    </td>
                    <td style="width: 70px" class="text-right">
                      {{
                        getDate(
                          new Date(todo.endDate) - new Date()
                        ).getUTCFullYear() - 1970
                          ? getDate(
                              new Date(todo.endDate) - new Date()
                            ).getUTCFullYear() -
                            1970 +
                            " yil"
                          : ""
                      }}
                      {{
                        getDate(
                          new Date(todo.endDate) - new Date()
                        ).getMonth() - 0
                          ? getDate(
                              new Date(todo.endDate) - new Date()
                            ).getMonth() -
                            0 +
                            " oy"
                          : ""
                      }}
                      {{
                        getDate(new Date(todo.endDate) - new Date()).getDate() -
                        1
                          ? getDate(
                              new Date(todo.endDate) - new Date()
                            ).getDate() -
                            1 +
                            " kun"
                          : ""
                      }}
                      {{
                        getDate(
                          new Date(todo.endDate) - new Date()
                        ).getHours() -
                        new Date(
                          new Date(todo.endDate) - new Date()
                        ).getTimezoneOffset() /
                          -60
                          ? getDate(
                              new Date(todo.endDate) - new Date()
                            ).getHours() -
                            new Date(
                              new Date(todo.endDate) - new Date()
                            ).getTimezoneOffset() /
                              -60 +
                            " soat"
                          : ""
                      }}
                      {{
                        getDate(
                          new Date(todo.endDate) - new Date()
                        ).getMinutes() + " daqiqa"
                      }}
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
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
import {
  DashboardOutlined,
  FlagOutlined,
  KeyOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";
import { NotificationStore } from "../stores/notifications.store";
import axios from "axios";
export default {
  data() {
    return {
      isshow: false,
      fullScreen: false,
      currentIndex: "",
      bigScreen: false,
      drawer: false,
      smallScreen: false,
      loadingImage: false,
    };
  },
  components: {
    breadCrumbs,
    mobileMenu,
    BellOutlined,
  },
  computed: {
    ...mapState(userStore, ["user", "currentUserRole"]),
    ...mapState(NotificationStore, ["list", "todos"]),
    ...mapStores(authStore),
    menuOptionsC() {
      return this.menuOptions;
    },
    mainPath() {
      return import.meta.MAIN_PATH;
    },
  },
  props: {
    isOpen: {
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
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    emitFullscreen() {
      this.fullScreen = !this.fullScreen;
      this.$emit("getFullscreen", this.fullScreen);
    },
    getDate(date) {
      return new Date(date);
    },
    setIndex(index) {
      this.currentIndex = index;
      sessionStorage.setItem("currentIndexMenu", index);
    },
  },
  async created() {
    this.smallScreen = window.innerWidth < 600;
    this.bigScreen = window.innerWidth > 1400;
    this.$emit("getBigscreen", this.bigScreen);
  },
  mounted() {
    this.currentIndex = sessionStorage.getItem("currentIndexMenu");
  },
};
</script>
<style scoped lang="scss">
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.big-screen-size {
  font-size: 18px;
}
.big-screen-size > div {
  margin: 0 0.5rem;
}
.big-screen-size > div.single {
  // margin-top: -25px;
}
.big-screen-size > div.no-single {
  // margin-bottom: -25px;
}
a {
  text-decoration: none;
  color: #000;
}
.active,
.active a {
  color: #429eef !important;
  border-bottom: 3px solid #429eef;
  padding-bottom: 17px;
}
span.single,
span.no-single {
  color: #000;
}
i {
  display: inline-block;
  margin-right: 5px;
}
.notifications {
  cursor: pointer;
}
table {
  background: teal !important;
  box-shadow: none;
  text-shadow: none;
}
tr th,
tr td {
  max-width: 45% !important;
  overflow: auto !important;
}
.activeLang {
  background: #429eef !important;
}
</style>