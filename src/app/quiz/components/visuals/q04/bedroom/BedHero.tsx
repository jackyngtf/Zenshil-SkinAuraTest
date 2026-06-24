'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { BEDROOM, BED, MOUND, sn } from './bedroomLayout';

/* ================================================================== */
/*  Q4 · A 睡眠 (Sleep) — BED HERO                                       */
/*                                                                     */
/*  The HERO of the sleep scene: a soft cool moonlit bed centred on    */
/*  x=200. A darker HEADBOARD sits at the head; a 3/4-angle MATTRESS   */
/*  trapezoid (wider foot receding to a narrower head) gives it vol-   */
/*  ume/coziness; two PILLOWS rest stacked at the head. The focal      */
/*  animated element is the CHEST/DUVET MOUND centred at (200,214) —   */
/*  the sleeping-breath analogue of B's candle flame. It is a layered  */
/*  d-morph (blurred cool aura + duvet body + soft top highlight)      */
/*  riding the same seamless keyframes, with thin duvet FOLD lines     */
/*  inheriting the group's scaleY so they breathe with the mound. A    */
/*  soft duvet FOOT DRAPE folds over the mattress front.               */
/*                                                                     */
/*  MOTION (deterministic, transform/opacity/path-d only): a LIVING    */
/*  SLEEPING BREATH — a subtle d-morph of the mound (REST → RISE →     */
/*  FALL → REST, first===last, M + 4×C) + a faint scaleY + opacity     */
/*  shimmer, ~5.5s eased loop. The two pillows ride the same breath    */
/*  (0.2s delay). CONFIRM (~0.6s one-shot, ease [0.32,.94,.4,1]): the  */
/*  mound takes ONE slow deep breath (DEEP, taller + wider, scaleY      */
/*  1.08), then settles.                                               */
/*  reduceMotion: mound parked at REST mid shape, pillows static.      */
/* ================================================================== */

/* Geometry — derived from the shared layout. */
const CX = BED.cx; // 200
const MAT_TOP = BED.matTopY; // 196
const MAT_FOOT = BED.matFootY; // 244
const HEAD_HW = BED.headHalfW; // 50 (narrower, receding)
const FOOT_HW = BED.footHalfW; // 62 (wider, front)

/* ── Breathing mound silhouettes (closed teardrop mound): keyframes that
   share the IDENTICAL command structure (M + 4× C) with first === last so
   the d-morph loops seamlessly — exactly CandleHero's FLAME_* discipline.
   Centred at MOUND.cx=200, MOUND.cy=200. ~120 wide, ~28 tall at rest. ── */
const MOUND_REST =
  'M140 218 ' +
  'C150 204 170 196 200 196 ' +
  'C230 196 250 204 260 218 ' +
  'C250 224 230 226 200 226 ' +
  'C170 226 150 224 140 218 Z'; // gentle exhale, low
const MOUND_RISE =
  'M140 218 ' +
  'C150 200 170 191 200 191 ' +
  'C230 191 250 200 260 218 ' +
  'C250 224 230 226 200 226 ' +
  'C170 226 150 224 140 218 Z'; // inhale, mound lifts ~5px + widens at apex
const MOUND_FALL =
  'M140 218 ' +
  'C150 206 170 198 200 198 ' +
  'C230 198 250 206 260 218 ' +
  'C250 224 230 226 200 226 ' +
  'C170 226 150 224 140 218 Z'; // soft settle between
/* Confirm DEEP — one slow deep breath: taller + wider (scaleY≈1.08). */
const MOUND_DEEP =
  'M140 219 ' +
  'C148 196 170 186 200 186 ' +
  'C230 186 252 196 260 219 ' +
  'C250 226 230 228 200 228 ' +
  'C170 228 150 226 140 219 Z';

export default function BedHero({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04sleep-bed-' + n + '-' + uid;

  /* Calm sleeping-breath loop (eased in/out, repeating). */
  const breathe = (duration: number, delay = 0): Transition =>
    reduceMotion
      ? { duration: 0 }
      : {
          duration,
          delay,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        };

  /* One-shot confirm easing. */
  const surge = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

  /* ── MOUND BODY + CORE + AURA: subtle d-morph breath + faint scaleY +
     opacity shimmer. On confirm it takes one deep breath (DEEP); reduceMotion
     parks at the rest shape. ── */
  const moundShapeAnim = isConfirming
    ? { d: MOUND_DEEP }
    : reduceMotion
      ? { d: MOUND_REST }
      : { d: [MOUND_REST, MOUND_RISE, MOUND_FALL, MOUND_REST] };
  const moundGroupAnim = isConfirming
    ? { scaleY: 1.08, opacity: 1 }
    : reduceMotion
      ? { scaleY: 1, opacity: 0.96 }
      : {
          scaleY: [1, 1.02, 0.99, 1],
          opacity: [0.94, 1, 0.97, 0.94],
        };
  const moundTrans: Transition = isConfirming ? surge(0.6) : breathe(5.5);

  /* ── PILLOWS: ride the same breath (0.2s delay). ── */
  const pillowAnim = isConfirming
    ? { scaleY: 1.05 }
    : reduceMotion
      ? { scaleY: 1 }
      : { scaleY: [1, 1.03, 1] };
  const pillowTrans: Transition = isConfirming ? surge(0.6) : breathe(5.5, 0.2);

  /* pillow geometry */
  const pillowRY = 8;
  const pillowL = { cx: CX - 22, cy: MAT_TOP + 6 };
  const pillowR = { cx: CX + 22, cy: MAT_TOP + 4 };

  return (
    <g aria-hidden="true">
      <defs>
        {/* Duvet mound body: cool moonlit ivory-blue lit top → shaded base. */}
        <linearGradient id={id('duvet')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.mattressHi} />
          <stop offset="50%" stopColor={BEDROOM.duvet} />
          <stop offset="100%" stopColor={BEDROOM.duvetShade} />
        </linearGradient>
        {/* Softer top highlight riding the same morph. */}
        <linearGradient id={id('duvetHi')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.pillowHi} stopOpacity="0.7" />
          <stop offset="100%" stopColor={BEDROOM.pillowHi} stopOpacity="0" />
        </linearGradient>
        {/* Blurred cool aura wash under the mound. */}
        <radialGradient id={id('moundAura')} cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={BEDROOM.moonHalo} stopOpacity="0.4" />
          <stop offset="60%" stopColor={BEDROOM.moonHalo} stopOpacity="0.12" />
          <stop offset="100%" stopColor={BEDROOM.moonHalo} stopOpacity="0" />
        </radialGradient>
        {/* Mattress band under the mound (visible head + side). */}
        <linearGradient id={id('mattress')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.mattressBase} />
          <stop offset="100%" stopColor={BEDROOM.duvetShade} />
        </linearGradient>
        {/* Headboard face. */}
        <linearGradient id={id('headboard')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.headboardHi} />
          <stop offset="100%" stopColor={BEDROOM.headboard} />
        </linearGradient>
        {/* Cool moonlight rim catching lit (left/top) edges. */}
        <radialGradient id={id('rim')} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={BEDROOM.bedRim} stopOpacity="0.5" />
          <stop offset="100%" stopColor={BEDROOM.bedRim} stopOpacity="0" />
        </radialGradient>

        {/* Static blur filters — never animated. */}
        <filter id={id('bAura')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={id('bShadow')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ── Contact shadow under the bed ── */}
      <ellipse
        cx={CX}
        cy={sn(MAT_FOOT + 8)}
        rx={sn(FOOT_HW + 12)}
        ry={9}
        fill="#0c1024"
        opacity={0.4}
        filter={`url(#${id('bShadow')})`}
      />

      {/* ── HEADBOARD ── */}
      <rect
        x={sn(CX - HEAD_HW - 4)}
        y={BED.headTopY}
        width={sn((HEAD_HW + 4) * 2)}
        height={sn(BED.headFootY - BED.headTopY)}
        rx={5}
        fill={`url(#${id('headboard')})`}
      />
      {/* lit top edge */}
      <rect
        x={sn(CX - HEAD_HW - 4)}
        y={BED.headTopY}
        width={sn((HEAD_HW + 4) * 2)}
        height={2}
        fill={BEDROOM.headboardHi}
      />
      {/* cool rim on the left edge */}
      <rect
        x={sn(CX - HEAD_HW - 4)}
        y={BED.headTopY}
        width={2}
        height={sn(BED.headFootY - BED.headTopY)}
        fill={`url(#${id('rim')})`}
      />

      {/* ── MATTRESS (3/4 trapezoid): wider foot receding to narrower head ── */}
      <path
        d={`M${sn(CX - FOOT_HW)} ${MAT_FOOT} L${sn(CX + FOOT_HW)} ${MAT_FOOT} L${sn(
          CX + HEAD_HW,
        )} ${MAT_TOP} L${sn(CX - HEAD_HW)} ${MAT_TOP} Z`}
        fill={`url(#${id('mattress')})`}
      />
      {/* cool rim-light tracing the head + left edges */}
      <path
        d={`M${sn(CX - FOOT_HW)} ${MAT_FOOT} L${sn(CX - HEAD_HW)} ${MAT_TOP} L${sn(
          CX + HEAD_HW,
        )} ${MAT_TOP}`}
        fill="none"
        stroke={BEDROOM.bedRim}
        strokeWidth={1.4}
        strokeLinejoin="round"
        opacity={0.4}
      />

      {/* ── TWO PILLOWS (ride the breath) ── */}
      {[pillowL, pillowR].map((p, i) => (
        <motion.ellipse
          key={`pillow-${i}`}
          cx={p.cx}
          cy={p.cy}
          rx={20}
          ry={pillowRY}
          fill={BEDROOM.pillow}
          initial={false}
          animate={pillowAnim}
          transition={pillowTrans}
          style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
        />
      ))}
      {/* pillow shadow beneath each + top hi rim (static accents) */}
      {[pillowL, pillowR].map((p, i) => (
        <g key={`pillow-acc-${i}`} aria-hidden>
          <ellipse cx={p.cx} cy={sn(p.cy + 2)} rx={20} ry={pillowRY} fill={BEDROOM.pillowShade} opacity={0.5} />
          <ellipse cx={p.cx} cy={sn(p.cy - 3)} rx={16} ry={2} fill={BEDROOM.pillowHi} opacity={0.7} />
        </g>
      ))}

      {/* ── BREATHING MOUND (the hero): layered aura + body + core, folds
            inherit the group's scaleY so they breathe with the mound. ── */}
      {/* Outer aura (soft blurred cool wash under the mound): carries the full
          d-morph + scaleY + opacity. */}
      <motion.path
        d={isConfirming ? MOUND_DEEP : MOUND_REST}
        fill={`url(#${id('moundAura')})`}
        filter={`url(#${id('bAura')})`}
        initial={false}
        animate={{ ...moundShapeAnim, scaleY: moundGroupAnim.scaleY, opacity: 0.5 }}
        transition={moundTrans}
        style={{ transformOrigin: `${MOUND.cx}px ${MOUND.cy}px` }}
      />
      {/* Duvet body + core + folds ride the group's scaleY/opacity; the body +
          core paths each animate their own d (the d-morph). */}
      <motion.g
        initial={false}
        animate={moundGroupAnim}
        transition={moundTrans}
        style={{ transformOrigin: `${MOUND.cx}px ${MOUND.cy}px` }}
      >
        {/* body */}
        <motion.path
          d={isConfirming ? MOUND_DEEP : MOUND_REST}
          fill={`url(#${id('duvet')})`}
          initial={false}
          animate={moundShapeAnim}
          transition={moundTrans}
        />
        {/* core (soft top highlight) */}
        <motion.path
          d={isConfirming ? MOUND_DEEP : MOUND_REST}
          fill={`url(#${id('duvetHi')})`}
          opacity={0.6}
          initial={false}
          animate={moundShapeAnim}
          transition={moundTrans}
        />
        {/* duvet fold lines (static d, ride the group's scaleY/y) */}
        <path
          d="M168 210 C184 204 216 204 232 210"
          fill="none"
          stroke={BEDROOM.duvetFold}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d="M176 218 C190 214 210 214 224 218"
          fill="none"
          stroke={BEDROOM.duvetFold}
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity={0.4}
        />
      </motion.g>

      {/* ── FOOT DRAPE: soft duvet fold draping over the mattress foot ── */}
      <path
        d={`M${sn(CX - FOOT_HW + 6)} ${MAT_FOOT} C${sn(CX - 18)} ${sn(MAT_FOOT + 6)} ${sn(
          CX + 18,
        )} ${sn(MAT_FOOT + 6)} ${sn(CX + FOOT_HW - 6)} ${MAT_FOOT} L${sn(
          CX + FOOT_HW - 6,
        )} ${sn(MAT_FOOT + 4)} C${sn(CX + 18)} ${sn(MAT_FOOT + 10)} ${sn(
          CX - 18,
        )} ${sn(MAT_FOOT + 10)} ${sn(CX - FOOT_HW + 6)} ${sn(MAT_FOOT + 4)} Z`}
        fill={BEDROOM.duvetShade}
      />
    </g>
  );
}
