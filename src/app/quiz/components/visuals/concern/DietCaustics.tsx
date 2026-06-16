'use client';

/* ================================================================== */
/*  Q8 · D 飲食 — WARM HONEY CAUSTIC LIGHT (subtle refractive atmosphere) */
/*                                                                     */
/*  Renders OVER the warm glow pool but UNDER the rising bubbles. Soft  */
/*  warm light playing through honey — like sunlight refracting onto    */
/*  the floor of a warm pool. Whisper-soft atmosphere, never focal.     */
/*                                                                     */
/*    1. CAUSTIC RIBBONS (5) — thin, bright, soft-blurred wavy light    */
/*       lines drifting + undulating across the field. Baselines vary   */
/*       (upper / mid / lower) and slopes differ so a couple CROSS,     */
/*       reading as a caustic net rather than parallel stripes. Each    */
/*       undulates via a d-morph between two wave phases (IDENTICAL     */
/*       command structure, frame[0]===frame[last]) plus a slow x drift. */
/*       Periods 9–16s, desynced. opacity ≤0.22.                        */
/*    2. SOFT DAPPLES (6) — soft round light pools (radial glow→clear,  */
/*       blurred) scattered + slowly breathing opacity + drifting       */
/*       slightly, desynced. opacity ≤0.16.                             */
/*                                                                     */
/*  CONFIRM (~0.6s one-shot): the caustics brighten a touch — a warm    */
/*  shimmer ripples up — then settle. reduceMotion: every layer parked  */
/*  at a representative mid state (no undulation/drift/breathing).      */
/*  Deterministic only — no Math.random (Math.sin with constant args).  */
/* ================================================================== */

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, sn } from './concernShared';
import type { ConcernPartProps } from './concernShared';

const D = CONCERN.diet;

const CONFIRM_EASE: [number, number, number, number] = [0.32, 0.94, 0.4, 1];

/* ---- A caustic ribbon: a smooth open wavy stroke across the orb.
   `phase` shifts the wave so the two morph frames differ in shape while
   keeping IDENTICAL command structure (same point count → same C count). */
type Ribbon = {
  y: number; // baseline y
  slope: number; // overall tilt across the span (rise from left→right)
  amp: number; // wave amplitude
  waves: number; // number of crests across the span
  width: number; // stroke width
  color: string;
  op: number; // peak opacity (≤0.22)
  dx: number; // slow horizontal drift target
  dur: number;
  delay: number;
};

/* Span the ribbons are sampled across (kept within r≈180 of (200,200)). */
const X0 = 36;
const X1 = 364;
const SAMPLES = 8; // sample points → smooth cubic via Catmull-Rom

/* Constant ribbon set. Baselines spread across the orb (upper→lower),
   slopes + wave counts differ so a couple cross; all dur/delay distinct
   so the net never sways in unison. Brights mixed (glow / sparkle / hi). */
const RIBBONS: Ribbon[] = [
  { y: 132, slope: 26, amp: 12, waves: 1.6, width: 3.2, color: D.glow, op: 0.2, dx: 14, dur: 13.5, delay: 0.0 },
  { y: 176, slope: -30, amp: 15, waves: 2.1, width: 2.6, color: D.sparkle, op: 0.18, dx: -12, dur: 11.0, delay: 2.3 },
  { y: 214, slope: 20, amp: 11, waves: 1.4, width: 3.6, color: D.glow, op: 0.22, dx: 16, dur: 15.5, delay: 1.1 },
  { y: 252, slope: -22, amp: 14, waves: 1.9, width: 2.4, color: D.particleHi, op: 0.16, dx: -10, dur: 9.5, delay: 3.6 },
  { y: 288, slope: 16, amp: 13, waves: 1.3, width: 3.0, color: D.glow, op: 0.19, dx: 12, dur: 14.5, delay: 0.7 },
];

/* Soft round dapples — scattered light pools. Constant, desynced. ≤0.16. */
type Dapple = {
  cx: number;
  cy: number;
  r: number;
  op: number;
  dx: number;
  dy: number;
  dur: number;
  delay: number;
};

const DAPPLES: Dapple[] = [
  { cx: 128, cy: 150, r: 30, op: 0.15, dx: 8, dy: -6, dur: 9.0, delay: 0.0 },
  { cx: 268, cy: 132, r: 26, op: 0.12, dx: -7, dy: 5, dur: 11.5, delay: 1.8 },
  { cx: 196, cy: 198, r: 34, op: 0.16, dx: 6, dy: 7, dur: 13.0, delay: 3.2 },
  { cx: 102, cy: 248, r: 28, op: 0.13, dx: 9, dy: -5, dur: 10.5, delay: 2.4 },
  { cx: 300, cy: 232, r: 24, op: 0.11, dx: -8, dy: -7, dur: 12.5, delay: 4.1 },
  { cx: 232, cy: 290, r: 32, op: 0.14, dx: -6, dy: 8, dur: 8.5, delay: 1.2 },
];

/* Build a smooth open wavy path across [X0,X1] at baseline `y`, tilted by
   `slope`, undulating `waves` times with amplitude `amp`, offset by `phase`
   (radians). Catmull-Rom → cubic Bézier keeps a fixed command count so two
   frames with different `phase` can morph (identical structure). */
function ribbonPath(r: Ribbon, phase: number): string {
  const pts: [number, number][] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const x = X0 + (X1 - X0) * t;
    const wave = Math.sin(t * Math.PI * 2 * r.waves + phase);
    const y = r.y + r.slope * (t - 0.5) + r.amp * wave;
    pts.push([sn(x), sn(y)]);
  }

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 < pts.length ? i + 2 : pts.length - 1];
    // Catmull-Rom → cubic control points (tension = 1/6).
    const c1x = sn(p1[0] + (p2[0] - p0[0]) / 6);
    const c1y = sn(p1[1] + (p2[1] - p0[1]) / 6);
    const c2x = sn(p2[0] - (p3[0] - p1[0]) / 6);
    const c2y = sn(p2[1] - (p3[1] - p1[1]) / 6);
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export default function DietCaustics({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (n: string) => 'q8c-dietcaustic-' + n + '-' + uid;

  /* One-shot confirm easing (matches the family flare curve). */
  const flare = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: CONFIRM_EASE };

  return (
    <g aria-hidden="true">
      <defs>
        {/* Soft dapple glow — warm light pool fading to clear. */}
        <radialGradient id={id('dapple')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.85" />
          <stop offset="55%" stopColor={D.glow} stopOpacity="0.28" />
          <stop offset="100%" stopColor={D.glow} stopOpacity="0" />
        </radialGradient>

        {/* Soft blur for the thin light ribbons — gives them a refractive
            glow rather than a hard line. */}
        <filter id={id('bRibbon')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        {/* Heavier blur for the round dapples. */}
        <filter id={id('bDapple')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* ── Whole caustic layer fades in on entrance ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* ── Layer 1: soft round dapples (render behind the ribbons) ── */}
        {DAPPLES.map((p, i) => {
          const dappleAnimate = isConfirming
            ? { opacity: Math.min(0.16, p.op * 1.45), x: 0, y: 0, scale: 1.12 }
            : reduceMotion
              ? { opacity: p.op, x: 0, y: 0, scale: 1 }
              : {
                  opacity: [p.op * 0.55, p.op, p.op * 0.55],
                  x: [0, p.dx, 0],
                  y: [0, p.dy, 0],
                  scale: [0.96, 1.05, 0.96],
                };
          const dappleTransition: Transition = isConfirming
            ? flare(0.6)
            : loop(reduceMotion, p.dur, p.delay);
          return (
            <motion.circle
              key={'d' + i}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={`url(#${id('dapple')})`}
              filter={`url(#${id('bDapple')})`}
              initial={false}
              animate={dappleAnimate}
              transition={dappleTransition}
              style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
            />
          );
        })}

        {/* ── Layer 2: caustic ribbons (the crossing light net) ── */}
        {RIBBONS.map((r, i) => {
          // Two wave phases (identical command structure) → undulation morph.
          const dA = ribbonPath(r, 0);
          const dB = ribbonPath(r, Math.PI * 0.6);
          // Static representative mid-phase for reduced motion.
          const dMid = ribbonPath(r, Math.PI * 0.3);

          const ribbonAnimate = isConfirming
            ? { opacity: Math.min(0.22, r.op * 1.4), x: 0 }
            : reduceMotion
              ? { opacity: r.op * 0.85, x: 0 }
              : {
                  d: [dA, dB, dA],
                  opacity: [r.op * 0.55, r.op, r.op * 0.55],
                  x: [0, r.dx, 0],
                };
          const ribbonTransition: Transition = isConfirming
            ? flare(0.6)
            : loop(reduceMotion, r.dur, r.delay);

          return (
            <motion.path
              key={'r' + i}
              d={reduceMotion ? dMid : dA}
              fill="none"
              stroke={r.color}
              strokeWidth={r.width}
              strokeLinecap="round"
              filter={`url(#${id('bRibbon')})`}
              initial={false}
              animate={ribbonAnimate}
              transition={ribbonTransition}
            />
          );
        })}
      </motion.g>
    </g>
  );
}
