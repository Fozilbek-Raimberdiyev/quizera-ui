import { createI18n } from "vue-i18n";
import uz from "./languages/uz";
import ru from "./languages/ru";
import en from "./languages/en";
export const i18n = createI18n({
  locale: "Uz",
  fallbackLocale: "Uz",
  messages: {
    Uz: uz,
    Ru: ru,
    Gb: en,
  },
});
