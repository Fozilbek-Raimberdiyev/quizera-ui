<script lang="ts">
import { Quill, QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      content: "",
    };
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    toolbar: {
      type: Array || String,
      default: "",
    }
  },
  watch: {
    modelValue(value) {
      this.content = value;
      if(!value) {
        this.$refs.editor.setHTML('');
      }
    },
  },
  methods: {
    updateContent(value: string) {
      this.$emit("update:modelValue", this.content);
    },
  },
  mounted() {
    // console.log(this.$refs.editor.setContents(this.modelValue));
  },
  inheritAttrs: false,
};
</script>
<template>
  <QuillEditor :placeholder="placeholder"
  ref="editor"
  v-bind="$attrs"
    @input="content = modelValue"
    @textChange="updateContent"
    contentType="html"
    v-model:content="content"
    :toolbar="toolbar"
  />
</template>

<style>
.ql-editor {
  min-height: 300px;
}
</style>
