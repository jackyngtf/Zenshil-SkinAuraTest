'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  Q8 · C 壓力 — TENSE GLASSY SURFACE (renders UNDER energy + cracks)   */
/*                                                                     */
/*  The stress field is otherwise flat: a steel grey-violet wash with   */
/*  an orb that reads like paper. This layer treats it as a STRESSED    */
/*  PANE OF GLASS — a rounded, tense glassy DOME that the fractures     */
/*  live inside, catching soft cool light. It must stay whisper-subtle  */
/*  (everything ≤0.18) so it never washes out the cracks or pulls       */
/*  focus; it is finish + form, not a highlight.                        */
/*                                                                     */
/*  1. SHEEN — a broad, soft, heavily-blurred cool highlight glancing   */
/*     off the upper-left of the curved pane. It very slowly drifts +   */
/*     breathes (~10s) as the glass catches light.                      */
/*  2. CURVATURE — a faint cool rim-light hugging the upper-left inner  */
/*     edge + a subtle darker cool shading on the lower-right edge, so  */
/*     the orb reads as a rounded, tense dome (not flat). Static / very */
/*     slow.                                                            */
/*                                                                     */
/*  CONFIRM (~0.55s one-shot): the sheen brightens + shifts a touch     */
/*  (the surface tenses) then settles. Entrance: ~0.7s fade-in.         */
/*  reduceMotion: parked at a representative static mid state.          */
/* ================================================================== */

const S = CONCERN.stress;

/* Sheen sits up-left, glancing across the curved pane. */
const SHEEN_CX = 150;
const SHEEN_CY = 132;

export default function StressSurface({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (n: string) => 'q8c-stresssurf-' + n + '-' + uid;

  /* One-shot confirm easing (matches the family flare curve). */
  const flare = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.34, 0.9, 0.43, 1] };

  /* SHEEN: a soft cool gloss that slowly drifts + breathes as the glass
     catches light; on confirm it brightens + nudges as the surface tenses,
     then settles. Budget ≤0.18. */
  const sheenAnimate = isConfirming
    ? { opacity: 0.18, x: 6, y: -4, scale: 1.04 }
    : reduceMotion
      ? { opacity: 0.13, x: 0, y: 0, scale: 1 }
      : { opacity: [0.1, 0.15, 0.1], x: [-4, 5, -4], y: [3, -3, 3], scale: [0.98, 1.03, 0.98] };
  const sheenTransition: Transition = isConfirming ? flare(0.55) : loop(reduceMotion, 10.5);

  /* RIM-LIGHT (upper-left curvature): a thin cool catch on the inner edge.
     Static / very slow, faint. */
  const rimAnimate = isConfirming
    ? { opacity: 0.16 }
    : reduceMotion
      ? { opacity: 0.12 }
      : { opacity: [0.1, 0.14, 0.1] };
  const rimTransition: Transition = isConfirming ? flare(0.55) : loop(reduceMotion, 11.5, 0.5);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Broad cool sheen — bright glassy core → soft fall-off → clear. */}
        <radialGradient id={id('sheen')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={S.coreHi} stopOpacity="0.9" />
          <stop offset="42%" stopColor={S.fieldHi} stopOpacity="0.4" />
          <stop offset="100%" stopColor={S.fieldHi} stopOpacity="0" />
        </radialGradient>
        {/* Rim-light — a directional cool catch along the upper-left arc. */}
        <linearGradient id={id('rim')} x1="18%" y1="14%" x2="78%" y2="78%">
          <stop offset="0%" stopColor={S.coreHi} stopOpacity="0.75" />
          <stop offset="32%" stopColor={S.fieldHi} stopOpacity="0.2" />
          <stop offset="60%" stopColor={S.fieldHi} stopOpacity="0" />
        </linearGradient>
        {/* Lower-right shading — a cool darkening that rounds the dome off. */}
        <radialGradient id={id('shade')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={S.fieldEdge} stopOpacity="0" />
          <stop offset="58%" stopColor={S.fieldEdge} stopOpacity="0" />
          <stop offset="100%" stopColor={S.fieldEdge} stopOpacity="0.5" />
        </radialGradient>
        {/* Heavy blur welds the sheen into a soft glancing gloss. */}
        <filter id={id('bSheen')} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
        {/* Soft blur for the rim catch — keeps it a glow, not a line. */}
        <filter id={id('bRim')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        {/* Gentle blur for the lower-right shading. */}
        <filter id={id('bShade')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      {/* ── CURVATURE: lower-right shading rounds the dome (deepest, first) ── */}
      <motion.ellipse
        cx={252}
        cy={262}
        rx={150}
        ry={146}
        fill={`url(#${id('shade')})`}
        filter={`url(#${id('bShade')})`}
        initial={{ opacity: 0 }}
        animate={isConfirming ? { opacity: 0.14 } : reduceMotion ? { opacity: 0.13 } : { opacity: 0.13 }}
        transition={isConfirming ? flare(0.55) : { duration: reduceMotion ? 0 : 0.7 }}
        style={{ transformOrigin: '252px 262px' }}
      />

      {/* ── CURVATURE: cool rim-light catch on the upper-left inner edge ── */}
      <motion.ellipse
        cx={150}
        cy={140}
        rx={156}
        ry={150}
        fill={`url(#${id('rim')})`}
        filter={`url(#${id('bRim')})`}
        initial={{ opacity: 0 }}
        animate={rimAnimate}
        transition={rimTransition}
        style={{ transformOrigin: '150px 140px' }}
      />

      {/* ── HERO: broad soft cool sheen glancing off the curved pane ── */}
      <motion.ellipse
        cx={SHEEN_CX}
        cy={SHEEN_CY}
        rx={132}
        ry={104}
        fill={`url(#${id('sheen')})`}
        filter={`url(#${id('bSheen')})`}
        initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
        animate={sheenAnimate}
        transition={sheenTransition}
        transform={`rotate(-32 ${SHEEN_CX} ${SHEEN_CY})`}
        style={{ transformOrigin: `${SHEEN_CX}px ${SHEEN_CY}px` }}
      />
    </g>
  );
}
