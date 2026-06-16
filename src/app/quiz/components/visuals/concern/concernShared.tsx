/* ================================================================== */
/*  Q8「你最容易因為咩影響皮膚?」— shared system for the concern auras.   */
/*  Four soft, premium AURA scenes shown in the ~280px circular orb     */
/*  (SVG viewBox 400×400, sliced). Each scene is a self-contained aura  */
/*  on a pale ivory field — NO literal icons (no moon/clock/face/food). */
/*  A central aura shifts colour as the concern "seeps into" the skin;  */
/*  one slow 5–8s loop; a clearer one-shot beat on confirm.             */
/*    A 捱夜  — dusty blue-violet shadow descending, light sinking      */
/*    B 情緒  — mauve/blush ripple spreading from the centre            */
/*    C 壓力  — two soft arcs compressing the aura from the sides       */
/*    D 飲食  — warm amber/peach particles gathering, warm haze         */
/* ================================================================== */

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

export const sn = (v: number) => +v.toFixed(1);

/* Scenes get isConfirming from the motif; they read reduced-motion
   themselves via useReducedMotion(). */
export type ConcernSceneProps = {
  isConfirming: boolean;
};

/* For sub-parts of a scene assembled by the scene component (which owns
   the <svg>, the uid, and the reduced-motion read). */
export type ConcernPartProps = {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
};

export const loop = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

/* Pale, premium palette. Base ivory field is shared; each concern owns a
   soft muted accent set (kept pastel to match the concept board). */
export const CONCERN = {
  ivory: '#f7f3ee',
  ivoryHi: '#fdfbf6',
  deep: '#6b6358',
  /* A 捱夜 — a periwinkle night-sky aura (deeper top → pale lavender low),
     falling light streaks + star dust, soft lavender hill mounds. */
  night: {
    fieldTop: '#a6a8d8',
    fieldMid: '#c6c5e6',
    fieldLo: '#ece9f4',
    core: '#f1eefa',
    streak: '#f0f1ff',
    star: '#f6f4ff',
    hill: '#bbbae0',
    hillLo: '#d2d1ec',
    shadow: '#8a8cc2',
  },
  /* B 情緒 — a warm rose "emotional aurora": diagonal flowing rose veils
     drifting across a blush field, an off-centre warm light wash, drifting
     light motes. Emotion flows + seeps; it never sits as a centred core. */
  emotion: {
    field: '#f6e2e8',
    fieldLo: '#efd2dc',
    core: '#fff2f5',
    ring: '#e3a3bb',
    ringSoft: '#f0c4d1',
    bloom: '#f8d8e1',
    deep: '#d68aa6',
    deeper: '#c2729a',
    fieldHi: '#fcf0f3',
    sparkle: '#fff5f8',
  },
  /* C 壓力 — a tense steel grey-violet field (vignetted, closing in): a
     HEAVY dark mass bears down from above onto a wide compressed cushion of
     light that flattens + brightens under the weight. "Weighed down" by
     pressure — never a vertical lens flanked by arcs (reads anatomical). */
  stress: {
    fieldEdge: '#86839c',
    field: '#a4a1b8',
    fieldHi: '#d3d1de',
    weight: '#56536e',
    weightHi: '#827fa0',
    weightDeep: '#34324a',
    core: '#f4f2fb',
    coreHi: '#ffffff',
    tension: '#6f6c8c',
  },
  /* D 飲食 — a warm honey-amber "nourishment" aura: a low warm glow pool
     where warmth gathers, golden effervescent particles + bubbles RISING
     up through it. Rich + warm, premium honey/gold — never garish. */
  diet: {
    fieldTop: '#f7dca6',
    field: '#f1c684',
    fieldLo: '#e3a85e',
    glow: '#fff1d2',
    particle: '#f7c66e',
    particleHi: '#ffe6a6',
    deep: '#d4924a',
    sparkle: '#fff7e8',
  },
} as const;

/* One drifting particle: sinks (dy>0) or rises (dy<0) while fading.
   Pass seeded/constant params only — deterministic. */
export function Particle({
  cx,
  cy,
  r = 1.4,
  dx = 0,
  dy = -28,
  dur,
  delay,
  color,
  reduceMotion,
  peak = 0.5,
}: {
  cx: number;
  cy: number;
  r?: number;
  dx?: number;
  dy?: number;
  dur: number;
  delay: number;
  color: string;
  reduceMotion: boolean;
  peak?: number;
}) {
  if (reduceMotion) {
    return <circle cx={cx} cy={cy} r={r} fill={color} opacity={peak * 0.5} />;
  }
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ x: [0, dx * 0.5, dx], y: [0, dy * 0.5, dy], opacity: [0, peak, peak * 0.7, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* Static fractal-noise grain — the family texture. Render LAST in the svg. */
export function GrainOverlay({ uid, opacity = 0.04 }: { uid: string; opacity?: number }) {
  return (
    <g pointerEvents="none">
      <filter id={`q8c-grain-${uid}`} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.86" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="400" height="400" filter={`url(#q8c-grain-${uid})`} opacity={opacity} style={{ mixBlendMode: 'soft-light' }} />
    </g>
  );
}
