// Portrait stage for the featured hero.
// Renders the final portrait when `profile.portrait` is set; until then it
// shows a designed, replaceable placeholder with cinematic lighting.

export default function PortraitStage({ profile }) {
  const src = profile.portrait;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {src ? (
        <img
          src={src}
          alt={`Portrait of Harshal — ${profile.name} experience`}
          className="h-full w-full object-cover object-top"
          loading="eager"
        />
      ) : (
        <div
          className="relative h-full w-full bg-[linear-gradient(160deg,#131316_0%,#0b0b0d_55%,#101013_100%)]"
          data-testid="portrait-placeholder"
        >
          <div className="absolute left-[14%] top-[10%] h-[55%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(231,226,223,0.06),transparent_70%)] blur-xl" />
          <div className="absolute right-[4%] top-[14%] h-[70%] w-[36%] rounded-full bg-[radial-gradient(closest-side,rgba(181,31,50,0.3),rgba(211,59,76,0.1)_55%,transparent_75%)] blur-2xl" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="select-none font-display font-bold leading-none text-transparent"
              style={{
                fontSize: "clamp(9rem, 24vw, 20rem)",
                WebkitTextStroke: "1px rgba(231,226,223,0.16)",
              }}
              aria-hidden="true"
            >
              HV
            </span>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-6 left-8 right-8 top-auto sm:left-14 sm:right-14 lg:bottom-24"
          >
            <div className="flex items-center justify-between border-t border-line pt-3 text-[9px] uppercase tracking-[0.35em] text-ink-muted/60">
              <span>Portrait</span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-crimson" />
                Final asset pending
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px bg-gradient-to-b from-transparent via-lineStrong to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 right-6 top-6 w-px bg-gradient-to-b from-transparent via-crimson/30 to-transparent"
          />
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(9,9,9,0.75)_100%)]"
      />
    </div>
  );
}
