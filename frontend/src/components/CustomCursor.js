import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE =
  'button, a, [role="button"], input, textarea, select, [data-cursor-hover]';

// Crimson custom cursor: precise dot, trailing ring and a lagging ambient
// glow. Enabled only for fine pointers without reduced-motion preference.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 1000, damping: 60 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 60 });
  const ringX = useSpring(x, { stiffness: 260, damping: 26 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26 });
  const glowX = useSpring(x, { stiffness: 110, damping: 20 });
  const glowY = useSpring(y, { stiffness: 110, damping: 20 });

  useEffect(() => {
    const fine =
      window.matchMedia &&
      window.matchMedia("(pointer: fine)").matches;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(
        Boolean(e.target && e.target.closest && e.target.closest(INTERACTIVE))
      );
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const out = (e) => {
      if (!e.relatedTarget) setVisible(false);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("mouseout", out);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseout", out);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        data-testid="cursor-glow"
        className="cursor-glow"
        style={{ x: glowX, y: glowY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        aria-hidden="true"
        data-testid="cursor-ring"
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.7 : hovering ? 1.8 : 1,
          backgroundColor: hovering ? "rgba(181,31,50,0.12)" : "rgba(181,31,50,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <motion.div
        aria-hidden="true"
        data-testid="cursor-dot"
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: visible ? (hovering ? 0.6 : 1) : 0,
          scale: pressed ? 0.6 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
