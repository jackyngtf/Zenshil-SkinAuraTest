'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { GYM } from './gym/gymLayout';
import GymBackdrop from './gym/GymBackdrop';
import ChestPress from './gym/ChestPress';
import GymEquipment from './gym/GymEquipment';

/* ── Q4·D 能量「健身房 · 跑步機」(assembly) ──
   A bright, sunlit, energetic gym room: a warm wall + window light
   (GymBackdrop), a side-view treadmill with a running belt + heart-rate
   pulse (Treadmill), and dumbbells + rising warm energy motes (GymEquipment).
   Energy = vitality / working out. Pairs with Q4·B's cosy night room (same
   "room in a circle orb" idiom, opposite mood). The whole scene fades softly
   at its edges so it sits cleanly in the circular orb. */

export default function GymScene({ isConfirming = false }: { isConfirming?: boolean }) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q04gym-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 320"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Warm base behind everything (fills any gap: sunlit wall → wood floor). */}
        <linearGradient id={id('base')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={GYM.wallTop} />
          <stop offset="60%" stopColor={GYM.wallLo} />
          <stop offset="100%" stopColor={GYM.floorFront} />
        </linearGradient>
        {/* Soft elliptical edge-fade so the room melts into the orb edge
            (matches Q4·B). */}
        <radialGradient id={id('fadeGrad')} cx="50%" cy="52%" r="52%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="66%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <mask id={id('fade')}>
          <rect width="400" height="320" fill={`url(#${id('fadeGrad')})`} />
        </mask>
      </defs>

      <g mask={`url(#${id('fade')})`}>
        {/* ── Warm base ── */}
        <rect width="400" height="320" fill={`url(#${id('base')})`} />

        {/* ── Sunlit wall + window light + wood floor ── */}
        <GymBackdrop uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Chest-press machine (big hero, press-arm reps) ── */}
        <ChestPress uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Dumbbells + kettlebell + rising energy motes (topmost) ── */}
        <GymEquipment uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </g>
    </svg>
  );
}
