// Vintage 35mm projector drawn in the site's own visual language — but with
// real material depth: brushed-metal gradients, layered body panels, lens
// glass with a specular glint, a visible film thread running reel-to-reel,
// rivets, vents and a blinking recording lamp. The reels, crank and film
// mechanics spin while the projection is switched on (CSS-driven).

export default function CameraArt({ isOn }) {
  return (
    <div className={`tk-camera${isOn ? " is-on" : ""}`} data-testid="toolkit-camera">
      <div className="tk-camera-glow" aria-hidden="true" />
      <svg viewBox="0 0 320 348" className="tk-camera-svg" aria-hidden="true">
        <defs>
          <linearGradient id="tkg-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2c2c35" />
            <stop offset="0.42" stopColor="#1b1b22" />
            <stop offset="1" stopColor="#0d0d11" />
          </linearGradient>
          <linearGradient id="tkg-panel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#26262f" />
            <stop offset="1" stopColor="#101014" />
          </linearGradient>
          <linearGradient id="tkg-hood" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#25252e" />
            <stop offset="1" stopColor="#101015" />
          </linearGradient>
          <radialGradient id="tkg-reel">
            <stop offset="0" stopColor="#22222a" />
            <stop offset="0.72" stopColor="#141419" />
            <stop offset="1" stopColor="#0c0c10" />
          </radialGradient>
          <radialGradient id="tkg-glass" cx="0.38" cy="0.36" r="0.9">
            <stop offset="0" stopColor="#6a6a78" />
            <stop offset="0.45" stopColor="#20202a" />
            <stop offset="1" stopColor="#0a0a0e" />
          </radialGradient>
          <radialGradient id="tkg-hot">
            <stop offset="0" stopColor="#fff7e6" />
            <stop offset="0.5" stopColor="#e05563" />
            <stop offset="1" stopColor="#3a0e14" />
          </radialGradient>
          <radialGradient id="tkg-halo">
            <stop offset="0" stopColor="#ff5a68" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ff5a68" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ground shadow + tripod */}
        <ellipse cx="160" cy="338" rx="128" ry="7" fill="#050507" opacity="0.85" />
        <g stroke="#1c1c22" strokeWidth="9" strokeLinecap="round" fill="none">
          <line x1="144" y1="230" x2="84" y2="336" />
          <line x1="172" y1="230" x2="236" y2="336" />
          <line x1="158" y1="232" x2="158" y2="338" />
        </g>
        <g stroke="#26262d" strokeWidth="4" strokeLinecap="round" fill="none">
          <line x1="104" y1="288" x2="148" y2="270" />
          <line x1="212" y1="288" x2="168" y2="270" />
        </g>
        <rect x="76" y="336" width="16" height="6" rx="2" fill="#0d0d10" stroke="#2a2a31" strokeWidth="1" />
        <rect x="228" y="336" width="16" height="6" rx="2" fill="#0d0d10" stroke="#2a2a31" strokeWidth="1" />

        {/* mount */}
        <rect x="136" y="212" width="42" height="22" rx="4" fill="url(#tkg-panel)" stroke="#2e2e35" strokeWidth="1.5" />

        {/* film thread: reel A → gate → reel B (a real strip with sprockets) */}
        <g className="tk-film-path" aria-hidden="true">
          <path
            d="M121 112 C121 126, 128 130, 140 130 L192 130 C202 130, 208 122, 209 110 L210 92"
            fill="none" stroke="#15151a" strokeWidth="7" strokeLinecap="round"
          />
          <path
            d="M121 112 C121 126, 128 130, 140 130 L192 130 C202 130, 208 122, 209 110 L210 92"
            fill="none" stroke="#232329" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="3 6"
          />
        </g>

        {/* main body — layered panels for machined depth */}
        <rect x="72" y="122" width="162" height="90" rx="10" fill="url(#tkg-body)" stroke="#2f2f36" strokeWidth="2" />
        <line x1="76" y1="125.5" x2="230" y2="125.5" stroke="#3f3f48" strokeWidth="1.5" opacity="0.75" />
        <rect x="216" y="124" width="16" height="86" rx="8" fill="#0a0a0e" opacity="0.5" />
        {/* rivets */}
        <g fill="#0b0b0e" stroke="#34343c" strokeWidth="1">
          <circle cx="80" cy="130" r="2.2" />
          <circle cx="206" cy="130" r="2.2" />
          <circle cx="80" cy="204" r="2.2" />
          <circle cx="206" cy="204" r="2.2" />
        </g>
        {/* vent slots */}
        <g stroke="#26262c" strokeWidth="2.5" strokeLinecap="round">
          <line x1="192" y1="140" x2="224" y2="140" />
          <line x1="192" y1="149" x2="224" y2="149" />
          <line x1="192" y1="158" x2="224" y2="158" />
        </g>

        {/* viewfinder window with glass + reflection streak */}
        <rect x="84" y="136" width="56" height="34" rx="4" fill="#0a0a0e" stroke="#27272d" strokeWidth="1.5" />
        <path d="M92 166 L110 141" stroke="#3a3a42" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
        {/* REC lamp */}
        <circle className="tk-lamp" cx="97" cy="153" r="4.5" fill="#B51F32" opacity="0.4" />
        {/* label bars */}
        <rect x="112" y="147" width="24" height="3" rx="1.5" fill="#2c2c33" />
        <rect x="112" y="157" width="17" height="3" rx="1.5" fill="#2c2c33" />

        {/* dial */}
        <circle cx="212" cy="194" r="7" fill="#0d0d10" stroke="#3a3a42" strokeWidth="2" />
        <line x1="212" y1="189" x2="212" y2="193" stroke="#3a3a42" strokeWidth="1.5" />

        {/* viewfinder nub */}
        <rect x="50" y="130" width="24" height="19" rx="3" fill="url(#tkg-panel)" stroke="#2e2e35" strokeWidth="1.5" />

        {/* lens hood + glass */}
        <path d="M234 138 L266 124 L266 200 L234 186 Z" fill="url(#tkg-hood)" stroke="#2f2f36" strokeWidth="2" />
        <path d="M243 133 L243 191 M255 128 L255 196" stroke="#2c2c33" strokeWidth="1.5" fill="none" />
        <circle className="tk-lens-halo" cx="267" cy="162" r="22" fill="url(#tkg-halo)" />
        <circle className="tk-lens" cx="267" cy="162" r="12.5" fill="#0b0b0e" stroke="#B51F32" strokeWidth="2.5" />
        <circle className="tk-lens-core" cx="267" cy="162" r="8" fill="url(#tkg-glass)" />
        <circle className="tk-lens-core" cx="267" cy="162" r="4" fill="#3a3a44" />
        <circle cx="271" cy="158" r="1.8" fill="#ffffff" opacity="0.7" />        {/* crank (counter-rotates) */}
        <g className="tk-crank">
          <circle cx="62" cy="208" r="6.5" fill="#1d1d23" stroke="#3a3a42" strokeWidth="2" />
          <line x1="62" y1="208" x2="62" y2="186" stroke="#3a3a42" strokeWidth="4" strokeLinecap="round" />
          <circle cx="62" cy="186" r="3.5" fill="#B51F32" opacity="0.9" />
        </g>

        {/* reel mounts */}
        <rect x="110" y="106" width="22" height="18" fill="#16161b" />
        <rect x="196" y="98" width="22" height="26" fill="#16161b" />

        {/* reel A — supply */}
        <g className="tk-reel tk-reel--a">
          <circle cx="121" cy="66" r="44" fill="url(#tkg-reel)" stroke="#35353d" strokeWidth="2.5" />
          <circle cx="121" cy="66" r="39" fill="none" stroke="#3d3d46" strokeWidth="1.2" opacity="0.7" />
          <circle cx="121" cy="66" r="28" fill="#101015" stroke="#232329" strokeWidth="1.5" />
          <g stroke="#2c2c34" strokeWidth="5.5" strokeLinecap="round">
            <line x1="121" y1="80" x2="121" y2="106" />
            <line x1="133" y1="73" x2="156" y2="86" />
            <line x1="109" y1="73" x2="86" y2="86" />
            <line x1="133" y1="59" x2="156" y2="46" />
            <line x1="109" y1="59" x2="86" y2="46" />
          </g>
          <circle cx="121" cy="66" r="10" fill="#B51F32" />
          <circle cx="121" cy="66" r="5.5" fill="none" stroke="#7d1f2b" strokeWidth="1.2" />
          <circle cx="121" cy="66" r="3.5" fill="#0b0b0e" />
        </g>

        {/* reel B — take-up */}
        <g className="tk-reel tk-reel--b">
          <circle cx="210" cy="56" r="34" fill="url(#tkg-reel)" stroke="#35353d" strokeWidth="2.5" />
          <circle cx="210" cy="56" r="30" fill="none" stroke="#3d3d46" strokeWidth="1.2" opacity="0.7" />
          <circle cx="210" cy="56" r="20" fill="#101015" stroke="#232329" strokeWidth="1.5" />
          <g stroke="#2c2c34" strokeWidth="5" strokeLinecap="round">
            <line x1="210" y1="67" x2="210" y2="87" />
            <line x1="220" y1="61" x2="237" y2="71" />
            <line x1="200" y1="61" x2="183" y2="71" />
            <line x1="220" y1="51" x2="237" y2="41" />
            <line x1="200" y1="51" x2="183" y2="41" />
          </g>
          <circle cx="210" cy="56" r="8.5" fill="#B51F32" />
          <circle cx="210" cy="56" r="4.5" fill="none" stroke="#7d1f2b" strokeWidth="1.2" />
          <circle cx="210" cy="56" r="3" fill="#0b0b0e" />
        </g>
      </svg>
      <span className="tk-camera-tag">Harshal Projection Unit · 35mm</span>
    </div>
  );
}
