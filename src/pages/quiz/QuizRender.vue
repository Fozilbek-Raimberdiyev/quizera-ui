<template>
  <BaseLoading v-if="loading"></BaseLoading>
  <div v-if="!loading && questions.length">
    <div class="flex items-center justify-between">
      <h5 class="sub-name">{{ tempSubject?.name }}</h5>
      <div class="timer flex items-center" v-if="!isEnded">
        <i class="bx bx-time" style="margin-right: 5px"></i>
        <n-countdown
          :on-finish="onFinish"
          :duration="tempSubject?.time * 60 * 1000"
        ></n-countdown>
      </div>
    </div>
    <div v-if="!isEnded" class="bars" style="margin-bottom: 1rem">
      <div class="flex justify-end items-center">
        <a-popconfirm
          title="Haqiqatdan yakunlamoqchimisiz?"
          ok-text="Ha"
          cancel-text="Yo'q"
          @confirm="endTest"
          @cancel="cancel"
          class="cursor-pointer"
        >
          <span class="button">Yakunlash</span>
        </a-popconfirm>
      </div>
      <div></div>
      <div class="tabs">
        <span
          class="question-tab"
          v-for="(q, i) in questions"
          @click="currentIndex = i"
          :class="{
            active: currentIndex == i,
            checked: q.isChecked,
          }"
          :key="i"
          >{{ i + 1 }}
        </span>
      </div>
      <div style="margin-top: 1rem" class="flex justify-between items-center">
        <h6><span v-html="questions[currentIndex]?.question"></span></h6>
        <span v-if="questions[currentIndex]?.ball" class="ball"
          >{{ questions[currentIndex]?.ball }} ball</span
        >
      </div>
      <div
        class="questions flex"
        v-for="(option, index) in questions[currentIndex]?.options"
        :key="index"
        style="margin-top: 10px"
      >
        <p
          class="w-[7%] mt-[3px] py-2 flex items-center justify-center border border-solid border-[#e3e3e9] rounded-tl-md mr-[1px] rounded-bl-md"
          v-if="index === 0"
        >
          A
        </p>
        <p
          class="w-[7%] mt-[3px] py-2 flex items-center justify-center border border-solid border-[#e3e3e9] rounded-tl-md mr-[1px] rounded-bl-md"
          v-if="index === 1"
        >
          B
        </p>
        <p
          class="w-[7%] mt-[3px] py-2 flex items-center justify-center border border-solid border-[#e3e3e9] rounded-tl-md mr-[1px] rounded-bl-md"
          v-if="index === 2"
        >
          C
        </p>
        <p
          class="w-[7%] mt-[3px] py-2 flex items-center justify-center border border-solid border-[#e3e3e9] rounded-tl-md mr-[1px] rounded-bl-md"
          v-if="index === 3"
        >
          D
        </p>
        <div class="option w-[92%]">
          <input
            type="radio"
            :id="index"
            name="option"
            :value="true"
            v-model="option.selected"
            @click="currentOption = index"
            @change="selectOption(option)"
          />
          <label :for="index">
            <span v-html="option.optionLabel"></span>
          </label>
        </div>
      </div>
      <div class="checkedCount">
        {{ checkedCount }} / {{ questions.length }}
      </div>
    </div>
    <div v-else class="ended-template" ref="endedTemplate">
      <!-- <h4>Yakunlandi</h4> -->
      <div class="flex justify-between items-center">
        <span></span>
        <div
          v-if="tempSubject.isDifferent && !partNumberOfTest"
          class="result-ball"
          :class="{ passed: isPassed, failed: !isPassed }"
        >
          <h3>{{ sum }} / {{ tempSubject?.point }}</h3>
        </div>
        <div class="flex items-center" v-else-if="partNumberOfTest">
          <h3 :class="getPercent() >= 60 ? 'text-[yellowgreen]' : 'text-[red]'">
            {{ sum }} / {{ getSummBall() }}
          </h3>
          <h3
            class="ml-3 border border-solid border-[#78A8FC] py-1 px-3"
            :class="getPercent() >= 60 ? 'text-[yellowgreen]' : 'text-[red]'"
          >
            {{ Math.floor(getPercent() * 10) / 10 + "%" }}
          </h3>
        </div>
        <div v-else class="flex justify-between items-center notDifference">
          <div title="Belgilangan savollar">
            <span><i class="bi bi-ui-checks-grid"></i> : </span>
            <span class="count">
              {{ +correctAnswersCount + +inCorrectAnswersCount }}
            </span>
          </div>
          <div title="To'gri javoblar soni">
            <span><i class="bi bi-check2-circle"></i> : </span>
            <span class="count"> {{ correctAnswersCount }} </span>
          </div>
          <div title="Noto'g'ri javoblar soni">
            <span><i class="bx bx-question-mark"></i> :</span>
            <span class="count"> {{ inCorrectAnswersCount }} </span>
          </div>
          <div title="Belgilanmagan savollar soni">
            <span><i class="bx bx-checkbox"></i> : </span>
            <span class="count"> {{ notCheckedQuestionsCount }} </span>
          </div>
        </div>
      </div>
      <div class="tabs">
        <div class="t">
          <span
            class="question-tab res-tab"
            v-for="(answer, i) in answers"
            @click="currentIndex = i"
            :class="{
              active: currentIndex == i,
              not_checked: !answer?.isChecked,
              error: !answer?.isCorrectSelected,
              true: answer?.isCorrectSelected,
            }"
            :key="i"
            >{{ answer.number + 1 }}</span
          >
        </div>
      </div>
      <div style="margin-top: 1rem" class="flex justify-between items-center">
        <h6><span v-html="answers[currentIndex]?.question"></span></h6>
        <span v-if="questions[currentIndex]?.ball" class="ball"
          >{{ questions[currentIndex]?.ball }} ball</span
        >
      </div>
      <div
        class="questions"
        v-for="(option, index) in answers[currentIndex]?.options"
        :key="index"
        style="margin-top: 10px"
      >
        <div class="option flex items-center">
          <p
            class="w-[70px] py-2 flex items-center justify-center border border-solid border-[#e3e3e9] rounded-tl-sm rounded-bl-md"
            v-if="index === 0"
          >
            A
          </p>
          <p
            class="w-[70px] py-2 flex items-center justify-center border border-solid border-[#e3e3e9] rounded-tl-sm rounded-bl-md"
            v-if="index === 1"
          >
            B
          </p>
          <p
            class="w-[70px] py-2 flex items-center justify-center border border-solid border-[#e3e3e9] rounded-tl-sm rounded-bl-md"
            v-if="index === 2"
          >
            C
          </p>
          <p
            class="w-[70px] py-2 flex items-center justify-center border border-solid border-[#e3e3e9] rounded-tl-sm rounded-bl-md"
            v-if="index === 3"
          >
            D
          </p>
          <p
            :class="{
              true: option.isTrue,
              error:
                !option.isTrue &&
                option.isSelected &&
                answers[currentIndex].isChecked,
            }"
          >
            <span v-html="option.optionLabel"></span>
          </p>
        </div>
      </div>
      <div class="text-center">
        <el-button @click="tryAgain" class="cursor-pointer" type="info"
          ><i
            style="font-size: 1.2rem; margin-right: 2px"
            class="bx bx-refresh"
          ></i
          >Qayta urinish</el-button
        >
      </div>
    </div>
  </div>
  <div v-else-if="!loading && !questions.length">
    <div class="flex justify-center content-center" style="height: 300px">
      <n-empty
        description="Ushbu fanga test savollari hali kiritilmagan..."
      ></n-empty>
    </div>
    <el-dialog
      :show-close="false"
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
          @keyup.enter="checkPasswordSubject"
          show-password
        ></a-input>
        <el-button
          style="margin-left: 1px"
          type="primary"
          class="cursor-pointer"
          @click="checkPasswordSubject"
          >Kirish</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BaseLoading from "../../components/BaseLoading.vue"
import { mapActions, mapState } from "pinia";
import { questionStore } from "../../stores/references/questions";
import { subjectStore } from "../../stores/references/subject";
import subjectService from "../../services/subject.service";
export default {
  components : {BaseLoading},
  data() {
    return {
      currentIndex: 0,
      isEnded: false,
      currentOption: "",
      timer: 0,
      timeInterval: setInterval(this.timerFunc, 1),
      checkedCount: 0,
      isChange: false,
      subject: {},
      isShow: false,
      smallScreen: false,
      subjectService,
      subjectPassword: "",
      workingDurationTime: 0,
      tempSubject: {},
    };
  },
  computed: {
    ...mapState(questionStore, [
      "questions",
      "answers",
      "sum",
      "isPassed",
      "correctAnswersCount",
      "inCorrectAnswersCount",
      "notCheckedQuestionsCount",
      "loading"
    ]),
    ...mapState(subjectStore, ["partNumberOfTest", "isFromListOfTestRoute"]),
  },
  watch: {
    questions: {
      deep: true,
      handler() {
        this.countSelectedQuestions();
      },
    },
  },
  methods: {
    async onFinish() {
      setTimeout(() => {
        try {
          let questions = [...this.questions];
          questions.forEach((question, index) => {
            return (question["number"] = index);
          });
          let res = this.checkTests({
            questions,
            point: this.tempSubject?.point,
            subject: this.tempSubject,
          });
          this.isEnded = true;
          this.currentIndex = 0;
        } catch (e) {}
      }, 1000);
    },
    ...mapActions(questionStore, ["getQuestions", "checkTests"]),
    ...mapActions(subjectStore, ["getById"]),
    selectOption(option) {
      if (!this.questions[this.currentIndex].isChecked) {
        this.questions[this.currentIndex].options[this.currentOption][
          "number"
        ] = this.currentOption;
        this.questions[this.currentIndex]["isChecked"] = true;
        let timestamp = new Date().getTime();
        option["lastSelectNumber"] = timestamp;
        this.countSelectedQuestions();
      } else {
        if (confirm("Haqiqatdan variantni o'zgartirmoqchimisiz?")) {
          this.questions[this.currentIndex].options[this.currentOption][
            "number"
          ] = this.currentOption;
          this.questions[this.currentIndex]["isChecked"] = true;
          let timestamp = new Date().getTime();
          option["lastSelectNumber"] = timestamp;
          this.countSelectedQuestions();
        }
      }
      this.questions[this.currentIndex].options[this.currentOption]["number"] =
        this.currentOption;
      this.questions[this.currentIndex]["isChecked"] = true;
      let timestamp = new Date().getTime();
      option["lastSelectNumber"] = timestamp;
      this.countSelectedQuestions();
    },
    endTest() {
      setTimeout(async () => {
        let questions = [...this.questions];
        questions.forEach((question, index) => {
          return (question["number"] = index);
        });
        try {
          let res = await this.checkTests({
            questions,
            point: this.tempsubject?.point,
            workingDurationTime: this.workingDurationTime,
            subject: this.tempSubject,
          });
          this.isEnded = true;
          this.currentIndex = 0;
        } catch (e) {}
      }, 1000);
    },
    markNumberQuestion() {
      this.questions.forEach((question, index) => {
        question["number"] = index;
      });
    },
    countSelectedQuestions() {
      let counts = [];
      this.questions?.forEach((question) => {
        if (question["isChecked"]) {
          counts.push("count");
        }
      });
      return (this.checkedCount = counts.length);
    },
    async tryAgain() {
      // let res = (await subjectService.getById(this.$route.params.id)).data;
      await this.getQuestions(
        this.$route.params.id,
        "",
        "",
        "",
        this.tempSubject
      );
      setTimeout(() => {
        this.isEnded = false;
        this.currentIndex = 0;
      }, 1000);
    },
    async checkPasswordSubject() {
      try {
        let res = await subjectService.checkPasswordSubject(
          subjectStore()?.subject,
          this.subjectPassword
        );
        this.getQuestions(
          this.$route.params.id,
          "",
          "",
          "",
          subjectStore()?.subject
        );
        this.isShow = false;
      } catch (e) {
        console.log(e);
      }
    },
    getSummBall() {
      let sum = 0;
      for (const key of questionStore()?.questions) {
        sum += key?.ball;
      }
      return sum;
    },
    getPercent() {
      return (this.sum / this.getSummBall()) * 100;
    },
  },
  mounted() {
    setInterval(() => {
      this.workingDurationTime++;
    }, 1000);
  },
  beforeUnmount() {
    questionStore().$patch({
      questions: [],
      answers: [],
      correctAnswersCount: null,
      inCorrectAnswersCount: null,
      isPassed: null,
      notCheckedQuestionsCount: null,
      sum: null,
      total: null,
    });
  },
  async created() {
    this.smallScreen = window.innerWidth < 600;
    // let res = (await subjectService.getById(this.$route.params.id)).data
    //   ?.result;
    // this.subject = res;

    //agar listdan o'tilmayotgan bo'lsa, fanni backenddan olib keladi , agar listdan o'tilayotgan bo'lsa pinia joriy subject bor, bu sayt tezligi uchun muhim
    if (!this.isFromListOfTestRoute) {
      this.loading = true
      await this.getById(this.$route.params.id);
    }
    this.tempSubject = subjectStore()?.subject;
    if (!subjectStore()?.subject.isHasPassword) {
      if (this.partNumberOfTest) {
        await this.getQuestions(
          this.$route.params.id,
          "",
          "",
          "",
          subjectStore()?.subject,
          {
            isHasManyQuetionsPartInDB: true,
            partNumber: this.partNumberOfTest,
          }
        );
        this.getSummBall();
      } else {
        this.getQuestions(this.$route.params.id, "", "", "", this.tempSubject);
      }
    } else {
      if (this.isFromListOfTestRoute) {
        if (this.partNumberOfTest) {
          await this.getQuestions(
            this.$route.params.id,
            "",
            "",
            "",
            subjectStore()?.subject,
            {
              isHasManyQuetionsPartInDB: true,
              partNumber: this.partNumberOfTest,
            }
          );
          this.getSummBall();
        } else {
          this.getQuestions(
            this.$route.params.id,
            "",
            "",
            "",
            subjectStore()?.subject
          );
        }
      } else {
        this.isShow = true;
      }
    }
  },
};
</script>
<style scoped>
.tabs {
  /* width: 100%; */
  overflow-x: auto;
  background: 1px solid navy;
  height: 100px;
  padding-top: 2rem;
  /* height: 100%; */
}
.question-tab {
  border: 1px solid #e3e5e9 !important;
  cursor: pointer;
  padding: 6px 20px;
  border-radius: 8px;
  /* height: 110%; */
  overflow-x: auto;
}
.question-tab.active {
  background: rgb(241, 238, 238);
  font-weight: 700;
  border-radius: 5px;
}
.question-tab.checked {
  background: #a7a8a8;
  border-radius: 5px;
}

.tabs::-webkit-scrollbar {
  width: 10px;
}

.tabs::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.tabs::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

.option label {
  width: 100%;
  display: block;
  cursor: pointer;
  background: #f5f5f8;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}
input[type="radio"] {
  display: none;
}
input[type="radio"]:checked + label {
  /* font-weight: 600; */
  background: rgb(226, 222, 222);
}

.option p {
  padding: 10px;
}

.option p.error {
  background: red;
  color: #fff;
}
.option p.true {
  background: yellowgreen;
  color: #fff;
}
.res-tab.error {
  background: red;
  color: #fff;
}
.res-tab.true {
  background: yellowgreen;
  color: #fff;
}
.res-tab.not_checked {
  background: #fff;
  border: 1px solid #e3e5e9 !important;
  color: #000;
}
.sub-name {
  text-transform: capitalize;
}
.checkedCount {
  text-align: center;
  margin-top: 5px;
  font-weight: 600;
}
.ball {
  border: 1px solid #409eff;
  padding: 5px 10px;
  color: #409eff;
  border-radius: 5px;
}
.result-ball {
  border: 1px solid #e3e5e9;
  padding: 5px 15px;
  border-radius: 5px;
}
.result-ball.passed {
  border: 1px solid yellowgreen;
}
.result-ball.passed h3 {
  color: yellowgreen;
}
.result-ball.failed {
  border: 1px solid red;
}
.result-ball.failed h3 {
  color: red;
}
.result-ball h3 {
  margin: 0;
  padding: 0;
}
span {
  font-size: 18px;
}
.count {
  margin: 0 5px;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #e3e5e9;
  padding: 2px 10px;
  border-radius: 5px;
  color: #706f72;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.notDifference > div {
  border: 1px solid #f2f0f5;
  padding: 5px 5px;
  border-radius: 5px;
  margin: 0 2px;
}
.timer {
  font-size: 18px;
  border: 1px solid #e3e5e9;
  padding: 0 5px;
  border-radius: 10px;
}
.button {
  background: #409eef;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  margin-top: 10px;
}
</style>
