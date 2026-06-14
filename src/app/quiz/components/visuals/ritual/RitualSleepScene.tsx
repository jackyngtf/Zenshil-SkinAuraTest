'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import {
  RITUAL,
  loop,
  revealEase,
  GrainOverlay,
  ConfirmBloom,
  DustMote,
} from './ritualShared';
import type { RitualSceneProps } from './ritualShared';

/* ================================================================== */
/*  A — 好好補眠「晨光透紗簾」 Dawn Through Linen                       */
/*  A depopulated bedroom at first light: a tall window band on the   */
/*  left glowing peach→lavender, a sheer curtain breathing in the     */
/*  draft, one blurred light shaft falling across the room, and a     */
/*  duvet of three linen dunes — the middle one rises and falls like  */
/*  a sleeper who is finally getting their hours back.                */
/*  Accent (plum #8d7a96) lives only in the fold shadows.             */
/* ================================================================== */

const f = (v: number) => +v.toFixed(1);

/* Window band per spec: ≈ x 52–128, y 40–250 */
const WIN = { x: 52, y: 40, w: 76, h: 210 };

/* ── Sheer curtain hanging at the window's inner (right) edge.
      One parametric generator so every sway keyframe shares the
      exact same command structure; s = lateral billow, strongest
      at the free-hanging hem. ── */
const curtainD = (s: number) => {
  const x0 = 114;
  const w = 24;
  return (
    `M${f(x0)} 34 ` +
    `C${f(x0 + 4 + s * 0.25)} 96 ${f(x0 - 3 + s * 0.55)} 162 ${f(x0 + 5 + s)} 222 ` +
    `C${f(x0 + 8 + s * 1.4)} 246 ${f(x0 + 3 + s * 1.7)} 258 ${f(x0 + 9 + s * 2)} 266 ` +
    `L${f(x0 + 9 + w + s * 1.85)} 263 ` +
    `C${f(x0 + 5 + w + s * 1.55)} 252 ${f(x0 + 8 + w + s * 1.25)} 240 ${f(x0 + 6 + w + s * 0.85)} 218 ` +
    `C${f(x0 + 2 + w + s * 0.5)} 158 ${f(x0 + 7 + w + s * 0.2)} 94 ${f(x0 + w)} 34 Z`
  );
};

/* One inner crease tracking the veil at reduced amplitude */
const curtainFoldD = (s: number) =>
  `M122 42 C${f(124 + s * 0.3)} 104 ${f(119 + s * 0.6)} 170 ${f(125 + s)} 234`;

/* ── Duvet middle dune — the hero. lift > 0 raises the crest a few
      px: the breath of someone asleep under the linen. ── */
const duvetMidD = (lift: number) =>
  `M84 400 ` +
  `C92 ${f(348 - lift * 0.2)} 124 ${f(288 - lift * 0.65)} 180 ${f(262 - lift)} ` +
  `C212 ${f(247 - lift * 1.15)} 258 ${f(258 - lift * 0.7)} 290 ${f(300 - lift * 0.3)} ` +
  `C314 ${f(336 - lift * 0.1)} 326 372 332 400 Z`;

const DUVET_BACK_D =
  'M-20 400 C-8 330 40 282 100 271 C152 261.5 198 292 226 330 ' +
  'C240 350 248 376 252 400 Z';

const DUVET_FRONT_D =
  'M232 400 C240 354 270 318 318 306 C354 297 392 312 414 338 L414 400 Z';

/* Light shaft from the window face, slanting down-right with the
   upper-left dawn source */
const SHAFT_POINTS = '82,96 128,56 348,326 250,386';

/* Dust riding the shaft. All duration/delay pairs distinct. */
const MOTES = [
  { cx: 150, cy: 134, r: 1.4, drift: 9, dur: 10.3, delay: 0.6 },
  { cx: 172, cy: 168, r: 1.1, drift: 7, dur: 11.6, delay: 2.1 },
  { cx: 198, cy: 196, r: 1.5, drift: 10, dur: 12.4, delay: 4.2 },
  { cx: 186, cy: 232, r: 1, drift: 6, dur: 9.8, delay: 1.4 },
  { cx: 226, cy: 238, r: 1.3, drift: 8, dur: 13.2, delay: 5.4 },
  { cx: 210, cy: 150, r: 1.2, drift: 7.5, dur: 10.8, delay: 3.3 },
  { cx: 244, cy: 280, r: 1.4, drift: 9.5, dur: 12.7, delay: 6.7 },
];

export default function RitualSleepScene({ isConfirming, reduceMotion }: RitualSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q10x-sleep-${name}-${uid}`;

  /* Hero breath: 6s rise/fall loop; confirm = one gentle lift that
     overshoots and settles (the overshoot bezier does the "settle"). */
  const breathFrames = [duvetMidD(0), duvetMidD(4.5), duvetMidD(0)];
  const heroAnimate = isConfirming
    ? { d: duvetMidD(5.5) }
    : reduceMotion
      ? { d: duvetMidD(0) }
      : { d: breathFrames };
  const heroTransition: Transition = isConfirming
    ? reduceMotion
      ? { duration: 0 }
      : { duration: 0.62, ease: [0.3, 1.3, 0.5, 1] }
    : loop(reduceMotion, 6);

  const confirmShot = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: 'easeOut' };

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Wall, lit from the window side */}
        <linearGradient id={id('field')} x1="0%" y1="0%" x2="72%" y2="100%">
          <stop offset="0%" stopColor="#fbf7ee" />
          <stop offset="52%" stopColor="#f2ebdd" />
          <stop offset="100%" stopColor="#ddd3c0" />
        </linearGradient>
        {/* Far wall falls away from the light */}
        <linearGradient id={id('wallshade')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="55%" stopColor={RITUAL.deep} stopOpacity="0" />
          <stop offset="100%" stopColor={RITUAL.deep} stopOpacity="0.1" />
        </linearGradient>
        {/* Dawn sky in the window: lavender high, peach→gold at the sill */}
        <linearGradient id={id('sky')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c7b8d6" />
          <stop offset="42%" stopColor="#e9c9c2" />
          <stop offset="74%" stopColor="#f6d8b6" />
          <stop offset="100%" stopColor="#fbeed0" />
        </linearGradient>
        <linearGradient id={id('shaft')} x1="0%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor={RITUAL.dawnHi} stopOpacity="0.95" />
          <stop offset="62%" stopColor={RITUAL.dawnHi} stopOpacity="0.35" />
          <stop offset="100%" stopColor={RITUAL.dawnHi} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('veil')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fdfaf2" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#f6efe0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#efe5d0" stopOpacity="0.3" />
        </linearGradient>
        {/* Duvet dunes: highlight biased to the upper-left light */}
        <radialGradient id={id('duneback')} cx="30%" cy="14%" r="100%">
          <stop offset="0%" stopColor="#f4eddf" />
          <stop offset="58%" stopColor="#e9dfcc" />
          <stop offset="100%" stopColor="#dcd0b9" />
        </radialGradient>
        <radialGradient id={id('dunemid')} cx="34%" cy="10%" r="98%">
          <stop offset="0%" stopColor="#fbf6ea" />
          <stop offset="52%" stopColor="#eee3cd" />
          <stop offset="100%" stopColor="#d2c5aa" />
        </radialGradient>
        <radialGradient id={id('dunefront')} cx="32%" cy="12%" r="100%">
          <stop offset="0%" stopColor="#f4ecdb" />
          <stop offset="55%" stopColor="#e2d6bd" />
          <stop offset="100%" stopColor="#c6b89c" />
        </radialGradient>
        <linearGradient id={id('sweep')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f7e6bd" stopOpacity="0" />
          <stop offset="50%" stopColor="#fdf4dd" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f7e6bd" stopOpacity="0" />
        </linearGradient>
        <filter id={id('b14')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={id('b8')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id={id('b3')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        {/* Breathing clip — keeps the crest light/fold detail welded to
            the morphing dune (Q7 idiom: clip shares the body timing) */}
        <clipPath id={id('midclip')}>
          <motion.path
            d={duvetMidD(0)}
            initial={false}
            animate={heroAnimate}
            transition={heroTransition}
          />
        </clipPath>
      </defs>

      {/* ── Background: wall + window (entrance: first in) ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: revealEase }}
      >
        <rect width="400" height="400" fill={`url(#${id('field')})`} />
        <rect width="400" height="400" fill={`url(#${id('wallshade')})`} />

        <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx={3} fill={`url(#${id('sky')})`} />

        {/* Low sun behind the sheers */}
        <motion.ellipse
          cx={96}
          cy={186}
          rx={26}
          ry={30}
          fill={RITUAL.dawnHi}
          filter={`url(#${id('b14')})`}
          initial={false}
          animate={reduceMotion ? { opacity: 0.48 } : { opacity: [0.35, 0.6, 0.35] }}
          transition={loop(reduceMotion, 5.3, 1.2)}
        />

        {/* Thin frame: border, one vertical mullion, two horizontals, sill */}
        <g stroke={RITUAL.deep} fill="none" opacity="0.16">
          <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx={3} strokeWidth="1.4" />
          <line x1={90} y1={WIN.y} x2={90} y2={WIN.y + WIN.h} strokeWidth="1.1" />
          <line x1={WIN.x} y1={110} x2={WIN.x + WIN.w} y2={110} strokeWidth="1.1" />
          <line x1={WIN.x} y1={180} x2={WIN.x + WIN.w} y2={180} strokeWidth="1.1" />
        </g>
        <line x1={46} y1={252} x2={134} y2={252} stroke={RITUAL.deep} strokeWidth="1.6" opacity="0.2" />

        {/* Dawn bleeding past the frame into the room */}
        <motion.ellipse
          cx={134}
          cy={156}
          rx={46}
          ry={88}
          fill={RITUAL.dawn}
          filter={`url(#${id('b14')})`}
          initial={false}
          animate={reduceMotion ? { opacity: 0.24 } : { opacity: [0.18, 0.3, 0.18] }}
          transition={loop(reduceMotion, 6.1, 0.9)}
        />

        {/* Confirm: the window itself flares brighter */}
        <motion.rect
          x={WIN.x}
          y={WIN.y}
          width={WIN.w}
          height={WIN.h}
          rx={3}
          fill={RITUAL.dawnHi}
          initial={false}
          animate={
            isConfirming
              ? { opacity: 0.55 }
              : reduceMotion
                ? { opacity: 0.1 }
                : { opacity: [0.05, 0.15, 0.05] }
          }
          transition={isConfirming ? confirmShot(0.5) : loop(reduceMotion, 7.7, 0.5)}
        />
      </motion.g>

      {/* ── Curtain veil, swaying in a draft only it can feel ── */}
      <motion.g
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: revealEase }}
      >
        <motion.path
          d={curtainD(0)}
          fill={`url(#${id('veil')})`}
          initial={false}
          animate={
            reduceMotion ? { d: curtainD(2) } : { d: [curtainD(0), curtainD(7), curtainD(-4), curtainD(0)] }
          }
          transition={loop(reduceMotion, 7.2, 0.15)}
        />
        <motion.path
          d={curtainFoldD(0)}
          fill="none"
          stroke="#fdfaf2"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
          initial={false}
          animate={
            reduceMotion
              ? { d: curtainFoldD(1) }
              : { d: [curtainFoldD(0), curtainFoldD(4), curtainFoldD(-2.5), curtainFoldD(0)] }
          }
          transition={loop(reduceMotion, 7.9, 0.85)}
        />
      </motion.g>

      {/* ── Duvet: three linen dunes across the lower half (focal) ── */}
      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: revealEase }}
      >
        {/* Back dune — furthest, lightest, smallest drift */}
        <motion.g
          initial={false}
          animate={reduceMotion ? { y: 0 } : { y: [0, -1.2, 0] }}
          transition={loop(reduceMotion, 9.3, 1.6)}
        >
          <path d={DUVET_BACK_D} fill={`url(#${id('duneback')})`} opacity="0.92" />
        </motion.g>

        {/* Fold shadow in the left valley (the plum accent) */}
        <path
          d="M156 308 C160 340 158 372 154 400"
          fill="none"
          stroke={RITUAL.accent.sleep}
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.14"
          filter={`url(#${id('b8')})`}
        />

        {/* Middle dune — the sleeper. d-morph breath, ~6s */}
        <motion.path
          d={duvetMidD(0)}
          fill={`url(#${id('dunemid')})`}
          initial={false}
          animate={heroAnimate}
          transition={heroTransition}
        />

        {/* Surface detail welded to the breathing dune */}
        <g clipPath={`url(#${id('midclip')})`}>
          {/* Crest catching the window light */}
          <ellipse
            cx={212}
            cy={262}
            rx={64}
            ry={18}
            fill={RITUAL.dawnHi}
            opacity="0.4"
            filter={`url(#${id('b8')})`}
            transform="rotate(-8 212 262)"
          />
          {/* Flank turning away from the light */}
          <ellipse
            cx={276}
            cy={322}
            rx={56}
            ry={30}
            fill={RITUAL.accent.sleep}
            opacity="0.1"
            filter={`url(#${id('b8')})`}
          />
          {/* Linen creases below the crest */}
          <path
            d="M188 286 C210 278 236 280 256 292"
            fill="none"
            stroke={RITUAL.accent.sleep}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.14"
            filter={`url(#${id('b3')})`}
          />
          <path
            d="M170 318 C198 306 234 306 262 318"
            fill="none"
            stroke={RITUAL.accent.sleep}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.1"
            filter={`url(#${id('b3')})`}
          />
        </g>

        {/* Fold shadow in the right valley */}
        <path
          d="M302 330 C308 356 312 378 312 400"
          fill="none"
          stroke={RITUAL.accent.sleep}
          strokeWidth="11"
          strokeLinecap="round"
          opacity="0.12"
          filter={`url(#${id('b8')})`}
        />

        {/* Front dune — nearest, deepest tone, its own drift */}
        <motion.g
          initial={false}
          animate={reduceMotion ? { y: 0 } : { y: [0, -1.6, 0] }}
          transition={loop(reduceMotion, 8.2, 2.4)}
        >
          <path d={DUVET_FRONT_D} fill={`url(#${id('dunefront')})`} />
          <path
            d="M270 322 C292 310 318 305 340 306"
            fill="none"
            stroke={RITUAL.dawnHi}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.42"
            filter={`url(#${id('b3')})`}
          />
        </motion.g>
      </motion.g>

      {/* ── Light shaft over the bed: volumetric, breathing ── */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.42, delay: 0.1, ease: revealEase }}
      >
        <motion.polygon
          points={SHAFT_POINTS}
          fill={`url(#${id('shaft')})`}
          filter={`url(#${id('b14')})`}
          initial={false}
          animate={
            isConfirming
              ? { opacity: 0.36, x: 0 }
              : reduceMotion
                ? { opacity: 0.16, x: 0 }
                : { opacity: [0.11, 0.21, 0.11], x: [0, 4, 0] }
          }
          transition={isConfirming ? confirmShot(0.55) : loop(reduceMotion, 8.7, 0.4)}
        />
      </motion.g>

      {/* Dust riding the shaft */}
      {MOTES.map((m) => (
        <DustMote
          key={`sleep-mote-${m.cx}-${m.cy}`}
          cx={m.cx}
          cy={m.cy}
          r={m.r}
          drift={m.drift}
          dur={m.dur}
          delay={m.delay}
          reduceMotion={reduceMotion}
        />
      ))}

      {/* ── Confirm payoff: dawn arrives all at once ── */}
      <ConfirmBloom
        uid={uid}
        color={RITUAL.dawnHi}
        isConfirming={isConfirming}
        reduceMotion={reduceMotion}
        cx={186}
        cy={224}
      />
      {isConfirming && (
        <motion.rect
          width="400"
          height="400"
          fill="#f6e3b8"
          initial={{ opacity: 0 }}
          animate={reduceMotion ? { opacity: 0.16 } : { opacity: [0, 0.2, 0.1] }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.6, times: [0, 0.5, 1], ease: 'easeOut' }
          }
        />
      )}
      {isConfirming && !reduceMotion && (
        <g transform="rotate(20 200 200)">
          <motion.rect
            x={-150}
            y={-60}
            width={110}
            height={520}
            fill={`url(#${id('sweep')})`}
            initial={{ x: 0, opacity: 0.85 }}
            animate={{ x: 580 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </g>
      )}

      <GrainOverlay uid={uid} />
    </svg>
  );
}
