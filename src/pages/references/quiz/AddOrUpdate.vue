<template>
  <div>
    <form id="#form" @submit.prevent="submit">
      <div
        class="flex justify-between items-center"
        :class="{ header: subjectId }"
      >
        <div class="flex items-center">
          <span style="margin-right: 5px">Fanni tanlang:</span>
          <el-select
            v-model="subjectId"
            class="m-2"
            placeholder="Select"
            size="default"
          >
            <el-option
              v-for="item in list"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </div>
        <div
          v-show="subjectId && subject?.isDifferent"
          v-for="(grade, index) in gradesC"
          :key="index"
        >
          <table>
            <thead>
              <tr>
                <th>Ball :</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ grade.grade }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Test bo'lishi kerak :</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ grade.count }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Kiritilgan savollar soni</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ grade.countQuestions }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="subjectId">
        <h6 style="color: #429eef;" for="question">Savolni kiriting</h6>
        <!-- <el-input
          type="textarea"
          placeholder="Savolni kiriting..."
          v-model="form.question"
          id="question"
        >
        </el-input> -->
        <div class="q-pa-md q-gutter-sm">
          <q-editor
            v-model="form.question"
            :dense="$q.screen.lt.md"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify'],
                },
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify'],
                },
              ],
              [
                'bold',
                'italic',
                'strike',
                'underline',
                'subscript',
                'superscript',
              ],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7',
                  ],
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana',
                  ],
                },
                'removeFormat',
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource'],
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          />
        </div>
        <span class="error" v-if="v$.form.question.$error"
          >Savol kiritilishi shart</span
        >
      </div>
      <div v-show="subjectId" class="flex justify-between">
        <div class="options">
          <h6 style="color: #429eef;">Variantlarni kiriting</h6>
          <div
            for="questionLabel"
            v-for="(option, index) in form.options"
            :key="index"
          >
            <label>
              <!-- <el-input
                type="textarea"
                
                class="option"
                rows="1"
                cols="100"
                :placeholder="option.placeholder"
                v-model="option.optionLabel"
                id="questionLabel"
              ></el-input> -->
              <div class="q-pa-md q-gutter-sm">
                <q-editor
                  class="option"
                  :class="{ true: option.isTrue, false: !option.isTrue }"
                  v-model="option.optionLabel"
                  :dense="$q.screen.lt.md"
                  :toolbar="[
                    [
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        list: 'only-icons',
                        options: ['left', 'center', 'right', 'justify'],
                      },
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        options: ['left', 'center', 'right', 'justify'],
                      },
                    ],
                    [
                      'bold',
                      'italic',
                      'strike',
                      'underline',
                      'subscript',
                      'superscript',
                    ],
                    ['token', 'hr', 'link', 'custom_btn'],
                    ['print', 'fullscreen'],
                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: [
                          'p',
                          'h1',
                          'h2',
                          'h3',
                          'h4',
                          'h5',
                          'h6',
                          'code',
                        ],
                      },
                      {
                        label: $q.lang.editor.fontSize,
                        icon: $q.iconSet.editor.fontSize,
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'size-1',
                          'size-2',
                          'size-3',
                          'size-4',
                          'size-5',
                          'size-6',
                          'size-7',
                        ],
                      },
                      {
                        label: $q.lang.editor.defaultFont,
                        icon: $q.iconSet.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'default_font',
                          'arial',
                          'arial_black',
                          'comic_sans',
                          'courier_new',
                          'impact',
                          'lucida_grande',
                          'times_new_roman',
                          'verdana',
                        ],
                      },
                      'removeFormat',
                    ],
                    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                    ['undo', 'redo'],
                    ['viewsource'],
                  ]"
                  :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana',
                  }"
                />
              </div>
            </label>
            <div
              v-for="error in v$.form.options.$each.$response.$errors[index]
                ?.optionLabel"
              :key="error"
              class="block"
            >
              <span v-if="error" class="error">Variant kiritilishi shart!</span>
            </div>
          </div>
        </div>
        <div class="ball-question" v-if="subject?.isDifferent">
          <p>Savol balini tanlang</p>
          <el-select
            v-model="form.ball"
            class="m-2"
            placeholder="Select"
            size="small"
          >
            <el-option
              v-for="(grade, i) in subject.grades"
              :key="i"
              :label="grade.grade"
              :value="grade.grade"
            />
          </el-select>
          <span class="error block" v-if="v$.form.ball.$error"
            >Ball kiritilishi shart</span
          >
        </div>
      </div>
      <el-button
        class="cursor-pointer"
        v-if="!$route.params.id && subjectId"
        native-type="submit"
        type="primary"
        >Saqlash</el-button
      >
      <el-button
        class="cursor-pointer"
        native-type="submit"
        type="primary"
        v-if="subjectId && form.question && $route.params.id"
      >
        Yangilash
      </el-button>
    </form>
    <div v-if="subjectId" class="list">
      <div v-show="questions?.length">
        <div class="top flex justify-between">
          <h5>Savollar ro'yxati</h5>
          <div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="5"
              v-model:current-page="currentPage"
            />
          </div>
        </div>
        <div
          class="questions"
          v-for="(question, index) in questions"
          :key="index"
        >
          <div :id="question" class="question">
            <div class="actions flex items-center">
              <div v-if="question?.ball" class="ball">{{ question?.ball }}</div>
              <el-button
                type="text"
                class="cursor-pointer"
                @click="toUpdate(question._id, question)"
              >
                <i class="bx icon bx-pencil"></i> </el-button
              ><a-popconfirm
                title="Haqiqatdan o'chirmoqchimisiz?"
                ok-text="Ha"
                class="cursor-pointer"
                cancel-text="Yo'q"
                @confirm="deleteQuestion(question._id)"
                @cancel="cancel"
              >
                <i class="bx icon bxs-trash"></i>
              </a-popconfirm>
            </div>
            <div class="flex items-center">
              <h6 class="q-number">{{ question?.number }}.</h6>
              <h6><span v-html="question.question"></span></h6>
            </div>
            <p
              class="option"
              v-for="(o, i) in question.options"
              :key="i"
              :class="{
                error: !o.isTrue,
                true: o.isTrue,
              }"
            >
              <span v-html="o.optionLabel"></span>
            </p>
          </div>
        </div>
      </div>
      <div v-show="!questions?.length">
        <h6>Savollar mavjud emas!</h6>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { subjectStore } from "../../../stores/references/subject";
import { ElMessage, ElNotification } from "element-plus";
import useVuelidate from "@vuelidate/core";
import { required, requiredIf, helpers } from "@vuelidate/validators";
import { questionStore } from "../../../stores/references/questions";
import { useToast } from "vue-toastification";
import questionsService from "../../../services/questions.service";
export default {
  data() {
    return {
      v$: useVuelidate(),
      question: "",
      isSaved: false,
      currentPage: 1,
      subjectId: "",
      questionsService,
      items: [],
      form: {
        question: "",
        isHas: false,
        ball: null,
        options: [
          {
            optionLabel: "",
            isTrue: true,
            placeholder: "Tog'ri variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
        ],
      },
      numbers: [1, 2, 3, 4, 5, 6],
      currentIndex: "",
    };
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
  validations() {
    return {
      form: {
        question: {
          required,
        },
        ball: {
          required: requiredIf(() => {
            if (this.subject?.isDifferent) {
              return true;
            } else {
              return false;
            }
          }),
        },
        options: {
          $each: helpers.forEach({
            optionLabel: {
              required,
            },
          }),
        },
      },
    };
  },
  watch: {
    subjectId() {
      this.getById(this.subjectId);
      this.getQuestions(this.subjectId, 5, this.currentPage, true);
      this.form = {
        question: "",
        isHas: false,
        ball: null,
        options: [
          {
            optionLabel: "",
            isTrue: true,
            placeholder: "Tog'ri variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
          {
            optionLabel: "",
            isTrue: false,
            placeholder: "Variantni kiriting...",
            // isSelected : false
            lastSelectNumber: 0,
          },
        ],
      };
      this.getById(this.subjectId);
    },
    currentPage() {
      this.getQuestions(this.subjectId, 5, this.currentPage, true);
    },
    isSaved() {
      this.getQuestions(this.subjectId, 5, this.currentPage, true);
      this.isSaved = false;
    },
    async "$route.params.id"(val) {
      let res = await this.getQuestionById(val);
      this.form = { ...this.question };
    },
  },
  computed: {
    ...mapState(subjectStore, ["list", "subject"]),
    ...mapState(questionStore, ["questions", "total", "question"]),
    gradesC() {
      return this.subject?.grades;
    },
  },
  methods: {
    ...mapActions(subjectStore, ["getList", "getById"]),
    ...mapActions(questionStore, [
      "addQuestion",
      "getQuestions",
      "updateQuestion",
    ]),
    ...mapActions(questionStore, { getQuestionById: "getById" }),
    generetaInput() {
      let lastIndex = this.options.length - 1;
      let value = this.options[lastIndex].optionLabel;
      let form = { ...this.form };
      form.isTrue = false;
      form.optionLabel = "";
      if (value) {
        this.options.push(form);
      } else {
        this.currentIndex = lastIndex;
        ElMessage("Avval bo'sh maydonni to'ldiring...");
      }
    },
    async submit() {
      this.v$.form.$validate();
      if (!this.$route.params.id) {
        if (!this.v$.$error) {
          let body = { ...this.form };
          body.subjectId = this.subjectId;
          try {
            let res = await this.addQuestion(body);
            this.form.options.map((el) => (el.optionLabel = ""));
            this.form.question = null;
            this.form.ball = null;
            if (res) this.isSaved = true;
            this.getById(this.subjectId);
            useToast().success(res.data.message);
          } catch (e) {
            useToast().error(e.data.message);
          }
        }
      } else {
        try {
          let res = await this.updateQuestion(this.question._id, this.form);
          this.getQuestions(
            this.subjectId,
            5,
            this.currentPage,
            false,
            this.subject
          );
          this.$router.push(`/references/quiz/${this.question._id}/update`);
          let options = [...this.form.options];
          options.forEach((option) => (option.optionLabel = ""));
          this.form = [];
          this.form.options = options;
        } catch (e) {
          useToast().error(e.data.message || "Error");
        }
      }
    },
    toUpdate(id, question) {
      this.$router.push(`/references/quiz/${id}/update`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.question = question;
    },
    async deleteQuestion(id) {
      // console.log("delete");
      try {
        let res = await this.questionsService.deleteTodo(id);
        return this.getQuestions(this.subjectId, 5, this.currentPage, true);
      } catch (e) {}
    },
  },
  mounted() {
    this.getList(10, 5, true);
    this.$emit("emit", true);
    if (this.$route.params.id) {
      this.getQuestionById(this.$route.params.id);
    }
  },
  created() {},
};
</script>
<style scoped>
.icon {
  border: 1px solid #409eff;
  margin: 0 5px;
  border-radius: 5px;
  color: #409eff;
  padding: 5px 12px;
}
.header {
  border-bottom: 1px solid #e3e5e9;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
/* input.focus:focus {
  border: 1px solid blue;
} */
.option {
  margin: 5px 0;
}
.option.true {
  border: 1px solid greenyellow;
  border-radius: 5px;
}
.option.false {
  border: 1px solid rgb(251, 31, 31);
  border-radius: 5px;
}
span.error {
  color: red;
}
.list {
  /* border: 1px solid #e3e5e9;
  padding: 10px 3px; */
  margin-top: 1rem;
}
form {
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}
.question {
  border: 1px solid #e3e5e9;
  padding: 10px 5px;
  margin: 10px 0;
  border-radius: 5px;
}
.q-number {
  display: flex;
  flex-direction: row-reverse;
}
.error {
  color: red;
}
.ball {
  border: 1px solid #409eff;
  margin: 0 5px;
  border-radius: 5px;
  color: #409eff;
  padding: 1px 15px;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 0;
  padding: 0;
}

th,
td {
  text-align: left;
  padding: 3px;
  font-weight: 500;
}

td {
  border: 1px solid #ddd;
}
</style>