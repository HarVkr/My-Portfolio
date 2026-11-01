// Bundled fallback catalog — mirrors the MongoDB seed (backend/seed_ynw.py).
// The live section fetches /api/ynw/reels and falls back to this if offline.

export const DEFAULT_REELS = [
  {
    key: "a",
    name: "THE BUILDS",
    frames: [
      {
        order: 1,
        tag: "CHAPTER 01",
        title: "THE BUILDS",
        desc: "High-impact engineering systems and full-stack architecture.",
        renderer: "title-card",
        links: {},
      },
      {
        order: 2,
        tag: "FEATURED BUILD",
        title: "REVIFY",
        desc: "B2C AI analytics trust layer with personalized feature sentiment & custom scoring.",
        renderer: "revify",
        links: { github: "https://github.com", live: "https://revify-ai.vercel.app" },
      },
      {
        order: 3,
        tag: "BUILD",
        title: "EMFLOW",
        desc: "Centralized workforce workflow, task delegation & operational ticketing.",
        renderer: "emflow",
        links: { github: "https://github.com", live: "https://emflow-app.vercel.app" },
      },
      {
        order: 4,
        tag: "BUILD",
        title: "RAG ASSISTANT",
        desc: "Enterprise hybrid retrieval-augmented generation engine with semantic reranking.",
        renderer: "rag",
        links: { github: "https://github.com" },
      },
    ],
  },
  {
    key: "b",
    name: "THE THINKING",
    frames: [
      {
        order: 1,
        tag: "CHAPTER 02",
        title: "THE THINKING",
        desc: "Product strategy teardowns, market insights and UX.",
        renderer: "title-card",
        links: {},
      },
      {
        order: 2,
        tag: "FEATURED CASE STUDY",
        title: "SWIGGY\nPRODUCT TEARDOWN",
        desc: "Hyperlocal UX friction, cart abandonment and retention loops.",
        renderer: "swiggy",
        links: {},
      },
      {
        order: 3,
        tag: "CASE STUDY",
        title: "REVIFY\nPRD",
        desc: "Product requirements, Akash persona, and weighted sentiment scoring.",
        renderer: "revify-prd",
        links: {},
      },
      {
        order: 4,
        tag: "CASE STUDY",
        title: "RAG\nEVALUATION",
        desc: "Systematic retrieval benchmarks and Ragas-framework guardrails.",
        renderer: "rag",
        links: {},
      },
    ],
  },
];
