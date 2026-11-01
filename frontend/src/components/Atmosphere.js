import { motion } from "framer-motion";

export function AmbientGlow({
  className = "",
  delay = 0.1,
  intensity = 0.26,
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <motion.div
        className="h-full w-full rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay, ease: "easeOut" }}
        style={{
          background: `radial-gradient(closest-side, rgba(181,31,50,${intensity}), rgba(181,31,50,${
            intensity * 0.35
          }) 48%, transparent 72%)`,
          filter: "blur(12px)",
        }}
      />
    </div>
  );
}

export function FilmGrain() {
  return <div aria-hidden="true" className="grain-overlay" />;
}

export function Vignette({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          "radial-gradient(115% 90% at 50% 42%, transparent 55%, rgba(9,9,9,0.7) 100%)",
      }}
    />
  );
}
