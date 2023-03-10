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
                  @click="updateQuizStatus({ quiz: item._id, status: true })"
                  v-if="!item.isStarted"
                  class="start"
                  ><i class="bx bx-play"></i>Start</span
                >
                <span
                  @click="updateQuizStatus({ quiz: item._id, status: false })"
                  v-else
                  class="finish"
                  ><i class="bx bx-stop"></i>Stop</span
                >
                <el-button
                  style="margin-right: 0.5rem"
                  class="cursor-pointer"
                  type="text"
                >
                  <router-link :to="`/references/listening/${item._id}/update`">
                    <i class="bx bxs-edit"></i>
                  </router-link>
                </el-button>
                <a-popconfirm
                  title="Haqiqatdan o'chirmoqchimisiz? Fanga qo'shilib savollari ham o'chib ketadi?"
                  ok-text="Ha"
                  cancel-text="Yo'q"
                  @confirm="deleteQuiz(item._id)"
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
  </div>
</template>
  <script>
import { mapActions, mapState } from "pinia";
import subjectService from "../../../services/subject.service";
import { listeningQuizStore } from "../../../stores/references/listeningQuiz.store";
export default {
  data() {
    return {
      subjectId: "",
      number: 0,
      isInAdd: false,
      subjectService,
      // stat  : false
    };
  },
  computed: {
    ...mapState(listeningQuizStore, ["list"]),
  },
  methods: {
    ...mapActions(listeningQuizStore, [
      "getList",
      "deleteQuizP",
      "updateQuiz",
      "updateQuizStatus",
    ]),
    getStat(val) {
      if (val) {
        this.getList();
      }
    },
    toAddOrUpdate() {
      this.isInAdd = true;
      this.$router.push("/references/listening/add");
    },
    toList() {
      this.isInAdd = false;
      this.$router.push("/references/listening");
    },
    async deleteQuiz(id) {
      alert("recursion");
      let res = await this.deleteQuizP(id);
      this.$router.push("/references/listening");
    },
  },
  beforeRouteLeave() {
    return listeningQuizStore().$patch({ list: [] });
  },
  mounted() {
    this.getList(10, 1, false);
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