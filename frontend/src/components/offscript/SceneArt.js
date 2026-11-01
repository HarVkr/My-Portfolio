import { motion, useReducedMotion } from "framer-motion";

// Hand-drawn props for the four post-credit scenes, drawn in the same visual
// language as the Toolkit projector art: dark filled bodies, subtle strokes,
// crimson accents. Strokes draw themselves on first view (like the intro) and
// each prop keeps a quiet idle animation (bobbing, pulsing, scrubbing) so the
// scenes feel alive on the page.

function DrawPath({ d, w = 2.5, color = "#3a3a42", delay = 0, opacity = 1, dash }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
        strokeDasharray={dash}
      />
    );
  }
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dash}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.2, ease: "easeInOut", delay }}
    />
  );
}

function Fill({ children, delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <g>{children}</g>;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.g>
  );
}

function Clapper() {
  return (
    <svg viewBox="0 0 320 240" className="os-art" aria-hidden="true">
      <defs>
        <linearGradient id="cg-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a20" />
          <stop offset="1" stopColor="#0f0f14" />
        </linearGradient>
        <linearGradient id="cg-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#26262e" />
          <stop offset="1" stopColor="#17171d" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="212" rx="112" ry="9" fill="#050507" opacity="0.7" />
      <g className="os-float">
        {/* hinged top clap — snaps shut on scene hover */}
        <g className="os-clap">
          <Fill delay={0.1}>
            <rect x="64" y="74" width="192" height="26" rx="6" fill="url(#cg-top)" stroke="#2f2f36" strokeWidth="2" />
            <line x1="68" y1="79" x2="252" y2="79" stroke="#3f3f47" strokeWidth="1.5" />
          </Fill>
          <DrawPath d="M96 96 L112 78" w={5} color="#B51F32" delay={0.5} />
          <DrawPath d="M136 96 L152 78" w={5} color="#B51F32" delay={0.6} />
          <DrawPath d="M176 96 L192 78" w={5} color="#B51F32" delay={0.7} />
          <DrawPath d="M216 96 L232 78" w={5} color="#B51F32" delay={0.8} />
        </g>
        <Fill delay={0}>
          <rect x="64" y="106" width="192" height="84" rx="8" fill="url(#cg-body)" stroke="#2f2f36" strokeWidth="2" />
          <circle cx="80" cy="178" r="2.5" fill="#26262c" />
          <circle cx="240" cy="178" r="2.5" fill="#26262c" />
        </Fill>
        <DrawPath d="M88 138 h96" w={4} color="#2c2c33" delay={0.4} />
        <DrawPath d="M88 156 h64" w={4} color="#2c2c33" delay={0.5} />
        <DrawPath d="M88 174 h40" w={4} color="#232329" delay={0.55} />
        <Fill delay={0.2}>
          <circle cx="70" cy="103" r="7" fill="#B51F32" />
          <circle cx="70" cy="103" r="2.5" fill="#0b0b0e" />
        </Fill>
      </g>
    </svg>
  );
}

const EQ_HEIGHTS = [10, 16, 8, 20, 12, 18, 6, 14, 10, 18, 8, 16, 12, 9, 15];

function Mic() {
  return (
    <svg viewBox="0 0 320 240" className="os-art" aria-hidden="true">
      <defs>
        <linearGradient id="mg-keys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16161c" />
          <stop offset="1" stopColor="#0c0c10" />
        </linearGradient>
        <linearGradient id="mg-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24242c" />
          <stop offset="1" stopColor="#141419" />
        </linearGradient>
        <radialGradient id="mg-glow">
          <stop offset="0" stopColor="#B51F32" stopOpacity="0.35" />
          <stop offset="1" stopColor="#B51F32" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="122" cy="216" rx="92" ry="8" fill="#050507" opacity="0.7" />
      <g className="os-float">
        {/* pulsing glow behind the mic head */}
        <circle cx="206" cy="76" r="54" fill="url(#mg-glow)" className="os-glow" />
        {/* keyboard */}
        <Fill delay={0}>
          <rect x="48" y="164" width="148" height="46" rx="6" fill="url(#mg-keys)" stroke="#2f2f36" strokeWidth="2" />
        </Fill>
        <DrawPath d="M78 166 v42 M108 166 v42 M138 166 v42 M168 166 v42" w={2} color="#2c2c33" delay={0.5} />
        <Fill delay={0.2}>
          <rect x="86" y="166" width="9" height="19" fill="#050507" />
          <rect x="116" y="166" width="9" height="19" fill="#050507" />
          <rect x="146" y="166" width="9" height="19" fill="#050507" />
          <rect x="160" y="166" width="9" height="19" fill="#050507" />
        </Fill>
        {/* mic body */}
        <Fill delay={0.1}>
          <rect x="192" y="102" width="26" height="66" rx="12" fill="url(#mg-body)" stroke="#2f2f36" strokeWidth="2" transform="rotate(18 205 110)" />
          <circle cx="206" cy="108" r="4" fill="#B51F32" />
        </Fill>
        {/* mic head + grille */}
        <Fill delay={0.15}>
          <circle cx="206" cy="76" r="30" fill="url(#mg-body)" stroke="#2f2f36" strokeWidth="2.5" />
        </Fill>
        <DrawPath d="M186 64 h40 M182 76 h48 M186 88 h40" w={2} color="#2c2c33" delay={0.4} />
        <DrawPath d="M196 50 a26 26 0 0 1 20 0" w={2} color="#2c2c33" delay={0.5} />
        {/* sound waves — pulse like a live take */}
        <path className="os-wave" d="M248 56 a30 30 0 0 1 0 42" fill="none" stroke="#B51F32" strokeWidth="2.5" strokeLinecap="round" />
        <path className="os-wave os-wave--2" d="M260 44 a48 48 0 0 1 0 66" fill="none" stroke="#B51F32" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  );
}

function Timeline() {
  return (
    <svg viewBox="0 0 320 240" className="os-art" aria-hidden="true">
      <defs>
        <linearGradient id="tg-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#191920" />
          <stop offset="1" stopColor="#0f0f14" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="210" rx="118" ry="9" fill="#050507" opacity="0.7" />
      <g className="os-float">
        <Fill delay={0}>
          <rect x="44" y="56" width="232" height="124" rx="8" fill="url(#tg-body)" stroke="#2f2f36" strokeWidth="2" />
          <circle cx="58" cy="68" r="2.5" fill="#B51F32" opacity="0.9" />
          <circle cx="66" cy="68" r="2.5" fill="#2c2c33" />
          <circle cx="74" cy="68" r="2.5" fill="#2c2c33" />
        </Fill>
        <DrawPath d="M44 80 h232" w={1.5} color="#232329" delay={0.3} />
        {/* track 1 clips */}
        <Fill delay={0.15}>
          <rect x="60" y="90" width="64" height="18" rx="3" fill="#1d1d23" stroke="#2c2c33" strokeWidth="1.5" />
          <rect x="130" y="90" width="48" height="18" rx="3" fill="#101015" stroke="#2c2c33" strokeWidth="1.5" />
        </Fill>
        <DrawPath d="M68 99 h40 M138 99 h24" w={2} color="#2c2c33" delay={0.45} />
        {/* track 2 clips */}
        <Fill delay={0.25}>
          <rect x="60" y="118" width="36" height="18" rx="3" fill="#101015" stroke="#2c2c33" strokeWidth="1.5" />
          <rect x="102" y="118" width="88" height="18" rx="3" fill="#1d1d23" stroke="#2c2c33" strokeWidth="1.5" />
        </Fill>
        <DrawPath d="M110 127 h56" w={2} color="#2c2c33" delay={0.55} />
        {/* audio track — bars dance while the playhead scrubs */}
        {EQ_HEIGHTS.map((h, i) => (
          <rect
            key={i}
            className="os-eq-bar"
            style={{ animationDelay: `${(i % 6) * 0.16}s` }}
            x={62 + i * 15}
            y={192 - h}
            width="6"
            height={h}
            rx="1.5"
            fill={i % 4 === 2 ? "#B51F32" : "#3a3a42"}
            opacity={i % 4 === 2 ? 0.85 : 1}
          />
        ))}
        <DrawPath d="M60 176 h216" w={1.5} color="#232329" delay={0.4} dash="3 4" />
        {/* playhead — drifts across the cut */}
        <g className="os-playhead">
          <Fill delay={0.4}>
            <path d="M150 44 L168 44 L159 58 Z" fill="#B51F32" />
          </Fill>
          <DrawPath d="M159 58 V192" w={2.5} color="#B51F32" delay={0.7} />
        </g>
        <DrawPath d="M44 200 h232" w={2} color="#232329" delay={0.35} />
      </g>
    </svg>
  );
}

function Masks() {
  return (
    <svg viewBox="0 0 320 240" className="os-art" aria-hidden="true">
      <defs>
        <linearGradient id="kg-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a20" />
          <stop offset="1" stopColor="#101015" />
        </linearGradient>
        <radialGradient id="kg-glow">
          <stop offset="0" stopColor="#B51F32" stopOpacity="0.22" />
          <stop offset="1" stopColor="#B51F32" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="208" rx="108" ry="9" fill="#050507" opacity="0.7" />
      <circle cx="160" cy="108" r="86" fill="url(#kg-glow)" className="os-glow" />
      {/* tragedy mask — drifts down */}
      <g className="os-float os-float--rev">
        <Fill delay={0}>
          <path
            d="M186 62 h84 v52 a42 42 0 0 1 -84 0 Z"
            fill="#101015"
            stroke="#26262c"
            strokeWidth="2.5"
            transform="rotate(7 228 108)"
          />
        </Fill>
        <DrawPath d="M206 92 l16 -5 M242 92 l16 -5" w={2.5} color="#3a3a42" delay={0.4} />
        <DrawPath d="M212 126 q18 -14 36 0" w={2.5} color="#B51F32" opacity={0.85} delay={0.6} />
      </g>
      {/* comedy mask — drifts up */}
      <g className="os-float">
        <Fill delay={0.15}>
          <path
            d="M74 82 h84 v52 a42 42 0 0 1 -84 0 Z"
            fill="url(#kg-front)"
            stroke="#2f2f36"
            strokeWidth="2.5"
            transform="rotate(-8 116 128)"
          />
        </Fill>
        <DrawPath d="M94 108 q8 -8 16 0 M130 108 q8 -8 16 0" w={2.5} color="#3a3a42" delay={0.6} />
        <DrawPath d="M98 138 q18 16 36 0" w={2.5} color="#B51F32" delay={0.8} />
      </g>
    </svg>
  );
}

const ART = { movies: Clapper, music: Mic, editing: Timeline, acting: Masks };

export default function SceneArt({ kind }) {
  const Component = ART[kind] || Clapper;
  return (
    <div className="os-art-wrap" data-testid={`offscript-art-${kind}`}>
      <Component />
    </div>
  );
}
