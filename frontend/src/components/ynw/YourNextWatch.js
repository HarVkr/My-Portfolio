import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { createFilmExperience } from "./filmEngine";
import { reelSound } from "./ynwSound";
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
  const [soundOn, setSoundOn] = useState(() => reelSound.isEnabled());

  const toggleSound = () => {
    const next = reelSound.setEnabled(!soundOn);
    setSoundOn(next);
    try {
      window.dispatchEvent(new CustomEvent("ynw-sound-changed", { detail: { on: next } }));
    } catch (e) {
      /* older browsers — the chip still works, just no cross-sync */
    }
    if (next) reelSound.blip();
  };

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
    if (!inView || !rootRef.current) return;
    cleanupRef.current = createFilmExperience(
      rootRef.current,
      reels || DEFAULT_REELS,
    );
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
          <h2>
            YOUR NEXT WATCH<span className="ynw-accent">.</span>
          </h2>
          <p className="ynw-subtitle">Rotate the reels to explore projects.</p>
          <button
            type="button"
            className={`ynw-sound-chip${soundOn ? " is-on" : ""}`}
            data-testid="ynw-sound-toggle"
            data-cursor-hover
            aria-pressed={soundOn}
            onClick={toggleSound}
          >
            {soundOn ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
            )}
            <span>Sound {soundOn ? "On" : "Off"}</span>
          </button>
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
                <div className="ynw-scene is-transitioning" />
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
