'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { IDLE, BLOOM, CURTAINS, sn } from './idleLayout';

/* ================================================================== */
/*  Q4 · idle 微光空房 — WINDOW GLOW HERO (the breathing focal piece).  */
/*                                                                     */
/*  The reincarnated idle orb, now diegetic: a soft, heavily-blurred    */
/*  warm-neutral light-BLOOM sitting on the frosted window pane,        */
/*  breathing a slow inhale/exhale — the room's quiet held breath.      */
/*  Flanked by two blurred, low-opacity sheer-CURTAIN folds drifting a  */
/*  few px down the window sides — the reincarnated three drifting      */
/*  meter-lines, rotated into soft vertical fabric.                     */
/*                                                                     */
/*  MOTION: bloom inhale/exhale scale [0.96,1.06,0.96] + opacity        */
/*  [0.5,0.74,0.5] ~6.8s; curtains sway ±4px at 7s / 8s (offset).       */
/*  CONFIRM (~0.6s): bloom blooms a touch, curtains settle (x→0).       */
/*  reduceMotion: bloom parked mid, curtains centred — a calm pose.     */
/* ================================================================== */

const breathe = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

/* A soft sheer curtain fold: a tall blurred lozenge down one window side. */
function curtainPath(cx: number): string {
  const { topY, botY, w } = CURTAINS;
  const hw = w / 2;
  return (
    `M${sn(cx)} ${sn(topY)} ` +
    `C${sn(cx + hw)} ${sn(topY + 14)} ${sn(cx + hw)} ${sn(botY - 14)} ${sn(cx)} ${sn(botY)} ` +
    `C${sn(cx - hw)} ${sn(botY - 14)} ${sn(cx - hw)} ${sn(topY + 14)} ${sn(cx)} ${sn(topY)} Z`
  );
}

export default function WindowGlowHero({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04idle-hero-' + n + '-' + uid;

  const bloomLoop = breathe(reduceMotion, 6.8);

  return (
    <g aria-hidden="true">
      <defs>
        {/* The reincarnated orb — warm-neutral light bloom: white core → cream
            mid → faint-sage rim dissolving to nothing. */}
        <radialGradient id={id('bloom')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={IDLE.bloomCore} stopOpacity="0.95" />
          <stop offset="44%" stopColor={IDLE.bloomMid} stopOpacity="0.7" />
          <stop offset="78%" stopColor={IDLE.bloomRim} stopOpacity="0.22" />
          <stop offset="100%" stopColor={IDLE.bloomRim} stopOpacity="0" />
        </radialGradient>
        {/* Soft sheer-cloth fill for the curtains. */}
        <linearGradient id={id('cloth')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={IDLE.curtain} stopOpacity="0.42" />
          <stop offset="100%" stopColor={IDLE.curtain} stopOpacity="0.14" />
        </linearGradient>
        {/* Heavy blur for the bloom. */}
        <filter id={id('bBloom')} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="13" />
        </filter>
        {/* Soft blur for the sheer curtains. */}
        <filter id={id('bCloth')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ── Sheer CURTAIN folds (behind the bloom, framing the pane) ── */}
      <motion.path
        d={curtainPath(CURTAINS.leftX)}
        fill={`url(#${id('cloth')})`}
        filter={`url(#${id('bCloth')})`}
        initial={false}
        animate={
          isConfirming
            ? { x: 0 }
            : reduceMotion
              ? { x: 0 }
              : { x: [-4, 4, -4] }
        }
        transition={isConfirming ? surge(reduceMotion) : breathe(reduceMotion, 7)}
      />
      <motion.path
        d={curtainPath(CURTAINS.rightX)}
        fill={`url(#${id('cloth')})`}
        filter={`url(#${id('bCloth')})`}
        initial={false}
        animate={
          isConfirming
            ? { x: 0 }
            : reduceMotion
              ? { x: 0 }
              : { x: [4, -4, 4] }
        }
        transition={isConfirming ? surge(reduceMotion) : breathe(reduceMotion, 8, 0.5)}
      />

      {/* ── The reincarnated orb: breathing light-BLOOM on the pane ── */}
      <motion.circle
        cx={BLOOM.cx}
        cy={BLOOM.cy}
        r={BLOOM.haloR}
        fill={`url(#${id('bloom')})`}
        filter={`url(#${id('bBloom')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.82, scale: 1.12 }
            : reduceMotion
              ? { opacity: 0.62, scale: 1 }
              : { opacity: [0.5, 0.74, 0.5], scale: [0.96, 1.06, 0.96] }
        }
        transition={isConfirming ? surge(reduceMotion) : bloomLoop}
        style={{ transformOrigin: `${BLOOM.cx}px ${BLOOM.cy}px` }}
      />
    </g>
  );
}
