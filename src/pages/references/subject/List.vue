<template>
  <div>
    <div class="mt-4"><router-view @created="getStat"></router-view></div>
    <div class="flex justify-between">
      <!-- <ul>
        <li v-for="(item, index) in list" :key="item._id">
        <b style="margin-right: 5px;">{{ index + 1 }}</b>
        <span>{{ item.name }}</span>
        </li>
      </ul> -->
      <a-list item-layout="horizontal" :data-source="list">
        <template #renderItem="{ item }">
          <a-list-item>
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span style="margin-right: 1rem">{{ item.name }}</span>
              <div class="flex items-center justify-between">
                <span
                  @click="updateStatus(item)"
                  v-if="!item.isStarted"
                  class="start"
                  ><i class="bx bx-play"></i>Start</span
                >
                <span @click="updateStatus(item)" v-else class="finish"
                  ><i class="bx bx-stop"></i>Stop</span
                >
                <el-button
                  style="margin-right: 0.5rem"
                  class="cursor-pointer"
                  type="text"
                >
                  <router-link :to="`/references/subject/${item._id}/update`">
                    <i class="bx bxs-edit"></i>
                  </router-link>
                </el-button>
                <a-popconfirm
                  title="Haqiqatdan o'chirmoqchimisiz? Fanga qo'shilib savollari ham o'chib ketadi?"
                  ok-text="Ha"
                  cancel-text="Yo'q"
                  @confirm="deleteSubject(item._id)"
                  @cancel="cancel"
                >
                  <i
                    style="cursor: pointer; color: #429fff"
                    class="bi bi-trash"
                  ></i>
                </a-popconfirm>
              </div>
            </div>
          </a-list-item>
        </template>
      </a-list>
      <el-button
        class="cursor-pointer"
        v-if="!isInAdd"
        type="primary"
        @click="toAddOrUpdate"
        ><i class="bx bx-plus" style="margin-right: 5px"></i>Qo'shish</el-button
      >
    </div>
    <el-pagination
      small
      background
      style="margin-top: 1rem"
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
import subjectService from "../../../services/subject.service";
export default {
  data() {
    return {
      subjectId: "",
      number: 0,
      isInAdd: false,
      subjectService,
      page: 1,
      limit: 5,
      // stat  : false
    };
  },
  computed: {
    ...mapState(subjectStore, ["list", "total"]),
  },
  watch: {
    page(val) {
      let params = {
        isForReference: true,
        page: val,
        limit: 5,
      };
      this.getList(params);
    },
  },
  methods: {
    ...mapActions(subjectStore, [
      "getList",
      "deleteSubjectAndQuestions",
      "updateSubjectStatus",
    ]),
    getStat(val) {
      if (val) {
        let params = {
          isForReference: true,
          page: 1,
          limit: 5,
        };
        this.getList(params);
      }
    },
    toAddOrUpdate() {
      this.isInAdd = true;
      this.$router.push("/references/subject/add");
    },
    toList() {
      this.isInAdd = false;
      this.$router.push("/references/subject");
    },
    async deleteSubject(id) {
      let res = await this.deleteSubjectAndQuestions(id);
      // this.$router.push("/references/subject");
      let params = {
        isForReference: true,
        page: 1,
        limit: 5,
      };
      this.getList(params);
    },
    async updateStatus(item) {
      await this.updateSubjectStatus({ subjectID: item._id, status: true });
      await this.getList({ isForReference: true, page: this.page, limit: 5 });
    },
  },
  beforeRouteLeave() {
    return subjectStore().$patch({ list: [] });
  },
  mounted() {
    let params = {
      isForReference: true,
      page: 1,
      limit: 5,
    };
    this.getList(params);
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.start {
  background: yellowgreen;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 0 5px;
}
.finish {
  background: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  margin: 0 5px;
}
label {
  min-height: 60px;
}
.ant-list-items {
  justify-content: space-between !important;
}
</style>