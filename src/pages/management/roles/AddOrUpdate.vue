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
        ></el-input>
      </div>
      <div class="inline_form">
        <a-card v-for="perm of list" :key="perm._id">
          <div>
            <label
              ><b>{{ perm.name }}</b></label
            >
            <!-- @change="
              (event) => role.rules.push({ subject: perm.name, action: rule }), 
              " -->
            <el-checkbox-group
              v-for="(rule, i) in perm.actions"
              :key="i"
              :value="rule"
              @change="
                (event) => setData(event).then(() => {
                  currentIndex=i
                })
              "
            >
              <el-checkbox
                :label="rule"
                size="large"
                class="block"
                style="margin: 0"
              />
            </el-checkbox-group>
          </div>
        </a-card>
        <pre>{{ role }}</pre>
        <pre>{{ currentIndex }}</pre>
      </div>
      <div>
        <el-button native-type="submit" type="primary">Create role</el-button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { permissionStore } from "../../../stores/management/permissions.store";
export default {
  data() {
    return {
      role: {
        rules: [],
        name: "",
      },
      currentIndex : ""
    };
  },
  computed: {
    ...mapState(permissionStore, ["list"]),
  },
  methods: {
    ...mapActions(permissionStore, ["getList"]),
    submit() {},
   async setData(e) {
      console.log(e, "event")
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