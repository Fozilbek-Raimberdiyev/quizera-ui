<script setup>
import { vMaska } from "maska";
import { ref } from "vue";
let input = ref(null);
function togglePassword() {
 if(input.value.type==='text') {
  input.value.type = 'password'
 } else {
  input.value.type = 'text'
 }
}
let props = defineProps({
  modelValue: String,
  placeholder: String,
  showSuffix: {
    default: false,
    type: Boolean,
  },
  showPrefix: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  maska: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="relative mb-6">
    <div
      v-if="props.showSuffix"
      class="absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <slot name="suffix"></slot>
    </div>
    <input
      ref="input"
      v-maska
      :data-maska="props.maska"
      :class="{ 'pl-[90px]': showSuffix , 'pr-[20px]' : showPrefix}"
      :type="props.type"
      id="input-group-1"
      class="w-full px-3 py-2 transition duration-500 ease-in-out border rounded shadow-sm focus:ring-1 focus:ring-blue-700 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      :placeholder="placeholder"
      :value="props['modelValue, placeholder']"
      @input="$emit('update:props.modelValue', $event.target.value)"
    />
    <div
      v-if="props.showPrefix"
      class="absolute inset-y-0 right-2 flex items-center pl-3"
    >
      <slot name="prefix"></slot>
    </div>
    <div v-if="props.type==='password'" class="absolute right-[14px] top-[14px]">
      <img
        src="@/assets/image/eye.png"
        class="cursor-pointer"
        @click="togglePassword"
      />
    </div>
  </div>
</template>