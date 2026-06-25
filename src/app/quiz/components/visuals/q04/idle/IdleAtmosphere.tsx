'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { IDLE, POOL, MOTES, sn } from './idleLayout';

/* ================================================================== */
/*  Q4 · idle 微光空房 — ATMOSPHERE (renders TOPMOST).                  */
/*                                                                     */
/*  Ties the room together in soft warm light + gentle floating dust,   */
/*  AND carries the SECONDARY breathing mass — the floor light-POOL at  */
/*  cy≈246 — that holds the centre-of-gravity LOW so the focal weight   */
/*  doesn't jump when the high window bloom (cy62) cross-fades into an   */
/*  A–D furniture hero at y≈200.                                        */
/*                                                                     */
/*  1. WARM HAZE — faint whole-room wash that gently breathes (~9s).    */
/*  2. FLOOR LIGHT-POOL — wide soft ellipse where the window light       */
/*     lands; the lower anchor mass, breathes opacity+scale (~7.2s).    */
/*  3. WARM DUST MOTES — 6 soft out-of-focus motes drift up + twinkle.  */
/*  4. WARM VIGNETTE — soft corner vignette keeps the orb edges calm.   */
/*                                                                     */
/*  CONFIRM (~0.6s): haze + pool BLOOM, motes lift, then settle.        */
/*  reduceMotion: haze/pool static at mid, motes parked, no loops.     */
/* ================================================================== */

const loop = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

const drift = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'linear' };

const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

export default function IdleAtmosphere({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04idle-atmo-' + n + '-' + uid;

  const hazeLoop = loop(reduceMotion, 9.0, 0.6);
  const poolLoop = loop(reduceMotion, 7.2);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Warm floor light-pool — cream core dissolving to nothing. */}
        <radialGradient id={id('pool')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={IDLE.pool} stopOpacity="0.36" />
          <stop offset="55%" stopColor={IDLE.pool} stopOpacity="0.14" />
          <stop offset="100%" stopColor={IDLE.pool} stopOpacity="0" />
        </radialGradient>
        {/* Faint overall warm haze — whole-room wash. */}
        <radialGradient id={id('haze')} cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor={IDLE.haze} stopOpacity="0.4" />
          <stop offset="60%" stopColor={IDLE.haze} stopOpacity="0.12" />
          <stop offset="100%" stopColor={IDLE.haze} stopOpacity="0" />
        </radialGradient>
        {/* Soft round bokeh fill — warm taupe core dissolving to nothing. */}
        <radialGradient id={id('boke')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={IDLE.motes} stopOpacity="0.85" />
          <stop offset="45%" stopColor={IDLE.motes} stopOpacity="0.36" />
          <stop offset="100%" stopColor={IDLE.motes} stopOpacity="0" />
        </radialGradient>
        {/* Warm corner vignette. */}
        <radialGradient id={id('vig')} cx="50%" cy="50%" r="74%">
          <stop offset="0%" stopColor={IDLE.vig} stopOpacity="0" />
          <stop offset="66%" stopColor={IDLE.vig} stopOpacity="0" />
          <stop offset="100%" stopColor={IDLE.vig} stopOpacity="0.34" />
        </radialGradient>

        {/* Static blurs only — never animated. */}
        <filter id={id('bPool')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id={id('bHaze')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
        <filter id={id('bBoke')} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* ── OVERALL WARM HAZE (whole-room wash) ── */}
      <motion.rect
        x={0}
        y={0}
        width={400}
        height={320}
        fill={`url(#${id('haze')})`}
        filter={`url(#${id('bHaze')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.34 }
            : reduceMotion
              ? { opacity: 0.2 }
              : { opacity: [0.16, 0.24, 0.16] }
        }
        transition={isConfirming ? surge(reduceMotion) : hazeLoop}
        style={{ transformOrigin: '200px 200px' }}
      />

      {/* ── FLOOR LIGHT-POOL (the lower anchor mass) ── */}
      <motion.ellipse
        cx={POOL.cx}
        cy={POOL.cy}
        rx={POOL.rx}
        ry={POOL.ry}
        fill={`url(#${id('pool')})`}
        filter={`url(#${id('bPool')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.4, scale: 1.08 }
            : reduceMotion
              ? { opacity: 0.24, scale: 1 }
              : { opacity: [0.18, 0.3, 0.18], scale: [0.98, 1.04, 0.98] }
        }
        transition={isConfirming ? surge(reduceMotion) : poolLoop}
        style={{ transformOrigin: `${POOL.cx}px ${POOL.cy}px` }}
      />

      {/* ── WARM DUST MOTES drifting up + twinkling ── */}
      <g>
        {MOTES.map((m) => {
          const animate = isConfirming
            ? { opacity: Math.min(0.5, m.peak + 0.16), x: m.dx * 0.35, y: -9, scale: 1.2 }
            : reduceMotion
              ? { opacity: m.peak * 0.6, x: 0, y: 0, scale: 1 }
              : {
                  opacity: [0, m.peak, m.peak * 0.5, 0],
                  x: [0, m.dx * 0.5, m.dx],
                  y: [0, m.dy * 0.5, m.dy],
                  scale: [0.85, 1.1, 0.92],
                };
          const transition: Transition = isConfirming
            ? surge(reduceMotion)
            : drift(reduceMotion, m.dur, m.delay);
          return (
            <motion.circle
              key={`boke-${m.cx}-${m.cy}`}
              cx={m.cx}
              cy={m.cy}
              r={sn(m.r)}
              fill={`url(#${id('boke')})`}
              filter={`url(#${id('bBoke')})`}
              initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
              animate={animate}
              transition={transition}
              style={{ transformOrigin: `${m.cx}px ${m.cy}px` }}
            />
          );
        })}
      </g>

      {/* ── WARM VIGNETTE: soften the corners (rendered LAST) ── */}
      <rect x={0} y={0} width={400} height={320} fill={`url(#${id('vig')})`} pointerEvents="none" />
    </g>
  );
}
