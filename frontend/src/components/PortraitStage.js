import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const PREVIEW_VIDEO_SRC = "/Introduction-Video-12-secs.mp4";
const TRAILER_VIDEO_SRC = "/Introduction-Video-Export-5.mp4";
const PREVIEW_LENGTH = 12; // seconds of the video that loop in the preview

// Netflix-style edge fade. The mask makes the video's edges transparent, so it
// dissolves into whatever is behind it (obsidian, the crimson glow, film grain)
// instead of ending in a visible rectangle. Two gradients (horizontal and
// vertical) are intersected; stops are eased so there is no visible banding.
const FADE_X =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 6%, rgba(0,0,0,0.3) 14%, rgba(0,0,0,0.65) 26%, rgba(0,0,0,0.9) 36%, #000 44%, #000 76%, rgba(0,0,0,0.6) 87%, rgba(0,0,0,0.2) 94%, transparent 100%)";
const FADE_Y =
  "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 6%, #000 18%, #000 62%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.15) 92%, transparent 100%)";
const FADE_MASK = {
  WebkitMaskImage: `${FADE_X}, ${FADE_Y}`,
  maskImage: `${FADE_X}, ${FADE_Y}`,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

export default function PortraitStage({ profile }) {
  const src = profile.portrait;
  const previewRef = useRef(null);
  const trailerRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [trailerMuted, setTrailerMuted] = useState(false);
  const [trailerTime, setTrailerTime] = useState(0);
  const [trailerDuration, setTrailerDuration] = useState(0);

  /* ---------- Preview: loop only the first 15 seconds ---------- */
  // `timeupdate` only fires ~4x/second, so the old version overshot the 15s
  // mark by up to 250ms. requestAnimationFrame checks every frame instead.
  useEffect(() => {
    const video = previewRef.current;
    if (!video) return undefined;

    let frame;
    const tick = () => {
      if (video.currentTime >= PREVIEW_LENGTH - 0.05) {
        video.currentTime = 0;
        if (video.paused && !video.ended) video.play().catch(() => {});
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [src]);

  /* ---------- Pause the preview while the full trailer is open ---------- */
  // Otherwise an unmuted preview keeps playing underneath and you hear two audio tracks.
  useEffect(() => {
    const video = previewRef.current;
    if (!video) return;
    if (trailerOpen) video.pause();
    else video.play().catch(() => {});
  }, [trailerOpen]);

  /* ---------- Trailer open/close side effects ---------- */
  useEffect(() => {
    const video = trailerRef.current;
    if (!trailerOpen || !video) return undefined;

    video.currentTime = 0;
    video.muted = false;
    setTrailerMuted(false);
    setTrailerTime(0);
    video.play().then(() => setTrailerPlaying(true)).catch(() => setTrailerPlaying(false));

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setTrailerOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock page scroll behind the modal

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [trailerOpen]);

  const togglePreviewSound = () => {
    const video = previewRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setSoundOn(!video.muted);
  };

  const toggleTrailerPlayback = () => {
    const video = trailerRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setTrailerPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setTrailerPlaying(false);
    }
  };

  const seekBy = (amount) => {
    const video = trailerRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(video.currentTime + amount, 0), video.duration || 0);
  };

  const toggleTrailerMute = () => {
    const video = trailerRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setTrailerMuted(video.muted);
  };

  const controlBtn =
    "text-paper/90 transition-colors hover:text-crimson-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper";

  /* ---------- Full trailer: rendered in a portal ---------- */
  // IMPORTANT: this used to render inside the portrait column. That column has
  // a framer-motion transform + clip-path, which turns `position: fixed` into
  // "fixed relative to the column" and clips it. Portalling to <body> makes the
  // modal truly full-screen.
  const trailerModal = trailerOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Introduction video trailer"
          onClick={(event) => {
            if (event.target === event.currentTarget) setTrailerOpen(false);
          }}
        >
          {/* Vertical (9:16) player: video fills it, controls overlay the bottom */}
          <div className="relative aspect-[9/16] h-[min(88vh,900px)] max-w-[94vw] overflow-hidden bg-black shadow-[0_24px_100px_rgba(0,0,0,0.8)]">
            <video
              ref={trailerRef}
              className="h-full w-full cursor-pointer bg-black object-contain"
              src={TRAILER_VIDEO_SRC}
              playsInline
              preload="auto"
              onClick={toggleTrailerPlayback}
              onLoadedMetadata={(event) => setTrailerDuration(event.currentTarget.duration)}
              onTimeUpdate={(event) => setTrailerTime(event.currentTarget.currentTime)}
              onPlay={() => setTrailerPlaying(true)}
              onPause={() => setTrailerPlaying(false)}
              onEnded={() => setTrailerPlaying(false)}
              data-testid="hero-trailer-video"
            />

            <button
              type="button"
              className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-paper/90 transition-colors hover:bg-crimson hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper"
              onClick={() => setTrailerOpen(false)}
              aria-label="Close trailer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Controls, stacked vertically: timeline on top, buttons below */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black/90 via-black/65 to-transparent px-5 pb-5 pt-14">
              <input
                type="range"
                min="0"
                max={trailerDuration || 0}
                step="0.1"
                value={trailerTime}
                onChange={(event) => {
                  const nextTime = Number(event.target.value);
                  if (trailerRef.current) trailerRef.current.currentTime = nextTime;
                  setTrailerTime(nextTime);
                }}
                aria-label="Trailer timeline"
                className="h-1 w-full cursor-pointer accent-[#b51f32]"
              />
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={toggleTrailerPlayback}
                  aria-label={trailerPlaying ? "Pause trailer" : "Play trailer"}
                  className={controlBtn}
                >
                  {trailerPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                <button type="button" onClick={() => seekBy(-10)} aria-label="Rewind 10 seconds" className={controlBtn}>
                  <RotateCcw className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => seekBy(10)} aria-label="Forward 10 seconds" className={controlBtn}>
                  <RotateCw className="h-5 w-5" />
                </button>
                <span className="text-[11px] tabular-nums text-paper/70">
                  {formatTime(trailerTime)} / {formatTime(trailerDuration)}
                </span>
                <button
                  type="button"
                  onClick={toggleTrailerMute}
                  aria-label={trailerMuted ? "Unmute trailer" : "Mute trailer"}
                  className={`ml-auto ${controlBtn}`}
                >
                  {trailerMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div className="group relative h-full w-full overflow-hidden">
      {/* Media layer: everything in here gets the edge-fade mask. inset-3 keeps the
          fully transparent edge of the mask inside the clip box even when the
          parallax drifts, so no bright sliver can show at the edges. */}
      <div className="absolute inset-3" style={FADE_MASK}>
        {src ? (
          <img
            src={src}
            alt={`Portrait of Harshal — ${profile.name} experience`}
            className="h-full w-full object-cover object-top"
            loading="eager"
          />
        ) : (
          <>
            <video
              ref={previewRef}
              className="h-full w-full object-cover object-center"
              src={PREVIEW_VIDEO_SRC}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              preload="auto"
              aria-label="Introduction video preview"
              data-testid="hero-introduction-video"
            />
            {/* Netflix-style dimming */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/50" />
          </>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgba(9,9,9,0.75)_100%)]"
        />
      </div>

      {/* Controls sit outside the masked layer, so they stay fully bright */}
      {!src && (
        <div className="absolute inset-x-0 bottom-8 flex items-center justify-between px-6 sm:px-10 lg:bottom-24 lg:px-12">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-paper bg-black/70 text-paper shadow-[0_4px_22px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-[background-color,color,transform] duration-200 hover:scale-105 hover:bg-paper hover:text-obsidian focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
            onClick={togglePreviewSound}
            aria-label={soundOn ? "Mute introduction video" : "Unmute introduction video"}
            aria-pressed={soundOn}
            data-testid="hero-video-mute-toggle"
          >
            {soundOn ? (
              <Volume2 className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
            ) : (
              <VolumeX className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="rounded-sm bg-crimson px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-paper shadow-[0_4px_22px_rgba(0,0,0,0.5)] transition-colors duration-300 hover:bg-crimson-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper"
            onClick={() => setTrailerOpen(true)}
            data-testid="hero-video-cta"
          >
            Watch Full Trailer
          </button>
        </div>
      )}

      {trailerModal}
    </div>
  );
}