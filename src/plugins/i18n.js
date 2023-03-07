import { createI18n } from "vue-i18n";
import uz from "./languages/uz";
import ru from "./languages/ru";
import en from "./languages/en";
export const i18n = createI18n({
  locale: "Uz",
  fallbackLocale: "Ru",
  messages: {
    Uz: uz,
    Ru: ru,
    En: en,
  },
});
