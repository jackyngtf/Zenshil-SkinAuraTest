'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, sn } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  Q8 · C 壓力 — STRESS FRACTURES (the hero of the scene)              */
/*                                                                     */
/*  A web of cracks spreading from an off-centre stress point on a      */
/*  tense steel-violet orb. Each crack is built up so it reads as a      */
/*  DIMENSIONAL fracture catching light — NOT a flat pencil line:        */
/*    1. SEAT   — soft wide blurred dark line; the crack sits in the     */
/*                surface with depth.                                    */
/*    2. RECESS — dark crack body (the cut into the glaze).              */
/*    3. LIT LIP — thin bright highlight on the SAME path, offset up-    */
/*                left, so light catches one raised edge (relief). The   */
/*                lips FLICKER subtly under strain.                      */
/*    4. TIP    — the outer-most segment is re-drawn finer so the        */
/*                fracture tapers to a sharp point (more elegant).       */
/*  The whole web carries a tense, nervous TREMOR (tiny scale loop) and  */
/*  twinkling glints sit at the junctions.                              */
/*                                                                     */
/*  CONFIRM (~0.55s one-shot): a NEW decisive crack SNAPS across via     */
/*  pathLength (dark stroke + bright coreHi flash on top), the web jolts */
/*  and the lips flare. reduceMotion: snap crack shown fully drawn,      */
/*  static web, no repeats.                                             */
/* ================================================================== */

const S = CONCERN.stress;

/* Stress origin (off-centre, up-left of middle) and a branching crack web
   of jagged polylines radiating outward across the orb. Deterministic.
   Teammates align to this exact geometry — do not change. */
const CRACKS = [
  'M185 170 L176 124 L186 90 L178 54',
  'M185 170 L150 132 L120 138 L86 108',
  'M185 170 L160 210 L168 252 L150 298',
  'M185 170 L214 196 L250 200 L296 222',
  'M185 170 L226 150 L260 118 L302 98',
  'M185 170 L206 232 L244 262 L262 308',
  'M150 132 L132 168 L100 188',
  'M260 118 L286 150 L322 154',
  'M168 252 L132 268 L106 300',
  'M250 200 L268 234 L308 252',
] as const;

/* Lit-lip relief offset: light catches the raised up-left edge. */
const LIT_DX = -0.9;
const LIT_DY = -0.9;

/* Shadow offset: opposite the lit lip (down-right) so each crack reads with a
   lit edge + a shadow edge = real carved relief. */
const SHADOW_DX = 0.85;
const SHADOW_DY = 0.85;

/* Stress origin — the cool light-bleed biases stronger here and fades toward
   the crack tips (energy straining hardest near the break point). */
const ORIGIN = { x: 185, y: 170 };

/* Per-crack seam strength: scaled by how close the crack's mid-point sits to
   the origin, so seams near the break read brightest and outer cracks fade.
   Deterministic (constant geometry). */
const SEAM_BIAS = CRACKS.map((d) => {
  const pts = d
    .replace(/[ML]/g, ' ')
    .trim()
    .split(/\s+/)
    .map(Number);
  const n = pts.length;
  const mx = pts[Math.floor(n / 2) - (Math.floor(n / 2) % 2)];
  const my = pts[Math.floor(n / 2) - (Math.floor(n / 2) % 2) + 1];
  const dx = mx - ORIGIN.x;
  const dy = my - ORIGIN.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  // 0 near origin → ~1 far; invert + clamp into a calm 0.45–1.0 weight.
  const w = 1 - Math.min(1, dist / 170);
  return sn(0.45 + 0.55 * w);
});

/* Parse each crack's last segment so we can re-draw the tip as a finer,
   tapering sub-stroke. Deterministic (constant strings). */
type TipSeg = { d: string; dLit: string };
const TIPS: TipSeg[] = CRACKS.map((d) => {
  const pts = d
    .replace(/[ML]/g, ' ')
    .trim()
    .split(/\s+/)
    .map(Number);
  const n = pts.length;
  // last two coordinate pairs → final segment
  const ax = pts[n - 4];
  const ay = pts[n - 3];
  const bx = pts[n - 2];
  const by = pts[n - 1];
  return {
    d: `M${sn(ax)} ${sn(ay)} L${sn(bx)} ${sn(by)}`,
    dLit: `M${sn(ax + LIT_DX)} ${sn(ay + LIT_DY)} L${sn(bx + LIT_DX)} ${sn(by + LIT_DY)}`,
  };
});

/* Junction glints — tiny sharp sparks where cracks meet. Desynced. */
const GLINTS = [
  { cx: 185, cy: 170, r: 2.0, dur: 3.2, delay: 0.0, peak: 0.92 },
  { cx: 150, cy: 132, r: 1.3, dur: 4.0, delay: 1.2, peak: 0.7 },
  { cx: 260, cy: 118, r: 1.5, dur: 3.6, delay: 0.6, peak: 0.78 },
  { cx: 168, cy: 252, r: 1.4, dur: 4.2, delay: 1.9, peak: 0.72 },
  { cx: 250, cy: 200, r: 1.3, dur: 3.8, delay: 2.6, peak: 0.68 },
  { cx: 214, cy: 196, r: 1.2, dur: 3.4, delay: 0.9, peak: 0.66 },
] as const;

export default function StressFractures({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (n: string) => 'q8c-stressfx-' + n + '-' + uid;

  const surge = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.34, 0.9, 0.43, 1] };

  /* Tense nervous tremor on the whole web: a tiny scale loop. */
  const webAnimate = isConfirming
    ? { scale: 1.02 }
    : reduceMotion
      ? { scale: 1 }
      : { scale: [1, 1.012, 0.997, 1.01, 1] };
  const webTransition: Transition = isConfirming ? surge(0.55) : loop(reduceMotion, 3.6);

  /* Faint flicker on the lit lips — strained, alive. */
  const lipAnimate = isConfirming
    ? { opacity: 0.78 }
    : reduceMotion
      ? { opacity: 0.5 }
      : { opacity: [0.4, 0.62, 0.44, 0.58, 0.4] };
  const lipTransition: Transition = isConfirming ? surge(0.55) : loop(reduceMotion, 3.2);

  /* COOL LIGHT-BLEED SEAM throb — pressure pulsing behind the surface. A
     calm sway on a different period than the lip flicker (3.0s vs 3.2s).
     On confirm the seam brightens briefly (energy snapping back through)
     before it retracts with the tear mask. */
  const seamAnimate = isConfirming
    ? { opacity: 0.62 }
    : reduceMotion
      ? { opacity: 0.36 }
      : { opacity: [0.26, 0.42, 0.3, 0.4, 0.26] };
  const seamTransition: Transition = isConfirming ? surge(0.42) : loop(reduceMotion, 3.0);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Soft seating blur under the cracks (gives depth into the glaze). */}
        <filter id={id('seat')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        {/* Gentle bloom on the cool light-bleed seam — a soft sliver, not a
            glow. Static blur only (never animated). */}
        <filter id={id('seam')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        {/* Sharp junction spark. */}
        <radialGradient id={id('glint')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={S.coreHi} stopOpacity="0.95" />
          <stop offset="45%" stopColor={S.coreHi} stopOpacity="0.5" />
          <stop offset="100%" stopColor={S.coreHi} stopOpacity="0" />
        </radialGradient>

        {/* ── TEAR reveal ── a soft-edged disc that expands from the stress
            origin so the cracks PROPAGATE outward (rip), instead of fading in
            already-complete. Feathered leading edge = a spreading fracture. */}
        <radialGradient id={id('tearGrad')}>
          <stop offset="0%" stopColor="#fff" />
          <stop offset="78%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id={id('tear')} maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">
          <motion.circle
            cx={185}
            cy={170}
            fill={`url(#${id('tearGrad')})`}
            initial={{ r: reduceMotion ? 300 : 0 }}
            animate={{ r: reduceMotion ? 300 : isConfirming ? 0 : 240 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : isConfirming
                  ? { duration: 0.4, ease: [0.5, 0, 0.75, 0] } // accelerate inward — cracks retract into the centre (within the 450ms confirm hold)
                  : { duration: 0.85, delay: 1.0, ease: [0.33, 1, 0.68, 1] } // a beat, then tear outward
            }
          />
        </mask>
      </defs>

      {/* ── CRACK WEB — torn open by the radial TEAR mask (cracks propagate
          outward from the origin), then a tense tremor. ── */}
      <motion.g
        mask={`url(#${id('tear')})`}
        initial={{ opacity: 1, scale: 1 }}
        animate={webAnimate}
        transition={webTransition}
        style={{ transformOrigin: '200px 200px' }}
      >
        {/* 1 · SEAT — soft wide blurred dark line so the crack sits in the
            surface with depth. */}
        {CRACKS.map((d, i) => (
          <path
            key={`seat-${i}`}
            d={d}
            fill="none"
            stroke={S.weightDeep}
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.2}
            filter={`url(#${id('seat')})`}
          />
        ))}

        {/* 1.5 · COOL LIGHT-BLEED SEAM — a thin, soft, near-white violet sliver
            sitting UNDER the recess (drawn first, so the dark body overlays
            and only a sliver of cool light shows). Energy straining through
            the fracture: restrained, blurred, biased strong near the origin
            and tapering out toward the tips. Throbs on its own period. */}
        <motion.g
          initial={false}
          animate={seamAnimate}
          transition={seamTransition}
          filter={`url(#${id('seam')})`}
        >
          {CRACKS.map((d, i) => (
            <path
              key={`seam-${i}`}
              d={d}
              fill="none"
              stroke={S.coreHi}
              strokeWidth={0.9}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={SEAM_BIAS[i]}
            />
          ))}
          {/* Tighter, slightly cooler inner thread on the trunk segments near
              the origin — the brightest sliver where pressure concentrates. */}
          {CRACKS.map((d, i) => (
            <path
              key={`seamcore-${i}`}
              d={d}
              fill="none"
              stroke={S.core}
              strokeWidth={0.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={sn(SEAM_BIAS[i] * 0.7)}
            />
          ))}
        </motion.g>

        {/* 2 · RECESS — the dark crack body (the cut into the glaze). */}
        {CRACKS.map((d, i) => (
          <path
            key={`body-${i}`}
            d={d}
            fill="none"
            stroke={S.weightDeep}
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.88}
          />
        ))}

        {/* 2b · SHADOW EDGE — a faint dark line offset down-right (opposite the
            lit lip), so each crack has a lit edge + a shadow edge = carved
            relief. Subtle. */}
        {CRACKS.map((d, i) => (
          <path
            key={`shadow-${i}`}
            d={d}
            fill="none"
            stroke={S.weightDeep}
            strokeWidth={0.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.4}
            transform={`translate(${SHADOW_DX} ${SHADOW_DY})`}
          />
        ))}

        {/* 4 · TIP (recess) — the outer-most segment re-drawn finer so the
            fracture tapers to a sharp point (drawn over the body recess so
            the dark tip reads as thinner than the trunk). */}
        {TIPS.map((t, i) => (
          <path
            key={`tip-${i}`}
            d={t.d}
            fill="none"
            stroke={S.weightDeep}
            strokeWidth={1.0}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.88}
          />
        ))}

        {/* 3 · LIT LIP — thin bright highlight on the SAME path, offset up-
            left, so light catches one raised edge (relief). Flickers. */}
        <motion.g initial={false} animate={lipAnimate} transition={lipTransition}>
          {CRACKS.map((d, i) => (
            <path
              key={`lip-${i}`}
              d={d}
              fill="none"
              stroke={S.fieldHi}
              strokeWidth={0.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${LIT_DX} ${LIT_DY})`}
            />
          ))}
          {/* Brightest catch on the tips — the sharp points glint. */}
          {TIPS.map((t, i) => (
            <path
              key={`liptip-${i}`}
              d={t.dLit}
              fill="none"
              stroke={S.coreHi}
              strokeWidth={0.55}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.75}
            />
          ))}
        </motion.g>

        {/* Junction glints — tiny sharp sparks twinkling on desynced loops. */}
        {GLINTS.map((g) => {
          const animate = isConfirming
            ? { opacity: Math.min(1, g.peak + 0.1), scale: 1.3 }
            : reduceMotion
              ? { opacity: g.peak * 0.55, scale: 1 }
              : { opacity: [g.peak * 0.3, g.peak, g.peak * 0.4], scale: [0.85, 1.1, 0.9] };
          const transition: Transition = isConfirming
            ? surge(0.5)
            : loop(reduceMotion, g.dur, g.delay);
          return (
            <motion.circle
              key={`glint-${g.cx}-${g.cy}`}
              cx={g.cx}
              cy={g.cy}
              r={g.r}
              fill={`url(#${id('glint')})`}
              initial={{ opacity: 0, scale: 1 }}
              animate={animate}
              transition={transition}
              style={{ transformOrigin: `${g.cx}px ${g.cy}px` }}
            />
          );
        })}
      </motion.g>
    </g>
  );
}
