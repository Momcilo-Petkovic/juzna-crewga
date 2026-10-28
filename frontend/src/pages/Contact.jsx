import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useLanguage from "../i18n/useLanguage";
import PageHeader from "../components/PageHeader";
import { CheckIcon, CloseIcon } from "../components/Icons";
import { API_URL, STUDIO } from "../config";
import { translations } from "../i18n/translations";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const { lang, t } = useLanguage();
  const [params] = useSearchParams();
  const service = params.get("usluga");
  const emailRef = useRef(null);

  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  // coming from "Naruči": the message is already written for the chosen service
  const [message, setMessage] = useState(() => translations[lang].contact.prefill[service] ?? "");
  const [website, setWebsite] = useState(""); // honeypot: real visitors never fill this
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const emailValid = EMAIL_RE.test(email.trim());
  const canSend = emailValid && message.trim().length > 0 && status !== "sending";

  // the message is ready, so the visitor only needs to type their email
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!canSend) return;
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), message: message.trim(), website }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setEmail("");
      setMessage("");
      setTouched(false);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto w-full max-w-2xl px-5">
      <PageHeader title={t("contact.title")} intro={t("contact.intro")} />

      <form onSubmit={submit} noValidate className="panel space-y-6 p-6 sm:p-10">
        <div>
          <label htmlFor="email" className="field-label">
            {t("contact.email")}
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder={t("contact.emailPlaceholder")}
            className={`field ${touched && !emailValid ? "is-invalid" : ""}`}
            aria-invalid={touched && !emailValid}
            aria-describedby="email-error"
          />
          {touched && !emailValid && (
            <p id="email-error" className="mt-2 text-sm text-red-400">
              {t("contact.invalidEmail")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="field-label">
            {t("contact.message")}
          </label>
          <textarea
            id="message"
            required
            rows={6}
            maxLength={5000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("contact.messagePlaceholder")}
            className="field resize-y"
          />
        </div>

        {/* honeypot field, hidden from people, catches spam bots */}
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </label>
        </div>

        <button type="submit" className="btn-primary w-full" disabled={!canSend}>
          {status === "sending" ? t("contact.sending") : t("contact.send")}
        </button>

        {status === "error" && (
          <p className="text-center text-red-400" role="alert">
            {t("contact.error")}{" "}
            <a className="underline" href={`mailto:${STUDIO.email}`}>
              {STUDIO.email}
            </a>
          </p>
        )}
      </form>

      <p className="mt-6 text-center text-neutral-400">
        {t("contact.orWrite")}{" "}
        <a className="text-jc-orange underline-offset-4 hover:text-jc-blue hover:underline" href={`mailto:${STUDIO.email}`}>
          {STUDIO.email}
        </a>
      </p>

      {status === "sent" && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={() => setStatus("idle")}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setStatus("idle")} aria-label={t("contact.close")}>
              <CloseIcon className="h-5 w-5" />
            </button>
            <div className="modal-check">
              <CheckIcon className="h-10 w-10" />
            </div>
            <p className="mt-6 text-xl leading-relaxed text-white">{t("contact.thanks")}</p>
            <button type="button" className="btn-primary mt-8" onClick={() => setStatus("idle")}>
              {t("contact.close")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
