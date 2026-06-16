'use client';

/* ================================================================== */
/*  Q8 D「飲食」— RISING GOLDEN EFFERVESCENCE (hero).                   */
/*                                                                     */
/*  Premium, structured effervescence rising through the honey orb,     */
/*  in three tiers (+ a delicate surfacing accent):                     */
/*    1. BUBBLE STREAMS — 3 gentle champagne-like columns rising from   */
/*       low source points, staggered with NEGATIVE delays so each      */
/*       stream is already populated on mount → a continuous, soft      */
/*       rise of small bubbles that sway as they climb, taper smaller +  */
/*       fade slower as they rise, and a couple drift/merge subtly.     */
/*    2. SCATTERED MOTES — fine golden glints elsewhere (bright core +  */
/*       soft glow halo), rising + twinkling on desynced loops, denser   */
/*       low. (Kept from the previous version — reads well on amber.)    */
/*    3. FEATURE BUBBLES — a few larger refined bubbles (radial fill +   */
/*       bright rim + inner-shadow rim + specular dot + a faint second   */
/*       glint + refraction crescent), a couple behind a soft static     */
/*       blur for depth — glassy + rounded, never cartoonish.            */
/*    + SURFACE POPS — a few pop sites near the top of the streams: a    */
/*       thin ring scales up + fades over the last sliver of the bubble  */
/*       rise, on the same loop period — effervescence breaking surface. */
/*                                                                     */
/*  CONFIRM (~0.6s one-shot): a warm SURGE — every tier lifts higher +  */
/*  brightens once, and a small burst of pops fires near the top, then   */
/*  settles. reduceMotion: representative static mid state (pops shown    */
/*  as a couple of faint static rings). Deterministic only — no random.  */
/* ================================================================== */

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop } from './concernShared';
import type { ConcernPartProps } from './concernShared';

const D = CONCERN.diet;

const sn = (v: number) => +v.toFixed(1);

const CONFIRM_EASE: [number, number, number, number] = [0.32, 0.94, 0.4, 1];

/* ---------------------------------------------------------------- */
/*  TIER 1 — BUBBLE STREAMS                                          */
/*  3 columns, each a deterministic run of small bubbles climbing a   */
/*  swaying path from a low source. Negative delays pre-populate the  */
/*  stream so it reads as continuous on mount. swayAmp/swayPhase give  */
/*  each bubble a distinct lateral wiggle (Math.sin w/ constant args). */
/* ---------------------------------------------------------------- */
type Stream = {
  sx: number; // source x
  sy: number; // source y (low)
  count: number; // bubbles in the column
  dur: number; // time for one bubble to traverse
  rise: number; // total upward travel (negative dir handled in animate)
  swayAmp: number; // base lateral sway amplitude
  swayPhase: number; // phase offset so streams desync
};

const STREAMS: Stream[] = [
  { sx: 140, sy: 352, count: 6, dur: 8.6, rise: 250, swayAmp: 10, swayPhase: 0.0 },
  { sx: 208, sy: 350, count: 7, dur: 9.8, rise: 268, swayAmp: 8, swayPhase: 1.9 },
  { sx: 276, sy: 354, count: 6, dur: 9.0, rise: 244, swayAmp: 11, swayPhase: 3.7 },
];

/* Per-bubble within a stream: derive size + sway sign deterministically
   from indices so columns vary but never use randomness. */
function streamBubble(s: Stream, i: number) {
  const t = i / s.count;
  // small bubbles 1.5–3, slightly larger near the source, taper higher
  const r = sn(3 - t * 1.4 + (i % 2 === 0 ? 0.3 : 0));
  // as bubbles rise they get slightly smaller — a soft taper toward the top
  const rTop = sn(r * (0.66 - t * 0.12));
  // lateral sway: signed amplitude that alternates + drifts per stream
  const dir = Math.sin(s.swayPhase + i * 1.3) >= 0 ? 1 : -1;
  const amp = sn(s.swayAmp * (0.6 + 0.4 * Math.abs(Math.cos(s.swayPhase + i * 0.9))) * dir);
  // negative staggered delay so the whole column is already in flight
  const delay = sn(-(i * s.dur) / s.count);
  // every 3rd-ish bubble drifts a touch further sideways as it climbs — a
  // gentle "merge" wander toward its neighbour (deterministic by index).
  const drift = Math.sin(s.swayPhase * 1.7 + i * 2.1) > 0.55;
  // a soft second specular sits opposite the rim highlight on stream bubbles
  return { r, rTop, amp, delay, drift };
}

/* ---------------------------------------------------------------- */
/*  TIER 2 — SCATTERED MOTES                                         */
/*  Fine golden glints OUTSIDE the streams, denser low, twinkling on   */
/*  desynced loops. Bright core (sparkle/particleHi) + soft halo.      */
/* ---------------------------------------------------------------- */
type Mote = {
  cx: number;
  cy: number;
  r: number;
  dx: number;
  dy: number;
  dur: number;
  delay: number;
  peak: number;
  bright: boolean;
};

const MOTES: Mote[] = [
  { cx: 72, cy: 332, r: 1.6, dx: 10, dy: -168, dur: 9.4, delay: 0.0, peak: 0.7, bright: false },
  { cx: 110, cy: 308, r: 1.1, dx: -8, dy: -150, dur: 8.1, delay: 1.7, peak: 0.62, bright: true },
  { cx: 168, cy: 320, r: 1.3, dx: 6, dy: -154, dur: 8.8, delay: 3.2, peak: 0.66, bright: true },
  { cx: 244, cy: 326, r: 1.8, dx: 9, dy: -182, dur: 10.4, delay: 2.1, peak: 0.74, bright: false },
  { cx: 312, cy: 314, r: 1.0, dx: -11, dy: -146, dur: 7.6, delay: 4.0, peak: 0.6, bright: true },
  { cx: 332, cy: 338, r: 1.5, dx: 7, dy: -174, dur: 9.9, delay: 1.2, peak: 0.7, bright: false },
  { cx: 94, cy: 290, r: 0.9, dx: 13, dy: -138, dur: 7.2, delay: 5.1, peak: 0.55, bright: true },
  { cx: 178, cy: 286, r: 1.2, dx: 6, dy: -150, dur: 8.4, delay: 3.8, peak: 0.62, bright: true },
  { cx: 250, cy: 300, r: 1.1, dx: 8, dy: -144, dur: 7.8, delay: 4.6, peak: 0.6, bright: true },
  { cx: 300, cy: 346, r: 1.6, dx: -7, dy: -188, dur: 11.0, delay: 2.6, peak: 0.72, bright: false },
  { cx: 340, cy: 296, r: 1.0, dx: 11, dy: -148, dur: 7.4, delay: 5.6, peak: 0.58, bright: true },
  { cx: 60, cy: 320, r: 1.4, dx: -10, dy: -162, dur: 9.1, delay: 2.9, peak: 0.68, bright: false },
  { cx: 124, cy: 348, r: 1.7, dx: 9, dy: -190, dur: 11.6, delay: 0.6, peak: 0.74, bright: false },
  { cx: 188, cy: 348, r: 1.2, dx: -6, dy: -170, dur: 9.6, delay: 4.2, peak: 0.64, bright: true },
  { cx: 322, cy: 350, r: 1.7, dx: 7, dy: -192, dur: 11.4, delay: 0.2, peak: 0.74, bright: false },
];

/* ---------------------------------------------------------------- */
/*  TIER 3 — FEATURE BUBBLES                                         */
/*  A few larger soft bubbles rising slowly with wobble — refined      */
/*  rendering (rim + specular + refraction crescent). 2 sit behind a   */
/*  soft static blur for depth.                                       */
/* ---------------------------------------------------------------- */
type Bubble = {
  cx: number;
  cy: number;
  r: number;
  dx: number;
  dy: number;
  dur: number;
  delay: number;
  peak: number;
  blur: boolean;
};

const BUBBLES: Bubble[] = [
  { cx: 110, cy: 340, r: 13, dx: 9, dy: -200, dur: 14.5, delay: 0.8, peak: 0.5, blur: true },
  { cx: 240, cy: 348, r: 10, dx: -8, dy: -212, dur: 16.2, delay: 3.6, peak: 0.46, blur: false },
  { cx: 300, cy: 332, r: 16, dx: 7, dy: -188, dur: 13.4, delay: 1.8, peak: 0.42, blur: true },
  { cx: 176, cy: 330, r: 11, dx: -10, dy: -196, dur: 15.6, delay: 5.2, peak: 0.5, blur: false },
];

/* ---------------------------------------------------------------- */
/*  SURFACE POPS                                                     */
/*  A few sites near the TOP of the streams (where bubbles reach the   */
/*  upper field). Each is a thin ring that scales up + fades over the   */
/*  LAST sliver of a bubble's rise, on the SAME loop period as its      */
/*  stream so the pop recurs in sync with bubbles surfacing. Phase is   */
/*  the fraction of the period at which the pop fires (last ~12%).      */
/* ---------------------------------------------------------------- */
type Pop = {
  cx: number; // surface x (near a stream column, slightly desynced sideways)
  cy: number; // surface y (top of the rise band)
  r0: number; // starting ring radius
  dur: number; // matches the parent stream period
  delay: number; // negative so pops are already cycling on mount
  bright: boolean; // sparkle vs particleHi tint
};

/* Derived from the stream columns: each pop sits just below the top of a
   column's travel, nudged sideways so it doesn't sit dead-centre on the
   stream. The fire happens in the last ~12% of the cycle via keyframes. */
const POPS: Pop[] = (() => {
  const out: Pop[] = [];
  STREAMS.forEach((s, si) => {
    // top of this column's travel, pulled down a hair into the field
    const topY = sn(s.sy - s.rise * 0.9);
    // 1–2 pop sites per stream, offset sideways + phase-staggered
    const sites = si === 1 ? 2 : 1;
    for (let k = 0; k < sites; k++) {
      const side = Math.sin(s.swayPhase + k * 2.3) >= 0 ? 1 : -1;
      const offX = sn(s.swayAmp * (0.4 + 0.3 * k) * side);
      const offY = sn(-k * 18);
      // negative delay desyncs each pop within / across streams
      const delay = sn(-((si * 2.6 + k * 4.1) % s.dur));
      out.push({
        cx: sn(s.sx + offX),
        cy: sn(topY + offY),
        r0: sn(2.2 + (si % 2) * 0.6 + k * 0.4),
        dur: s.dur,
        delay,
        bright: (si + k) % 2 === 0,
      });
    }
  });
  return out;
})();

/* A short bright arc on the lower-inner edge of a bubble — the
   refraction crescent. Built from the radius so it scales with size. */
function crescentPath(cx: number, cy: number, r: number) {
  const rr = sn(r * 0.7);
  // arc swept across the lower-left quadrant
  const x1 = sn(cx - rr * 0.72);
  const y1 = sn(cy + rr * 0.28);
  const x2 = sn(cx - rr * 0.04);
  const y2 = sn(cy + rr * 0.76);
  return `M ${x1} ${y1} A ${rr} ${rr} 0 0 0 ${x2} ${y2}`;
}

export default function DietRising({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (n: string) => 'q8c-dietrise-' + n + '-' + uid;

  /* Render one refined feature bubble's static geometry. Layered for a
     glassy, rounded read: radial fill → bright rim → soft inner-shadow
     rim (gives roundness) → refraction crescent → main specular → a faint
     second tiny glint opposite the highlight. Soft, not cartoonish. */
  const featureBubble = (b: Bubble) => (
    <>
      <circle cx={b.cx} cy={b.cy} r={b.r} fill={`url(#${id('bub')})`} />
      {/* bright outer rim */}
      <circle
        cx={b.cx}
        cy={b.cy}
        r={b.r}
        fill="none"
        stroke={D.particleHi}
        strokeWidth="1"
        opacity="0.55"
      />
      {/* soft inner-shadow rim, pulled in a touch — reads as curved glass */}
      <circle
        cx={b.cx}
        cy={b.cy}
        r={sn(b.r * 0.86)}
        fill="none"
        stroke={D.deep}
        strokeWidth="0.7"
        opacity="0.2"
      />
      {/* faint refraction crescent on the lower-inner edge */}
      <path
        d={crescentPath(b.cx, b.cy, b.r)}
        fill="none"
        stroke={D.glow}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* specular highlight dot, offset up-left */}
      <circle
        cx={sn(b.cx - b.r * 0.34)}
        cy={sn(b.cy - b.r * 0.4)}
        r={sn(b.r * 0.16)}
        fill={D.sparkle}
        opacity="0.85"
      />
      {/* faint second glint, smaller, lower-right — completes the roundness */}
      <circle
        cx={sn(b.cx + b.r * 0.42)}
        cy={sn(b.cy + b.r * 0.22)}
        r={sn(b.r * 0.08)}
        fill={D.sparkle}
        opacity="0.4"
      />
    </>
  );

  /* Render one surface pop's animated ring. Fires only in the last sliver
     of the cycle (or as a burst on confirm). Kept to a single thin ring. */
  const popRing = (p: Pop, i: number) => {
    const popTransition: Transition = isConfirming
      ? { duration: 0.6, ease: CONFIRM_EASE }
      : loop(reduceMotion, p.dur, p.delay);
    const animate = isConfirming
      ? { scale: 2.0, opacity: [0, 0.5, 0] }
      : {
          // dormant for most of the cycle, then a quick expand + fade at the
          // very top (the last ~12%): scale 1 → 2.2, opacity 0.5 → 0.
          scale: [1, 1, 1, 2.2],
          opacity: [0, 0, 0.5, 0],
        };
    const popTimes = isConfirming ? undefined : [0, 0.88, 0.94, 1];
    return (
      <motion.circle
        key={'pop' + i}
        cx={p.cx}
        cy={p.cy}
        r={p.r0}
        fill="none"
        stroke={p.bright ? D.sparkle : D.particleHi}
        strokeWidth="0.8"
        initial={{ opacity: 0 }}
        animate={animate}
        transition={{ ...popTransition, ...(popTimes ? { times: popTimes } : {}) }}
        style={{ transformOrigin: `${p.cx}px ${p.cy}px`, transformBox: 'view-box' }}
      />
    );
  };

  /* ---------- reduced motion: representative static mid state ---------- */
  if (reduceMotion) {
    return (
      <g aria-hidden="true">
        <defs>
          <radialGradient id={id('bub')} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={D.glow} stopOpacity="0.95" />
            <stop offset="60%" stopColor={D.glow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={D.glow} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id('streamBub')} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={D.glow} stopOpacity="0.9" />
            <stop offset="70%" stopColor={D.glow} stopOpacity="0.32" />
            <stop offset="100%" stopColor={D.glow} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id('moteGlow')} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={D.sparkle} stopOpacity="0.95" />
            <stop offset="42%" stopColor={D.particleHi} stopOpacity="0.5" />
            <stop offset="100%" stopColor={D.particleHi} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Feature bubbles — mid-rise */}
        {BUBBLES.map((b, i) => {
          const cx = sn(b.cx + b.dx * 0.5);
          const cy = sn(b.cy + b.dy * 0.5);
          return (
            <g key={'b' + i} opacity={b.peak}>
              {featureBubble({ ...b, cx, cy })}
            </g>
          );
        })}

        {/* Streams — frozen as a static column of bubbles */}
        {STREAMS.map((s, si) =>
          Array.from({ length: s.count }).map((_, i) => {
            const sb = streamBubble(s, i);
            const prog = (i + 0.5) / s.count;
            const cy = sn(s.sy - s.rise * prog);
            const cx = sn(s.sx + sb.amp * Math.sin(prog * Math.PI * 1.6 + s.swayPhase));
            const op = sn(Math.min(0.85, 0.85 * (1 - prog) + 0.15));
            return (
              <g key={'sr' + si + '-' + i} opacity={op}>
                <circle cx={cx} cy={cy} r={sn(sb.r * 2.4)} fill={`url(#${id('streamBub')})`} />
                <circle cx={cx} cy={cy} r={sb.r} fill={`url(#${id('streamBub')})`} />
                <circle cx={cx} cy={cy} r={sb.r} fill="none" stroke={D.particleHi} strokeWidth="0.6" opacity="0.6" />
                <circle cx={sn(cx - sb.r * 0.32)} cy={sn(cy - sb.r * 0.36)} r={sn(sb.r * 0.22)} fill={D.sparkle} opacity="0.7" />
              </g>
            );
          })
        )}

        {/* Surface pops — a couple shown as faint static mid-expand rings */}
        {POPS.slice(0, 2).map((p, i) => (
          <circle
            key={'pop' + i}
            cx={p.cx}
            cy={p.cy}
            r={sn(p.r0 * 1.7)}
            fill="none"
            stroke={p.bright ? D.sparkle : D.particleHi}
            strokeWidth="0.8"
            opacity="0.32"
          />
        ))}

        {/* Scattered motes — mid-rise */}
        {MOTES.map((m, i) => {
          const cx = sn(m.cx + m.dx * 0.5);
          const cy = sn(m.cy + m.dy * 0.5);
          return (
            <g key={'m' + i} opacity={sn(Math.min(1, m.peak * 0.8))}>
              <circle cx={cx} cy={cy} r={sn(m.r * (m.bright ? 4.4 : 3.4))} fill={`url(#${id('moteGlow')})`} />
              <circle cx={cx} cy={cy} r={m.r} fill={m.bright ? D.sparkle : D.particleHi} />
            </g>
          );
        })}
      </g>
    );
  }

  return (
    <g aria-hidden="true">
      <defs>
        <radialGradient id={id('bub')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.95" />
          <stop offset="60%" stopColor={D.glow} stopOpacity="0.4" />
          <stop offset="100%" stopColor={D.glow} stopOpacity="0" />
        </radialGradient>
        {/* small stream-bubble fill — a soft warm core */}
        <radialGradient id={id('streamBub')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.9" />
          <stop offset="70%" stopColor={D.glow} stopOpacity="0.32" />
          <stop offset="100%" stopColor={D.glow} stopOpacity="0" />
        </radialGradient>
        {/* Warm glow halo behind each mote so it reads as a bright glint
            against the honey field (a flat dot washes out). */}
        <radialGradient id={id('moteGlow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.sparkle} stopOpacity="0.95" />
          <stop offset="42%" stopColor={D.particleHi} stopOpacity="0.5" />
          <stop offset="100%" stopColor={D.particleHi} stopOpacity="0" />
        </radialGradient>
        <filter id={id('soft')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* ============ TIER 1 — BUBBLE STREAMS (back) ============ */}
      {STREAMS.map((s, si) =>
        Array.from({ length: s.count }).map((_, i) => {
          const sb = streamBubble(s, i);
          const haloR = sn(sb.r * 2.4);
          const streamTransition: Transition = isConfirming
            ? { duration: 0.6, ease: CONFIRM_EASE }
            : loop(reduceMotion, s.dur, sb.delay);

          // sway keyframes along the rise — a gentle side-to-side wiggle.
          // drift bubbles wander a touch further sideways as they climb,
          // reading as a soft merge toward a neighbour.
          const swayMid = sn(sb.amp);
          const swayLate = sn(-sb.amp * (sb.drift ? 1.25 : 0.7));
          // taper: shrink toward the top so high bubbles read finer.
          const scaleTop = sn(sb.rTop / sb.r);
          const animate = isConfirming
            ? { x: sn(sb.amp * 0.6), y: sn(-s.rise * 0.5), scale: 1, opacity: 0.9 }
            : {
                x: [0, swayMid, sn(swayMid * (sb.drift ? 0.4 : 0.15)), swayLate],
                y: [0, sn(-s.rise * 0.35), sn(-s.rise * 0.7), -s.rise],
                scale: [1, sn(1 - (1 - scaleTop) * 0.45), sn(1 - (1 - scaleTop) * 0.78), scaleTop],
                // fade a little slower as it rises (higher mid/late hold)
                opacity: [0, 0.85, 0.66, 0],
              };

          return (
            <motion.g
              key={'sr' + si + '-' + i}
              initial={{ opacity: 0 }}
              animate={animate}
              transition={streamTransition}
              style={{ transformOrigin: `${s.sx}px ${s.sy}px`, transformBox: 'view-box' }}
            >
              {/* soft warm halo so the small bubble reads on amber */}
              <circle cx={s.sx} cy={s.sy} r={haloR} fill={`url(#${id('streamBub')})`} />
              {/* the bubble + a thin bright rim */}
              <circle cx={s.sx} cy={s.sy} r={sb.r} fill={`url(#${id('streamBub')})`} />
              <circle
                cx={s.sx}
                cy={s.sy}
                r={sb.r}
                fill="none"
                stroke={D.particleHi}
                strokeWidth="0.6"
                opacity="0.6"
              />
              {/* tiny specular on the stream bubble — a touch of glassiness */}
              <circle
                cx={sn(s.sx - sb.r * 0.32)}
                cy={sn(s.sy - sb.r * 0.36)}
                r={sn(sb.r * 0.22)}
                fill={D.sparkle}
                opacity="0.7"
              />
            </motion.g>
          );
        })
      )}

      {/* ============ SURFACE POPS (near top of streams) ============ */}
      {POPS.map((p, i) => popRing(p, i))}

      {/* ============ TIER 3 — FEATURE BUBBLES (mid) ============ */}
      {BUBBLES.map((b, i) => {
        const liftHi = sn(b.dy * 0.6);
        const swayHi = sn(b.dx * 1.4);
        const bubbleTransition: Transition = isConfirming
          ? { duration: 0.6, ease: CONFIRM_EASE }
          : loop(reduceMotion, b.dur, b.delay);

        const animate = isConfirming
          ? { x: swayHi, y: liftHi, scale: 1.14, opacity: Math.min(0.85, b.peak * 1.5) }
          : {
              x: [0, sn(b.dx * 0.5), b.dx, sn(b.dx * 0.3)],
              y: [0, sn(b.dy * 0.5), b.dy],
              scale: [0.92, 1.06, 0.98],
              opacity: [0, b.peak, b.peak * 0.7, 0],
            };

        const inner = (
          <motion.g initial={{ opacity: 0 }} animate={animate} transition={bubbleTransition}>
            {featureBubble(b)}
          </motion.g>
        );

        return b.blur ? (
          <g key={'b' + i} filter={`url(#${id('soft')})`}>
            {inner}
          </g>
        ) : (
          <g key={'b' + i}>{inner}</g>
        );
      })}

      {/* ============ TIER 2 — SCATTERED MOTES (front) ============ */}
      {MOTES.map((m, i) => {
        const liftHi = sn(m.dy * 1.2);
        const swayHi = sn(m.dx * 1.5);
        const moteTransition: Transition = isConfirming
          ? { duration: 0.6, ease: CONFIRM_EASE }
          : loop(reduceMotion, m.dur, m.delay);

        const animate = isConfirming
          ? { x: swayHi, y: liftHi, scale: 1.5, opacity: Math.min(1, m.peak * 1.6) }
          : {
              x: [0, sn(m.dx * 0.5), m.dx],
              y: [0, sn(m.dy * 0.5), m.dy],
              scale: [0.8, 1.15, 0.9],
              opacity: [0, m.peak, m.peak * 0.6, 0],
            };

        const haloR = sn(m.r * (m.bright ? 4.4 : 3.4));
        return (
          <motion.g
            key={'m' + i}
            initial={{ opacity: 0 }}
            animate={animate}
            transition={moteTransition}
          >
            {/* soft warm glow halo — makes the mote read as a glint */}
            <circle cx={m.cx} cy={m.cy} r={haloR} fill={`url(#${id('moteGlow')})`} />
            {/* bright core */}
            <circle cx={m.cx} cy={m.cy} r={sn(m.r)} fill={m.bright ? D.sparkle : D.particleHi} />
          </motion.g>
        );
      })}
    </g>
  );
}
