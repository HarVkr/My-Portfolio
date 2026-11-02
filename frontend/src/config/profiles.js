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

export const RESUME_URL = `${process.env.PUBLIC_URL || ""}/Harshal_Vhatkar_APM_Resume.pdf`;

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
    badgeLabel: "THE COMPLETE STORY // EVERYTHING VIEW",
    titleLines: ["A mind without", "a genre."],
    description:
      "The complete story. The person behind the projects, ideas and ambitions.",
    heroIntro:
      "A curious mind exploring technology, creativity and everything in between.",
    metadata: [
      "PRODUCT THINKING",
      "SOFTWARE ENGINEERING",
      "CREATIVE EXPLORATION",
    ],
    visibleSections: ["ynw", "toolkit", "filmography", "offscript", "contact"],
    primaryCta: {
      label: "Explore my work",
      targetId: "your-next-watch",
      testId: "hero-cta-explore-work",
    },
    secondaryCta: {
      label: "View resume",
      action: "resume-modal",
      testId: "hero-cta-view-resume",
    },
    hasResumePrompt: false,
    portrait: null,
  },
  {
    id: "recruiter",
    order: "02",
    name: "Recruiter",
    badgeLabel: "CURATED FOR TALENT & HIRING",
    titleLines: ["Track record,", "skills & impact."],
    description:
      "Experience, education, skills, achievements and career highlights.",
    heroIntro:
      "An aspiring product professional with an engineering foundation, hands-on projects and a passion for building useful experiences.",
    metadata: [
      "PRODUCT MANAGEMENT",
      "FULL STACK ENGINEERING",
      "SYSTEMS & SCALE",
    ],
    visibleSections: ["toolkit", "filmography", "contact"],
    primaryCta: {
      label: "Explore The Toolkit",
      targetId: "the-toolkit",
      testId: "hero-cta-explore-toolkit",
    },
    secondaryCta: {
      label: "The Filmography",
      targetId: "the-filmography",
      testId: "hero-cta-filmography",
    },
    hasResumePrompt: true,
    portrait: null,
  },
  {
    id: "professional",
    order: "03",
    name: "Professional",
    badgeLabel: "FOR BUILDERS & PEERS",
    titleLines: ["Product thinking &", "engineering craft."],
    description:
      "Product thinking, engineering, projects, technology and the creative side.",
    heroIntro:
      "Exploring product thinking, software engineering and creative problem-solving through hands-on work.",
    metadata: [
      "SYSTEM ARCHITECTURE",
      "PRODUCT TEARDOWNS",
      "CREATIVE DIRECTION",
    ],
    visibleSections: ["ynw", "toolkit", "offscript", "contact"],
    primaryCta: {
      label: "Explore Case Studies",
      targetId: "your-next-watch",
      testId: "hero-cta-explore-work",
    },
    secondaryCta: {
      label: "The Toolkit & Off-Script",
      targetId: "the-toolkit",
      testId: "hero-cta-explore-toolkit",
    },
    hasResumePrompt: false,
    portrait: null,
  },
];

export const PROFILE_IDS = PROFILES.map((p) => p.id);
