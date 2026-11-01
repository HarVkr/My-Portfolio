// Central content configuration for the HARSHAL experience.
// All copy lives here so components stay reusable.

export const IDENTITY = {
  name: "HARSHAL",
  headline: "A mind without a genre.",
  roles: [
    "Aspiring Product Manager",
    "Software Engineer",
    "Creative / Video Editor",
  ],
};

export const HERO_CONTENT = {
  label: "THE FEATURED STORY",
  titleLines: ["A mind without", "a genre."],
  metadata: [
    "PRODUCT THINKING",
    "SOFTWARE ENGINEERING",
    "CREATIVE EXPLORATION",
  ],
  ctas: {
    primary: { label: "Explore my work", testId: "hero-cta-explore-work" },
    secondary: { label: "View resume", testId: "hero-cta-view-resume" },
  },
};

export const PROFILES = [
  {
    id: "meet-harshal",
    order: "01",
    name: "Meet Harshal",
    description:
      "The complete story. The person behind the projects, ideas and ambitions.",
    heroIntro:
      "A curious mind exploring technology, creativity and everything in between.",
    // TODO(portrait): drop the final portrait at public/portrait.jpg and set portrait: "/portrait.jpg"
    portrait: null,
  },
  {
    id: "recruiter",
    order: "02",
    name: "Recruiter",
    description:
      "Experience, education, skills, achievements and career highlights.",
    heroIntro:
      "An aspiring product professional with an engineering foundation, hands-on projects and a passion for building useful experiences.",
    // TODO(portrait): drop the final portrait at public/portrait.jpg and set portrait: "/portrait.jpg"
    portrait: null,
  },
  {
    id: "professional",
    order: "03",
    name: "Professional",
    description:
      "Product thinking, engineering, projects, technology and the creative side.",
    heroIntro:
      "Exploring product thinking, software engineering and creative problem-solving through hands-on work.",
    // TODO(portrait): drop the final portrait at public/portrait.jpg and set portrait: "/portrait.jpg"
    portrait: null,
  },
];

export const PROFILE_IDS = PROFILES.map((p) => p.id);
