import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, Power } from "lucide-react";
import CameraArt from "./CameraArt";
import { DEFAULT_TOOLKIT } from "./defaultToolkit";
import { toolIcon } from "./toolIcons";
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

  return (
    <section
      ref={rootRef}
      id="the-toolkit"
      data-testid="toolkit-section"
      className={`tk-section${inView ? " is-inview" : ""}`}
    >
      <div className="tk-header">
        <h2>THE TOOLKIT</h2>
        <p className="tk-subtitle">The how behind the what I create.</p>
        <p className="tk-desc">
          A collection of technologies, tools and creative capabilities that
          help me turn ideas into working experiences.
        </p>
      </div>

      <div
        className={`tk-stage${isOn ? " is-lit" : ""}${
          expandedSection ? " is-expanded" : ""
        }`}
      >
        {/* projection beam */}
        <div className="tk-beam-wrap" aria-hidden="true">
          <div className="tk-beam tk-beam--halo" />
          <div className="tk-beam tk-beam--core" />
          <div className="tk-beam tk-beam--wash" />
          <div className="tk-motes">
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

        {/* projector column */}
        <div className="tk-camera-col">
          <CameraArt isOn={isOn} />
          <button
            type="button"
            data-testid="toolkit-power-btn"
            onClick={() => {
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
          <div className="tk-sheet" data-testid="toolkit-sheet">
            {toolkit.sections.map((section) => {
              const isExpanded = expandedSection && expandedSection.order === section.order;
              const isDimmed = expandedSection && !isExpanded;
              return (
                <motion.article
                  layout={reduce ? false : "position"}
                  key={section.order}
                  className={`tk-card${isExpanded ? " is-expanded" : ""}${
                    isDimmed ? " is-dimmed" : ""
                  }${isOn ? " is-lit" : ""}`}
                  data-testid={`toolkit-card-${section.order}`}
                  onClick={() => {
                    if (isOn && !expandedSection) setExpanded(section.order);
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
                </motion.article>
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
      </div>
    </section>
  );
}
