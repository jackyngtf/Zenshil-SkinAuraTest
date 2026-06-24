'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { STUDY } from './study/studyLayout';
import StudyBackdrop from './study/StudyBackdrop';
import HourglassHero from './study/HourglassHero';
import DeskStillLife from './study/DeskStillLife';
import StudyAtmosphere from './study/StudyAtmosphere';

/* ── Q4·C 時間「黃昏書桌 · 計畫時間」(assembly) ──
   A calm focused cyan-dusk study: a cyan wall lit softly from a top-left
   window (StudyBackdrop), a centred warm-wood HOURGLASS whose sand flows
   top→bottom = time passing (HourglassHero — the in-room hero, drawn
   in-place at HOURGLASS coords like A's BedHero / D's ChestPress), a desk
   with an analog clock (sweeping hands) + book stack + potted plant + an
   open notebook+pen in the foreground (DeskStillLife), all bathed in a cool
   cyan haze with drifting motes + a confirm-glow bloom (StudyAtmosphere).
   The warm-wood hourglass + desk is the ONE warm accent. The whole scene
   fades at its edges so it melts into the page like the sibling scenes.
   Time = measured, intentional concentration. */

export default function StudyScene({ isConfirming = false }: { isConfirming?: boolean }) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q04study-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 320"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Dim base behind everything (fills floor / gaps). */}
        <linearGradient id={id('base')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.skyTop} />
          <stop offset="62%" stopColor={STUDY.wallLo} />
          <stop offset="100%" stopColor={STUDY.floorDeep} />
        </linearGradient>
        {/* Soft elliptical edge-fade so the room melts into the page (like
            the moon / clock photos' radial mask) instead of a hard rectangle. */}
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

        {/* ── Cyan-dusk wall + top-left window wash + light shaft ── */}
        <StudyBackdrop uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Desk + clock + books + plant + notebook (drawn BEHIND the hero
            so the hourglass stands fully visible ON the desk — the warm-wood
            top surface + front face sit behind the glass + sand) ── */}
        <DeskStillLife uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Hourglass hero (sand-flow = time passing), centred, rendered
            IN FRONT of the desk so the neck + both bulbs read clearly ── */}
        <HourglassHero uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Cyan haze + motes + confirm bloom + vignette (topmost) ── */}
        <StudyAtmosphere uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </g>
    </svg>
  );
}
