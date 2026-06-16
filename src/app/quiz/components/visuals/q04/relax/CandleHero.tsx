'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

/* ================================================================== */
/*  Q4 · B 放鬆 (Relaxation) — SPA CANDLE HERO                          */
/*                                                                     */
/*  The HERO of the relax scene: a soft ivory PILLAR candle (lit warm  */
/*  on the flame side, cool shadow on the other, a faint wax           */
/*  translucency) resting on a thin saucer, with a tiny dark wick and  */
/*  a glowing pool of melted wax at its top. Above the wick a premium  */
/*  layered TEARDROP FLAME — a blurred warm honey aura, a deep-warm    */
/*  body, and a bright near-white inner core low by the wick — sits in */
/*  a warm radial GLOW halo, casts a soft warm light wash over the     */
/*  surrounding field, and pools warm light on the candle top. A       */
/*  teammate's smoke wisp + bokeh render OVER this hero.               */
/*                                                                     */
/*  MOTION (deterministic, transform/opacity/path-d only): a LIVING    */
/*  FLAME FLICKER — a subtle, premium d-morph of the flame body + a    */
/*  tiny sway (small x + slight scaleY) + a soft opacity shimmer on    */
/*  the core, with the warm halo pulsing softly in sync. Calm + cozy   */
/*  (a candle at rest in still air), ~few-second eased loops. CONFIRM  */
/*  (~0.6s one-shot, ease [0.32,0.94,0.4,1]): the flame SWELLS taller  */
/*  + brighter and the glow BLOOMS outward once, then settles.         */
/*  reduceMotion: flame parked at a calm mid shape, glow static.       */
/* ================================================================== */

/* Geometry constants — candle CENTRED at x=200, lower-middle. */
const CX = 200;
const WICK_X = 200;
const WICK_Y = 150; // candle top rim / flame base

/* ── Flame body silhouettes (teardrop): three keyframes that share the
   IDENTICAL command structure (M + 4× C) with first === last so the
   d-morph loops seamlessly. A gentle taper from a rounded base at the
   wick up to a soft licking tip. ── */
const FLAME_REST =
  'M200 150 ' +
  'C188 144 186 132 190 121 ' +
  'C193 113 198 110 200 108 ' +
  'C202 110 207 113 210 121 ' +
  'C214 132 212 144 200 150 Z';
const FLAME_LEAN = // tip leans/licks a touch left, base steady
  'M200 150 ' +
  'C187 144 184 131 187 120 ' +
  'C190 112 195 110 197 106 ' +
  'C200 109 206 113 209 122 ' +
  'C213 133 213 144 200 150 Z';
const FLAME_RISE = // tip stretches a touch taller + right
  'M200 150 ' +
  'C189 144 187 130 191 118 ' +
  'C194 110 200 107 203 104 ' +
  'C205 108 209 114 211 123 ' +
  'C214 133 211 144 200 150 Z';

/* Bright inner core — sits LOW near the wick, also a closed teardrop with
   matching command structure across keyframes. */
const CORE_REST =
  'M200 150 C194 147 193 140 195 133 C197 128 199 126 200 124 ' +
  'C201 126 203 128 205 133 C207 140 206 147 200 150 Z';
const CORE_LEAN =
  'M200 150 C193 147 192 139 194 132 C196 127 198 125 199 123 ' +
  'C200 125 203 128 204 133 C206 140 205 147 200 150 Z';
const CORE_RISE =
  'M200 150 C194 147 193 138 196 130 C198 125 200 123 201 121 ' +
  'C202 124 204 127 206 132 C208 139 206 147 200 150 Z';

/* Confirm SWELL — flame stretched taller + a touch wider (one-shot). */
const FLAME_SWELL =
  'M200 151 ' +
  'C185 144 182 126 187 110 ' +
  'C191 99 198 96 200 92 ' +
  'C202 96 209 99 213 110 ' +
  'C218 126 215 144 200 151 Z';
const CORE_SWELL =
  'M200 150 C192 146 190 134 193 122 C196 114 199 111 200 107 ' +
  'C201 111 204 114 207 122 C210 134 208 146 200 150 Z';

export default function CandleHero({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04relax-candle-' + n + '-' + uid;

  /* Calm cozy loop (eased in/out, repeating). */
  const flicker = (duration: number, delay = 0): Transition =>
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
  const bloom = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

  /* ── FLAME BODY: subtle d-morph flicker + tiny sway + slight scaleY.
     On confirm it swells once; reduceMotion parks at the rest shape. ── */
  const flameAnim = isConfirming
    ? { d: FLAME_SWELL, x: 0, scaleY: 1.12, opacity: 1 }
    : reduceMotion
      ? { d: FLAME_REST, x: 0, scaleY: 1, opacity: 0.96 }
      : {
          d: [FLAME_REST, FLAME_LEAN, FLAME_RISE, FLAME_REST],
          x: [0, -1.1, 0.8, 0],
          scaleY: [1, 0.985, 1.025, 1],
          opacity: [0.94, 0.97, 1, 0.94],
        };
  const flameTrans: Transition = isConfirming ? bloom(0.6) : flicker(3.6);

  /* ── INNER CORE: brighter shimmer + its own gentle morph, slightly
     desynced from the body so the flicker feels alive, not locked. ── */
  const coreAnim = isConfirming
    ? { d: CORE_SWELL, scaleY: 1.14, opacity: 1 }
    : reduceMotion
      ? { d: CORE_REST, scaleY: 1, opacity: 0.92 }
      : {
          d: [CORE_REST, CORE_LEAN, CORE_RISE, CORE_REST],
          scaleY: [1, 0.98, 1.03, 1],
          opacity: [0.86, 0.96, 1, 0.86],
        };
  const coreTrans: Transition = isConfirming ? bloom(0.6) : flicker(2.9, 0.2);

  /* ── WARM HALO around the flame: softly pulses in sync with the
     flicker; BLOOMS outward + brightens on confirm. ── */
  const haloAnim = isConfirming
    ? { opacity: 0.6, scale: 1.32 }
    : reduceMotion
      ? { opacity: 0.36, scale: 1 }
      : { opacity: [0.3, 0.42, 0.3], scale: [0.97, 1.05, 0.97] };
  const haloTrans: Transition = isConfirming ? bloom(0.6) : flicker(3.6);

  /* ── Wide warm LIGHT WASH cast on the surrounding field — low opacity,
     breathes gently so the candle clearly lights its surroundings. ── */
  const washAnim = isConfirming
    ? { opacity: 0.34, scale: 1.18 }
    : reduceMotion
      ? { opacity: 0.2, scale: 1 }
      : { opacity: [0.16, 0.24, 0.16], scale: [0.98, 1.03, 0.98] };
  const washTrans: Transition = isConfirming ? bloom(0.6) : flicker(4.4);

  /* ── Warm GLOW POOL on the candle top (the lit melted-wax pool). ── */
  const poolAnim = isConfirming
    ? { opacity: 0.92 }
    : reduceMotion
      ? { opacity: 0.7 }
      : { opacity: [0.6, 0.82, 0.6] };
  const poolTrans: Transition = isConfirming ? bloom(0.6) : flicker(3.6, 0.15);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Wax pillar body: warm-lit on the flame/left-upper side →
            cool wax shadow on the turned-away right side. */}
        <linearGradient id={id('wax')} x1="14%" y1="4%" x2="100%" y2="92%">
          <stop offset="0%" stopColor="#fbf3e8" />
          <stop offset="34%" stopColor="#f6ece0" />
          <stop offset="70%" stopColor="#efe0cf" />
          <stop offset="100%" stopColor="#d9c7b2" />
        </linearGradient>
        {/* Faint vertical translucency band down the wax (subtle inner glow). */}
        <linearGradient id={id('waxGlow')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#ffe9c2" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffe9c2" stopOpacity="0" />
        </linearGradient>
        {/* Candle top rim (the soft ellipse cap), lit toward the flame. */}
        <radialGradient id={id('rim')} cx="46%" cy="34%" r="74%">
          <stop offset="0%" stopColor="#fbf3e8" />
          <stop offset="58%" stopColor="#efe0cf" />
          <stop offset="100%" stopColor="#e3d4c2" />
        </radialGradient>
        {/* Glowing melted-wax pool around the wick. */}
        <radialGradient id={id('pool')} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#fff6d6" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#ffdca0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffdca0" stopOpacity="0" />
        </radialGradient>
        {/* Flame OUTER aura — warm honey, softly blurred. */}
        <radialGradient id={id('aura')} cx="50%" cy="64%" r="60%">
          <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#f6a93e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f6a93e" stopOpacity="0" />
        </radialGradient>
        {/* Flame MID body — deep warm → honey, vertical falloff. */}
        <linearGradient id={id('flame')} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#f6a93e" />
          <stop offset="48%" stopColor="#ffbf5a" />
          <stop offset="100%" stopColor="#ffd27a" />
        </linearGradient>
        {/* Bright INNER core — near-white at the wick → warm cream up top. */}
        <linearGradient id={id('core')} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#fff6d6" />
          <stop offset="100%" stopColor="#ffe9c2" />
        </linearGradient>
        {/* Warm radial halo around the flame. */}
        <radialGradient id={id('halo')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.9" />
          <stop offset="42%" stopColor="#ffdca0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffdca0" stopOpacity="0" />
        </radialGradient>
        {/* Wide soft warm wash cast on the surroundings. */}
        <radialGradient id={id('wash')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9c2" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#ffdca0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffdca0" stopOpacity="0" />
        </radialGradient>
        {/* Saucer/holder gradient — thin warm ellipse. */}
        <radialGradient id={id('saucer')} cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#f3e6d4" />
          <stop offset="70%" stopColor="#e3d4c2" />
          <stop offset="100%" stopColor="#d2bfa6" />
        </radialGradient>

        {/* Static blur filters — never animated. */}
        <filter id={id('bWash')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
        <filter id={id('bHalo')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={id('bAura')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={id('bPool')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={id('bShadow')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* ── WIDE WARM WASH on the surroundings (behind everything) ── */}
      <motion.ellipse
        cx={CX}
        cy={150}
        rx={160}
        ry={132}
        fill={`url(#${id('wash')})`}
        filter={`url(#${id('bWash')})`}
        initial={false}
        animate={washAnim}
        transition={washTrans}
        style={{ transformOrigin: `${CX}px 150px` }}
      />

      {/* ── Contact shadow under the saucer ── */}
      <ellipse
        cx={CX}
        cy={266}
        rx={52}
        ry={11}
        fill="#c8b297"
        opacity={0.32}
        filter={`url(#${id('bShadow')})`}
      />

      {/* ── SAUCER / holder — thin soft ellipse under the candle ── */}
      <ellipse cx={CX} cy={263} rx={46} ry={9} fill={`url(#${id('saucer')})`} />
      <ellipse cx={CX} cy={261.4} rx={40} ry={6} fill="#fbf3e8" opacity={0.45} />

      {/* ── WAX PILLAR body (x176–224, base ~y260) ── */}
      <g>
        {/* Body with a softly rounded base. */}
        <path
          d="M176 158 L176 256 C176 261 180 263 186 263 L214 263 C220 263 224 261 224 256 L224 158 Z"
          fill={`url(#${id('wax')})`}
        />
        {/* Faint vertical translucency / warm inner glow band. */}
        <rect
          x={182}
          y={158}
          width={20}
          height={104}
          rx={9}
          fill={`url(#${id('waxGlow')})`}
        />
        {/* Soft cool shadow strip on the turned-away (right) side. */}
        <path
          d="M212 160 L212 256 C212 260 214 262 218 262 L222 262 C223 261 224 259 224 256 L224 160 Z"
          fill="#d9c7b2"
          opacity={0.55}
        />
        {/* Ivory rim-light catching the lit (left) edge. */}
        <path
          d="M178 162 L178 254"
          fill="none"
          stroke="#fbf3e8"
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.7}
        />
      </g>

      {/* ── TOP RIM with a shallow melted dip (soft ellipse cap) ── */}
      <ellipse cx={CX} cy={158} rx={24} ry={7} fill={`url(#${id('rim')})`} />
      {/* Shallow melted dip — slightly darker recess inside the rim. */}
      <ellipse cx={CX} cy={158.6} rx={17} ry={4.4} fill="#e3d4c2" opacity={0.75} />

      {/* ── GLOW POOL of melted wax around the wick (lit) ── */}
      <motion.ellipse
        cx={WICK_X}
        cy={156}
        rx={16}
        ry={5.4}
        fill={`url(#${id('pool')})`}
        filter={`url(#${id('bPool')})`}
        initial={false}
        animate={poolAnim}
        transition={poolTrans}
      />

      {/* ── WICK — a tiny dark wick at top centre ── */}
      <path
        d="M200 156 C199.4 153 199.6 151 200 149.5 C200.4 151 200.6 153 200 156 Z"
        fill="#4a3a2c"
      />
      <line
        x1={200}
        y1={154}
        x2={200}
        y2={150}
        stroke="#2f2419"
        strokeWidth={1.4}
        strokeLinecap="round"
      />

      {/* ── WARM HALO around the flame (blurred, pulses with flicker) ── */}
      <motion.ellipse
        cx={WICK_X}
        cy={128}
        rx={34}
        ry={42}
        fill={`url(#${id('halo')})`}
        filter={`url(#${id('bHalo')})`}
        initial={false}
        animate={haloAnim}
        transition={haloTrans}
        style={{ transformOrigin: `${WICK_X}px 132px` }}
      />

      {/* ── FLAME — layered teardrop above the wick.
            All flame layers share transformOrigin at the wick base so the
            sway + scaleY pivot from the bottom (a flame rooted at the wick). ── */}
      {/* Outer aura (soft blurred warm honey). */}
      <motion.path
        d={isConfirming ? FLAME_SWELL : FLAME_REST}
        fill={`url(#${id('aura')})`}
        filter={`url(#${id('bAura')})`}
        initial={false}
        animate={flameAnim}
        transition={flameTrans}
        style={{ transformOrigin: `${WICK_X}px ${WICK_Y}px` }}
      />
      {/* Mid flame body. */}
      <motion.path
        d={isConfirming ? FLAME_SWELL : FLAME_REST}
        fill={`url(#${id('flame')})`}
        initial={false}
        animate={flameAnim}
        transition={flameTrans}
        style={{ transformOrigin: `${WICK_X}px ${WICK_Y}px` }}
      />
      {/* Bright inner core (low near the wick). */}
      <motion.path
        d={isConfirming ? CORE_SWELL : CORE_REST}
        fill={`url(#${id('core')})`}
        initial={false}
        animate={coreAnim}
        transition={coreTrans}
        style={{ transformOrigin: `${WICK_X}px ${WICK_Y}px` }}
      />
    </g>
  );
}
