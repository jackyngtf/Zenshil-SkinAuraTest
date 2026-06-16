'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import { NAT, HORIZON_Y, sn } from './natureVista';
import type { VistaPartProps } from './natureVista';
import { loop } from '../ritualShared';

/* ================================================================== */
/*  Q10·C「自然遠景」— Hills & Water (depth core)                       */
/*  Layered misty mountain ridges receding into haze ABOVE the         */
/*  horizon (y=236), and a calm reflective water plane BELOW it. The   */
/*  craft is atmospheric perspective: the farthest ridge is highest,   */
/*  lightest and lowest-contrast; each nearer ridge drops, grows,      */
/*  darkens and crisps up. Below, a faint mirrored, desaturated echo   */
/*  of the near hills + slow sideways shimmer sells the still water.   */
/*  The scene draws sky behind, and mist + foreground foliage in       */
/*  front, so this layer stays purely silhouettes + water.             */
/* ================================================================== */

/* ── Ridge profile generator ──
   One soft, rounded silhouette spanning x −10→410 with gentle bezier
   humps; `base` is the ridgeline's resting band (its valleys), and the
   per-peak `humps` lift the crests above it. Every ridge closes down
   to y=420 so it fills solidly to the waterline behind nearer layers.
   Keeping the command structure identical across ridges lets us flip
   any of them for the water reflection with a single transform. */
type Hump = { x: number; lift: number };

const ridgeD = (base: number, humps: Hump[]) => {
  const left = -10;
  const right = 410;
  // Start at the left edge sitting on the base band.
  let d = `M${sn(left)} ${sn(base)} `;
  let prevX = left;
  let prevY = base;
  for (const h of humps) {
    // Crest peak of this hump.
    const peakY = base - h.lift;
    // Control points: rise to the crest, settle back to the base band.
    // cp1 pulls up just before the peak; cp2 eases down just after.
    const cp1x = prevX + (h.x - prevX) * 0.5;
    const cp2x = h.x - (h.x - prevX) * 0.18;
    d += `C${sn(cp1x)} ${sn(prevY)} ${sn(cp2x)} ${sn(peakY)} ${sn(h.x)} ${sn(peakY)} `;
    prevX = h.x;
    prevY = peakY;
  }
  // Ease back down to the base band at the right edge.
  const cpx = prevX + (right - prevX) * 0.5;
  d += `C${sn(cpx)} ${sn(prevY)} ${sn(right - (right - prevX) * 0.3)} ${sn(base)} ${sn(right)} ${sn(base)} `;
  // Close the silhouette just below the waterline (HORIZON_Y) — NOT down
  // to the bottom — so the ridges sit ABOVE the water and never paint over
  // the (lighter) water plane + reflection drawn beneath them.
  d += `L${sn(right)} ${sn(HORIZON_Y + 2)} L${sn(left)} ${sn(HORIZON_Y + 2)} Z`;
  return d;
};

/* Four receding ridgelines, far → near. Bases climb DOWN toward the
   horizon (236); peaks sit progressively lower as they approach. The
   farthest ridge peaks near y≈150, the nearest near y≈205. Humps are
   desynced in x so the ridges read as distinct landforms, not echoes. */
const RIDGE_FAR = ridgeD(212, [
  { x: 56, lift: 58 },
  { x: 168, lift: 70 },
  { x: 296, lift: 50 },
]);
const RIDGE_MID = ridgeD(222, [
  { x: 22, lift: 44 },
  { x: 132, lift: 58 },
  { x: 244, lift: 40 },
  { x: 352, lift: 52 },
]);
const RIDGE_NEAR = ridgeD(230, [
  { x: 84, lift: 36 },
  { x: 210, lift: 46 },
  { x: 330, lift: 30 },
]);
const RIDGE_DEEP = ridgeD(236, [
  { x: 40, lift: 22 },
  { x: 150, lift: 30 },
  { x: 286, lift: 20 },
  { x: 386, lift: 26 },
]);

/* Shimmer band: a soft horizontal sliver of light on the water that
   drifts sideways. `y` sets its depth below the horizon. */
type Shimmer = { y: number; rx: number; opacity: number; drift: number; dur: number; delay: number };

const SHIMMERS: Shimmer[] = [
  { y: 262, rx: 150, opacity: 0.5, drift: 26, dur: 9.4, delay: 0.4 },
  { y: 300, rx: 178, opacity: 0.38, drift: -22, dur: 8.1, delay: 2.6 },
  { y: 344, rx: 134, opacity: 0.3, drift: 30, dur: 10.2, delay: 1.3 },
];

export default function VistaHills({ uid, isConfirming, reduceMotion }: VistaPartProps) {
  const rid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q10-vistaH-${name}-${uid || rid}`;

  /* Confirm one-shot (~0.5s): water brightens, far ridges lift + clarify. */
  const confirmShot = (duration: number) =>
    reduceMotion ? { duration: 0 } : { duration, ease: 'easeOut' as const };

  return (
    <g>
      <defs>
        {/* Water plane: calm cool sage-grey, darkening with depth */}
        <linearGradient id={id('water')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0e9dd" />
          <stop offset="50%" stopColor={NAT.water} />
          <stop offset="100%" stopColor="#b9cabb" />
        </linearGradient>
        {/* Warm light pooling on the water from the upper-left */}
        <radialGradient id={id('pool')} cx="32%" cy="8%" r="80%">
          <stop offset="0%" stopColor={NAT.sun} stopOpacity="0.6" />
          <stop offset="48%" stopColor={NAT.sun} stopOpacity="0.18" />
          <stop offset="100%" stopColor={NAT.sun} stopOpacity="0" />
        </radialGradient>
        {/* Haze band pooling at each ridge base — fades the foot of the hill */}
        <linearGradient id={id('haze')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={NAT.mist} stopOpacity="0" />
          <stop offset="100%" stopColor={NAT.mist} stopOpacity="0.85" />
        </linearGradient>
        {/* A single soft shimmer sliver, brightest at its centre */}
        <radialGradient id={id('shim')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={NAT.waterHi} stopOpacity="0.9" />
          <stop offset="60%" stopColor={NAT.waterHi} stopOpacity="0.3" />
          <stop offset="100%" stopColor={NAT.waterHi} stopOpacity="0" />
        </radialGradient>
        <filter id={id('b3')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={id('b6')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={id('b9')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        {/* Clip every reflection to the water plane so flipped hills can
            never bleed up above the horizon. */}
        <clipPath id={id('waterclip')}>
          <rect x="-10" y={HORIZON_Y} width="420" height={400 - HORIZON_Y} />
        </clipPath>
      </defs>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  WATER PLANE (below the horizon)                              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <rect x="-10" y={HORIZON_Y} width="420" height={400 - HORIZON_Y} fill={`url(#${id('water')})`} />

      {/* Mirrored reflection of the near hills: the near + deep ridge
          shapes flipped vertically about y=HORIZON_Y, faint, blurred and
          desaturated, clipped to the water. scale(1,-1) about the
          horizon = translate(0, 2*HORIZON_Y) scale(1,-1). */}
      <g clipPath={`url(#${id('waterclip')})`}>
        <motion.g
          transform={`translate(0 ${2 * HORIZON_Y}) scale(1 -1)`}
          filter={`url(#${id('b6')})`}
          initial={false}
          animate={
            reduceMotion
              ? { opacity: 0.2 }
              : { opacity: [0.16, 0.24, 0.16] }
          }
          transition={loop(reduceMotion, 9.6)}
        >
          <path d={RIDGE_NEAR} fill={NAT.hillNear} opacity="0.6" />
          <path d={RIDGE_DEEP} fill={NAT.hillDeep} opacity="0.55" />
        </motion.g>

        {/* Warm light pooling on the water surface, upper-left */}
        <rect
          x="-10"
          y={HORIZON_Y}
          width="420"
          height={400 - HORIZON_Y}
          fill={`url(#${id('pool')})`}
        />

        {/* Drifting shimmer lines */}
        {SHIMMERS.map((s) => (
          <motion.ellipse
            key={`shim-${s.y}`}
            cx={200}
            cy={s.y}
            rx={s.rx}
            ry={2.6}
            fill={`url(#${id('shim')})`}
            filter={`url(#${id('b3')})`}
            initial={false}
            animate={
              reduceMotion
                ? { x: 0, opacity: s.opacity * 0.7 }
                : { x: [0, s.drift, 0], opacity: [s.opacity * 0.55, s.opacity, s.opacity * 0.55] }
            }
            transition={loop(reduceMotion, s.dur, s.delay)}
          />
        ))}

        {/* Confirm: the water surface brightens all at once */}
        <motion.rect
          x="-10"
          y={HORIZON_Y}
          width="420"
          height={400 - HORIZON_Y}
          fill={NAT.waterHi}
          initial={false}
          animate={{ opacity: isConfirming ? 0.3 : 0 }}
          transition={confirmShot(0.5)}
        />
      </g>

      {/* ════════════════════════════════════════════════════════════ */}
      {/*  LAYERED HILLS (above the horizon) — far → near               */}
      {/*  Atmospheric perspective: far = highest/lightest/haziest/      */}
      {/*  lowest-contrast; near = lower/larger/darker/crisper.          */}
      {/* ════════════════════════════════════════════════════════════ */}

      {/* FAR ridge — lifts + clarifies slightly on confirm (clarity beat) */}
      <motion.path
        d={RIDGE_FAR}
        fill={NAT.hillFar}
        filter={`url(#${id('b3')})`}
        initial={false}
        animate={isConfirming ? { y: -3, opacity: 0.92 } : { y: 0, opacity: 0.66 }}
        transition={confirmShot(0.5)}
      />
      {/* Haze pooling at the far ridge base — the strongest, sells distance */}
      <rect
        x="-10"
        y={196}
        width="420"
        height={44}
        fill={`url(#${id('haze')})`}
        opacity="0.55"
        filter={`url(#${id('b9')})`}
      />

      {/* MID ridge */}
      <path d={RIDGE_MID} fill={NAT.hillMid} opacity="0.84" filter={`url(#${id('b3')})`} />
      <rect
        x="-10"
        y={206}
        width="420"
        height={34}
        fill={`url(#${id('haze')})`}
        opacity="0.4"
        filter={`url(#${id('b6')})`}
      />

      {/* NEAR ridge — the sage accent, crisp (no blur) */}
      <path d={RIDGE_NEAR} fill={NAT.hillNear} opacity="0.94" />
      <rect
        x="-10"
        y={214}
        width="420"
        height={26}
        fill={`url(#${id('haze')})`}
        opacity="0.28"
        filter={`url(#${id('b6')})`}
      />

      {/* DEEP ridge — nearest, darkest, crispest; anchors the horizon */}
      <path d={RIDGE_DEEP} fill={NAT.hillDeep} />

      {/* The horizon line itself: a faint warm seam where hills meet water */}
      <rect x="-10" y={HORIZON_Y - 1.5} width="420" height={3} fill={NAT.mist} opacity="0.3" filter={`url(#${id('b3')})`} />
    </g>
  );
}
