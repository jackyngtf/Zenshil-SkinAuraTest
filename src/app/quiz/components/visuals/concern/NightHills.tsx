'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, sn } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  Q8 · A 捱夜 — soft lavender HILL MOUNDS sub-layer                   */
/*                                                                     */
/*  Renders IN FRONT of the periwinkle night sky + falling light, at   */
/*  the bottom of the orb (viewBox 400×400, circle r≈190 @200,200).    */
/*  Two overlapping soft rounded mounds (back + nearer/darker front)   */
/*  span the lower portion (y ~300→400, peaks ~y300–330), a faint low  */
/*  ground glow where they meet the sky, and a subtle lit top edge on  */
/*  the front mound. Essentially STATIC: only a whisper of breathe on  */
/*  the front mound (≤1.5px, ~8s) — the falling light carries motion.  */
/*  CONFIRM: the ground glow brightens a touch, then settles.          */
/* ================================================================== */

const N = CONCERN.night;

/* Back mound — a broad, gentle rise filling the lower band. Lighter
   lavender, slightly higher peak. Static. */
const BACK_D =
  'M-20 360 ' +
  'C60 322 120 308 200 308 ' +
  'C272 308 332 320 420 350 ' +
  'L420 410 L-20 410 Z';

/* Front mound — nearer + lower, overlaps the back. lift>0 raises the
   crest a hair: the night's slow breath. Single generator so every
   keyframe shares the exact command structure. */
const frontD = (lift: number) =>
  'M-20 410 ' +
  `C40 ${sn(372 - lift * 0.4)} 110 ${sn(346 - lift)} 196 ${sn(340 - lift)} ` +
  `C286 ${sn(334 - lift)} 352 ${sn(360 - lift * 0.4)} 420 384 ` +
  'L420 410 Z';

export default function NightHills({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (name: string) => `q8c-nighthill-${name}-${uid}`;

  /* One-shot confirm beat: gentle ease that settles. */
  const confirmShot = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

  /* Front mound breathe: tiny vertical rise/fall via d-morph (≤1.5px). */
  const breathFrames = [frontD(0), frontD(1.5), frontD(0)];
  const frontAnimate = isConfirming
    ? { d: frontD(0) }
    : reduceMotion
      ? { d: frontD(0) }
      : { d: breathFrames };
  const frontTransition: Transition = isConfirming
    ? confirmShot(0.6)
    : loop(reduceMotion, 8, 0.3);

  /* Ground glow: a low blurred light band on the horizon. Loop = a slow
     soft pulse; confirm = brightens a touch then settles. */
  const glowAnimate = isConfirming
    ? { opacity: 0.5 }
    : reduceMotion
      ? { opacity: 0.34 }
      : { opacity: [0.26, 0.4, 0.3] };
  const glowTransition: Transition = isConfirming
    ? confirmShot(0.6)
    : loop(reduceMotion, 7.6, 0.2);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Back mound — soft lighter lavender, lit gently from above */}
        <linearGradient id={id('back')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={N.hillLo} />
          <stop offset="64%" stopColor={N.hill} />
          <stop offset="100%" stopColor={N.shadow} />
        </linearGradient>
        {/* Front mound — nearer + darker. Radial-ish so the crest reads
            rounded (the dune idiom): highlight biased to the upper crest. */}
        <radialGradient id={id('front')} cx="44%" cy="6%" r="116%">
          <stop offset="0%" stopColor={N.hill} />
          <stop offset="52%" stopColor={N.shadow} />
          <stop offset="100%" stopColor={N.shadow} />
        </radialGradient>
        {/* Low ground glow — the horizon catching the aura's light */}
        <radialGradient id={id('glow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={N.core} stopOpacity="0.9" />
          <stop offset="48%" stopColor={N.core} stopOpacity="0.4" />
          <stop offset="100%" stopColor={N.core} stopOpacity="0" />
        </radialGradient>

        {/* Blur defs — each stdDeviation declared once */}
        <filter id={id('b22')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={id('b6')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ── Ground glow band where the mounds meet the sky ── */}
      <motion.ellipse
        cx={200}
        cy={312}
        rx={172}
        ry={44}
        fill={`url(#${id('glow')})`}
        filter={`url(#${id('b22')})`}
        initial={{ opacity: 0 }}
        animate={glowAnimate}
        transition={glowTransition}
      />

      {/* ── Back mound: the further, lighter rise (entrance, then static) ── */}
      <motion.path
        d={BACK_D}
        fill={`url(#${id('back')})`}
        opacity={0.92}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.92, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
      />

      {/* ── Front mound: nearer + darker, with a whisper of breathe ── */}
      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
      >
        <motion.path
          d={frontD(0)}
          fill={`url(#${id('front')})`}
          initial={false}
          animate={frontAnimate}
          transition={frontTransition}
        />
        {/* Subtle lit top edge on the front mound — the aura's light
            catching the crest. Very low opacity, soft. */}
        <motion.path
          d="M-10 350 C56 320 120 308 196 306 C276 304 340 318 410 350"
          fill="none"
          stroke={N.core}
          strokeWidth={2.2}
          strokeLinecap="round"
          filter={`url(#${id('b6')})`}
          initial={{ opacity: 0 }}
          animate={
            isConfirming
              ? { opacity: 0.34 }
              : reduceMotion
                ? { opacity: 0.22 }
                : { opacity: [0.18, 0.28, 0.2] }
          }
          transition={isConfirming ? confirmShot(0.6) : loop(reduceMotion, 8, 0.5)}
        />
      </motion.g>
    </g>
  );
}
