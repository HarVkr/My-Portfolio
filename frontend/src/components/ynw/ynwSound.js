// WebAudio-synthesized sound design for the film-reel experience — no audio
// assets. A looped brown-noise bed becomes the reel whir (filter + gain follow
// spin speed), and short synthesized bursts give sprocket ticks, mechanical
// clunks, projection swells and shutter clicks. Everything silently no-ops
// until a user gesture unlocks the AudioContext, and fully when toggled off.

let ctx = null;
let master = null;
let whirSrc = null;
let whirFilter = null;
let whirGain = null;
let enabled = null;

function enabledCached() {
  if (enabled === null) {
    try {
      enabled = window.localStorage.getItem("ynw-sound") !== "off";
    } catch (e) {
      enabled = true;
    }
  }
  return enabled;
}

export function isSoundEnabled() {
  return enabledCached();
}

export function setSoundEnabled(v) {
  enabled = v;
  try {
    window.localStorage.setItem("ynw-sound", v ? "on" : "off");
  } catch (e) {
    /* private mode — flag lives in memory only */
  }
  if (master && ctx) {
    master.gain.setTargetAtTime(v ? 0.8 : 0, ctx.currentTime, 0.03);
  }
  if (v) ensureAudio();
  return v;
}

export function ensureAudio() {
  if (ctx || !enabledCached()) return ctx;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    master = ctx.createGain();
    master.gain.value = enabledCached() ? 0.8 : 0;
    master.connect(ctx.destination);

    // Reel whir: looped brown-ish noise → bandpass, driven by spin speed.
    const len = 2 * ctx.sampleRate;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.03 * w) / 1.03;
      d[i] = last * 3.2;
    }
    whirSrc = ctx.createBufferSource();
    whirSrc.buffer = buf;
    whirSrc.loop = true;
    whirFilter = ctx.createBiquadFilter();
    whirFilter.type = "bandpass";
    whirFilter.frequency.value = 500;
    whirFilter.Q.value = 1.6;
    whirGain = ctx.createGain();
    whirGain.gain.value = 0;
    whirSrc.connect(whirFilter);
    whirFilter.connect(whirGain);
    whirGain.connect(master);
    whirSrc.start();
  } catch (e) {
    ctx = null;
  }
  return ctx;
}

export function whir(intensity) {
  if (!ctx || !enabledCached()) return;
  const t = ctx.currentTime;
  whirGain.gain.setTargetAtTime(0.012 + intensity * 0.1, t, 0.06);
  whirFilter.frequency.setTargetAtTime(320 + intensity * 1250, t, 0.08);
  try {
    whirSrc.playbackRate.setTargetAtTime(0.55 + intensity * 1.5, t, 0.08);
  } catch (e) {
    /* playbackRate tuning is cosmetic */
  }
}

export function whirStop() {
  if (!ctx) return;
  whirGain.gain.setTargetAtTime(0, ctx.currentTime, 0.12);
}

function burst(opts) {
  if (!ctx || !enabledCached()) return;
  const { dur = 0.03, freq = 1800, type = "highpass", gain = 0.4, Q = 1 } = opts;
  const t = ctx.currentTime;
  const len = Math.max(1, Math.floor(dur * ctx.sampleRate));
  const b = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = ctx.createBufferSource();
  src.buffer = b;
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = Q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t);
  src.stop(t + dur + 0.02);
}

function thud(freq, dur, gain) {
  if (!ctx || !enabledCached()) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(freq, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * 0.55), t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export function sprocketTick(strength) {
  burst({ dur: 0.025, freq: 2100, gain: 0.14 + 0.2 * (strength || 0) });
}

export function clunk() {
  thud(80, 0.15, 0.4);
  burst({ dur: 0.05, freq: 500, type: "lowpass", gain: 0.22 });
}

// Projector motor: steady low whir + a gate flutter (an 11.5Hz LFO breathing
// on the whir gain) so the spinning reels are audible while the light is on.
let motorLfo = null;
let motorLfoGain = null;

export function motorStart() {
  if (!ctx || !enabledCached()) return;
  whir(0.16);
  if (motorLfo) return;
  try {
    motorLfo = ctx.createOscillator();
    motorLfo.type = "sine";
    motorLfo.frequency.value = 11.5;
    motorLfoGain = ctx.createGain();
    motorLfoGain.gain.value = 0.009;
    motorLfo.connect(motorLfoGain);
    motorLfoGain.connect(whirGain.gain);
    motorLfo.start();
  } catch (e) {
    motorLfo = null;
  }
}

export function motorStop() {
  whirStop();
  if (motorLfo) {
    try {
      motorLfo.stop();
      motorLfo.disconnect();
      motorLfoGain.disconnect();
    } catch (e) {
      /* already torn down */
    }
    motorLfo = null;
    motorLfoGain = null;
  }
}

function sweep(from, to, dur, gainV) {
  if (!ctx || !enabledCached()) return;
  const t = ctx.currentTime;
  const len = Math.floor(dur * ctx.sampleRate);
  const b = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = b;
  const f = ctx.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 1.4;
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gainV, t + dur * 0.3);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t);
  src.stop(t + dur + 0.02);
}

export function projectionSwell() {
  sweep(220, 2600, 0.55, 0.5);
  thud(58, 0.3, 0.32);
}

export function projectionCollapse() {
  sweep(1900, 260, 0.42, 0.36);
}

export function shutterClick() {
  burst({ dur: 0.02, freq: 2600, gain: 0.38 });
  setTimeout(() => burst({ dur: 0.025, freq: 1700, gain: 0.3 }), 65);
}

export function selectBlip() {
  if (!ctx || !enabledCached()) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = "triangle";
  o.frequency.setValueAtTime(660, t);
  o.frequency.exponentialRampToValueAtTime(880, t + 0.08);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.12, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t + 0.12);
}

export const reelSound = {
  ensure: ensureAudio,
  isEnabled: isSoundEnabled,
  setEnabled: setSoundEnabled,
  whir,
  whirStop,
  motorStart,
  motorStop,
  tick: sprocketTick,
  clunk,
  expand: projectionSwell,
  collapse: projectionCollapse,
  shutter: shutterClick,
  blip: selectBlip,
};
