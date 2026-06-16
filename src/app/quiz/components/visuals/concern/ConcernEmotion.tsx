'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { CONCERN, GrainOverlay } from './concernShared';
import type { ConcernSceneProps } from './concernShared';
import EmotionBloom from './EmotionBloom';
import EmotionVeils from './EmotionVeils';
import EmotionMotes from './EmotionMotes';

/* ── Q8·B 情緒「玫瑰流光 aura」(assembly) ──
   A warm rose emotional aura, layered: an off-centre warm light bloom for
   depth + a light source (EmotionBloom), flowing/weaving rose veils as the
   hero (EmotionVeils), and a delicate drift of light motes + blossom on top
   (EmotionMotes), over a soft blush field. Emotion flows + seeps into the
   skin state — premium soft rose, no centred core, never garish pink.      */

const E = CONCERN.emotion;

export default function ConcernEmotion({ isConfirming }: ConcernSceneProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q8c-emotion-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Blush field — paler up top, warming toward the lower body where
            the deeper veils gather. */}
        <linearGradient id={id('field')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={E.fieldHi} />
          <stop offset="50%" stopColor={E.field} />
          <stop offset="100%" stopColor={E.fieldLo} />
        </linearGradient>
      </defs>

      {/* ── Blush field ── */}
      <rect width="400" height="400" fill={`url(#${id('field')})`} />

      {/* ── Off-centre warm bloom (depth + light source, behind) ── */}
      <EmotionBloom uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── HERO: flowing / weaving rose veils ── */}
      <EmotionVeils uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      {/* ── Drifting light motes + blossom (on top) ── */}
      <EmotionMotes uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

      <GrainOverlay uid={uid} opacity={0.05} />
    </svg>
  );
}
