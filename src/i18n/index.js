import { createI18n } from "vue-i18n";

import uk from "./uk.json";
import en from "./en.json";

const locales = { en, uk };

const localData = localStorage.getItem("language")

export default createI18n({
  locale: localData === undefined ? "en":localData,
  fallbackLocale: "en",
  messages: locales,
});
