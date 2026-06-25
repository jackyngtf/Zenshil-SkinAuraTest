'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CLOUD_BANKS = [
  { d: 'M-34 142 C30 124 62 132 106 115 C158 94 195 116 238 101 C286 84 331 103 436 84', opacity: 0.2, y: -8, duration: 24 },
  { d: 'M-46 184 C18 171 63 183 116 165 C164 149 215 162 259 151 C319 137 363 153 448 139', opacity: 0.18, y: 10, duration: 28 },
  { d: 'M-22 221 C40 211 80 222 131 205 C189 186 236 207 282 193 C329 180 368 190 424 176', opacity: 0.14, y: 4, duration: 20 },
];

const HAZE_LINES = [
  { x1: 18, y1: 96, x2: 83, y2: 83, opacity: 0.16, duration: 18 },
  { x1: 304, y1: 116, x2: 375, y2: 104, opacity: 0.14, duration: 22 },
  { x1: 284, y1: 274, x2: 358, y2: 260, opacity: 0.12, duration: 26 },
  { x1: 31, y1: 286, x2: 106, y2: 273, opacity: 0.1, duration: 24 },
];

const MIST_TRACES = [
  { x: 54, y: 151, h: 34, opacity: 0.16, duration: 12 },
  { x: 72, y: 184, h: 23, opacity: 0.12, duration: 14 },
  { x: 340, y: 166, h: 28, opacity: 0.1, duration: 13 },
];

const MOTES = [
  { cx: 315, cy: 72, r: 1.2, opacity: 0.28, dx: 8, dy: -5, duration: 12 },
  { cx: 351, cy: 246, r: 1.05, opacity: 0.22, dx: -7, dy: 4, duration: 14 },
  { cx: 54, cy: 238, r: 0.95, opacity: 0.2, dx: 6, dy: 5, duration: 13 },
  { cx: 367, cy: 124, r: 0.8, opacity: 0.18, dx: -5, dy: -4, duration: 11 },
  { cx: 38, cy: 111, r: 0.75, opacity: 0.16, dx: 7, dy: -3, duration: 15 },
];

export default function Q2IdleWeatherScene() {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q02idle-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id('sky')} x1="18%" y1="0%" x2="86%" y2="100%">
          <stop offset="0%" stopColor="#f5f1e9" />
          <stop offset="28%" stopColor="#d8d6df" />
          <stop offset="58%" stopColor="#b9c3cf" />
          <stop offset="100%" stopColor="#7f8e9e" />
        </linearGradient>
        <radialGradient id={id('hiddenSun')} cx="66%" cy="31%" r="33%">
          <stop offset="0%" stopColor="#fff8e8" stopOpacity="0.86" />
          <stop offset="42%" stopColor="#eee7dc" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#d5d2dc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('horizon')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8e99a9" stopOpacity="0" />
          <stop offset="22%" stopColor="#e6dfdc" stopOpacity="0.42" />
          <stop offset="53%" stopColor="#f8f2e9" stopOpacity="0.5" />
          <stop offset="82%" stopColor="#c5bdcc" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#8d98a7" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('edgeFadeGrad')} cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="68%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <filter id={id('softBlur')} x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={id('fineBlur')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <mask id={id('edgeFade')}>
          <rect width="400" height="400" fill={`url(#${id('edgeFadeGrad')})`} />
        </mask>
      </defs>

      <g mask={`url(#${id('edgeFade')})`}>
        <rect width="400" height="400" fill={`url(#${id('sky')})`} />
        <rect width="400" height="400" fill={`url(#${id('hiddenSun')})`} />
        <path d="M0 252 C62 237 104 246 151 232 C204 216 249 231 299 219 C338 210 370 214 400 205 L400 400 L0 400 Z" fill="#8e9aa9" opacity="0.12" />
        <path d="M0 239 C52 229 97 236 146 224 C199 211 245 222 293 212 C335 204 369 206 400 198" fill="none" stroke={`url(#${id('horizon')})`} strokeWidth="18" strokeLinecap="round" filter={`url(#${id('softBlur')})`} />

        {CLOUD_BANKS.map((cloud, index) => (
          <motion.path
            key={cloud.d}
            d={cloud.d}
            fill="none"
            stroke="#fbf7ef"
            strokeWidth={index === 0 ? 28 : 22}
            strokeLinecap="round"
            opacity={cloud.opacity}
            filter={`url(#${id('softBlur')})`}
            animate={reduceMotion ? undefined : { x: [0, index % 2 === 0 ? 18 : -16, 0], y: [0, cloud.y, 0], opacity: [cloud.opacity, cloud.opacity + 0.06, cloud.opacity] }}
            transition={reduceMotion ? undefined : { duration: cloud.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <motion.ellipse
          cx="268"
          cy="126"
          rx="91"
          ry="27"
          fill="#f8f4ed"
          opacity="0.2"
          filter={`url(#${id('softBlur')})`}
          animate={reduceMotion ? undefined : { x: [0, 10, 0], opacity: [0.16, 0.25, 0.16] }}
          transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {HAZE_LINES.map((line) => (
          <motion.line
            key={`${line.x1}-${line.y1}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#f9f3ea"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={line.opacity}
            animate={reduceMotion ? undefined : { x: [0, 9, 0], opacity: [line.opacity * 0.5, line.opacity, line.opacity * 0.5] }}
            transition={reduceMotion ? undefined : { duration: line.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {MIST_TRACES.map((trace) => (
          <motion.line
            key={`${trace.x}-${trace.y}`}
            x1={trace.x}
            y1={trace.y}
            x2={trace.x - 4}
            y2={trace.y + trace.h}
            stroke="#e9edf2"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={trace.opacity}
            filter={`url(#${id('fineBlur')})`}
            animate={reduceMotion ? undefined : { y: [0, 8, 0], opacity: [trace.opacity * 0.45, trace.opacity, trace.opacity * 0.45] }}
            transition={reduceMotion ? undefined : { duration: trace.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {MOTES.map((mote) => (
          <motion.circle
            key={`${mote.cx}-${mote.cy}`}
            cx={mote.cx}
            cy={mote.cy}
            r={mote.r}
            fill="#fff8ec"
            opacity={mote.opacity}
            animate={reduceMotion ? undefined : { x: [0, mote.dx, 0], y: [0, mote.dy, 0], opacity: [mote.opacity * 0.4, mote.opacity, mote.opacity * 0.4] }}
            transition={reduceMotion ? undefined : { duration: mote.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <rect width="400" height="400" fill="#f9f5ee" opacity="0.05" />
      </g>
    </svg>
  );
}
