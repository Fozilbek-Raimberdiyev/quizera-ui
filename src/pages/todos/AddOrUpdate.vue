
<template>
  <div>
    <el-button
      @click="$router.go(-1)"
      type="info"
      size="small"
      style="cursor: pointer"
      ><i class="bx bx-arrow-back" style="margin-right: 5px"></i>Back</el-button
    >
    <form @submit.prevent="submit">
      <div class="form">
        <div>
          <label for="name"><b>Name</b></label>
          <el-input
            class="w-100 m-2"
            placeholder="Enter the  name of todo"
            v-model="form.name"
            id="name"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6 }"
            @input="v$.$touch()"
          ></el-input>
          <span class="error" v-if="v$.form.name.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
          <label for="firstName"><b>Description</b></label>
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            placeholder="Enter the description of todo"
            v-model="form.description"
            id="description"
          ></el-input>
          <span class="error" v-if="v$.form.description.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
        <div>
          <label for="endDate"><b>End date of todo</b></label>
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="Pick a day"
            :size="size"
          />
          <span class="error" v-if="v$.form.endDate.$error"
            >Maydon to'ldirlishi shart!</span
          >
        </div>
      </div>
      <el-button
        v-if="!$route.params.id"
        :size="large"
        class="btn"
        type="primary"
        native-type="submit"
        >Create</el-button
      >
      <el-button
        v-else
        size="large"
        class="btn"
        style="margin-top: 5px"
        type="primary"
        :disabled="disabled"
        native-type="submit"
        >Update</el-button
      >
    </form>
  </div>
</template>
  <script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapActions, mapState } from "pinia";
import axios from "axios";
import { todoStore } from "../../stores/todos.store";
import router from "../../router";
export default {
  setup: () => ({}),
  data: () => ({
    v$: useVuelidate(),
    form: {
      name: "",
      description: "",
      endDate: "",
      // password: "",
      // rules : []
    },
  }),
  props : ["size", "large","small", "default", "type", "primart", "info", "succes", "text", "native-type", "submit", "cancel"],
  validations() {
    return {
      form: {
        name: {
          required,
        },
        description: {
          required,
        },
        endDate: {
          required,
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions(todoStore, ["getById", "updateById", "addTodo"]),
    async submit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (!this.$route.params.id) {
          let res = await this.addTodo(this.form)
          this.$router.push("/todos");
        } else {
          let id = this.form._id;
          await this.updateById(id, this.form);
          this.$router.push("/todos");
        }
      } else {
      }
    },
    async setData() {
      if (this.$route.params.id) {
        let id = this.$route.params.id;
        this.form = (await this.getById(id))?.data;
      } else {
        return;
      }
    },
  },
  created() {
    this.setData();
  },
};
</script>
  <style scoped>
form {
  background: #fff;
  padding: 10px 15px;
}
.form {
}
.form > div > input,
.form > div > label,
.form > div > span {
  display: block;
}

form > .btn {
  margin-left: 1rem;
  cursor: pointer;
  display: block !important;
}

.error {
  color: red;
}
</style>
  