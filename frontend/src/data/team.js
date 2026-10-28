// Crew members shown on the Ekipa page. Photos live in public/images/team
// and are displayed in a 4:5 portrait frame.
export const team = [
  {
    id: "chillo",
    name: "Chillo",
    image: "/images/team/chillo.svg",
    roles: {
      sr: ["Beat making", "Muzička produkcija", "Pisanje tekstova", "Mix inženjering"],
      en: ["Beat making", "Music production", "Lyrics writing", "Mix engineering"],
    },
    bio: {
      sr: "Pravi matrice od nule, piše tekstove i miksa vokale i instrumentale dok sve ne legne kako treba.",
      en: "Builds beats from scratch, writes lyrics and mixes vocals and instrumentals until everything sits right.",
    },
  },
  {
    id: "ono",
    name: "ONO",
    image: "/images/team/ono.svg",
    roles: {
      sr: ["Beat making", "Muzička produkcija", "Pisanje tekstova", "Mix inženjering", "Mastering"],
      en: ["Beat making", "Music production", "Lyrics writing", "Mix engineering", "Mastering"],
    },
    bio: {
      sr: "Radi sve od matrice do miksa, a poslednju reč ima na masteringu: pesma zvuči glasno i čisto na svakom uređaju.",
      en: "Covers everything from beat to mix, and has the final word in mastering: tracks sound loud and clean on every device.",
    },
  },
  {
    id: "cofs",
    name: "Ćofs",
    image: "/images/team/cofs.svg",
    roles: {
      sr: ["Pisanje tekstova", "Režija spotova", "Scenario", "Video montaža", "Specijalni efekti"],
      en: ["Lyrics writing", "Music video direction", "Screenwriting", "Video editing", "Visual effects"],
    },
    bio: {
      sr: "Piše tekstove i pretvara pesme u priče: od scenarija i režije spota do montaže i specijalnih efekata.",
      en: "Writes lyrics and turns songs into stories: from script and music video direction to editing and visual effects.",
    },
  },
];
