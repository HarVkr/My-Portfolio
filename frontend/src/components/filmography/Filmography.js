import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { DEFAULT_CHAPTERS } from "./defaultFilmography";
import ChapterDetail from "./ChapterDetail";
import { reelSound } from "../ynw/ynwSound";
import "./filmography.css";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "";

const EASE = [0.16, 1, 0.3, 1];

function ChapterCard({ chapter, onOpen, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`Explore chapter — ${chapter.title}`}
      className="fg-card"
      data-testid={`filmography-card-${chapter.key}`}
      data-cursor-hover
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 34 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, ease: EASE, delay: index * 0.12 }}
      onClick={(e) => onOpen(e)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(e);
        }
      }}
    >
      <div className="fg-card-media" aria-hidden="true">
        <img src={chapter.image} alt="" loading="lazy" />
      </div>
      <div className="fg-card-shade" aria-hidden="true" />
      <div className="fg-card-tint" aria-hidden="true" />

      <div className="fg-card-top">
        <span className="fg-card-label">{chapter.label}</span>
        {chapter.logo && (
          <span className="fg-card-logo">
            <img src={chapter.logo} alt={chapter.logoAlt} loading="lazy" />
          </span>
        )}
      </div>

      <div className="fg-card-body">
        <span className="fg-card-rule" aria-hidden="true" />
        <h3 className="fg-card-title">{chapter.title}</h3>
        <p className="fg-card-org">{chapter.org}</p>
        <p className="fg-card-role">{chapter.role}</p>
        <p className="fg-card-duration">{chapter.duration}</p>
        <p className="fg-card-desc">{chapter.desc}</p>
        <span className="fg-card-cue">
          <span>Explore Chapter</span>
          <ArrowUpRight className="fg-card-cue-icon" aria-hidden="true" />
        </span>
      </div>
    </motion.article>
  );
}

function FinalChapter({ onContact }) {
  const reduce = useReducedMotion();
  const fade = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    whileInView: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.9, ease: EASE, delay },
  });
  return (
    <div className="fg-final" data-testid="filmography-final">
      <motion.p className="fg-final-eyebrow" {...fade(0)}>
        And now, the most Interesting part
      </motion.p>
      <motion.h3 className="fg-final-title" {...fade(0.1)}>
        THE NEXT CHAPTER
        <span className="fg-accent">?</span>
      </motion.h3>
      <motion.p className="fg-final-primary" {...fade(0.2)}>
        I&rsquo;m looking right at it.
      </motion.p>
      <motion.p className="fg-final-support" {...fade(0.3)}>
        Perhaps you&rsquo;re part of what comes next.
      </motion.p>
      <motion.button
        type="button"
        className="fg-final-link"
        {...fade(0.4)}
        onClick={onContact}
        data-testid="filmography-contact-link"
        data-cursor-hover
      >
        <span>Let&rsquo;s make something happen</span>
        <ArrowDown className="fg-final-link-icon" aria-hidden="true" />
      </motion.button>
    </div>
  );
}

export default function Filmography() {
  const rootRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.05 });
  const [chapters, setChapters] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(BACKEND + "/api/filmography")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((d) => {
        if (!cancelled && d && Array.isArray(d.chapters) && d.chapters.length) {
          setChapters(d.chapters);
        }
      })
      .catch(() => {
        /* offline or DB empty — the bundled catalog keeps the section alive */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = chapters || DEFAULT_CHAPTERS;

  const openChapter = (chapter) => (e) => {
    reelSound.ensure();
    reelSound.expand();
    const rect = e.currentTarget.getBoundingClientRect();
    setExpanded({ chapter, rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height } });
  };

  const scrollToContact = () => {
    const target = document.getElementById("contact");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={rootRef}
      id="the-filmography"
      data-testid="filmography-section"
      className={`fg-section${inView ? " is-inview" : ""}`}
    >
      <div className="fg-container">
        <header className="fg-header">
          <h2>
            THE FILMOGRAPHY<span className="fg-accent">.</span>
          </h2>
          <p className="fg-subtitle">
            A few places, people and problems that shaped the story so far.
          </p>
        </header>

        <div className="fg-cards">
          {shown.map((chapter, i) => (
            <ChapterCard
              key={chapter.key}
              chapter={chapter}
              index={i}
              onOpen={openChapter(chapter)}
            />
          ))}
        </div>
      </div>

      <FinalChapter onContact={scrollToContact} />

      {expanded && (
        <ChapterDetail
          chapter={expanded.chapter}
          originRect={expanded.rect}
          onClose={() => setExpanded(null)}
        />
      )}
    </section>
  );
}
