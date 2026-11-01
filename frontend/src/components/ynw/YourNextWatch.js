import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { createFilmExperience } from "./filmEngine";
import { DEFAULT_REELS } from "./defaultCatalog";
import "./ynw.css";
import "./caseStudies/emflow.js";
import "./caseStudies/swiggy.js";
import "./caseStudies/revifyPrd.js";
import "./caseStudies/rag.js";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "";

export default function YourNextWatch() {
  const rootRef = useRef(null);
  const cleanupRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.15 });
  const [reels, setReels] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(BACKEND + "/api/ynw/reels")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((data) => {
        if (!cancelled && data && Array.isArray(data.reels) && data.reels.length) {
          setReels(data.reels);
        }
      })
      .catch(() => {
        /* offline or DB empty — the bundled catalog keeps the section alive */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!inView || !reels || !rootRef.current) return;
    cleanupRef.current = createFilmExperience(rootRef.current, reels);
    return () => {
      if (cleanupRef.current) cleanupRef.current();
      cleanupRef.current = null;
    };
  }, [inView, reels]);

  const shown = reels || DEFAULT_REELS;

  return (
    <section
      ref={rootRef}
      className={`ynw-section${inView ? " is-inview" : ""}`}
      id="your-next-watch"
      data-testid="ynw-section"
    >
      <div className="ynw-container">
        <header className="ynw-header">
          <h2>YOUR NEXT WATCH</h2>
          <p className="ynw-subtitle">Rotate the reels to explore projects.</p>
        </header>

        <div className="ynw-reels">
          {shown.map((reel) => (
            <div
              className="ynw-reel"
              data-reel={reel.key}
              key={reel.key}
              data-testid={`ynw-reel-${reel.key}`}
            >
              <div className="ynw-viewport" data-cursor-hover>
                <div className="ynw-roll-top" />
                <div className="ynw-scene is-transitioning" />
                <div className="ynw-roll-bottom" />
              </div>

              <div className="ynw-nav">
                <button
                  type="button"
                  className="ynw-arrow"
                  data-dir="prev"
                  aria-label={`Previous frame — ${reel.name}`}
                  data-testid={`ynw-prev-${reel.key}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <div className="ynw-dots" />
                <button
                  type="button"
                  className="ynw-arrow"
                  data-dir="next"
                  aria-label={`Next frame — ${reel.name}`}
                  data-testid={`ynw-next-${reel.key}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>

              <div className="ynw-counter" data-testid={`ynw-counter-${reel.key}`}>
                <span className="ynw-counter-current">01</span> /{" "}
                <span data-reel-total>
                  {String(reel.frames.length).padStart(2, "0")}
                </span>
                <span className="ynw-counter-name">{reel.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
