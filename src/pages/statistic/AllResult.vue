<template>
  <div class="q-pa-md">
    <div class="bar flex justify-between items-center">
      <div class="tabs flex items-center tabs">
        <span
          @click="currentStatus = 'Passed'"
          :class="{ active: currentStatus === 'Passed' }"
          class="tab"
          >O'tganlar</span
        >
        <span
          @click="currentStatus = 'Failed'"
          :class="{ active: currentStatus === 'Failed' }"
          class="tab"
          >Yiqilganlar</span
        >
        <span
          @click="currentStatus = 'All'"
          :class="{ active: currentStatus === 'All' }"
          class="tab"
          >Hammasi</span
        >
      </div>
      <div class="right-bar">
        <a-input v-model:value="search" placeholder="Search result"></a-input>
      </div>
    </div>
    <q-markup-table style="min-height: 160px">
      <thead>
        <tr>
          <th class="text-left">
            <i
              style="display: block; text-align: center; cursor: auto"
              class="bx bx-image"
            ></i>
          </th>
          <th class="text-left">Ism-sharifi</th>
          <th class="text-right">Fan nomi</th>
          <th class="text-right">Test sav-lari soni</th>
          <th class="text-right">Testga ajr-gan vaqt</th>
          <th class="text-right">Testni ishlagan vaqti</th>
          <th class="text-right">Testga ketgan vaqt</th>
          <th class="text-right">Holat</th>
          <th class="text-right">To'g'ri sav-lar soni</th>
          <th class="text-right">Noto'g'ri sav-lar soni</th>
          <th class="text-right">Bel-magan sav-lar soni</th>
          <th class="text-right">To'g'ri bel-gan sav-lar</th>
          <th class="text-right">Noto'g'ri bel-gan sav-lar</th>
          <th class="text-right">Bel-magan sav-lar</th>
          <th class="text-right">Test bali</th>
          <th class="text-right">To'plangan bal</th>
          <th class="text-right">Foiz</th>
          <th class="text-right">Izohlar</th>
        </tr>
      </thead>
      <tbody v-if="listC.length">
        <tr v-for="(result, index) in listC" :key="index">
          <td class="text-left">
            <n-image
              style="
                width: 40px;
                height: 40px;
                border-radius: 10px;
                object-fit: cover;
              "
              v-if="result.testerImagePath"
              :src="result.testerImagePath"
            />
            <i
              style="text-align: center; display: block"
              v-else
              class="bx bx-user"
            ></i>
          </td>
          <td class="text-left">{{ result.fullName }}</td>
          <td class="text-right">{{ result.subjectName }}</td>
          <td class="text-right">{{ result.questionsCount }}</td>
          <td class="text-right">{{ result.subjectQuizTime }}</td>
          <td class="text-right">
            {{ new Date(result.workingTime).toLocaleDateString() }}
            {{ new Date(result.workingTime).toLocaleTimeString() }}
          </td>
          <td class="text-right">
            {{ parseWorkingDurationtTimeToMinute(result.workingDurationTime) }}
          </td>
          <td class="text-right">
            <span
              :class="{
                failed: result.status === 'Failed',
                passed: result.status === 'Passed',
              }"
              >{{ result.status }}</span
            >
          </td>
          <td class="text-right">{{ result.countCorrectAnswers }}</td>
          <td class="text-right">{{ result.countIncorrectAnswers }}</td>
          <td class="text-right">{{ result.countNotSelectedAnswers }}</td>
          <td
            title="To'g'ri belgilangan savollarni ko'rish"
            class="text-right cursor-pointer"
            @click="showCorrectAnswers(result.correctAnswers, 0)"
          >
            <i class="bi bi-binoculars"></i>
          </td>
          <td
            title="Noto'g'ri belgilangan savollarni ko'rish"
            class="text-right cursor-pointer"
            @click="showIncorrectAnswers(result.incorrectAnswers, 1)"
          >
            <i class="bi bi-binoculars"></i>
          </td>
          <td
            title="Belgilanmagan savollarni ko'rish"
            class="text-right cursor-pointer"
            @click="showNotSelectedAnswers(result.notSelectedAnswers, 2)"
          >
            <i class="bi bi-binoculars"></i>
          </td>
          <td class="text-right">{{ result.subjectPoint }}</td>
          <td class="text-right">{{ result.ball }}</td>
          <td class="text-right">{{ result.percentageResult }}</td>
          <td class="text-right">{{ result.comments }}</td>
        </tr>
      </tbody>
      <tbody v-else-if="loading" style="position: relative">
        <tr
          style="position: absolute; padding: 10px 0; width: 25px;"
          :style="[bigScreen ? 'left : 50%' : 'left : 40%']"
        >
          <img src="../../assets/gif/iphone-spinner.gif" alt="Loading..." style="width: 100%;">
        </tr>
      </tbody>
      <tbody v-else style="position: relative">
        <tr
          style="position: absolute; padding: 10px 0"
          :style="[bigScreen ? 'left : 50%' : 'left : 40%']"
        >
          <n-empty></n-empty>
        </tr>
      </tbody> </q-markup-table
    ><el-pagination
      v-if="list.length"
      small
      background
      style="margin-top: 1rem"
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      v-model:current-page="page"
    />
    <el-dialog v-model="isShow">
      <div v-if="items.length">
        <h4 v-if="titleCode === 0">To'g'ri belgilangan savollar</h4>
        <h4 v-if="titleCode === 1">Noto'g'ri belgilangan savollar</h4>
        <h4 v-if="titleCode === 2">Belgilanmagan savollar</h4>
        <h6 v-for="(item, index) in items" :key="index">
          <div
            style="
              border: 1px solid #e3e5e9;
              padding: 10px;
              margin: 5px 0;
              border-radius: 5px;
            "
          >
            <div class="flex items-center flex-wrap">
              <h6 style="margin-right: 5px">{{ item.number + 1 }}.</h6>
              <h6><span v-html="item.question"></span></h6>
            </div>
            <span
              :class="{
                correct: option.isTrue,
                error: !option.isTrue && option.selected,
              }"
              style="margin: 0 5px"
              v-for="(option, i) in item.options"
              :key="i"
            >
              <span v-html="option.optionLabel"></span>
            </span>
          </div>
        </h6>
      </div>
      <div v-else>
        <n-empty></n-empty>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import { subject } from "@casl/ability";
import { parseDate } from "element-plus";
import { mapActions, mapState } from "pinia";
import { resultStore } from "../../stores/references/result.store";

export default {
  data() {
    return {
      currentStatus: "Passed",
      query: "all",
      isShow: false,
      page: 1,
      limit: 10,
      items: [],
      titleCode: null,
      bigScreen: false,
      smallScreeen: false,
      search: "",
      parseDate,
    };
  },
  computed: {
    ...mapState(resultStore, ["list", "total", "loading"]),
    listC() {
      if (this.currentStatus === "Failed") {
        return this.list
          .filter((item) => item.status === "Failed")
          .filter((item) =>
            item.fullName
              .toLocaleLowerCase()
              .includes(this.search.toLocaleLowerCase())
          );
      }
      if (this.currentStatus === "Passed") {
        return this.list
          .filter((item) => item.status === "Passed")
          .filter((item) =>
            item.fullName
              .toLocaleLowerCase()
              .includes(this.search.toLocaleLowerCase())
          );
      }
      return this.list.filter((item) =>
        item.fullName
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      );
    },
  },
  watch: {
    page(val) {
      this.getList(this.query, val, this.limit);
    },
  },
  methods: {
    ...mapActions(resultStore, ["getList"]),
    showCorrectAnswers(value, titleCode) {
      this.isShow = true;
      this.items = value;
      this.titleCode = titleCode;
    },
    showIncorrectAnswers(value, titleCode) {
      this.isShow = true;
      this.items = value;
      this.titleCode = titleCode;
    },
    showNotSelectedAnswers(value, titleCode) {
      this.isShow = true;
      this.items = value;
      this.titleCode = titleCode;
    },
    modulo(num1, num2) {
      if (isNaN(num1) || isNaN(num2)) {
        return NaN;
      }

      var strResult = (num1 / num2).toString();

      var decimalPart = parseFloat(strResult.substr(strResult.indexOf(".")));

      var remainder = Math.round(decimalPart * num2);
      return remainder;
    },
    parseWorkingDurationtTimeToMinute(number) {
      if (number > 60) {
        return (
          Math.floor(number / 60) +
          " daqiqa " +
          this.modulo(number, 60) +
          " soniya"
        );
      } else {
        return number + " soniya";
      }
    },
  },
  created() {
    this.smallScreeen = window.innerWidth < 600;
    this.bigScreen = window.innerWidth > 1400;
    this.getList(this.query, this.page, this.limit);
  },
};
</script>
  <style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
.tabs {
  margin: 10px 0;
}
.tab {
  background: #c8d2e4;
  padding: 3px 5px;
  border-radius: 5px;
  color: #000;
  margin: 0 5px;
  cursor: pointer;
}
.active {
  background: rgb(70, 70, 238);
  color: #fff;
}
.passed {
  padding: 5px 10px;
  color: #fff;
  background: yellowgreen;
  border-radius: 5px;
}
.failed {
  padding: 5px 10px;
  color: #fff;
  background: red;
  border-radius: 5px;
}
i {
  font-size: 18px;
  cursor: pointer;
  color: navy;
}
.correct {
  background: yellowgreen;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
}
.error {
  background: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
}
</style>