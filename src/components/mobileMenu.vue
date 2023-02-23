
<template>
  <div>
    <a-menu
      @select="$emit('select')"
      theme="dark"
      mode="inline"
      style="
        width: 280px;
        position: fixed;
        inset: 0;
        overflow: auto;
        max-height: 100vh;
      "
    >
      <div
        class="logo"
        style="color: #fff; font-size: 18px; padding: 10px 25px"
      >
        <a-menu-item key="20">
          <router-link @click="$emit('select')" to="/"> Portfolio</router-link>
        </a-menu-item>
      </div>
      <a-sub-menu v-if="currentUserRole == 'admin'" key="sub1">
        <template #title>
          <span>Boshqarish</span>
        </template>
        <a-menu-item key="3"
          ><router-link to="/management/users"
            >Foydalanuvchilar</router-link
          ></a-menu-item
        >
        <a-menu-item key="4"
          ><router-link to="/management/roles">Rollar</router-link></a-menu-item
        >
        <a-menu-item key="5"
          ><router-link to="/management/permissions"
            >Ruxsatlar</router-link
          ></a-menu-item
        >
      </a-sub-menu>
      <a-menu-item key="2">
        <router-link to="/quiz">Test ishlash</router-link>
      </a-menu-item>
      <a-menu-item key="15" v-if="currentUserRole === 'admin'">
        <router-link to="/posts">Maqolalar</router-link>
        <!-- <router-link v-else to="/posts"
            ><i class="bx bx-news"></i
          ></router-link> -->
      </a-menu-item>

      <a-menu-item key="9" v-if="currentUserRole === 'admin'">
        <router-link to="/movies">Kinolar</router-link>
        <!-- <router-link v-else to="/movies"
            ><i class="bi bi-film"></i></router-link> -->
      </a-menu-item>
      <a-menu-item>
        <router-link to="/todos">Topshiriqlar</router-link>
        <!-- <router-link v-else to="/todos"
            ><i class="bi bi-check2-square"></i
          ></router-link> -->
      </a-menu-item>
      <a-sub-menu
        key="sub2"
        v-if="currentUserRole === 'teacher' || currentUserRole === 'admin'"
      >
        <template #title>
          <span>Ma'lumotnomalar</span>
          <!-- <span v-else><i class="bx bx-building"></i></span> -->
        </template>
        <a-menu-item key="10"
          ><router-link to="/references/quiz"
            >Savollar</router-link
          ></a-menu-item
        >
        <a-menu-item key="11"
          ><router-link to="/references/subject"
            >Fanlar</router-link
          ></a-menu-item
        >
        <!-- <a-menu-item key="12"
            ><router-link to="">Item1</router-link></a-menu-item
          > -->
      </a-sub-menu>
    </a-menu>
  </div>
</template>
  <script lang="ts">
import { defineComponent, reactive, toRefs, defineEmits } from "vue";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import type { MenuTheme } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { userStore } from "../stores/management/user.store";
export default defineComponent({
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
  setup() {
    const { currentUserRole } = storeToRefs(userStore());

    const state = reactive({
      theme: "dark" as MenuTheme,
      selectedKeys: ["1"],
      openKeys: ["sub1"],
    });
    const changeTheme = (checked: boolean) => {
      state.theme = checked ? "dark" : "light";
    };

    return {
      ...toRefs(state),
      changeTheme,
      currentUserRole,
    };
  },
});
</script>
  <style scoped>
.ant-menu .ant-menu-root {
  background: red !important;
}
a {
  text-decoration: none !important;
}
</style>