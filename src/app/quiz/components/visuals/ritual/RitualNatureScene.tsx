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
import VistaHills from './nature/VistaHills';
import VistaFrame from './nature/VistaFrame';
import { NAT, HORIZON_Y } from './nature/natureVista';

/* ── C 去大自然:「自然遠景」(Nature Vista) ──
   Assembly (Tech-lead): a serene escape-to-nature view, lit by warm dawn
   from the upper-left — layered misty hills above a calm reflective water
   plane (Agent A), framed by soft foreground foliage with a gliding bird
   (Agent B), and drifting mist woven across the horizon as the hero motion.
   Matches the locked A (window) and the new B (spa nook) / D (vanity):
   one quiet circular scene, soft gradients, grain, one clear hero + a
   confirm payoff. C owns the sage accent.                                */

const MOTES = [
  { cx: 250, cy: 150, dur: 13.2, delay: 1.2, drift: 6, r: 1 },
  { cx: 300, cy: 200, dur: 12.0, delay: 3.8, drift: -5, r: 0.9 },
  { cx: 150, cy: 130, dur: 14.0, delay: 6.0, drift: 5, r: 1.05 },
];

/* Soft mist bands woven across the horizon — the hero drift. */
const MIST = [
  { cx: 206, cy: 206, rx: 220, ry: 15, op: 0.5, drift: 14, dur: 11.0, delay: 0 },
  { cx: 184, cy: 226, rx: 244, ry: 18, op: 0.62, drift: -12, dur: 9.6, delay: 1.2 },
  { cx: 224, cy: 246, rx: 232, ry: 14, op: 0.42, drift: 10, dur: 12.6, delay: 2.4 },
];

export default function RitualNatureScene({ isConfirming, reduceMotion }: RitualSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q10-natroom-${name}-${uid}`;
  const b8 = `url(#${id('b8')})`;
  const b16 = `url(#${id('b16')})`;

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Sky: warm ivory at the top → pale sage haze toward the horizon. */}
        <linearGradient id={id('sky')} x1="0%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%" stopColor={NAT.skyHi} />
          <stop offset="60%" stopColor={NAT.skyMid} />
          <stop offset="100%" stopColor={NAT.skyLo} />
        </linearGradient>
        <radialGradient id={id('sun')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={RITUAL.dawnHi} stopOpacity="0.95" />
          <stop offset="46%" stopColor={NAT.sun} stopOpacity="0.4" />
          <stop offset="100%" stopColor={NAT.sun} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('mist')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={NAT.mist} stopOpacity="0" />
          <stop offset="50%" stopColor={NAT.mist} stopOpacity="1" />
          <stop offset="100%" stopColor={NAT.mist} stopOpacity="0" />
        </linearGradient>
        <filter id={id('b8')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id={id('b16')} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      {/* ── Layer 1: sky + warm sun glow (upper-left) ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.38, ease: revealEase }}>
        <rect width="400" height="400" fill={`url(#${id('sky')})`} />
        <motion.ellipse
          cx={150}
          cy={112}
          rx={150}
          ry={120}
          fill={`url(#${id('sun')})`}
          filter={b16}
          initial={false}
          animate={
            isConfirming
              ? { opacity: [0.5, 0.85, 0.6] }
              : reduceMotion
                ? { opacity: 0.52 }
                : { opacity: [0.42, 0.62, 0.42] }
          }
          transition={isConfirming ? { duration: 0.6, times: [0, 0.45, 1], ease: 'easeOut' } : loop(reduceMotion, 9)}
        />
      </motion.g>

      {/* ── Layer 2: layered misty hills + calm water (Agent A) ── */}
      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.52, delay: 0.12, ease: revealEase }}>
        <VistaHills uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </motion.g>

      {/* ── Layer 3: HERO — mist bands drifting across the horizon ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3, ease: revealEase }}>
        {MIST.map((m) => (
          <motion.ellipse
            key={`mist-${m.cy}`}
            cx={m.cx}
            cy={m.cy}
            rx={m.rx}
            ry={m.ry}
            fill={`url(#${id('mist')})`}
            filter={b8}
            initial={false}
            animate={
              isConfirming
                ? { x: 0, opacity: m.op * 0.3 }
                : reduceMotion
                  ? { x: 0, opacity: m.op * 0.85 }
                  : { x: [0, m.drift, 0], opacity: [m.op * 0.7, m.op, m.op * 0.7] }
            }
            transition={isConfirming ? { duration: 0.6, ease: 'easeOut' } : loop(reduceMotion, m.dur, m.delay)}
          />
        ))}
      </motion.g>

      {/* ── Layer 4: foreground foliage frame + gliding bird (Agent B) ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.22, ease: revealEase }}>
        <VistaFrame uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </motion.g>

      {/* ── Confirm payoff: a soft sun-warm bloom over the opening ── */}
      <ConfirmBloom uid={uid} color="#eaf0cf" isConfirming={isConfirming} reduceMotion={reduceMotion} cx={210} cy={HORIZON_Y - 40} />

      {/* ── Atmosphere motes drifting in the light ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.44, ease: revealEase }}>
        {MOTES.map((m) => (
          <DustMote key={`nat-mote-${m.cx}-${m.cy}`} cx={m.cx} cy={m.cy} r={m.r} drift={m.drift} dur={m.dur} delay={m.delay} reduceMotion={reduceMotion} />
        ))}
      </motion.g>

      <GrainOverlay uid={uid} />
    </svg>
  );
}
