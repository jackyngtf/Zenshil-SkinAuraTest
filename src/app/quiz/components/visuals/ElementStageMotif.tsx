'use client';

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
/*  Q6 SCENES: "Pace of life" (Flow & Kinetic Forces)                 */
/* ================================================================== */

function Q6HighSpeed({ isConfirming }: { isConfirming: boolean }) {
  // Fast-moving, motion-blurred light trails
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q6-speed-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0 15" /> {/* Horizontal blur only */}
        </filter>
      </defs>
      <rect width="400" height="400" fill="#020617" />
      
      {Array.from({ length: 8 }, (_, i) => ({
        y1: seededNumber(12000 + i, 0, 400),
        y2: seededNumber(12100 + i, 0, 400),
        strokeWidth: seededNumber(12200 + i, 2, 8),
        duration: seededNumber(12300 + i, 0.3, 0.8),
        delay: seededNumber(12400 + i, 0, 1),
      })).map((line, i) => (
        <motion.line
          key={i}
          x1="-100" y1={line.y1}
          x2="-50" y2={line.y2}
          stroke={i % 2 === 0 ? "#f97316" : "#e2e8f0"}
          strokeWidth={line.strokeWidth}
          filter="url(#q6-speed-blur)"
          animate={{
            x1: isConfirming ? 500 : [-100, 500],
            x2: isConfirming ? 600 : [-50, 600],
            opacity: isConfirming ? 0 : [0, 1, 0]
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "linear",
            delay: line.delay
          }}
        />
      ))}
    </svg>
  );
}

function Q6Irregular({ isConfirming }: { isConfirming: boolean }) {
  // Choppy, conflicting ocean waves colliding
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q6-choppy">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" result="noise">
            <animate attributeName="baseFrequency" values="0.06; 0.1; 0.06" dur="2s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
          <feSpecularLighting surfaceScale="8" specularConstant="1.5" specularExponent="20" lightingColor="#e0f2fe">
            <fePointLight x="200" y="200" z="50" />
          </feSpecularLighting>
          <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="specOut" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#0369a1" />
      <motion.rect
        width="400" height="400" fill="#0ea5e9" filter="url(#q6-choppy)"
        animate={{ scale: isConfirming ? 1.5 : [1, 1.1, 1], opacity: isConfirming ? 0 : 0.9 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function Q6Steady({ isConfirming }: { isConfirming: boolean }) {
  // Heavy, repetitive cascading waterfall
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q6-waterfall">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.1" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.01 0.1; 0.015 0.15; 0.01 0.1" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 -0.2" />
        </filter>
        <linearGradient id="q6-fall-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#334155" />
      
      <motion.rect
        width="400" height="800" y="-400"
        fill="url(#q6-fall-grad)"
        filter="url(#q6-waterfall)"
        animate={{
          y: isConfirming ? 400 : [-400, 0],
          opacity: isConfirming ? 0 : 1
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function Q6Disciplined({ isConfirming }: { isConfirming: boolean }) {
  // Perfectly concentric, rhythmic ripples
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q6-disc-blur"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <rect width="400" height="400" fill="#064e3b" />
      
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="200" cy="200" r="0"
          stroke="#6ee7b7"
          strokeWidth="6"
          fill="none"
          filter="url(#q6-disc-blur)"
          animate={{
            r: isConfirming ? 400 : [0, 400],
            opacity: isConfirming ? 0 : [1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5
          }}
        />
      ))}
    </svg>
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
          {/* Neutral idle texture */}
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
        </motion.div>
      )}
    </div>
  );
}
