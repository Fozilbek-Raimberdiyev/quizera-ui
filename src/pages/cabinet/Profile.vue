<template>
  <el-row class="tac">
    <el-col :span="smallScreen ? 4 : 3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="2">
          <!-- <el-icon><icon-menu /></el-icon> -->
          <router-link to="/cabinet/groups"
            ><span
              ><i class="bi bi-collection" style="margin-right: 5px"></i
              >Guruhlar</span
            ></router-link
          >
        </el-menu-item>
        <el-menu-item index="4">
          <!-- <el-icon><setting /></el-icon> -->
          <router-link to="/cabinet/groups/students"
            ><span
              ><i style="margin-right: 5px" class="bi bi-chat"></i>Chat</span
            ></router-link
          >
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="12">
      <div>
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      smallScreen: false,
      bigScreen: false,
    };
  },
  mounted() {
    this.smallScreen = window.innerWidth < 600;
    this.bigScreen = window.innerWidth > 1400;
  },
};
</script>
<style lang="">
</style>