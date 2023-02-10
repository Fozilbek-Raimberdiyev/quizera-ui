<template>
  <div>
    <div v-show="questions?.length">
      <div class="top flex justify-between">
        <h5>Savollar ro'yxati</h5>
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
          <div class="flex items-center">
            <h6 class="q-number">{{ question?.number }}.</h6>
            <h6>{{ question.question }}</h6>
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
    </div>
    <div v-show="!questions.length">
        <h5 class="text-center">Savollar topilmadi...</h5>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { questionStore } from "../../../stores/references/questions";
export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(questionStore, ["questions", "total"]),
  },
  methods: {
    ...mapActions(questionStore, ["getQuestions"]),
  },
  mounted() {
    this.getQuestions(this.$route.params.id, 10, this.currentPage, true);
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
</style>