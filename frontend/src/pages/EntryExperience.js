import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import IntroAnimation from "@/components/intro/IntroAnimation";
import IdentityReveal from "@/components/intro/IdentityReveal";
import {
  CinematicScanlines,
  FilmGrain,
  FilmSprocketRails,
  NetflixVolumetricAurora,
  ProjectorMotes,
} from "@/components/Atmosphere";

const SEEN_KEY = "harshal:intro-seen";

export default function EntryExperience() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return "identity";
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(SEEN_KEY));
    } catch (e) {
      seen = false;
    }
    if (seen || (location.state && location.state.stage === "identity")) {
      return "identity";
    }
    return "hello";
  });

  const markSeen = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch (e) {
      /* storage unavailable - intro simply replays */
    }
  };

  const goProfiles = () => {
    markSeen();
    navigate("/profiles");
  };

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-obsidian text-paper"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      data-testid="entry-experience"
    >
      <FilmGrain />
      <CinematicScanlines />
      <NetflixVolumetricAurora />
      <ProjectorMotes />
      <FilmSprocketRails />

      <AnimatePresence mode="wait">
        {stage === "hello" ? (
          <IntroAnimation
            key="hello"
            onComplete={() => {
              markSeen();
              setStage("identity");
            }}
          />
        ) : (
          <IdentityReveal key="identity" onExplore={goProfiles} />
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={goProfiles}
        data-testid="skip-intro-btn"
        className="fixed bottom-6 right-6 z-50 rounded-sm px-4 py-3 text-[10px] font-medium uppercase tracking-[0.35em] text-ink-muted/60 transition-colors duration-300 hover:text-paper sm:bottom-8 sm:right-10"
      >
        Skip intro
      </button>
    </motion.main>
  );
}
