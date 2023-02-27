<template>
    <div class="q-pa-md">
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
      <q-markup-table style="min-height: 160px;">
        <thead>
          <tr>
            <th class="text-left">Ism-sharifi</th>
            <th class="text-right">Fan nomi</th>
            <th class="text-right">Test savollari soni</th>
            <th class="text-right">Testga ajratilgan vaqt</th>
            <th class="text-right">Testni ishlagan vaqti</th>
            <th class="text-right">Testga ketgan vaqt</th>
            <th class="text-right">Holat</th>
            <th class="text-right">To'g'ri savollar soni</th>
            <th class="text-right">Noto'g'ri savollar soni</th>
            <th class="text-right">Belgilanmagan savollar savollar soni</th>
            <th class="text-right">To'g'ri belgilangan savollar</th>
            <th class="text-right">Noto'g'ri belgilangan savollar</th>
            <th class="text-right">Belgilanmagan savollar</th>
            <th class="text-right">Test bali</th>
            <th class="text-right">Testdan olingan bal</th>
            <th class="text-right">Foiz</th>
            <th class="text-right">Izohlar</th>
          </tr>
        </thead>
        <tbody v-if="listC.length">
          <tr v-for="(result, index) in listC" :key="index">
            <td class="text-left">{{ result.fullName }}</td>
            <td class="text-right">{{ result.subjectName }}</td>
            <td class="text-right">{{ result.questionsCount }}</td>
            <td class="text-right">{{ result.subjectQuizTime }}</td>
            <td class="text-right">{{ result.workingTime }}</td>
            <td class="text-right">{{ result.workingDurationTime }}</td>
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
              class="text-right cursor-pointer"
              @click="showCorrectAnswers(result.correctAnswers, 0)"
            >
              <i class="bi bi-binoculars"></i>
            </td>
            <td
              class="text-right cursor-pointer"
              @click="showIncorrectAnswers(result.incorrectAnswers, 1)"
            >
              <i class="bi bi-binoculars"></i>
            </td>
            <td
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
        <tbody v-else style="position: relative;">
          <tr style="position: absolute; left: 40%; padding: 10px 0;">
              <n-empty></n-empty>
          </tr>
        </tbody>
      </q-markup-table>
      <el-dialog v-model="isShow">
        <div v-if="items.length">
          <h5 v-if="titleCode === 0">To'g'ri belgilangan savollar</h5>
          <h5 v-if="titleCode === 1">Noto'g'ri belgilangan savollar</h5>
          <h5 v-if="titleCode === 2">Belgilanmagan savollar</h5>
          <div v-for="(item, index) in items" :key="index">
            {{ item.question }}
            <span v-for="(option, i) in item.options" :key="i">
              {{ option.optionLabel }}
            </span>
          </div>
        </div>
        <div v-else>
          <n-empty></n-empty>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import { subject } from "@casl/ability";
  import { mapActions, mapState } from "pinia";
  import { resultStore } from "../../stores/references/result.store";
  
  export default {
    data() {
      return {
        currentStatus: "Passed",
        query: "all",
        isShow: false,
        items: [],
        titleCode: null,
      };
    },
    computed: {
      ...mapState(resultStore, ["list"]),
      listC() {
          if(this.currentStatus==='Failed') {
              return this.list.filter(item => item.status==='Failed')
          }
          if(this.currentStatus==='Passed') {
              return this.list.filter(item => item.status==='Passed')
          }
          return this.list
      }
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
    },
    created() {
      this.getList(this.query);
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
  </style>