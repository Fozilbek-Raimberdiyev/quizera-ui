<template>
  <div>
    <h6>Yakuniy nazorat</h6>
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
        <tr v-for="(subject, i) in list" :key="i">
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
</template>
<script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../stores/references/subject";
export default {
  computed: {
    ...mapState(subjectStore, ["list"]),
  },
  methods: {
    ...mapActions(subjectStore, ["getList"]),
  },
  mounted() {
    this.getList();
  },
};
</script>
<style scoped>
#list {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
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
</style>