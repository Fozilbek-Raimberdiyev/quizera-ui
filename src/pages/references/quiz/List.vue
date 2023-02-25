<template>
  <div>
    <div class="list">
      <div class="flex justify-between items-center">
        <h5>Quiz references List</h5>
        <div class="search">
          <a-input-search v-model:value="search" placeholder="Izlang..."></a-input-search>
        </div>
        <el-button
          type="primary"
          size="small"
          class="cursor-pointer"
          @click="$router.push('/references/quiz/add')"
          ><i class='bx bx-plus' style="margin-right: 5px;"></i>Savol qo'shish</el-button
        >
      </div>
      <div>
        <a-list item-layout="horizontal" :data-source="listC">
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
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      v-model:current-page="page"
    />
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
    limit: 5,
    page: 1,
    search : ""
  }),
  watch: {
    isChildRendered() {},
    subjectId(val) {
      this.getQuestions(val);
    },
    page(val) {
      this.getList(this.limit, val);
    },
  },
  props : ["size", "large","small", "default", "type", "primart", "info", "succes", "text", "native-type", "submit", "cancel"],
  computed: {
    ...mapState(subjectStore, ["list", "total"]),
    ...mapState(questionStore, ["questions"]),
    listC() {
      return this.list.filter((el) => el.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
    }
  },
  methods: {
    ...mapActions(questionStore, ["getQuestions"]),
    ...mapActions(subjectStore, ["getList"]),
    emit(val) {
      this.isChildRendered = val;
    },
  },
  beforeRouteLeave() {
    subjectStore().$patch({list : [], total : null})
  },
  mounted() {
    this.getList(this.limit, this.page);
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
  /* border-bottom: 1px solid #d3d2d2; */
  padding-bottom: 10px;
  min-height: 350px;
}
</style>