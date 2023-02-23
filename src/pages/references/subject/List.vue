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
            <div class="flex items-center">
              <span style="margin-right: 1rem">{{ item.name }}</span>
              <div class="actions flex items-center">
                <el-button style="margin-right: 0.5rem;" class="cursor-pointer" type="text">
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
        ><i class='bx bx-plus' style="margin-right: 5px;"></i>Qo'shish</el-button
      >
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../../stores/references/subject";
export default {
  data() {
    return {
      subjectId: "",
      number: 0,
      isInAdd: false,
      // stat  : false
    };
  },
  computed: {
    ...mapState(subjectStore, ["list"]),
  },
  methods: {
    ...mapActions(subjectStore, ["getList", "deleteSubjectAndQuestions"]),
    getStat(val) {
      if (val) {
        this.getList();
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
    async deleteSubject (id) {
      let res= await this.deleteSubjectAndQuestions(id);
      this.$router.push("/references/subject")
    },
  },
  mounted() {
    this.getList();
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
</style>