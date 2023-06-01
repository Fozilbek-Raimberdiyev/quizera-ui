<template>
    <button
      :v-bind="$attrs"
      class="py-[13px] px-[26.5px] text-white bg-[#2B3D90] rounded-lg"
      
    >
      <slot></slot>
    </button>
</template>
<script lang="ts" setup>
defineProps({
  width: String,
});
</script>

<style scoped>
</style>