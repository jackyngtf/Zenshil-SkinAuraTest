'use client';

import { motion } from 'framer-motion';
import { loop } from '../ritualShared';
import { FROOM, COUNTER_Y, sn } from './facialRoom';
import type { FacialPartProps } from './facialRoom';

/* ================================================================== */
/*  Q10·D「煥膚梳妝角」— skincare PRODUCTS on the vanity counter.         */
/*  Objects stand on the surface at y≈COUNTER_Y (286) in the           */
/*  CENTER-LEFT zone (x≈108–250), clear of the round mirror + rose a   */
/*  teammate draws upper-right (x≈300). Left→right on the counter:      */
/*    • a low CREAM JAR with a gold lid          (~x118)               */
/*    • a shallow DISH the serum lands in        (~x150)               */
/*    • a SERUM DROPPER poised over the dish      (~x150, the HERO)     */
/*    • two slim PRODUCT BOTTLES, gold caps       (~x196 & ~x224)       */
/*  HERO MOTION: a glossy blush drop swells at the dropper tip, falls   */
/*  into the dish, and a ripple ring expands on the dish — a calm ~6s   */
/*  loop. Lit from the UPPER-LEFT (dawn): highlights upper-left, soft   */
/*  shadow lower-right. Renders a single <g> (defs inside) so it        */
/*  composites into RitualFacialScene without an extra <svg>. Only      */
/*  opacity/transform/d/r/cy ever animate — never filter attributes.    */
/* ================================================================== */

/* Counter-surface y the objects sit on. Bases hug this line so nothing
   floats; tops rise upward from here. */
const CY = COUNTER_Y; // 286

/* Hero drop travel: tip at y≈268 → dish surface at y≈280. The drop swells
   in place, then falls these ~12px and "lands" as a ripple. */
const TIP_Y = 268;
const DISH_Y = 280;

export default function VanityProducts({ uid, isConfirming, reduceMotion }: FacialPartProps) {
  const ns = (name: string) => `q10-vanP-${name}-${uid}`;
  const url = (name: string) => `url(#${ns(name)})`;

  /* ── HERO drop keyframe timeline (loop ~6s) ────────────────────────
        A single <motion.circle> plays the whole swell→fall→fade cycle by
        animating cy + r + opacity together over shared `times`. It rests
        invisible at the tip, swells, falls to the dish, then fades as the
        ripple takes over. On confirm it releases bigger and faster. */
  const dropAnim = isConfirming
    ? { cy: [TIP_Y, TIP_Y, DISH_Y], r: [2.4, 4.2, 3], opacity: [1, 1, 0] }
    : reduceMotion
      ? { cy: TIP_Y, r: 2.6, opacity: 1 } // a single static bead clinging to the tip
      : {
          cy: [TIP_Y, TIP_Y, TIP_Y, DISH_Y, DISH_Y],
          r: [0.4, 2.6, 2.9, 2.4, 0],
          opacity: [0, 1, 1, 1, 0],
        };
  const dropTimes = isConfirming ? [0, 0.4, 1] : [0, 0.32, 0.5, 0.86, 1];
  const dropTrans = isConfirming
    ? { duration: 0.5, ease: 'easeIn' as const, times: dropTimes }
    : reduceMotion
      ? { duration: 0 }
      : { duration: 6, repeat: Infinity, ease: 'easeIn' as const, times: dropTimes };

  /* ── Ripple ring on the dish (expands as the drop lands) ──
        Desynced from the drop so the ring blooms just after impact. */
  const rippleAnim = isConfirming
    ? { r: [1, 16], opacity: [0.6, 0] }
    : reduceMotion
      ? { r: 4, opacity: 0 }
      : { r: [1, 1, 12], opacity: [0, 0.5, 0] };
  const rippleTrans = isConfirming
    ? { duration: 0.6, ease: 'easeOut' as const }
    : reduceMotion
      ? { duration: 0 }
      : { duration: 6, repeat: Infinity, ease: 'easeOut' as const, times: [0, 0.82, 1] };

  /* Faint glass shimmer that sweeps the bottles — opacity-only, slow. */
  const shimmerAnim = reduceMotion
    ? { opacity: 0.4 }
    : { opacity: [0.25, 0.6, 0.25] };

  return (
    <g>
      <defs>
        {/* Frosted-glass body — ivory, lit upper-left → shadow lower-right. */}
        <linearGradient id={ns('glass')} x1="14%" y1="6%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={FROOM.glassHi} />
          <stop offset="52%" stopColor={FROOM.glassMid} />
          <stop offset="100%" stopColor={FROOM.glassLo} />
        </linearGradient>
        {/* Gold cap — soft champagne gold, brighter on the lit left. */}
        <linearGradient id={ns('gold')} x1="10%" y1="10%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={FROOM.goldHi} />
          <stop offset="58%" stopColor={FROOM.gold} />
          <stop offset="100%" stopColor="#a8854f" />
        </linearGradient>
        {/* Blush serum inside the pipette barrel (vertical fill). */}
        <linearGradient id={ns('serum')} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={FROOM.serumHi} />
          <stop offset="55%" stopColor={FROOM.serumMid} />
          <stop offset="100%" stopColor={FROOM.serumLo} />
        </linearGradient>
        {/* Glossy blush drop — bright upper-left specular per the family optics. */}
        <radialGradient id={ns('drop')} cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="34%" stopColor={FROOM.serumHi} />
          <stop offset="100%" stopColor={FROOM.serumMid} />
        </radialGradient>
        {/* Shallow dish — crystal/ceramic, light upper-left. */}
        <radialGradient id={ns('dish')} cx="36%" cy="24%" r="92%">
          <stop offset="0%" stopColor={FROOM.glassHi} />
          <stop offset="56%" stopColor={FROOM.cream} />
          <stop offset="100%" stopColor={FROOM.glassLo} />
        </radialGradient>
        {/* Cream jar body — squat, soft ivory. */}
        <linearGradient id={ns('jar')} x1="16%" y1="8%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={FROOM.cream} />
          <stop offset="60%" stopColor={FROOM.glassMid} />
          <stop offset="100%" stopColor={FROOM.glassLo} />
        </linearGradient>
        {/* Rubber bulb cap atop the dropper — warm blush, matte. */}
        <linearGradient id={ns('bulb')} x1="20%" y1="6%" x2="86%" y2="100%">
          <stop offset="0%" stopColor={FROOM.rose} />
          <stop offset="60%" stopColor={FROOM.blush} />
          <stop offset="100%" stopColor={FROOM.roseDeep} />
        </linearGradient>
        {/* Soft blush bloom that washes the dish on confirm. */}
        <radialGradient id={ns('bloom')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={FROOM.rose} stopOpacity="0.85" />
          <stop offset="60%" stopColor={FROOM.blush} stopOpacity="0.3" />
          <stop offset="100%" stopColor={FROOM.blush} stopOpacity="0" />
        </radialGradient>
        {/* Blur passes — each stdDeviation defined exactly once. */}
        <filter id={ns('b2')} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={ns('b5')} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ── Contact shadows on the counter (y≈COUNTER_Y), lower-right bias
            so each object sits ON the surface, not floating. Static. ── */}
      <g filter={url('b5')} opacity={0.16}>
        <ellipse cx={120} cy={CY + 3} rx={18} ry={5.5} fill={FROOM.deep} />
        <ellipse cx={151} cy={CY + 3} rx={22} ry={6} fill={FROOM.deep} />
        <ellipse cx={198} cy={CY + 3} rx={14} ry={5} fill={FROOM.deep} />
        <ellipse cx={226} cy={CY + 3} rx={14} ry={5} fill={FROOM.deep} />
      </g>

      {/* ════ CREAM JAR (far left, ~x118) ════
            A squat rounded jar y272–288 with a low gold lid y268–274. */}
      <g>
        {/* Jar body — wide and short, soft shoulders. */}
        <path
          d="M101 274 C101 282 107 288 118 288 C129 288 135 282 135 274 C135 270 129 268 118 268 C107 268 101 270 101 274 Z"
          fill={url('jar')}
        />
        {/* Gold lid sitting on top — a low rounded cap. */}
        <path
          d="M103 272 C103 266 110 263 118 263 C126 263 133 266 133 272 C127 275 109 275 103 272 Z"
          fill={url('gold')}
        />
        {/* Lit ivory rim down the left edge of the body. */}
        <path
          d="M103 273 C102 278 104 283 108 286"
          fill="none"
          stroke={FROOM.glassHi}
          strokeWidth={1.1}
          strokeLinecap="round"
          opacity={0.7}
        />
        {/* Tiny gold lid highlight, upper-left. */}
        <ellipse cx={112} cy={267} rx={6} ry={1.8} fill={FROOM.goldHi} opacity={0.7} />
      </g>

      {/* ════ SHALLOW DISH (~x150) ════
            A wide crystal saucer y276–288 the serum lands in. Drawn before
            the dropper so the pipette tip reads as hovering above it. */}
      <g>
        {/* Dish bowl — a shallow curved vessel. */}
        <path
          d="M126 280 C126 286 138 290 151 290 C164 290 176 286 176 280 C166 277 136 277 126 280 Z"
          fill={url('dish')}
        />
        {/* Inner pool shadow (the rim catches light, the well dips). */}
        <ellipse cx={151} cy={280} rx={23} ry={3.6} fill={FROOM.deep} opacity={0.14} />
        {/* Lit rim-light along the upper-left lip. */}
        <path
          d="M129 279 C137 276.5 151 276 165 277.4"
          fill="none"
          stroke={FROOM.glassHi}
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.75}
        />

        {/* Confirm-only blush bloom washing the dish pool. */}
        <motion.ellipse
          cx={151}
          cy={281}
          rx={26}
          ry={7}
          fill={url('bloom')}
          filter={url('b2')}
          initial={false}
          animate={{ opacity: isConfirming ? 0.85 : 0 }}
          transition={{ duration: isConfirming ? 0.5 : 0.35, ease: 'easeOut' }}
        />

        {/* HERO ripple ring expanding from the impact point on the pool. */}
        <motion.circle
          cx={151}
          cy={281}
          r={1}
          fill="none"
          stroke={FROOM.serumMid}
          strokeWidth={1.2}
          initial={false}
          animate={rippleAnim}
          transition={rippleTrans}
        />
      </g>

      {/* ════ SERUM DROPPER (the HERO, poised over the dish ~x150) ════
            Held vertical: rubber bulb cap y198–212, a slim glass pipette
            barrel y212–262 with blush serum inside, a fine tapering tip to
            y268. A glossy drop forms at the tip and falls into the dish. */}
      <g>
        {/* Glass barrel — slim cylinder, frosted ivory. */}
        <rect x={145} y={212} width={12} height={50} rx={5} fill={url('glass')} />
        {/* Blush serum filling the lower ~2/3 of the barrel. */}
        <rect x={147} y={228} width={8} height={32} rx={3} fill={url('serum')} opacity={0.92} />
        {/* Serum meniscus — a soft curved top to the fill. */}
        <path d="M147 229 C150 227 154 227 155 229" fill="none" stroke={FROOM.serumHi} strokeWidth={1} opacity={0.8} />
        {/* Lit ivory rim down the left edge of the glass. */}
        <path
          d="M146.5 214 C145.4 226 145.4 250 146.5 260"
          fill="none"
          stroke={FROOM.glassHi}
          strokeWidth={1.1}
          strokeLinecap="round"
          opacity={0.78}
        />
        {/* Fine tip tapering from the barrel down to the drop point (~y268). */}
        <path d="M148 262 C148 266 150 268 151 268 C152 268 154 266 154 262 Z" fill={url('glass')} />

        {/* Rubber bulb cap — a soft squeezed dome over a collar. */}
        <rect x={146} y={208} width={10} height={6} rx={2.5} fill={url('bulb')} />
        <path
          d="M147 209 C145 200 149 196 151 196 C153 196 157 200 155 209 C152 211 150 211 147 209 Z"
          fill={url('bulb')}
        />
        {/* Bulb highlight, upper-left. */}
        <ellipse cx={149} cy={200} rx={2} ry={3} fill={FROOM.rose} opacity={0.7} transform="rotate(-18 149 200)" />

        {/* HERO drop — swells at the tip, falls, fades. Glossy blush body
            with a bright upper-left specular baked into its gradient, plus a
            tiny moving specular dot that rides along. */}
        <motion.circle
          cx={151}
          fill={url('drop')}
          initial={false}
          animate={dropAnim}
          transition={dropTrans}
        />
        {/* Sharp specular pin-dot on the drop (rides with it, upper-left). */}
        <motion.circle
          cx={149.4}
          r={0.8}
          fill="#ffffff"
          initial={false}
          animate={
            isConfirming
              ? { cy: [TIP_Y - 1.4, TIP_Y - 1.4, DISH_Y - 1.4], opacity: [0.9, 0.9, 0] }
              : reduceMotion
                ? { cy: TIP_Y - 1.4, opacity: 0.85 }
                : {
                    cy: [TIP_Y - 1.4, TIP_Y - 1.4, TIP_Y - 1.4, DISH_Y - 1.4, DISH_Y - 1.4],
                    opacity: [0, 0.85, 0.85, 0.7, 0],
                  }
          }
          transition={dropTrans}
        />
      </g>

      {/* ════ TWO PRODUCT BOTTLES (right of the dropper) ════
            Slim frosted cylinders with soft gold caps. Premium serum/essence
            — the left one (x196) slightly taller than the right (x224). */}
      {[
        { x: 191, w: 14, bodyTop: 252, capTop: 240, capH: 12, name: 'L' },
        { x: 219, w: 12, bodyTop: 258, capTop: 248, capH: 10, name: 'R' },
      ].map((b) => {
        const cxMid = sn(b.x + b.w / 2);
        const capX = sn(b.x + 1.5);
        const capW = sn(b.w - 3);
        return (
          <g key={b.name}>
            {/* Frosted glass body to the counter (y288). */}
            <rect x={b.x} y={b.bodyTop} width={b.w} height={sn(288 - b.bodyTop)} rx={4} fill={url('glass')} />
            {/* Slim neck between body and cap. */}
            <rect x={capX} y={sn(b.capTop + b.capH - 2)} width={capW} height={3} rx={1.4} fill={FROOM.glassMid} />
            {/* Soft gold cap. */}
            <rect x={capX} y={b.capTop} width={capW} height={b.capH} rx={2.2} fill={url('gold')} />
            {/* Gold cap highlight, upper-left. */}
            <rect x={sn(capX + 1)} y={sn(b.capTop + 1.5)} width={2} height={sn(b.capH - 3)} rx={1} fill={FROOM.goldHi} opacity={0.7} />
            {/* Lit ivory rim down the left edge of the glass body. */}
            <path
              d={`M${sn(b.x + 1.3)} ${sn(b.bodyTop + 3)} L${sn(b.x + 1.3)} 285`}
              fill="none"
              stroke={FROOM.glassHi}
              strokeWidth={1.1}
              strokeLinecap="round"
              opacity={0.78}
            />
            {/* Faint glass shimmer band sweeping the body (opacity-only loop). */}
            <motion.rect
              x={sn(cxMid + 1)}
              y={sn(b.bodyTop + 4)}
              width={1.6}
              height={sn(288 - b.bodyTop - 8)}
              rx={0.8}
              fill={FROOM.glassHi}
              initial={false}
              animate={shimmerAnim}
              transition={loop(reduceMotion, b.name === 'L' ? 5.6 : 6.4, b.name === 'L' ? 0 : 0.8)}
            />
          </g>
        );
      })}
    </g>
  );
}
