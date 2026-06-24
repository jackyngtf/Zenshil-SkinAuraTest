'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

/* ================================================================== */
/*  Q4 · B 放鬆 (Relaxation) — SPA CANDLE HERO                          */
/*                                                                     */
/*  The HERO of the relax scene: a small Easter-egg homage to the      */
/*  studio's sister brand ISSMEN's "Miss Grace" candle — a TALL,       */
/*  STRAIGHT-SIDED warm brown-amber glass tumbler (clearly taller      */
/*  than wide, a subtle inward taper toward the base), translucent     */
/*  warm brown-amber glass with a bright vertical highlight catching   */
/*  the light on its upper-left, deepening to a darker amber-brown     */
/*  shadow on its right, with a thick rolled glass lip at the open     */
/*  rim. Through the rim sits a pale cream wax surface and a short      */
/*  dark wick. Covering most of the jar's front is a large cream       */
/*  badge-shaped paper label (arched top + scalloped bottom, thin      */
/*  gold-ochre outline) reading, top to bottom: an arched serif        */
/*  "ISSMEN" wordmark, small-caps "EST. 2020", a red small-caps        */
/*  "Hong Kong", two small gold dots flanking a tiny line-art duo of   */
/*  classical robed figures by a pedestal, and bold serif caps "MISS   */
/*  GRACE" anchoring the bottom — plus a few thin fine-print tick      */
/*  lines on the label's inner edge. Above the wick a small, delicate  */
/*  layered TEARDROP FLAME — a blurred warm honey aura, a deep-warm     */
/*  body, and a bright near-white inner core low by the wick — sits in  */
/*  a warm radial GLOW halo, casts a soft warm light wash over the      */
/*  surrounding field, and pools warm light on the wax. A teammate's    */
/*  smoke wisp + bokeh render OVER this hero.                          */
/*                                                                     */
/*  MOTION (deterministic, transform/opacity/path-d only): a LIVING    */
/*  FLAME FLICKER — a subtle, premium d-morph of the flame body + a    */
/*  tiny sway (small x + slight scaleY) + a soft opacity shimmer on    */
/*  the core, with the warm halo pulsing softly in sync. Calm + cozy   */
/*  (a candle at rest in still air), ~few-second eased loops. CONFIRM  */
/*  (~0.6s one-shot, ease [0.32,0.94,0.4,1]): the flame SWELLS taller  */
/*  + brighter and the glow BLOOMS outward once, then settles.         */
/*  reduceMotion: flame parked at a calm mid shape, glow static.       */
/*                                                                     */
/*  GROUNDING: the jar's base sits at local (200,262) — the exact      */
/*  CANDLE_FOOT RelaxScene.tsx anchors to the desk surface — with a    */
/*  single soft contact shadow held tight against the base.            */
/* ================================================================== */

/* Geometry constants — jar CENTRED at x=200, base on the desk at y=262. */
const CX = 200;
const WICK_X = 200;
/* Flame/core paths below are hardcoded around the ORIGINAL pillar-candle
   anchor (y150). They are kept byte-identical (shapes/timing/easing
   untouched per the design contract); the flame is made small + delicate
   purely by SCALING the flame group about its base, and the group is
   positioned so the baked anchor (200,150) lands on the new wick top
   (200, WICK_Y) — this is the "Y-anchor + scale" move, not a reshaping
   of the flame. */
const FLAME_ANCHOR_Y = 150; // the anchor baked into the path constants below
const WICK_Y = 174; // new rim / flame base, just above the wax surface
const FLAME_SCALE = 0.52; // shrinks the big flame to a small delicate one

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

  /* ── Warm GLOW POOL on the wax (the lit melted-wax surface). ── */
  const poolAnim = isConfirming
    ? { opacity: 0.92 }
    : reduceMotion
      ? { opacity: 0.7 }
      : { opacity: [0.6, 0.82, 0.6] };
  const poolTrans: Transition = isConfirming ? bloom(0.6) : flicker(3.6, 0.15);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Amber-brown tinted glass jar body — bright highlight streak
            upper-left (catching light) → deep amber-brown shadow lower-right. */}
        <linearGradient id={id('glass')} x1="10%" y1="6%" x2="96%" y2="96%">
          <stop offset="0%" stopColor="#e8b06a" />
          <stop offset="22%" stopColor="#ca7f3c" />
          <stop offset="52%" stopColor="#a9602b" />
          <stop offset="80%" stopColor="#7d431f" />
          <stop offset="100%" stopColor="#5e3015" />
        </linearGradient>
        {/* Bright vertical highlight streak, upper-left of the glass. */}
        <linearGradient id={id('highlight')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff1d6" stopOpacity="0" />
          <stop offset="45%" stopColor="#ffe9c2" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffe9c2" stopOpacity="0" />
        </linearGradient>
        {/* Rolled glass lip at the rim — thicker, lit toward the flame side. */}
        <linearGradient id={id('lip')} x1="8%" y1="0%" x2="96%" y2="100%">
          <stop offset="0%" stopColor="#f0c483" />
          <stop offset="40%" stopColor="#c4853f" />
          <stop offset="100%" stopColor="#7d431f" />
        </linearGradient>
        {/* Pale cream wax surface visible through the open rim. */}
        <radialGradient id={id('wax')} cx="42%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#fdf3e0" />
          <stop offset="60%" stopColor="#f3e3c4" />
          <stop offset="100%" stopColor="#e3cda3" />
        </radialGradient>
        {/* Label paper — soft cream. */}
        <linearGradient id={id('label')} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#fbf4e6" />
          <stop offset="100%" stopColor="#f2e6cf" />
        </linearGradient>
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
        cy={WICK_Y - 69}
        rx={140}
        ry={120}
        fill={`url(#${id('wash')})`}
        filter={`url(#${id('bWash')})`}
        initial={false}
        animate={washAnim}
        transition={washTrans}
        style={{ transformOrigin: '200px 105px' }}
      />

      {/* ── Contact shadow under the jar — held tight against the base,
            zero vertical gap (no detached "floating" look). ── */}
      <ellipse
        cx={CX}
        cy={262}
        rx={30}
        ry={7}
        fill="#5e3015"
        opacity={0.34}
        filter={`url(#${id('bShadow')})`}
      />

      {/* ── JAR BODY — a TALL, straight-sided amber-glass tumbler with a
            subtle inward taper toward the base (top width 60 at y184,
            base ~52, height 78 → clearly taller than wide). ── */}
      <path
        d="M170 184 L230 184 L226 258 C226 261 221 262 200 262 C179 262 174 261 174 258 Z"
        fill={`url(#${id('glass')})`}
      />
      {/* Bright vertical highlight streak, left third (catching the light). */}
      <path
        d="M180 192 C176 210 176 236 179 256 L187 255 C184 235 184 210 187 193 Z"
        fill={`url(#${id('highlight')})`}
        opacity={0.8}
      />
      {/* Deeper amber-brown shadow toward the right side. */}
      <path
        d="M222 192 L228 194 L225 256 L218 258 C223 235 223 212 222 192 Z"
        fill="#5e3015"
        opacity={0.4}
      />

      {/* ── Rolled glass lip at the rim — thick, slightly overhangs the
            body top. ── */}
      <path
        d="M167 182 C167 178 182 175 200 175 C218 175 233 178 233 182 C233 186 218 189 200 189 C182 189 167 186 167 182 Z"
        fill={`url(#${id('lip')})`}
      />
      {/* Inner rim edge (slightly darker recess where the lip meets the wax). */}
      <ellipse cx={CX} cy={182} rx={27} ry={4.6} fill="#3f2210" opacity={0.55} />

      {/* ── PALE CREAM WAX SURFACE, visible through the open rim ── */}
      <ellipse cx={CX} cy={181} rx={23} ry={3.8} fill={`url(#${id('wax')})`} />

      {/* ── BADGE-SHAPED LABEL covering most of the jar's front — arched
            top, gently scalloped bottom, thin gold-ochre outline. ── */}
      <path
        d="M176 200 C176 196 184 194 200 194 C216 194 224 196 224 200 L223 247 C223 251 217 253.6 208 255 C204.5 255.5 202 255.7 200 255.7 C198 255.7 195.5 255.5 192 255 C183 253.6 177 251 177 247 Z"
        fill={`url(#${id('label')})`}
        stroke="#b9893f"
        strokeWidth={0.6}
      />

      {/* ── Label copy (real <text>, serif) ── */}
      <text
        x={CX}
        y={207}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontSize={5}
        fontWeight={700}
        fill="#5e3015"
        letterSpacing={0.4}
      >
        ISSMEN
      </text>
      <text
        x={CX}
        y={212.5}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={2.4}
        fill="#8a6332"
        letterSpacing={0.5}
      >
        EST. 2020
      </text>
      <text
        x={CX}
        y={217.5}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={2.9}
        fill="#a13a2c"
        letterSpacing={0.4}
      >
        Hong Kong
      </text>

      {/* Small gold dots flanking the tiny line-art emblem. */}
      <circle cx={183} cy={228} r={1.3} fill="#d2a23f" />
      <circle cx={217} cy={228} r={1.3} fill="#d2a23f" />
      {/* Tiny line-art duo of classical robed figures by a pedestal
          (very simple engraving-style linework). */}
      <g
        stroke="#5e3015"
        strokeWidth={0.45}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Pedestal/column, centred. */}
        <path d="M200 225 L200 232 M197.8 232 L202.2 232" />
        {/* Left robed figure. */}
        <path d="M192.8 232 C192.8 228.5 194 226.5 195.5 225.8 C194.8 224.8 194.8 223.5 195.5 222.8 C196.5 222 197.8 222.3 198.3 223.3 C198.8 224.5 198.3 225.5 197.5 226 C198.8 227 199.3 229 199.3 232" />
        {/* Right robed figure. */}
        <path d="M207.2 232 C207.2 228.5 206 226.5 204.5 225.8 C205.2 224.8 205.2 223.5 204.5 222.8 C203.5 222 202.2 222.3 201.7 223.3 C201.2 224.5 201.7 225.5 202.5 226 C201.2 227 200.7 229 200.7 232" />
      </g>

      <text
        x={CX}
        y={248}
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={4.2}
        fontWeight={700}
        fill="#5e3015"
        letterSpacing={0.3}
      >
        MISS GRACE
      </text>

      {/* Thin fine-print tick lines along the label's right inner edge
          (suggestive only — volume/ingredients, not legible). */}
      <g stroke="#b9893f" strokeWidth={0.35} opacity={0.6}>
        <line x1={213} y1={240.5} x2={219} y2={240.5} />
        <line x1={213} y1={241.7} x2={217.5} y2={241.7} />
        <line x1={213} y1={242.9} x2={218.5} y2={242.9} />
      </g>

      {/* ── GLOW POOL of melted wax around the wick (lit) ── */}
      <motion.ellipse
        cx={WICK_X}
        cy={181}
        rx={12}
        ry={3.5}
        fill={`url(#${id('pool')})`}
        filter={`url(#${id('bPool')})`}
        initial={false}
        animate={poolAnim}
        transition={poolTrans}
      />

      {/* ── WICK — a tiny dark wick rising from the wax ── */}
      <path
        d="M200 181 C199.4 178.4 199.6 180 200 178.5 C200.4 180 200.6 178.4 200 181 Z"
        fill="#4a3a2c"
      />
      <line
        x1={200}
        y1={181}
        x2={200}
        y2={WICK_Y}
        stroke="#2f2419"
        strokeWidth={1.4}
        strokeLinecap="round"
      />

      {/* ── WARM HALO around the small flame (blurred, pulses with flicker). ── */}
      <motion.ellipse
        cx={WICK_X}
        cy={160}
        rx={20}
        ry={26}
        fill={`url(#${id('halo')})`}
        filter={`url(#${id('bHalo')})`}
        initial={false}
        animate={haloAnim}
        transition={haloTrans}
        style={{ transformOrigin: '200px 164px' }}
      />

      {/* ── FLAME — layered teardrop above the wick. The big flame is made
            SMALL + delicate by scaling the whole group about its base: the
            group maps the baked path anchor (200,150) onto the new wick top
            (200, WICK_Y) and scales by FLAME_SCALE. The path constants
            themselves, their animate keyframes, and their easing are
            untouched. All flame layers share transformOrigin at the wick
            base so the sway + scaleY pivot from the bottom. ── */}
      <g
        transform={`translate(${WICK_X} ${WICK_Y}) scale(${FLAME_SCALE}) translate(${-WICK_X} ${-FLAME_ANCHOR_Y})`}
      >
        {/* Outer aura (soft blurred warm honey). */}
        <motion.path
          d={isConfirming ? FLAME_SWELL : FLAME_REST}
          fill={`url(#${id('aura')})`}
          filter={`url(#${id('bAura')})`}
          initial={false}
          animate={flameAnim}
          transition={flameTrans}
          style={{ transformOrigin: `${WICK_X}px ${FLAME_ANCHOR_Y}px` }}
        />
        {/* Mid flame body. */}
        <motion.path
          d={isConfirming ? FLAME_SWELL : FLAME_REST}
          fill={`url(#${id('flame')})`}
          initial={false}
          animate={flameAnim}
          transition={flameTrans}
          style={{ transformOrigin: `${WICK_X}px ${FLAME_ANCHOR_Y}px` }}
        />
        {/* Bright inner core (low near the wick). */}
        <motion.path
          d={isConfirming ? CORE_SWELL : CORE_REST}
          fill={`url(#${id('core')})`}
          initial={false}
          animate={coreAnim}
          transition={coreTrans}
          style={{ transformOrigin: `${WICK_X}px ${FLAME_ANCHOR_Y}px` }}
        />
      </g>
    </g>
  );
}
