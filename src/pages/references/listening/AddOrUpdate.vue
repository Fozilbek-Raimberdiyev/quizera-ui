<template>
  <div class="wrapper">
    <!-- <pre>{{ form }}</pre> -->
    <form ref="formEl" @submit.prevent="submit">
      <div :class="[smallScreen ? 'block' : 'flex  box items-start']">
        <label for="name">
          <span class="title"
            >Sinov nomini kiriting<i class="bx bxs-star"></i
          ></span>
          <a-input
            v-model:value="form.name"
            name="name"
            :value="form.name"
            placeholder="Fan nomini kiriting..."
            style="position: relative"
          >
            <template #prefix>
              <CheckOutlined v-if="!v$.form.name.$error" />
              <a-tooltip v-else title="Extra information">
                <info-circle-outlined style="color: red" />
              </a-tooltip>
            </template>
          </a-input>
          <span style="color: red" v-if="v$.form.name.$error"
            >Maydon to'ldirilishi shart...</span
          >
        </label>
        <label class="components-input-demo-presuffix" for="time">
          <span class="title"
            >Sinovga ajratiladigan daqiqani kiriting<i class="bx bxs-star"></i
          ></span>
          <a-input-number
            name="time"
            :value="form.time"
            placeholder="Ajratiladigan vaqtni kiriting(daqiqa hisobida)"
            v-model:value="form.time"
            :controls="false"
            style="width: 100%"
            :min="0"
            :max="60"
          >
            <template #addonBefore>
              <CheckOutlined v-if="!v$.form.time.$error" />
              <a-tooltip v-else title="Extra information">
                <info-circle-outlined style="color: red" />
              </a-tooltip>
            </template>
          </a-input-number>
          <span style="color: red" v-if="v$.form.time.$error"
            >Maydon to'ldirilishi shart...</span
          >
        </label>
        <label class="flex items-center justify-between">
          <div>
            <span class="title">Sinov ishtirokchilarini tanlang</span>
            <n-select
              v-model:value="form.members"
              multiple
              name="members"
              :value="form.members"
              filterable
              placeholder="Search users"
              :options="usersList"
              :loading="loading"
              clearable
              :style="{
                'width: 225px': !smallScreen,
                'width : 200px': smallScreen,
              }"
              remote
              :disabled="form.isForAll"
              :clear-filter-after-select="false"
              @search="remoteMethod"
            />
          </div>
          <el-checkbox
            v-model="form.isForAll"
            name="isForAll"
            title="Hamma uchun belgilash"
            :value="form.isForAll"
          ></el-checkbox>
        </label>
        <label>
          <span class="title">Matnni kiriting<i class="bx bxs-star"></i></span>
          <a-textarea
            placeholder="Sinov matnini kiriting"
            :auto-size="{ minRows: 2, maxRows: 40 }"
            @change="changeText"
            v-model:value="form.text"
            show-count
            :maxlength="5000"
          >
            <template #prefix>
              <CheckOutlined v-if="!v$.form.text.$anyDirty" />
              <a-tooltip v-else title="Extra information">
                <info-circle-outlined style="color: red" />
              </a-tooltip> </template
          ></a-textarea>
          <span style="color: red" v-if="v$.form.text.required.$invalid"
            >Maydon to'ldirilishi shart...</span
          >
          <span style="color: red" v-if="v$.form.text.maxLength.$invalid"
            >{{ v$.form.text.minLength.$params.max }} tadan ortiq belgi kiritsh
            mumkin emas...</span
          >
          <span style="color: red" v-if="v$.form.text.minLength.$invalid">
            {{ v$.form.text.minLength.$params.min }} tadan kam belgi kiritish
            mumkin emas</span
          >
        </label>
        <label v-if="form.textArray.length && isStartedFill">
          <span class="title">Matndagi so'zlar ro'yhati</span>
          <a-tag
            @close="closeTag(index)"
            v-for="(text, index) in form.textArray"
            :key="index"
            closable
            >{{ text.label }}</a-tag
          >
        </label>
        <label v-if="isStartedFill && form.textString">
          <span class="title">Sinov matni</span>
          <div style="overflow-x: auto">
            {{ form.textString }}
          </div>
        </label>
        <label>
          <span class="title">Audioni tanlang<i class="bx bxs-star"></i></span>
          <input
            type="file"
            name="audio"
            accept="audio/mpeg, audio/wav, audio/ogg, audio/midi, audio/webm"
            @change="changeFile"
            id=""
          />
          <div v-if="fileSelected && $route.params.id">
            <span>Fayl tanlangan</span>
            <vue-plyr>
              <audio controls crossorigin playsinline>
                <source :src="form.audioPath" type="audio/mpeg" />
              </audio>
            </vue-plyr>
          </div>
          <span style="color: red; display: block" v-if="!fileSelected"
            >Fayl tanlanishi shart...</span
          >
          <a-modal
            v-model:visible="isNoAccesFileSelected"
            title="Ruxsat etilgan audiolar"
            @ok="isNoAccesFileSelected = false"
          >
            <span>Ushbu audio turlaridan birini tanlang</span>
            <ul class="lists">
              <li><img src="../../../assets/image/mp3.png" alt="" /> mp3</li>
              <li><img src="../../../assets/image/wav.png" alt="" /> wav</li>
              <li><img src="../../../assets/image/ogg.png" alt="" /> ogg</li>
              <li><img src="../../../assets/image/midi.png" alt="" /> midi</li>
              <li><img src="../../../assets/image/webm.png" alt="" /> webm</li>
            </ul>
          </a-modal>
        </label>
      </div>
      <el-button
        v-if="$route.params.id"
        type="primary"
        style="margin-top: 5px"
        class="cursor-pointer"
        native-type="submit"
        :loading="isLoadingSubmit"
      >
        Yangilash
      </el-button>
      <el-button
        v-else
        type="primary"
        style="margin-top: 5px"
        class="cursor-pointer"
        native-type="submit"
        :loading="isLoadingSubmit"
      >
        Kiritish
      </el-button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUpdated } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { maxLength, minLength, required } from "@vuelidate/validators";
import { userStore } from "../../../stores/management/user.store";
import { listeningQuizStore } from "../../../stores/references/listeningQuiz.store";
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons-vue";

// Emits
const emit = defineEmits(["created"]);

// Router
const route = useRoute();
const router = useRouter();

// Stores
const userStoreInstance = userStore();
const listeningQuizStoreInstance = listeningQuizStore();

// Store state
const { users, user } = storeToRefs(userStoreInstance);
const { listeningQuiz } = storeToRefs(listeningQuizStoreInstance);
const { getAllUsers } = userStoreInstance;
const { addQuiz, getById, getList, updateQuiz } = listeningQuizStoreInstance;

// Refs
const formEl = ref(null);
const isNoAccesFileSelected = ref(false);
const isIncorrectFile = ref(false);
const isDefined = ref(false);
const usersList = ref([]);
const isStartedFill = ref(false);
const fileSelected = ref(false);
const smallScreen = ref(false);
const isLoadingSubmit = ref(false);
const loading = ref(false);

// Reactive form data
const form = reactive({
  text: "",
  textArray: [],
  textString: "",
  finalyTextArray: [],
  name: "",
  time: "",
  isStarted: false,
  members: [],
  isForAll: false,
});

// Validation rules
const validationRules = computed(() => ({
  form: {
    name: {
      required,
    },
    time: {
      required,
    },
    textArray: {
      required,
    },
    text: {
      required,
      maxLength: maxLength(5000),
      minLength: minLength(500),
    },
  },
}));

// Vuelidate
const v$ = useVuelidate(validationRules, { form });

// Watchers
watch(
  () => form.quizCount,
  (val) => {
    if (val) {
      isDefined.value = true;
      return;
    }
    isDefined.value = false;
  }
);

watch(
  () => route.params.id,
  (val) => {
    if (val) {
      setFormData(val);
    } else {
      Object.assign(form, {
        name: "",
        time: "",
        quizCount: "",
      });
    }
  }
);

watch(
  () => form.isForAll,
  (value) => {
    if (route.params.id) {
      let members = [...(listeningQuiz.value?.members || form.members)];
      if (value) {
        form.members = [];
      } else {
        form.members = [...members];
      }
    }
  }
);

// Audio file ref
const audioFile = ref(null);

// Methods
const submit = async (e) => {
  try {
    if (isIncorrectFile.value) {
      isNoAccesFileSelected.value = true;
      return 0;
    }

    // Audio faylni olish - avval audioFile.value dan, keyin form elementidan
    let selectedAudioFile = audioFile.value;
    if (!selectedAudioFile) {
      const audioFileInput = e.target.querySelector(
        'input[type="file"][name="audio"]'
      );
      selectedAudioFile = audioFileInput?.files[0];
    }

    if (!selectedAudioFile && !route.params.id) {
      console.error("Audio file not selected");
      return;
    }

    form.authorFullName = user.value.firstName + " " + user.value.lastName;
    await v$.value.$validate();

    if (!route.params.id) {
      if (!v$.value.$error) {
        let formData = { ...form };
        formData.textString = undefined;
        formData.finalyTextArray = undefined;
        formData.text = formData.textArray.map((text) => text.label).join(" ");
        formData["authorPathImage"] = user.value.pathImage;
        let members = [...formData.members];
        members = members.map((member) => {
          return {
            value: member,
            label: member,
          };
        });
        formData.members = members;
        formData.fileSelected = undefined;
        formData.authorId = user.value._id;
        let formDataToSend = new FormData();
        if (selectedAudioFile) {
          formDataToSend.append("audio", selectedAudioFile);
        }
        formDataToSend.append("form", JSON.stringify(formData));
        isLoadingSubmit.value = true;
        let res = await addQuiz(formDataToSend);
        isLoadingSubmit.value = false;
        emit("created", res);
        router.push("/references/listening");
        getList(10, 5, true);
      }
    } else {
      if (!v$.value.$error) {
        let formData = { ...form };
        let quizID = formData._id;
        formData._id = undefined;
        formData.textString = undefined;
        formData.finalyTextArray = undefined;
        formData.text = formData.textArray.map((text) => text.label).join(" ");
        formData["authorPathImage"] = user.value.pathImage;
        let members = [...formData.members];
        members = members.map((member) => {
          return {
            value: member,
            label: member,
          };
        });
        formData.members = members;
        formData.fileSelected = undefined;
        formData.authorId = user.value._id;
        formData.__v = undefined;

        let formDataToSend = new FormData();
        if (selectedAudioFile) {
          formDataToSend.append("audio", selectedAudioFile);
        }
        formDataToSend.append("form", JSON.stringify(formData));
        isLoadingSubmit.value = true;
        let res = await updateQuiz(formDataToSend, quizID);
        isLoadingSubmit.value = false;
        router.push("/references/listening");
        getList(10, 1, true);
      }
    }
  } catch (error) {
    isLoadingSubmit.value = false;
    console.error("Error submitting form:", error);
  }
};

const setFormData = async (val) => {
  await getById(val);
  let formData = { ...listeningQuiz.value };
  formData.members = formData.members.map((member) => {
    return member.value;
  });
  Object.assign(form, formData);
  let textArray = [];
  form.textString = [...form.textArray].filter((text, index) => {
    if (text.isVisible) {
      textArray[index] = text.label;
    } else {
      textArray[index] = "________";
    }
  });
  form.textString = textArray.join(" ");
};

const remoteMethod = (query) => {
  if (query) {
    usersList.value = users.value.filter((user) => {
      return user.email.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });
    usersList.value = usersList.value.map((user) => {
      return {
        value: user.email,
        label: user.email,
      };
    });
  }
};

const changeText = (e) => {
  isStartedFill.value = true;
  form.textString = "";
  form.textArray = [];
  form.finalyTextArray = [];
  let array = e.target.value.trim().split(" ");
  array = array.filter((el) => el);
  form.textArray = array.map((el) => {
    return {
      label: el,
      isVisible: true,
      value: "",
      ball : 1
    };
  });
};

const closeTag = (index) => {
  form.textArray[index].isVisible = false;
  form.textString = form.textArray.filter((text, index) => {
    if (text.isVisible) {
      form.finalyTextArray[index] = text.label;
    } else {
      form.finalyTextArray[index] = "________";
    }
  });
  form.textString = form.finalyTextArray.join(" ");
};

const changeFile = (e) => {
  const file = e.target.files[0];

  if (!file) {
    fileSelected.value = false;
    audioFile.value = null;
    return;
  }

  let types = [
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/midi",
    "audio/webm",
  ];

  if (!types.some((type) => type === file.type)) {
    isNoAccesFileSelected.value = true;
    isIncorrectFile.value = true;
    fileSelected.value = false;
    audioFile.value = null;
  } else {
    isIncorrectFile.value = false;
    fileSelected.value = true;
    audioFile.value = file;
  }
};

// Lifecycle hooks
onMounted(() => {
  if (route.params.id) {
    isStartedFill.value = true;
  }
  getAllUsers();
  if (route.params.id) {
    setFormData(route.params.id);
  }
  smallScreen.value = window.innerWidth < 600;
});

onUpdated(() => {
  if (route.params.id) {
    if (form.audioPath) {
      fileSelected.value = true;
    } else {
      fileSelected.value = false;
    }
  }
});

// Route guards
onBeforeRouteLeave(() => {
  listeningQuizStoreInstance.$patch({ list: [], total: null });
});
</script>

<style scoped lang="scss">
input:active {
  border: 1px solid #409eef !important;
}
.wrapper {
  border-bottom: 1px solid #e3e5e9;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
form label {
  flex-basis: 25%;
  margin: 0.5rem 1rem;
  max-height: 500px;
  overflow-y: auto;
  // min-height: 60px;
}
b {
  display: block;
}
.error {
  color: red;
}
.minute:valid {
  border: 1px solid green;
}
.box > label {
  flex-basis: 30%;
}
.title {
  // font-size: 17px;
  display: block;
  // font-weight: 600;
}
.bxs-star {
  display: inline-block;
  color: red;
  font-size: 10px;
  margin-left: 2px;
}
.lists {
  margin: 0;
  padding: 0 5px;
}
.lists img {
  width: 22px;
}
.lists li {
  list-style: none;
  margin: 0;
}
</style>
