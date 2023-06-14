<template>
  <div>
    <!-- <pre>{{ questions }}</pre> -->
    <div v-show="questions?.length" id="questions">
      <div class="top flex justify-between">
        <h5>{{ subject?.name }}</h5>
        <div>
          <!-- <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="10"
            v-model:current-page="currentPage"
          /> -->
          <!-- <a-pagination :pageSize="10" v-model:current="currentPage" :total="total" show-less-items /> -->
        </div>
      </div>
      <div
       
        class="questions"
        v-for="(question, index) in questions"
        :key="index"
      >
        <div class="question">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <h6 class="q-number">{{ question?.number }}.</h6>
              <h6 v-html="question?.question"></h6>
            </div>
            <div class="ball" v-if="question.ball">
              {{ question.ball }}
            </div>
          </div>
          <p
            class="option"
            v-for="(o, i) in question.options"
            :key="i"
            :class="{ error: !o.isTrue, true: o.isTrue }"
            v-html="o?.optionLabel"
          ></p>
        </div>
      </div>
      <div class="flex justify-center" id="downBtn">
        <el-button type="info" class="cursor-pointer flex items-center"
          ><i style="margin-right: 5px" class="bi bi-download"></i>Yuklab
          olish</el-button
        >
      </div>
    </div>
    <div v-show="!questions.length">
      <h5 class="text-center">Savollar topilmadi...</h5>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { questionStore } from "../../../stores/references/questions";
import { subjectStore } from "../../../stores/references/subject";
import questionsService from "../../../services/questions.service";
export default {
  data() {
    return {
      currentPage: 1,
      limit: 10,
    };
  },
  computed: {
    ...mapState(questionStore, ["questions", "total"]),
    ...mapState(subjectStore, ["subject"]),
  },
  watch: {
    currentPage(val) {
      this.getQuestions(
        this.subject._id || this.$route.params.id,
        this.limit,
        val,
        false,
        this.subject
      );
    },
  },
  methods: {
    ...mapActions(questionStore, ["getQuestions"]),
    ...mapActions(subjectStore, ["getById"]),
    async downloadPDF() {
      let res = await questionsService.getQuestions(
        this.$route.params.id,
        0,
        0,
        false
      );
      // const pdf = new jsPDF();
      // pdf.html(document.querySelector(".questions"),{callback : () => {
      //   // pdf.save(`${this.subject.name} savollari.pdf`)
      // }})
      let pdf = new html2pdf();
      const content = document.querySelector(".questions");
      html2pdf(content, {
        filename: `${this.subject.name} savollari.pdf`,
        margin: [0, 0, 0, 0],
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      });
    },
  },
  mounted() {
    this.getQuestions(this.$route.params.id, 10, this.currentPage, true);
    this.getById(this.$route.params.id);
    //
    const myScript = document.createElement("script");
    myScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    myScript.integrity =
      "sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==";
    myScript.crossOrigin = "anonymous";
    myScript.referrerPolicy = "no-referrer";
    document.head.appendChild(myScript);
    myScript.onload = () => {
      function generatePDF() {
        // Choose the element that your content will be rendered to.
        const element = document.getElementById("questions");
        console.log(element);
        // Choose the element and save the PDF for your user.
        html2pdf().from(element).save();
      }
      const btn = document.getElementById("downBtn");
      btn.addEventListener("click", generatePDF);
    };
    //
  },
};
</script>
<style scoped>
.option {
  border: 1px solid #eff2f7;
  padding: 5px 10px;
  border-radius: 5px;
}
.option.true {
  border-color: rgb(165, 165, 165);
}
.question {
  border-bottom: 1px solid #000;
  margin-bottom: 10px;
}
.question:last-child {
  border-color: #fff;
}
.ball {
  border: 1px solid #409eff;
  padding: 5px 10px;
  color: #409eff;
  border-radius: 5px;
}
</style>