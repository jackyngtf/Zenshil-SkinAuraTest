'use client';

/* ================================================================== */
/*  Q8 · D 飲食 — WARM VOLUMETRIC LIGHT SHAFTS (depth · god-rays)        */
/*                                                                     */
/*  Renders OVER the base warmth, UNDER the caustics/bubbles. Soft warm */
/*  sun pouring through honey: 5 diffuse light shafts fan DOWN into the  */
/*  orb from an off-centre source above (slightly upper-LEFT for natural */
/*  directional light), giving the orb a lit, deep, dimensional read.   */
/*                                                                     */
/*    SHAFTS (5) — each a long soft wedge (narrow near the source,       */
/*      widening downward) built as a <path>, filled with a vertical     */
/*      gradient (glow / fieldTop bright near the top → transparent,     */
/*      fading well before the bottom) and heavily blurred. Angle fans   */
/*      ~ -8° → +20° from vertical; width / length / opacity vary. Each  */
/*      lives in its own <motion.g> that gently BREATHES (opacity sway)  */
/*      + drifts a hair (±1.5° rotate / a few px x) on a slow desynced   */
/*      loop (8–16s) so the light feels alive, never static or hard.     */
/*    SOURCE GLOW — a single very soft warm patch where the shafts       */
/*      originate (upper-left, just inside the top), kept whisper-faint.  */
/*                                                                     */
/*  OPACITY BUDGET (STRICT): each shaft ≤0.16 — this is depth atmosphere, */
/*  the bubbles are the focal layer. Diffuse, never theatrical beams.    */
/*                                                                     */
/*  CONFIRM (~0.6s one-shot): the light POURS a touch brighter — shafts  */
/*  brighten + lengthen slightly (scaleY) — then settles. Entrance: the  */
/*  whole layer fades in ~0.8s (light gently filling in). reduceMotion:  */
/*  every layer parked at a representative mid state, no repeats.        */
/*  Deterministic only — no Math.random (Math.sin with constant args).   */
/* ================================================================== */

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, sn } from './concernShared';
import type { ConcernPartProps } from './concernShared';

const D = CONCERN.diet;

const CONFIRM_EASE: [number, number, number, number] = [0.32, 0.94, 0.4, 1];

/* A single light shaft: a soft wedge that springs from a point just
   ABOVE the orb (the warm source) and fans DOWN into it, widening as it
   falls. `ox` is the apex x at the source line; `angle` tilts the wedge
   from vertical (negative = leaning left); `len` is how far it falls;
   `topW`/`botW` are the half-widths at the apex + at the fade line. */
type Shaft = {
  ox: number; // apex x at source line (y = SRC_Y)
  angle: number; // degrees from vertical (+ leans right)
  len: number; // length of the wedge down the orb
  topW: number; // half-width near the source (narrow)
  botW: number; // half-width at the wide (lower) end
  color: string;
  op: number; // peak opacity (≤0.16)
  sway: number; // breathe opacity floor multiplier
  rot: number; // tiny rotate drift target (deg, ≤1.5)
  dx: number; // tiny x drift target (px)
  dur: number;
  delay: number;
};

/* The shafts originate just outside the upper area, around (150,40)–(230,40),
   biased upper-LEFT so the light has a natural directional fall. */
const SRC_Y = 40;

/* Constant shaft set — apex xs spread across the upper-left source band,
   angles fanning -8° → +20° from vertical, widths / lengths / opacities
   varied, all dur/delay distinct so the shafts never breathe in unison.
   Brights mixed (glow / fieldTop) for a soft warm spectrum. opacity ≤0.16. */
const SHAFTS: Shaft[] = [
  { ox: 150, angle: -8, len: 322, topW: 14, botW: 52, color: D.glow, op: 0.15, sway: 0.55, rot: 1.2, dx: 5, dur: 11.5, delay: 0.0 },
  { ox: 174, angle: 2, len: 344, topW: 18, botW: 66, color: D.fieldTop, op: 0.13, sway: 0.5, rot: -1.0, dx: -4, dur: 15.0, delay: 2.6 },
  { ox: 196, angle: 8, len: 330, topW: 12, botW: 46, color: D.glow, op: 0.16, sway: 0.6, rot: 1.4, dx: 6, dur: 9.0, delay: 1.3 },
  { ox: 214, angle: 14, len: 312, topW: 16, botW: 58, color: D.fieldTop, op: 0.12, sway: 0.5, rot: -1.3, dx: -5, dur: 13.5, delay: 3.4 },
  { ox: 230, angle: 20, len: 296, topW: 11, botW: 42, color: D.glow, op: 0.14, sway: 0.55, rot: 1.1, dx: 4, dur: 16.0, delay: 0.8 },
];

/* Build a soft wedge path: a quadrilateral from a narrow apex at the
   source line down to a wide base `len` below, tilted by `angle`. The
   wedge is centred on a line from the apex (ox, SRC_Y) heading downward
   at `angle` from vertical; half-widths grow from topW → botW. */
function shaftPath(s: Shaft): string {
  const rad = (s.angle * Math.PI) / 180;
  // Unit direction of the shaft axis (downward, tilted by angle).
  const dirX = Math.sin(rad);
  const dirY = Math.cos(rad);
  // Perpendicular (for the widths).
  const perpX = Math.cos(rad);
  const perpY = -Math.sin(rad);

  // Apex (narrow, near source) + base centre (wide, len down the axis).
  const ax = s.ox;
  const ay = SRC_Y;
  const bx = s.ox + dirX * s.len;
  const by = SRC_Y + dirY * s.len;

  // Four corners: apex left/right (topW) → base right/left (botW).
  const aLx = sn(ax - perpX * s.topW);
  const aLy = sn(ay - perpY * s.topW);
  const aRx = sn(ax + perpX * s.topW);
  const aRy = sn(ay + perpY * s.topW);
  const bRx = sn(bx + perpX * s.botW);
  const bRy = sn(by + perpY * s.botW);
  const bLx = sn(bx - perpX * s.botW);
  const bLy = sn(by - perpY * s.botW);

  return `M ${aLx} ${aLy} L ${aRx} ${aRy} L ${bRx} ${bRy} L ${bLx} ${bLy} Z`;
}

export default function DietRays({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (n: string) => 'q8c-dietrays-' + n + '-' + uid;

  /* One-shot confirm easing (matches the family flare curve). */
  const flare = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: CONFIRM_EASE };

  return (
    <g aria-hidden="true">
      <defs>
        {/* Shaft fill: bright warm light near the source → transparent,
            fading well before the wide end so the shafts dissolve into the
            field rather than ending in a hard edge. Read top→bottom. */}
        <linearGradient id={id('shaft')} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.95" />
          <stop offset="34%" stopColor={D.glow} stopOpacity="0.5" />
          <stop offset="68%" stopColor={D.fieldTop} stopOpacity="0.16" />
          <stop offset="100%" stopColor={D.fieldTop} stopOpacity="0" />
        </linearGradient>
        {/* Soft warm source patch where the shafts originate. */}
        <radialGradient id={id('source')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={D.glow} stopOpacity="0.7" />
          <stop offset="55%" stopColor={D.glow} stopOpacity="0.2" />
          <stop offset="100%" stopColor={D.glow} stopOpacity="0" />
        </radialGradient>

        {/* Heavy soft blur welds each wedge into a diffuse shaft of light
            rather than a hard beam (one stdDeviation per filter). */}
        <filter id={id('bShaft')} x="-70%" y="-40%" width="240%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        {/* Broad soft blur for the faint warm source patch. */}
        <filter id={id('bSource')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* ── Whole shaft layer gently fades in on entrance (light filling in) ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* ── Faint warm source glow (upper-left, where the shafts begin) ── */}
        <motion.ellipse
          cx={188}
          cy={58}
          rx={120}
          ry={72}
          fill={`url(#${id('source')})`}
          filter={`url(#${id('bSource')})`}
          initial={false}
          animate={
            isConfirming
              ? { opacity: 0.22 }
              : reduceMotion
                ? { opacity: 0.12 }
                : { opacity: [0.08, 0.14, 0.08] }
          }
          transition={isConfirming ? flare(0.6) : loop(reduceMotion, 10.0, 0.4)}
          style={{ transformOrigin: '188px 58px' }}
        />

        {/* ── Light shafts: each breathes + drifts a hair on its own loop ── */}
        {SHAFTS.map((s, i) => {
          const d = shaftPath(s);

          // Breathe (opacity sway) + tiny rotate/x drift; on confirm the
          // light pours a touch brighter + lengthens (scaleY), then settles.
          const shaftAnimate = isConfirming
            ? { opacity: Math.min(0.16, s.op * 1.4), rotate: 0, x: 0, scaleY: 1.08 }
            : reduceMotion
              ? { opacity: s.op * 0.82, rotate: 0, x: 0, scaleY: 1 }
              : {
                  opacity: [s.op * s.sway, s.op, s.op * s.sway],
                  rotate: [0, s.rot, 0],
                  x: [0, s.dx, 0],
                  scaleY: [1, 1.02, 1],
                };
          const shaftTransition: Transition = isConfirming
            ? flare(0.6)
            : loop(reduceMotion, s.dur, s.delay);

          return (
            <motion.path
              key={'s' + i}
              d={d}
              fill={`url(#${id('shaft')})`}
              filter={`url(#${id('bShaft')})`}
              initial={false}
              animate={shaftAnimate}
              transition={shaftTransition}
              // Rotate/lengthen about the source apex so the shaft pivots +
              // grows from where the light enters, like a real god-ray.
              style={{ transformOrigin: `${s.ox}px ${SRC_Y}px` }}
            />
          );
        })}
      </motion.g>
    </g>
  );
}
