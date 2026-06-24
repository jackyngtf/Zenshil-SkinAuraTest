'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { BEDROOM } from './bedroom/bedroomLayout';
import BedroomBackdrop from './bedroom/BedroomBackdrop';
import BedHero from './bedroom/BedHero';
import Nightstand from './bedroom/Nightstand';
import BedroomAtmosphere from './bedroom/BedroomAtmosphere';

/* ── Q4·A 睡眠「月夜小房 · 安睡」(assembly) ──
   A cool, calm moonlit NIGHT bedroom: a deep indigo wall with a moonlit
   window holding a crescent moon + stars + a framed starprint
   (BedroomBackdrop), a soft 3/4 bed whose chest/duvet mound breathes as
   a sleeping breath (BedHero — the in-room hero, drawn in-place at BED
   coords like D's ChestPress), a nightstand with one warm lamp + book +
   alarm clock (Nightstand), all bathed in a cool moonlit haze with a
   moonlight pool on the floor + cool dust motes drifting up
   (BedroomAtmosphere). The whole scene fades at its edges so it melts
   into the page like the sibling photo scenes (moon / clock). Sleep =
   drifting off in your own moonlit room. */

export default function SleepScene({ isConfirming = false }: { isConfirming?: boolean }) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q04sleep-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 320"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Dim base behind everything (fills floor / any gaps). */}
        <linearGradient id={id('base')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.skyTop} />
          <stop offset="62%" stopColor={BEDROOM.wallLo} />
          <stop offset="100%" stopColor={BEDROOM.floorDeep} />
        </linearGradient>
        {/* Soft elliptical edge-fade so the room melts into the page (like the
            moon / clock photos' radial mask) instead of a hard rectangle. */}
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
        {/* ── Dim base ── */}
        <rect width="400" height="320" fill={`url(#${id('base')})`} />

        {/* ── Wall + moonlit window + moon + stars + starprint + vignette ── */}
        <BedroomBackdrop uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Bed (hero) drawn in-place at BED coords ── */}
        <BedHero uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Nightstand + warm bedside lamp + book + clock ── */}
        <Nightstand uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Cool moonlit haze + moonlight pool + dust motes + vignette (topmost) ── */}
        <BedroomAtmosphere uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </g>
    </svg>
  );
}
