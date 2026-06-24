'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { BEDROOM, MOTES, sn } from './bedroomLayout';

/* ================================================================== */
/*  Q4·A 睡眠 (Sleep) — ATMOSPHERE over the moonlit night bedroom.      */
/*                                                                     */
/*  Renders TOPMOST, over the bedroom backdrop + bed + nightstand. It   */
/*  ties the scene together in cool moonlit night light + a gentle      */
/*  float of cool dust drifting up in moonlit air.                     */
/*                                                                     */
/*  1. COOL HAZE — a faint overall cool moonlit wash over the whole     */
/*     room that gently breathes.                                       */
/*  2. MOONLIGHT POOL — a wide soft cool ellipse cast from the window   */
/*     onto the floor/wall (the cool secondary wash, grafted from       */
/*     Concept 2) that gently breathes.                                 */
/*  3. COOL DUST MOTES — 6 soft out-of-focus cool motes drift slowly    */
/*     UP + twinkle (moonlit air dust). Blurred, low opacity.          */
/*  4. COOL NIGHT VIGNETTE — soft corner vignette keeps corners dim.    */
/*                                                                     */
/*  CONFIRM (~0.6s one-shot, ease [0.32,.94,.4,1]): the haze + pool     */
/*  BLOOM a touch + the dust motes lift, then settle.                   */
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

export default function BedroomAtmosphere({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04sleep-atmo-' + n + '-' + uid;

  const hazeLoop = loop(reduceMotion, 9.0, 0.6);
  const poolLoop = loop(reduceMotion, 7.2);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Moonlight pool on the floor/wall — cool core dissolving to nothing. */}
        <radialGradient id={id('moonPool')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BEDROOM.moonPool} stopOpacity="0.34" />
          <stop offset="55%" stopColor={BEDROOM.moonPool} stopOpacity="0.14" />
          <stop offset="100%" stopColor={BEDROOM.moonPool} stopOpacity="0" />
        </radialGradient>
        {/* Faint overall cool haze — whole-room moonlit wash. */}
        <radialGradient id={id('haze')} cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor={BEDROOM.haze} stopOpacity="0.4" />
          <stop offset="60%" stopColor={BEDROOM.haze} stopOpacity="0.12" />
          <stop offset="100%" stopColor={BEDROOM.haze} stopOpacity="0" />
        </radialGradient>
        {/* Soft round bokeh fill — cool core dissolving to nothing. */}
        <radialGradient id={id('boke')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BEDROOM.motes} stopOpacity="0.9" />
          <stop offset="45%" stopColor={BEDROOM.motes} stopOpacity="0.4" />
          <stop offset="100%" stopColor={BEDROOM.motes} stopOpacity="0" />
        </radialGradient>
        {/* Cool night corner vignette. */}
        <radialGradient id={id('vig')} cx="50%" cy="50%" r="74%">
          <stop offset="0%" stopColor={BEDROOM.vig} stopOpacity="0" />
          <stop offset="66%" stopColor={BEDROOM.vig} stopOpacity="0" />
          <stop offset="100%" stopColor={BEDROOM.vig} stopOpacity="0.4" />
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

      {/* ── OVERALL COOL HAZE (whole-room moonlit wash) ── */}
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

      {/* ── MOONLIGHT POOL cast from the window onto floor/wall ── */}
      <motion.ellipse
        cx={200}
        cy={254}
        rx={140}
        ry={54}
        fill={`url(#${id('moonPool')})`}
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
        style={{ transformOrigin: '200px 254px' }}
      />

      {/* ── COOL DUST MOTES drifting up + twinkling ── */}
      <g>
        {MOTES.map((m) => {
          const animate = isConfirming
            ? {
                opacity: Math.min(0.5, m.peak + 0.16),
                x: m.dx * 0.35,
                y: -9,
                scale: 1.2,
              }
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

      {/* ── COOL NIGHT VIGNETTE: dim the corners (rendered LAST) ── */}
      <rect
        x={0}
        y={0}
        width={400}
        height={320}
        fill={`url(#${id('vig')})`}
        pointerEvents="none"
      />
    </g>
  );
}
