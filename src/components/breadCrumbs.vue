<template>
    <div v-for="(route, index) in routes" :key="index">
        <router-link :to="route?.path">{{ route.name }}</router-link>
        <breadcrumbs v-if="route?.children" :routes="route?.children"></breadcrumbs>
    </div>
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
    created() {
        console.log(this.routes)
    }
}
</script>
<style>
    
</style>