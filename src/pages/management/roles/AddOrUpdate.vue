<template>
  <div>
    <el-button
      @click="$router.go(-1)"
      type="info"
      size="small"
      style="cursor: pointer; margin-bottom: 1rem"
      ><i class="bx bx-arrow-back" style="margin-right: 5px"></i>Back</el-button
    >
    <form @submit.prevent="submit">
      <div style="width: 200px">
        <label for="name"><b>Role name</b></label>
        <el-input
          id="name"
          required
          placeholder="Enter the role name"
          v-model="role.name"
        ></el-input>
      </div>
      <div class="inline_form">
        <a-card v-for="perm of list" :key="perm._id">
          <div>
            <label
              ><h5>{{ perm.name }}</h5></label
            >
           <div v-for="rule of perm.permissions" :key="rule">
            <input style="margin-right: 3px;" type="checkbox" v-model="role.permissions" :value="{subject: perm.name, action: rule.action}" :name="rule.action" :id="rule.action+perm.name">
            <label :for="rule.action+perm.name">{{rule.action}}</label>
           </div>
          </div>
        </a-card>
      </div>
      <div style="margin-top: 3px">
        <el-button native-type="submit" type="primary">Create role</el-button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { permissionStore } from "../../../stores/management/permissions.store";
import {roleStore} from "../../../stores/management/role.store"
export default {
  data() {
    return {
      role: {
        permissions: [],
        name: "",
      },
      currentIndex: "",
    };
  },
  props: [
    "size",
    "large",
    "small",
    "default",
    "type",
    "primart",
    "info",
    "succes",
    "text",
    "native-type",
    "submit",
    "cancel",
  ],
  computed: {
    ...mapState(permissionStore, ["list"]),
  },
  methods: {
    ...mapActions(permissionStore, ["getList"]),
    ...mapActions(roleStore, ["addRole"]),
    submit() {
      if(this.role.name && this.role.permissions.length){
        this.addRole(this.role)
      }
    },
    async setData(e) {
      // console.log(e, "event")
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style scoped>
form {
}
.inline_form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.inline_form label {
  margin: 1rem 0 0.5rem 0;
}
form > div > div > label {
  display: block;
}

form label {
  font-size: 18px;
}
</style>
