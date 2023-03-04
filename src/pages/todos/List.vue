<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="tabs" v-if="list.length">
        <span
          @click="(status = 'all'), (currentTab = 'all')"
          :class="{ active: currentTab === 'all' }"
          class="tab"
          >Hammasi</span
        >
        <span
          @click="(status = 'true'), (currentTab = 'true')"
          :class="{ active: currentTab == 'true' }"
          class="tab"
          >Bajarilgan</span
        >
        <span
          @click="(status = 'false'), (currentTab = 'false')"
          :class="{ active: currentTab == 'false' }"
          class="tab"
          >Bajarilmagan</span
        >
      </div>
      <div :style="[smallScreen ? 'margin : 5px auto; margin-right: 0' : '']">
        <el-button
          v-if="!smallScreen"
          type="primary"
          @click="$router.push({ name: 'Todo add' })"
          ><i class="bx bx-plus" style="margin-right: 5px"></i>Add
          todo</el-button
        >
        <el-button
          v-else
          type="primary"
          @click="$router.push({ name: 'Todo add' })"
          ><i class="bx bx-plus" style="margin-right: 5px"></i
        ></el-button>
      </div>
    </div>
    <div style="min-height: 350px" v-if="list.length">
      <div class="q-pa-md" style="padding: 0; margin-top: 1rem">
        <div>
          <div v-if="listC.length">
            <q-markup-table style="min-height: 150px">
              <thead>
                <tr>
                  <th
                    class="text-left"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    №
                  </th>
                  <th
                    class="text-left"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    Name
                  </th>
                  <th
                    class="text-left"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    Description
                  </th>
                  <th
                    class="text-right"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    Begin date
                  </th>
                  <th
                    class="text-right"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    End date
                  </th>
                  <th
                    class="text-right"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    Bajarilish vaqti
                  </th>
                  <th
                    class="text-right"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    Time left
                  </th>
                  <th
                    class="text-right"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    Holati
                  </th>
                  <th
                    class="text-right"
                    style="vertical-align: middle"
                    scope="col"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody v-if="listC.length">
                <tr v-for="(todo, index) in listC" :key="index">
                  <td class="text-left" scope="row">{{ index + 1 }}</td>
                  <td class="text-left">{{ todo.name }}</td>
                  <td class="text-left">{{ todo.description }}</td>
                  <td class="text-right">{{ toDDMMYY(todo.date) }}</td>
                  <td class="text-right">{{ toDDMMYY(todo.endDate) }}</td>
                  <td class="text-right">
                    {{
                      todo.isMaked
                        ? subtractDates(todo.makedDate, todo.date)
                        : "-"
                    }}
                  </td>
                  <td class="text-right">
                    {{
                      todo.isMaked
                        ? "-"
                        : subtractDates(todo.endDate, new Date())
                    }}
                  </td>
                  <td class="text-right">
                    <el-checkbox
                      @change="
                        updateStatusById(todo._id, { status: todo.isMaked })
                      "
                      v-model="todo.isMaked"
                      :disabled="todo.isMaked"
                    ></el-checkbox>
                  </td>
                  <td class="text-right">
                    <div
                      style="
                        display: flex;
                        justify-content: end;
                        align-items: center;
                      "
                    >
                      <el-button
                        @click="$router.push(`/todos/${todo._id}/update`)"
                        type="text"
                        style="cursor: pointer; margin: 10px"
                        ><i class="bx bxs-edit"></i
                      ></el-button>
                      <a-popconfirm
                        title="Haqiqatdan ushbu eslatmani o'chirmoqchimisiz?"
                        ok-text="Ha"
                        cancel-text="Yo'q"
                        @confirm="deleteTodo(todo._id)"
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
              <tbody v-else style="position: relative">
                <tr
                  style="position: absolute; padding: 10px 0"
                  :style="[bigScreen ? 'left : 50%' : 'left : 40%']"
                >
                  <n-empty></n-empty>
                </tr>
              </tbody>
            </q-markup-table>
            <el-pagination
              style="margin-top: 1rem"
              v-model:current-page="page"
              background
              layout="prev, pager, next"
              :total="total"
            />
          </div>
          <div v-else>
            <n-empty size="huge" description="Topshiriqlar topilmadi"></n-empty>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="display: flex; justify-content: center; height: 400px">
        <FadeLoader color="#409eef" class="self-center"></FadeLoader>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { todoStore } from "../../stores/todos.store";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";
import {
  toDDMMYY,
  minusTwoDates,
  subtractDates,
} from "../utils/date.formatter";
export default {
  components: {
    FadeLoader,
  },
  data: () => ({
    page: 1,
    status: "all",
    currentTab: "all",
    smallScreen: false,
  }),
  computed: {
    ...mapState(todoStore, ["list", "total", "params"]),
    listC() {
      if (this.status === "all") {
        return this.list;
      } else if (this.status === "true") {
        return this.list.filter((todo) => todo.isMaked);
      } else {
        return this.list.filter((todo) => !todo.isMaked);
      }
    },
  },
  watch: {
    page(value) {
      this.params.page = value;
      this.getList(this.params);
    },
  },
  updated() {
    // this.getList()
  },
  methods: {
    ...mapActions(todoStore, [
      "getList",
      "deleteById",
      "updateById",
      "updateStatusById",
    ]),
    toDDMMYY,
    minusTwoDates,
    subtractDates,
    async deleteTodo(id) {
      await this.deleteById(id);
      this.getList();
    },
    change() {
      alert("");
    },
  },
  created() {
    this.getList();
    this.smallScreen = window.innerWidth < 600;
  },
};
</script>
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css");
.table-responsive {
  border: 1px solid #dee2e6;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px !important;
}
.tab {
  background: #e3e5e9;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}
.tab.active {
  background: #409eff;
  color: #fff;
}
</style>