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
/*  B 去按摩／Spa:「溫石靜修」 Warm Stone Sanctuary                    */
/*  The client likes Q10 A because it feels like a quiet, depopulated  */
/*  ritual. This scene follows the same rule: no body, no treatment    */
/*  demo, just warm stones, folded linen, a shallow spa basin, and     */
/*  slow steam as the single hero motion.                              */
/* ================================================================== */

const sn = (v: number) => +v.toFixed(1);

const SPA = {
  mist: '#f8f0e4',
  towelHi: '#fffaf1',
  towelMid: '#eee0ca',
  towelLo: '#cdbb9d',
  stoneHi: '#a79b8e',
  stoneMid: '#786f65',
  stoneLo: '#4d463f',
  amber: '#c9a070',
  rose: '#d9b6aa',
  deep: '#6b6358',
} as const;

const STONES = [
  { cx: 176, cy: 246, rx: 34, ry: 13, rot: -8, tone: 0.08, phase: 0.15 },
  { cx: 216, cy: 230, rx: 39, ry: 15, rot: 5, tone: 0.0, phase: 0.38 },
  { cx: 250, cy: 252, rx: 36, ry: 13, rot: -4, tone: 0.12, phase: 0.64 },
] as const;

const MOTES = [
  { cx: 92, cy: 146, dur: 11.3, delay: 1.2, drift: 7, r: 1.1 },
  { cx: 318, cy: 158, dur: 12.1, delay: 3.5, drift: -6, r: 1 },
  { cx: 286, cy: 104, dur: 10.8, delay: 5.1, drift: 5, r: 1.2 },
  { cx: 138, cy: 284, dur: 13.2, delay: 6.2, drift: -4, r: 0.9 },
] as const;

const basinD =
  'M64 284 C96 258 144 246 202 246 C264 246 318 260 342 286 ' +
  'C312 326 262 348 202 348 C142 348 94 326 64 284 Z';

const basinLipD =
  'M70 282 C104 262 148 253 202 253 C260 253 306 263 336 284';

const linenBackD =
  'M82 316 C116 298 154 292 198 296 C248 300 294 298 332 316 L332 400 L82 400 Z';

const linenFrontD =
  'M54 354 C102 330 150 322 204 326 C264 330 318 324 356 354 L356 400 L54 400 Z';

const steamD = (x: number, amp: number) =>
  `M${sn(x)} 252 C${sn(x - amp)} 224 ${sn(x + amp * 0.8)} 202 ${sn(x - amp * 0.2)} 174 ` +
  `C${sn(x - amp * 0.8)} 144 ${sn(x + amp * 0.55)} 126 ${sn(x + amp * 0.1)} 96`;

const STEAM_A = [steamD(176, 10), steamD(176, -5), steamD(176, 7), steamD(176, 10)];
const STEAM_B = [steamD(224, -8), steamD(224, 6), steamD(224, -4), steamD(224, -8)];
const STEAM_C = [steamD(262, 6), steamD(262, -7), steamD(262, 4), steamD(262, 6)];

function Stone({
  uid,
  cx,
  cy,
  rx,
  ry,
  rot,
  tone,
  phase,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rot: number;
  tone: number;
  phase: number;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (name: string) => `q10-spa-stone-${name}-${uid}-${cx}`;

  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <defs>
        <radialGradient id={id('body')} cx="34%" cy="24%" r="84%">
          <stop offset="0%" stopColor={SPA.stoneHi} />
          <stop offset="48%" stopColor={SPA.stoneMid} />
          <stop offset="100%" stopColor={SPA.stoneLo} />
        </radialGradient>
        <radialGradient id={id('heat')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={SPA.amber} stopOpacity={0.78 - tone} />
          <stop offset="58%" stopColor={SPA.amber} stopOpacity={0.24} />
          <stop offset="100%" stopColor={SPA.amber} stopOpacity={0} />
        </radialGradient>
        <filter id={id('b4')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <motion.ellipse
        cx={cx}
        cy={cy + ry * 0.85}
        rx={rx * 1.35}
        ry={ry * 1.15}
        fill={`url(#${id('heat')})`}
        filter={`url(#${id('b4')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: [0.24, 0.58, 0.32] }
            : reduceMotion
              ? { opacity: 0.24 }
              : { opacity: [0.18, 0.34, 0.18] }
        }
        transition={isConfirming ? { duration: 0.55, ease: 'easeOut' } : loop(reduceMotion, 5.4, phase * 5.4)}
      />

      <ellipse cx={cx + 3} cy={cy + ry * 0.85} rx={rx * 0.9} ry={ry * 0.42} fill={SPA.deep} opacity="0.22" filter={`url(#${id('b4')})`} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id('body')})`} />
      <path
        d={`M${sn(cx - rx * 0.72)} ${sn(cy - ry * 0.1)} C${sn(cx - rx * 0.42)} ${sn(cy - ry * 0.72)} ${sn(cx + rx * 0.18)} ${sn(cy - ry * 0.78)} ${sn(cx + rx * 0.52)} ${sn(cy - ry * 0.32)}`}
        fill="none"
        stroke={SPA.towelHi}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.58"
      />
    </g>
  );
}

export default function RitualSpaScene({ isConfirming, reduceMotion }: RitualSceneProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q10-spa-${name}-${uid}`;
  const enter = (delay: number, duration = 0.46): Transition => ({
    duration: reduceMotion ? 0 : duration,
    delay: reduceMotion ? 0 : delay,
    ease: revealEase,
  });

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id('field')} x1="0%" y1="0%" x2="68%" y2="100%">
          <stop offset="0%" stopColor="#fbf6ed" />
          <stop offset="52%" stopColor="#efe5d5" />
          <stop offset="100%" stopColor="#dccdb7" />
        </linearGradient>
        <radialGradient id={id('dawn')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={RITUAL.dawnHi} stopOpacity="0.9" />
          <stop offset="56%" stopColor={RITUAL.dawn} stopOpacity="0.3" />
          <stop offset="100%" stopColor={RITUAL.dawn} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('basin')} x1="16%" y1="8%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="48%" stopColor="#eadcc7" />
          <stop offset="100%" stopColor="#c8b596" />
        </linearGradient>
        <linearGradient id={id('linen')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={SPA.towelHi} />
          <stop offset="56%" stopColor={SPA.towelMid} />
          <stop offset="100%" stopColor={SPA.towelLo} />
        </linearGradient>
        <linearGradient id={id('steam')} gradientUnits="userSpaceOnUse" x1="200" y1="260" x2="200" y2="84">
          <stop offset="0%" stopColor={SPA.mist} stopOpacity="0" />
          <stop offset="22%" stopColor={SPA.mist} stopOpacity="0.55" />
          <stop offset="62%" stopColor={SPA.mist} stopOpacity="0.34" />
          <stop offset="100%" stopColor={SPA.mist} stopOpacity="0" />
        </linearGradient>
        <filter id={id('b8')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id={id('b16')} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter(0, 0.38)}>
        <rect width="400" height="400" fill={`url(#${id('field')})`} />
        <motion.ellipse
          cx="54"
          cy="52"
          rx="172"
          ry="132"
          fill={`url(#${id('dawn')})`}
          filter={`url(#${id('b16')})`}
          initial={false}
          animate={reduceMotion ? { opacity: 0.48 } : { opacity: [0.38, 0.62, 0.38] }}
          transition={loop(reduceMotion, 9)}
        />
        <ellipse cx="350" cy="360" rx="130" ry="100" fill={SPA.rose} opacity="0.12" filter={`url(#${id('b16')})`} />
      </motion.g>

      <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={enter(0.08)}>
        <path d={linenBackD} fill={`url(#${id('linen')})`} opacity="0.82" />
        <ellipse cx="204" cy="338" rx="144" ry="24" fill={SPA.deep} opacity="0.12" filter={`url(#${id('b16')})`} />
        <path d={basinD} fill={`url(#${id('basin')})`} />
        <path d={basinLipD} fill="none" stroke="#fff9ef" strokeWidth="4.2" strokeLinecap="round" opacity="0.82" />
        <path d={basinLipD} fill="none" stroke={SPA.deep} strokeWidth="1" strokeLinecap="round" opacity="0.16" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 9 }}
        animate={{ opacity: 1, y: 0 }}
        transition={enter(0.18, 0.5)}
      >
        <motion.g
          initial={false}
          animate={isConfirming ? { y: -2 } : reduceMotion ? { y: 0 } : { y: [0, -1.8, 0] }}
          transition={isConfirming ? { duration: 0.55, ease: 'easeOut' } : loop(reduceMotion, 5.8)}
        >
          {STONES.map((stone) => (
            <Stone
              key={`spa-stone-${stone.cx}`}
              uid={uid}
              isConfirming={isConfirming}
              reduceMotion={reduceMotion}
              {...stone}
            />
          ))}
        </motion.g>
      </motion.g>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter(0.32, 0.44)}>
        {[STEAM_A, STEAM_B, STEAM_C].map((frames, i) => (
          <motion.path
            key={`spa-steam-${i}`}
            d={frames[0]}
            fill="none"
            stroke={`url(#${id('steam')})`}
            strokeWidth={i === 1 ? 12 : 8}
            strokeLinecap="round"
            filter={`url(#${id('b8')})`}
            initial={false}
            animate={
              isConfirming
                ? { opacity: 0.82, y: -4 }
                : reduceMotion
                  ? { d: frames[0], opacity: i === 1 ? 0.45 : 0.34 }
                  : { d: frames, opacity: i === 1 ? [0.38, 0.62, 0.38] : [0.24, 0.46, 0.24] }
            }
            transition={
              isConfirming
                ? { duration: 0.58, ease: 'easeOut' }
                : { duration: i === 1 ? 8.2 : 9.6, delay: i * 0.9, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        ))}
      </motion.g>

      <motion.path
        d={linenFrontD}
        fill={`url(#${id('linen')})`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.92, y: 0 }}
        transition={enter(0.26, 0.46)}
      />
      <path d="M92 350 C138 336 172 335 214 342 C252 348 292 340 338 352" fill="none" stroke={SPA.deep} strokeWidth="1.1" opacity="0.11" />

      <ConfirmBloom uid={uid} color={SPA.amber} isConfirming={isConfirming} reduceMotion={reduceMotion} cx={214} cy={242} />

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={enter(0.42, 0.4)}>
        {MOTES.map((m) => (
          <DustMote key={`spa-mote-${m.cx}-${m.cy}`} cx={m.cx} cy={m.cy} r={m.r} drift={m.drift} dur={m.dur} delay={m.delay} reduceMotion={reduceMotion} />
        ))}
      </motion.g>

      <GrainOverlay uid={uid} />
    </svg>
  );
}
