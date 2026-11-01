// Bundled fallback catalog — mirrors the MongoDB seed (backend/seed_toolkit.py).

export const DEFAULT_TOOLKIT = {
  sections: [
    {
      order: 1,
      title: "FULL-STACK ENGINEERING",
      tagline: "From interface to implementation.",
      description:
        "Building end-to-end web applications, connecting intuitive user interfaces with reliable backend services.",
      columns: [
        { label: "Capabilities", items: ["Frontend development", "Backend development", "REST APIs", "API integration", "Role-based access control"] },
        { label: "Technologies & Frameworks", items: ["React.js", "Node.js", "Express.js", "Flask", "Tailwind CSS", "HTML", "CSS"] },
        { label: "Applied Work", items: ["EmFlow — Employee task management platform.", "Revify — Full-stack product-review analysis platform."] },
      ],
    },
    {
      order: 2,
      title: "GENERATIVE & AGENTIC AI SYSTEMS",
      tagline: null,
      description:
        "Building AI-powered applications and orchestrating intelligent agents to solve practical problems.",
      columns: [
        { label: "Methods & Capabilities", items: ["Retrieval Augmented Generation (RAG)", "Multi-agent orchestration", "Prompt engineering", "Agentic workflows"] },
        { label: "Technologies & Tools", items: ["Large Language Models (LLMs)", "Retrieval-Augmented Generation (RAG)", "CrewAI", "Gemini"] },
        { label: "Applied Work", items: ["Revify — Agentic review-analysis workflows.", "NovaScholar — AI-powered interactive learning platform."] },
      ],
    },
    {
      order: 3,
      title: "DATABASES & BACKEND SYSTEMS",
      tagline: "Structuring the foundation.",
      description:
        "Designing data models and backend systems that support reliable, secure and scalable applications.",
      columns: [
        { label: "Capabilities", items: ["Database schema & system design", "Relational data modelling", "Authentication and authorisation", "Data management", "Backend integration"] },
        { label: "Technologies & Platforms", items: ["PostgreSQL", "Supabase", "MongoDB", "MySQL"] },
        { label: "Applied Work", items: ["Revify — Supabase, PostgreSQL, authentication and relational data modelling.", "EmFlow — MongoDB and role-based access control."] },
      ],
    },
    {
      order: 4,
      title: "DEVELOPER TOOLS & INFRASTRUCTURE",
      tagline: "Building, testing and shipping.",
      description:
        "Working with development tools and infrastructure to streamline implementation, integration and deployment.",
      columns: [
        { label: "Capabilities", items: ["Version control", "API testing", "Containerisation", "Application deployment"] },
        { label: "Tools & Platforms", items: ["Git & GitHub", "Docker", "Postman", "Vercel", "Apify", "Visual Studio Code", "GitHub Copilot", "Cursor"] },
        { label: "Applied Work", items: ["Revify — Apify-based Amazon review acquisition and application integration.", "Multiple projects — Git-based development, API testing and deployment workflows."] },
      ],
    },
    {
      order: 5,
      title: "CREATIVE PRODUCTION",
      tagline: "Thinking beyond the screen.",
      description:
        "Combining visual storytelling, creative direction and digital production to communicate ideas and create engaging experiences.",
      columns: [
        { label: "Capabilities", items: ["Video Editing", "Visual storytelling", "Creative direction"] },
        { label: "Tools & Capabilities", items: ["Premiere Pro", "Da Vinci Resolve", "Capcut", "Figma"] },
        { label: "Applied Work", items: ["Oculus SPIT — Head of Creatives / Marketing.", "Led a five-member creative team.", "Produced 10+ fest videos and creative assets."] },
      ],
    },
  ],
  languages: ["C", "C++", "Java", "JavaScript", "Python"],
};
