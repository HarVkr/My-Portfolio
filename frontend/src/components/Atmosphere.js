import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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

export function CinematicScanlines() {
  return <div aria-hidden="true" className="cinematic-scanlines" />;
}

export function Vignette({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background:
          "radial-gradient(115% 90% at 50% 42%, transparent 55%, rgba(9,9,9,0.78) 100%)",
      }}
    />
  );
}

// -------------------------------------------------------------
// Netflix-grade Volumetric Ambient Aurora & Projector Glow
// -------------------------------------------------------------
export function NetflixVolumetricAurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Primary Netflix Crimson Ambient Bloom (Top Right) */}
      <div
        className="aurora-breathe-anim absolute right-[-12vw] top-[-5vh] h-[95vh] w-[95vw] max-w-[1300px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(181, 31, 50, 0.16) 0%, rgba(181, 31, 50, 0.04) 50%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary Projector Tungsten Warmth (Lower Left) */}
      <div
        className="aurora-breathe-anim absolute left-[-10vw] top-[45vh] h-[85vh] w-[80vw] max-w-[1100px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(229, 169, 60, 0.06) 0%, rgba(181, 31, 50, 0.035) 45%, transparent 72%)",
          filter: "blur(70px)",
          animationDelay: "-7s",
        }}
      />

      {/* Deep Center Cinema Wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(35, 12, 16, 0.14) 0%, transparent 80%)",
        }}
      />
    </div>
  );
}

// -------------------------------------------------------------
// Floating Silver-Screen Projector Dust Motes (Interactive)
// -------------------------------------------------------------
export function ProjectorMotes() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Create 34 microscopic drifting dust motes
    const particles = Array.from({ length: 34 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.6,
      baseAlpha: Math.random() * 0.25 + 0.08,
      alpha: 0.15,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.35 - 0.1, // gently drifts upwards like theater air
      color:
        Math.random() > 0.4
          ? "235, 225, 215" // warm silver dust
          : Math.random() > 0.5
          ? "240, 185, 95" // golden projector illumination
          : "220, 60, 75", // crimson laser tint
    }));

    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(tick * 0.015 + i) * 0.18;
        p.y += p.vy;

        // Wrap around viewport boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Interactive mouse illumination
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 170) {
          const prox = 1 - dist / 170;
          p.alpha = p.baseAlpha + prox * 0.55;
          // Soft repulsion from the cursor bulb
          p.x -= (dx / dist) * prox * 0.5;
          p.y -= (dy / dist) * prox * 0.5;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.04;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.shadowColor = `rgba(${p.color}, 0.5)`;
        ctx.shadowBlur = p.r * 2.5;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[12]"
      style={{ opacity: 0.85 }}
    />
  );
}

// -------------------------------------------------------------
// 35mm / 70mm Vertical Film Sprocket Rails (Side Margins)
// -------------------------------------------------------------
export function FilmSprocketRails() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const total = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(total > 0 ? window.scrollY / total : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const frameNumber = Math.min(
    999,
    Math.max(1, Math.floor(scrollProgress * 240) + 1)
  )
    .toString()
    .padStart(3, "0");

  const timeSeconds = Math.floor(scrollProgress * 128);
  const minutes = Math.floor(timeSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeSeconds % 60).toString().padStart(2, "0");
  const frames = Math.floor((scrollProgress * 128 * 24) % 24)
    .toString()
    .padStart(2, "0");

  const sprockets = Array.from({ length: 18 });

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-0 right-0 z-30 select-none hidden xl:block"
    >
      {/* Left 35mm Film Rail */}
      <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-6 px-3 border-r border-line/30 bg-gradient-to-r from-obsidian/90 via-obsidian/40 to-transparent">
        <div className="flex flex-col items-center gap-1.5 text-[8px] font-mono tracking-[0.25em] text-ink-muted/50 uppercase [writing-mode:vertical-rl] rotate-180">
          <span>KODAK 5219</span>
          <span className="text-crimson/80">35MM • 500T</span>
        </div>

        <div className="flex flex-col items-center justify-around flex-1 py-4 gap-3">
          {sprockets.map((_, i) => (
            <div
              key={`left-sprocket-${i}`}
              className="h-4 w-2.5 rounded-[2px] border border-paper/15 bg-black/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-crimson/50"
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 text-[8px] font-mono tracking-[0.3em] text-ink-muted/60 [writing-mode:vertical-rl] rotate-180">
          <span>FRM {frameNumber}</span>
        </div>
      </div>

      {/* Right 35mm Film Rail */}
      <div className="absolute right-0 top-0 bottom-0 w-12 flex flex-col justify-between py-6 px-3 border-l border-line/30 bg-gradient-to-l from-obsidian/90 via-obsidian/40 to-transparent">
        <div className="flex flex-col items-center gap-1.5 text-[8px] font-mono tracking-[0.25em] text-ink-muted/50 uppercase [writing-mode:vertical-rl]">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
            REC
          </span>
          <span>ASPECT 2.39:1</span>
        </div>

        <div className="flex flex-col items-center justify-around flex-1 py-4 gap-3">
          {sprockets.map((_, i) => (
            <div
              key={`right-sprocket-${i}`}
              className="h-4 w-2.5 rounded-[2px] border border-paper/15 bg-black/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-crimson/50"
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 text-[8px] font-mono tracking-[0.25em] text-ink-muted/60 [writing-mode:vertical-rl]">
          <span>TC {minutes}:{seconds}:{frames}</span>
        </div>
      </div>
    </aside>
  );
}

// -------------------------------------------------------------
// Anamorphic Lens Flare Section Divider
// -------------------------------------------------------------
export function AnamorphicDivider({
  reel = "REEL 02",
  tagline = "NEXT SEQUENCE",
  label = "CONTINUE EXPLORING",
}) {
  return (
    <div
      aria-hidden="true"
      data-testid="anamorphic-divider"
      className="relative z-10 mx-auto my-6 w-full max-w-6xl px-6 py-6 overflow-hidden select-none"
    >
      {/* Corner Camera Crosshairs */}
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-[0.3em] text-ink-muted/40 uppercase">
          ⌜ SCOPE 2.39:1
        </span>
        <span className="font-mono text-[9px] tracking-[0.3em] text-crimson-light/70 uppercase">
          {reel} // {tagline}
        </span>
        <span className="font-mono text-[9px] tracking-[0.3em] text-ink-muted/40 uppercase">
          4K CINEMA ⌝
        </span>
      </div>

      {/* Anamorphic Flare Streak */}
      <div className="relative mt-3 flex items-center justify-center">
        {/* Full-width laser hairline */}
        <div className="absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(181,31,50,0.15)_20%,rgba(255,255,255,0.7)_50%,rgba(181,31,50,0.15)_80%,transparent_100%)]" />

        {/* Central glowing anamorphic beam streak */}
        <div className="flare-pulse-anim relative z-10 flex items-center justify-center">
          <div className="h-[2px] w-48 sm:w-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,100,120,0.9)_0%,rgba(181,31,50,0.4)_50%,transparent_80%)] shadow-[0_0_24px_rgba(181,31,50,0.9),0_0_50px_rgba(211,59,76,0.5)]" />
          <div className="absolute h-2 w-2 rounded-full bg-paper shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-center">
        <span className="text-[8px] font-mono tracking-[0.45em] text-ink-muted/50 uppercase">
          — {label} —
        </span>
      </div>
    </div>
  );
}
