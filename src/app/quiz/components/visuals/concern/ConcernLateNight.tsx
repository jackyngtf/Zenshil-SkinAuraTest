'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, GrainOverlay } from './concernShared';
import type { ConcernSceneProps } from './concernShared';
import NightFalling from './NightFalling';
import NightHills from './NightHills';

/* ── Q8·A 捱夜「夜空 aura」(assembly) ──
   A periwinkle night-sky aura — deeper at the top, fading to pale lavender
   low — with a soft glowing core near the horizon, thin light streaks
   raining down + star dust (NightFalling, the hero), and soft lavender
   hill mounds settling at the bottom (NightHills). Reads as night energy
   draining away / repair rhythm slipping, the skin's glow quietly covered.
   Premium periwinkle, never a dark night scene.                         */

const N = CONCERN.night;

export default function ConcernLateNight({ isConfirming }: ConcernSceneProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q8c-night-${name}-${uid}`;

  const coreTransition: Transition = isConfirming
    ? { duration: 0.6, ease: 'easeOut' }
    : loop(reduceMotion, 7.2, 0.3);

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Periwinkle night sky — deepest at the top, pale lavender low. */}
        <linearGradient id={id('sky')} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={N.fieldTop} />
          <stop offset="52%" stopColor={N.fieldMid} />
          <stop offset="100%" stopColor={N.fieldLo} />
        </linearGradient>
        {/* Soft glowing core near the horizon — the aura's quiet light. */}
        <radialGradient id={id('core')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={N.core} stopOpacity="0.95" />
          <stop offset="48%" stopColor={N.core} stopOpacity="0.4" />
          <stop offset="100%" stopColor={N.core} stopOpacity="0" />
        </radialGradient>
        <filter id={id('b24')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>

      {/* ── Periwinkle sky field ── */}
      <rect width="400" height="400" fill={`url(#${id('sky')})`} />

      {/* ── Soft glowing core (lower-centre, near the horizon) ── */}
      <motion.ellipse
        cx={200}
        cy={250}
        rx={150}
        ry={128}
        fill={`url(#${id('core')})`}
        filter={`url(#${id('b24')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: [0.5, 0.82, 0.6], scale: 1.06 }
            : reduceMotion
              ? { opacity: 0.5 }
              : { opacity: [0.4, 0.6, 0.4], scale: [1, 1.04, 1] }
        }
        transition={coreTransition}
        style={{ transformOrigin: '200px 250px' }}
      />

      {/* ── HERO: falling light streaks + star dust (over the sky) ── */}
      <NightFalling uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── Soft lavender hill mounds at the bottom (in front) ── */}
      <NightHills uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      <GrainOverlay uid={uid} opacity={0.05} />
    </svg>
  );
}
