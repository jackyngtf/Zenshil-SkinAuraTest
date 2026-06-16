'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, sn } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  B 情緒 — DRIFTING LIGHT MOTES + SOFT PETALS sub-layer (accent)       */
/*                                                                     */
/*  Soft rose-white motes carried on the emotional currents: they      */
/*  drift slowly up + sideways while twinkling, scattered across the    */
/*  orb (not clustered at a centre). A handful are brighter and carry a  */
/*  soft halo + a delicate 4-point glint. A faint fall of blossom — a    */
/*  few blurred petals — drifts up and rotates gently for premium       */
/*  texture. This is the delicate sparkle over the flowing veils.       */
/*                                                                     */
/*  HERO: each mote drifts on its own slow desynced loop, fading in/out  */
/*  so they shimmer out of sync; petals drift + rotate even slower.     */
/*  CONFIRM (~0.6s): every mote flares brighter + lifts a touch, petals  */
/*  brighten, then settle. reduceMotion: static at mid opacity.         */
/* ================================================================== */

const E = CONCERN.emotion;

/* Deterministic scatter. dx/dy = slow drift over the loop; `big` motes
   carry a soft halo + crossed glint. Constant arrays only — no Math.random. */
const MOTES = [
  { cx: 104, cy: 250, r: 1.9, dx: 8,   dy: -34, dur: 9.0,  delay: 0.0, peak: 0.88, big: true  },
  { cx: 156, cy: 308, r: 1.3, dx: -6,  dy: -28, dur: 11.0, delay: 1.6, peak: 0.68, big: false },
  { cx: 214, cy: 332, r: 1.5, dx: 10,  dy: -40, dur: 10.0, delay: 0.8, peak: 0.74, big: false },
  { cx: 286, cy: 296, r: 2.0, dx: -8,  dy: -32, dur: 12.0, delay: 2.4, peak: 0.9,  big: true  },
  { cx: 322, cy: 232, r: 1.2, dx: -10, dy: -26, dur: 10.5, delay: 1.0, peak: 0.64, big: false },
  { cx: 88,  cy: 176, r: 1.4, dx: 9,   dy: -30, dur: 11.5, delay: 3.0, peak: 0.7,  big: false },
  { cx: 178, cy: 150, r: 1.9, dx: 6,   dy: -24, dur: 9.5,  delay: 1.3, peak: 0.86, big: true  },
  { cx: 268, cy: 138, r: 1.2, dx: -7,  dy: -22, dur: 12.5, delay: 0.4, peak: 0.62, big: false },
  { cx: 330, cy: 168, r: 1.3, dx: -9,  dy: -28, dur: 10.0, delay: 2.0, peak: 0.66, big: false },
  { cx: 132, cy: 210, r: 1.3, dx: 7,   dy: -26, dur: 11.0, delay: 2.7, peak: 0.66, big: false },
  { cx: 240, cy: 220, r: 1.8, dx: -5,  dy: -30, dur: 9.8,  delay: 0.6, peak: 0.84, big: true  },
  { cx: 300, cy: 268, r: 1.1, dx: 8,   dy: -24, dur: 12.0, delay: 3.4, peak: 0.58, big: false },
  { cx: 196, cy: 264, r: 1.3, dx: 5,   dy: -32, dur: 10.7, delay: 1.9, peak: 0.7,  big: false },
  { cx: 360, cy: 208, r: 1.1, dx: -8,  dy: -22, dur: 11.8, delay: 2.2, peak: 0.6,  big: false },
] as const;

/* A faint blossom fall — soft blurred petals drifting up while rotating.
   fill alternates ringSoft / bloom; phase-offset so they never sync. */
const PETALS = [
  { cx: 128, cy: 300, s: 1.15, dx: 10,  dy: -54, dur: 16.0, delay: 0.0, peak: 0.26, fill: E.ringSoft, rot: [0, 8, -6, 0] as const },
  { cx: 262, cy: 326, s: 0.95, dx: -12, dy: -62, dur: 19.0, delay: 3.2, peak: 0.22, fill: E.bloom,    rot: [0, -7, 5, 0] as const },
  { cx: 312, cy: 252, s: 1.3,  dx: -8,  dy: -48, dur: 17.5, delay: 6.0, peak: 0.28, fill: E.ringSoft, rot: [0, 6, -9, 0] as const },
  { cx: 92,  cy: 214, s: 1.05, dx: 13,  dy: -58, dur: 20.0, delay: 9.0, peak: 0.2,  fill: E.bloom,    rot: [0, -5, 8, 0] as const },
] as const;

/* Small rounded teardrop/petal path, centred near (0,0), ~12px tall. */
const PETAL_PATH =
  'M0 -6 C 3.4 -4.6, 4.6 -1.2, 3.4 2.4 C 2.4 5.2, 0.9 6, 0 6 C -0.9 6, -2.4 5.2, -3.4 2.4 C -4.6 -1.2, -3.4 -4.6, 0 -6 Z';

export default function EmotionMotes({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (name: string) => `q8c-emomote-${name}-${uid}`;

  const surge = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

  return (
    <g aria-hidden="true">
      <defs>
        <radialGradient id={id('glow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={E.sparkle} stopOpacity="0.95" />
          <stop offset="55%" stopColor={E.core} stopOpacity="0.35" />
          <stop offset="100%" stopColor={E.sparkle} stopOpacity="0" />
        </radialGradient>
        <filter id={id('b3')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={id('b4')} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* Soft petals — faint blossom drift, rendered under the motes */}
      {PETALS.map((p) => {
        const animate = isConfirming
          ? { opacity: Math.min(0.4, p.peak + 0.12), x: p.dx * 0.3, y: -12, rotate: 0, scale: 1.12 }
          : reduceMotion
            ? { opacity: p.peak * 0.7, x: 0, y: 0, rotate: 0, scale: 1 }
            : {
                opacity: [0, p.peak, p.peak * 0.8, 0],
                x: [0, p.dx * 0.5, p.dx],
                y: [0, p.dy * 0.5, p.dy],
                rotate: [...p.rot],
                scale: [0.9, 1.06, 0.96],
              };
        const transition: Transition = isConfirming
          ? surge(0.6)
          : loop(reduceMotion, p.dur, p.delay);
        return (
          <motion.g
            key={`petal-${p.cx}-${p.cy}`}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 1 }}
            animate={animate}
            transition={transition}
            style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
          >
            <path
              d={PETAL_PATH}
              fill={p.fill}
              filter={`url(#${id('b4')})`}
              transform={`translate(${p.cx} ${p.cy}) scale(${sn(p.s)})`}
            />
          </motion.g>
        );
      })}

      {MOTES.map((m) => {
        const animate = isConfirming
          ? { opacity: Math.min(1, m.peak + 0.12), x: m.dx * 0.4, y: -10, scale: 1.3 }
          : reduceMotion
            ? { opacity: m.peak * 0.55, x: 0, y: 0, scale: 1 }
            : {
                opacity: [0, m.peak, m.peak * 0.5, 0],
                x: [0, m.dx * 0.5, m.dx],
                y: [0, m.dy * 0.5, m.dy],
                scale: [0.85, 1.1, 0.9],
              };
        const transition: Transition = isConfirming
          ? surge(0.6)
          : loop(reduceMotion, m.dur, m.delay);
        const glint = sn(m.r * 5);
        return (
          <motion.g
            key={`mote-${m.cx}-${m.cy}`}
            initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
            animate={animate}
            transition={transition}
            style={{ transformOrigin: `${m.cx}px ${m.cy}px` }}
          >
            {m.big && (
              <>
                <circle
                  cx={m.cx}
                  cy={m.cy}
                  r={sn(m.r * 4.5)}
                  fill={`url(#${id('glow')})`}
                  filter={`url(#${id('b3')})`}
                />
                {/* delicate 4-point glint — two thin crossed lines */}
                <line
                  x1={m.cx - glint}
                  y1={m.cy}
                  x2={m.cx + glint}
                  y2={m.cy}
                  stroke={E.sparkle}
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  opacity={0.7}
                />
                <line
                  x1={m.cx}
                  y1={m.cy - glint}
                  x2={m.cx}
                  y2={m.cy + glint}
                  stroke={E.sparkle}
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  opacity={0.7}
                />
              </>
            )}
            <circle cx={m.cx} cy={m.cy} r={sn(m.r)} fill={E.sparkle} />
          </motion.g>
        );
      })}
    </g>
  );
}
