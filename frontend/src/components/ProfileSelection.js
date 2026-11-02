import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROFILES } from "@/config/profiles";
import {
  CinematicScanlines,
  FilmGrain,
  FilmSprocketRails,
  NetflixVolumetricAurora,
  ProjectorMotes,
  Vignette,
} from "@/components/Atmosphere";

const EASE = [0.16, 1, 0.3, 1];

function VisualMeet() {
  return (
    <div className="flex h-full items-center justify-center px-8">
      <div className="relative flex h-full max-h-[240px] w-full max-w-[190px] items-center justify-center overflow-hidden rounded-sm border border-lineStrong bg-[linear-gradient(165deg,#141416_0%,#0c0c0e_60%,#111114_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_65%_18%,rgba(181,31,50,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_35%_at_30%_80%,rgba(231,226,223,0.05),transparent_70%)]" />
        <span
          className="font-display text-[7rem] font-bold leading-none text-paper/90"
          style={{ textShadow: "0 0 70px rgba(181,31,50,0.35)" }}
        >
          H
        </span>
        <span className="absolute bottom-3 left-0 right-0 text-center text-[8px] uppercase tracking-[0.35em] text-ink-muted/50">
          Portrait pending
        </span>
      </div>
    </div>
  );
}

function VisualRecruiter() {
  const rows = ["Experience", "Education", "Skills", "Achievements"];
  return (
    <div className="flex h-full flex-col justify-between px-8 py-2">
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div
            key={r}
            className="flex items-center justify-between border-b border-line pb-2"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-ink-muted/80">
              {r}
            </span>
            <span className="h-1 w-8 rounded-full bg-[linear-gradient(90deg,rgba(211,59,76,0.7),transparent)]" />
          </div>
        ))}
      </div>
      <span className="font-display text-8xl font-semibold leading-[0.8] text-paper/10">
        CV
      </span>
    </div>
  );
}

function VisualProfessional() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 300 240"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="beam" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#B51F32" stopOpacity="0" />
          <stop offset="0.55" stopColor="#D33B4C" stopOpacity="0.9" />
          <stop offset="1" stopColor="#B51F32" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#D33B4C" stopOpacity="0.5" />
          <stop offset="1" stopColor="#D33B4C" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      <g stroke="rgba(231,226,223,0.12)" strokeWidth="1">
        <path d="M40 190 L110 120 L190 150 L255 70" />
        <path d="M110 120 L170 60 L255 70" />
        <path d="M40 190 L170 60" opacity="0.5" />
      </g>
      <path d="M20 210 C 90 190, 190 120, 285 30" stroke="url(#beam)" strokeWidth="1.5" />
      <g fill="#E7E2DF">
        <circle cx="40" cy="190" r="3" />
        <circle cx="110" cy="120" r="4" />
        <circle cx="190" cy="150" r="3" />
        <circle cx="170" cy="60" r="3" />
        <circle cx="255" cy="70" r="4.5" />
      </g>
      <circle cx="255" cy="70" r="26" fill="url(#nodeGlow)" />
      <circle cx="110" cy="120" r="20" fill="url(#nodeGlow)" opacity="0.6" />
    </svg>
  );
}

const VISUALS = {
  "meet-harshal": VisualMeet,
  recruiter: VisualRecruiter,
  professional: VisualProfessional,
};

function ProfileCard({ profile, index, reduce, hovered, selected, onHover, onSelect }) {
  const Visual = VISUALS[profile.id];
  const isSelected = selected === profile.id;
  const dimmed = (hovered && hovered !== profile.id) || (selected && !isSelected);

  return (
    <motion.button
      type="button"
      data-testid={`profile-card-${profile.id}`}
      aria-pressed={isSelected}
      onClick={() => onSelect(profile.id)}
      onMouseEnter={() => onHover(profile.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(profile.id)}
      onBlur={() => onHover(null)}
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0.01 : 0.85,
        ease: EASE,
        delay: reduce ? 0 : 0.35 + index * 0.14,
      }}
      className={`group relative flex flex-col overflow-hidden rounded-md border bg-charcoal/60 text-left transition-all duration-500 will-change-transform ${
        isSelected
          ? "border-crimson/70 shadow-[0_0_60px_rgba(181,31,50,0.28)] lg:-translate-y-2"
          : "border-line hover:border-crimson/40 hover:shadow-[0_0_50px_rgba(181,31,50,0.16)]"
      } ${dimmed ? "opacity-35" : "opacity-100"}`}
    >
      <div className="flex items-center justify-between px-6 pt-5 text-[9px] font-medium uppercase tracking-[0.4em] text-ink-muted/70">
        <span>Profile {profile.order}</span>
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
            isSelected
              ? "bg-crimson shadow-[0_0_10px_rgba(211,59,76,0.9)]"
              : "bg-paper/20 group-hover:bg-crimson-light/70"
          }`}
        />
      </div>

      <div className="relative mt-4 min-h-[230px] flex-1 lg:min-h-[260px]">
        <Visual />
      </div>

      <div className="border-t border-line px-6 pb-6 pt-5">
        <h3 className="font-display text-2xl font-semibold text-paper">
          {profile.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted transition-colors duration-500 group-hover:text-paper/85">
          {profile.description}
        </p>
        <span className="mt-4 inline-flex -translate-x-2 items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.35em] text-crimson-light opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          Select
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </div>
    </motion.button>
  );
}

export default function ProfileSelection() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    if (selected) return;
    setSelected(id);
    window.setTimeout(() => navigate(`/profile/${id}`), reduce ? 150 : 750);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: reduce ? 0.2 : 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      className="relative min-h-screen bg-obsidian text-paper overflow-x-hidden"
      data-testid="profiles-screen"
    >
      <FilmGrain />
      <CinematicScanlines />
      <NetflixVolumetricAurora />
      <ProjectorMotes />
      <FilmSprocketRails />

      <button
        type="button"
        onClick={() => navigate("/", { state: { stage: "identity" } })}
        data-testid="back-to-identity"
        className="group absolute left-6 top-7 z-20 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted/70 transition-colors duration-300 hover:text-paper sm:left-10"
      >
        <ArrowLeft
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        />
        Back to intro
      </button>

      <div className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10">
        <header className="text-center">
          <motion.p
            className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.45em] text-crimson-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : 0.15 }}
            data-testid="profiles-eyebrow"
          >
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-crimson" />
            Harshal
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-crimson" />
          </motion.p>
          <motion.h1
            className="mt-5 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold text-paper"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0.01 : 0.8,
              ease: EASE,
              delay: reduce ? 0 : 0.1,
            }}
            data-testid="profiles-heading"
          >
            Who&apos;s Watching?
          </motion.h1>
          <motion.p
            className="mt-4 text-base text-ink-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0.01 : 0.7, delay: reduce ? 0 : 0.3 }}
            data-testid="profiles-subline"
          >
            Choose how you&apos;d like to explore.
          </motion.p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5 lg:gap-7">
          {PROFILES.map((p, i) => (
            <ProfileCard
              key={p.id}
              profile={p}
              index={i}
              reduce={reduce}
              hovered={hovered}
              selected={selected}
              onHover={setHovered}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      <Vignette />
    </motion.main>
  );
}
