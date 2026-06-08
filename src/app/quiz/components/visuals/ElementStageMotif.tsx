'use client';

import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { seededNumber } from './deterministicMotion';

interface ElementStageMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

/* ================================================================== */
/*  Q4 SCENES: "What do you lack" (Atmospheric Lightscapes)           */
/* ================================================================== */

function Q4Sleep({ isConfirming }: { isConfirming: boolean }) {
  // Midnight blue velvet with golden dust motes
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q4-velvet">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 -0.2" result="coloredNoise" />
          <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
          <feDiffuseLighting in="texture" surfaceScale="5" diffuseConstant="1.2" lightingColor="#1e3a8a">
            <fePointLight x="200" y="50" z="60" />
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" in2="texture" />
        </filter>
        <filter id="q4-dust-blur"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <rect width="400" height="400" fill="#0f172a" filter="url(#q4-velvet)" />
      
      {/* Drifting golden dust motes */}
      {Array.from({ length: 12 }, (_, i) => ({
        cx: seededNumber(10000 + i, 0, 400),
        cy: seededNumber(10100 + i, 0, 400),
        r: seededNumber(10200 + i, 2, 6),
        driftX: seededNumber(10300 + i, -20, 20),
        duration: seededNumber(10400 + i, 4, 8),
        delay: seededNumber(10500 + i, 0, 2),
      })).map((particle, i) => (
        <motion.circle
          key={i}
          cx={particle.cx}
          cy={particle.cy}
          r={particle.r}
          fill="#fef08a"
          filter="url(#q4-dust-blur)"
          animate={{
            y: isConfirming ? -100 : [0, -50, 0],
            x: isConfirming ? 0 : [0, particle.driftX, 0],
            opacity: isConfirming ? 0 : [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </svg>
  );
}

function Q4Relaxation({ isConfirming }: { isConfirming: boolean }) {
  // Billowing translucent silk fabric
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q4-silk">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.01 0.05; 0.015 0.04; 0.01 0.05" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
          <feSpecularLighting surfaceScale="8" specularConstant="1.2" specularExponent="30" lightingColor="#fdf4ff">
            <fePointLight x="200" y="100" z="100" />
          </feSpecularLighting>
          <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="specOut" />
        </filter>
        <linearGradient id="q4-silk-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#4c1d95" />
      <motion.rect
        width="400" height="400" fill="url(#q4-silk-grad)" filter="url(#q4-silk)"
        opacity="0.85"
        animate={{ scale: isConfirming ? 1.1 : [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q4Time({ isConfirming }: { isConfirming: boolean }) {
  // Slow concentric ripples forming from water droplets
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q4-ripple-blur"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <rect width="400" height="400" fill="#082f49" />
      
      {[1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="200" cy="200" r="0"
          stroke="#bae6fd"
          strokeWidth="4"
          fill="none"
          filter="url(#q4-ripple-blur)"
          animate={{
            r: isConfirming ? 300 : [0, 200],
            opacity: isConfirming ? 0 : [0.8, 0],
            strokeWidth: isConfirming ? 1 : [4, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.3
          }}
        />
      ))}
    </svg>
  );
}

function Q4Energy({ isConfirming }: { isConfirming: boolean }) {
  // Rising thermal current of gold particles
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q4-thermal-blur"><feGaussianBlur stdDeviation="8" /></filter>
        <linearGradient id="q4-thermal-bg" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#1c1917" />
      <motion.rect
        width="400" height="400" fill="url(#q4-thermal-bg)"
        animate={{ opacity: isConfirming ? 0 : [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Flowing particles */}
      {Array.from({ length: 15 }, (_, i) => ({
        d: `M${seededNumber(11000 + i, 150, 250)} 450 Q${seededNumber(11100 + i, 100, 300)} 200, ${seededNumber(11200 + i, 150, 250)} -50`,
        strokeWidth: seededNumber(11300 + i, 5, 20),
        duration: seededNumber(11400 + i, 2, 4),
        delay: seededNumber(11500 + i, 0, 2),
      })).map((path, i) => (
        <motion.path
          key={i}
          d={path.d}
          stroke="#fde047"
          strokeWidth={path.strokeWidth}
          strokeLinecap="round"
          fill="none"
          filter="url(#q4-thermal-blur)"
          animate={{
            pathLength: [0, 1],
            opacity: isConfirming ? 0 : [0, 0.6, 0]
          }}
          transition={{
            duration: path.duration,
            repeat: Infinity,
            ease: "linear",
            delay: path.delay
          }}
        />
      ))}
    </svg>
  );
}

type Q4ResourceId = 'idle' | 'A' | 'B' | 'C' | 'D';

type Q4ResourceState = {
  bg: string;
  glow: string;
  membrane: string;
  edge: string;
  accent: string;
  secondary: string;
  reserveY: number;
};

const q4ResourceStates: Record<Q4ResourceId, Q4ResourceState> = {
  idle: {
    bg: '#f8f6f2',
    glow: '#ebe1d7',
    membrane: '#fffdf9',
    edge: '#e3d8cd',
    accent: '#cdbda9',
    secondary: '#d8e3df',
    reserveY: 220,
  },
  A: {
    bg: '#f5f6fb',
    glow: '#c7d2fe',
    membrane: '#f8fbff',
    edge: '#aab7d6',
    accent: '#7f91b8',
    secondary: '#dbeafe',
    reserveY: 238,
  },
  B: {
    bg: '#fbf4f6',
    glow: '#f5c6cf',
    membrane: '#fff8f8',
    edge: '#d5a3b2',
    accent: '#c8798c',
    secondary: '#ddd6fe',
    reserveY: 218,
  },
  C: {
    bg: '#f3fbfb',
    glow: '#a5f3fc',
    membrane: '#fbffff',
    edge: '#8ac9d3',
    accent: '#5aaebf',
    secondary: '#d8f3ed',
    reserveY: 230,
  },
  D: {
    bg: '#fff9ec',
    glow: '#fde68a',
    membrane: '#fffdf5',
    edge: '#d8b865',
    accent: '#d9a634',
    secondary: '#fef3c7',
    reserveY: 212,
  },
};

const resourceLensPath = 'M98 70 C98 42 120 26 148 26 L252 26 C280 26 302 42 302 70 L302 248 C302 286 274 310 236 310 L164 310 C126 310 98 286 98 248 Z';

function Q4SleepResource({ state, isConfirming }: { state: Q4ResourceState; isConfirming: boolean }) {
  return (
    <>
      {[118, 154, 190].map((y, index) => (
        <motion.path
          key={y}
          d={`M112 ${y} C146 ${y - 6}, 174 ${y + 5}, 204 ${y - 3} S252 ${y + 4}, 288 ${y - 5}`}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.78)'}
          strokeWidth={index === 1 ? 2 : 1.2}
          strokeLinecap="round"
          opacity={index === 1 ? 0.28 : 0.34}
          animate={{ y: isConfirming ? 4 : [0, 5, 0], opacity: isConfirming ? 0.44 : [0.18, 0.36, 0.18] }}
          transition={{ duration: 5.8 + index, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      {[132, 166, 204, 238, 270].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={104 + index * 18}
          r={index % 2 === 0 ? 1.8 : 1.3}
          fill={state.accent}
          opacity="0.3"
          animate={{ y: isConfirming ? 28 : [0, 24, 0], opacity: isConfirming ? 0 : [0.08, 0.36, 0.08] }}
          transition={{ duration: 6.2 + index * 0.35, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}

function Q4RelaxResource({ state, isConfirming }: { state: Q4ResourceState; isConfirming: boolean }) {
  return (
    <>
      {[
        'M98 142 C132 118, 162 164, 198 140 C232 118, 256 160, 302 134',
        'M92 190 C134 164, 164 204, 206 178 C242 156, 266 196, 306 172',
        'M106 224 C142 202, 172 236, 204 216 C240 194, 268 226, 296 206',
      ].map((d, index) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.82)'}
          strokeWidth={index === 1 ? 5 : 3.2}
          strokeLinecap="round"
          opacity={index === 1 ? 0.24 : 0.28}
          animate={{ x: isConfirming ? 10 : [-8, 8, -8], pathLength: isConfirming ? 1 : [0.55, 1, 0.55] }}
          transition={{ duration: 7 + index * 0.8, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.ellipse
        cx="200"
        cy="174"
        rx="66"
        ry="36"
        fill="none"
        stroke={state.secondary}
        strokeWidth="1.1"
        opacity="0.42"
        animate={{ rx: isConfirming ? 82 : [60, 72, 60], opacity: isConfirming ? 0.52 : [0.24, 0.46, 0.24] }}
        transition={{ duration: 6.5, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function Q4TimeResource({ state, isConfirming }: { state: Q4ResourceState; isConfirming: boolean }) {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <motion.circle
          key={index}
          cx="200"
          cy="168"
          r={38 + index * 28}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.76)'}
          strokeWidth={index === 1 ? 1.6 : 1}
          opacity={0.22 + index * 0.08}
          animate={{
            r: isConfirming ? 56 + index * 32 : [34 + index * 26, 46 + index * 30, 34 + index * 26],
            opacity: isConfirming ? 0.42 : [0.12, 0.36, 0.12],
          }}
          transition={{ duration: 5.8 + index * 0.9, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, index) => {
        const rad = (angle * Math.PI) / 180;
        const x = 200 + Math.cos(rad) * 86;
        const y = 168 + Math.sin(rad) * 56;
        return (
          <motion.circle
            key={angle}
            cx={x}
            cy={y}
            r="1.4"
            fill={state.accent}
            opacity="0.28"
            animate={{ opacity: isConfirming ? 0.5 : [0.12, 0.36, 0.12] }}
            transition={{ duration: 4.2, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut', delay: index * 0.08 }}
          />
        );
      })}
    </>
  );
}

function Q4EnergyResource({ state, isConfirming }: { state: Q4ResourceState; isConfirming: boolean }) {
  return (
    <>
      {[136, 166, 198, 230, 262].map((x, index) => (
        <motion.path
          key={x}
          d={`M${x} 278 C${x - 10} 236, ${x + 15} 202, ${x - 4} 142 C${x - 16} 104, ${x + 12} 78, ${x + 2} 48`}
          fill="none"
          stroke={index === 2 ? state.accent : 'rgba(255,255,255,0.78)'}
          strokeWidth={index === 2 ? 4 : 2.3}
          strokeLinecap="round"
          opacity="0.28"
          animate={{ pathLength: isConfirming ? 1 : [0.18, 0.88, 0.18], opacity: isConfirming ? 0.48 : [0.08, 0.42, 0.08] }}
          transition={{ duration: 4.6 + index * 0.28, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.circle
        cx="200"
        cy="220"
        r="44"
        fill={state.glow}
        opacity="0.22"
        animate={{ r: isConfirming ? 76 : [38, 52, 38], opacity: isConfirming ? 0.42 : [0.16, 0.32, 0.16] }}
        transition={{ duration: 5.2, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function Q4IdleResource({ state }: { state: Q4ResourceState }) {
  return (
    <>
      {[126, 176, 226].map((y, index) => (
        <motion.path
          key={y}
          d={`M112 ${y} C148 ${y - 10}, 174 ${y + 9}, 204 ${y - 4} S252 ${y + 7}, 288 ${y - 6}`}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.78)'}
          strokeWidth={index === 1 ? 1.7 : 1.1}
          strokeLinecap="round"
          opacity="0.26"
          animate={{ x: [-5, 6, -5], opacity: [0.14, 0.32, 0.14] }}
          transition={{ duration: 6.2 + index * 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.circle
        cx="200"
        cy="170"
        r="72"
        fill="none"
        stroke={state.secondary}
        strokeWidth="1"
        opacity="0.22"
        animate={{ r: [62, 78, 62], opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function Q4ResourceInner({
  optionId,
  state,
  isConfirming,
}: {
  optionId: Q4ResourceId;
  state: Q4ResourceState;
  isConfirming: boolean;
}) {
  if (optionId === 'A') return <Q4SleepResource state={state} isConfirming={isConfirming} />;
  if (optionId === 'B') return <Q4RelaxResource state={state} isConfirming={isConfirming} />;
  if (optionId === 'C') return <Q4TimeResource state={state} isConfirming={isConfirming} />;
  if (optionId === 'D') return <Q4EnergyResource state={state} isConfirming={isConfirming} />;
  return <Q4IdleResource state={state} />;
}

function Q4ResourceMeter({
  previewId,
  isConfirming,
}: {
  previewId: string | null;
  isConfirming: boolean;
}) {
  const optionId: Q4ResourceId =
    previewId === 'A' || previewId === 'B' || previewId === 'C' || previewId === 'D' ? previewId : 'idle';
  const state = q4ResourceStates[optionId];
  const reservePath = `M98 ${state.reserveY} C132 ${state.reserveY - 12}, 166 ${state.reserveY + 10}, 202 ${state.reserveY - 4} C238 ${state.reserveY - 18}, 270 ${state.reserveY + 8}, 302 ${state.reserveY - 10} L302 310 L98 310 Z`;

  return (
    <div className="absolute inset-0 h-full w-full">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="q4-resource-bg" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="52%" stopColor={state.glow} stopOpacity="0.22" />
            <stop offset="100%" stopColor={state.bg} stopOpacity="0.9" />
          </radialGradient>
          <linearGradient id="q4-resource-reserve" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.68" />
            <stop offset="52%" stopColor={state.secondary} stopOpacity="0.54" />
            <stop offset="100%" stopColor={state.glow} stopOpacity="0.44" />
          </linearGradient>
          <filter id="q4-resource-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="q4-resource-soft">
            <feGaussianBlur stdDeviation="0.45" />
          </filter>
          <clipPath id="q4-resource-clip">
            <path d={resourceLensPath} />
          </clipPath>
        </defs>

        <motion.rect
          width="400"
          height="400"
          fill={state.bg}
          initial={false}
          animate={{ fill: state.bg }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />

        <motion.circle
          cx="200"
          cy="170"
          r="160"
          fill={state.glow}
          opacity="0.2"
          filter="url(#q4-resource-blur)"
          initial={false}
          animate={{ fill: state.glow, scale: isConfirming ? 1.15 : [0.96, 1.05, 0.96], opacity: isConfirming ? 0.36 : [0.14, 0.26, 0.14] }}
          transition={{ duration: isConfirming ? 0.5 : 7.2, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '200px 170px' }}
        />

        <motion.path
          d={resourceLensPath}
          fill={state.membrane}
          fillOpacity="0.54"
          stroke={state.edge}
          strokeWidth="1.6"
          filter="url(#q4-resource-soft)"
          initial={false}
          animate={{ fill: state.membrane, stroke: state.edge, scale: isConfirming ? 1.02 : [0.99, 1.012, 0.99] }}
          transition={{ duration: isConfirming ? 0.5 : 6.5, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '200px 170px' }}
        />

        <path
          d="M116 78 C122 54 140 46 164 46 L248 46 C270 46 284 58 288 80"
          fill="none"
          stroke="rgba(255,255,255,0.82)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />

        <g clipPath="url(#q4-resource-clip)">
          <path d={resourceLensPath} fill="url(#q4-resource-bg)" opacity="0.56" />

          <motion.path
            key={`reserve-${optionId}`}
            d={reservePath}
            fill="url(#q4-resource-reserve)"
            opacity="0.48"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 0.48 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          />

          <AnimatePresence mode="wait">
            <motion.g
              key={optionId}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.015 }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
              style={{ transformOrigin: '200px 170px' }}
            >
              <Q4ResourceInner optionId={optionId} state={state} isConfirming={isConfirming} />
            </motion.g>
          </AnimatePresence>

          <motion.rect
            x="-40"
            y="42"
            width="86"
            height="246"
            rx="43"
            fill="rgba(255,255,255,0.48)"
            opacity="0.12"
            animate={{ x: [-40, 350], opacity: [0, 0.2, 0] }}
            transition={{ duration: 8.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>

        <motion.path
          d={resourceLensPath}
          fill="none"
          stroke={state.edge}
          strokeWidth="2"
          opacity="0.58"
          initial={false}
          animate={{ stroke: state.edge, opacity: isConfirming ? 0.84 : 0.58 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        <path
          d="M111 250 C136 282 166 294 200 294 C234 294 264 282 289 250"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ================================================================== */
/*  Q6 SCENES: "Pace of life" (Skin Rhythm Field)                     */
/* ================================================================== */

type Q6RhythmId = 'idle' | 'A' | 'B' | 'C' | 'D';

type Q6RhythmState = {
  id: Q6RhythmId;
  base: string;
  wash: string;
  washSoft: string;
  accent: string;
  secondary: string;
  line: string;
};

const q6RhythmStates: Record<Q6RhythmId, Q6RhythmState> = {
  idle: {
    id: 'idle',
    base: '#fbf8f3',
    wash: '#dbeafe',
    washSoft: '#fce7f3',
    accent: '#c7d2fe',
    secondary: '#ccfbf1',
    line: 'rgba(120, 113, 108, 0.22)',
  },
  A: {
    id: 'A',
    base: '#fff7ed',
    wash: '#fed7aa',
    washSoft: '#fecdd3',
    accent: '#f59e0b',
    secondary: '#fb7185',
    line: 'rgba(180, 83, 9, 0.34)',
  },
  B: {
    id: 'B',
    base: '#f7f7ff',
    wash: '#bfdbfe',
    washSoft: '#ddd6fe',
    accent: '#7dd3fc',
    secondary: '#a78bfa',
    line: 'rgba(79, 70, 229, 0.28)',
  },
  C: {
    id: 'C',
    base: '#fafaf7',
    wash: '#dbeafe',
    washSoft: '#fde68a',
    accent: '#93c5fd',
    secondary: '#d6d3d1',
    line: 'rgba(87, 83, 78, 0.22)',
  },
  D: {
    id: 'D',
    base: '#f4fffb',
    wash: '#a7f3d0',
    washSoft: '#fef3c7',
    accent: '#14b8a6',
    secondary: '#fbbf24',
    line: 'rgba(20, 113, 94, 0.27)',
  },
};

const q6SoftFilterId = (id: Q6RhythmId) => `q6-rhythm-soft-${id}`;
const q6FieldId = (id: Q6RhythmId) => `q6-rhythm-field-${id}`;
const q6VeilId = (id: Q6RhythmId) => `q6-rhythm-veil-${id}`;
const q6SheenId = (id: Q6RhythmId) => `q6-rhythm-sheen-${id}`;

function Q6RhythmStage({
  state,
  isConfirming,
  children,
}: {
  state: Q6RhythmState;
  isConfirming: boolean;
  children?: ReactNode;
}) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={q6FieldId(state.id)} cx="50%" cy="46%" r="64%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="38%" stopColor={state.wash} stopOpacity="0.62" />
          <stop offset="74%" stopColor={state.washSoft} stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={q6VeilId(state.id)} cx="52%" cy="62%" r="58%">
          <stop offset="0%" stopColor={state.secondary} stopOpacity="0.5" />
          <stop offset="62%" stopColor={state.wash} stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={q6SheenId(state.id)} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={q6SoftFilterId(state.id)} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <rect width="400" height="400" fill={state.base} />

      <motion.circle
        cx="200"
        cy="194"
        r="152"
        fill={`url(#${q6FieldId(state.id)})`}
        filter={`url(#${q6SoftFilterId(state.id)})`}
        animate={{
          scale: isConfirming ? 1.08 : [1, 1.035, 1],
          opacity: isConfirming ? 0.92 : [0.76, 0.92, 0.76],
        }}
        transition={{ duration: 7, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="210"
        cy="224"
        r="122"
        fill={`url(#${q6VeilId(state.id)})`}
        filter={`url(#${q6SoftFilterId(state.id)})`}
        animate={{
          x: isConfirming ? 0 : [-6, 8, -6],
          y: isConfirming ? -4 : [5, -5, 5],
          opacity: isConfirming ? 0.68 : [0.38, 0.58, 0.38],
        }}
        transition={{ duration: 9.5, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />

      <motion.g
        opacity="0.5"
        animate={{ y: isConfirming ? -2 : [0, 4, 0] }}
        transition={{ duration: 6.5, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M42 246 C96 228 130 239 179 220 C232 199 275 210 342 184"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M50 282 C104 266 148 277 192 258 C234 241 278 244 344 222"
          fill="none"
          stroke={state.line}
          strokeWidth="1"
          strokeLinecap="round"
        />
      </motion.g>

      {children}

      <motion.g
        style={{ transformOrigin: '200px 200px' }}
        animate={{ x: isConfirming ? 220 : [-190, 240] }}
        transition={{ duration: 8.5, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        opacity="0.36"
      >
        <rect
          x="8"
          y="-20"
          width="42"
          height="455"
          rx="22"
          fill={`url(#${q6SheenId(state.id)})`}
          transform="rotate(17 29 200)"
        />
      </motion.g>

      <motion.circle
        cx="200"
        cy="200"
        r="158"
        fill="none"
        stroke="rgba(255,255,255,0.62)"
        strokeWidth="1"
        animate={{ opacity: isConfirming ? 0.72 : [0.42, 0.66, 0.42] }}
        transition={{ duration: 6.5, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

function Q6Idle({ isConfirming }: { isConfirming: boolean }) {
  const state = q6RhythmStates.idle;
  return (
    <Q6RhythmStage state={state} isConfirming={isConfirming}>
      {[150, 188, 226].map((y, index) => (
        <motion.path
          key={y}
          d={`M72 ${y} C126 ${y - 14}, 166 ${y + 10}, 210 ${y - 2} S286 ${y + 8}, 330 ${y - 10}`}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.56)'}
          strokeWidth={index === 1 ? 2 : 1.2}
          strokeLinecap="round"
          opacity={index === 1 ? 0.34 : 0.32}
          animate={{ y: [0, index === 1 ? 4 : 2, 0], opacity: [0.2, 0.42, 0.2] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </Q6RhythmStage>
  );
}

function Q6HighSpeed({ isConfirming }: { isConfirming: boolean }) {
  const state = q6RhythmStates.A;
  const orbitals = [
    { rx: 128, ry: 38, rotate: -18, duration: 2.6, planetX: 328, planetY: 196, radius: 7, fill: state.secondary },
    { rx: 96, ry: 30, rotate: 24, duration: 1.9, planetX: 292, planetY: 194, radius: 5, fill: state.accent },
    { rx: 62, ry: 20, rotate: -42, duration: 1.35, planetX: 262, planetY: 196, radius: 4, fill: '#ffffff' },
  ];

  return (
    <Q6RhythmStage state={state} isConfirming={isConfirming}>
      <motion.circle
        cx="200"
        cy="196"
        r="34"
        fill="#fff7ed"
        filter={`url(#${q6SoftFilterId(state.id)})`}
        animate={{ scale: isConfirming ? 1.1 : [1, 1.08, 1], opacity: [0.78, 1, 0.78] }}
        transition={{ duration: 2.4, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
      <circle cx="200" cy="196" r="18" fill={state.accent} opacity="0.42" />

      {orbitals.map((orbit, index) => (
        <g key={`${orbit.rx}-${orbit.rotate}`} transform={`rotate(${orbit.rotate} 200 196)`}>
          <ellipse
            cx="200"
            cy="196"
            rx={orbit.rx}
            ry={orbit.ry}
            fill="none"
            stroke={index === 0 ? 'rgba(255,255,255,0.62)' : state.line}
            strokeWidth={index === 0 ? 1.2 : 1}
            strokeDasharray={index === 2 ? '5 10' : undefined}
          />
          <motion.g
            style={{ transformOrigin: '200px 196px' }}
            animate={{ rotate: isConfirming ? 280 : [0, 360] }}
            transition={{ duration: orbit.duration, repeat: isConfirming ? 0 : Infinity, ease: 'linear' }}
          >
            <circle
              cx={orbit.planetX}
              cy={orbit.planetY}
              r={orbit.radius}
              fill={orbit.fill}
              filter={`url(#${q6SoftFilterId(state.id)})`}
              opacity="0.78"
            />
            <circle cx={orbit.planetX} cy={orbit.planetY} r={Math.max(2.5, orbit.radius - 2)} fill="rgba(255,255,255,0.72)" />
          </motion.g>
        </g>
      ))}

      {[0, 1, 2, 3].map((index) => (
        <motion.path
          key={index}
          d={`M${72 + index * 9} ${256 - index * 28} C${126 + index * 14} ${230 - index * 16}, ${164 + index * 18} ${222 - index * 26}, ${324 - index * 22} ${170 - index * 10}`}
          fill="none"
          stroke={index % 2 === 0 ? state.secondary : '#ffffff'}
          strokeWidth={index === 0 ? 3 : 1.4}
          strokeLinecap="round"
          filter={`url(#${q6SoftFilterId(state.id)})`}
          animate={{
            pathLength: isConfirming ? 0.9 : [0.08, 0.72, 0.08],
            opacity: isConfirming ? 0.25 : [0, 0.42, 0],
          }}
          transition={{ duration: 1.35 + index * 0.22, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut', delay: index * 0.16 }}
        />
      ))}
    </Q6RhythmStage>
  );
}

function Q6Irregular({ isConfirming }: { isConfirming: boolean }) {
  const state = q6RhythmStates.B;
  const waves = [
    { y: 220, amp: 16, color: '#93c5fd', duration: 4.8, opacity: 0.46 },
    { y: 246, amp: -22, color: '#c4b5fd', duration: 3.9, opacity: 0.4 },
    { y: 276, amp: 12, color: '#ffffff', duration: 5.6, opacity: 0.34 },
  ];

  return (
    <Q6RhythmStage state={state} isConfirming={isConfirming}>
      <motion.path
        d="M0 246 C46 212 84 254 128 228 C170 202 214 256 258 222 C302 190 338 250 400 218 L400 400 L0 400 Z"
        fill="#bfdbfe"
        opacity="0.34"
        animate={{ y: isConfirming ? 0 : [0, -12, 8, 0] }}
        transition={{ duration: 5.4, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0 288 C54 268 86 294 132 278 C178 262 208 292 254 272 C304 250 340 284 400 260 L400 400 L0 400 Z"
        fill="#ddd6fe"
        opacity="0.26"
        animate={{ y: isConfirming ? 0 : [10, -8, 12, 10], x: isConfirming ? 0 : [0, -18, 12, 0] }}
        transition={{ duration: 4.2, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />

      {waves.map((wave, index) => (
        <motion.path
          key={wave.y}
          d={`M38 ${wave.y} C86 ${wave.y + wave.amp}, 126 ${wave.y - wave.amp}, 172 ${wave.y + wave.amp * 0.6} S262 ${wave.y - wave.amp * 0.8}, 342 ${wave.y + wave.amp * 0.5}`}
          fill="none"
          stroke={wave.color}
          strokeWidth={index === 0 ? 3 : 1.7}
          strokeLinecap="round"
          filter={`url(#${q6SoftFilterId(state.id)})`}
          animate={{
            x: isConfirming ? 0 : [0, index % 2 === 0 ? 28 : -18, 0],
            y: isConfirming ? 0 : [0, index === 1 ? -15 : 10, 0],
            opacity: isConfirming ? wave.opacity : [wave.opacity * 0.55, wave.opacity, wave.opacity * 0.55],
          }}
          transition={{ duration: wave.duration, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut', delay: index * 0.32 }}
        />
      ))}

      {[112, 186, 274].map((cx, index) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={index === 1 ? 238 : 258}
          r={index === 1 ? 4.5 : 3.5}
          fill="rgba(255,255,255,0.74)"
          animate={{
            y: isConfirming ? 0 : [0, index === 0 ? -24 : 18, index === 2 ? -14 : 8, 0],
            opacity: [0.18, 0.58, 0.25, 0.18],
          }}
          transition={{ duration: 4.6 + index * 0.7, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut', delay: index * 0.35 }}
        />
      ))}
    </Q6RhythmStage>
  );
}

function Q6Steady({ isConfirming }: { isConfirming: boolean }) {
  const state = q6RhythmStates.C;
  return (
    <Q6RhythmStage state={state} isConfirming={isConfirming}>
      <path
        d="M0 244 C64 230 114 248 184 236 C256 224 314 242 400 228 L400 400 L0 400 Z"
        fill="#dbeafe"
        opacity="0.3"
      />
      <path
        d="M0 286 C72 276 134 286 202 278 C274 268 330 280 400 270 L400 400 L0 400 Z"
        fill="#e7e5e4"
        opacity="0.24"
      />
      {[222, 252, 282].map((y, index) => (
        <motion.path
          key={y}
          d={`M52 ${y} C110 ${y + 4}, 148 ${y - 4}, 204 ${y + 2} S292 ${y - 3}, 348 ${y + 3}`}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.66)'}
          strokeWidth={index === 1 ? 2 : 1.2}
          strokeLinecap="round"
          animate={{ y: isConfirming ? 0 : [0, index === 1 ? 2 : 1, 0], opacity: [0.28, 0.46, 0.28] }}
          transition={{ duration: 7.5 + index, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.g
        animate={{ y: isConfirming ? 0 : [0, -3, 2, 0], rotate: isConfirming ? 0 : [0, -1.5, 1, 0] }}
        transition={{ duration: 6.6, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 214px' }}
      >
        <line x1="200" y1="168" x2="200" y2="244" stroke="rgba(120,113,108,0.32)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M184 186 L200 156 L216 186 Z" fill="#fef3c7" stroke="rgba(255,255,255,0.78)" strokeWidth="1" />
        <path d="M184 186 C192 196 208 196 216 186 L210 228 C205 235 195 235 190 228 Z" fill="#93c5fd" opacity="0.58" />
        <circle cx="200" cy="186" r="5" fill="#ffffff" opacity="0.82" />
      </motion.g>
      <motion.path
        d="M104 128 C138 108 168 118 200 104 C234 90 268 108 304 92"
        fill="none"
        stroke="rgba(255,255,255,0.54)"
        strokeWidth="1.2"
        strokeLinecap="round"
        animate={{ opacity: [0.18, 0.38, 0.18] }}
        transition={{ duration: 8, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </Q6RhythmStage>
  );
}

function Q6Disciplined({ isConfirming }: { isConfirming: boolean }) {
  const state = q6RhythmStates.D;
  const steps = [
    { x: 96, y: 262, w: 74 },
    { x: 128, y: 230, w: 74 },
    { x: 160, y: 198, w: 74 },
    { x: 192, y: 166, w: 74 },
    { x: 224, y: 134, w: 74 },
  ];

  return (
    <Q6RhythmStage state={state} isConfirming={isConfirming}>
      <motion.path
        d="M90 282 C140 236 176 208 210 174 C246 138 280 120 326 94"
        fill="none"
        stroke={state.secondary}
        strokeWidth="5"
        strokeLinecap="round"
        filter={`url(#${q6SoftFilterId(state.id)})`}
        animate={{ pathLength: isConfirming ? 1 : [0.18, 0.88, 0.18], opacity: [0.16, 0.52, 0.16] }}
        transition={{ duration: 4.8, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
      {steps.map((step, index) => (
        <motion.g
          key={`${step.x}-${step.y}`}
          animate={{ y: isConfirming ? 0 : [0, -2, 0], opacity: isConfirming ? 0.78 : [0.5, 0.84, 0.5] }}
          transition={{ duration: 4.8, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut', delay: index * 0.22 }}
        >
          <path
            d={`M${step.x} ${step.y} L${step.x + step.w} ${step.y - 20} L${step.x + step.w + 24} ${step.y - 8} L${step.x + 24} ${step.y + 14} Z`}
            fill={index % 2 === 0 ? 'rgba(255,255,255,0.48)' : 'rgba(167,243,208,0.24)'}
            stroke="rgba(255,255,255,0.72)"
            strokeWidth="1"
          />
          <path
            d={`M${step.x + 24} ${step.y + 14} L${step.x + step.w + 24} ${step.y - 8} L${step.x + step.w + 24} ${step.y + 8} L${step.x + 24} ${step.y + 30} Z`}
            fill="rgba(20,184,166,0.08)"
          />
        </motion.g>
      ))}
      <motion.g
        style={{ transformOrigin: '200px 200px' }}
        animate={{
          x: isConfirming ? 20 : [-78, -42, -6, 30, 66, 92],
          y: isConfirming ? -24 : [62, 30, -2, -34, -66, -88],
          opacity: isConfirming ? 0.86 : [0, 0.8, 0.88, 0.8, 0.72, 0],
        }}
        transition={{ duration: 4.2, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      >
        <circle cx="200" cy="206" r="5.8" fill="#ffffff" />
        <path d="M200 213 L200 231" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        <path d="M200 222 L188 234" stroke="rgba(255,255,255,0.86)" strokeWidth="3" strokeLinecap="round" />
        <path d="M200 222 L214 232" stroke="rgba(255,255,255,0.86)" strokeWidth="3" strokeLinecap="round" />
        <path d="M200 231 L190 250" stroke="rgba(20,184,166,0.72)" strokeWidth="3" strokeLinecap="round" />
        <path d="M200 231 L214 248" stroke="rgba(20,184,166,0.72)" strokeWidth="3" strokeLinecap="round" />
      </motion.g>
      {[0, 1, 2].map((index) => (
        <motion.circle
          key={index}
          cx={118 + index * 68}
          cy={282 - index * 48}
          r={3 + index}
          fill={index === 2 ? state.secondary : state.accent}
          filter={`url(#${q6SoftFilterId(state.id)})`}
          animate={{ opacity: [0.12, 0.62, 0.12], scale: [0.8, 1.25, 0.8] }}
          transition={{ duration: 3.4, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut', delay: index * 0.6 }}
        />
      ))}
    </Q6RhythmStage>
  );
}


export default function ElementStageMotif({
  questionId,
  previewId,
  isConfirming = false,
}: ElementStageMotifProps) {
  if (questionId === 'q4') {
    return <Q4ResourceMeter previewId={previewId} isConfirming={isConfirming} />;
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        {previewId && (
          <motion.div
            key={previewId}
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {questionId === 'q4' && previewId === 'A' && <Q4Sleep isConfirming={isConfirming} />}
            {questionId === 'q4' && previewId === 'B' && <Q4Relaxation isConfirming={isConfirming} />}
            {questionId === 'q4' && previewId === 'C' && <Q4Time isConfirming={isConfirming} />}
            {questionId === 'q4' && previewId === 'D' && <Q4Energy isConfirming={isConfirming} />}

            {questionId === 'q6' && previewId === 'A' && <Q6HighSpeed isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'B' && <Q6Irregular isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'C' && <Q6Steady isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'D' && <Q6Disciplined isConfirming={isConfirming} />}
          </motion.div>
        )}
      </AnimatePresence>

      {!previewId && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {questionId === 'q6' ? (
            <Q6Idle isConfirming={isConfirming} />
          ) : (
            /* Neutral idle texture */
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
              <defs>
                <filter id="element-idle">
                  <feTurbulence type="fractalNoise" baseFrequency="0.02" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                  <feGaussianBlur stdDeviation="15" />
                </filter>
              </defs>
              <rect width="400" height="400" fill="#f8fafc" />
              <motion.circle
                cx="200" cy="200" r="100" fill="#cbd5e1" filter="url(#element-idle)"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          )}
        </motion.div>
      )}
    </div>
  );
}
