'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import { RITUAL, loop, GrainOverlay, DustMote } from './ritualShared';
import type { RitualSceneProps } from './ritualShared';

/* ── Idle: 空白儀式空間 — a quiet, waiting stage lit by dawn ── */

const MOTES = [
  { cx: 122, cy: 152, dur: 11, delay: 0.4, drift: 9, r: 1.4 },
  { cx: 156, cy: 198, dur: 13, delay: 3.1, drift: -7, r: 1.1 },
  { cx: 98, cy: 228, dur: 12.2, delay: 5.6, drift: 8, r: 1.5 },
  { cx: 182, cy: 134, dur: 10.4, delay: 1.9, drift: 6, r: 1 },
  { cx: 140, cy: 254, dur: 12.8, delay: 7.2, drift: -6, r: 1.2 },
];

export default function RitualIdleScene({ reduceMotion }: RitualSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`q10x-idle-field-${uid}`} x1="0%" y1="0%" x2="62%" y2="100%">
          <stop offset="0%" stopColor="#fbf7ef" />
          <stop offset="55%" stopColor="#f3ecdf" />
          <stop offset="100%" stopColor="#e7dfcf" />
        </linearGradient>
        <linearGradient id={`q10x-idle-beam-${uid}`} x1="0%" y1="0%" x2="78%" y2="100%">
          <stop offset="0%" stopColor={RITUAL.dawnHi} stopOpacity="0.9" />
          <stop offset="70%" stopColor={RITUAL.dawnHi} stopOpacity="0.25" />
          <stop offset="100%" stopColor={RITUAL.dawnHi} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`q10x-idle-halo-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdf6e4" stopOpacity="0.7" />
          <stop offset="58%" stopColor="#f6ebd2" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#f6ebd2" stopOpacity="0" />
        </radialGradient>
        <filter id={`q10x-idle-b12-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={`q10x-idle-b6-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Field */}
      <rect width="400" height="400" fill={`url(#q10x-idle-field-${uid})`} />

      {/* Floor band, lower third */}
      <path
        d="M-10 314 C90 302 230 308 410 296 L410 400 L-10 400 Z"
        fill={RITUAL.greige}
        opacity="0.32"
        filter={`url(#q10x-idle-b6-${uid})`}
      />
      <path
        d="M-10 318 C110 308 260 312 410 302"
        stroke={RITUAL.deep}
        strokeWidth="1"
        opacity="0.12"
        fill="none"
      />

      {/* Dawn beam from the upper-left */}
      <motion.polygon
        points="-60,-20 130,-70 320,430 110,430"
        fill={`url(#q10x-idle-beam-${uid})`}
        filter={`url(#q10x-idle-b12-${uid})`}
        initial={{ opacity: 0 }}
        animate={reduceMotion ? { opacity: 0.14 } : { opacity: [0.1, 0.2, 0.1] }}
        transition={loop(reduceMotion, 9)}
      />

      {/* Center halo, breathing at rest tempo */}
      <motion.circle
        cx={200}
        cy={196}
        r={112}
        fill={`url(#q10x-idle-halo-${uid})`}
        initial={{ opacity: 0 }}
        animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.45, 0.8, 0.45] }}
        transition={loop(reduceMotion, 5.5)}
      />

      {/* Dust drifting in the beam */}
      {MOTES.map((m) => (
        <DustMote
          key={`idle-mote-${m.cx}-${m.cy}`}
          cx={m.cx}
          cy={m.cy}
          r={m.r}
          drift={m.drift}
          dur={m.dur}
          delay={m.delay}
          reduceMotion={reduceMotion}
        />
      ))}

      <GrainOverlay uid={uid} />
    </svg>
  );
}
