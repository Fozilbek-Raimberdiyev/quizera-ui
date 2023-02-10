<template>
  <div>
    <div class="flex justify-between items-center">
      <h5>Quiz references List</h5>
      <el-button
        type="primary"
        size="small"
        @click="$router.push('/references/quiz/add')"
        >Savol qo'shish</el-button
      >
    </div>
    <div>
      <a-list item-layout="horizontal" :data-source="list">
        <template #renderItem="{ item }">
          <a-list-item
            ><router-link :to="`/references/quiz/${item._id}`">
              {{ item.name }}</router-link
            >
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../../stores/references/subject";
import { questionStore } from "../../../stores/references/questions";
export default {
  data: () => ({
    isChildRendered: false,
    subjectId: "",
  }),
  watch: {
    isChildRendered() {},
    subjectId(val) {
      this.getQuestions(val);
    },
  },
  computed: {
    ...mapState(subjectStore, ["list"]),
    ...mapState(questionStore, ["questions"]),
  },
  methods: {
    ...mapActions(questionStore, ["getQuestions"]),
    ...mapActions(subjectStore, ["getList"]),
    emit(val) {
      this.isChildRendered = val;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style scoped>
.options {
  list-style: none;
  border: 1px solid #e3e5e9;
  padding: 5px;
  margin: 3px 0;
  border-radius: 5px;
}
.options.true {
  border-color: greenyellow;
}
.list {
  border-bottom: 1px solid #d3d2d2;
  padding-bottom: 10px;
}
</style>