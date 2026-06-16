'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { CONCERN, GrainOverlay } from './concernShared';
import type { ConcernSceneProps } from './concernShared';
import StressSurface from './StressSurface';
import StressGlow from './StressGlow';
import StressHairlines from './StressHairlines';
import StressFractures from './StressFractures';

/* ── Q8·C 壓力「壓痕裂紋 aura」(assembly) ──
   A tense steel grey-violet field read as a STRESSED GLASS surface: a glassy
   sheen + rounded curvature (StressSurface) sits on the field; a dim, cool
   PRESSURIZED energy (StressGlow) strains behind it; a fine secondary craze
   (StressHairlines) finely cracks the surface; and the hero web of
   dimensional lit fractures with a cool light-bleed seam (StressFractures)
   spreads from an off-centre stress point. Cool, taut, a little nervous —
   never a soft centred form. */

const S = CONCERN.stress;

export default function ConcernStress({ isConfirming }: ConcernSceneProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q8c-stress-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Tense steel grey-violet field — mid-toned so the dark cracks and
            their bright lit edges both read, darkening to closing-in edges. */}
        <radialGradient id={id('field')} cx="48%" cy="46%" r="66%">
          <stop offset="0%" stopColor={S.field} />
          <stop offset="60%" stopColor={S.field} />
          <stop offset="100%" stopColor={S.fieldEdge} />
        </radialGradient>
        {/* Vignette ring — edges press in. */}
        <radialGradient id={id('vignette')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={S.fieldEdge} stopOpacity="0" />
          <stop offset="68%" stopColor={S.fieldEdge} stopOpacity="0" />
          <stop offset="100%" stopColor={S.fieldEdge} stopOpacity="0.5" />
        </radialGradient>
      </defs>

      {/* ── Tense field ── */}
      <rect width="400" height="400" fill={`url(#${id('field')})`} />

      {/* ── Glassy surface: sheen + rounded curvature (tense glass) ── */}
      <StressSurface uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── Strained energy: pressurized glow behind the cracks ── */}
      <StressGlow uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── Fine secondary craze (mid) ── */}
      <StressHairlines uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── HERO: dimensional lit stress fractures (top) ── */}
      <StressFractures uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── Vignette on top (edges only) ── */}
      <rect width="400" height="400" fill={`url(#${id('vignette')})`} pointerEvents="none" />

      <GrainOverlay uid={uid} opacity={0.045} />
    </svg>
  );
}
