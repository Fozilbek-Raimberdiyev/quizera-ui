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

    <div class="flex items-center justify-between">
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

        <el-dropdown placement="bottom-start" trigger="click">
          <img
            style="
              width: 35px;
              object-fit: cover;
              border-radius: 50%;
              height: 35px;
            "
            :src="mainPath + user.pathImage"
            :alt="user.firstName"
          />
          <i
            v-if="!loadingImage && !user.pathImage"
            style="font-size: 30px"
            class="bx bxs-user-circle"
          ></i>
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
      <el-dropdown
        trigger="click"
        style="margin: 0 5px; font-size: 16px"
        :style="[smallScreen ? 'margin-right : 1rem' : 'margin-right : 3rem']"
      >
        <span class="el-dropdown-link">
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
              <span style="margin-left: 5px">English</span>
            </el-dropdown-item>
            <el-dropdown-item
              :class="{ activeLang: $i18n.locale === 'Ru' }"
              @click="$i18n.locale = 'Ru'"
              style="cursor: pointer"
            >
              <span style="margin-left: 5px">Rus</span>
            </el-dropdown-item>
            <el-dropdown-item
              :class="{ activeLang: $i18n.locale === 'Uz' }"
              @click="$i18n.locale = 'Uz'"
              style="cursor: pointer"
            >
              <span style="margin-left: 5px">O'zbek</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
import {QMarkupTable} from "quasar"
import breadCrumbs from "./breadCrumbs.vue";
import { userStore } from "../stores/management/user.store";
import { authStore } from "../stores/counter";
import mobileMenu from "./mobileMenu.vue";
import { NIcon } from "naive-ui";
import { h } from "vue";
import { BellOutlined } from "@ant-design/icons-vue";
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
    QMarkupTable
  },
  computed: {
    ...mapState(userStore, ["user", "currentUserRole"]),
    ...mapState(NotificationStore, ["list", "todos"]),
    ...mapStores(authStore),
    menuOptionsC() {
      return this.menuOptions;
    },
    mainPath() {
      return import.meta.env.VITE_API_BASE_URL;
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
    this.currentIndex = sessionStorage.getItem("currentIndexMenu");
    this.smallScreen = window.innerWidth < 600;
    this.bigScreen = window.innerWidth > 1400;
    this.$emit("getBigscreen", this.bigScreen);
    try {
      this.loadingImage = true;
      if (this.user.pathImage) {
        let res = await axios.get(this.user.pathImage);
      }
      this.loadingImage = false;
    } finally {
      this.loadingImage = false;
    }
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
