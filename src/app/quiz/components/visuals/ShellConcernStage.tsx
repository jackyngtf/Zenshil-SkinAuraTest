'use client';

import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

type ShellConcernVariant = 'idle' | 'A' | 'B' | 'C' | 'D';

type ShellConcernStageProps = {
  variant?: ShellConcernVariant;
  isConfirming?: boolean;
};

type ShellConcernState = {
  src: string;
  waterTop: string;
  waterMid: string;
  waterBottom: string;
  sandTop: string;
  sandBottom: string;
  aura: string;
  auraSoft: string;
  weed: string;
};

const shellConcernStates: Record<ShellConcernVariant, ShellConcernState> = {
  idle: {
    src: '/assets/quiz/q07/generated-transparent/q7-idle-generated-transparent.png',
    waterTop: '#b8c2b6',
    waterMid: '#d3d3be',
    waterBottom: '#eee5d3',
    sandTop: '#eadfc9',
    sandBottom: '#d7c7a9',
    aura: '#fff2cf',
    auraSoft: '#d9ece6',
    weed: '#7f9d8e',
  },
  A: {
    src: '/assets/quiz/q07/generated-transparent/q7-a-generated-transparent.png',
    waterTop: '#acb5c5',
    waterMid: '#d2cbd9',
    waterBottom: '#eee2d4',
    sandTop: '#eadccc',
    sandBottom: '#cfbfaa',
    aura: '#d4c6ee',
    auraSoft: '#f1e7dc',
    weed: '#83979a',
  },
  B: {
    src: '/assets/quiz/q07/generated-transparent/q7-b-generated-transparent.png',
    waterTop: '#beb8d1',
    waterMid: '#ddd0d9',
    waterBottom: '#f0dfcf',
    sandTop: '#ead8c5',
    sandBottom: '#cdbba5',
    aura: '#d5c4f0',
    auraSoft: '#f5e4d5',
    weed: '#8b8fa4',
  },
  C: {
    src: '/assets/quiz/q07/generated-transparent/q7-c-generated-transparent.png',
    waterTop: '#b9c5bf',
    waterMid: '#dfc9c9',
    waterBottom: '#f0dfd0',
    sandTop: '#ead8ca',
    sandBottom: '#d1bca8',
    aura: '#f5b8bd',
    auraSoft: '#fff0e9',
    weed: '#8da696',
  },
  D: {
    src: '/assets/quiz/q07/generated-transparent/q7-d-generated-transparent.png',
    waterTop: '#c4bfae',
    waterMid: '#e1d0ad',
    waterBottom: '#f1e2c8',
    sandTop: '#ead8b8',
    sandBottom: '#cdae80',
    aura: '#ffe4a3',
    auraSoft: '#fff7df',
    weed: '#929c83',
  },
};

const sandRipples = [
  'M34 318 Q112 310 200 315 Q288 320 366 312',
  'M18 338 Q106 330 206 335 Q300 341 386 333',
  'M58 360 Q150 354 240 358 Q326 362 392 357',
];

const motes = [
  { cx: 70, cy: 92, r: 1.3, dx: 8, dur: 9.8, delay: 0.2 },
  { cx: 118, cy: 176, r: 1.1, dx: -7, dur: 11.2, delay: 1.6 },
  { cx: 174, cy: 116, r: 1.5, dx: 6, dur: 10.4, delay: 2.4 },
  { cx: 246, cy: 152, r: 1.2, dx: -8, dur: 12, delay: 0.9 },
  { cx: 316, cy: 108, r: 1.4, dx: 7, dur: 10.8, delay: 3.1 },
  { cx: 342, cy: 236, r: 1.0, dx: -6, dur: 9.4, delay: 1.2 },
];

const shellDropCssY = 55;
const shellDropViewBoxY = 47;

const seaweedPath = (x: number, lean: number, height: number) =>
  `M${x} 402 C${x - 6 + lean * 0.4} ${402 - height * 0.36} ${x + 8 + lean * 0.6} ${402 - height * 0.68} ${x + lean} ${402 - height}`;

function ShellBackdrop({
  state,
  variant,
  isConfirming,
}: {
  state: ShellConcernState;
  variant: ShellConcernVariant;
  isConfirming: boolean;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q7-shell-${name}-${uid}`;
  const isIdle = variant === 'idle';
  const rayTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 8.6, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <svg
      viewBox="0 0 400 400"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id('water')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={state.waterTop} />
          <stop offset="52%" stopColor={state.waterMid} />
          <stop offset="100%" stopColor={state.waterBottom} />
        </linearGradient>
        <linearGradient id={id('sand')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={state.sandTop} />
          <stop offset="100%" stopColor={state.sandBottom} />
        </linearGradient>
        <radialGradient id={id('halo')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={state.auraSoft} stopOpacity="0.88" />
          <stop offset="52%" stopColor={state.aura} stopOpacity="0.34" />
          <stop offset="100%" stopColor={state.aura} stopOpacity="0" />
        </radialGradient>
        <filter id={id('soft')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={id('wide')} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <rect width="400" height="400" fill={`url(#${id('water')})`} />

      <motion.ellipse
        cx={200}
        cy={-18}
        rx={282}
        ry={72}
        fill="#fff8e6"
        filter={`url(#${id('wide')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.34, scale: 1.08 }
            : reduceMotion
              ? { opacity: 0.18, scale: 1 }
              : { opacity: [0.14, 0.24, 0.14], scale: [1, 1.04, 1] }
        }
        transition={isConfirming ? { duration: 0.5, ease: 'easeOut' } : rayTransition}
        style={{ transformOrigin: '200px -18px' }}
      />

      {[118, 222, 318].map((x, index) => (
        <motion.line
          key={x}
          x1={x}
          y1={-40}
          x2={x - 48}
          y2={440}
          stroke="#fff9eb"
          strokeWidth={index === 1 ? 34 : 24}
          strokeLinecap="round"
          opacity={0.14}
          filter={`url(#${id('wide')})`}
          initial={false}
          animate={reduceMotion ? undefined : { x: [0, index === 1 ? 10 : -8, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={rayTransition}
        />
      ))}

      <motion.ellipse
        cx={200}
        cy={232}
        rx={variant === 'idle' ? 112 : 126}
        ry={variant === 'idle' ? 78 : 96}
        fill={`url(#${id('halo')})`}
        filter={`url(#${id('wide')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.68, scale: 1.08 }
            : reduceMotion
              ? { opacity: 0.46, scale: 1 }
              : { opacity: [0.36, 0.58, 0.36], scale: [0.98, 1.04, 0.98] }
        }
        transition={isConfirming ? { duration: 0.5, ease: 'easeOut' } : { ...rayTransition, duration: 6.6 }}
        style={{ transformOrigin: '200px 232px' }}
      />

      <motion.path
        d={seaweedPath(38, -7, 150)}
        fill="none"
        stroke={state.weed}
        strokeWidth="4.6"
        strokeLinecap="round"
        opacity="0.32"
        filter={`url(#${id('soft')})`}
        initial={false}
        animate={reduceMotion ? undefined : { d: [seaweedPath(38, -7, 150), seaweedPath(38, 8, 150), seaweedPath(38, -7, 150)] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 8.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d={seaweedPath(358, 6, 162)}
        fill="none"
        stroke={state.weed}
        strokeWidth="4.8"
        strokeLinecap="round"
        opacity="0.36"
        filter={`url(#${id('soft')})`}
        initial={false}
        animate={reduceMotion ? undefined : { d: [seaweedPath(358, 6, 162), seaweedPath(358, -9, 162), seaweedPath(358, 6, 162)] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 9.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      <path
        d="M-10 312 C58 304 132 309 200 306 C270 302 336 310 410 304 L410 400 L-10 400 Z"
        fill={state.sandBottom}
        opacity="0.38"
        filter={`url(#${id('soft')})`}
      />
      <path
        d="M-10 330 C70 320 142 328 214 323 C286 318 350 326 410 322 L410 400 L-10 400 Z"
        fill={`url(#${id('sand')})`}
      />
      {sandRipples.map((d) => (
        <path key={d} d={d} fill="none" stroke={state.sandBottom} strokeWidth="1.2" strokeLinecap="round" opacity="0.34" />
      ))}
      <ellipse
        cx={200}
        cy={(isIdle ? 315 : 327) + shellDropViewBoxY}
        rx={isIdle ? 78 : 91}
        ry={isIdle ? 9.4 : 12.2}
        fill="#6f604d"
        opacity={isIdle ? 0.26 : 0.22}
        filter={`url(#${id('soft')})`}
      />
      <ellipse
        cx={200}
        cy={(isIdle ? 307 : 319) + shellDropViewBoxY}
        rx={isIdle ? 61 : 69}
        ry={isIdle ? 4.6 : 5.8}
        fill="#4f4133"
        opacity={isIdle ? 0.3 : 0.2}
        filter={`url(#${id('soft')})`}
      />

      {motes.map((mote) => (
        <motion.circle
          key={`${mote.cx}-${mote.cy}`}
          cx={mote.cx}
          cy={mote.cy}
          r={mote.r}
          fill="#fffdf4"
          initial={false}
          animate={reduceMotion ? { opacity: 0.22 } : { y: [0, 42], x: [0, mote.dx], opacity: [0, 0.32, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: mote.dur, delay: mote.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </svg>
  );
}

export default function ShellConcernStage({
  variant = 'idle',
  isConfirming = false,
}: ShellConcernStageProps) {
  const state = shellConcernStates[variant] ?? shellConcernStates.idle;
  const imageY = (variant === 'idle' ? 20 : 10) + shellDropCssY;
  const confirmingImageY = (variant === 'idle' ? 14 : 4) + shellDropCssY;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-full bg-transparent">
      <ShellBackdrop state={state} variant={variant} isConfirming={isConfirming} />

      <motion.div
        key={variant}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[12.5%] select-none"
        initial={false}
        animate={isConfirming ? { y: confirmingImageY, scale: 1.018 } : { y: imageY, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0.94, 0.4, 1] }}
      >
        <Image
          src={state.src}
          alt=""
          fill
          draggable={false}
          loading={variant === 'idle' ? 'eager' : 'lazy'}
          sizes="370px"
          className="select-none object-contain"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-80"
        style={{
          background:
            'conic-gradient(from 140deg, rgba(255,255,255,0.92), rgba(190,218,211,0.72), rgba(244,211,225,0.62), rgba(235,218,178,0.68), rgba(255,255,255,0.92))',
          WebkitMask:
            'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
          mask:
            'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
        }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-full border border-white/55 shadow-[inset_0_0_0_1px_rgba(156,178,168,0.16)]" />
      {isConfirming && <div className="pointer-events-none absolute inset-[1px] rounded-full border border-white/80" />}
    </div>
  );
}
