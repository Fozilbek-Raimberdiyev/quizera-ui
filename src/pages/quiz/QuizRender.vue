<template>
  <div v-if="questions.length">
    <h6 class="sub-name">{{ subject?.name }}</h6>
    <div v-if="!isEnded" class="bars" style="margin-bottom: 1rem">
      <div class="flex justify-end">
        <el-button class="cursor-pointer" type="primary" @click="endTest"
          >Yakunlash</el-button
        >
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
        <h6>{{ questions[currentIndex]?.question }}</h6>
        <span v-if="questions[currentIndex]?.ball" class="ball">{{ questions[currentIndex]?.ball }} ball</span>
      </div>
      <div
        class="questions"
        v-for="(option, index) in questions[currentIndex]?.options"
        :key="index"
        style="margin-top: 10px"
      >
        <div class="option">
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
            {{ option.optionLabel }}
          </label>
        </div>
      </div>
      <div class="checkedCount">
        {{ checkedCount }} / {{ questions.length }}
      </div>
    </div>
    <div v-else>
      <!-- <h4>Yakunlandi</h4> -->
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
      <div style="margin-top: 1rem">
        <h6>{{ answers[currentIndex]?.question }}</h6>
      </div>
      <div
        class="questions"
        v-for="(option, index) in answers[currentIndex]?.options"
        :key="index"
        style="margin-top: 10px"
      >
        <div class="option">
          <p
            :class="{
              true: option.isTrue,
              error:
                !option.isTrue &&
                option.isSelected &&
                answers[currentIndex].isChecked,
            }"
          >
            {{ option.optionLabel }}
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
  <div v-else>
    <not-found></not-found>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { questionStore } from "../../stores/references/questions";
import { subjectStore } from "../../stores/references/subject";
import subjectService from '../../services/subject.service';
export default {
  data() {
    return {
      currentIndex: 0,
      isEnded: false,
      currentOption: "",
      timer: 0,
      timeInterval: setInterval(this.timerFunc, 1),
      checkedCount: 0,
      isChange: false,
    };
  },
  computed: {
    ...mapState(questionStore, ["questions", "answers"]),
    ...mapState(subjectStore, ["subject"]),
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
    timerFunc() {
      this.timer += 0.01;
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
      setTimeout(() => {
        let questions = [...this.questions];
        questions.forEach((question, index) => {
          return (question["number"] = index);
        });
        this.checkTests(questions);
        this.isEnded = true;
        this.currentIndex = 0;
      }, 1000);
    },
    markNumberQuestion() {
      this.questions.forEach((question, index) => {
        question["number"] = index;
      });
    },
    countSelectedQuestions() {
      let counts = [];
      this.questions.forEach((question) => {
        if (question["isChecked"]) {
          counts.push("count");
        }
      });
      return (this.checkedCount = counts.length);
    },
    tryAgain() {
      this.getQuestions(this.$route.params.id);
      setTimeout(() => {
        this.isEnded = false;
        this.currentIndex = 0;
      }, 1000);
    },
  },

  mounted() {
    
  },
  async created() {
  let res =  (await subjectService.getById(this.$route.params.id)).data;
  this.getQuestions(this.$route.params.id, "", "", "",res);
  },
};
</script>
<style scoped>
.tabs {
  /* width: 100%; */
  overflow-x: auto;
  background: 1px solid navy;
  padding: 5px 0;
  /* height: 100%; */
}
.question-tab {
  border: 1px solid #e3e5e9 !important;
  cursor: pointer;
  padding: 2px 15px;
  border-radius: 5px;
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
  width: 1em;
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
  font-weight: 600;
  background: rgb(226, 222, 222);
  color: #000;
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
</style>