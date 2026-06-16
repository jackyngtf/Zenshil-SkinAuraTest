'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, sn } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  B 情緒 — OFF-CENTRE WARM EMOTIONAL BLOOM sub-layer (depth + light)   */
/*                                                                     */
/*  Renders BEHIND the flowing rose veils. Its job is DEPTH + a soft    */
/*  warm LIGHT SOURCE — the quiet heart of the feeling — WITHOUT ever   */
/*  becoming a centred glowing disc (that reads as a target/areola).    */
/*                                                                     */
/*  A large soft warm bloom sits OFF-AXIS upper-left (~168,160) as an    */
/*  ELONGATED, rotated ellipse: a directional light wash, not a disc.   */
/*  A second, smaller, even softer pool offset the OTHER way (~245,250) */
/*  balances the light asymmetrically. A few faint OPEN warmth arcs      */
/*  radiate off-centre and fade fast — a hint of feeling spreading.     */
/*                                                                     */
/*  HERO: the main bloom BREATHES (scale + small opacity swell) ~6.5s;   */
/*  the second pool breathes on a different period. CONFIRM (~0.6s):     */
/*  the main bloom warms/brightens once, then settles. reduceMotion:     */
/*  parked at a soft representative mid-state.                          */
/* ================================================================== */

const E = CONCERN.emotion;

/* Main bloom geometry (off-axis, elongated, tilted). transformOrigin is
   set at its own centre so scale/rotate pivot there. */
const M_CX = 168;
const M_CY = 160;
const M_TILT = -18;

/* Second balancing pool (offset the other way, lower-right). */
const P_CX = 245;
const P_CY = 250;

/* Faint OPEN warmth arcs emanating from near the main bloom and curving
   away. Open quadratic arcs — never concentric rings centred in the orb.
   Deterministic, static geometry; only opacity is animated. */
const ARCS = [
  { d: `M${sn(110)} ${sn(118)} Q${sn(206)} ${sn(96)} ${sn(286)} ${sn(150)}`, sw: 5, op: 0.2 },
  { d: `M${sn(96)} ${sn(150)} Q${sn(214)} ${sn(118)} ${sn(312)} ${sn(196)}`, sw: 4, op: 0.16 },
  { d: `M${sn(112)} ${sn(96)} Q${sn(186)} ${sn(82)} ${sn(252)} ${sn(112)}`, sw: 3.5, op: 0.12 },
] as const;

export default function EmotionBloom({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (n: string) => 'q8c-emobloom-' + n + '-' + uid;

  /* Main bloom: breathes gently; warms + swells once on confirm. Rotation
     is carried in the transform keyframes so it pivots about the centre. */
  const bloomAnimate = isConfirming
    ? { opacity: 0.46, scale: 1.12, rotate: M_TILT }
    : reduceMotion
      ? { opacity: 0.34, scale: 1, rotate: M_TILT }
      : { opacity: [0.28, 0.4, 0.28], scale: [1, 1.06, 1], rotate: M_TILT };

  const bloomTransition: Transition = isConfirming
    ? reduceMotion
      ? { duration: 0 }
      : { duration: 0.6, ease: [0.32, 0.94, 0.4, 1] }
    : loop(reduceMotion, 6.5);

  /* Second pool: softer, slower, different period so the two never sync. */
  const poolAnimate = reduceMotion
    ? { opacity: 0.22, scale: 1 }
    : { opacity: [0.16, 0.26, 0.16], scale: [1, 1.05, 1] };

  const poolTransition: Transition = loop(reduceMotion, 8.4, 0.8);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Warm radial wash: high-opacity warm centre → mid bloom → clear. */}
        <radialGradient id={id('bloom')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={E.core} stopOpacity="0.7" />
          <stop offset="42%" stopColor={E.bloom} stopOpacity="0.36" />
          <stop offset="100%" stopColor={E.bloom} stopOpacity="0" />
        </radialGradient>
        {/* Softer pool wash (same hues, lower reach). */}
        <radialGradient id={id('pool')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={E.fieldHi} stopOpacity="0.8" />
          <stop offset="50%" stopColor={E.bloom} stopOpacity="0.34" />
          <stop offset="100%" stopColor={E.bloom} stopOpacity="0" />
        </radialGradient>
        {/* Heavy blur welds the main bloom into a directional wash. */}
        <filter id={id('bMain')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="31" />
        </filter>
        {/* Softer blur for the secondary pool. */}
        <filter id={id('bPool')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        {/* Gentle blur for the faint warmth arcs. */}
        <filter id={id('bArc')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* ── HERO: large off-centre warm bloom (breathing light source) ── */}
      <motion.ellipse
        cx={M_CX}
        cy={M_CY}
        rx={150}
        ry={120}
        fill={`url(#${id('bloom')})`}
        filter={`url(#${id('bMain')})`}
        initial={{ opacity: 0, scale: 1, rotate: M_TILT }}
        animate={bloomAnimate}
        transition={bloomTransition}
        style={{ transformOrigin: `${M_CX}px ${M_CY}px` }}
      />

      {/* ── Faint OPEN warmth arcs radiating off-centre, fading fast ── */}
      <motion.g
        fill="none"
        stroke={E.ringSoft}
        strokeLinecap="round"
        filter={`url(#${id('bArc')})`}
        initial={{ opacity: 0 }}
        animate={
          isConfirming
            ? { opacity: 0.4 }
            : reduceMotion
              ? { opacity: 0.22 }
              : { opacity: [0.14, 0.26, 0.14] }
        }
        transition={
          isConfirming
            ? reduceMotion
              ? { duration: 0 }
              : { duration: 0.6, ease: [0.32, 0.94, 0.4, 1] }
            : loop(reduceMotion, 7.2, 0.4)
        }
      >
        {ARCS.map((a) => (
          <path key={a.d} d={a.d} strokeWidth={a.sw} opacity={a.op} />
        ))}
      </motion.g>

      {/* ── Second, softer balancing pool (offset the other way) ── */}
      <motion.ellipse
        cx={P_CX}
        cy={P_CY}
        rx={90}
        ry={70}
        fill={`url(#${id('pool')})`}
        filter={`url(#${id('bPool')})`}
        initial={{ opacity: 0, scale: 1 }}
        animate={poolAnimate}
        transition={poolTransition}
        style={{ transformOrigin: `${P_CX}px ${P_CY}px` }}
      />
    </g>
  );
}
