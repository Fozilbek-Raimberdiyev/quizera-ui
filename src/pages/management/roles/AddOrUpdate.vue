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
          v-model="role.name"
          id="name"
          placeholder="Enter the role name"
        ></el-input>
      </div>
      <div class="inline_form">
        <div>
          <label
            ><b>{{ newsPerm.name }}</b></label
          >
          <el-checkbox
            v-for="(perm, index) of newsPerm.permissions"
            @click="addNewsPerms(index, perm.action)"
            :key="index"
            :label="perm.action"
            size="large"
            style="margin: 0"
          />
        </div>
        <div>
          <label
            ><b>{{ postPerm.name }}</b></label
          >
          <el-checkbox
            v-for="(perm, index) of postPerm.permissions"
            @click="addPostPerms(index, perm.action)"
            :key="index"
            :label="perm.action"
            size="large"
            style="margin: 0"
          />
        </div>
        <div>
          <label
            ><b>{{ moviePerm.name }}</b></label
          >
          <el-checkbox
            v-for="(perm, index) of moviePerm.permissions"
            @click="addMoviesPerms(index, perm.action)"
            :key="index"
            :label="perm.action"
            size="large"
            style="margin: 0"
          />
        </div>
        <div>
          <label
            ><b>{{ weatherPerm.name }}</b></label
          >
          <el-checkbox
            v-for="(perm, index) of weatherPerm.permissions"
            @click="addWeatherperms(index, perm.action)"
            :key="index"
            :label="perm.action"
            size="large"
            style="margin: 0"
          />
        </div>
      </div>
      <div>
        <el-button native-type="submit" type="primary">Create role</el-button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import { permissionStore } from "../../../stores/management/permissions.store";
import { roleStore } from "../../../stores/management/role.store";
export default {
  data() {
    return {
      newsPerms: [],
      moviePerms: [],
      postPerms: [],
      weatherPerms: [],
      role: {
        rules: [],
        name: "",
      },
    };
  },
  computed: {
    ...mapState(permissionStore, [
      "moviePerm",
      "newsPerm",
      "postPerm",
      "weatherPerm",
    ]),
    ...mapState(roleStore, ["roles"]),
  },
  inject : ["currentIndex"],
  methods: {
    ...mapActions(roleStore, ["createRole"]),

    addNewsPerms(index, element) {
      this.newsPerms[index] = element;
    },
    addMoviesPerms(index, element) {
      this.moviePerms[index] = element;
    },
    addWeatherperms(index, element) {
      this.weatherPerms[index] = element;
    },
    addPostPerms(index, element) {
      this.postPerms[index] = element;
    },
    submit() {
      for (let key of this.newsPerms) {
        let ability = {};
        ability.action = key;
        ability.subject = "news";
        this.role.rules.push(ability);
      }
      for (let key of this.moviePerms) {
        let ability = {};
        ability.action = key;
        ability.subject = "news";
        this.role.rules.push(ability);
      }
      for (let key of this.weatherPerms) {
        let ability = {};
        ability.action = key;
        ability.subject = "news";
        this.role.rules.push(ability);
      }
      for (let key of this.postPerms) {
        let ability = {};
        ability.action = key;
        ability.subject = "news";
        this.role.rules.push(ability);
      }
      this.roles.push(this.role);
      localStorage.setItem("roles", JSON.stringify(this.roles));
      this.$router.push("/management/roles");
    },
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