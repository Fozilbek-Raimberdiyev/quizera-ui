<template>
  <div>
    <div class="mt-4"><router-view @created="getStat"></router-view></div>
    <div class="flex items-center justify-end mb-[6px]">
      <el-button
        class="cursor-pointer"
        v-if="!isInAdd"
        type="primary"
        @click="toAddOrUpdate"
        ><i class="bx bx-plus" style="margin-right: 5px"></i>Qo'shish</el-button
      >
    </div>
    <q-markup-table class="min-h-[350px]">
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Fan nomi</th>
          <th class="text-left">Fan savollar soni</th>
          <th class="text-left">Bazadagi savollar soni</th>
          <th class="text-left">Qo'shilgan vaqti</th>
          <th class="text-right">Harakatlar</th>
        </tr>
      </thead>
      <tbody v-if="list?.length">
        <tr v-for="(item, index) in list" :key="index">
          <td class="text-left">
            {{ index + 1 }}
          </td>
          <td class="text-left">
            {{ item?.name }}
          </td>
          <td class="text-left">
            {{ item?.quizCount }}
          </td>
          <td class="text-left">-</td>
          <td class="text-left">
            {{ new Date(item?.createdDate).toLocaleDateString() }}
          </td>
          <td class="text-right">
            <div class="flex items-center justify-between">
              <span
                @click="updateStatus(item,true)"
                v-if="!item.isStarted"
                class="start"
                ><i class="bx bx-play"></i>Start</span
              >
              <span @click="updateStatus(item,false)" v-else class="finish"
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
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="loading" style="position: relative">
        <tr style="position: absolute; padding: 10px 0; inset: 0">
          <div
            class="flex items-center justify-center h-[200px] lg:h-[280px] content-center"
          >
            <p>Yuklanmoqda</p>
          </div>
        </tr>
      </tbody>
      <tbody v-else style="position: relative">
        <tr class="" style="position: absolute; padding: 10px 0; inset: 0">
          <div
            class="flex items-center justify-center h-[200px] lg:h-[280px] content-center"
          >
            <n-empty></n-empty>
          </div>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="flex justify-between">
      <!-- <ul>
        <li v-for="(item, index) in list" :key="item._id">
        <b style="margin-right: 5px;">{{ index + 1 }}</b>
        <span>{{ item.name }}</span>
        </li>
      </ul> -->
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
import {QMarkupTable} from "quasar"
export default {
  components: {
    QMarkupTable,
  },
  data() {
    return {
      subjectId: "",
      number: 0,
      isInAdd: false,
      subjectService,
      page: 1,
      limit: 20,
      loading: false,
      // stat  : false
    };
  },
  computed: {
    ...mapState(subjectStore, ["list", "total"]),
  },
  watch: {
    async page(val) {
      let params = {
        isForReference: true,
        page: val,
        limit: this.limit,
      };
      this.loading = true;
      await this.getList(params);
      this.loading = false;
    },
  },
  methods: {
    ...mapActions(subjectStore, [
      "getList",
      "deleteSubjectAndQuestions",
      "updateSubjectStatus",
    ]),
    async getStat(val) {
      if (val) {
        let params = {
          isForReference: true,
          page: 1,
          limit: this.limit,
        };
        this.loading = trui;
        await this.getList(params);
        this.loading = false;
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
        limit: this.limit,
      };
      this.getList(params);
    },
    async updateStatus(item, value) {
      await this.updateSubjectStatus({ subjectID: item._id, status: value });
      await this.getList({
        isForReference: true,
        page: this.page,
        limit: this.limit,
      });
    },
  },
  beforeRouteLeave() {
    return subjectStore().$patch({ list: [] });
  },
  async mounted() {
    try {
      let params = {
        isForReference: true,
        page: 1,
        limit: this.limit,
      };
      this.loading = true;
      await this.getList(params);
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
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
