'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { IDLE, FLOOR_Y } from './idle/idleLayout';
import IdleBackdrop from './idle/IdleBackdrop';
import WindowGlowHero from './idle/WindowGlowHero';
import IdleAtmosphere from './idle/IdleAtmosphere';

/* ── Q4 · idle「Soft Room, Held Light」微光空房 (assembly) ──
   The NEUTRAL "before you choose" scene — a true sibling of A–D, in the
   SAME orb-clip room language (viewBox 0 0 400 320, slice, three layers
   under one elliptical edge-fade mask). A warm-neutral empty interior:
   a bare wall washing into a floor (IdleBackdrop), a single upper-centre
   window whose frosted pane holds a soft warm light-BLOOM that breathes —
   the reincarnated idle orb — flanked by two sheer curtain folds, the
   reincarnated drifting meter-lines (WindowGlowHero), all tied together
   by a warm haze + a wide floor light-pool (the lower anchor mass that
   holds the centre-of-gravity) + drifting dust motes (IdleAtmosphere).
   No bed / candle / hourglass / gym gear — it commits to no resource, so
   it reads as a calm held breath before you choose, and dissolves softly
   into whichever room (A–D) you pick. The scene fades at its edges so it
   melts into the page like its sibling scenes. */

export default function IdleScene({ isConfirming = false }: { isConfirming?: boolean }) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q04idle-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 320"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Dim warm base behind everything (fills floor / any gaps). */}
        <linearGradient id={id('base')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={IDLE.wallTop} />
          <stop offset="62%" stopColor={IDLE.wallLo} />
          <stop offset="100%" stopColor={IDLE.floorFront} />
        </linearGradient>
        {/* Soft elliptical edge-fade so the room melts into the page (same
            recipe as the sibling scenes) instead of a hard rectangle. */}
        <radialGradient id={id('fadeGrad')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="58%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <mask id={id('fade')}>
          <rect width="400" height="320" fill={`url(#${id('fadeGrad')})`} />
        </mask>
      </defs>

      <g mask={`url(#${id('fade')})`}>
        {/* ── Dim warm base ── */}
        <rect width="400" height={FLOOR_Y < 320 ? 320 : FLOOR_Y} fill={`url(#${id('base')})`} />

        {/* ── Wall + frosted window + wall-wash + vignette ── */}
        <IdleBackdrop uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── The breathing window light-bloom + sheer curtains (hero) ── */}
        <WindowGlowHero uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Warm haze + floor light-pool + dust motes + vignette (topmost) ── */}
        <IdleAtmosphere uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </g>
    </svg>
  );
}
