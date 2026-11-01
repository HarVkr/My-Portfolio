import { Fragment, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { HERO_CONTENT, PROFILES } from "@/config/profiles";
import { FilmGrain, Vignette } from "@/components/Atmosphere";
import PortraitStage from "@/components/PortraitStage";
import ResumeChooser from "@/components/ResumeChooser";
import YourNextWatch from "@/components/ynw/YourNextWatch";
import Toolkit from "@/components/toolkit/Toolkit";

const EASE = [0.16, 1, 0.3, 1];

export default function FeaturedHero() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const profile = PROFILES.find((p) => p.id === profileId);
  const [resumeOpen, setResumeOpen] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16 });
  const sy = useSpring(my, { stiffness: 55, damping: 16 });
  const portraitX = useTransform(sx, [-1, 1], [10, -10]);
  const portraitY = useTransform(sy, [-1, 1], [6, -6]);
  const glowX = useTransform(sx, [-1, 1], [-22, 22]);

  const handleMove = (e) => {
    if (reduce) return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  if (!profile) return <Navigate to="/profiles" replace />;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.13,
        delayChildren: reduce ? 0 : 0.55,
      },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.85, ease: EASE },
    },
  };
  const lineMask = {
    hidden: { y: "112%" },
    show: {
      y: "0%",
      transition: { duration: reduce ? 0.01 : 1, ease: EASE },
    },
  };

  return (
    <motion.main
      onMouseMove={handleMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: reduce ? 0.2 : 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      className="relative min-h-screen overflow-hidden bg-obsidian"
      data-testid="featured-hero"
    >
      <FilmGrain />

      <div className="relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute right-[-14%] top-[30%] z-0 h-[85vmin] w-[85vmin] lg:right-[-6%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(181,31,50,0.22), rgba(181,31,50,0.06) 50%, transparent 72%)",
          filter: "blur(18px)",
          x: glowX,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <button
          type="button"
          onClick={() => navigate("/profiles")}
          data-testid="hero-back-profiles"
          className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted transition-colors duration-300 hover:text-paper"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Who&apos;s Watching?
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          data-testid="hero-wordmark"
          className="font-display text-lg font-semibold text-paper/80 transition-colors duration-300 hover:text-paper"
        >
          H<span className="text-crimson">.</span>
        </button>
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1600px] items-center gap-10 px-6 pb-24 pt-28 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-3xl lg:pl-20 xl:pl-28"
        >
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-crimson-light sm:text-[11px]"
            data-testid="hero-label"
          >
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            {HERO_CONTENT.label}
          </motion.p>

          <h1
            className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.9rem)] font-semibold leading-[1.02] text-paper"
            data-testid="hero-title"
          >
            {HERO_CONTENT.titleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" variants={lineMask}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg"
            data-testid="hero-intro"
          >
            {profile.heroIntro}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted/90 sm:text-[11px]"
            data-testid="hero-metadata"
          >
            {HERO_CONTENT.metadata.map((m, i) => (
              <Fragment key={m}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-crimson"
                  />
                )}
                <span>{m}</span>
              </Fragment>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              data-testid={HERO_CONTENT.ctas.primary.testId}
              onClick={() => {
                const target = document.getElementById("your-next-watch");
                if (target) target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
              }}
              className="group inline-flex items-center gap-3 rounded-sm bg-crimson px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper transition-[background-color,box-shadow] duration-300 hover:bg-crimson-light hover:shadow-[0_0_44px_rgba(181,31,50,0.35)] active:scale-[0.97]"
            >
              {HERO_CONTENT.ctas.primary.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              data-testid={HERO_CONTENT.ctas.secondary.testId}
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-3 rounded-sm border border-lineStrong px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/85 transition-[border-color,color] duration-300 hover:border-crimson/60 hover:text-crimson-light active:scale-[0.97]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {HERO_CONTENT.ctas.secondary.label}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-first h-[46vh] w-full sm:h-[52vh] lg:order-none lg:h-full"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", opacity: 0.3 }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)", opacity: 1 }}
          transition={reduce ? { duration: 0.4 } : { duration: 1.5, ease: EASE, delay: 0.1 }}
          data-testid="hero-portrait"
        >
          <motion.div
            style={reduce ? undefined : { x: portraitX, y: portraitY }}
            className="h-full w-full"
          >
            <PortraitStage profile={profile} />
          </motion.div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian lg:bg-gradient-to-r lg:from-obsidian lg:via-transparent lg:to-transparent"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 text-[9px] font-medium uppercase tracking-[0.35em] text-ink-muted/50 sm:px-10 lg:px-16">
        <span>Harshal — A Mind Without a Genre</span>
        <span className="hidden sm:inline">Now Featured</span>
      </div>

      <Vignette />
      </div>

      <YourNextWatch />
      <Toolkit />
      <ResumeChooser open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </motion.main>
  );
}
