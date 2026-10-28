// Flags drawn in SVG (Windows doesn't show flag emojis).
export default function Flag({ code, className = "" }) {
  if (code === "sr") {
    return (
      <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
        <rect width="30" height="20" fill="#fff" />
        <rect width="30" height="6.67" fill="#c6363c" />
        <rect y="6.67" width="30" height="6.67" fill="#0c4076" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <clipPath id="uk-clip">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk-clip)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
