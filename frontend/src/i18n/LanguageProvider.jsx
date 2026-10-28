import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./languageContext";
import { LANGUAGES, translations } from "./translations";

const STORAGE_KEY = "jc-language";

function initialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.some((l) => l.code === saved)) return saved;
  } catch {
    // storage unavailable: fall back to Serbian
  }
  return "sr";
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLanguage);

  const setLang = useCallback((code) => {
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // storage unavailable: the choice just isn't remembered
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang];
    // t("contact.title") -> text in the current language
    const t = (path) => path.split(".").reduce((node, key) => (node ? node[key] : undefined), dict) ?? path;
    // pick({ sr: "...", en: "..." }) -> value in the current language
    const pick = (field) => (field && typeof field === "object" ? field[lang] ?? field.sr : field);
    return { lang, setLang, t, pick };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
