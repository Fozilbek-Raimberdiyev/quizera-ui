<template>
  <!-- <div v-if="loading" class="container">
    <div class="loading flex justify-center items-center">
      <img src="../../assets/gif/ball-loading.gif" alt="loading" />
      loading
    </div>
  </div> -->
  <div class="wrapper">
    <div v-if="list.length">
      <div
        :class="[smallScreen ? 'block' : 'flex items-center justify-between']"
        class=""
      >
        <h5>Test sinovlari</h5>
        <div>
          <!-- <i class='bx bx-search'></i> -->
          <a-input-search
            :style="{ 'width : 100%': smallScreen }"
            v-model:value="search"
            placeholder="Izlang..."
          >
          </a-input-search>
        </div>
      </div>
      <!-- <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th style="vertical-align: middle;" scope="col">#</th>
              <th style="vertical-align: middle;" scope="col">Fan</th>
              <th style="vertical-align: middle;" scope="col">Savollar soni</th>
              <th style="vertical-align: middle;" scope="col">Belgilangan vaqt</th>
              <th style="vertical-align: middle;" scope="col">Harakatlar</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(subject, i) in searchSubject" :key="i">
            <th scope="row">{{ i+1 }}</th>
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
      </div> -->
      <div class="q-pa-md" style="padding: 0; margin-top: 1rem; min-height: 300px;">
        <q-markup-table>
          <thead>
            <tr>
              <!-- <th class="text-left">Dessert (100g serving)</th>
          <th class="text-right">Calories</th>
          <th class="text-right">Fat (g)</th>
          <th class="text-right">Carbs (g)</th>
          <th class="text-right">Protein (g)</th>
          <th class="text-right">Sodium (mg)</th> -->
              <th class="text-left" style="vertical-align: middle" scope="col">
                #
              </th>
              <th class="text-left" style="vertical-align: middle" scope="col">
                Fan
              </th>
              <th class="text-left" style="vertical-align: middle" scope="col">
                Savollar soni
              </th>
              <th class="text-left" style="vertical-align: middle" scope="col">
                Belgilangan vaqt
              </th>
              <th
                class="text-left"
                style="vertical-align: middle"
                scope="col"
                v-if="currentUserRole === 'admin'"
              >
                Yaratilgan vaqti
              </th>
              <th
                class="text-left"
                style="vertical-align: middle"
                scope="col"
                v-if="currentUserRole === 'admin'"
              >
                Muallifi
              </th>
              <th class="text-left" style="vertical-align: middle" scope="col">
                Harakatlar
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subject, i) in searchSubject" :key="i">
              <td class="text-left" scope="row">{{ i + 1 }}</td>
              <td class="text-left">{{ subject.name }}</td>
              <td class="text-left">{{ subject.quizCount }}</td>
              <td class="text-left">{{ subject.time }}</td>
              <td class="text-left" v-if="currentUserRole === 'admin'">
                {{ dateParser(subject.createdDate) }}
              </td>
              <td class="text-left" v-if="currentUserRole === 'admin'">
                {{ subject.authorFullName ? subject.authorFullName : '-'}}
              </td>
              <td class="text-left">
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
        </q-markup-table>
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
    <div v-else>
      <n-empty
        size="huge"
        style="display: flex; justify-content: center; height: 400px"
        description="Siz biriktirilgan testlar yo'q"
      ></n-empty>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../stores/references/subject";
import notFound from "../notFound.vue";
import { InputSearch } from "ant-design-vue";
import { userStore } from "../../stores/management/user.store";
import { dateParser } from "../../pages/utils/date.formatter";
export default {
  components: { notFound },
  data() {
    return {
      search: "",
      page: 1,
      limit: 5,
      loading: false,
      smallScreen: false,
      InputSearch,
    };
  },
  computed: {
    ...mapState(subjectStore, ["list", "total"]),
    ...mapState(userStore, ["currentUserRole"]),
    searchSubject() {
      return this.list.filter((subject) =>
        subject.name
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      );
    },
  },
  props: [
    "size",
    "large",
    "small",
    "default",
    "type",
    "primart",
    "info",
    "succes",
    "text",
    "native-type",
    "submit",
    "cancel",
  ],
  watch: {
    page(val) {
      this.getList(this.limit, val);
    },
  },
  methods: {
    ...mapActions(subjectStore, ["getList"]),
    dateParser,
  },
  mounted() {
    this.loading = true;
    this.getList(this.limit, this.page);
    this.loading = false;
    this.smallScreen = window.innerWidth < 600;
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
/* #list {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
} */
/* .table {
  min-height: 350px;
} */

/* #list td,
#list th {
  padding: 8px;
} */

/* #list tr:nth-child(even){background-color: #f2f2f2;} */

/* #list tbody tr:hover {
  background-color: #ecf3f3;
}

#list th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  color: #000;
  border-bottom: 2px solid #f7f8fc;
} */
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
a {
  text-decoration: none !important;
}
.table-responsive {
  border: 1px solid #dee2e6;
  padding: 10px 5px;
  border-radius: 5px;
  margin-top: 10px !important;
}
</style>