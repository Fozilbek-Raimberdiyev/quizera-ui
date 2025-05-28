<template>
  <div class="wrapper" style="position: relative">
    <div v-if="list.length">
      <div
        :class="[smallScreen ? 'block' : 'flex items-center justify-between']"
        class=""
      >
        <h5>Test sinovlari</h5>
        <div>
          <a-input-search
            :style="{ 'width : 100%': smallScreen }"
            v-model:value="search"
            placeholder="Izlang..."
          >
          </a-input-search>
        </div>
      </div>
      <div
        class="q-pa-md"
        style="padding: 0; margin-top: 1rem; min-height: 300px"
      >
        <div v-if="searchSubject.length">
          <q-markup-table
            :flat="smallScreen ? true : false"
            style="min-height: 150px"
          >
            <thead>
              <tr>
                <th class="text-left" scope="col">
                  <span style="margin-top: 1rem" class="flex items-center"
                    ><number-outlined
                      style="margin-right: 5px"
                    ></number-outlined
                  ></span>
                </th>
                <th class="text-left min-w-[100px]">
                  <span style="margin-top: 1rem" class="flex items-center"
                    ><FolderOutlined style="margin-right: 5px"></FolderOutlined
                    >Fan</span
                  >
                </th>
                <th class="text-left min-w-[230px]" scope="col">
                  <span style="margin-top: 1rem" class="flex items-center"
                    ><hourglass-outlined
                      style="margin-right: 5px"
                    ></hourglass-outlined
                    >Testga ajratilgan vaqt</span
                  >
                </th>
                <th
                  class="text-left min-w-[200px]"
                  scope="col"
                  v-if="currentUserRole === 'admin'"
                >
                  <span style="margin-top: 1rem" class="flex items-center"
                    ><HistoryOutlined
                      style="margin-right: 5px"
                    ></HistoryOutlined
                    >Qo'shilgan vaqti</span
                  >
                </th>
                <th
                  class="text-left min-w-[150px]"
                  scope="col"
                  style="vertical-align: middle"
                  v-if="currentUserRole === 'admin'"
                >
                  <span style="margin-top: 1rem" class="flex items-center"
                    ><info-circle-outlined
                      style="margin-right: 5px"
                    ></info-circle-outlined
                    >Test holati</span
                  >
                </th>
                <th
                  class="text-left min-w-[200px]"
                  style="vertical-align: middle"
                  scope="col"
                >
                  <span style="margin-top: 1rem" class="flex items-center"
                    ><user-outlined style="margin-right: 5px"></user-outlined
                    >Test muallifi</span
                  >
                </th>
                <th class="text-left min-w-[200px]" scope="col">
                  <span style="margin-top: 1rem" class="flex items-center"
                    ><interaction-outlined
                      style="margin-right: 5px"
                    ></interaction-outlined
                    >Harakatlar</span
                  >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-show="searchSubject.length"
                v-for="(subject, i) in searchSubject"
                :key="i"
              >
                <td class="text-left" scope="row">{{ i + 1 }}</td>
                <td class="text-left data">{{ subject.name }}</td>
                <td class="text-left data">{{ subject.time }}</td>
                <td class="text-left data" v-if="currentUserRole === 'admin'">
                  {{ dateParser(subject.createdDate) }}
                </td>
                <td v-if="currentUserRole === 'admin'" class="text-left data">
                  <span :class="[subject.isStarted ? 'active' : 'inactive']">{{
                    subject.isStarted ? "Faol" : "Nofaol"
                  }}</span>
                </td>
                <td class="text-left data">
                  {{ subject.authorFullName ? subject.authorFullName : "-" }}
                </td>
                <td class="text-left data">
                  <el-button
                    type="primary"
                    style="cursor: pointer"
                    size="small"
                    @click="checkingPasswordStatus(subject, subjectPassword)"
                  >
                    <span>
                      <i class="bi bi-box-arrow-in-right"></i>
                      Kirish
                    </span>
                  </el-button>
                </td>
              </tr>
              <tr
                style="position: relative; min-height: 100px"
                v-show="!searchSubject.length"
              >
                <n-empty
                  style="margin: 0 auto; position: absolute; left: 45%"
                ></n-empty>
              </tr>
            </tbody>
          </q-markup-table>
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
    </div>
    <div
      v-else-if="loading"
      style="position: absolute; left: 50%; top: 40vh; width: 25px"
    >
      <!-- <a-spin style="position: absolute; top: 50%; left: 50%;"></a-spin> -->
      <img
        style="width: 100%"
        src="../../assets/gif/iphone-spinner.gif"
        alt="Loading..."
      />
    </div>
    <div v-else>
      <n-empty
        size="huge"
        description="Test sinovlari topilmadi..."
        style="position: absolute; left: 50%; margin-top: 40vh"
      ></n-empty>
    </div>

    <el-dialog
      v-model="isShow"
      title="Parolni kiriting..."
      :width="smallScreen ? '70%' : '30%'"
      :before-close="handleClose"
    >
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <a-input
          placeholder="Parolni kiriting..."
          v-model:value="subjectPassword"
          type="password"
          show-password
          @keyup.enter="checkPasswordSubject"
        ></a-input>
        <el-button
          class="cursor-pointer"
          style="margin-left: 1px"
          type="primary"
          @click="checkPasswordSubject"
          >Kirish</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { mapActions, mapState } from "pinia";
import {QMarkupTable} from "quasar"
import notFound from "../notFound.vue";
import { InputSearch } from "ant-design-vue";
import { userStore } from "../../stores/management/user.store";
import { dateParser } from "../../pages/utils/date.formatter";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
import {
  CopyrightCircleOutlined,
  DeliveredProcedureOutlined,
  HourglassOutlined,
  FolderOutlined,
  InteractionOutlined,
  UserOutlined,
  LoginOutlined,
  BarChartOutlined,
  NumberOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import subjectService from "../../services/subject.service";
import { listeningQuizStore } from "../../stores/references/listeningQuiz.store";
import listeningService from '../../services/listening.service';

export default {
  components: {
    notFound,
    CopyrightCircleOutlined,
    DeliveredProcedureOutlined,
    HourglassOutlined,
    FolderOutlined,
    InteractionOutlined,
    UserOutlined,
    LoginOutlined,
    BarChartOutlined,
    NumberOutlined,
    HistoryOutlined,
    InfoCircleOutlined,
    FadeLoader,
    QMarkupTable
  },
  data() {
    return {
      search: "",
      page: 1,
      limit: 5,
      smallScreen: false,
      InputSearch,
      subjectPassword: "",
      isShow: false,
      quiz: {},
      subjectService,
      listeningService
    };
  },
  computed: {
    ...mapState(listeningQuizStore, ["list", "total", "loading"]),
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
    ...mapActions(listeningQuizStore, ["getList"]),
    dateParser,
    checkingPasswordStatus(quiz) {
      this.quiz = quiz;
      if (quiz.isHasPassword) {
        this.isShow = true;
      } else {
        this.$router.push(`/listeningQuizzes/${quiz._id}`);
      }
    },
    async checkPasswordSubject() {
      try {
        let res = await listeningService.checkPasswordQuiz(
          this.quiz,
          this.subjectPassword
        );
        this.$router.push(`/listeningQuizzes/${this.quiz._id}`);
      } catch (e) {
        console.log(e);
      }
    },
  },
  beforeRouteLeave() {
    listeningQuizStore().$patch({ list: [], total: null });
  },
  mounted() {
    this.getList(this.limit, this.page, false);
    this.smallScreen = window.innerWidth < 600;
  },
};
</script>
  <style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
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

th {
  font-size: 15px;
}
span.active {
  background: yellowgreen;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
}
span.inactive {
  background: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
}
@media screen and (max-width: 600px) {
  td.data {
    min-width: 200px;
  }
}

/* @media screen and (max-width: 992px) {
    body {
      background-color: blue;
    }
  } */
</style>