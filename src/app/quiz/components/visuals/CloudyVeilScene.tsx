'use client';

import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  CloudyVeilScene                                                     */
/*                                                                      */
/*  A fully animated pure-SVG scene depicting a soft overcast sky       */
/*  with layered drifting clouds, diffused light, mist, moisture        */
/*  droplets, distant landscape, and gentle wind movement.              */
/* ------------------------------------------------------------------ */

/* ── Colour tokens ── */
const SKY_TOP     = '#b8b8c8';
const SKY_MID     = '#c4c0d0';
const SKY_LOW     = '#d0ccd8';
const SKY_HORIZON = '#ddd8e2';
const CLOUD_DARK  = '#a8a0b8';
const CLOUD_MID   = '#beb8c8';
const CLOUD_LIGHT = '#d0c8d8';
const CLOUD_BRIGHT= '#ddd8e4';
const CLOUD_EDGE  = '#c8c0d4';
const LIGHT_BEAM  = '#e0dce8';
const LIGHT_WARM  = '#e8e0ea';
const MIST_A      = '#ccc6d4';
const MIST_B      = '#d8d2e0';
const HILL_FAR    = '#a09aac';
const HILL_MID    = '#908a9c';
const HILL_NEAR   = '#807a8e';
const MOISTURE    = '#d8d4e2';
const BIRD        = '#7a7488';

/* ── Distant bird silhouette ── */
function Bird({
  cx, cy, size, duration, delay, drift,
}: {
  cx: number; cy: number; size: number; duration: number; delay: number; drift: number;
}) {
  return (
    <motion.g
      animate={{
        x: [0, drift],
        y: [0, -8, 2, -5, 0],
        opacity: [0, 0.5, 0.6, 0.5, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.path
        d={`M${cx - size * 3} ${cy + size} Q${cx - size} ${cy - size * 2} ${cx} ${cy} Q${cx + size} ${cy - size * 2} ${cx + size * 3} ${cy + size}`}
        fill="none"
        stroke={BIRD}
        strokeWidth={size * 0.3}
        strokeLinecap="round"
        opacity="0.5"
        animate={{ d: [
          `M${cx - size * 3} ${cy + size} Q${cx - size} ${cy - size * 2} ${cx} ${cy} Q${cx + size} ${cy - size * 2} ${cx + size * 3} ${cy + size}`,
          `M${cx - size * 3} ${cy - size * 0.5} Q${cx - size} ${cy - size} ${cx} ${cy} Q${cx + size} ${cy - size} ${cx + size * 3} ${cy - size * 0.5}`,
          `M${cx - size * 3} ${cy + size} Q${cx - size} ${cy - size * 2} ${cx} ${cy} Q${cx + size} ${cy - size * 2} ${cx + size * 3} ${cy + size}`,
        ]}}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.g>
  );
}

/* ── Moisture droplet ── */
function MoistureDrop({
  cx, cy, duration, delay,
}: {
  cx: number; cy: number; duration: number; delay: number;
}) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={1.2}
      fill={MOISTURE}
      opacity="0"
      animate={{
        cy: [cy, cy + 40 + Math.random() * 30],
        cx: [cx, cx + (Math.random() - 0.5) * 12],
        opacity: [0, 0.45, 0.55, 0.3, 0],
        r: [0.8, 1.4, 1.2, 0.6],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function CloudyVeilScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="cloudy-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor={SKY_TOP} />
            <stop offset="35%" stopColor={SKY_MID} />
            <stop offset="70%" stopColor={SKY_LOW} />
            <stop offset="100%" stopColor={SKY_HORIZON} />
          </linearGradient>

          {/* Diffused light radial */}
          <radialGradient id="cloudy-diffuse" cx="55%" cy="30%" r="50%">
            <stop offset="0%"  stopColor={LIGHT_WARM} stopOpacity="0.6" />
            <stop offset="60%" stopColor={LIGHT_BEAM} stopOpacity="0.2" />
            <stop offset="100%" stopColor={LIGHT_BEAM} stopOpacity="0" />
          </radialGradient>

          {/* Cloud blur filters */}
          <filter id="cloudy-blur-heavy">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="cloudy-blur-soft">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="cloudy-blur-mist">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SKY BACKDROP                                              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <rect width="400" height="400" fill="url(#cloudy-sky)" />

        {/* Diffused light source — hidden sun behind clouds */}
        <motion.ellipse
          cx="220" cy="110" rx="120" ry="80"
          fill="url(#cloudy-diffuse)"
          animate={{
            rx: [120, 135, 125, 120],
            ry: [80, 90, 82, 80],
            opacity: [0.5, 0.7, 0.55, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  BACK CLOUD LAYER — high altitude overcast blanket         */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.g
          filter="url(#cloudy-blur-heavy)"
          animate={{ x: [-6, 10, -6] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M-60 50 C0 25 60 42 120 28 C180 15 230 38 290 22 C340 10 380 32 440 25 L440 120 L-60 120 Z"
            fill={CLOUD_DARK}
            opacity="0.7"
          />
          <motion.path
            d="M-40 70 C20 55 80 68 140 52 C200 38 250 58 310 44 C370 32 420 50 460 42"
            fill="none" stroke={CLOUD_MID} strokeWidth="22" strokeLinecap="round"
            opacity="0.35"
            animate={{ opacity: [0.25, 0.45, 0.3, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  MID CLOUD LAYER — main overcast body                      */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.g
          animate={{ x: [4, -8, 4], y: [0, 3, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Big cloud mass */}
          <path
            d="M-40 95 C10 70 50 82 100 65 C150 50 190 74 240 58 C290 44 330 68 380 55 C420 46 450 62 460 72 L460 170 L-40 170 Z"
            fill={CLOUD_MID}
            opacity="0.75"
          />
          {/* Highlight band — where light filters through */}
          <motion.path
            d="M40 90 C100 78 160 92 220 80 C280 68 340 86 400 74"
            fill="none" stroke={CLOUD_BRIGHT} strokeWidth="16" strokeLinecap="round"
            opacity="0.3"
            filter="url(#cloudy-blur-soft)"
            animate={{ opacity: [0.2, 0.42, 0.25, 0.2], x: [-5, 8, -5] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  CLOUD UNDERBELLY — textured rolling shapes                */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { d: 'M-20 125 C30 108 70 120 120 105 C170 92 210 112 260 98 C310 86 350 105 410 92 L410 155 L-20 155 Z', fill: CLOUD_LIGHT, opacity: 0.6, dur: 18, xDrift: 12 },
          { d: 'M-30 145 C20 132 60 142 110 128 C160 116 200 135 250 122 C300 112 350 130 420 118 L420 180 L-30 180 Z', fill: CLOUD_EDGE, opacity: 0.5, dur: 24, xDrift: -10 },
        ].map((cloud, i) => (
          <motion.path
            key={`underbelly-${i}`}
            d={cloud.d}
            fill={cloud.fill}
            opacity={cloud.opacity}
            animate={{ x: [0, cloud.xDrift, 0] }}
            transition={{ duration: cloud.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Scalloped cloud bottoms */}
        {[130, 148, 165].map((y, i) => (
          <motion.path
            key={`scallop-${i}`}
            d={`M${-20 + i * 10} ${y} C${30 + i * 5} ${y - 12} ${60} ${y + 5} ${100 + i * 8} ${y - 8} C${150} ${y + 6} ${190 - i * 5} ${y - 10} ${240} ${y + 4} S${330} ${y - 8} ${420} ${y + 2}`}
            fill="none"
            stroke={CLOUD_BRIGHT}
            strokeWidth={2 - i * 0.3}
            strokeLinecap="round"
            opacity={0.2 + i * 0.05}
            animate={{
              x: [0, 6 * (i % 2 === 0 ? 1 : -1), 0],
              opacity: [0.15 + i * 0.05, 0.3 + i * 0.05, 0.15 + i * 0.05],
            }}
            transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  LIGHT SHAFTS — diffused beams filtering through gaps     */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { x1: 180, x2: 155, w: 35, dur: 14, delay: 0 },
          { x1: 240, x2: 260, w: 28, dur: 16, delay: 3 },
          { x1: 130, x2: 110, w: 22, dur: 12, delay: 6 },
          { x1: 310, x2: 330, w: 18, dur: 18, delay: 2 },
        ].map((beam, i) => (
          <motion.line
            key={`beam-${i}`}
            x1={beam.x1} y1="140"
            x2={beam.x2} y2="350"
            stroke={LIGHT_BEAM}
            strokeWidth={beam.w}
            strokeLinecap="round"
            opacity="0"
            filter="url(#cloudy-blur-heavy)"
            animate={{
              opacity: [0.02, 0.1, 0.14, 0.08, 0.02],
              strokeWidth: [beam.w * 0.7, beam.w, beam.w * 0.85, beam.w * 0.7],
            }}
            transition={{ duration: beam.dur, delay: beam.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  FLOATING CLOUD WISPS — mid-air drifting fragments        */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { d: 'M-40 195 C20 185 60 198 110 188 C160 178 200 195 250 185', dur: 20, x1: 60, y: 0 },
          { d: 'M100 215 C160 205 200 218 260 208 C310 198 350 215 410 205', dur: 25, x1: -50, y: 0 },
          { d: 'M-20 240 C40 232 80 242 140 234 C190 226 230 240 280 232', dur: 18, x1: 70, y: 0 },
          { d: 'M160 260 C220 252 260 264 310 256 C360 248 400 262 450 254', dur: 22, x1: -40, y: 0 },
        ].map((wisp, i) => (
          <motion.path
            key={`wisp-${i}`}
            d={wisp.d}
            fill="none"
            stroke={CLOUD_LIGHT}
            strokeWidth={8 - i}
            strokeLinecap="round"
            opacity="0.22"
            filter="url(#cloudy-blur-soft)"
            animate={{
              x: [0, wisp.x1, 0],
              opacity: [0.12, 0.28, 0.15, 0.12],
            }}
            transition={{ duration: wisp.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  DISTANT LANDSCAPE — barely visible through haze           */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.path
          d="M-20 310 C40 290 90 298 150 282 C210 268 260 288 320 275 C370 264 400 280 430 272 L430 340 L-20 340 Z"
          fill={HILL_FAR}
          opacity="0.3"
          filter="url(#cloudy-blur-soft)"
          animate={{ opacity: [0.2, 0.35, 0.25, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M-10 330 C50 312 100 322 160 308 C220 296 270 316 330 304 C380 294 420 310 440 305 L440 380 L-10 380 Z"
          fill={HILL_MID}
          opacity="0.35"
          animate={{ x: [-2, 3, -2], opacity: [0.28, 0.42, 0.28] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M-20 355 C40 342 100 352 160 340 C220 330 280 345 340 335 C390 328 420 340 450 336 L450 410 L-20 410 Z"
          fill={HILL_NEAR}
          opacity="0.45"
          animate={{ x: [0, -3, 2, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  LOW MIST / FOG LAYERS                                     */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { cy: 300, rx: 220, ry: 22, color: MIST_A, dur: 16, xDrift: 25 },
          { cy: 330, rx: 250, ry: 28, color: MIST_B, dur: 20, xDrift: -20 },
          { cy: 360, rx: 230, ry: 24, color: MIST_A, dur: 14, xDrift: 30 },
          { cy: 280, rx: 180, ry: 18, color: MIST_B, dur: 18, xDrift: -15 },
        ].map((mist, i) => (
          <motion.ellipse
            key={`mist-${i}`}
            cx="200" cy={mist.cy} rx={mist.rx} ry={mist.ry}
            fill={mist.color}
            opacity="0.2"
            filter="url(#cloudy-blur-mist)"
            animate={{
              cx: [200, 200 + mist.xDrift, 200],
              opacity: [0.12, 0.25, 0.15, 0.12],
              ry: [mist.ry, mist.ry + 6, mist.ry - 2, mist.ry],
            }}
            transition={{ duration: mist.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  DISTANT BIRDS — tiny silhouettes drifting                  */}
        {/* ══════════════════════════════════════════════════════════ */}
        <Bird cx={100} cy={180} size={3}   duration={18} delay={0}   drift={120} />
        <Bird cx={80}  cy={190} size={2.5} duration={20} delay={1.5} drift={130} />
        <Bird cx={120} cy={175} size={2}   duration={16} delay={3}   drift={100} />
        <Bird cx={250} cy={200} size={2.5} duration={22} delay={5}   drift={-110} />
        <Bird cx={270} cy={195} size={2}   duration={19} delay={7}   drift={-90} />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  MOISTURE DROPLETS — tiny particles suspended in air       */}
        {/* ══════════════════════════════════════════════════════════ */}
        <MoistureDrop cx={60}  cy={160} duration={8}   delay={0} />
        <MoistureDrop cx={130} cy={180} duration={7}   delay={1} />
        <MoistureDrop cx={200} cy={170} duration={9}   delay={2} />
        <MoistureDrop cx={270} cy={185} duration={6.5} delay={0.5} />
        <MoistureDrop cx={340} cy={175} duration={8.5} delay={3} />
        <MoistureDrop cx={90}  cy={220} duration={7.5} delay={1.5} />
        <MoistureDrop cx={160} cy={240} duration={6}   delay={4} />
        <MoistureDrop cx={230} cy={230} duration={8}   delay={2.5} />
        <MoistureDrop cx={310} cy={210} duration={7.2} delay={3.5} />
        <MoistureDrop cx={370} cy={250} duration={6.8} delay={1.2} />
        <MoistureDrop cx={50}  cy={260} duration={9}   delay={4.5} />
        <MoistureDrop cx={180} cy={275} duration={7}   delay={0.8} />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  GENTLE WIND CURRENTS — subtle air movement lines          */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { y: 200, dur: 12, delay: 0 },
          { y: 230, dur: 15, delay: 2 },
          { y: 260, dur: 10, delay: 4 },
          { y: 290, dur: 14, delay: 1 },
        ].map((w, i) => (
          <motion.path
            key={`wind-${i}`}
            d={`M-30 ${w.y} C40 ${w.y - 6} 100 ${w.y + 4} 160 ${w.y - 3} S280 ${w.y + 5} 430 ${w.y - 2}`}
            fill="none"
            stroke={CLOUD_EDGE}
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0"
            animate={{
              pathLength: [0, 0.5, 0.8, 0.4, 0],
              opacity: [0, 0.18, 0.25, 0.12, 0],
              x: [-20, 30, -20],
            }}
            transition={{ duration: w.dur, delay: w.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  ATMOSPHERIC COLOUR WASH                                   */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.rect
          x="0" y="0" width="400" height="400"
          fill={SKY_MID}
          opacity="0.03"
          animate={{ opacity: [0.02, 0.06, 0.03, 0.02] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}
