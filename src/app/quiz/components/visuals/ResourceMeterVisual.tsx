'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { seededNumber } from './deterministicMotion';

export type ResourceMeterOptionId = 'A' | 'B' | 'C' | 'D';

type ResourceVisualState = {
  image?: string;
  imageFit?: 'cover' | 'contain';
  imagePosition?: string;
  imageMask?: string;
  aura: string;
  auraSoft: string;
  accent: string;
  accentSoft: string;
};

const visualStates: Record<ResourceMeterOptionId | 'idle', ResourceVisualState> = {
  idle: {
    aura: '#e9ded4',
    auraSoft: '#dbe9e6',
    accent: '#b8a895',
    accentSoft: '#efe8df',
  },
  A: {
    image: '/assets/quiz/q04/a-sleep-base.png',
    imageFit: 'cover',
    imagePosition: 'center 46%',
    imageMask: 'radial-gradient(ellipse 50% 54% at center, #000 0%, #000 44%, rgba(0,0,0,0.58) 59%, transparent 82%)',
    aura: '#b8c3ed',
    auraSoft: '#d9e6fb',
    accent: '#7b86b2',
    accentSoft: '#eef0ff',
  },
  B: {
    image: '/assets/quiz/q04/b-relax-base.png',
    imageFit: 'cover',
    imagePosition: 'center 50%',
    imageMask: 'radial-gradient(ellipse 52% 56% at center, #000 0%, #000 46%, rgba(0,0,0,0.48) 64%, transparent 86%)',
    aura: '#e9aab7',
    auraSoft: '#f7d8d7',
    accent: '#bd7084',
    accentSoft: '#fff0ee',
  },
  C: {
    image: '/assets/quiz/q04/c-time-base.png',
    imageFit: 'cover',
    imagePosition: 'center center',
    imageMask: 'radial-gradient(ellipse 50% 55% at center, #000 0%, #000 48%, rgba(0,0,0,0.48) 64%, transparent 84%)',
    aura: '#a9dced',
    auraSoft: '#d7edf2',
    accent: '#6faabd',
    accentSoft: '#edfaff',
  },
  D: {
    image: '/assets/quiz/q04/d-energy-base.png',
    imageFit: 'contain',
    imagePosition: 'center center',
    imageMask: 'radial-gradient(ellipse 25% 64% at center, #000 0%, #000 54%, rgba(0,0,0,0.44) 72%, transparent 100%)',
    aura: '#f2c75f',
    auraSoft: '#fff0bf',
    accent: '#c99432',
    accentSoft: '#fff6dc',
  },
};

function getOptionId(optionId: ResourceMeterOptionId | null): ResourceMeterOptionId | 'idle' {
  return optionId ?? 'idle';
}

function AmbientBackdrop({
  state,
  reduceMotion,
}: {
  state: ResourceVisualState;
  reduceMotion: boolean;
}) {
  return (
    <>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${state.aura}44 0%, transparent 68%)`,
        }}
        animate={reduceMotion ? undefined : { scale: [0.98, 1.08, 0.98], opacity: [0.42, 0.72, 0.42] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[46%] top-[52%] h-[82%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${state.auraSoft}5c 0%, transparent 70%)`,
        }}
        animate={reduceMotion ? undefined : { x: [-5, 7, -5], y: [4, -6, 4], opacity: [0.36, 0.58, 0.36] }}
        transition={{ duration: 9.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function IdleLayer({
  state,
  reduceMotion,
}: {
  state: ResourceVisualState;
  reduceMotion: boolean;
}) {
  return (
    <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="resource-idle-orb" cx="50%" cy="43%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="56%" stopColor={state.accentSoft} stopOpacity="0.7" />
          <stop offset="100%" stopColor={state.auraSoft} stopOpacity="0.12" />
        </radialGradient>
        <filter id="resource-idle-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <motion.circle
        cx="200"
        cy="142"
        r="82"
        fill={state.aura}
        opacity="0.18"
        filter="url(#resource-idle-blur)"
        animate={reduceMotion ? undefined : { scale: [0.96, 1.06, 0.96], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 142px' }}
      />
      <motion.circle
        cx="200"
        cy="142"
        r="64"
        fill="url(#resource-idle-orb)"
        opacity="0.84"
        animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 142px' }}
      />
      {[118, 150, 184].map((y, index) => (
        <motion.path
          key={y}
          d={`M108 ${y} C144 ${y - 7}, 176 ${y + 5}, 208 ${y - 2} S260 ${y + 6}, 292 ${y - 5}`}
          fill="none"
          stroke={index === 1 ? state.accent : '#ffffff'}
          strokeLinecap="round"
          strokeWidth={index === 1 ? 1.2 : 1}
          opacity={index === 1 ? 0.22 : 0.32}
          animate={reduceMotion ? undefined : { x: [-5, 6, -5], opacity: [0.14, 0.32, 0.14] }}
          transition={{ duration: 6 + index * 0.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

function BaseImageLayer({
  state,
  optionId,
  reduceMotion,
}: {
  state: ResourceVisualState;
  optionId: ResourceMeterOptionId | 'idle';
  reduceMotion: boolean;
}) {
  if (!state.image) return <IdleLayer state={state} reduceMotion={reduceMotion} />;

  return (
    <motion.img
      key={`image-${optionId}`}
      src={state.image}
      alt=""
      draggable={false}
      className="absolute inset-0 h-full w-full select-none"
      style={{
        objectFit: state.imageFit ?? 'cover',
        objectPosition: state.imagePosition ?? 'center',
        WebkitMaskImage: state.imageMask,
        maskImage: state.imageMask,
      }}
      initial={{ opacity: 0, scale: 1.035, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.985, filter: 'blur(8px)' }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function SleepOverlay({
  state,
  reduceMotion,
}: {
  state: ResourceVisualState;
  reduceMotion: boolean;
}) {
  const moonCx = 200;
  const moonCy = 115; // Approximate center of the moon in the background image

  // Tiny, slow twinkling stars in the sky
  const stars = Array.from({ length: 28 }).map((_, i) => ({
    x: seededNumber(1100 + i, 10, 390),
    y: seededNumber(1200 + i, 10, 170), // Mostly upper half
    r: seededNumber(1300 + i, 0, 1) > 0.8 ? 1.5 : 0.8,
    delay: seededNumber(1400 + i, 0, 4),
    dur: seededNumber(1500 + i, 3, 8),
  }));

  // Slow falling sleep dust (sandman dust)
  const dust = Array.from({ length: 15 }).map((_, i) => ({
    x: seededNumber(1600 + i, 40, 360),
    y: seededNumber(1700 + i, 80, 240),
    r: seededNumber(1800 + i, 1, 3.5),
    delay: seededNumber(1900 + i, 0, 5),
    dur: seededNumber(2000 + i, 7, 12),
  }));

  return (
    <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="sleep-moon-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="40%" stopColor={state.auraSoft} stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        
        <filter id="sleep-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Moon Halo - Breathing soft light behind/around the moon */}
      <motion.circle
        cx={moonCx} cy={moonCy} r="110"
        fill="url(#sleep-moon-halo)"
        animate={reduceMotion ? undefined : { scale: [0.95, 1.05, 0.95], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Twinkling Stars */}
      {stars.map((star, i) => (
        <motion.circle
          key={`star-${i}`}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="#ffffff"
          opacity="0.1"
          animate={reduceMotion ? undefined : { opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: star.dur, repeat: Infinity, ease: 'easeInOut', delay: star.delay }}
        />
      ))}

      {/* Falling Sleep Dust */}
      {dust.map((d, i) => (
        <motion.circle
          key={`dust-${i}`}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="#ffffff"
          filter="url(#sleep-blur)"
          animate={reduceMotion ? undefined : { 
            y: [0, 80], 
            x: [0, i % 2 === 0 ? 25 : -25],
            opacity: [0, 0.7, 0] 
          }}
          transition={{ duration: d.dur, repeat: Infinity, ease: 'linear', delay: d.delay }}
        />
      ))}
    </svg>
  );
}

function RelaxOverlay({
  state,
  reduceMotion,
}: {
  state: ResourceVisualState;
  reduceMotion: boolean;
}) {
  const cx = 200;
  const cy = 160;

  // Soft drifting bokeh particles
  const bokeh = [
    { x: 120, y: 200, r: 24, dur: 12, delay: 0 },
    { x: 280, y: 220, r: 32, dur: 15, delay: 2 },
    { x: 160, y: 140, r: 18, dur: 10, delay: 5 },
    { x: 240, y: 120, r: 28, dur: 14, delay: 1 },
    { x: 200, y: 260, r: 40, dur: 18, delay: 4 },
  ];

  return (
    <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="relax-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="30%" stopColor={state.auraSoft} stopOpacity="0.6" />
          <stop offset="70%" stopColor={state.aura} stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="relax-bokeh" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="50%" stopColor={state.auraSoft} stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        <filter id="relax-blur-heavy" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        
        <filter id="relax-blur-light" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Background drifting bokeh to create depth */}
      {bokeh.map((b, i) => (
        <motion.circle
          key={`bokeh-${i}`}
          cx={b.x}
          cy={b.y}
          r={b.r}
          fill="url(#relax-bokeh)"
          filter="url(#relax-blur-heavy)"
          animate={reduceMotion ? undefined : { 
            y: [0, -40, 0], 
            x: [0, i % 2 === 0 ? 15 : -15, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}

      {/* Central Breathing Core */}
      <motion.circle
        cx={cx} cy={cy} r="120"
        fill="url(#relax-core-glow)"
        animate={reduceMotion ? undefined : { scale: [0.85, 1.15, 0.85], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Breathing Echo Rings (Ripples) - Inhale/Exhale rhythm */}
      <motion.circle
        cx={cx} cy={cy} r="90"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.5"
        filter="url(#relax-blur-light)"
        animate={reduceMotion ? undefined : { scale: [0.5, 1.8], opacity: [0.7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', delay: 0 }}
        style={{ transformOrigin: 'center' }}
      />
      
      <motion.circle
        cx={cx} cy={cy} r="90"
        fill="none"
        stroke={state.auraSoft}
        strokeWidth="1"
        animate={reduceMotion ? undefined : { scale: [0.5, 1.8], opacity: [0.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeOut', delay: 3 }}
        style={{ transformOrigin: 'center' }}
      />
      
      {/* Central anchor point (very subtle) */}
      <circle cx={cx} cy={cy} r="2" fill="#ffffff" opacity="0.4" filter="url(#relax-blur-light)" />
    </svg>
  );
}

function TimeOverlay({
  state,
  reduceMotion,
}: {
  state: ResourceVisualState;
  reduceMotion: boolean;
}) {
  // The background image (c-time-base.png) already provides the glass clock face,
  // rim, and tick marks. This SVG only adds the animated hands on top.
  // We use viewBox centered at 200,160 and transformOrigin trick to rotate from center.
  const cx = 200;
  const cy = 160;

  return (
    <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="hand-gradient-minute" x1="0%" x2="0%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="hand-gradient-hour" x1="0%" x2="0%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>

        <filter id="time-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="time-glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Hour Hand */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: [45, 405] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      >
        <circle cx={cx} cy={cy} r="60" fill="transparent" pointerEvents="none" />
        <rect x={cx - 2.5} y={cy - 48} width="5" height="55" rx="2.5" fill="url(#hand-gradient-hour)" filter="url(#time-blur)" opacity="0.8" />
        <rect x={cx - 1.5} y={cy - 46} width="3" height="51" rx="1.5" fill="#ffffff" />
      </motion.g>

      {/* Minute Hand */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: [180, 540] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      >
        <circle cx={cx} cy={cy} r="85" fill="transparent" pointerEvents="none" />
        <rect x={cx - 1.5} y={cy - 72} width="3" height="82" rx="1.5" fill="url(#hand-gradient-minute)" filter="url(#time-blur)" opacity="0.9" />
        <rect x={cx - 1} y={cy - 70} width="2" height="78" rx="1" fill="#ffffff" />
      </motion.g>

      {/* Sweeping Second Hand */}
      <motion.g
        animate={reduceMotion ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      >
        <circle cx={cx} cy={cy} r="80" fill="transparent" pointerEvents="none" />
        <line x1={cx} y1={cy + 12} x2={cx} y2={cy - 78} stroke={state.accent} strokeWidth="1.2" opacity="0.5" filter="url(#time-blur)" />
        <line x1={cx} y1={cy + 12} x2={cx} y2={cy - 78} stroke="#ffffff" strokeWidth="0.5" opacity="0.7" />
        <circle cx={cx} cy={cy - 78} r="2" fill="#ffffff" filter="url(#time-glow-heavy)" />
      </motion.g>

      {/* Center Pivot Jewel */}
      <circle cx={cx} cy={cy} r="6" fill="#ffffff" filter="url(#time-glow-heavy)" opacity="0.7" />
      <circle cx={cx} cy={cy} r="3.5" fill="#ffffff" />
      <circle cx={cx} cy={cy} r="1.2" fill={state.accent} />
    </svg>
  );
}

function EnergyOverlay({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  // Exact inner boundaries of the 3D glass capsule, extended down to sit on the base
  const capsulePath = 'M176 64 C176 42 189 31 200 31 C211 31 224 42 224 64 L224 222 C224 254 213 270 200 270 C187 270 176 254 176 222 Z';

  // Golden serum / dust particles rising through the fluid
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    x: seededNumber(3000 + i, 180, 220), 
    y: seededNumber(3100 + i, 250, 300), 
    r: seededNumber(3200 + i, 0.8, 3.3),
    delay: seededNumber(3300 + i, 0, 5),
    duration: seededNumber(3400 + i, 3, 6),
  }));

  // Glowing ambient particles outside the capsule
  const outerParticles = Array.from({ length: 8 }).map((_, i) => ({
    x: seededNumber(3500 + i, 150, 250), 
    y: seededNumber(3600 + i, 200, 300), 
    r: seededNumber(3700 + i, 1, 3),
    delay: seededNumber(3800 + i, 0, 4),
    duration: seededNumber(3900 + i, 5, 8),
  }));

  return (
    <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="energy-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#fef3c7" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#fde68a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        
        <linearGradient id="energy-fluid-fill" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#fcd34d" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id="energy-fluid-highlight" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>

        <filter id="energy-blur-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="energy-particle-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        <clipPath id="energy-capsule-clip">
          <path d={capsulePath} />
        </clipPath>
      </defs>

      {/* Ambient background glow emitted from the capsule */}
      <motion.ellipse
        cx="200" cy="150" rx="70" ry="130"
        fill="url(#energy-core-glow)"
        filter="url(#energy-blur-soft)"
        animate={reduceMotion ? undefined : { scale: [0.95, 1.05, 0.95], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 150px' }}
      />

      {/* INSIDE THE CAPSULE */}
      <g clipPath="url(#energy-capsule-clip)">
        {/* Dynamic Fluid Body sloshing inside */}
        <motion.path
          d="M170 280 L170 120 C185 110, 215 130, 230 120 L230 280 Z"
          fill="url(#energy-fluid-fill)"
          animate={reduceMotion ? undefined : { 
            d: [
              "M170 280 L170 120 C185 110, 215 130, 230 120 L230 280 Z",
              "M170 280 L170 130 C190 140, 210 110, 230 130 L230 280 Z",
              "M170 280 L170 115 C200 130, 200 110, 230 125 L230 280 Z",
              "M170 280 L170 120 C185 110, 215 130, 230 120 L230 280 Z"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Fluid surface foam / highlight wave */}
        <motion.path
          d="M170 120 C185 110, 215 130, 230 120"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
          animate={reduceMotion ? undefined : { 
            d: [
              "M170 120 C185 110, 215 130, 230 120",
              "M170 130 C190 140, 210 110, 230 130",
              "M170 115 C200 130, 200 110, 230 125",
              "M170 120 C185 110, 215 130, 230 120"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Glass edge highlights overlapping the liquid */}
        <rect x="176" y="31" width="48" height="240" fill="url(#energy-fluid-highlight)" />

        {/* Golden Serum Dust / Bubbles rising inside the liquid */}
        {particles.map((p, i) => (
          <motion.circle
            key={`serum-dust-${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="#ffffff"
            filter="url(#energy-particle-glow)"
            animate={reduceMotion ? undefined : { 
              y: [0, -140], // Stop roughly around the surface
              x: [0, Math.sin(i) * 10], 
              opacity: [0, 0.9, 0],
              scale: [0.6, 1.2, 0.4]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: 'easeOut', 
              delay: p.delay 
            }}
          />
        ))}
      </g>

      {/* OUTSIDE THE CAPSULE */}
      {/* Soft light reflection on the bottom base of the glass */}
      <motion.ellipse
        cx="200" cy="270" rx="35" ry="8"
        fill="#fbbf24"
        opacity="0.3"
        filter="url(#energy-blur-soft)"
        animate={reduceMotion ? undefined : { opacity: [0.15, 0.45, 0.15], scaleX: [0.9, 1.1, 0.9] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ambient floating dust outside */}
      {outerParticles.map((p, i) => (
        <motion.circle
          key={`outer-dust-${i}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill="#fde68a"
          filter="url(#energy-particle-glow)"
          animate={reduceMotion ? undefined : { 
            y: [0, -60],
            x: [0, seededNumber(4000 + i, -10, 10)],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: 'easeInOut', 
            delay: p.delay 
          }}
        />
      ))}
    </svg>
  );
}

function VisualOverlay({
  optionId,
  state,
  reduceMotion,
}: {
  optionId: ResourceMeterOptionId | 'idle';
  state: ResourceVisualState;
  reduceMotion: boolean;
}) {
  if (optionId === 'A') return <SleepOverlay state={state} reduceMotion={reduceMotion} />;
  if (optionId === 'B') return <RelaxOverlay state={state} reduceMotion={reduceMotion} />;
  if (optionId === 'C') return <TimeOverlay state={state} reduceMotion={reduceMotion} />;
  if (optionId === 'D') return <EnergyOverlay reduceMotion={reduceMotion} />;
  return null;
}

export default function ResourceMeterVisual({
  selectedOptionId,
  isConfirming = false,
}: {
  selectedOptionId: ResourceMeterOptionId | null;
  isConfirming?: boolean;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const optionId = getOptionId(selectedOptionId);
  const state = visualStates[optionId];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible" aria-hidden="true">
      <AmbientBackdrop state={state} reduceMotion={reduceMotion} />

      <AnimatePresence mode="wait">
        <motion.div
          key={optionId}
          className="relative flex h-full w-full flex-col items-center justify-center"
          initial={{ opacity: 0, y: 8, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: isConfirming ? 1.012 : 1 }}
          exit={{ opacity: 0, y: -8, scale: 1.01 }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-[min(86vw,330px)] w-[min(92vw,350px)] overflow-visible">
            <motion.div
              className="absolute inset-[-5%] rounded-[42%] blur-2xl"
              style={{
                background: `radial-gradient(ellipse at center, ${state.accentSoft}99 0%, transparent 72%)`,
              }}
              animate={reduceMotion ? undefined : { scale: [0.98, 1.035, 0.98], opacity: [0.38, 0.62, 0.38] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <BaseImageLayer state={state} optionId={optionId} reduceMotion={reduceMotion} />
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
            >
              <VisualOverlay optionId={optionId} state={state} reduceMotion={reduceMotion} />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
