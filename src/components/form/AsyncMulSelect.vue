<template>
  <el-select-v2
    v-model="values"
    style="width: 240px"
    multiple
    filterable
    remote
    :remote-method="remoteMethod"
    clearable
    :options="optionsSelf"
    :loading="loading"
    placeholder="Please enter a keyword"
    @select="select"
  />
  <pre>{{ values }} values</pre>
  <pre>{{ editValues }} editvalues</pre>
</template>
  
  <script>
export default {
  data() {
    return {
      optionsSelf: [],
      loading: false,
      values: [
        {
          value: "fl.raimberdiyev@gmail.com",
          label: "fl.raimberdiyev@gmail.com",
        },
        {
          value: "student@mail.ru",
          label: "student@mail.ru",
        },
      ],
    };
  },
  props: {
    options: {
      type: Array,
      default: [],
    },
    editValues: {
      type: Array,
      default: [],
    },
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.$emit("getData", this.values);
        this.loading = true;
        setTimeout(() => {
          // let options = [...this.options]
          let options = this.options.map((option) => {
            return {
              label: option.email,
              value: option.email,
            };
          });
          this.optionsSelf = options.filter((option) => {
            return option.label.toLowerCase().includes(query.toLowerCase());
          });
          this.loading = false;
        }, 200);
      }
    },
  },
  mounted() {
    // this.values = this.editValues;
  },
};
</script>
  