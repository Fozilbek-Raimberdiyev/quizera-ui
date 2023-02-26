
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
          <i class="bx bx-cog"></i>
          <span>Boshqarish</span>
        </template>
        <a-menu-item key="3">
          <i class="bx bx-user"></i
          ><router-link to="/management/users"
            >Foydalanuvchilar</router-link
          ></a-menu-item
        >
        <a-menu-item key="4"
          ><i class="bx bx-group"></i
          ><router-link to="/management/roles">Rollar</router-link></a-menu-item
        >
        <a-menu-item key="5"
          ><router-link to="/management/permissions"
            ><i class="bx bxs-key"></i>Ruxsatlar</router-link
          ></a-menu-item
        >
      </a-sub-menu>
      <a-menu-item key="2">
        <i class="bx bxs-flag-checkered"></i>
        <router-link to="/quiz">Test ishlash</router-link>
      </a-menu-item>
      <a-menu-item key="15" v-if="currentUserRole === 'admin'">
        <i class="bx bx-news"></i>
        <router-link to="/posts">Maqolalar</router-link>
      </a-menu-item>

      <a-menu-item key="9" v-if="currentUserRole === 'admin'">
        <i class="bx bx-movie"></i>
        <router-link to="/movies">Kinolar</router-link>
        <!-- <router-link v-else to="/movies"
            ><i class="bi bi-film"></i></router-link> -->
      </a-menu-item>
      <a-menu-item>
        <i class="bx bx-task"></i>
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
          <i class="bx bx-building"></i>
          <span>Ma'lumotnomalar</span>
          <!-- <span v-else></span> -->
        </template>
        <a-menu-item key="10"
          ><router-link to="/references/quiz">
            <i class="bx bx-question-mark"></i>
            Savollar</router-link
          ></a-menu-item
        >
        <a-menu-item key="11"
          ><router-link to="/references/subject"
            ><i class="bx bx-folder-plus"></i>Fanlar</router-link
          ></a-menu-item
        >
        <a-menu-item key="11"
            ><router-link to="/references/subject"
              ><i class="bi bi-people"></i>Guruhlar</router-link
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
  @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.ant-menu .ant-menu-root {
  background: red !important;
}
a {
  text-decoration: none !important;
}
i {
  margin-right: 5px;
}
</style>