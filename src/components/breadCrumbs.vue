<template>
    <!-- <div class="breadcrumbs" v-for="(route, index) in $route.matched" :key="index">
        <router-link :to="route?.path">{{ route.name }}</router-link>
    </div> -->
    <el-breadcrumb separator="/">
    <el-breadcrumb-item v-show="route.name!='index'" style="text-transform: capitalize;" v-for="(route, index) in $route.matched" :key="index" :to="route.path">{{ route.name }}
        {{ route?.children.matched }}
    <!-- <el-breadcrumb-item v-if="route.children.matched">Children</el-breadcrumb-item> -->
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
    name : "breadcrumbs",
    props : {
        routes : {
            type : Array,
            default : []
        }
    },
    computed : {
        routesC() {
            return this.$route
        }
    },
    created() {

    }
}
</script>
<style scoped>
    .breadcrumbs {
        display: flex;
    }
</style>