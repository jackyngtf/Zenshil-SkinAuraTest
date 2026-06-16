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
import VanityMirror from './facial/VanityMirror';
import VanityProducts from './facial/VanityProducts';
import { FROOM, COUNTER_Y } from './facial/facialRoom';

/* ── D 做 Facial＋Reset:「煥膚梳妝角」(Facial Vanity) ──
   Assembly (Tech-lead): a warm blush vanity corner lit by dawn from the
   upper-left — a glowing round mirror (Agent B) as the clear focal, a rose
   sprig beside it, and skincare products on the counter (Agent A): a serum
   dropper releasing a drop (the hero), product bottles, a cream jar.
   Matches the locked A (window) / C (canopy) and the new B (spa nook):
   one quiet circular room, soft gradients, grain, one clear hero motion. */

const MOTES = [
  { cx: 96, cy: 150, dur: 12.4, delay: 1.2, drift: 7, r: 1.1 },
  { cx: 314, cy: 250, dur: 13.2, delay: 4.0, drift: -6, r: 1 },
  { cx: 120, cy: 300, dur: 11.6, delay: 6.0, drift: 5, r: 1.05 },
];

export default function RitualFacialScene({ isConfirming, reduceMotion }: RitualSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q10-facroom-${name}-${uid}`;
  const b14 = `url(#${id('b14')})`;

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id('field')} x1="10%" y1="0%" x2="84%" y2="100%">
          <stop offset="0%" stopColor={FROOM.fieldHi} />
          <stop offset="54%" stopColor={FROOM.fieldMid} />
          <stop offset="100%" stopColor={FROOM.fieldLo} />
        </linearGradient>
        <radialGradient id={id('dawn')} cx="36%" cy="22%" r="64%">
          <stop offset="0%" stopColor={RITUAL.dawnHi} stopOpacity="0.88" />
          <stop offset="54%" stopColor={RITUAL.dawn} stopOpacity="0.3" />
          <stop offset="100%" stopColor={RITUAL.dawn} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('counter')} x1="14%" y1="0%" x2="86%" y2="100%">
          <stop offset="0%" stopColor={FROOM.counter} />
          <stop offset="60%" stopColor="#f4e3d9" />
          <stop offset="100%" stopColor={FROOM.counterLo} />
        </linearGradient>
        <linearGradient id={id('blushwash')} x1="100%" y1="100%" x2="20%" y2="0%">
          <stop offset="0%" stopColor={FROOM.blush} stopOpacity="0.18" />
          <stop offset="100%" stopColor={FROOM.blush} stopOpacity="0" />
        </linearGradient>
        <filter id={id('b14')} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* ── Layer 1: warm blush room + dawn light ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.38, ease: revealEase }}>
        <rect width="400" height="400" fill={`url(#${id('field')})`} />
        <motion.ellipse
          cx={62}
          cy={50}
          rx={176}
          ry={132}
          fill={`url(#${id('dawn')})`}
          filter={b14}
          initial={false}
          animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.4, 0.6, 0.4] }}
          transition={loop(reduceMotion, 9.2)}
        />
        {/* a whisper of blush settling lower-right */}
        <rect width="400" height="400" fill={`url(#${id('blushwash')})`} />
      </motion.g>

      {/* ── Layer 2: the round mirror + roses (behind the products) ── */}
      <motion.g initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1, ease: revealEase }} style={{ transformOrigin: '250px 142px' }}>
        <VanityMirror uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </motion.g>

      {/* ── Layer 3: the vanity counter the products stand on ── */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18, ease: revealEase }}>
        <ellipse cx={200} cy={COUNTER_Y + 30} rx={170} ry={24} fill={FROOM.deep} opacity={0.08} filter={b14} />
        <path
          d={`M-10 ${COUNTER_Y + 4} C80 ${COUNTER_Y - 4} 210 ${COUNTER_Y - 2} 320 ${COUNTER_Y} C360 ${COUNTER_Y + 1} 390 ${COUNTER_Y + 2} 410 ${COUNTER_Y + 4} L410 400 L-10 400 Z`}
          fill={`url(#${id('counter')})`}
        />
        <path
          d={`M-10 ${COUNTER_Y + 4} C80 ${COUNTER_Y - 4} 210 ${COUNTER_Y - 2} 320 ${COUNTER_Y} C360 ${COUNTER_Y + 1} 390 ${COUNTER_Y + 2} 410 ${COUNTER_Y + 4}`}
          fill="none"
          stroke="#fffaf4"
          strokeWidth={2.6}
          strokeLinecap="round"
          opacity={0.6}
        />
      </motion.g>

      {/* ── Layer 4: skincare products (Agent A), centre-left in front ── */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28, ease: revealEase }}>
        <VanityProducts uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </motion.g>

      {/* ── Confirm payoff: a soft blush bloom over the vanity ── */}
      <ConfirmBloom uid={uid} color="#f4d8d6" isConfirming={isConfirming} reduceMotion={reduceMotion} cx={196} cy={240} />

      {/* ── Atmosphere motes ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.44, ease: revealEase }}>
        {MOTES.map((m) => (
          <DustMote key={`fac-mote-${m.cx}-${m.cy}`} cx={m.cx} cy={m.cy} r={m.r} drift={m.drift} dur={m.dur} delay={m.delay} reduceMotion={reduceMotion} />
        ))}
      </motion.g>

      <GrainOverlay uid={uid} />
    </svg>
  );
}
