import { useEffect, useRef, useState } from "react";
import useLanguage from "../i18n/useLanguage";
import { LANGUAGES } from "../i18n/translations";
import Flag from "./Flag";
import { ChevronDown } from "./Icons";

export default function LanguagePicker() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang);

  // close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="flex items-center justify-center gap-3" ref={ref}>
      <span className="text-sm uppercase tracking-[0.2em] text-neutral-400">{t("home.language")}:</span>
      <div className="relative">
        <button
          type="button"
          className="lang-button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Flag code={current.code} className="h-4 w-6 rounded-[2px]" />
          <span>{current.name}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <ul className="lang-menu" role="listbox">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l.code === lang}
                  className={`lang-option ${l.code === lang ? "is-active" : ""}`}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                >
                  <Flag code={l.code} className="h-4 w-6 rounded-[2px]" />
                  <span>{l.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
