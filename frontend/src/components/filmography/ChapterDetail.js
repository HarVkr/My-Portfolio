import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { reelSound } from "../ynw/ynwSound";

const EASE = [0.22, 0.61, 0.36, 1];

// Reusable expanded-chapter view: the clicked poster FLIPs into a large,
// scrollable detail panel over a dimmed, blurred page. Closes back into place.
export default function ChapterDetail({ chapter, originRect, onClose }) {
  const [closing, setClosing] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (closing) reelSound.collapse();
  }, [closing]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setClosing(true);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setRevealed(true), 450);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, []);

  const target = useMemo(() => {
    const isMobile = window.innerWidth <= 768;
    const width = Math.min(window.innerWidth - (isMobile ? 20 : 64), 1060);
    const height = Math.min(window.innerHeight - (isMobile ? 24 : 72), 860);
    return {
      top: Math.max(12, (window.innerHeight - height) / 2),
      left: (window.innerWidth - width) / 2,
      width,
      height,
    };
  }, []);

  const origin = originRect || target;
  const detail = chapter.detail || { meta: [], metrics: [], highlights: [] };

  return (
    <motion.div
      className="fg-detail-backdrop"
      data-testid="filmography-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: closing ? 0 : 1 }}
      transition={{ duration: closing ? 0.5 : 0.35 }}
      onClick={() => setClosing(true)}
    >
      <motion.div
        className="fg-detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`Chapter detail — ${chapter.title}`}
        data-testid={`filmography-detail-${chapter.key}`}
        initial={{
          top: origin.top,
          left: origin.left,
          width: origin.width,
          height: origin.height,
        }}
        animate={
          closing
            ? {
                top: origin.top,
                left: origin.left,
                width: origin.width,
                height: origin.height,
              }
            : {
                top: target.top,
                left: target.left,
                width: target.width,
                height: target.height,
              }
        }
        transition={{ duration: closing ? 0.55 : 0.72, ease: EASE }}
        onAnimationComplete={() => {
          if (closing) onClose();
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="fg-detail-media" aria-hidden="true">
          <img src={chapter.image} alt="" />
          <div className="fg-detail-shade" />
          <div className={`fg-detail-bar${revealed && !closing ? " is-revealed" : ""}`}>
            <button
              type="button"
              className="fg-detail-back"
              data-testid="filmography-back-btn"
              data-cursor-hover
              onClick={() => setClosing(true)}
            >
              <ArrowLeft className="fg-detail-back-icon" aria-hidden="true" />
              <span>Back to Filmography</span>
              <span className="fg-detail-kbd">ESC</span>
            </button>
            <span className="fg-detail-badge">{chapter.label}</span>
          </div>
        </div>

        <div
          className={`fg-detail-scroll${revealed && !closing ? " is-revealed" : ""}`}
          data-testid={`filmography-detail-scroll-${chapter.key}`}
        >
          <div className="fg-detail-hero">
            <h1>{chapter.title}</h1>
            <div className="fg-detail-sub">
              <span className="fg-detail-org">{chapter.org}</span>
              <span className="fg-detail-dot" aria-hidden="true" />
              <span>{chapter.role}</span>
              <span className="fg-detail-dot" aria-hidden="true" />
              <span>{chapter.duration}</span>
            </div>
          </div>

          <p className="fg-detail-overview">{detail.overview}</p>

          <div className="fg-detail-meta">
            {detail.meta.map((m) => (
              <div className="fg-detail-meta-item" key={m.k}>
                <span className="fg-detail-meta-k">{m.k}</span>
                <span className="fg-detail-meta-v">{m.v}</span>
              </div>
            ))}
          </div>

          {detail.metrics && detail.metrics.length > 0 && (
            <div className="fg-detail-metrics" data-testid="filmography-metrics">
              {detail.metrics.map((m) => (
                <div className="fg-detail-metric" key={m.label}>
                  <span className="fg-detail-metric-val">{m.value}</span>
                  <span className="fg-detail-metric-label">{m.label}</span>
                  {m.note && <span className="fg-detail-metric-note">{m.note}</span>}
                </div>
              ))}
            </div>
          )}

          {detail.highlights && detail.highlights.length > 0 && (
            <div className="fg-detail-highlights" data-testid="filmography-highlights">
              <p className="fg-detail-block-title">Chapter Highlights</p>
              <ul>
                {detail.highlights.map((h, i) => (
                  <li key={i}>
                    <span className="fg-hl-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="fg-hl-text">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
