'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';

/* ================================================================== */
/*  Q10 ritual scene family — shared system                           */
/*  One dawn light source (upper-left), ivory/stone base, one accent  */
/*  per scene, shared grain texture and breath-tempo loop grammar.    */
/*  See docs/superpowers/specs/2026-06-12-q10-ritual-redesign.md      */
/* ================================================================== */

export type RitualSceneProps = {
  isConfirming: boolean;
  reduceMotion: boolean;
};

/* Ease-out entrance curve shared across the family */
export const revealEase = [0.22, 1, 0.36, 1] as const;

export const RITUAL = {
  ivory: '#faf6ee',
  stone: '#e9e2d4',
  greige: '#cfc5b2',
  deep: '#6b6358',
  dawn: '#f3e3c0',
  dawnHi: '#fbf2dd',
  accent: {
    sleep: '#8d7a96',
    spa: '#c9a070',
    nature: '#7d9b82',
    facial: '#d9a8ad',
  },
} as const;

export const loop = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

/* Static fractal-noise grain — the family texture. Render LAST inside the svg. */
export function GrainOverlay({ uid, opacity = 0.045 }: { uid: string; opacity?: number }) {
  return (
    <g pointerEvents="none">
      <filter id={`q10x-grain-${uid}`} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect
        width="400"
        height="400"
        filter={`url(#q10x-grain-${uid})`}
        opacity={opacity}
        style={{ mixBlendMode: 'soft-light' }}
      />
    </g>
  );
}

/* Soft ambient pulse that expands once as the confirm payoff base. */
export function ConfirmBloom({
  uid,
  color,
  isConfirming,
  reduceMotion,
  cx = 200,
  cy = 196,
}: {
  uid: string;
  color: string;
  isConfirming: boolean;
  reduceMotion: boolean;
  cx?: number;
  cy?: number;
}) {
  return (
    <>
      <radialGradient id={`q10x-bloom-${uid}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.85" />
        <stop offset="58%" stopColor={color} stopOpacity="0.3" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <motion.circle
        cx={cx}
        cy={cy}
        r={92}
        fill={`url(#q10x-bloom-${uid})`}
        initial={false}
        animate={
          isConfirming
            ? { r: [80, 168], opacity: [0.4, 0] }
            : reduceMotion
              ? { opacity: 0.08 }
              : { r: [88, 102, 88], opacity: [0.05, 0.14, 0.05] }
        }
        transition={isConfirming ? { duration: 0.6, ease: 'easeOut' } : loop(reduceMotion, 6.4)}
      />
    </>
  );
}

/* A single drifting dust/pollen mote. Pass seeded/constant params only. */
export function DustMote({
  cx,
  cy,
  r = 1.3,
  drift = 9,
  rise = 26,
  dur,
  delay,
  color = '#f7eed8',
  reduceMotion,
}: {
  cx: number;
  cy: number;
  r?: number;
  drift?: number;
  rise?: number;
  dur: number;
  delay: number;
  color?: string;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return <circle cx={cx} cy={cy} r={r} fill={color} opacity={0.18} />;
  }
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ y: [0, -rise], x: [0, drift * 0.55, drift], opacity: [0, 0.34, 0.26, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}
