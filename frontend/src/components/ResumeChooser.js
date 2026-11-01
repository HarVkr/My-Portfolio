import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Eye, FileText, X } from "lucide-react";

const RESUME_URL = `${process.env.PUBLIC_URL || ""}/Harshal_Vhatkar_APM_Resume.pdf`;

// Cinematic chooser shown when the hero's VIEW RESUME CTA is pressed:
// open the live document in a new tab or take the PDF copy.
export default function ResumeChooser({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/85 px-5 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      data-testid="resume-overlay"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Harshal Vhatkar — Resume"
        data-testid="resume-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-sm border border-lineStrong bg-[#0d0d10] px-8 pb-8 pt-10 shadow-[0_30px_90px_rgba(0,0,0,0.7)]"
      >
        <div className="tk-perfs" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <button
          type="button"
          data-testid="resume-close-btn"
          onClick={onClose}
          aria-label="Close resume options"
          className="absolute right-4 top-6 rounded-full p-2 text-ink-muted/70 transition-colors duration-300 hover:text-paper"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <p className="mt-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-crimson-light">
          <span aria-hidden="true" className="h-px w-8 bg-crimson" />
          Featured Document // PDF
        </p>
        <h3
          className="mt-4 font-display text-2xl font-semibold text-paper"
          data-testid="resume-modal-title"
        >
          Harshal Vhatkar — Resume
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          The one-page story — product, engineering and creative. Open the
          live document or keep a PDF copy.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            data-testid="resume-view-btn"
            onClick={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")}
            className="group inline-flex items-center justify-between gap-3 rounded-sm bg-crimson px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper transition-[background-color,box-shadow] duration-300 hover:bg-crimson-light hover:shadow-[0_0_44px_rgba(181,31,50,0.35)] active:scale-[0.97]"
          >
            <span className="inline-flex items-center gap-3">
              <Eye className="h-4 w-4" aria-hidden="true" />
              View Resume
            </span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </button>
          <a
            data-testid="resume-download-btn"
            href={RESUME_URL}
            download="Harshal_Vhatkar_Resume.pdf"
            className="group inline-flex items-center justify-between gap-3 rounded-sm border border-lineStrong px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/85 transition-[border-color,color] duration-300 hover:border-crimson/60 hover:text-crimson-light active:scale-[0.97]"
          >
            <span className="inline-flex items-center gap-3">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PDF
            </span>
            <FileText className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
