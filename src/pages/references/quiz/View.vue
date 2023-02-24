<template>
  <div>
    <!-- <pre>{{ questions }}</pre> -->
    <div v-show="questions?.length">
      <div class="top flex justify-between">
        <h5>{{ subject?.name }}</h5>
        <div>
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="10"
            v-model:current-page="currentPage"
          />
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
              <h6>{{ question.question }}</h6>
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
          >
            {{ o.optionLabel }}
          </p>
        </div>
      </div>
      <div class="flex justify-center">
        <el-button
          type="info"
          class="cursor-pointer flex items-center"
          @click="downloadPDF"
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
      let pdf = new html2pdf()
      const content = document.querySelector(".questions");
      html2pdf(content, {
        filename: `${this.subject.name} savollari.pdf`,
        margin: [0, 0, 0, 0],
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      });
    },
    convertHTMLToPDF() {
      const { jsPDF } = window.jspdf;

      var doc = new jsPDF('l', 'mm', [1200, 1810]);
      var pdfjs = document.querySelector('#html-template');

      doc.html(pdfjs, {
          callback: function(doc) {
              doc.save("output.pdf");
          },
          x: 10,
          y: 10
      });

      doc.output('dataurlnewwindow');
  }
  },
  mounted() {
    this.getQuestions(this.$route.params.id, 10, this.currentPage, true);
    this.getById(this.$route.params.id);
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