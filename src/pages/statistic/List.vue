<template>
  <div>
    <div class="tabs flex items-center">
      <span
        @click="currentComponent = 'Me'"
        :class="{ active: currentComponent === 'Me' }"
        class="tab"
        >Mening natijalarim</span
      >
      <span
        v-if="currentUserRole === 'admin' || currentUserRole === 'teacher'"
        @click="currentComponent = 'Students'"
        :class="{ active: currentComponent === 'Students' }"
        class="tab"
        >O'quvchilar natijalari</span
      >
      <span
        v-if="currentUserRole === 'admin'"
        @click="currentComponent = 'All'"
        :class="{ active: currentComponent === 'All' }"
        class="tab"
        >Hamma natijalar</span
      >
      <span
        v-if="currentUserRole === 'teacher'"
        @click="currentComponent = 'mySubjects'"
        :class="{ active: currentComponent === 'mySubjects' }"
        class="tab"
        >Fanlarim natijalari</span
      >
    </div>
    <component :is="currentComponent"></component>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { userStore } from "../../stores/management/user.store";
import All from "./AllResult.vue";
import Me from "./MeResult.vue";
import Students from "./StudentsResult.vue";
import mySubjects from "./mySubjects.vue";
import { resultStore } from '../../stores/references/result.store';
export default {
  components: {
    Me,
    Students,
    All,
    mySubjects,
  },
  data() {
    return {
      currentComponent: "Me",
    };
  },
  computed: {
    ...mapState(userStore, ["currentUserRole"]),
  },
  watch: {
currentComponent(val) {
  resultStore().$patch({list : [], total : null})
}
  }
};
</script>
<style scoped>
.tab {
  background: #acafb4;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  margin: 2px 5px;
  cursor: pointer;
}
.active {
  background: #65676b;
}
</style>