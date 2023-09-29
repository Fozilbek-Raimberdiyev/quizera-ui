<template>
  <form @submit.prevent="submit">
    <h6>Ruxsatlarning toifasi(subject) <span></span></h6>
    <div class="name">
      <el-input
        clearable
        placeholder="Type the subject of permissions"
        v-model="form.name"
      ></el-input>
      <div v-if="!isAdd"
        class="icon cursor-pointer"
        @click="generateInputField"
        title="Input field for add actions"
      >
        <i class="bx bx-plus"></i>
      </div>
    </div>
    <div class="actions" v-if="isAdd">
      <h6>Ruxsatlar(actions)</h6>
      <div class="name">
        <el-input
        placeholder="Enter the action"
        class="input"
        v-for="(input, index) in inputFields"
        :key="index"
        v-model="input.value"
        clearable
      ></el-input>
      <div
        class="icon cursor-pointer"
        @click="generateInputField"
        title="Input field for add actions"
      >
        <i class="bx bx-plus"></i>
      </div>
      </div>
    </div>
    <el-button
      v-if="isAdd"
      native-type="submit"
      type="primary"
      class="cursor-pointer"
      >Save</el-button
    >
  </form>
</template>
<script>
import { mapActions } from "pinia";
import { permissionStore } from "../../../stores/management/permissions.store";
export default {
  data: () => ({
    form: {
      name: null,
    },
    isAdd: false,
    inputFields: [{ value: null }],
    value: null,
  }),
  methods: {
    ...mapActions(permissionStore, ["addPermissions"]),
    generateInputField() {
      let lastIndex = this.inputFields.length - 1;
      let value = this.inputFields[lastIndex].value;
      if (this.form.name) {
        if (value) this.inputFields.push({ value: "" });
        this.isAdd = true;
      }
    },
    async submit() {
      if (this.inputFields.length >= 2) {
        let rules = {
          name: this.form.name,
          permissions: this.inputFields.map((el) => {
            return {
              action: el.value,
              subject: this.form.name,
            };
          }),
        };
        let res = await this.addPermissions(rules);
        if (res)
          (this.form.name = null),
            (this.inputFields = [{ value: null }]),
            (rules = {});
      }
    },
  },
};
</script>
<style scoped>
.name {
  display: flex;
  width: 400px;
  align-items: center;
  justify-content: space-between;
}

.actions {
  width: 300px;
}
.input {
  margin: 2px;
}
.icon {
  background: #409eff;
  margin: 0 5px;
  border-radius: 2px;
  color: #fff;
  padding: 5px 10px;
}
h6 {
  font-weight: 600;
}
</style>
