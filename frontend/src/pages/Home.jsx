import { Link } from "react-router-dom";
import useLanguage from "../i18n/useLanguage";
import LanguagePicker from "../components/LanguagePicker";
import { ImageIcon, MailIcon, TagIcon, UsersIcon } from "../components/Icons";

const CARDS = [
  { key: "kontakt", to: "/kontakt", Icon: MailIcon },
  { key: "ekipa", to: "/ekipa", Icon: UsersIcon },
  { key: "cenovnik", to: "/cenovnik", Icon: TagIcon },
  { key: "galerija", to: "/galerija", Icon: ImageIcon },
];

export default function Home() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-5">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-jc-orange">{t("home.tagline")}</p>
        <h1 className="brand-title">Južna Crewga</h1>
        <p className="mt-2 text-neutral-400">{t("home.skills")}</p>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
        {CARDS.map(({ key, to, Icon }, i) => (
          <Link key={key} to={to} className="home-card" style={{ animationDelay: `${i * 90}ms` }}>
            <Icon className="home-card-icon" />
            <span className="home-card-title">{t(`home.cards.${key}.title`)}</span>
            <span className="home-card-text">{t(`home.cards.${key}.text`)}</span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <LanguagePicker />
      </div>
    </section>
  );
}
