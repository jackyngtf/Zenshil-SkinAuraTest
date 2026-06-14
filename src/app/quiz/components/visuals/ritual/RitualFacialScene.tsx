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
/*  D 做 Facial＋Reset:「光膜重啟」 Luminous Reset Mask                 */
/*  Replaces the previous pipette/demo language with a calm facial     */
/*  ritual still-life: one treatment plinth, one floating skin-membrane */
/*  oval, one serum moon, and a soft reset ring.                       */
/* ================================================================== */

const sn = (v: number) => +v.toFixed(1);

const FACIAL = {
  fieldA: '#fbf5ed',
  fieldB: '#f0e4d6',
  fieldC: '#ddd0bd',
  blush: '#d9a8ad',
  blushHi: '#f8d8d3',
  sage: '#a8bd9d',
  amber: '#d9bd8a',
  cream: '#fffaf1',
  linen: '#eadcca',
  deep: '#6b6358',
} as const;

const MOTES = [
  { cx: 92, cy: 146, dur: 11.4, delay: 1.4, drift: 7, r: 1.1 },
  { cx: 312, cy: 152, dur: 12.4, delay: 3.8, drift: -6, r: 1 },
  { cx: 300, cy: 286, dur: 10.6, delay: 6.2, drift: 6, r: 1.2 },
  { cx: 120, cy: 300, dur: 13.6, delay: 5.1, drift: -5, r: 0.9 },
] as const;

const plinthD =
  'M64 342 C100 316 150 304 206 306 C266 308 318 320 350 346 L350 400 L64 400 Z';

const maskD = (lift: number) =>
  `M108 ${sn(246 - lift * 0.35)} ` +
  `C120 ${sn(204 - lift)} 158 ${sn(178 - lift * 0.8)} 204 ${sn(178 - lift * 0.55)} ` +
  `C252 ${sn(178 - lift * 0.75)} 288 ${sn(206 - lift * 0.85)} 296 ${sn(248 - lift * 0.32)} ` +
  `C282 ${sn(292 - lift * 0.18)} 246 ${sn(316 + lift * 0.08)} 202 ${sn(316 + lift * 0.08)} ` +
  `C158 ${sn(316 + lift * 0.08)} 120 ${sn(292 - lift * 0.18)} 108 ${sn(246 - lift * 0.35)} Z`;

const RESET_RING: string[] = [
  'M126 249 C138 190 184 156 235 168 C288 181 310 233 286 282 C260 332 190 343 144 304',
  'M130 252 C146 192 190 160 240 174 C286 188 306 238 282 284 C254 334 186 338 142 300',
  'M124 246 C136 188 182 158 236 170 C286 181 312 232 288 280 C260 330 194 342 146 306',
  'M126 249 C138 190 184 156 235 168 C288 181 310 233 286 282 C260 332 190 343 144 304',
] as const;

export default function RitualFacialScene({ isConfirming, reduceMotion }: RitualSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q10-facial-${name}-${uid}`;
  const enter = (delay: number, duration = 0.46): Transition => ({
    duration: reduceMotion ? 0 : duration,
    delay: reduceMotion ? 0 : delay,
    ease: revealEase,
  });

  const maskFrames = [maskD(0), maskD(4.5), maskD(0)];

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id('field')} x1="0%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor={FACIAL.fieldA} />
          <stop offset="52%" stopColor={FACIAL.fieldB} />
          <stop offset="100%" stopColor={FACIAL.fieldC} />
        </linearGradient>
        <radialGradient id={id('dawn')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={RITUAL.dawnHi} stopOpacity="0.9" />
          <stop offset="56%" stopColor={RITUAL.dawn} stopOpacity="0.28" />
          <stop offset="100%" stopColor={RITUAL.dawn} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('plinth')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={FACIAL.cream} />
          <stop offset="58%" stopColor={FACIAL.linen} />
          <stop offset="100%" stopColor="#cdbb9d" />
        </linearGradient>
        <radialGradient id={id('mask')} cx="38%" cy="20%" r="88%">
          <stop offset="0%" stopColor="#fffdf6" stopOpacity="0.98" />
          <stop offset="42%" stopColor="#f6e8dd" stopOpacity="0.9" />
          <stop offset="74%" stopColor={FACIAL.blushHi} stopOpacity="0.58" />
          <stop offset="100%" stopColor={FACIAL.blush} stopOpacity="0.28" />
        </radialGradient>
        <radialGradient id={id('moon')} cx="38%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="38%" stopColor="#f8dfd9" />
          <stop offset="72%" stopColor={FACIAL.blush} />
          <stop offset="100%" stopColor="#b8848b" />
        </radialGradient>
        <linearGradient id={id('ring')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffdf6" stopOpacity="0.92" />
          <stop offset="42%" stopColor={FACIAL.blushHi} stopOpacity="0.6" />
          <stop offset="78%" stopColor={FACIAL.sage} stopOpacity="0.38" />
          <stop offset="100%" stopColor={FACIAL.amber} stopOpacity="0.34" />
        </linearGradient>
        <filter id={id('b5')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={id('b14')} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter(0, 0.38)}>
        <rect width="400" height="400" fill={`url(#${id('field')})`} />
        <motion.ellipse
          cx="52"
          cy="52"
          rx="174"
          ry="132"
          fill={`url(#${id('dawn')})`}
          filter={`url(#${id('b14')})`}
          initial={false}
          animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.38, 0.62, 0.38] }}
          transition={loop(reduceMotion, 9.4)}
        />
        <ellipse cx="342" cy="360" rx="140" ry="105" fill={FACIAL.blush} opacity="0.12" filter={`url(#${id('b14')})`} />
        <ellipse cx="70" cy="310" rx="110" ry="90" fill={FACIAL.sage} opacity="0.1" filter={`url(#${id('b14')})`} />
      </motion.g>

      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.08)}>
        <ellipse cx="204" cy="332" rx="134" ry="23" fill={FACIAL.deep} opacity="0.12" filter={`url(#${id('b14')})`} />
        <path d={plinthD} fill={`url(#${id('plinth')})`} opacity="0.94" />
        <path d="M74 342 C116 323 156 316 206 318 C258 320 306 326 342 346" fill="none" stroke="#fffaf0" strokeWidth="3.4" strokeLinecap="round" opacity="0.72" />
        <path d="M86 356 C136 342 178 340 224 346 C266 352 300 348 334 360" fill="none" stroke={FACIAL.deep} strokeWidth="1" opacity="0.1" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(0.16, 0.52)}
      >
        <motion.path
          d={RESET_RING[0]}
          fill="none"
          stroke={`url(#${id('ring')})`}
          strokeWidth="14"
          strokeLinecap="round"
          filter={`url(#${id('b5')})`}
          initial={false}
          animate={
            isConfirming
              ? { opacity: 0.84, pathLength: [0.45, 1] }
              : reduceMotion
                ? { opacity: 0.34 }
                : { d: RESET_RING, opacity: [0.28, 0.5, 0.28], pathLength: [0.82, 1, 0.82] }
          }
          transition={
            isConfirming
              ? { duration: 0.62, ease: 'easeOut' }
              : { duration: 7.8, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <motion.path
          d={RESET_RING[0]}
          fill="none"
          stroke="#fffdf6"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.48"
          initial={false}
          animate={reduceMotion ? { opacity: 0.42 } : { opacity: [0.32, 0.6, 0.32] }}
          transition={loop(reduceMotion, 7.8, 0.2)}
        />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(0.24, 0.54)}
      >
        <motion.path
          d={maskD(0)}
          fill={`url(#${id('mask')})`}
          initial={false}
          animate={isConfirming ? { d: maskD(6) } : reduceMotion ? { d: maskD(0) } : { d: maskFrames }}
          transition={isConfirming ? { duration: 0.62, ease: 'easeOut' } : loop(reduceMotion, 6.6)}
        />
        <path d="M128 248 C148 208 178 190 206 190 C238 190 268 211 284 252" fill="none" stroke="#fffdf6" strokeWidth="2.2" strokeLinecap="round" opacity="0.66" />
        <path d="M150 288 C178 302 228 304 256 286" fill="none" stroke={FACIAL.deep} strokeWidth="1.2" strokeLinecap="round" opacity="0.12" filter={`url(#${id('b5')})`} />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(0.34, 0.48)}
      >
        <motion.ellipse
          cx="204"
          cy="204"
          rx="38"
          ry="42"
          fill={`url(#${id('moon')})`}
          filter={`url(#${id('b5')})`}
          initial={false}
          animate={
            isConfirming
              ? { y: [0, 10, 3], scale: [1, 1.08, 1.02], opacity: [0.82, 1, 0.9] }
              : reduceMotion
                ? { y: 0, opacity: 0.78 }
                : { y: [0, -3, 0], opacity: [0.72, 0.92, 0.72] }
          }
          transition={isConfirming ? { duration: 0.6, ease: 'easeOut' } : loop(reduceMotion, 5.8, 0.3)}
        />
        <ellipse cx="190" cy="188" rx="11" ry="5" fill="#fffdf6" opacity="0.74" transform="rotate(-22 190 188)" />
      </motion.g>

      <motion.path
        d="M146 270 C168 264 188 265 206 272 C224 280 246 279 272 267"
        fill="none"
        stroke="#fffdf6"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.42"
        filter={`url(#${id('b5')})`}
        initial={false}
        animate={isConfirming ? { opacity: 0.72, x: 4 } : reduceMotion ? { opacity: 0.36 } : { opacity: [0.28, 0.52, 0.28], x: [-4, 5, -4] }}
        transition={isConfirming ? { duration: 0.55, ease: 'easeOut' } : loop(reduceMotion, 7.2)}
      />

      <ConfirmBloom uid={uid} color={FACIAL.blushHi} isConfirming={isConfirming} reduceMotion={reduceMotion} cx={204} cy={232} />

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter(0.44, 0.4)}>
        {MOTES.map((m) => (
          <DustMote key={`facial-mote-${m.cx}-${m.cy}`} cx={m.cx} cy={m.cy} r={m.r} drift={m.drift} dur={m.dur} delay={m.delay} reduceMotion={reduceMotion} color="#fff2e5" />
        ))}
      </motion.g>

      <GrainOverlay uid={uid} />
    </svg>
  );
}
