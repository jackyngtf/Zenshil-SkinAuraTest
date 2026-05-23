'use client';

import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  DryAutumnScene                                                      */
/*                                                                      */
/*  A fully animated pure-SVG scene depicting an arid autumn landscape  */
/*  with rolling dunes, bare tree, tumbling leaves, drifting sand,      */
/*  warm sun with heat shimmer, and cracked earth.                      */
/* ------------------------------------------------------------------ */

/* ── Colour tokens ── */
const SKY_TOP    = '#e8d5b0';
const SKY_MID    = '#f2e4cc';
const SKY_BOT    = '#faf0de';
const SUN_CORE   = '#f5d888';
const SUN_GLOW   = '#f0c760';
const DUNE_FAR   = '#d4b88a';
const DUNE_MID   = '#c9a876';
const DUNE_NEAR  = '#b89460';
const DUNE_FRONT = '#a8804e';
const EARTH      = '#9a7248';
const TREE_TRUNK = '#6b5240';
const TREE_BRANCH= '#7d6350';
const LEAF_A     = '#c97b3a';
const LEAF_B     = '#d49844';
const LEAF_C     = '#b86832';
const DUST       = '#dcc8a0';
const WIND       = '#e0d0b4';
const CRACK      = '#8a6438';

/* ── Leaf SVG path (small stylised leaf) ── */
const LEAF_PATH = 'M0,-8 C4,-7 7,-3 8,0 C7,3 4,7 0,8 C-1,4 -2,0 -1,-4 Z';

/* ── Falling leaf component ── */
function FallingLeaf({
  startX, startY, color, size, duration, delay, swayAmp,
}: {
  startX: number; startY: number; color: string;
  size: number; duration: number; delay: number; swayAmp: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.85, 0.9, 0.7, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.g
        animate={{
          x: [startX, startX + swayAmp, startX - swayAmp * 0.6, startX + swayAmp * 0.8, startX - swayAmp * 0.3],
          y: [startY, startY + 60, startY + 140, startY + 220, startY + 310],
        }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.g
          animate={{ rotate: [0, 180, 360, 540, 720] }}
          transition={{ duration: duration * 0.9, delay, repeat: Infinity, ease: 'linear' }}
        >
          <path
            d={LEAF_PATH}
            fill={color}
            opacity="0.82"
            transform={`scale(${size})`}
          />
          {/* Leaf vein */}
          <line x1="0" y1={-6 * size} x2="0" y2={6 * size} stroke={CRACK} strokeWidth={0.4 * size} opacity="0.5" />
        </motion.g>
      </motion.g>
    </motion.g>
  );
}

/* ── Dust particle ── */
function DustMote({
  cx, cy, r, duration, delay,
}: {
  cx: number; cy: number; r: number; duration: number; delay: number;
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={DUST}
      opacity="0.3"
      animate={{
        cx: [cx, cx + 20 + Math.random() * 15, cx - 10, cx],
        cy: [cy, cy - 8, cy + 5, cy],
        opacity: [0.15, 0.55, 0.35, 0.15],
        r: [r, r * 1.4, r * 0.8, r],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function DryAutumnScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="dry-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={SKY_TOP} />
            <stop offset="40%"  stopColor={SKY_MID} />
            <stop offset="100%" stopColor={SKY_BOT} />
          </linearGradient>

          {/* Sun glow radial */}
          <radialGradient id="dry-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor={SUN_CORE} stopOpacity="1" />
            <stop offset="40%" stopColor={SUN_GLOW} stopOpacity="0.6" />
            <stop offset="100%" stopColor={SUN_GLOW} stopOpacity="0" />
          </radialGradient>

          {/* Heat shimmer filter */}
          <filter id="dry-heat" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="turbulence" baseFrequency="0.015 0.08" numOctaves="2" seed="3" result="turb">
              <animate attributeName="baseFrequency" values="0.015 0.08;0.02 0.1;0.015 0.08" dur="6s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turb" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Soft blur for depth */}
          <filter id="dry-blur-soft">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="dry-blur-far">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>

          {/* Cracked earth pattern */}
          <pattern id="dry-cracks" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M5 0 L12 18 L0 30 M18 5 L25 25 L42 35 M35 0 L28 22 L38 45 M0 42 L15 38 L25 50 M45 15 L50 28" 
                  fill="none" stroke={CRACK} strokeWidth="0.6" opacity="0.35" />
          </pattern>
        </defs>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SKY                                                       */}
        {/* ══════════════════════════════════════════════════════════ */}
        <rect width="400" height="400" fill="url(#dry-sky)" />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SUN with pulsing glow + heat shimmer halo                 */}
        {/* ══════════════════════════════════════════════════════════ */}
        <g filter="url(#dry-heat)">
          {/* Outer halo */}
          <motion.circle
            cx="310" cy="72" r="55"
            fill="url(#dry-sun-glow)"
            animate={{
              r: [55, 65, 58, 55],
              opacity: [0.5, 0.72, 0.55, 0.5],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>
        {/* Sun disc */}
        <motion.circle
          cx="310" cy="72" r="28"
          fill={SUN_CORE}
          opacity="0.92"
          animate={{
            r: [28, 30, 27, 28],
            opacity: [0.88, 0.95, 0.88, 0.88],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner hot core */}
        <motion.circle
          cx="310" cy="72" r="14"
          fill="#fae7b0"
          opacity="0.6"
          animate={{ r: [14, 16, 13, 14], opacity: [0.5, 0.7, 0.5, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Heat distortion rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <motion.line
            key={angle}
            x1="310" y1="72"
            x2={310 + Math.cos((angle * Math.PI) / 180) * 60}
            y2={72 + Math.sin((angle * Math.PI) / 180) * 60}
            stroke={SUN_GLOW}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.2"
            animate={{
              x2: [
                310 + Math.cos((angle * Math.PI) / 180) * 55,
                310 + Math.cos((angle * Math.PI) / 180) * 72,
                310 + Math.cos((angle * Math.PI) / 180) * 55,
              ],
              y2: [
                72 + Math.sin((angle * Math.PI) / 180) * 55,
                72 + Math.sin((angle * Math.PI) / 180) * 72,
                72 + Math.sin((angle * Math.PI) / 180) * 55,
              ],
              opacity: [0.12, 0.32, 0.12],
            }}
            transition={{ duration: 4 + (angle % 90) * 0.02, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  WIND LINES — sweeping across the scene                    */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { y: 110, dur: 9, delay: 0 },
          { y: 165, dur: 11, delay: 2.5 },
          { y: 215, dur: 8, delay: 5 },
          { y: 130, dur: 12, delay: 1 },
          { y: 185, dur: 10, delay: 3.5 },
        ].map((w, i) => (
          <motion.path
            key={i}
            d={`M-60 ${w.y} C40 ${w.y - 12}, 120 ${w.y + 8}, 200 ${w.y - 5} S340 ${w.y + 10}, 460 ${w.y - 3}`}
            fill="none"
            stroke={WIND}
            strokeWidth={i % 2 === 0 ? 1.2 : 0.7}
            strokeLinecap="round"
            opacity="0"
            animate={{
              x: [-60, 80, -60],
              opacity: [0, 0.4, 0.5, 0.3, 0],
              pathLength: [0, 0.6, 1, 0.8, 0],
            }}
            transition={{ duration: w.dur, delay: w.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  FAR DUNES — distant layer with subtle parallax            */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.g
          filter="url(#dry-blur-far)"
          animate={{ x: [-3, 4, -3] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M-20 220 C30 185 80 190 130 180 C180 170 220 195 270 178 C320 162 360 182 420 190 L420 260 L-20 260 Z"
            fill={DUNE_FAR}
            opacity="0.6"
          />
        </motion.g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  MID DUNES — rolling layer                                 */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.g
          animate={{ x: [0, -6, 3, 0], y: [0, 2, -1, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M-30 260 C20 222 60 235 110 218 C160 200 200 228 260 210 C310 196 350 220 420 215 L420 310 L-30 310 Z"
            fill={DUNE_MID}
            opacity="0.78"
          />
          {/* Sand ripple lines on mid dune */}
          {[228, 240, 252, 264, 276].map((y, i) => (
            <motion.path
              key={y}
              d={`M${20 + i * 10} ${y} C${80 + i * 5} ${y - 3}, ${160 - i * 8} ${y + 4}, ${240 + i * 4} ${y - 2} S${340 - i * 6} ${y + 3}, ${400} ${y}`}
              fill="none"
              stroke={DUNE_FAR}
              strokeWidth="0.5"
              opacity="0.35"
              animate={{ x: [-4, 5, -4], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  BARE TREE — silhouette with swaying branches              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <g>
          {/* Trunk */}
          <motion.path
            d="M105 360 C103 330 100 300 98 270 C96 250 97 235 100 220"
            fill="none"
            stroke={TREE_TRUNK}
            strokeWidth="5"
            strokeLinecap="round"
            animate={{ d: [
              'M105 360 C103 330 100 300 98 270 C96 250 97 235 100 220',
              'M105 360 C104 330 101 300 99 270 C97 250 98 235 101 220',
              'M105 360 C103 330 100 300 98 270 C96 250 97 235 100 220',
            ]}}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Main branches */}
          {[
            { d1: 'M100 220 C90 200 72 185 58 175', d2: 'M101 220 C92 198 75 183 62 172', w: 3 },
            { d1: 'M100 235 C112 215 130 200 148 190', d2: 'M101 235 C114 213 133 198 152 187', w: 2.8 },
            { d1: 'M98 255 C85 240 68 230 50 228', d2: 'M99 255 C87 238 72 228 55 225', w: 2.2 },
            { d1: 'M99 248 C115 235 135 228 155 222', d2: 'M100 248 C117 233 138 225 158 219', w: 2 },
          ].map((b, i) => (
            <motion.path
              key={i}
              d={b.d1}
              fill="none"
              stroke={TREE_BRANCH}
              strokeWidth={b.w}
              strokeLinecap="round"
              animate={{ d: [b.d1, b.d2, b.d1] }}
              transition={{ duration: 5 + i * 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          {/* Twigs */}
          {[
            { d1: 'M58 175 C50 168 40 162 32 165', d2: 'M62 172 C55 164 46 157 38 160' },
            { d1: 'M58 175 C55 160 48 148 42 140', d2: 'M62 172 C60 156 54 144 48 136' },
            { d1: 'M148 190 C158 182 168 178 178 180', d2: 'M152 187 C163 178 174 174 184 175' },
            { d1: 'M148 190 C155 178 162 168 165 158', d2: 'M152 187 C160 174 168 163 172 153' },
            { d1: 'M50 228 C40 225 30 228 22 235', d2: 'M55 225 C46 222 36 224 28 230' },
            { d1: 'M155 222 C165 218 175 220 182 215', d2: 'M158 219 C169 214 180 215 188 210' },
          ].map((t, i) => (
            <motion.path
              key={`twig-${i}`}
              d={t.d1}
              fill="none"
              stroke={TREE_BRANCH}
              strokeWidth={1.2}
              strokeLinecap="round"
              opacity="0.7"
              animate={{ d: [t.d1, t.d2, t.d1] }}
              transition={{ duration: 4.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  NEAR DUNES — foreground layer                             */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.g
          animate={{ x: [0, 5, -3, 0], y: [0, -2, 1, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M-20 320 C30 285 80 298 140 278 C200 258 250 282 310 268 C360 256 390 275 430 270 L430 400 L-20 400 Z"
            fill={DUNE_NEAR}
            opacity="0.88"
          />
          {/* Sand ripples on near dune */}
          {[290, 305, 320, 335, 350].map((y, i) => (
            <motion.path
              key={`nr-${y}`}
              d={`M${-10 + i * 8} ${y} Q${100 + i * 5} ${y - 5}, ${200} ${y + 2} T${400 + i * 4} ${y - 3}`}
              fill="none"
              stroke={DUNE_MID}
              strokeWidth="0.6"
              opacity="0.4"
              animate={{ x: [0, 7, -3, 0], opacity: [0.25, 0.5, 0.3, 0.25] }}
              transition={{ duration: 7 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  FRONT EARTH — cracked ground                              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <path
          d="M-10 355 C50 340 150 348 200 338 C260 328 330 342 420 335 L420 410 L-10 410 Z"
          fill={DUNE_FRONT}
        />
        <path
          d="M-10 355 C50 340 150 348 200 338 C260 328 330 342 420 335 L420 410 L-10 410 Z"
          fill="url(#dry-cracks)"
        />
        {/* Highlight ridge on front dune */}
        <motion.path
          d="M-10 355 C50 340 150 348 200 338 C260 328 330 342 420 335"
          fill="none"
          stroke={DUNE_MID}
          strokeWidth="1.5"
          opacity="0.5"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  FALLING LEAVES                                            */}
        {/* ══════════════════════════════════════════════════════════ */}
        <FallingLeaf startX={180} startY={-20} color={LEAF_A} size={0.9} duration={9}  delay={0}   swayAmp={35} />
        <FallingLeaf startX={280} startY={-40} color={LEAF_B} size={0.7} duration={11} delay={2}   swayAmp={-28} />
        <FallingLeaf startX={120} startY={-10} color={LEAF_C} size={0.8} duration={10} delay={4}   swayAmp={30} />
        <FallingLeaf startX={340} startY={-30} color={LEAF_A} size={0.6} duration={8}  delay={6}   swayAmp={-22} />
        <FallingLeaf startX={60}  startY={-50} color={LEAF_B} size={0.75} duration={12} delay={3}   swayAmp={25} />
        <FallingLeaf startX={220} startY={-60} color={LEAF_C} size={0.65} duration={9.5} delay={7}  swayAmp={-32} />
        <FallingLeaf startX={360} startY={-15} color={LEAF_A} size={0.55} duration={10.5} delay={5} swayAmp={20} />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  DUST PARTICLES                                            */}
        {/* ══════════════════════════════════════════════════════════ */}
        <DustMote cx={55}  cy={140} r={1.5} duration={7}   delay={0} />
        <DustMote cx={150} cy={115} r={1.2} duration={8}   delay={1} />
        <DustMote cx={240} cy={155} r={1.8} duration={6.5} delay={2} />
        <DustMote cx={330} cy={130} r={1.3} duration={9}   delay={0.5} />
        <DustMote cx={80}  cy={200} r={1.0} duration={7.5} delay={3} />
        <DustMote cx={200} cy={185} r={1.6} duration={8.5} delay={1.5} />
        <DustMote cx={300} cy={210} r={1.1} duration={6}   delay={4} />
        <DustMote cx={370} cy={175} r={1.4} duration={7.2} delay={2.5} />
        <DustMote cx={120} cy={250} r={1.3} duration={8}   delay={3.5} />
        <DustMote cx={260} cy={240} r={1.7} duration={6.8} delay={1.2} />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SAND LIFTING — fine sand blowing off dune ridges          */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { cx: 140, cy: 278, dur: 5 },
          { cx: 310, cy: 268, dur: 6 },
          { cx: 200, cy: 338, dur: 4.5 },
        ].map((s, i) => (
          <motion.g key={`sand-${i}`}>
            {Array.from({ length: 5 }).map((_, j) => (
              <motion.circle
                key={j}
                cx={s.cx + j * 6}
                cy={s.cy}
                r={0.8}
                fill={DUST}
                opacity="0"
                animate={{
                  cx: [s.cx + j * 6, s.cx + j * 6 + 30 + j * 8],
                  cy: [s.cy, s.cy - 10 - j * 4],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: s.dur,
                  delay: i * 1.5 + j * 0.3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.g>
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  ATMOSPHERIC HAZE — warm gradient overlays                  */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.rect
          x="0" y="100" width="400" height="180"
          fill={SKY_MID}
          opacity="0.08"
          animate={{ opacity: [0.04, 0.12, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
