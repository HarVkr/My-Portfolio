import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, Power } from "lucide-react";
import CameraArt from "./CameraArt";
import { DEFAULT_TOOLKIT } from "./defaultToolkit";
import { toolIcon } from "./toolIcons";
import { reelSound } from "../ynw/ynwSound";
import "./toolkit.css";

const BACKEND = process.env.REACT_APP_BACKEND_URL || "";

function Perfs() {
  return (
    <div className="tk-perfs" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

// Repeat the tool list so half the track always covers the visible strip —
// keeps the translateX(-50%) loop seamless even for short lists.
const STRIP_HALF_TARGET_PX = 1200;
function loopedStrip(items) {
  const oneCopyWidth = items.reduce((w, t) => w + t.length * 10 + 54, 0);
  const copies = Math.max(2, 2 * Math.ceil(STRIP_HALF_TARGET_PX / oneCopyWidth));
  return Array.from({ length: copies }, () => items).flat();
}

export default function Toolkit() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const sheetRef = useRef(null);
  const inView = useInView(rootRef, { once: true, amount: 0.12 });
  const reduce = useReducedMotion();
  const [data, setData] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(BACKEND + "/api/toolkit")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("bad status"))))
      .then((d) => {
        if (!cancelled && d && Array.isArray(d.sections) && d.sections.length) {
          setData(d);
        }
      })
      .catch(() => {
        /* offline or DB empty — the bundled catalog keeps the section alive */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toolkit = data || DEFAULT_TOOLKIT;
  const expandedSection = expanded
    ? toolkit.sections.find((s) => String(s.order) === String(expanded))
    : null;

  // ── measured light fan ──
  // The beam leaves the lens already wide: the upper edge climbs out of the
  // section toward Your Next Watch, the lower edge dives toward Filmography.
  // The contact sheet sits inside the throw. Recomputed on resize and
  // whenever the sheet's layout changes (power on/off, expand/collapse).
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const update = () => {
      const sheet = sheetRef.current;
      const svg = stage.querySelector(".tk-camera-svg");
      if (!sheet || !svg) return;
      const s = stage.getBoundingClientRect();
      const c = svg.getBoundingClientRect();
      const lensX = c.left - s.left + c.width * (267 / 320);
      const lensY = c.top - s.top + c.height * (162 / 348);
      const ax = lensX - 34;

      // One continuous light fan: the beam leaves the lens already wide —
      // the upper edge climbs out of the section toward Your Next Watch,
      // the lower edge dives toward Filmography. The contact sheet simply
      // sits inside the throw. Same angles everywhere, so the in-stage
      // layers and the travelling wedge read as a single cone.
      const fan = (up, down, grow) => {
        const far = s.width + 40;
        const yUp = lensY - (far - ax) * up;
        const yLow = lensY + (far - ax) * down;
        return (
          "polygon(" +
          ax + "px " + lensY + "px, " +
          far + "px " + (yUp - grow) + "px, " +
          far + "px " + (yLow + grow) + "px)"
        );
      };

      // Lift only the upper edge so the cone clears the sheet's upper-left
      // corner while retaining the lens origin and the physical lower edge.
      stage.style.setProperty("--beam-pool-poly", fan(0.72, 1.05, 26));
      stage.style.setProperty("--beam-veil-poly", fan(0.65, 1.12, 44));

      // the travelling wedge: measured against the section (it spans
      // 1600px above and 2200px below the section box) so the exact same
      // angles continue past the stage edges — behind the other sections
      const section = rootRef.current;
      const escape = section && section.querySelector(".tk-beam--escape");
      if (section && escape) {
        const sec = section.getBoundingClientRect();
        const eApexY = lensY + (s.top - sec.top) + 1600;
        const eFar = sec.width + 60;
        const eYUp = eApexY - (eFar - ax) * 0.72;
        const eYLow = eApexY + (eFar - ax) * 1.05;
        escape.style.setProperty(
          "--beam-escape-poly",
          "polygon(" + ax + "px " + eApexY + "px, " +
          eFar + "px " + eYUp + "px, " +
          eFar + "px " + eYLow + "px)"
        );
      }
    };

    update();

    let rafId = null;
    const scheduleUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("resize", scheduleUpdate);

    // Update light fan cleanly after card expand / collapse completes without mid-animation thrashing
    const timer = setTimeout(update, 460);

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [isOn, expandedSection, data]);

  // ── shared sound state (syncs with the Your Next Watch chip) ──
  const [soundOn, setSoundOn] = useState(() => reelSound.isEnabled());
  useEffect(() => {
    const sync = (e) => setSoundOn(Boolean(e.detail && e.detail.on));
    window.addEventListener("ynw-sound-changed", sync);
    return () => window.removeEventListener("ynw-sound-changed", sync);
  }, []);
  useEffect(() => () => reelSound.motorStop(), []);

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

  return (
    <section
      ref={rootRef}
      id="the-toolkit"
      data-testid="toolkit-section"
      className={`tk-section${inView ? " is-inview" : ""}${isOn ? " tk-on" : ""}`}
    >
      {/* the travelling wedge — escapes the stage, rides behind the neighbours */}
      <div className="tk-beam tk-beam--escape" aria-hidden="true" />

      <div className="tk-header">
        <h2>THE TOOLKIT</h2>
        <p className="tk-subtitle">The how behind the what I create.</p>
        <p className="tk-desc">
          A collection of technologies, tools and creative capabilities that
          help me turn ideas into working experiences.
        </p>
        <button
          type="button"
          className={`tk-sound-chip${soundOn ? " is-on" : ""}`}
          data-testid="toolkit-sound-toggle"
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
      </div>

      <div
        ref={stageRef}
        className={`tk-stage${isOn ? " is-lit" : ""}${
          expandedSection ? " is-expanded" : ""
        }`}
      >
        {/* projection pool: glows UNDER the light table, behind the sheet */}
        <div className="tk-beam-wrap" aria-hidden="true">
          <div className="tk-beam tk-beam--pool" />
          <div className="tk-beam tk-beam--wash" />
        </div>

        {/* projector column */}
        <div className="tk-camera-col">
          <CameraArt isOn={isOn} />
          <button
            type="button"
            data-testid="toolkit-power-btn"
            onClick={() => {
              reelSound.ensure();
              reelSound.clunk();
              if (!isOn) {
                // motor spins up + light warms out of the glass
                setTimeout(() => reelSound.motorStart(), 420);
              } else {
                reelSound.motorStop();
                reelSound.collapse();
              }
              setIsOn((v) => !v);
              setExpanded(null);
            }}
            className={`tk-power-btn${isOn ? " is-on" : ""}`}
          >
            <Power className="tk-power-icon" aria-hidden="true" />
            <span>{isOn ? "Switch off" : "Switch on"}</span>
          </button>
          <p className="tk-switch-hint" data-testid="toolkit-power-hint">
            {isOn
              ? "Projection live — click a film to expand it"
              : "Turn on the spotlight to witness the spectacle"}
          </p>
        </div>

        {/* contact sheet */}
        <div className="tk-sheet-area">
          <div ref={sheetRef} className="tk-sheet" data-testid="toolkit-sheet">
            {toolkit.sections.map((section) => {
              const isExpanded = expandedSection && expandedSection.order === section.order;
              const isDimmed = expandedSection && !isExpanded;
              return (
                <article
                  key={section.order}
                  className={`tk-card${isExpanded ? " is-expanded" : ""}${
                    isDimmed ? " is-dimmed" : ""
                  }${isOn ? " is-lit" : ""}`}
                  data-testid={`toolkit-card-${section.order}`}
                  onClick={() => {
                    if (isOn && !expandedSection) {
                      reelSound.ensure();
                      reelSound.expand();
                      reelSound.motorStart();
                      setExpanded(section.order);
                    }
                  }}
                >
                  <Perfs />
                  <div className="tk-card-face">
                    <span className="tk-card-num">
                      {String(section.order).padStart(2, "0")}
                    </span>
                    <h3 className="tk-card-title">{section.title}</h3>
                    <p className="tk-card-tagline">
                      {section.tagline || section.description}
                    </p>
                  </div>

                  <div className="tk-card-details">
                    <div className="tk-card-details-inner">
                      {section.tagline && (
                        <p className="tk-card-desc">{section.description}</p>
                      )}
                      <div className="tk-expand-row">
                        <div className="tk-scenes-block" data-testid="toolkit-scenes">
                          <div className="tk-block-header">
                            <span>{section.columns[0].label}</span>
                          </div>
                          <div className="tk-scene-grid">
                            {section.columns[0].items.map((item, i) => (
                              <div className="tk-scene" key={item}>
                                <div className="tk-scene-perfs" aria-hidden="true" />
                                <div className="tk-scene-body">
                                  <span className="tk-scene-num">
                                    Scene {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <span className="tk-scene-name">{item}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="tk-credits-block" data-testid="toolkit-credits">
                          <div className="tk-block-header">
                            <span>{section.columns[2].label}</span>
                          </div>
                          <div className="tk-credits-grid">
                            {section.columns[2].items.map((item, i) => {
                              const sep = item.indexOf(" — ");
                              const film = sep > -1 ? item.slice(0, sep) : item;
                              const note = sep > -1 ? item.slice(sep + 3) : null;
                              return (
                                <div className="tk-credit" key={item}>
                                  <span className="tk-credit-index">
                                    Credit {String(i + 1).padStart(2, "0")}
                                  </span>
                                  <span className="tk-credit-film">{film}</span>
                                  {note && (
                                    <span className="tk-credit-note">{note}</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="tk-strip-block" data-testid="toolkit-filmstrip">
                        <div className="tk-block-header">
                          <span>{section.columns[1].label}</span>
                        </div>
                        <div className="tk-filmstrip">
                          <div className="tk-filmstrip-track">
                            {loopedStrip(section.columns[1].items).map((tool, i) => {
                              const icon = toolIcon(tool);
                              return (
                                <span className="tk-strip-cell" key={i}>
                                  <span className="tk-strip-frame">
                                    {icon && (
                                      <svg
                                        className="tk-strip-icon"
                                        viewBox={icon.vb}
                                        style={icon.color ? { color: icon.color, fill: icon.color } : undefined}
                                        aria-hidden="true"
                                        dangerouslySetInnerHTML={{ __html: icon.svg }}
                                      />
                                    )}
                                    {tool}
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {isExpanded && (
                        <button
                          type="button"
                          data-testid="toolkit-back-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            reelSound.ensure();
                            reelSound.collapse();
                            reelSound.motorStart();
                            setExpanded(null);
                          }}
                          className="tk-back-btn"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Back to full view</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <Perfs bottom />
                </article>
              );
            })}

            <div
              className={`tk-card tk-card--langs${
                expandedSection ? " is-dimmed" : ""
              }`}
              data-testid="toolkit-languages"
            >
              <Perfs />
              <div className="tk-card-face">
                <span className="tk-card-num">06</span>
                <h3 className="tk-card-title">Programming Languages</h3>
                <p className="tk-card-tagline">Spoken across every project.</p>
                <div className="tk-lang-grid">
                  {toolkit.languages.map((lang) => {
                    const icon = toolIcon(lang);
                    return (
                      <span className="tk-lang-chip" key={lang}>
                        {icon && (
                          <svg
                            className="tk-strip-icon"
                            viewBox={icon.vb}
                            style={icon.color ? { color: icon.color, fill: icon.color } : undefined}
                            aria-hidden="true"
                            dangerouslySetInnerHTML={{ __html: icon.svg }}
                          />
                        )}
                        {lang}
                      </span>
                    );
                  })}
                </div>
              </div>
              <Perfs bottom />
            </div>
          </div>
        </div>

        {/* atmosphere: a whisper of projected light + drifting dust floats
            ABOVE the sheet so the frames keep their deep, readable blacks */}
        <div className="tk-veil-wrap" aria-hidden="true">
          <div className="tk-beam tk-beam--veil" />
        </div>
        <div className="tk-motes" aria-hidden="true">
          {[
            { left: "38%", top: "34%", d: "0s", dur: "9s" },
            { left: "55%", top: "22%", d: "1.4s", dur: "11s" },
            { left: "70%", top: "62%", d: "0.7s", dur: "10s" },
            { left: "84%", top: "40%", d: "2.2s", dur: "12s" },
            { left: "48%", top: "74%", d: "3s", dur: "9.5s" },
            { left: "92%", top: "78%", d: "1.1s", dur: "13s" },
          ].map((m, i) => (
            <span
              key={i}
              style={{ left: m.left, top: m.top, animationDelay: m.d, animationDuration: m.dur }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
                