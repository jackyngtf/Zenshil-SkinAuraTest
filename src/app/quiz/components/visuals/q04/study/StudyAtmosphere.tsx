'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { STUDY, MOTES, HOURGLASS, sn } from './studyLayout';

/* ================================================================== */
/*  Q4·C 時間 (Time) — ATMOSPHERE over the cyan-dusk study desk.        */
/*                                                                     */
/*  Renders TOPMOST, over the study backdrop + hourglass + desk still   */
/*  life. It ties the scene together in cool cyan dusk light + a gentle */
/*  float of cool dust drifting up in cyan air.                         */
/*                                                                     */
/*  1. CYAN HAZE — a faint overall cool cyan wash over the whole room.  */
/*  2. COOL DUST MOTES — 6 soft out-of-focus cyan motes drift slowly    */
/*     UP + twinkle (dusk air dust). Blurred, low opacity.             */
/*  3. CYAN CONFIRM-BLOOM — a soft cyan bloom behind/over the           */
/*     hourglass so the time-glow blooms on confirm.                   */
/*  4. CORNER VIGNETTE — soft vignette keeps corners dim (topmost).     */
/*                                                                     */
/*  CONFIRM (~0.6s one-shot, ease [0.32,.94,.4,1]): the bloom BLOOMS    */
/*  outward + the dust motes lift + brighten, then settle.             */
/*  reduceMotion: haze/bloom static at mid, motes parked, no loops.    */
/* ================================================================== */

const breathe = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

const drift = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'linear' };

const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

export default function StudyAtmosphere({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04study-atmo-' + n + '-' + uid;

  const bloomLoop = breathe(reduceMotion, 6.8);

  /* Bloom centred over the hourglass neck/waist (cx=200, ~y206 — tracks the
     raised hero so the confirm-glow blooms over the sand-flow focal). */
  const bloomCx = HOURGLASS.cx;
  const bloomCy = 206;

  return (
    <g aria-hidden="true">
      <defs>
        {/* Faint overall cyan haze — whole-room dusk wash. */}
        <linearGradient id={id('haze')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.haze} stopOpacity="0.16" />
          <stop offset="100%" stopColor={STUDY.haze} stopOpacity="0.06" />
        </linearGradient>
        {/* Cyan confirm-bloom over the hourglass — aura core dissolving to nothing. */}
        <radialGradient id={id('bloom')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={STUDY.glowBloom} stopOpacity="0.6" />
          <stop offset="45%" stopColor={STUDY.glowSoft} stopOpacity="0.2" />
          <stop offset="100%" stopColor={STUDY.glowSoft} stopOpacity="0" />
        </radialGradient>
        {/* Soft round bokeh fill — cyan core dissolving to nothing. */}
        <radialGradient id={id('boke')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={STUDY.motes} stopOpacity="0.9" />
          <stop offset="45%" stopColor={STUDY.motes} stopOpacity="0.4" />
          <stop offset="100%" stopColor={STUDY.motes} stopOpacity="0" />
        </radialGradient>
        {/* Corner vignette. */}
        <radialGradient id={id('vig')} cx="50%" cy="50%" r="74%">
          <stop offset="0%" stopColor={STUDY.vig} stopOpacity="0" />
          <stop offset="66%" stopColor={STUDY.vig} stopOpacity="0" />
          <stop offset="100%" stopColor={STUDY.vig} stopOpacity="0.5" />
        </radialGradient>

        {/* Static blurs only — never animated. */}
        <filter id={id('bBloom')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={id('bBoke')} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* ── OVERALL CYAN HAZE (whole-room dusk wash, static) ── */}
      <rect x={0} y={0} width={400} height={320} fill={`url(#${id('haze')})`} opacity={0.5} />

      {/* ── COOL DUST MOTES drifting up + twinkling ── */}
      <g>
        {MOTES.map((m) => {
          const animate = isConfirming
            ? {
                opacity: Math.min(0.5, m.peak * 1.3),
                x: m.dx * 0.35,
                y: -9,
                scale: 1.2,
              }
            : reduceMotion
              ? { opacity: m.peak * 0.5, x: 0, y: 0, scale: 1 }
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

      {/* ── CYAN CONFIRM-BLOOM over the hourglass (topmost so it blooms over glass) ── */}
      <motion.ellipse
        cx={bloomCx}
        cy={bloomCy}
        rx={46}
        ry={60}
        fill={`url(#${id('bloom')})`}
        filter={`url(#${id('bBloom')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.55, scale: 1.18 }
            : reduceMotion
              ? { opacity: 0.14, scale: 1 }
              : { opacity: [0.12, 0.2, 0.12], scale: [0.97, 1.04, 0.97] }
        }
        transition={isConfirming ? surge(reduceMotion) : bloomLoop}
        style={{ transformOrigin: `${bloomCx}px ${bloomCy}px` }}
      />

      {/* ── CORNER VIGNETTE: dim the corners (rendered LAST) ── */}
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
