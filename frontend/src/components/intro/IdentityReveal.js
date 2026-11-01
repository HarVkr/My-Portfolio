import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Vignette } from "@/components/Atmosphere";
import { IDENTITY } from "@/config/profiles";

const EASE = [0.16, 1, 0.3, 1];

export default function IdentityReveal({ onExplore }) {
  const reduce = useReducedMotion();

  const letter = {
    hidden: { y: "112%" },
    show: (i) => ({
      y: "0%",
      transition: {
        duration: reduce ? 0.01 : 0.95,
        ease: EASE,
        delay: reduce ? 0 : 0.2 + i * 0.055,
      },
    }),
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: (d) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.01 : 0.8, ease: EASE, delay: reduce ? 0 : d },
    }),
  };

  return (
    <motion.section
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      data-testid="identity-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: reduce ? 0.3 : 0.6 } }}
      exit={{
        opacity: 0,
        y: -18,
        filter: "blur(8px)",
        transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      <h1
        className="font-display font-bold leading-[1.02] tracking-[-0.015em] text-paper"
        style={{ fontSize: "clamp(4.25rem, 15vw, 12rem)" }}
        data-testid="identity-name"
      >
        <span className="inline-flex overflow-hidden pb-[0.06em]">
          {IDENTITY.name.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={letter}
              custom={i}
              initial="hidden"
              animate="show"
            >
              {ch}
            </motion.span>
          ))}
        </span>
      </h1>

      <h2 className="mt-8 overflow-hidden font-display text-[clamp(1.3rem,3vw,2.1rem)] font-medium text-paper/90">
        <motion.span
          className="block"
          variants={fadeUp}
          custom={reduce ? 0 : 0.95}
          initial="hidden"
          animate="show"
        >
          {IDENTITY.headline}
        </motion.span>
      </h2>

      <div
        className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
        data-testid="identity-roles"
      >
        {IDENTITY.roles.map((role, i) => (
          <motion.span
            key={role}
            className="inline-flex items-center gap-5"
            variants={fadeUp}
            custom={reduce ? 0 : 1.15 + i * 0.12}
            initial="hidden"
            animate="show"
          >
            {i > 0 && (
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-crimson"
              />
            )}
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink-muted sm:text-xs">
              {role}
            </span>
          </motion.span>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={onExplore}
        data-testid="explore-intro-btn"
        variants={fadeUp}
        custom={reduce ? 0 : 1.6}
        initial="hidden"
        animate="show"
        whileHover={reduce ? undefined : { scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group mt-16 inline-flex items-center gap-4 rounded-sm bg-crimson px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-paper transition-[background-color,box-shadow] duration-300 hover:bg-crimson-light hover:shadow-[0_0_48px_rgba(181,31,50,0.4)] sm:px-12"
      >
        Explore
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
          aria-hidden="true"
        />
      </motion.button>

      <Vignette />
    </motion.section>
  );
}
