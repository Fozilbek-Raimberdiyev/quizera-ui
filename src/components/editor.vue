<script lang="ts">
import { Quill, QuillEditor} from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      content: "",
    }
  },
  props : {
    modelValue : {
      type : String,  
      default : ""
    }
  },
  watch: {
    modelValue(value) {
      this.content = value
    }
  },
  methods: {
    updateContent(value: string) {
      this.$emit("update:modelValue", this.content);
    }
  },
  mounted() {
    // console.log(this.$refs.editor.setContents(this.modelValue));
  }
};
</script>
<template>
  <QuillEditor ref="editor" @input="content=modelValue" @textChange="updateContent" contentType="html" v-model:content="content"   toolbar="full"  />
</template>
