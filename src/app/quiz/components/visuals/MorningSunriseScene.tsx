'use client';

import { motion } from 'framer-motion';
import { seededNumber } from './deterministicMotion';

/* ------------------------------------------------------------------ */
/*  MorningSunriseScene                                                 */
/*                                                                      */
/*  A fully animated pure-SVG scene depicting an early morning sunrise  */
/*  with golden sun rising over rolling hills, god rays streaming       */
/*  through wispy clouds, fading stars, silk mist, and light particles. */
/* ------------------------------------------------------------------ */

/* ── Colour tokens ── */
const SKY_DEEP   = '#3b2f5e';
const SKY_MID    = '#6b4a7a';
const SKY_WARM   = '#c87a6e';
const SKY_GLOW   = '#f0b86e';
const SKY_HORIZON= '#fad698';
const SUN_CORE   = '#ffe8a0';
const SUN_INNER  = '#ffd56b';
const SUN_OUTER  = '#f5b84a';
const RAY_GOLD   = '#ffd97a';
const RAY_PINK   = '#f0a0a0';
const CLOUD_PINK = '#e8a0a8';
const CLOUD_GOLD = '#f5d0a0';
const CLOUD_WHITE= '#f8e8e0';
const HILL_FAR   = '#5a4878';
const HILL_MID   = '#4a3868';
const HILL_NEAR  = '#3a2858';
const MIST       = '#f0d8c8';
const STAR       = '#f0e8d8';
const PARTICLE   = '#ffe8b0';

/* ── Twinkling star ── */
function Star({
  cx, cy, size, duration, delay,
}: {
  cx: number; cy: number; size: number; duration: number; delay: number;
}) {
  return (
    <motion.g
      animate={{ opacity: [0.8, 0.2, 0.7, 0.1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Cross sparkle */}
      <line x1={cx} y1={cy - size} x2={cx} y2={cy + size} stroke={STAR} strokeWidth={0.6} strokeLinecap="round" />
      <line x1={cx - size} y1={cy} x2={cx + size} y2={cy} stroke={STAR} strokeWidth={0.6} strokeLinecap="round" />
      <line x1={cx - size * 0.6} y1={cy - size * 0.6} x2={cx + size * 0.6} y2={cy + size * 0.6} stroke={STAR} strokeWidth={0.3} strokeLinecap="round" />
      <line x1={cx + size * 0.6} y1={cy - size * 0.6} x2={cx - size * 0.6} y2={cy + size * 0.6} stroke={STAR} strokeWidth={0.3} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={size * 0.35} fill={STAR} opacity="0.8" />
    </motion.g>
  );
}

/* ── Light particle ── */
function LightMote({
  cx, cy, duration, delay,
}: {
  cx: number; cy: number; duration: number; delay: number;
}) {
  const driftY = 30 + seededNumber(cx + cy + duration, 0, 20);
  const driftX = seededNumber(cx + cy + delay, -12.5, 12.5);

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={1.5}
      fill={PARTICLE}
      opacity="0"
      animate={{
        cy: [cy, cy - driftY],
        cx: [cx, cx + driftX],
        opacity: [0, 0.7, 0.5, 0],
        r: [1, 2, 1.5, 0.5],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

export default function MorningSunriseScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sky gradient — deep violet top → warm gold horizon */}
          <linearGradient id="sunrise-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor={SKY_DEEP} />
            <stop offset="30%" stopColor={SKY_MID} />
            <stop offset="60%" stopColor={SKY_WARM} />
            <stop offset="80%" stopColor={SKY_GLOW} />
            <stop offset="100%" stopColor={SKY_HORIZON} />
          </linearGradient>

          {/* Sun radial glow */}
          <radialGradient id="sunrise-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor={SUN_CORE} stopOpacity="1" />
            <stop offset="30%" stopColor={SUN_INNER} stopOpacity="0.8" />
            <stop offset="60%" stopColor={SUN_OUTER} stopOpacity="0.3" />
            <stop offset="100%" stopColor={SUN_OUTER} stopOpacity="0" />
          </radialGradient>

          {/* Horizon glow */}
          <radialGradient id="sunrise-horizon-glow" cx="50%" cy="100%" r="70%">
            <stop offset="0%"  stopColor={SKY_HORIZON} stopOpacity="0.9" />
            <stop offset="50%" stopColor={SKY_GLOW} stopOpacity="0.4" />
            <stop offset="100%" stopColor={SKY_GLOW} stopOpacity="0" />
          </radialGradient>

          {/* Blur filters */}
          <filter id="sunrise-blur-soft">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="sunrise-blur-glow">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="sunrise-blur-mist">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SKY BACKDROP                                              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <rect width="400" height="400" fill="url(#sunrise-sky)" />

        {/* Horizon glow wash */}
        <motion.ellipse
          cx="200" cy="260" rx="280" ry="120"
          fill="url(#sunrise-horizon-glow)"
          opacity="0.6"
          animate={{ ry: [120, 135, 120], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  FADING STARS                                              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <Star cx={45}  cy={35}  size={4}   duration={12} delay={0} />
        <Star cx={120} cy={22}  size={3}   duration={10} delay={2} />
        <Star cx={200} cy={45}  size={3.5} duration={14} delay={1} />
        <Star cx={310} cy={30}  size={3}   duration={11} delay={3} />
        <Star cx={370} cy={55}  size={2.5} duration={13} delay={0.5} />
        <Star cx={75}  cy={75}  size={2}   duration={9}  delay={4} />
        <Star cx={260} cy={65}  size={2.5} duration={15} delay={2.5} />
        <Star cx={340} cy={90}  size={2}   duration={10} delay={5} />
        <Star cx={155} cy={85}  size={1.8} duration={12} delay={3.5} />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  GOD RAYS — streaming upward from the sun                  */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { angle: -55, w: 28, color: RAY_GOLD, dur: 7, delay: 0 },
          { angle: -35, w: 22, color: RAY_PINK, dur: 8, delay: 1 },
          { angle: -15, w: 32, color: RAY_GOLD, dur: 6.5, delay: 0.5 },
          { angle: 5,   w: 26, color: RAY_PINK, dur: 7.5, delay: 2 },
          { angle: 25,  w: 30, color: RAY_GOLD, dur: 9, delay: 1.5 },
          { angle: 45,  w: 20, color: RAY_PINK, dur: 6, delay: 3 },
          { angle: 60,  w: 24, color: RAY_GOLD, dur: 8.5, delay: 0.8 },
          { angle: -70, w: 18, color: RAY_GOLD, dur: 7, delay: 2.5 },
        ].map((ray, i) => {
          const rad = (ray.angle * Math.PI) / 180;
          const len = 260;
          const x1 = 200;
          const y1 = 248;
          const x2 = x1 + Math.sin(rad) * len;
          const y2 = y1 - Math.cos(rad) * len;
          return (
            <motion.line
              key={i}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke={ray.color}
              strokeWidth={ray.w}
              strokeLinecap="round"
              opacity="0"
              filter="url(#sunrise-blur-glow)"
              animate={{
                opacity: [0.02, 0.12, 0.08, 0.02],
                strokeWidth: [ray.w * 0.7, ray.w, ray.w * 0.8, ray.w * 0.7],
              }}
              transition={{ duration: ray.dur, delay: ray.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  FAR HILLS — layered silhouettes                           */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.path
          d="M-20 280 C30 248 80 255 140 240 C200 225 250 250 310 235 C350 226 380 242 420 238 L420 300 L-20 300 Z"
          fill={HILL_FAR}
          opacity="0.55"
          filter="url(#sunrise-blur-soft)"
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M-20 295 C40 268 90 278 150 262 C210 248 260 270 320 258 C370 248 400 262 430 260 L430 330 L-20 330 Z"
          fill={HILL_MID}
          opacity="0.65"
          animate={{ x: [-2, 3, -2] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M-20 320 C50 295 100 308 160 292 C220 278 270 300 340 288 C390 280 420 296 440 294 L440 400 L-20 400 Z"
          fill={HILL_NEAR}
          opacity="0.78"
          animate={{ x: [0, -3, 2, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SUN — rising golden disc                                  */}
        {/* ══════════════════════════════════════════════════════════ */}
        {/* Outer halo */}
        <motion.circle
          cx="200" cy="248" r="70"
          fill="url(#sunrise-sun-glow)"
          filter="url(#sunrise-blur-glow)"
          animate={{
            r: [70, 82, 74, 70],
            opacity: [0.6, 0.82, 0.65, 0.6],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Main disc */}
        <motion.circle
          cx="200" cy="248" r="32"
          fill={SUN_INNER}
          opacity="0.95"
          animate={{
            r: [32, 35, 33, 32],
            cy: [248, 245, 248],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner hot centre */}
        <motion.circle
          cx="200" cy="248" r="16"
          fill={SUN_CORE}
          opacity="0.85"
          animate={{ r: [16, 18, 15, 16], opacity: [0.8, 0.95, 0.8, 0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Sun reflection on horizon line */}
        <motion.ellipse
          cx="200" cy="260" rx="60" ry="4"
          fill={SUN_OUTER}
          opacity="0.3"
          filter="url(#sunrise-blur-soft)"
          animate={{ rx: [55, 70, 55], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  WISPY CLOUDS — pink/gold tinted, drifting                 */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { d: 'M-30 120 C20 108 60 115 100 105 C140 95 170 110 210 100 C240 92 260 102 290 98', color: CLOUD_PINK, w: 14, dur: 28, x0: 0, x1: 80 },
          { d: 'M60 145 C100 138 130 148 170 138 C200 130 230 142 270 136 C300 130 330 140 370 134', color: CLOUD_GOLD, w: 10, dur: 32, x0: 0, x1: -60 },
          { d: 'M-50 170 C0 162 40 172 90 164 C130 158 160 168 200 160', color: CLOUD_WHITE, w: 12, dur: 24, x0: 0, x1: 100 },
          { d: 'M180 105 C220 96 260 108 300 98 C340 90 370 100 420 94', color: CLOUD_PINK, w: 8, dur: 30, x0: 0, x1: -70 },
          { d: 'M100 190 C140 182 180 192 220 184 C260 176 300 188 340 180', color: CLOUD_GOLD, w: 6, dur: 26, x0: 0, x1: 50 },
        ].map((cloud, i) => (
          <motion.path
            key={i}
            d={cloud.d}
            fill="none"
            stroke={cloud.color}
            strokeWidth={cloud.w}
            strokeLinecap="round"
            opacity="0.25"
            filter="url(#sunrise-blur-soft)"
            animate={{
              x: [cloud.x0, cloud.x1, cloud.x0],
              opacity: [0.15, 0.32, 0.18, 0.15],
            }}
            transition={{ duration: cloud.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SILK MIST — low-lying fog layers with parallax            */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { y: 300, opacity: 0.3, dur: 14, xDrift: 30 },
          { y: 320, opacity: 0.4, dur: 18, xDrift: -25 },
          { y: 340, opacity: 0.35, dur: 12, xDrift: 20 },
        ].map((mist, i) => (
          <motion.ellipse
            key={`mist-${i}`}
            cx="200"
            cy={mist.y}
            rx="240"
            ry="18"
            fill={MIST}
            opacity={mist.opacity}
            filter="url(#sunrise-blur-mist)"
            animate={{
              cx: [200, 200 + mist.xDrift, 200],
              opacity: [mist.opacity * 0.6, mist.opacity, mist.opacity * 0.7, mist.opacity * 0.6],
              ry: [18, 22, 16, 18],
            }}
            transition={{ duration: mist.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SILK LIGHT RIBBONS — flowing streaks of morning light     */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { d: 'M-20 210 C40 195 100 215 160 200 C220 185 280 205 350 190 C390 182 420 195 450 188', color: RAY_GOLD, dur: 16 },
          { d: 'M-30 230 C30 218 80 235 140 222 C200 210 260 228 330 215 C380 206 410 220 440 212', color: RAY_PINK, dur: 20 },
          { d: 'M-10 250 C50 240 110 255 180 242 C240 232 300 248 370 238', color: CLOUD_GOLD, dur: 14 },
        ].map((ribbon, i) => (
          <motion.path
            key={`ribbon-${i}`}
            d={ribbon.d}
            fill="none"
            stroke={ribbon.color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0"
            animate={{
              pathLength: [0, 0.7, 1, 0.8, 0],
              opacity: [0, 0.3, 0.45, 0.2, 0],
              x: [-20, 15, -20],
            }}
            transition={{ duration: ribbon.dur, delay: i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  LIGHT PARTICLES — golden motes rising                    */}
        {/* ══════════════════════════════════════════════════════════ */}
        <LightMote cx={120} cy={300} duration={6}   delay={0} />
        <LightMote cx={180} cy={310} duration={7}   delay={1} />
        <LightMote cx={230} cy={295} duration={5.5} delay={2} />
        <LightMote cx={280} cy={305} duration={6.5} delay={0.5} />
        <LightMote cx={150} cy={320} duration={7.5} delay={3} />
        <LightMote cx={200} cy={330} duration={6}   delay={1.5} />
        <LightMote cx={260} cy={315} duration={5}   delay={4} />
        <LightMote cx={100} cy={340} duration={8}   delay={2.5} />
        <LightMote cx={310} cy={325} duration={6.2} delay={3.5} />
        <LightMote cx={340} cy={290} duration={5.8} delay={1.2} />
        <LightMote cx={70}  cy={310} duration={7.2} delay={4.5} />
        <LightMote cx={350} cy={340} duration={6.8} delay={0.8} />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  FOREGROUND — dark silhouette ground + grass blades        */}
        {/* ══════════════════════════════════════════════════════════ */}
        <path
          d="M-10 360 C40 350 100 358 160 348 C220 340 280 352 340 344 C380 338 410 348 430 345 L430 410 L-10 410 Z"
          fill={HILL_NEAR}
          opacity="0.9"
        />
        {/* Grass-like blades on ridge */}
        {[30, 55, 82, 110, 145, 175, 210, 240, 275, 305, 338, 365, 395].map((x, i) => {
          const baseY = 350 + Math.sin(x * 0.05) * 8;
          const h = 10 + (i % 3) * 5;
          const sway = (i % 2 === 0 ? 3 : -3);
          return (
            <motion.line
              key={`grass-${i}`}
              x1={x} y1={baseY}
              x2={x + sway} y2={baseY - h}
              stroke={HILL_NEAR}
              strokeWidth={1.2}
              strokeLinecap="round"
              opacity="0.7"
              animate={{
                x2: [x + sway, x - sway, x + sway],
              }}
              transition={{ duration: 3 + (i % 4) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          );
        })}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  WARM COLOUR WASH — overall atmospheric overlay            */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.rect
          x="0" y="0" width="400" height="400"
          fill={SKY_GLOW}
          opacity="0.04"
          animate={{ opacity: [0.02, 0.08, 0.04, 0.02] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
