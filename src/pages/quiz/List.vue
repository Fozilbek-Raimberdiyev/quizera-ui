<template>
  <div v-if="loading" class="container">
    <div class="loading flex justify-center items-center">
      <div class="hidden"></div>
      <img  src="../../assets/gif/ball-loading.gif" alt="loading" />
    </div>
  </div>
  <div v-else="!loading" class="wrapper">
    <div class="flex items-center justify-between">
      <h5>Yakuniy nazorat</h5>
      <div>
        <el-input v-model="search" placeholder="Izlang..."> </el-input>
      </div>
    </div>
    <div class="table" v-if="searchSubject">
      <table id="list">
        <thead>
          <tr>
            <th>Fan</th>
            <th>Savollar soni</th>
            <th>Belgilangan vaqt</th>
            <th>Harakatlar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, i) in searchSubject" :key="i">
            <td>{{ subject.name }}</td>
            <td>{{ subject.quizCount }}</td>
            <td>{{ subject.time }}</td>
            <td>
              <el-button
                type="primary"
                style="cursor: pointer"
                size="small"
                @click="$router.push(`/quiz/${subject._id}`)"
              >
                Kirish
              </el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <el-empty description="Fanlar toplimadi"></el-empty>
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
import { subjectStore } from "../../stores/references/subject";
import notFound from "../notFound.vue";
export default {
  components: { notFound },
  data() {
    return {
      search: "",
      page: 1,
      limit: 5,
      loading: false,
    };
  },
  computed: {
    ...mapState(subjectStore, ["list", "total"]),
    searchSubject() {
      return this.list.filter((subject) =>
        subject.name
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      );
    },
  },
  watch: {
    page(val) {
      this.getList(this.limit, val);
    },
  },
  methods: {
    ...mapActions(subjectStore, ["getList"]),
  },
  mounted() {
    this.loading = true
    this.getList(this.limit, this.page);
    this.loading = false
  },
};
</script>
<style scoped>
#list {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table {
  min-height: 350px;
}

#list td,
#list th {
  /* border: 1px solid #ddd; */
  padding: 8px;
}

/* #list tr:nth-child(even){background-color: #f2f2f2;} */

#list tbody tr:hover {
  background-color: #ecf3f3;
}

#list th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  /* background-color: #04AA6D; */
  color: #000;
  border-bottom: 2px solid #f7f8fc;
}
.container {
  position: relative;
}

.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.loading img {
  width: 200px;
  background: #e3e5e9;
}
</style>