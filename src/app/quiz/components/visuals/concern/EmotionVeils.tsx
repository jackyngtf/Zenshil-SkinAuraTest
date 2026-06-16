'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, sn } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  B 情緒 — FLOWING ROSE EMOTIONAL VEILS (hero sub-layer)             */
/*                                                                     */
/*  Renders OVER the warm blush field. Emotion = warm rose energy      */
/*  FLOWING and WEAVING through the orb — like aurora curtains or      */
/*  drifting silk, NOT horizon stripes. Six translucent rose ribbons   */
/*  sweep across the full orb height (y≈90→295) on strongly OPPOSITE   */
/*  diagonals (±40→±70) so they cross and overlap into a woven aurora. */
/*  Each is a thick blurred stroke for the soft body; the mid/bright   */
/*  ones carry a thin bright crest line along the same path for sheen. */
/*  A wide tonal range (core highlight → deep saturated rose) keeps    */
/*  them reading against the pale field.                               */
/*                                                                     */
/*  HERO: each ribbon morphs between two wave phases (~12–18s) while    */
/*  drifting sideways; phases/drifts are offset per ribbon so the       */
/*  cluster never syncs — it should look alive and weaving.            */
/*  CONFIRM (~0.7s one-shot): one brighter crest ribbon sweeps across  */
/*  the orb (the emotional surge). reduceMotion: static mid-state.     */
/* ================================================================== */

const E = CONCERN.emotion;

/* Seven anchor xs (running well off-canvas each side so endpoints never
   show inside the orb). Catmull–Rom through these → a smooth organic
   wave. SAME anchor count for every phase ⇒ identical command structure
   ⇒ seamless d-morph. */
const AX = [-40, 40, 120, 200, 280, 360, 460] as const;

/* Smooth open path through points via Catmull–Rom → cubic beziers. */
const smooth = (pts: ReadonlyArray<readonly [number, number]>) => {
  let d = `M${sn(pts[0][0])} ${sn(pts[0][1])} `;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[0];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[pts.length - 1];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${sn(c1x)} ${sn(c1y)} ${sn(c2x)} ${sn(c2y)} ${sn(p2[0])} ${sn(p2[1])} `;
  }
  return d;
};

/* One ribbon wave: baseline y0, strong diagonal slope across the width
   (sign varies per ribbon so they CROSS), plus a deep sine ripple whose
   phase shifts to undulate. Deterministic (constant phases only). The
   amp is large enough that crests/troughs are clearly visible. */
const waveD = (y0: number, slope: number, amp: number, phase: number) => {
  const pts = AX.map((x, i) => {
    const y = y0 + ((x - 200) / 240) * slope + amp * Math.sin(phase + i * 1.05);
    return [x, y] as const;
  });
  return smooth(pts);
};

/* Ribbon cluster — wide tonal range, OPPOSITE slopes, distributed across
   the whole orb height. `crest` ribbons also get a thin bright sheen line
   along the same path. Phases + drifts are all distinct so the weave never
   locks into sync. */
type Ribbon = {
  y0: number;
  slope: number;
  amp: number;
  sw: number;
  blur: string;
  color: string;
  op: number;
  dur: number;
  drift: number;
  ph: number;
  crest?: { color: string; sw: number; op: number };
};

const RIBBONS: ReadonlyArray<Ribbon> = [
  /* top: bright rose-white highlight, sweeping DOWN to the right */
  { y0: 90,  slope: 58,  amp: 26, sw: 28, blur: 'b13', color: E.core,    op: 0.55, dur: 14, drift: 13,  ph: 0.0,
    crest: { color: E.sparkle, sw: 3.5, op: 0.55 } },
  /* up to the right — crosses the first */
  { y0: 130, slope: -52, amp: 34, sw: 40, blur: 'b18', color: E.ring,     op: 0.62, dur: 16, drift: -15, ph: 1.1 },
  /* mid body, mauve, down to the right */
  { y0: 175, slope: 64,  amp: 30, sw: 36, blur: 'b16', color: E.deep,     op: 0.74, dur: 13, drift: 16,  ph: 2.3,
    crest: { color: E.core, sw: 4, op: 0.55 } },
  /* deep saturated, up to the right — strong crossing */
  { y0: 205, slope: -60, amp: 38, sw: 42, blur: 'b18', color: E.deeper,   op: 0.72, dur: 17, drift: -12, ph: 3.4 },
  /* gentle curl/return low, down to the right */
  { y0: 250, slope: 44,  amp: 24, sw: 34, blur: 'b14', color: E.ring,     op: 0.6,  dur: 12, drift: 12,  ph: 4.6,
    crest: { color: E.sparkle, sw: 3, op: 0.5 } },
  /* deepest, up to the right at the base */
  { y0: 295, slope: -46, amp: 22, sw: 32, blur: 'b14', color: E.deeper,   op: 0.66, dur: 18, drift: -14, ph: 5.7 },
] as const;

export default function EmotionVeils({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (name: string) => 'q8c-emoveil-' + name + '-' + uid;

  return (
    <g aria-hidden="true">
      <defs>
        {/* Soft blurs weld each thick stroke into a glowing veil. One
            stdDeviation per filter; never animated. Generous vertical
            margins so the blur of off-canvas crests stays smooth. */}
        <filter id={id('b13')} x="-30%" y="-70%" width="160%" height="240%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
        <filter id={id('b14')} x="-30%" y="-70%" width="160%" height="240%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={id('b16')} x="-30%" y="-70%" width="160%" height="240%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id={id('b18')} x="-30%" y="-70%" width="160%" height="240%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        {/* Thin sheen / confirm-crest blur. */}
        <filter id={id('b5')} x="-30%" y="-70%" width="160%" height="240%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ── RIBBON CLUSTER (entrance fade-in, then continuous weaving) ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {RIBBONS.map((r) => {
          /* Two-phase morph, frame[0] === frame[last] ⇒ seamless loop. */
          const frames = [
            waveD(r.y0, r.slope, r.amp, r.ph),
            waveD(r.y0, r.slope, r.amp, r.ph + Math.PI),
            waveD(r.y0, r.slope, r.amp, r.ph),
          ];
          const animate = reduceMotion
            ? { d: frames[0], x: 0 }
            : { d: frames, x: [0, r.drift, 0] };
          const transition: Transition = loop(reduceMotion, r.dur, 0);
          return (
            <g key={`ribbon-${r.y0}`}>
              {/* Soft blurred body. */}
              <motion.path
                d={frames[0]}
                fill="none"
                stroke={r.color}
                strokeWidth={r.sw}
                strokeLinecap="round"
                opacity={r.op}
                filter={`url(#${id(r.blur)})`}
                initial={false}
                animate={animate}
                transition={transition}
              />
              {/* Thin bright crest line for silky sheen (shares the path). */}
              {r.crest && (
                <motion.path
                  d={frames[0]}
                  fill="none"
                  stroke={r.crest.color}
                  strokeWidth={r.crest.sw}
                  strokeLinecap="round"
                  opacity={r.crest.op}
                  filter={`url(#${id('b5')})`}
                  initial={false}
                  animate={animate}
                  transition={transition}
                />
              )}
            </g>
          );
        })}
      </motion.g>

      {/* ── CONFIRM: one brighter crest ribbon sweeps across (the surge) ── */}
      {isConfirming && !reduceMotion && (
        <motion.path
          d={waveD(198, -54, 30, 0.7)}
          fill="none"
          stroke={E.core}
          strokeWidth={11}
          strokeLinecap="round"
          filter={`url(#${id('b5')})`}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: [0, 0.85, 0], x: 60 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      )}
    </g>
  );
}
