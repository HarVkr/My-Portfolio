// Vintage film projector drawn in the site's own visual language.
// The reels and crank spin while the projection is switched on.

export default function CameraArt({ isOn }) {
  return (
    <div className={`tk-camera${isOn ? " is-on" : ""}`} data-testid="toolkit-camera">
      <div className="tk-camera-glow" aria-hidden="true" />
      <svg viewBox="0 0 320 348" className="tk-camera-svg" aria-hidden="true">
        {/* tripod */}
        <g stroke="#232329" strokeWidth="9" strokeLinecap="round" fill="none">
          <line x1="144" y1="230" x2="84" y2="338" />
          <line x1="172" y1="230" x2="236" y2="338" />
          <line x1="158" y1="232" x2="158" y2="340" />
          <line x1="104" y1="288" x2="148" y2="270" />
          <line x1="212" y1="288" x2="168" y2="270" />
        </g>

        {/* mount + body */}
        <rect x="136" y="212" width="42" height="22" rx="4" fill="#1d1d23" stroke="#2e2e35" strokeWidth="1.5" />
        <rect x="72" y="122" width="162" height="90" rx="10" fill="#141419" stroke="#2f2f36" strokeWidth="2" />
        <rect x="84" y="136" width="56" height="34" rx="4" fill="#0e0e12" stroke="#27272d" strokeWidth="1.5" />
        <circle cx="97" cy="153" r="4.5" fill="#B51F32" opacity="0.85" />
        <rect x="112" y="147" width="24" height="3" rx="1.5" fill="#2c2c33" />
        <rect x="112" y="157" width="17" height="3" rx="1.5" fill="#2c2c33" />
        <circle cx="212" cy="194" r="7" fill="#0d0d10" stroke="#3a3a42" strokeWidth="2" />

        {/* viewfinder nub */}
        <rect x="50" y="130" width="24" height="19" rx="3" fill="#1d1d23" stroke="#2e2e35" strokeWidth="1.5" />

        {/* lens hood + glass */}
        <path d="M234 138 L266 124 L266 200 L234 186 Z" fill="#17171c" stroke="#2f2f36" strokeWidth="2" />
        <circle className="tk-lens" cx="267" cy="162" r="11" fill="#0b0b0e" stroke="#B51F32" strokeWidth="2.5" />
        <circle className="tk-lens-core" cx="267" cy="162" r="4.5" fill="#4a4a52" />

        {/* crank (counter-rotates) */}
        <g className="tk-crank">
          <circle cx="62" cy="208" r="6.5" fill="#1d1d23" stroke="#3a3a42" strokeWidth="2" />
          <line x1="62" y1="208" x2="62" y2="186" stroke="#3a3a42" strokeWidth="4" strokeLinecap="round" />
          <circle cx="62" cy="186" r="3.5" fill="#B51F32" opacity="0.9" />
        </g>

        {/* reel mounts */}
        <rect x="110" y="106" width="22" height="18" fill="#1d1d23" />
        <rect x="196" y="98" width="22" height="26" fill="#1d1d23" />

        {/* reel A */}
        <g className="tk-reel tk-reel--a">
          <circle cx="121" cy="66" r="44" fill="#101015" stroke="#35353d" strokeWidth="2.5" />
          <circle cx="121" cy="66" r="34" fill="none" stroke="#232329" strokeWidth="1.5" />
          <g stroke="#2c2c34" strokeWidth="5.5" strokeLinecap="round">
            <line x1="121" y1="80" x2="121" y2="106" />
            <line x1="133" y1="73" x2="156" y2="86" />
            <line x1="109" y1="73" x2="86" y2="86" />
            <line x1="133" y1="59" x2="156" y2="46" />
            <line x1="109" y1="59" x2="86" y2="46" />
          </g>
          <circle cx="121" cy="66" r="10" fill="#B51F32" />
          <circle cx="121" cy="66" r="3.5" fill="#0b0b0e" />
        </g>

        {/* reel B */}
        <g className="tk-reel tk-reel--b">
          <circle cx="210" cy="56" r="34" fill="#101015" stroke="#35353d" strokeWidth="2.5" />
          <circle cx="210" cy="56" r="26" fill="none" stroke="#232329" strokeWidth="1.5" />
          <g stroke="#2c2c34" strokeWidth="5" strokeLinecap="round">
            <line x1="210" y1="67" x2="210" y2="87" />
            <line x1="220" y1="61" x2="237" y2="71" />
            <line x1="200" y1="61" x2="183" y2="71" />
            <line x1="220" y1="51" x2="237" y2="41" />
            <line x1="200" y1="51" x2="183" y2="41" />
          </g>
          <circle cx="210" cy="56" r="8.5" fill="#B51F32" />
          <circle cx="210" cy="56" r="3" fill="#0b0b0e" />
        </g>
      </svg>
      <span className="tk-camera-tag">Harshal Projection Unit · 35mm</span>
    </div>
  );
}
