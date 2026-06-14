'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  type Easing,
  type AnimationPlaybackControls,
} from 'framer-motion';
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
/*  Q6 SCENES: "Pace of life" — The Metronome                         */
/*                                                                     */
/*  One shared luminous chamber: a softly glowing metronome on a       */
/*  light stage. Each answer changes only the *swing personality* —   */
/*  tempo, amplitude, regularity, weight — plus a pastel palette:     */
/*                                                                     */
/*    A 長期高速運轉 — frantic fast swing, blurs into a fan  (coral)   */
/*    B 不規律漂浮   — uneven amplitude, drifting off-axis  (lavender)*/
/*    C 平穩但疲倦   — slow heavy swing, drooping & dimming  (sand)    */
/*    D 努力自律中   — perfect even beat, crisp light pulse  (mint)    */
/*                                                                     */
/*  On confirm, the arm settles upright and a line of light blooms.   */
/* ================================================================== */

// Metronome geometry: small base at the bottom, pivot clearly visible at the
// very bottom of the needle. The long arm swings upward from that fixed point.
const Q6_PIVOT_X = 200;
const Q6_PIVOT_Y = 340;
const Q6_ARM_LEN = 262;
const Q6_BOB_REST_Y = Q6_PIVOT_Y - Q6_ARM_LEN; // 78 — arm tip near the top
const Q6_WEIGHT_Y = 170; // sliding weight on upper portion of the arm

// Metronome case: classic truncated pyramid standing on a wide plinth.
// The needle swings in front of the case face; at wide angles its tip
// sweeps past the slanted edges, just like a real metronome.
const Q6_CASE_TOP_Y = 68;
const Q6_CASE_BOT_Y = 358;
const Q6_CASE_TOP_HW = 16;
const Q6_CASE_BOT_HW = 48;
const Q6_CASE_PATH = `M${Q6_PIVOT_X - Q6_CASE_BOT_HW} ${Q6_CASE_BOT_Y} L${Q6_PIVOT_X - Q6_CASE_TOP_HW} ${Q6_CASE_TOP_Y} L${Q6_PIVOT_X + Q6_CASE_TOP_HW} ${Q6_CASE_TOP_Y} L${Q6_PIVOT_X + Q6_CASE_BOT_HW} ${Q6_CASE_BOT_Y} Z`;
const Q6_PLINTH_PATH = `M${Q6_PIVOT_X - 54} 374 L${Q6_PIVOT_X - 46} 356 L${Q6_PIVOT_X + 46} 356 L${Q6_PIVOT_X + 54} 374 Z`;
const Q6_CAP_PATH = `M${Q6_PIVOT_X - 18} ${Q6_CASE_TOP_Y} L${Q6_PIVOT_X - 14} 56 L${Q6_PIVOT_X + 14} 56 L${Q6_PIVOT_X + 18} ${Q6_CASE_TOP_Y} Z`;

// Tapered tempo-scale slot on the front face, with graduation marks
const Q6_SLOT_TOP_Y = 96;
const Q6_SLOT_BOT_Y = 326;
const Q6_SLOT_TOP_HW = 6.5;
const Q6_SLOT_BOT_HW = 13;
const Q6_SLOT_PATH = `M${Q6_PIVOT_X - Q6_SLOT_BOT_HW} ${Q6_SLOT_BOT_Y} L${Q6_PIVOT_X - Q6_SLOT_TOP_HW} ${Q6_SLOT_TOP_Y} L${Q6_PIVOT_X + Q6_SLOT_TOP_HW} ${Q6_SLOT_TOP_Y} L${Q6_PIVOT_X + Q6_SLOT_BOT_HW} ${Q6_SLOT_BOT_Y} Z`;
const Q6_SCALE_TICKS = [118, 152, 186, 220, 254, 288, 314].map((y) => {
  const t = (y - Q6_SLOT_TOP_Y) / (Q6_SLOT_BOT_Y - Q6_SLOT_TOP_Y);
  const hw = Q6_SLOT_TOP_HW + t * (Q6_SLOT_BOT_HW - Q6_SLOT_TOP_HW) + 4;
  return { y, hw: +hw.toFixed(1) };
});

type MetroTheme = {
  id: string;
  bgTop: string;
  bgMid: string;
  bgLow: string;
  floor: string;
  body: string;
  bodyDark: string;
  arm: string;
  bob: string;
  glow: string;
  note: string;
};

type MetroConfig = {
  theme: MetroTheme;
  /* Steady-state swing loop (ignored while `accel` is playing) */
  swing: { values: number[]; times?: number[]; dur: number; ease?: Easing };
  /* A only: one-shot accelerating sequence, then hand over to a fast loop */
  accel?: { values: number[]; times: number[]; dur: number; fastValues: number[]; fastDur: number };
  beatDur: number;
  arcAngle: number;
  noteDur: number;
  /* A only: static ghost arms (speed blur) that fade in as tempo builds */
  fanGhosts?: { angle: number; opacity: number }[];
  fanDelay?: number;
  arcDelay?: number;
  /* D only: crisp tick flash at each swing extreme */
  tickFlash?: boolean;
  bobDim?: boolean;
};

/* Tapered needle from the low pivot up to the tip */
const Q6_ARM_PATH = `M${Q6_PIVOT_X - 2.8} ${Q6_PIVOT_Y} L${Q6_PIVOT_X - 1.3} ${Q6_BOB_REST_Y} L${Q6_PIVOT_X + 1.3} ${Q6_BOB_REST_Y} L${Q6_PIVOT_X + 2.8} ${Q6_PIVOT_Y} Z`;

/* Arc path traced by the bob between the two swing extremes */
function swingArcPath(angleDeg: number): string {
  const r = Q6_ARM_LEN;
  const a = (angleDeg * Math.PI) / 180;
  const x1 = Q6_PIVOT_X - r * Math.sin(a);
  const y1 = Q6_PIVOT_Y - r * Math.cos(a);
  const x2 = Q6_PIVOT_X + r * Math.sin(a);
  const y2 = Q6_PIVOT_Y - r * Math.cos(a);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function BeatRing({
  color, dur, delay, maxR, isConfirming,
}: { color: string; dur: number; delay: number; maxR: number; isConfirming: boolean }) {
  return (
    <motion.circle
      cx={Q6_PIVOT_X}
      cy={Q6_BOB_REST_Y}
      r="5"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      initial={false}
      animate={isConfirming ? { opacity: 0 } : { r: [5, maxR], opacity: [0.5, 0] }}
      transition={{ duration: dur, delay, repeat: isConfirming ? 0 : Infinity, ease: 'easeOut' }}
    />
  );
}

function MetronomeScene({ config, isConfirming }: { config: MetroConfig; isConfirming: boolean }) {
  const { theme, swing, accel, beatDur, arcAngle, noteDur, fanGhosts, fanDelay, arcDelay, tickFlash, bobDim } = config;
  const uid = theme.id;

  // Framer's CSS rotate on SVG spins the element about its own bbox centre
  // (the middle of the needle), not the pivot. The arm angle is therefore
  // driven manually through the native SVG attribute rotate(angle px py),
  // which is guaranteed to rotate about the low pivot point.
  const armAngle = useMotionValue(accel ? accel.values[0] : swing.values[0]);
  const armRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const apply = (a: number) => {
      armRef.current?.setAttribute('transform', `rotate(${a.toFixed(2)} ${Q6_PIVOT_X} ${Q6_PIVOT_Y})`);
    };
    apply(armAngle.get());
    return armAngle.on('change', apply);
  }, [armAngle]);

  useEffect(() => {
    if (isConfirming) {
      const settle = animate(armAngle, 0, { duration: 0.55, ease: [0.32, 0.72, 0, 1] });
      return () => settle.stop();
    }
    if (accel) {
      // One-shot accelerating ramp, then hand over to the fast infinite loop
      let cancelled = false;
      let fast: AnimationPlaybackControls | undefined;
      const ramp = animate(armAngle, accel.values, { duration: accel.dur, times: accel.times, ease: 'easeInOut' });
      ramp.then(() => {
        if (cancelled) return;
        fast = animate(armAngle, accel.fastValues, { duration: accel.fastDur, repeat: Infinity, ease: 'easeInOut' });
      });
      return () => {
        cancelled = true;
        ramp.stop();
        fast?.stop();
      };
    }
    const loop = animate(armAngle, swing.values, {
      duration: swing.dur,
      times: swing.times,
      repeat: Infinity,
      ease: swing.ease ?? 'easeInOut',
    });
    return () => loop.stop();
    // config is recreated by the parent each render but constant per scene;
    // depending on its identity would restart the swing on unrelated renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirming, armAngle]);

  // D only: tip positions at the two swing extremes, for the tick flashes
  const tickRad = (arcAngle * Math.PI) / 180;
  const tickXL = +(Q6_PIVOT_X - Q6_ARM_LEN * Math.sin(tickRad)).toFixed(1);
  const tickXR = +(Q6_PIVOT_X + Q6_ARM_LEN * Math.sin(tickRad)).toFixed(1);
  const tickY = +(Q6_PIVOT_Y - Q6_ARM_LEN * Math.cos(tickRad)).toFixed(1);

  // Floating notes rise alongside the case, never behind it
  const notes = [
    { x: 124, delay: 0, dur: noteDur, drift: -12 },
    { x: 278, delay: noteDur * 0.4, dur: noteDur * 1.1, drift: 12 },
    { x: 106, delay: noteDur * 0.75, dur: noteDur * 0.9, drift: -8 },
    { x: 294, delay: noteDur * 1.2, dur: noteDur * 1.05, drift: 8 },
  ];

  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`q6m-sky-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.bgTop} />
          <stop offset="52%" stopColor={theme.bgMid} />
          <stop offset="100%" stopColor={theme.bgLow} />
        </linearGradient>
        <radialGradient id={`q6m-floor-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={theme.floor} stopOpacity="0.7" />
          <stop offset="70%" stopColor={theme.floor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={theme.floor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`q6m-body-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.body} />
          <stop offset="100%" stopColor={theme.bodyDark} />
        </linearGradient>
        <radialGradient id={`q6m-bob-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor={theme.bob} stopOpacity="0.9" />
          <stop offset="100%" stopColor={theme.bob} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`q6m-arc-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={theme.glow} stopOpacity="0" />
          <stop offset="50%" stopColor={theme.glow} stopOpacity="0.55" />
          <stop offset="100%" stopColor={theme.glow} stopOpacity="0" />
        </linearGradient>
        <filter id={`q6m-soft-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={`q6m-glow-${uid}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Chamber backdrop ── */}
      <rect width="400" height="400" fill={`url(#q6m-sky-${uid})`} />

      {/* ── Floating luminous notes ── */}
      {notes.map((n, i) => (
        <motion.circle
          key={`note-${uid}-${i}`}
          cx={n.x}
          cy={300}
          r="2.4"
          fill={theme.note}
          filter={`url(#q6m-soft-${uid})`}
          initial={false}
          animate={isConfirming ? { opacity: 0 } : { cy: [340, 120], x: [0, n.drift], opacity: [0, 0.7, 0] }}
          transition={{ duration: n.dur, delay: n.delay, repeat: isConfirming ? 0 : Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* ── Stage floor glow ── */}
      <motion.ellipse
        cx="200" cy="372" rx="158" ry="30"
        fill={`url(#q6m-floor-${uid})`}
        animate={{ opacity: isConfirming ? 0.85 : [0.55, 0.8, 0.55], scaleX: isConfirming ? 1.05 : [1, 1.04, 1] }}
        style={{ transformOrigin: '200px 372px' }}
        transition={{ duration: beatDur * 2, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />

      {/* ── Metronome case: plinth + truncated pyramid + crown ── */}
      <g filter={`url(#q6m-soft-${uid})`} opacity="0.45">
        <path d={Q6_PLINTH_PATH} fill={theme.bodyDark} />
        <path d={Q6_CASE_PATH} fill={theme.bodyDark} />
      </g>
      <path
        d={Q6_CASE_PATH}
        fill={`url(#q6m-body-${uid})`}
        fillOpacity="0.92"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
      />
      <path d={Q6_CAP_PATH} fill={theme.body} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <path
        d={Q6_PLINTH_PATH}
        fill={`url(#q6m-body-${uid})`}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
      />
      {/* Tapered tempo-scale slot, softly breathing with the beat */}
      <path d={Q6_SLOT_PATH} fill={theme.bodyDark} fillOpacity="0.75" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      <motion.path
        d={Q6_SLOT_PATH}
        fill={theme.glow}
        initial={false}
        animate={isConfirming ? { opacity: 0.16 } : { opacity: [0.05, 0.14, 0.05] }}
        transition={{ duration: beatDur * 2, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
      {Q6_SCALE_TICKS.map(({ y, hw }) => (
        <line
          key={`tick-${uid}-${y}`}
          x1={Q6_PIVOT_X - hw}
          y1={y}
          x2={Q6_PIVOT_X + hw}
          y2={y}
          stroke="rgba(255,255,255,0.26)"
          strokeWidth="1"
        />
      ))}
      {/* Left-edge sheen down the case */}
      <path d="M157 350 L186 78" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      {/* Pivot mounting hub (static; the white cap rides on the needle group) */}
      <circle cx={Q6_PIVOT_X} cy={Q6_PIVOT_Y} r="9" fill={theme.bodyDark} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* ── Swing path arc (motion-blur trail) ── */}
      <motion.path
        d={swingArcPath(arcAngle)}
        fill="none"
        stroke={`url(#q6m-arc-${uid})`}
        strokeWidth={fanGhosts ? 16 : 6}
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: isConfirming ? 0 : fanGhosts ? [0.45, 0.7, 0.45] : [0.28, 0.45, 0.28] }}
        transition={{
          duration: beatDur,
          delay: isConfirming ? 0 : (arcDelay ?? 0),
          repeat: isConfirming ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* ── Speed-blur fan (A): static ghost arms that surface as tempo builds ── */}
      {fanGhosts && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: isConfirming ? 0 : 1 }}
          transition={isConfirming ? { duration: 0.3 } : { delay: fanDelay ?? 0, duration: 1.6, ease: 'easeIn' }}
        >
          {fanGhosts.map((ghost) => (
            <g
              key={`ghost-${uid}-${ghost.angle}`}
              transform={`rotate(${ghost.angle} ${Q6_PIVOT_X} ${Q6_PIVOT_Y})`}
              opacity={ghost.opacity}
            >
              <path d={Q6_ARM_PATH} fill={theme.arm} />
              <circle cx={Q6_PIVOT_X} cy={Q6_WEIGHT_Y} r="9" fill={theme.bob} />
            </g>
          ))}
        </motion.g>
      )}

      {/* ── The pendulum — rotated about the low pivot via the SVG
             transform attribute, driven by the armAngle MotionValue ── */}
      <g ref={armRef}>
        {/* Long tapered arm — pivots low, reaches the top */}
        <path d={Q6_ARM_PATH} fill={theme.arm} />
        {/* Small accent at the very tip */}
        <circle cx={Q6_PIVOT_X} cy={Q6_BOB_REST_Y} r="3.5" fill={theme.bob} opacity="0.9" />

        {/* Sliding weight — the glowing focal mass, upper portion of the arm */}
        <circle cx={Q6_PIVOT_X} cy={Q6_WEIGHT_Y} r="24" fill={`url(#q6m-bob-${uid})`} />
        <path
          d={`M${Q6_PIVOT_X - 11} ${Q6_WEIGHT_Y - 13} L${Q6_PIVOT_X + 11} ${Q6_WEIGHT_Y - 13} L${Q6_PIVOT_X + 9} ${Q6_WEIGHT_Y + 13} L${Q6_PIVOT_X - 9} ${Q6_WEIGHT_Y + 13} Z`}
          fill={theme.bob}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.9"
        />
        <motion.circle
          cx={Q6_PIVOT_X}
          cy={Q6_WEIGHT_Y}
          r="7"
          fill="#ffffff"
          filter={`url(#q6m-glow-${uid})`}
          animate={
            isConfirming
              ? { opacity: 1, r: 10 }
              : bobDim
                ? { opacity: [0.4, 0.85, 0.4] }
                : { opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: bobDim ? swing.dur : beatDur, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
        {/* Pivot cap (low, visible above the base) */}
        <circle cx={Q6_PIVOT_X} cy={Q6_PIVOT_Y} r="4.5" fill="#ffffff" opacity="0.85" />
      </g>

      {/* ── Tick flashes at the swing extremes (D): the crisp beat ── */}
      {tickFlash && (
        <g>
          <motion.circle
            cx={tickXL} cy={tickY} r="5"
            fill={theme.glow}
            filter={`url(#q6m-glow-${uid})`}
            initial={false}
            animate={isConfirming ? { opacity: 0 } : { opacity: [1, 0, 0, 0, 1] }}
            transition={{ duration: swing.dur, times: [0, 0.22, 0.5, 0.78, 1], repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={tickXR} cy={tickY} r="5"
            fill={theme.glow}
            filter={`url(#q6m-glow-${uid})`}
            initial={false}
            animate={isConfirming ? { opacity: 0 } : { opacity: [0, 0, 1, 0, 0] }}
            transition={{ duration: swing.dur, times: [0, 0.28, 0.5, 0.72, 1], repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={tickXL} cy={tickY}
            fill="none" stroke={theme.glow} strokeWidth="1.4"
            initial={false}
            animate={isConfirming ? { opacity: 0 } : { r: [5, 24, 24], opacity: [0.7, 0, 0] }}
            transition={{ duration: swing.dur, times: [0, 0.45, 1], repeat: isConfirming ? 0 : Infinity, ease: 'easeOut' }}
          />
          <motion.circle
            cx={tickXR} cy={tickY}
            fill="none" stroke={theme.glow} strokeWidth="1.4"
            initial={false}
            animate={isConfirming ? { opacity: 0 } : { r: [5, 5, 5, 24], opacity: [0, 0, 0.7, 0] }}
            transition={{ duration: swing.dur, times: [0, 0.49, 0.52, 1], repeat: isConfirming ? 0 : Infinity, ease: 'easeOut' }}
          />
        </g>
      )}

      {/* ── Beat indicator + radiating rings (the audible "tick") ── */}
      <motion.circle
        cx={Q6_PIVOT_X}
        cy={Q6_BOB_REST_Y}
        r="5"
        fill={theme.glow}
        filter={`url(#q6m-glow-${uid})`}
        animate={isConfirming ? { opacity: 0.9, scale: 1.3 } : { opacity: [0.2, 0.95, 0.2], scale: [1, 1.5, 1] }}
        style={{ transformOrigin: `${Q6_PIVOT_X}px ${Q6_BOB_REST_Y}px` }}
        transition={{ duration: beatDur, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
      <BeatRing color={theme.glow} dur={beatDur} delay={0} maxR={42} isConfirming={isConfirming} />
      <BeatRing color={theme.glow} dur={beatDur} delay={beatDur * 0.5} maxR={42} isConfirming={isConfirming} />

      {/* ── Confirm bloom + line of light ── */}
      <motion.circle
        cx="200" cy="180" r="120"
        fill={`url(#q6m-bob-${uid})`}
        initial={false}
        animate={{ opacity: isConfirming ? [0, 0.7, 0.5] : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.line
        x1="60" y1="210" x2="340" y2="210"
        stroke={theme.glow}
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{ transformOrigin: '200px 210px' }}
        initial={false}
        animate={{ opacity: isConfirming ? [0, 1, 0.85] : 0, scaleX: isConfirming ? [0.3, 1.02, 1] : 0.3 }}
        transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      />

      {/* ── Outer ring (shared visual language) ── */}
      <motion.circle
        cx="200" cy="200" r="158"
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1"
        animate={{ opacity: isConfirming ? 0.75 : [0.38, 0.6, 0.38] }}
        transition={{ duration: 6, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* ── A 長期高速運轉 — starts brisk, keeps accelerating until the arm    */
/*    blurs into a ghost fan, coral                                      */
function Q6RushMetro({ isConfirming }: { isConfirming: boolean }) {
  const theme: MetroTheme = {
    id: 'rush',
    bgTop: '#3a1410', bgMid: '#5a1e16', bgLow: '#7c2d18',
    floor: '#fb923c', body: '#7c3a26', bodyDark: '#4a2016',
    arm: '#fdba74', bob: '#fb923c', glow: '#fbbf24', note: '#fdba74',
  };
  return (
    <MetronomeScene
      isConfirming={isConfirming}
      config={{
        theme,
        // One-shot ramp: each half-swing shorter than the last (0.8s → 0.38s),
        // amplitude widening 12° → 26°, then hand over to the 0.62s fast loop.
        accel: {
          values: [0, 12, -14, 17, -20, 23, -26, 26],
          times: [0, 0.19, 0.37, 0.53, 0.68, 0.8, 0.91, 1],
          dur: 4.2,
          fastValues: [26, -26, 26],
          fastDur: 0.62,
        },
        swing: { values: [-26, 26, -26], dur: 0.62 },
        beatDur: 0.31,
        arcAngle: 26,
        noteDur: 1.5,
        // Speed blur surfaces only once the tempo is already high
        fanGhosts: [
          { angle: -26, opacity: 0.2 },
          { angle: -17, opacity: 0.13 },
          { angle: -8, opacity: 0.08 },
          { angle: 8, opacity: 0.08 },
          { angle: 17, opacity: 0.13 },
          { angle: 26, opacity: 0.2 },
        ],
        fanDelay: 2.6,
        arcDelay: 2.6,
      }}
    />
  );
}

/* ── B 不規律 — amplitude swings big and small with no pattern, lavender ── */
function Q6DriftMetro({ isConfirming }: { isConfirming: boolean }) {
  const theme: MetroTheme = {
    id: 'drift',
    bgTop: '#1e1b3a', bgMid: '#2c2658', bgLow: '#3a3270',
    floor: '#a78bfa', body: '#3f3a6e', bodyDark: '#262247',
    arm: '#c4b5fd', bob: '#a78bfa', glow: '#818cf8', note: '#c4b5fd',
  };
  return (
    <MetronomeScene
      isConfirming={isConfirming}
      config={{
        theme,
        // Wide swing, then shallow, then wide again — no two beats alike
        swing: {
          values: [0, 26, -7, 14, -28, 9, -19, 23, 0],
          times: [0, 0.1, 0.23, 0.34, 0.52, 0.65, 0.79, 0.91, 1],
          dur: 7.5,
        },
        beatDur: 1.7,
        arcAngle: 26,
        noteDur: 4.2,
      }}
    />
  );
}

/* ── C 平穩但冇力 — barely swinging, slow and faint, sand ── */
function Q6WearyMetro({ isConfirming }: { isConfirming: boolean }) {
  const theme: MetroTheme = {
    id: 'weary',
    bgTop: '#6e5a3e', bgMid: '#8a7050', bgLow: '#a88a62',
    floor: '#d6b483', body: '#7a6244', bodyDark: '#4e3d28',
    arm: '#e2c79c', bob: '#d6b483', glow: '#e8cfa0', note: '#dcc7a4',
  };
  return (
    <MetronomeScene
      isConfirming={isConfirming}
      config={{
        theme,
        swing: { values: [-8, 8, -8], dur: 5.6 },
        beatDur: 2.8,
        arcAngle: 8,
        noteDur: 7,
        bobDim: true,
      }}
    />
  );
}

/* ── D 努力自律中 — crisp metronome beat: dwell at each side, snap     */
/*    through the middle, tick flash on arrival, mint                   */
function Q6MeterMetro({ isConfirming }: { isConfirming: boolean }) {
  const theme: MetroTheme = {
    id: 'meter',
    bgTop: '#173a30', bgMid: '#1f5444', bgLow: '#2a6e58',
    floor: '#34d399', body: '#2c5e4c', bodyDark: '#1a3d30',
    arm: '#a7f3d0', bob: '#34d399', glow: '#6ee7b7', note: '#a7f3d0',
  };
  return (
    <MetronomeScene
      isConfirming={isConfirming}
      config={{
        theme,
        swing: { values: [-20, 20, -20], dur: 1.2, ease: [0.8, 0, 0.2, 1] },
        beatDur: 0.6,
        arcAngle: 20,
        noteDur: 3,
        tickFlash: true,
      }}
    />
  );
}

/* ── Idle — a resting metronome before any choice ── */
function Q6IdleMetro({ isConfirming }: { isConfirming: boolean }) {
  const theme: MetroTheme = {
    id: 'idle',
    bgTop: '#3a3640', bgMid: '#4c4654', bgLow: '#5e5768',
    floor: '#c9b8a3', body: '#564f5e', bodyDark: '#373340',
    arm: '#d6cfc4', bob: '#c9b8a3', glow: '#d8d2e6', note: '#d6cfc4',
  };
  return (
    <MetronomeScene
      isConfirming={isConfirming}
      config={{
        theme,
        swing: { values: [-8, 8, -8], dur: 3.4 },
        beatDur: 1.7,
        arcAngle: 8,
        noteDur: 6,
      }}
    />
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

            {questionId === 'q6' && previewId === 'A' && <Q6RushMetro isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'B' && <Q6DriftMetro isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'C' && <Q6WearyMetro isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'D' && <Q6MeterMetro isConfirming={isConfirming} />}
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
            <Q6IdleMetro isConfirming={isConfirming} />
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
