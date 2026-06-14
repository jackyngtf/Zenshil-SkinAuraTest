'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import {
  RITUAL,
  loop,
  revealEase,
  GrainOverlay,
  ConfirmBloom,
  DustMote,
} from './ritualShared';
import type { RitualSceneProps } from './ritualShared';

/* ================================================================== */
/*  C 去大自然: 仰望樹冠 — lying back, looking straight up through a   */
/*  canopy. Leaves crowd in from the frame edges (dense upper-left,   */
/*  sparse lower-right) around a pale ivory-sage sky opening at the   */
/*  center-right. Two god-ray bands cross the opening from the        */
/*  upper-left dawn light and slowly trade brightness as the canopy   */
/*  above shifts. Pollen drifts up through the rays.                  */
/* ================================================================== */

const sn = (v: number) => +v.toFixed(1);

const NATURE = {
  branch: '#44604c',
  vein: '#cfe0c2',
  rim: '#9db995',
  pollen: '#f6ecce',
} as const;

/* ── Leaf geometry ──
   One closed two-cubic path from a stem base (at the frame edge) to
   a tip pointing into the frame. `sway` swings the tip and bends the
   blade laterally; every keyframe shares the M-C-C-Z structure. */
type LeafShape = { f1: number; sh: number; f2: number };

const OVATE: LeafShape = { f1: 0.14, sh: 0.72, f2: 0.58 }; // broad, widest mid-blade
const SLENDER: LeafShape = { f1: 0.1, sh: 0.48, f2: 0.5 }; // narrow willow blade
const PADDLE: LeafShape = { f1: 0.3, sh: 0.55, f2: 0.8 }; // obovate, widest near tip

const leafD = (
  bx: number,
  by: number,
  tx: number,
  ty: number,
  w: number,
  shape: LeafShape,
  sway: number,
) => {
  const dx = tx - bx;
  const dy = ty - by;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const tipX = tx + px * sway;
  const tipY = ty + py * sway;
  const c1x = bx + dx * shape.f1 + px * w * shape.sh;
  const c1y = by + dy * shape.f1 + py * w * shape.sh;
  const c2x = bx + dx * shape.f2 + px * (w + sway * 0.5);
  const c2y = by + dy * shape.f2 + py * (w + sway * 0.5);
  const c3x = bx + dx * shape.f2 - px * (w - sway * 0.5);
  const c3y = by + dy * shape.f2 - py * (w - sway * 0.5);
  const c4x = bx + dx * shape.f1 - px * w * shape.sh;
  const c4y = by + dy * shape.f1 - py * w * shape.sh;
  return (
    `M${sn(bx)} ${sn(by)} ` +
    `C${sn(c1x)} ${sn(c1y)} ${sn(c2x)} ${sn(c2y)} ${sn(tipX)} ${sn(tipY)} ` +
    `C${sn(c3x)} ${sn(c3y)} ${sn(c4x)} ${sn(c4y)} ${sn(bx)} ${sn(by)} Z`
  );
};

/* Seamless sway loop: rest → +amp → rest → −0.55amp → rest */
const swayFrames = (
  bx: number,
  by: number,
  tx: number,
  ty: number,
  w: number,
  shape: LeafShape,
  amp: number,
) => [0, amp, 0, -amp * 0.55, 0].map((s) => leafD(bx, by, tx, ty, w, shape, s));

/* Midrib stopping short of the tip so the static vein stays inside
   the gently drifting blade. */
const veinD = (bx: number, by: number, tx: number, ty: number) => {
  const dx = tx - bx;
  const dy = ty - by;
  const len = Math.hypot(dx, dy) || 1;
  const mx = bx + dx * 0.42 + (-dy / len) * 2.5;
  const my = by + dy * 0.42 + (dx / len) * 2.5;
  return `M${sn(bx)} ${sn(by)} Q${sn(mx)} ${sn(my)} ${sn(bx + dx * 0.8)} ${sn(by + dy * 0.8)}`;
};

/* ── Composition: sky opening sits center-right at ~(242,174) ── */

/* Near canopy — deepest tone, d-morph sway + the largest drift.
   `out` is the one-shot confirm offset, pointing away from the opening. */
const NEAR_LEAVES = [
  {
    id: 'n1',
    frames: swayFrames(22, 12, 148, 122, 36, OVATE, 5),
    morphDur: 7.6,
    morphDelay: 0.2,
    drift: [4.5, 3],
    driftDur: 8.1,
    driftDelay: 0.7,
    out: [-10, -7],
  },
  {
    id: 'n2',
    frames: swayFrames(-12, 168, 116, 200, 30, OVATE, 4.5),
    morphDur: 8.8,
    morphDelay: 1.4,
    drift: [4, 2.6],
    driftDur: 7.4,
    driftDelay: 2.8,
    out: [-12, -1],
  },
  {
    id: 'n3',
    frames: swayFrames(88, 416, 150, 306, 28, OVATE, 4),
    morphDur: 6.6,
    morphDelay: 2.6,
    drift: [3.6, 4.2],
    driftDur: 8.9,
    driftDelay: 0.3,
    out: [-7, 10],
  },
];

/* Mid canopy — sage tone, x/y wind drift, lighter than the near layer */
const MID_LEAVES = [
  {
    id: 'm1',
    d: leafD(192, -16, 228, 88, 14, SLENDER, 0),
    vein: veinD(192, -16, 228, 88),
    drift: [3.4, 2],
    driftDur: 7.1,
    driftDelay: 0.9,
    out: [-2, -8],
  },
  {
    id: 'm2',
    d: leafD(52, 76, 152, 106, 13, SLENDER, 0),
    vein: veinD(52, 76, 152, 106),
    drift: [3, 2.6],
    driftDur: 6.9,
    driftDelay: 3.3,
    out: [-7, -4],
  },
  {
    id: 'm3',
    d: leafD(50, 92, 138, 152, 15, SLENDER, 0),
    vein: veinD(50, 92, 138, 152),
    drift: [2.4, 3.2],
    driftDur: 7.8,
    driftDelay: 0.5,
    out: [-8, -2],
  },
  {
    id: 'm4',
    d: leafD(398, 342, 322, 300, 19, PADDLE, 0),
    vein: veinD(398, 342, 322, 300),
    drift: [-2.6, 2],
    driftDur: 9.1,
    driftDelay: 2.1,
    out: [5, 6],
  },
];

/* Far canopy — blurred pale masses hugging the rim, smallest drift */
const FAR_MASSES = [
  { id: 'f1', cx: 78, cy: 42, rx: 120, ry: 64, rot: -24, peak: [0.42, 0.56, 0.42], bob: 3, dur: 9.4, delay: 0.6 },
  { id: 'f2', cx: 208, cy: -8, rx: 96, ry: 52, rot: 8, peak: [0.32, 0.46, 0.32], bob: 2.4, dur: 8.6, delay: 2.3 },
  { id: 'f3', cx: 352, cy: 64, rx: 88, ry: 56, rot: 28, peak: [0.3, 0.42, 0.3], bob: 2.8, dur: 10.2, delay: 4.1 },
  { id: 'f4', cx: 16, cy: 300, rx: 80, ry: 56, rot: -38, peak: [0.26, 0.38, 0.26], bob: 2.6, dur: 9.9, delay: 1.7 },
];

/* Faintest branch hints tying the clusters to the frame edges */
const BRANCHES = [
  'M-14 52 Q28 66 54 84',
  'M20 -12 Q40 38 52 78',
  'M410 352 Q384 348 358 332',
];

/* God-ray bands slanting down-right from the upper-left light */
const RAY_A = '60,-40 138,-40 396,440 312,440';
const RAY_B = '148,-40 196,-40 332,440 272,440';

/* Pollen rising through the opening — every dur+delay pair unique */
const POLLEN = [
  { cx: 150, cy: 244, r: 1.4, drift: 8, rise: 44, dur: 10.6, delay: 0.3 },
  { cx: 205, cy: 272, r: 1.1, drift: -6, rise: 50, dur: 11.8, delay: 2.2 },
  { cx: 243, cy: 212, r: 1.5, drift: 7, rise: 40, dur: 12.6, delay: 4.4 },
  { cx: 272, cy: 252, r: 1.2, drift: 9, rise: 54, dur: 13.4, delay: 6.1 },
  { cx: 188, cy: 182, r: 1, drift: -5, rise: 36, dur: 9.8, delay: 1.1 },
  { cx: 262, cy: 150, r: 1.3, drift: 6, rise: 34, dur: 12.1, delay: 3.5 },
  { cx: 226, cy: 302, r: 1.2, drift: -7, rise: 48, dur: 10.9, delay: 5.2 },
];

export default function RitualNatureScene({ isConfirming, reduceMotion }: RitualSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  /* Entrance stagger: backdrop → rays → mid → near, done by 700ms */
  const enter = (delay: number, dur = 0.45): Transition => ({
    duration: reduceMotion ? 0 : dur,
    delay: reduceMotion ? 0 : delay,
    ease: [...revealEase],
  });

  const confirmOut: Transition = { duration: 0.6, ease: 'easeOut' };

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Sky: sage-shaded under the dense corner, palest at the opening */}
        <linearGradient id={`q10x-nature-sky-${uid}`} x1="0%" y1="0%" x2="92%" y2="58%">
          <stop offset="0%" stopColor="#e7ecd6" />
          <stop offset="48%" stopColor="#f4f2e2" />
          <stop offset="100%" stopColor="#fcf8ea" />
        </linearGradient>
        <radialGradient id={`q10x-nature-open-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdf9e7" stopOpacity="0.85" />
          <stop offset="55%" stopColor={RITUAL.dawnHi} stopOpacity="0.3" />
          <stop offset="100%" stopColor={RITUAL.dawnHi} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`q10x-nature-ray-${uid}`} x1="0%" y1="0%" x2="22%" y2="100%">
          <stop offset="0%" stopColor="#fdf4d9" stopOpacity="0.9" />
          <stop offset="45%" stopColor={RITUAL.dawn} stopOpacity="0.34" />
          <stop offset="82%" stopColor={RITUAL.dawn} stopOpacity="0" />
        </linearGradient>
        {/* Leaf faces toward the upper-left light are lighter */}
        <linearGradient id={`q10x-nature-leafnear-${uid}`} x1="0%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stopColor={RITUAL.accent.nature} />
          <stop offset="45%" stopColor="#4d6a55" />
          <stop offset="100%" stopColor="#36503f" />
        </linearGradient>
        <linearGradient id={`q10x-nature-leafmid-${uid}`} x1="0%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stopColor="#a9c2a4" />
          <stop offset="50%" stopColor={RITUAL.accent.nature} />
          <stop offset="100%" stopColor="#5e7d65" />
        </linearGradient>
        <linearGradient id={`q10x-nature-leaffar-${uid}`} x1="0%" y1="0%" x2="75%" y2="100%">
          <stop offset="0%" stopColor="#cdd9c0" />
          <stop offset="100%" stopColor="#adc1a4" />
        </linearGradient>
        <filter id={`q10x-nature-b14-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`q10x-nature-b7-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <rect width="400" height="400" fill={`url(#q10x-nature-sky-${uid})`} />

      {/* ── Backdrop: far canopy, branch hints, sky opening ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter(0)}>
        {FAR_MASSES.map((m) => (
          <g key={m.id} transform={`rotate(${m.rot} ${m.cx} ${m.cy})`}>
            <motion.ellipse
              cx={m.cx}
              cy={m.cy}
              rx={m.rx}
              ry={m.ry}
              fill={`url(#q10x-nature-leaffar-${uid})`}
              filter={`url(#q10x-nature-b7-${uid})`}
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: (m.peak[0] + m.peak[1]) / 2, y: 0 }
                  : { opacity: m.peak, y: [0, m.bob, 0] }
              }
              transition={loop(reduceMotion, m.dur, m.delay)}
            />
          </g>
        ))}

        <motion.g
          initial={false}
          animate={reduceMotion ? { opacity: 0.13 } : { opacity: [0.1, 0.16, 0.1] }}
          transition={loop(reduceMotion, 11.3, 1.2)}
        >
          {BRANCHES.map((d) => (
            <path key={d} d={d} fill="none" stroke={NATURE.branch} strokeWidth="1.3" strokeLinecap="round" />
          ))}
        </motion.g>

        {/* The opening itself breathes; on confirm the sky brightens */}
        <motion.ellipse
          cx={242}
          cy={174}
          rx={124}
          ry={100}
          fill={`url(#q10x-nature-open-${uid})`}
          initial={false}
          animate={
            isConfirming
              ? { opacity: 0.95 }
              : reduceMotion
                ? { opacity: 0.62 }
                : { opacity: [0.5, 0.75, 0.5] }
          }
          transition={isConfirming ? { duration: 0.5, ease: 'easeOut' } : loop(reduceMotion, 7.2)}
        />
      </motion.g>

      {/* ── God rays: the hero — one brightens while the other dims ── */}
      <motion.g initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.12, 0.5)}>
        <motion.polygon
          points={RAY_A}
          fill={`url(#q10x-nature-ray-${uid})`}
          filter={`url(#q10x-nature-b14-${uid})`}
          initial={false}
          animate={
            isConfirming
              ? { opacity: 0.62, x: 0 }
              : reduceMotion
                ? { opacity: 0.3, x: 0 }
                : { opacity: [0.36, 0.12, 0.36], x: [0, 8, 0] }
          }
          transition={isConfirming ? { duration: 0.55, ease: 'easeOut' } : loop(reduceMotion, 8.2)}
        />
        <motion.polygon
          points={RAY_B}
          fill={`url(#q10x-nature-ray-${uid})`}
          filter={`url(#q10x-nature-b14-${uid})`}
          initial={false}
          animate={
            isConfirming
              ? { opacity: 0.52, x: 0 }
              : reduceMotion
                ? { opacity: 0.22, x: 0 }
                : { opacity: [0.1, 0.32, 0.1], x: [0, -6, 0] }
          }
          transition={isConfirming ? { duration: 0.6, ease: 'easeOut' } : loop(reduceMotion, 8.2, 0.4)}
        />
      </motion.g>

      {/* Confirm: a warm wash brightens the sky behind the canopy */}
      <motion.rect
        width="400"
        height="400"
        fill="#fdf8e4"
        initial={false}
        animate={{ opacity: isConfirming ? 0.26 : 0 }}
        transition={{ duration: isConfirming ? 0.5 : 0.35, ease: 'easeOut' }}
      />

      {/* ── Mid canopy: slender + paddle blades riding the wind ── */}
      <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.18, 0.48)}>
        {MID_LEAVES.map((leaf) => (
          <motion.g
            key={leaf.id}
            initial={false}
            animate={
              isConfirming
                ? { x: leaf.out[0], y: leaf.out[1] }
                : reduceMotion
                  ? { x: 0, y: 0 }
                  : { x: [0, leaf.drift[0], 0], y: [0, leaf.drift[1], 0] }
            }
            transition={isConfirming ? confirmOut : loop(reduceMotion, leaf.driftDur, leaf.driftDelay)}
          >
            <path d={leaf.d} fill={`url(#q10x-nature-leafmid-${uid})`} />
            <path d={leaf.vein} fill="none" stroke={NATURE.vein} strokeWidth="1" opacity="0.35" />
          </motion.g>
        ))}
      </motion.g>

      {/* ── Near canopy: deep broad blades, swaying d-morphs ── */}
      <motion.g initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.26, 0.44)}>
        {NEAR_LEAVES.map((leaf) => (
          <motion.g
            key={leaf.id}
            initial={false}
            animate={
              isConfirming
                ? { x: leaf.out[0], y: leaf.out[1] }
                : reduceMotion
                  ? { x: 0, y: 0 }
                  : { x: [0, leaf.drift[0], 0], y: [0, leaf.drift[1], 0] }
            }
            transition={isConfirming ? confirmOut : loop(reduceMotion, leaf.driftDur, leaf.driftDelay)}
          >
            <motion.path
              d={leaf.frames[0]}
              fill={`url(#q10x-nature-leafnear-${uid})`}
              stroke={NATURE.rim}
              strokeOpacity="0.16"
              strokeWidth="1"
              initial={false}
              animate={reduceMotion ? { d: leaf.frames[0] } : { d: leaf.frames }}
              transition={loop(reduceMotion, leaf.morphDur, leaf.morphDelay)}
            />
          </motion.g>
        ))}
      </motion.g>

      {/* Pollen drifting upward through the rays */}
      {POLLEN.map((p) => (
        <DustMote
          key={`pollen-${p.cx}-${p.cy}`}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          drift={p.drift}
          rise={p.rise}
          dur={p.dur}
          delay={p.delay}
          color={NATURE.pollen}
          reduceMotion={reduceMotion}
        />
      ))}

      <ConfirmBloom
        uid={uid}
        color={RITUAL.dawnHi}
        isConfirming={isConfirming}
        reduceMotion={reduceMotion}
        cx={242}
        cy={176}
      />

      <GrainOverlay uid={uid} />
    </svg>
  );
}
