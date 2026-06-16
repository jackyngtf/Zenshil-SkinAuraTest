'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { CONCERN, GrainOverlay } from './concernShared';
import type { ConcernSceneProps } from './concernShared';
import DietWarmth from './DietWarmth';
import DietRays from './DietRays';
import DietCaustics from './DietCaustics';
import DietRising from './DietRising';

/* ── Q8·D 飲食「暖養昇華 aura」(assembly) ──
   A warm honey-amber "nourishment" aura. Dimensional warmth gathers low and
   rises (DietWarmth); soft caustic honey-light plays across the field
   (DietCaustics); and premium golden effervescence rises up through it
   (DietRising) — streams of bubbles, glints + refined feature bubbles. Rich +
   warm, never garish; warmth pools low + rises, never a centred disc. */

const D = CONCERN.diet;

export default function ConcernDiet({ isConfirming }: ConcernSceneProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q8c-diet-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Warm honey-amber field — wider tonal range so the golden light
            shafts, caustics + effervescence read against it: luminous honey
            up top, deepening to a rich amber low. */}
        <linearGradient id={id('field')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={D.fieldTop} />
          <stop offset="46%" stopColor={D.field} />
          <stop offset="82%" stopColor={D.fieldLo} />
          <stop offset="100%" stopColor={D.deep} />
        </linearGradient>
        {/* Warm vignette — a touch deeper now, so the lit centre/upper reads
            against a richer amber rim (more dimensional). */}
        <radialGradient id={id('vignette')} cx="50%" cy="44%" r="60%">
          <stop offset="0%" stopColor={D.deep} stopOpacity="0" />
          <stop offset="70%" stopColor={D.deep} stopOpacity="0" />
          <stop offset="100%" stopColor={D.deep} stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* ── Warm field ── */}
      <rect width="400" height="400" fill={`url(#${id('field')})`} />

      {/* ── Dimensional warmth: low glow pool + updraft + depth (behind) ── */}
      <DietWarmth uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── Warm volumetric light shafts pouring in from above (depth) ── */}
      <DietRays uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── Caustic honey-light shimmer across the field (mid) ── */}
      <DietCaustics uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── HERO: premium golden effervescence rising (front) ── */}
      <DietRising uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── Soft warm vignette ── */}
      <rect width="400" height="400" fill={`url(#${id('vignette')})`} pointerEvents="none" />

      <GrainOverlay uid={uid} opacity={0.04} />
    </svg>
  );
}
