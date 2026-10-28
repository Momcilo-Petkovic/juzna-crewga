// Prices in RSD. `id` is also used in the contact link (/kontakt?usluga=paket)
// and to pick the pre-filled message (translations.js -> contact.prefill).
export const services = [
  {
    id: "tekstopisanje",
    price: 10000,
    name: { sr: "Tekstopisanje", en: "Lyrics writing" },
    text: {
      sr: "Tekst po meri tvog stila i teme, spreman za snimanje.",
      en: "Lyrics tailored to your style and topic, ready to record.",
    },
  },
  {
    id: "snimanje",
    price: 3000,
    name: { sr: "Snimanje", en: "Recording" },
    text: {
      sr: "Snimanje vokala u studiju, uz pomoć oko izvedbe.",
      en: "Vocal recording in the studio, with help on your performance.",
    },
  },
  {
    id: "matrica",
    price: 10000,
    name: { sr: "Kreacija matrice", en: "Beat production" },
    text: {
      sr: "Originalna matrica napravljena od nule, samo za tebe.",
      en: "An original beat made from scratch, just for you.",
    },
  },
  {
    id: "mix",
    price: 10000,
    name: { sr: "Mix i Master usluge", en: "Mix & Master" },
    text: {
      sr: "Čist, jasan i glasan zvuk, spreman za YouTube, Spotify i radio.",
      en: "Clean, clear and loud sound, ready for YouTube, Spotify and radio.",
    },
  },
  {
    id: "paket",
    price: 15000,
    featured: true,
    name: { sr: "Kompletan paket", en: "Complete package" },
    text: {
      sr: "Cela pesma od nule: tekst, matrica, snimanje, mix i master. Imaš samo tekst? Mi radimo sve ostalo.",
      en: "A whole song from scratch: lyrics, beat, recording, mix and master. Only have lyrics? We do the rest.",
    },
  },
];
