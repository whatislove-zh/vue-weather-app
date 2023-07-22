import { createI18n } from "vue-i18n";

import uk from "./uk.json";
import en from "./en.json";

const locales = { en, uk };

export default createI18n({
  locale: "uk",
  fallbackLocale: "en",
  messages: locales,
});
