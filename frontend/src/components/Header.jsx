import { Link } from "react-router-dom";
import useLanguage from "../i18n/useLanguage";

// Fixed header with one button: the hexagon logo in the middle. Its bottom tip
// hangs below the header like an arrow pointing down at the page.
export default function Header() {
  const { t } = useLanguage();
  return (
    <header className="site-header">
      <Link to="/" className="hex-home" aria-label={t("nav.home")} title={t("nav.home")}>
        <svg className="hex-tab" viewBox="0 0 100 115" aria-hidden="true">
          <polygon points="50,1 99,29 99,86 50,114 1,86 1,29" className="hex-tab-fill" />
          {/* outline only below the header line, so the tip looks like part of the header */}
          <polyline points="1,71 1,86 50,114 99,86 99,71" className="hex-tab-edge" />
        </svg>
        <span className="hex-logo">
          <img src="/logo-jc.svg" alt="Južna Crewga" width="64" height="74" />
          {/* blue version that fades in on hover: a clean orange-to-blue crossfade */}
          <img src="/logo-jc-blue.svg" alt="" aria-hidden="true" className="hex-logo-blue" width="64" height="74" />
        </span>
      </Link>
    </header>
  );
}
