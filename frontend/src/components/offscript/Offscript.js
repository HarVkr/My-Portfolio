import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DEFAULT_SCENES } from "./defaultOffScript";
import SceneArt from "./SceneArt";
import "./offscript.css";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "";
const EASE = [0.16, 1, 0.3, 1];

function Stills({ stills }) {
  return (
    <div className="os-stills" data-testid="offscript-stills">
      <span className="os-stills-label">Performance stills</span>
      <div className="os-stills-track">
        {stills.map((s, i) => (
          <figure className="os-still" key={i}>
            <div className="os-still-frame">
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                onError={(e) => {
                  const frame = e.currentTarget.closest(".os-still-frame");
                  if (frame) frame.classList.add("is-pending");
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="os-still-pending">
                STILL {String(i + 1).padStart(2, "0")} // PENDING
              </span>
            </div>
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function SceneRow({ scene, index }) {
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  return (
    <motion.article
      className={`os-scene${flip ? " os-scene--flip" : ""}`}
      data-testid={`offscript-scene-${scene.key}`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="os-scene-visual">
        <span className="os-scene-tag">{scene.tag}</span>
        <SceneArt kind={scene.key} />
      </div>
      <div className="os-scene-text">
        <h3 className="os-scene-title">{scene.title}</h3>
        <p className="os-scene-desc">{scene.text}</p>
        {scene.stills && scene.stills.length > 0 && <Stills stills={scene.stills} />}
      </div>
    </motion.article>
  );
}

export default function OffScript() {
  const [scenes, setScenes] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(BACKEND + "/api/offscript")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((d) => {
        if (!cancelled && d && Array.isArray(d.scenes) && d.scenes.length) {
          setScenes(d.scenes);
        }
      })
      .catch(() => {
        /* offline or DB empty — the bundled catalog keeps the section alive */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = scenes || DEFAULT_SCENES;

  return (
    <section id="off-script" data-testid="offscript-section" className="os-section">
      <div className="os-container">
        <header className="os-header">
          <p className="os-eyebrow">Post-credits scenes // For the ones who stayed</p>
          <h2>
            OFF-SCRIPT<span className="os-accent">.</span>
          </h2>
          <p className="os-subtitle">
            These scenes don&rsquo;t make the official reel — they play only for
            viewers who stayed through the credits. Clearly, that&rsquo;s you.
          </p>
        </header>

        <div className="os-scenes">
          {shown.map((scene, i) => (
            <SceneRow key={scene.key} scene={scene} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
