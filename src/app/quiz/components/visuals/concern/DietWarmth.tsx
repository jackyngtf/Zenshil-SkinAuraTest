'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  Q8 · D 飲食 — WARM NOURISHMENT ATMOSPHERE (renders BEHIND particles) */
/*                                                                     */
/*  The honeyed warmth the rising golden particles drift up through —   */
/*  a deep, dimensional VOLUME of glowing nectar: luminous up top where */
/*  the light pours in, rich + grounded low where the amber deepens.    */
/*  Warmth GATHERS low and RISES, giving the orb depth. Layers, all     */
/*  warm + low/vertical/broad (never a centred disc):                  */
/*                                                                     */
/*    1. WARM DEPTH BASE — a broad, very-low-opacity warm gradient      */
/*       grounding the bottom of the orb (fieldLo → deep), so the base  */
/*       feels deep + heavy, anchoring the rise. Barely breathes.       */
/*    2. CORNER DEPTH — two soft deeper-amber pools shading the lower    */
/*       side corners so the volume reads ROUNDED + deep (≤0.2). Pairs  */
/*       with the deepened field; barely moves.                         */
/*    3. WARM TOP-GLOW — a broad faint warm wash near the top where     */
/*       light enters from above (≤0.16), so the orb feels lit from     */
/*       above through to the warm depths below. Wide, low, never disc. */
/*    4. WARM HAZE — a broad faint wash over the whole field so it      */
/*       reads luminous/charged; pulses on its own ~7.5s period.        */
/*    5. HONEY SHIMMER — 3 large, very soft, low-opacity warm blobs      */
/*       (≤0.15) drifting slowly + desynced (~14–19s) like honey-light  */
/*       caustics. Atmosphere only, never focal.                        */
/*    6. WARM UPDRAFT — a tall, soft, VERTICAL warm plume (rx small,    */
/*       ry large) rising from the low pool toward mid-orb; gentle      */
/*       lift + breathe so warmth visibly RISES. Taller-than-wide,      */
/*       low opacity — pairs with the effervescence, never a disc.      */
/*    7. WARM GLOW POOL (hero) — a LOW, WIDE soft ellipse around        */
/*       (200,300), the luminous CORE of the nectar gathering + rising  */
/*       from the bottom. It breathes: slow rise/fall (y) + opacity     */
/*       swell ~6.5s. Heavily blurred, soft-edged, biased to the lower  */
/*       half. Brightest at its heart (glow), but kept LOW + WIDE.      */
/*                                                                     */
/*  CONFIRM (~0.6s one-shot): the whole volume warms — pool heart +     */
/*  updraft brighten + lift, top-glow + haze swell, depth deepens —     */
/*  then settles. reduceMotion: every layer parked at a mid state.      */
/* ================================================================== */

const D = CONCERN.diet;

/* Low, wide pool centre — biased well into the lower half so the warmth
   reads as gathering low + rising, not floating centred. */
const POOL_CX = 200;
const POOL_CY = 300;

/* Updraft plume — centred on x, springing from just above the pool and
   reaching toward mid-orb. Tall + narrow so it reads as rising warmth. */
const DRAFT_CX = 200;
const DRAFT_CY = 246;

/* Corner-depth pools — two soft deeper-amber shadings biased to the lower
   side corners so the warm volume reads ROUNDED + deep (the light core sits
   low-centre, the rim falls off into richer amber). Static positions; only
   a barely-there opacity breathe. Kept wide + low, hugging the corners. */
const CORNERS = [
  { cx: 48,  cy: 352, rx: 150, ry: 116 },
  { cx: 352, cy: 352, rx: 150, ry: 116 },
] as const;

/* Honey-light shimmer blobs — large, very soft, desynced drift. Constant
   array (no Math.random); all dur/delay/colour pairs distinct so the
   caustics never sway in unison. Kept low + biased downward so they read
   as part of the warm pool, not stray lights up top. */
const SHIMMER = [
  { cx: 150, cy: 250, rx: 76, ry: 58, color: D.glow,        op: 0.15, dx: 14, dy: -12, dur: 16, delay: 0.0 },
  { cx: 262, cy: 280, rx: 84, ry: 64, color: D.particleHi,  op: 0.13, dx: -16, dy: -9, dur: 19, delay: 2.4 },
  { cx: 206, cy: 328, rx: 92, ry: 58, color: D.glow,        op: 0.12, dx: 10, dy: 10,  dur: 14, delay: 4.1 },
] as const;

export default function DietWarmth({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (n: string) => 'q8c-dietwarmth-' + n + '-' + uid;

  /* One-shot confirm easing (matches the family flare curve). */
  const flare = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

  /* HERO pool: the luminous CORE of the nectar — slow rise/fall + opacity
     swell. Brighter at its heart now that the field deepens to rich amber
     low. On confirm it brightens + lifts (warmth flaring up), then settles. */
  const poolAnimate = isConfirming
    ? { opacity: 0.82, y: -14 }
    : reduceMotion
      ? { opacity: 0.58, y: -3 }
      : { opacity: [0.5, 0.64, 0.5], y: [0, -7, 0] };
  const poolTransition: Transition = isConfirming ? flare(0.6) : loop(reduceMotion, 6.5);

  /* UPDRAFT plume: a soft vertical lift + breathe so warmth visibly rises
     out of the pool. On confirm it surges up + brightens, then settles. */
  const draftAnimate = isConfirming
    ? { opacity: 0.32, y: -20, scaleY: 1.1 }
    : reduceMotion
      ? { opacity: 0.2, y: -6, scaleY: 1 }
      : { opacity: [0.14, 0.22, 0.14], y: [0, -14, 0], scaleY: [0.96, 1.06, 0.96] };
  const draftTransition: Transition = isConfirming ? flare(0.6) : loop(reduceMotion, 7, 0.3);

  /* Broad warm haze over the whole field — luminous wash, own period. */
  const hazeAnimate = isConfirming
    ? { opacity: 0.16, scale: 1.06 }
    : reduceMotion
      ? { opacity: 0.1, scale: 1 }
      : { opacity: [0.07, 0.12, 0.07], scale: [1, 1.04, 1] };
  const hazeTransition: Transition = isConfirming ? flare(0.6) : loop(reduceMotion, 7.5, 0.5);

  /* Warm depth base — grounds the bottom of the orb; barely moves. */
  const baseAnimate = isConfirming
    ? { opacity: 0.2, y: -4 }
    : reduceMotion
      ? { opacity: 0.15, y: 0 }
      : { opacity: [0.12, 0.18, 0.12], y: [0, -4, 0] };
  const baseTransition: Transition = isConfirming ? flare(0.6) : loop(reduceMotion, 8.5, 0.8);

  /* Warm top-glow — broad faint warm wash where light enters from above, so
     the volume reads lit from the top through to the warm depths below. Wide
     + low opacity; the lightest breathe so it never pulses as a disc. On
     confirm it swells gently as the whole volume warms. */
  const topAnimate = isConfirming
    ? { opacity: 0.16, scaleX: 1.05 }
    : reduceMotion
      ? { opacity: 0.12, scaleX: 1 }
      : { opacity: [0.08, 0.13, 0.08], scaleX: [1, 1.03, 1] };
  const topTransition: Transition = isConfirming ? flare(0.6) : loop(reduceMotion, 9, 1.1);

  /* Corner-depth pools — deeper-amber shading in the lower corners that
     rounds the volume; barely-there opacity breathe. On confirm they deepen
     a touch so the rim reads richer as the core flares. */
  const cornerAnimate = isConfirming
    ? { opacity: 0.2 }
    : reduceMotion
      ? { opacity: 0.15 }
      : { opacity: [0.11, 0.17, 0.11] };
  const cornerTransition: Transition = isConfirming ? flare(0.6) : loop(reduceMotion, 10, 1.6);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Warm glow pool (luminous nectar core): bright warm-light heart →
            warm honey → field amber → clear. Heart pushed brighter/warmer so
            the lower-centre reads as the glowing core against the deepened
            amber low — but kept low-opacity + carried by a wide ellipse so it
            stays a soft pool, never a hot disc. */}
        <radialGradient id={id('pool')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.96" />
          <stop offset="26%" stopColor={D.glow} stopOpacity="0.6" />
          <stop offset="50%" stopColor={D.field} stopOpacity="0.4" />
          <stop offset="74%" stopColor={D.fieldLo} stopOpacity="0.16" />
          <stop offset="100%" stopColor={D.fieldLo} stopOpacity="0" />
        </radialGradient>
        {/* Updraft plume: warm-light core → field amber → clear, read top to
            bottom as warmth thinning upward. Carried by a tall narrow shape. */}
        <linearGradient id={id('draft')} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.85" />
          <stop offset="38%" stopColor={D.field} stopOpacity="0.5" />
          <stop offset="78%" stopColor={D.field} stopOpacity="0.14" />
          <stop offset="100%" stopColor={D.field} stopOpacity="0" />
        </linearGradient>
        {/* Broad warm haze: very soft warm-light wash that charges the field. */}
        <radialGradient id={id('haze')} cx="50%" cy="58%" r="62%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.6" />
          <stop offset="60%" stopColor={D.glow} stopOpacity="0.16" />
          <stop offset="100%" stopColor={D.glow} stopOpacity="0" />
        </radialGradient>
        {/* Warm depth base: deep amber grounding the bottom edge. */}
        <radialGradient id={id('base')} cx="50%" cy="100%" r="72%">
          <stop offset="0%" stopColor={D.deep} stopOpacity="0.7" />
          <stop offset="48%" stopColor={D.fieldLo} stopOpacity="0.34" />
          <stop offset="100%" stopColor={D.fieldLo} stopOpacity="0" />
        </radialGradient>
        {/* Corner depth: deeper-amber falloff rounding the lower side corners
            (deep heart → fieldLo → clear) so the volume feels dimensional. */}
        <radialGradient id={id('corner')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.deep} stopOpacity="0.8" />
          <stop offset="52%" stopColor={D.fieldLo} stopOpacity="0.3" />
          <stop offset="100%" stopColor={D.fieldLo} stopOpacity="0" />
        </radialGradient>
        {/* Warm top-glow: faint honey-light wash where light enters from above
            (glow → fieldTop → clear). Lit-from-above lift toward upper-mid. */}
        <radialGradient id={id('top')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.7" />
          <stop offset="50%" stopColor={D.fieldTop} stopOpacity="0.26" />
          <stop offset="100%" stopColor={D.fieldTop} stopOpacity="0" />
        </radialGradient>
        {/* Honey-light shimmer blob: soft warm caustic. */}
        <radialGradient id={id('shimmer')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.particleHi} stopOpacity="0.9" />
          <stop offset="60%" stopColor={D.glow} stopOpacity="0.3" />
          <stop offset="100%" stopColor={D.glow} stopOpacity="0" />
        </radialGradient>

        {/* Heavy blur welds the pool into a soft, wide, edgeless glow. */}
        <filter id={id('bPool')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
        {/* Soft blur softens the updraft plume into a rising column of light. */}
        <filter id={id('bDraft')} x="-120%" y="-60%" width="340%" height="220%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        {/* Broad soft blur for the field-wide haze. */}
        <filter id={id('bHaze')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        {/* Broad soft blur for the grounding depth base. */}
        <filter id={id('bBase')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        {/* Broad soft blur welding the corner-depth pools into the rim. */}
        <filter id={id('bCorner')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
        {/* Broad soft blur for the warm top-glow wash. */}
        <filter id={id('bTop')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        {/* Heavy blur for the soft drifting shimmer blobs. */}
        <filter id={id('bShimmer')} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      {/* ── Whole atmosphere fades in on entrance ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* ── Layer 1: warm depth base (grounds the bottom of the orb) ── */}
        <motion.ellipse
          cx={200}
          cy={372}
          rx={196}
          ry={132}
          fill={`url(#${id('base')})`}
          filter={`url(#${id('bBase')})`}
          initial={false}
          animate={baseAnimate}
          transition={baseTransition}
          style={{ transformOrigin: '200px 372px' }}
        />

        {/* ── Layer 2: corner-depth pools (round the lower rim) ── */}
        {CORNERS.map((c) => (
          <motion.ellipse
            key={`corner-${c.cx}`}
            cx={c.cx}
            cy={c.cy}
            rx={c.rx}
            ry={c.ry}
            fill={`url(#${id('corner')})`}
            filter={`url(#${id('bCorner')})`}
            initial={false}
            animate={cornerAnimate}
            transition={cornerTransition}
            style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          />
        ))}

        {/* ── Layer 3: warm top-glow (light entering from above) ── */}
        <motion.ellipse
          cx={200}
          cy={96}
          rx={210}
          ry={104}
          fill={`url(#${id('top')})`}
          filter={`url(#${id('bTop')})`}
          initial={false}
          animate={topAnimate}
          transition={topTransition}
          style={{ transformOrigin: '200px 96px' }}
        />

        {/* ── Layer 4: broad warm haze (luminous field wash) ── */}
        <motion.ellipse
          cx={200}
          cy={234}
          rx={186}
          ry={170}
          fill={`url(#${id('haze')})`}
          filter={`url(#${id('bHaze')})`}
          initial={false}
          animate={hazeAnimate}
          transition={hazeTransition}
          style={{ transformOrigin: '200px 234px' }}
        />

        {/* ── Layer 5: honey-light shimmer blobs (subtle drifting caustics) ── */}
        {SHIMMER.map((s) => (
          <motion.ellipse
            key={`shimmer-${s.cx}-${s.cy}`}
            cx={s.cx}
            cy={s.cy}
            rx={s.rx}
            ry={s.ry}
            fill={`url(#${id('shimmer')})`}
            filter={`url(#${id('bShimmer')})`}
            initial={false}
            animate={
              reduceMotion
                ? { opacity: s.op, x: 0, y: 0 }
                : { opacity: [s.op * 0.6, s.op, s.op * 0.6], x: [0, s.dx, 0], y: [0, s.dy, 0] }
            }
            transition={loop(reduceMotion, s.dur, s.delay)}
            style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
          />
        ))}

        {/* ── Layer 6: warm updraft plume — tall, soft, RISING ── */}
        <motion.ellipse
          cx={DRAFT_CX}
          cy={DRAFT_CY}
          rx={56}
          ry={128}
          fill={`url(#${id('draft')})`}
          filter={`url(#${id('bDraft')})`}
          initial={false}
          animate={draftAnimate}
          transition={draftTransition}
          style={{ transformOrigin: `${DRAFT_CX}px ${POOL_CY}px` }}
        />

        {/* ── Layer 7 (HERO): LOW WIDE warm glow pool, breathing + rising ── */}
        <motion.ellipse
          cx={POOL_CX}
          cy={POOL_CY}
          rx={175}
          ry={120}
          fill={`url(#${id('pool')})`}
          filter={`url(#${id('bPool')})`}
          initial={false}
          animate={poolAnimate}
          transition={poolTransition}
          style={{ transformOrigin: `${POOL_CX}px ${POOL_CY}px` }}
        />
      </motion.g>
    </g>
  );
}
