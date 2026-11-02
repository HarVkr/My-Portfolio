import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HELLO_CONTOURS, HELLO_VIEWBOX } from "@/data/helloPaths";
import { Vignette } from "@/components/Atmosphere";

const DRAW_START = 550; // glow settles, pen touches paper
const DRAW_WINDOW = 2000; // strokes drawn between 0.55s and ~2.55s
const FILL_AT = DRAW_START + DRAW_WINDOW + 320;
const DONE_AT = FILL_AT + 800;

export default function IntroAnimation({ onComplete }) {
  const reduce = useReducedMotion();
  const [filled, setFilled] = useState(false);
  const [plan, setPlan] = useState(null);
  const refs = useRef([]);

  useLayoutEffect(() => {
    if (reduce) return;
    const lens = refs.current.map((p) => (p ? p.getTotalLength() : 0));
    const total = lens.reduce((a, b) => a + b, 0) || 1;
    let acc = 0;
    const next = lens.map((len) => {
      const raw = DRAW_WINDOW * (len / total);
      const item = {
        len: Math.ceil(len),
        dur: Math.max(Math.round(raw / 0.82), 140),
        delay: Math.round(DRAW_START + acc),
      };
      acc += raw * 0.82; // strokes overlap slightly for a connected cursive feel
      return item;
    });
    setPlan(next);
    const t1 = setTimeout(() => setFilled(true), FILL_AT);
    const t2 = setTimeout(onComplete, DONE_AT);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce, onComplete]);

  useEffect(() => {
    if (!reduce) return;
    setFilled(true);
    const t = setTimeout(onComplete, 800);
    return () => clearTimeout(t);
  }, [reduce, onComplete]);

  const getStyle = (i) => {
    const p = plan && plan[i];
    if (p) {
      return {
        strokeDasharray: p.len,
        strokeDashoffset: p.len,
        animation: `hello-draw ${p.dur}ms cubic-bezier(0.45,0.05,0.35,0.95) ${p.delay}ms forwards`,
      };
    }
    return reduce ? undefined : { visibility: "hidden" };
  };

  return (
    <motion.section
      className="fixed inset-0 z-10 grid place-items-center"
      data-testid="intro-hello-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: reduce ? 0.2 : 0.5 } }}
      exit={{
        opacity: 0,
        scale: 1.07,
        y: -26,
        filter: "blur(10px)",
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
      }}
    >
      <h1 className="sr-only">Hello.</h1>
      <motion.svg
        viewBox={HELLO_VIEWBOX}
        role="img"
        aria-label="Hello."
        className={`hello-svg relative z-10 w-[min(74vw,560px)] ${
          filled || reduce ? "is-filled" : ""
        }`}
        initial={reduce ? false : { scale: 0.985 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {HELLO_CONTOURS.map((d, i) => (
          <path
            key={i}
            ref={(el) => (refs.current[i] = el)}
            d={d}
            className="hello-path"
            fillRule="evenodd"
            style={getStyle(i)}
          />
        ))}
      </motion.svg>
      <Vignette />
    </motion.section>
  );
}
