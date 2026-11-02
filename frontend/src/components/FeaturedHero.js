import { Fragment, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Eye, FileText, Sparkles } from "lucide-react";
import { HERO_CONTENT, PROFILES, RESUME_URL } from "@/config/profiles";
import {
  AnamorphicDivider,
  CinematicScanlines,
  FilmGrain,
  FilmSprocketRails,
  NetflixVolumetricAurora,
  ProjectorMotes,
  Vignette,
} from "@/components/Atmosphere";
import PortraitStage from "@/components/PortraitStage";
import ResumeChooser from "@/components/ResumeChooser";
import YourNextWatch from "@/components/ynw/YourNextWatch";
import Toolkit from "@/components/toolkit/Toolkit";
import Filmography from "@/components/filmography/Filmography";
import OffScript from "@/components/offscript/Offscript";
import ContactFooter from "@/components/ContactFooter";

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

  const titleLines = profile.titleLines || HERO_CONTENT.titleLines;
  const label = profile.badgeLabel || HERO_CONTENT.label;
  const metadata = profile.metadata || HERO_CONTENT.metadata;
  const primaryCta = profile.primaryCta || HERO_CONTENT.ctas.primary;
  const secondaryCta = profile.secondaryCta || HERO_CONTENT.ctas.secondary;
  const visibleSections = profile.visibleSections || ["ynw", "toolkit", "filmography", "offscript", "contact"];

  const isSectionVisible = (key) => visibleSections.includes(key);

  const handleScrollTo = (targetId) => {
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

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
      className="relative min-h-screen overflow-x-hidden bg-obsidian text-paper"
      data-testid="featured-hero"
    >
      {/* Cinematic Studio Atmosphere Layer */}
      <FilmGrain />
      <CinematicScanlines />
      <NetflixVolumetricAurora />
      <ProjectorMotes />
      <FilmSprocketRails />

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

        {/* Top Header Navigation & Profile Switcher */}
        <header className="absolute left-0 right-0 top-0 z-20 flex flex-wrap items-center justify-between gap-4 px-6 py-6 sm:px-10 lg:px-16">
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

          {/* Quick Perspective Switcher */}
          <nav
            aria-label="Profile perspective switcher"
            className="hidden sm:flex items-center rounded-full border border-line bg-charcoal/80 p-1 backdrop-blur-md"
          >
            {PROFILES.map((p) => {
              const active = p.id === profile.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  data-testid={`profile-switcher-${p.id}`}
                  onClick={() => navigate(`/profile/${p.id}`)}
                  className={`relative rounded-full px-4 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${
                    active
                      ? "bg-crimson text-paper shadow-[0_0_20px_rgba(181,31,50,0.5)]"
                      : "text-ink-muted hover:text-paper"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => navigate("/")}
            data-testid="hero-wordmark"
            className="font-display text-lg font-semibold text-paper/80 transition-colors duration-300 hover:text-paper"
          >
            H<span className="text-crimson">.</span>
          </button>
        </header>

        <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1600px] items-center gap-10 px-6 pb-24 pt-28 sm:px-10 lg:max-w-none lg:grid-cols-1 lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 max-w-3xl lg:max-w-[min(48rem,52vw)] lg:pl-[8vw]"
          >
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-crimson-light sm:text-[11px]"
              data-testid="hero-label"
            >
              <span aria-hidden="true" className="h-px w-8 bg-crimson" />
              {label}
            </motion.p>

            <h1
              className="mt-6 font-display text-[clamp(2.6rem,5.4vw,4.9rem)] font-semibold leading-[1.02] text-paper"
              data-testid="hero-title"
            >
              {titleLines.map((line) => (
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

            {/* Recruiter Prompt Card (View/Download Resume) */}
            {profile.hasResumePrompt && (
              <motion.div
                variants={fadeUp}
                data-testid="recruiter-resume-prompt"
                className="relative mt-8 max-w-xl overflow-hidden rounded-md border border-crimson/40 bg-[linear-gradient(145deg,rgba(181,31,50,0.12)_0%,rgba(17,17,20,0.85)_100%)] p-5 backdrop-blur-md shadow-[0_12px_40px_rgba(181,31,50,0.14)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <div className="mt-0.5 rounded-sm border border-crimson/40 bg-crimson/20 p-2.5 text-crimson-light shadow-[0_0_15px_rgba(181,31,50,0.25)]">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.35em] text-crimson-light">
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                        Candidate Resume // 1-Pager
                      </p>
                      <h4 className="mt-1 font-display text-base font-semibold text-paper">
                        Harshal Vhatkar — APM &amp; Engineer
                      </h4>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        Full track record, product initiatives, and tech stack.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:shrink-0">
                    <button
                      type="button"
                      data-testid="recruiter-view-resume-btn"
                      onClick={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")}
                      className="group inline-flex items-center gap-2 rounded-sm bg-crimson px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-paper transition-[background-color,box-shadow] duration-300 hover:bg-crimson-light hover:shadow-[0_0_24px_rgba(181,31,50,0.45)] active:scale-[0.97]"
                    >
                      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                      View Resume
                    </button>
                    <a
                      data-testid="recruiter-download-resume-btn"
                      href={RESUME_URL}
                      download="Harshal_Vhatkar_Resume.pdf"
                      className="inline-flex items-center gap-2 rounded-sm border border-lineStrong px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-paper/85 transition-[border-color,color] duration-300 hover:border-crimson/60 hover:text-crimson-light active:scale-[0.97]"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted/90 sm:text-[11px]"
              data-testid="hero-metadata"
            >
              {metadata.map((m, i) => (
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

            {/* Profile-specific CTAs */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                data-testid={primaryCta.testId || "hero-cta-explore-work"}
                onClick={() => handleScrollTo(primaryCta.targetId)}
                className="group inline-flex items-center gap-3 rounded-sm bg-crimson px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper transition-[background-color,box-shadow] duration-300 hover:bg-crimson-light hover:shadow-[0_0_44px_rgba(181,31,50,0.35)] active:scale-[0.97]"
              >
                {primaryCta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </button>

              {secondaryCta && (
                <button
                  type="button"
                  data-testid={secondaryCta.testId || "hero-cta-view-resume"}
                  onClick={() => {
                    if (secondaryCta.action === "resume-modal") {
                      setResumeOpen(true);
                    } else if (secondaryCta.targetId) {
                      handleScrollTo(secondaryCta.targetId);
                    }
                  }}
                  className="inline-flex items-center gap-3 rounded-sm border border-lineStrong px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-paper/85 transition-[border-color,color] duration-300 hover:border-crimson/60 hover:text-crimson-light active:scale-[0.97]"
                >
                  {secondaryCta.action === "resume-modal" ? (
                    <FileText className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  )}
                  {secondaryCta.label}
                </button>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative order-first h-[46vh] w-full sm:h-[52vh] lg:absolute lg:right-[5.4vw] lg:top-0 lg:h-full lg:w-[34vw]"
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
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian lg:bg-none"
            />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 text-[9px] font-medium uppercase tracking-[0.35em] text-ink-muted/50 sm:px-10 lg:pl-16 lg:pr-[calc(39.4vw+2.5rem)]">
          <span>Harshal — A Mind Without a Genre</span>
          <span className="hidden sm:inline">{profile.name} Perspective</span>
        </div>

        <Vignette />
      </div>

      {/* Profile-Curated View Sections with Anamorphic Cinema Dividers */}
      {isSectionVisible("ynw") && (
        <Fragment key="section-ynw">
          <YourNextWatch />
          {isSectionVisible("toolkit") && (
            <AnamorphicDivider
              reel="REEL 02"
              tagline="THE HOW BEHIND THE WHAT"
              label="THE TOOLKIT & CAPABILITIES"
            />
          )}
        </Fragment>
      )}

      {isSectionVisible("toolkit") && (
        <Fragment key="section-toolkit">
          <Toolkit />
          {isSectionVisible("filmography") && (
            <AnamorphicDivider
              reel="REEL 03"
              tagline="CHRONICLES & EXPERIENCE"
              label="THE FILMOGRAPHY & THE NEXT CHAPTER"
            />
          )}
          {!isSectionVisible("filmography") && isSectionVisible("offscript") && (
            <AnamorphicDivider
              reel="POST-CREDITS"
              tagline="FOR THE ONES WHO STAYED"
              label="OFF-SCRIPT // CREATIVE SCENES"
            />
          )}
        </Fragment>
      )}

      {isSectionVisible("filmography") && (
        <Fragment key="section-filmography">
          <Filmography />
          {isSectionVisible("offscript") && (
            <AnamorphicDivider
              reel="POST-CREDITS"
              tagline="FOR THE ONES WHO STAYED"
              label="OFF-SCRIPT // SCENES & STILLS"
            />
          )}
        </Fragment>
      )}

      {isSectionVisible("offscript") && (
        <Fragment key="section-offscript">
          <OffScript />
        </Fragment>
      )}

      {isSectionVisible("contact") && (
        <Fragment key="section-contact">
          <ContactFooter />
        </Fragment>
      )}

      <ResumeChooser open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </motion.main>
  );
}
