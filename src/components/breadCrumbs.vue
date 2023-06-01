<template>
  <el-breadcrumb separator="/">
    <span v-if="breadcrumbs.length >= 2 && breadcrumbs[1].label != 'Dashboard'">
      <el-breadcrumb-item
        style="text-transform: capitalize"
        v-for="(route, index) in breadcrumbs"
        :key="index"
        :to="route.path"
        >{{ route.label }}
      </el-breadcrumb-item>
    </span>
    <span v-else>
      <el-breadcrumb
        class="is-link"
        style="font-weight: 600; cursor: pointer"
        to="/"
        >Dashboard</el-breadcrumb
      >
    </span>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "breadcrumbs",
  data() {
    {
    }
  },
  computed: {
    breadcrumbItemsC() {
      return this.breadcrumbItems;
    },
    breadcrumbs() {
      let routes = this.$route.matched
        .filter((el) => el.name)
        .map((el) => {
          return {
            path: el.name !== this.$route.name ? el.path : "",
            label: el.name,
          };
        });
      return routes;
    },
  },
};
</script>
<style scoped>
.breadcrumbs {
  display: flex;
}
</style>
