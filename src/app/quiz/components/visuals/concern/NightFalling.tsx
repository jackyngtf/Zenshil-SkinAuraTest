'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop, sn } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  A 捱夜 — FALLING LIGHT + STAR DUST sub-layer                        */
/*                                                                     */
/*  Renders OVER the periwinkle night-sky field the scene draws behind */
/*  us. A gentle, slow meteor-shower of thin tapered light trails rain */
/*  down through the upper sky, fading in then out as they descend,    */
/*  while tiny star points twinkle as a quiet accent.                  */
/*                                                                     */
/*  HERO: the streaks raining down (each desynced length/x/dur/delay). */
/*  STARS: twinkling opacity loops, desynced.                          */
/*  CONFIRM (~0.6s one-shot): a brief surge — streaks fall faster &    */
/*  brighter, stars flare — then the scene settles.                    */
/*  reduceMotion: a few static faint trails + mid-opacity static stars.*/
/*                                                                     */
/*  Layout: keep everything in the upper ~2/3 (y ≈ 20–300); the scene  */
/*  owns the lavender hill mounds at the bottom.                       */
/* ================================================================== */

/* Falling light trails. Each is a thin, slightly slanted tapered rect
   that travels DOWN from near the top. `len` is the trail length, `x`
   its column, `slant` its horizontal drift over the fall, `fall` the
   total vertical travel. All dur/delay distinct → fully desynced.
   Constant arrays only (deterministic, no Math.random). */
const STREAKS = [
  { x: 70,  top: 30,  len: 30, slant: 8,  fall: 150, w: 2.0, dur: 6.4, delay: 0.0,  peak: 0.55 },
  { x: 118, top: 24,  len: 24, slant: 6,  fall: 138, w: 1.6, dur: 7.8, delay: 1.5,  peak: 0.46 },
  { x: 152, top: 40,  len: 36, slant: 10, fall: 168, w: 2.2, dur: 5.6, delay: 0.8,  peak: 0.6  },
  { x: 196, top: 28,  len: 22, slant: 5,  fall: 132, w: 1.4, dur: 8.6, delay: 2.6,  peak: 0.42 },
  { x: 232, top: 36,  len: 32, slant: 9,  fall: 156, w: 1.9, dur: 6.9, delay: 3.4,  peak: 0.52 },
  { x: 268, top: 22,  len: 28, slant: 7,  fall: 146, w: 1.7, dur: 7.3, delay: 1.1,  peak: 0.48 },
  { x: 300, top: 44,  len: 38, slant: 11, fall: 162, w: 2.1, dur: 5.9, delay: 4.2,  peak: 0.58 },
  { x: 332, top: 32,  len: 26, slant: 6,  fall: 140, w: 1.5, dur: 8.2, delay: 2.0,  peak: 0.44 },
  { x: 96,  top: 48,  len: 34, slant: 9,  fall: 158, w: 1.8, dur: 6.6, delay: 5.0,  peak: 0.5  },
] as const;

/* Star dust — tiny points scattered across the upper sky, each with its
   own twinkle period/phase. `big` stars get a faint 4-point sparkle. */
const STARS = [
  { cx: 58,  cy: 56,  r: 1.3, dur: 3.4, delay: 0.0, peak: 0.85, big: false },
  { cx: 104, cy: 40,  r: 1.0, dur: 4.1, delay: 1.2, peak: 0.7,  big: false },
  { cx: 142, cy: 70,  r: 1.6, dur: 3.0, delay: 0.6, peak: 0.95, big: true  },
  { cx: 186, cy: 48,  r: 1.1, dur: 4.6, delay: 2.1, peak: 0.72, big: false },
  { cx: 214, cy: 86,  r: 1.4, dur: 3.6, delay: 1.7, peak: 0.82, big: false },
  { cx: 250, cy: 54,  r: 1.7, dur: 2.8, delay: 0.3, peak: 0.95, big: true  },
  { cx: 286, cy: 92,  r: 1.0, dur: 4.3, delay: 2.8, peak: 0.68, big: false },
  { cx: 318, cy: 60,  r: 1.3, dur: 3.8, delay: 1.0, peak: 0.8,  big: false },
  { cx: 346, cy: 96,  r: 1.5, dur: 3.2, delay: 2.4, peak: 0.88, big: true  },
  { cx: 78,  cy: 104, r: 1.1, dur: 4.0, delay: 3.1, peak: 0.7,  big: false },
  { cx: 162, cy: 118, r: 1.2, dur: 3.5, delay: 0.9, peak: 0.78, big: false },
  { cx: 232, cy: 128, r: 1.0, dur: 4.4, delay: 3.6, peak: 0.66, big: false },
  { cx: 300, cy: 132, r: 1.3, dur: 3.3, delay: 1.9, peak: 0.8,  big: false },
  { cx: 124, cy: 146, r: 0.9, dur: 4.8, delay: 2.6, peak: 0.62, big: false },
] as const;

export default function NightFalling({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (name: string) => `q8c-nightfall-${name}-${uid}`;

  /* One-shot confirm surge: a short eased beat used by both streaks and
     stars so the whole sub-layer flares together, then settles. */
  const surge = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

  return (
    <g aria-hidden="true">
      <defs>
        {/* Vertical fade for each trail: bright head → transparent tail,
            so a falling streak reads as a soft tapered comet of light. */}
        <linearGradient id={id('streak')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={CONCERN.night.streak} stopOpacity="0" />
          <stop offset="50%" stopColor={CONCERN.night.streak} stopOpacity="0.95" />
          <stop offset="100%" stopColor={CONCERN.night.streak} stopOpacity="0" />
        </linearGradient>
        {/* Soft halo for the bright star cores. */}
        <radialGradient id={id('starGlow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={CONCERN.night.star} stopOpacity="0.9" />
          <stop offset="100%" stopColor={CONCERN.night.star} stopOpacity="0" />
        </radialGradient>
        {/* Light blur softens trails + sparkles into premium glints.
            Single stdDeviation per filter; never animated. */}
        <filter id={id('b2')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id={id('b4')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* ── FALLING LIGHT STREAKS (hero) ──
          Each streak is drawn once at its origin, then translated DOWN
          (+ slight slant) via the y/x transform. Opacity fades in near
          the top and out as it nears the bottom. On confirm the whole
          fall completes in one quick, brighter beat. */}
      {STREAKS.map((s) => {
        const animate = isConfirming
          ? { y: s.fall, x: s.slant, opacity: s.peak * 1.35 }
          : reduceMotion
            ? { y: s.fall * 0.5, x: s.slant * 0.5, opacity: s.peak * 0.5 }
            : {
                y: [0, s.fall * 0.5, s.fall],
                x: [0, s.slant * 0.5, s.slant],
                opacity: [0, s.peak, s.peak * 0.85, 0],
              };
        const transition: Transition = isConfirming
          ? surge(0.55)
          : reduceMotion
            ? { duration: 0 }
            : { duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'linear' };
        return (
          <motion.rect
            key={`streak-${s.x}`}
            x={sn(s.x - s.w / 2)}
            y={sn(s.top)}
            width={sn(s.w)}
            height={sn(s.len)}
            rx={sn(s.w / 2)}
            fill={`url(#${id('streak')})`}
            filter={`url(#${id('b2')})`}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={animate}
            transition={transition}
          />
        );
      })}

      {/* ── STAR DUST (accent) ──
          Tiny points twinkling on desynced opacity loops. Bigger stars
          carry a faint glow halo + a 4-point sparkle cross. On confirm
          every star flares to near-full brightness, then settles. */}
      {STARS.map((st) => {
        const animate = isConfirming
          ? { opacity: Math.min(1, st.peak + 0.15), scale: 1.25 }
          : reduceMotion
            ? { opacity: st.peak * 0.6, scale: 1 }
            : { opacity: [st.peak * 0.35, st.peak, st.peak * 0.5], scale: [0.9, 1.1, 0.95] };
        const transition: Transition = isConfirming
          ? surge(0.5)
          : loop(reduceMotion, st.dur, st.delay);
        return (
          <motion.g
            key={`star-${st.cx}-${st.cy}`}
            initial={{ opacity: 0, scale: 1 }}
            animate={animate}
            transition={transition}
            style={{ transformOrigin: `${st.cx}px ${st.cy}px` }}
          >
            {st.big && (
              <>
                {/* Soft halo behind the brighter stars */}
                <circle
                  cx={st.cx}
                  cy={st.cy}
                  r={sn(st.r * 3.4)}
                  fill={`url(#${id('starGlow')})`}
                  filter={`url(#${id('b4')})`}
                />
                {/* 4-point sparkle cross */}
                <line
                  x1={st.cx}
                  y1={sn(st.cy - st.r * 2.6)}
                  x2={st.cx}
                  y2={sn(st.cy + st.r * 2.6)}
                  stroke={CONCERN.night.star}
                  strokeWidth={0.6}
                  strokeLinecap="round"
                />
                <line
                  x1={sn(st.cx - st.r * 2.6)}
                  y1={st.cy}
                  x2={sn(st.cx + st.r * 2.6)}
                  y2={st.cy}
                  stroke={CONCERN.night.star}
                  strokeWidth={0.6}
                  strokeLinecap="round"
                />
              </>
            )}
            {/* The star point itself */}
            <circle cx={st.cx} cy={st.cy} r={sn(st.r)} fill={CONCERN.night.star} />
          </motion.g>
        );
      })}
    </g>
  );
}
