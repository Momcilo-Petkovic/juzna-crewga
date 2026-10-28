import { useNavigate } from "react-router-dom";
import useLanguage from "../i18n/useLanguage";
import PageHeader from "../components/PageHeader";
import { services } from "../data/services";

const formatPrice = (n) => n.toLocaleString("sr-RS");

export default function Pricing() {
  const { t, pick } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="mx-auto w-full max-w-6xl px-5">
      <PageHeader title={t("pricing.title")} intro={t("pricing.intro")} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <article key={s.id} className={`price-card ${s.featured ? "is-featured sm:col-span-2 lg:col-span-4" : ""}`}>
            {s.featured && <span className="price-badge">{t("pricing.bestValue")}</span>}
            <div className={s.featured ? "flex flex-1 flex-col gap-6 md:flex-row md:items-center md:justify-between" : "flex flex-1 flex-col"}>
              <div className={s.featured ? "md:max-w-xl" : "flex-1"}>
                <h2 className="font-display text-3xl tracking-wide text-white">{pick(s.name)}</h2>
                <p className="mt-3 text-neutral-300">{pick(s.text)}</p>
              </div>
              <div className={s.featured ? "flex flex-col items-start gap-4 md:items-end" : "mt-6"}>
                <p className="price-amount">
                  {formatPrice(s.price)} <span className="text-lg text-neutral-400">{t("pricing.currency")}</span>
                </p>
                <button type="button" className="btn-primary mt-4 w-full md:w-auto" onClick={() => navigate(`/kontakt?usluga=${s.id}`)}>
                  {t("pricing.order")}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
