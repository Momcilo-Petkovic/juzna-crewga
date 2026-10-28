// Backend address. Empty = same server; in development Vite forwards /api to
// http://localhost:8080 (see vite.config.js). Set VITE_API_URL to override.
export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export const STUDIO = {
  name: "Južna Crewga",
  email: "juznacrewgaofficial@gmail.com",
};
