import { useRef, useState } from "react";
import useLanguage from "../i18n/useLanguage";
import PageHeader from "../components/PageHeader";
import { ChevronLeft, ChevronRight, PlayIcon } from "../components/Icons";
import { team } from "../data/team";
import { songs, SONGS_PER_PAGE } from "../data/songs";

export default function Team() {
  const { t, pick } = useLanguage();
  const [page, setPage] = useState(0);
  const listRef = useRef(null);
  const pages = Math.max(1, Math.ceil(songs.length / SONGS_PER_PAGE));
  const shown = songs.slice(page * SONGS_PER_PAGE, (page + 1) * SONGS_PER_PAGE);

  const goTo = (p) => {
    setPage(p);
    // keep the list in view when the page changes
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-5">
      <PageHeader title={t("team.title")} intro={t("team.intro")} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {team.map((m) => (
          <article key={m.id} className="member-card">
            <div className="member-photo">
              <img src={m.image} alt={m.name} loading="lazy" />
            </div>
            <div className="p-6">
              <h2 className="font-display text-4xl tracking-wide text-white">{m.name}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pick(m.roles).map((role) => (
                  <li key={role} className="role-chip">
                    {role}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-neutral-300">{pick(m.bio)}</p>
            </div>
          </article>
        ))}
      </div>

      <div ref={listRef} className="scroll-mt-32 pt-20">
        <div className="mb-8 text-center">
          <h2 className="page-title">{t("team.productionTitle")}</h2>
          <p className="mt-2 text-neutral-400">{t("team.productionText")}</p>
        </div>

        <ol className="song-list">
          {shown.map((s, i) => (
            <li key={`${s.title}-${i}`} className="song-row">
              <span className="song-index">{String(page * SONGS_PER_PAGE + i + 1).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xl font-semibold text-white">{s.title}</p>
                <p className="truncate text-sm text-neutral-400">
                  {s.artist}
                  {s.credits && <span className="text-neutral-500"> · prod. {s.credits}</span>}
                </p>
              </div>
              <span className="hidden text-neutral-500 sm:block">{s.year}</span>
              <a className="song-play" href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${t("team.listen")}: ${s.title}`}>
                <PlayIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{t("team.listen")}</span>
              </a>
            </li>
          ))}
        </ol>

        {pages > 1 && (
          <nav className="mt-6 flex items-center justify-center gap-2" aria-label={t("team.page")}>
            <button type="button" className="page-btn" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label={t("team.prev")}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: pages }, (_, p) => (
              <button
                key={p}
                type="button"
                className={`page-btn ${p === page ? "is-active" : ""}`}
                onClick={() => goTo(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p + 1}
              </button>
            ))}
            <button type="button" className="page-btn" onClick={() => goTo(page + 1)} disabled={page === pages - 1} aria-label={t("team.next")}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
