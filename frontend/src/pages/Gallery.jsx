import { useCallback, useEffect, useRef, useState } from "react";
import useLanguage from "../i18n/useLanguage";
import PageHeader from "../components/PageHeader";
import { ChevronLeft, ChevronRight, CloseIcon } from "../components/Icons";
import { gallery } from "../data/gallery";

export default function Gallery() {
  const { t, pick } = useLanguage();
  const [open, setOpen] = useState(-1); // index of the image in the viewer, -1 = closed
  const touchX = useRef(null);
  const count = gallery.length;

  const close = useCallback(() => setOpen(-1), []);
  const prev = useCallback(() => setOpen((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setOpen((i) => (i + 1) % count), [count]);

  // keyboard: arrows and Escape; and no page scrolling behind the viewer
  useEffect(() => {
    if (open < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const item = open >= 0 ? gallery[open] : null;

  return (
    <section className="mx-auto w-full max-w-6xl px-5">
      <PageHeader title={t("gallery.title")} intro={t("gallery.intro")} />

      <div className="gallery-grid">
        {gallery.map((g, i) => (
          <button key={g.src} type="button" className="gallery-item" onClick={() => setOpen(i)}>
            <img src={g.src} alt={pick(g.caption)} loading="lazy" />
            <span className="gallery-caption">{pick(g.caption)}</span>
          </button>
        ))}
      </div>

      {item && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
            touchX.current = null;
          }}
        >
          <button type="button" className="lightbox-btn right-4 top-4" onClick={close} aria-label={t("gallery.close")}>
            <CloseIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="lightbox-btn left-3 top-1/2 -translate-y-1/2 sm:left-6"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label={t("gallery.prev")}
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img key={item.src} src={item.src} alt={pick(item.caption)} className="lightbox-img" />
            <figcaption className="mt-4 text-center text-neutral-300">
              {pick(item.caption)} <span className="ml-2 text-neutral-500">{open + 1} / {count}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-btn right-3 top-1/2 -translate-y-1/2 sm:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={t("gallery.next")}
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </section>
  );
}
