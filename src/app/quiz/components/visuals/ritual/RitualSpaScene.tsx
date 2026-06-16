'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import {
  RITUAL,
  loop,
  revealEase,
  GrainOverlay,
  ConfirmBloom,
  DustMote,
} from './ritualShared';
import type { RitualSceneProps } from './ritualShared';
import SpaDaybed from './spa/SpaDaybed';
import SpaStillLife from './spa/SpaStillLife';
import { ROOM } from './spa/spaRoom';

/* ── B 去按摩／Spa:「暖調鬆弛室」(Warm Spa Nook) ──
   Assembly (Tech-lead): a cosy candlelit spa corner lit by warm dawn from
   the upper-left — a soft round backlight, a linen daybed base with a peach
   throw, a neat stack of towels (Agent B) on the right, and the focal
   candle + steaming bowl + cherry-blossom still-life (Agent A) centre-left.
   Matches the locked A (window) and C (canopy) family: one quiet circular
   room, soft gradients, grain, and ONE clear hero — the rising steam.     */

const MOTES = [
  { cx: 92, cy: 140, dur: 12.6, delay: 1.3, drift: 7, r: 1.1 },
  { cx: 320, cy: 150, dur: 13.4, delay: 4.0, drift: -6, r: 1 },
  { cx: 300, cy: 300, dur: 11.6, delay: 6.2, drift: 5, r: 1.05 },
];

export default function RitualSpaScene({ isConfirming, reduceMotion }: RitualSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q10-sparoom-${name}-${uid}`;
  const b14 = `url(#${id('b14')})`;

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id('field')} x1="8%" y1="0%" x2="86%" y2="100%">
          <stop offset="0%" stopColor={ROOM.fieldHi} />
          <stop offset="54%" stopColor={ROOM.fieldMid} />
          <stop offset="100%" stopColor={ROOM.fieldLo} />
        </linearGradient>
        <radialGradient id={id('dawn')} cx="38%" cy="22%" r="64%">
          <stop offset="0%" stopColor={RITUAL.dawnHi} stopOpacity="0.9" />
          <stop offset="54%" stopColor={RITUAL.dawn} stopOpacity="0.32" />
          <stop offset="100%" stopColor={RITUAL.dawn} stopOpacity="0" />
        </radialGradient>
        {/* Soft round backlight (a warm sconce/mirror glow) behind the nook */}
        <radialGradient id={id('halo')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3df" stopOpacity="0.9" />
          <stop offset="46%" stopColor={ROOM.candleGlow} stopOpacity="0.3" />
          <stop offset="100%" stopColor={ROOM.candleGlow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('linen')} x1="16%" y1="6%" x2="84%" y2="100%">
          <stop offset="0%" stopColor={ROOM.blanket} />
          <stop offset="58%" stopColor="#f3e7d4" />
          <stop offset="100%" stopColor={ROOM.blanketLo} />
        </linearGradient>
        <linearGradient id={id('throw')} x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor={ROOM.throwHi} />
          <stop offset="100%" stopColor={ROOM.throwLo} />
        </linearGradient>
        {/* Soft warm curtain bleeding in from the right edge */}
        <linearGradient id={id('curtain')} x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#fbeede" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fbeede" stopOpacity="0" />
        </linearGradient>
        <filter id={id('b6')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={id('b14')} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* ── Layer 1: warm room + dawn light + round backlight ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.38, ease: revealEase }}>
        <rect width="400" height="400" fill={`url(#${id('field')})`} />
        <motion.ellipse
          cx={66}
          cy={52}
          rx={176}
          ry={132}
          fill={`url(#${id('dawn')})`}
          filter={b14}
          initial={false}
          animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.4, 0.62, 0.4] }}
          transition={loop(reduceMotion, 9.2)}
        />
        <motion.circle
          cx={168}
          cy={118}
          r={78}
          fill={`url(#${id('halo')})`}
          filter={b14}
          initial={false}
          animate={
            isConfirming
              ? { opacity: [0.4, 0.8, 0.55] }
              : reduceMotion
                ? { opacity: 0.42 }
                : { opacity: [0.32, 0.5, 0.32] }
          }
          transition={isConfirming ? { duration: 0.6, times: [0, 0.45, 1], ease: 'easeOut' } : loop(reduceMotion, 7.6, 0.4)}
        />
        {/* Curtain drape on the right */}
        <rect x={326} y={0} width={74} height={400} fill={`url(#${id('curtain')})`} />
      </motion.g>

      {/* ── Layer 2: the linen daybed base + a draped peach throw ── */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1, ease: revealEase }}>
        <ellipse cx={206} cy={332} rx={150} ry={26} fill={ROOM.deep} opacity={0.1} filter={b14} />
        <path
          d="M-10 300 C66 282 158 286 230 290 C300 294 352 290 410 296 L410 400 L-10 400 Z"
          fill={`url(#${id('linen')})`}
        />
        {/* Lit top edge of the linen */}
        <path
          d="M-10 300 C66 282 158 286 230 290 C300 294 352 290 410 296"
          fill="none"
          stroke="#fffaf1"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.6}
        />
        {/* A peach throw folded over the front of the bed (warm accent) */}
        <path
          d="M120 330 C170 312 250 312 314 330 C300 360 250 360 216 352 C190 346 150 352 120 330 Z"
          fill={`url(#${id('throw')})`}
          opacity={0.92}
        />
        <path
          d="M132 330 C180 318 252 318 304 330"
          fill="none"
          stroke="#f6dcc4"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.55}
        />
      </motion.g>

      {/* ── Layer 3: towels (Agent B), right ── */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, delay: 0.2, ease: revealEase }}>
        <SpaDaybed uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </motion.g>

      {/* ── Layer 4: candle + steaming bowl + blossom (Agent A), centre-left ── */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28, ease: revealEase }}>
        <SpaStillLife uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </motion.g>

      {/* ── Confirm payoff: a warm bloom over the nook ── */}
      <ConfirmBloom uid={uid} color="#f3d3a4" isConfirming={isConfirming} reduceMotion={reduceMotion} cx={200} cy={250} />

      {/* ── Atmosphere motes ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.44, ease: revealEase }}>
        {MOTES.map((m) => (
          <DustMote key={`spa-mote-${m.cx}-${m.cy}`} cx={m.cx} cy={m.cy} r={m.r} drift={m.drift} dur={m.dur} delay={m.delay} reduceMotion={reduceMotion} />
        ))}
      </motion.g>

      <GrainOverlay uid={uid} />
    </svg>
  );
}
