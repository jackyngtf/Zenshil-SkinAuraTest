'use client';

import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  HumidStormScene                                                     */
/*                                                                      */
/*  A fully animated pure-SVG scene depicting a humid, oppressive       */
/*  storm with heavy clouds, lightning, driving rain, turbulent         */
/*  waves, swirling pressure fronts, and electric tension.              */
/* ------------------------------------------------------------------ */

/* ── Colour tokens ── */
const SKY_TOP     = '#1a1428';
const SKY_MID     = '#2d2240';
const SKY_LOW     = '#4a3558';
const SKY_HORIZON = '#6b4a6e';
const CLOUD_DARK  = '#2a2038';
const CLOUD_MID   = '#3d2f50';
const CLOUD_LIGHT = '#5a4570';
const CLOUD_EDGE  = '#7a6090';
const LIGHTNING_A = '#e8dff8';
const LIGHTNING_B = '#d0c0f0';
const RAIN_HEAVY  = '#8878a8';
const RAIN_LIGHT  = '#a898c0';
const WAVE_DARK   = '#2a2040';
const WAVE_MID    = '#3d3058';
const WAVE_FOAM   = '#6a5880';
const MIST_PURPLE = '#5a4068';
const PRESSURE    = '#8060a0';
const DROPLET     = '#b8a8d8';

/* ── Lightning bolt component ── */
function LightningBolt({
  path, duration, delay, width,
}: {
  path: string; duration: number; delay: number; width: number;
}) {
  // Build a sparse keyframe array: mostly 0 opacity with brief flashes
  const opacityKeys = [0, 0, 0, 0.9, 1, 0.5, 0, 0, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0, 0, 0];
  return (
    <motion.path
      d={path}
      fill="none"
      stroke={LIGHTNING_A}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0"
      filter="url(#storm-glow)"
      animate={{ opacity: opacityKeys }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear', times: undefined }}
    />
  );
}

/* ── Rain streak column ── */
function RainColumn({
  x, count, speed, heaviness,
}: {
  x: number; count: number; speed: number; heaviness: 'heavy' | 'light';
}) {
  const color = heaviness === 'heavy' ? RAIN_HEAVY : RAIN_LIGHT;
  const w = heaviness === 'heavy' ? 1.5 : 0.8;
  const h = heaviness === 'heavy' ? 28 : 18;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const startY = -20 - i * (400 / count);
        const xOff = (i % 3 - 1) * 4;
        return (
          <motion.line
            key={i}
            x1={x + xOff} y1={startY}
            x2={x + xOff + 6} y2={startY + h}
            stroke={color}
            strokeWidth={w}
            strokeLinecap="round"
            opacity="0"
            animate={{
              y: [0, 450],
              opacity: [0, 0.55, 0.6, 0.4, 0],
            }}
            transition={{
              duration: speed,
              delay: i * (speed / count) * 0.7,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );
      })}
    </>
  );
}

export default function HumidStormScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="storm-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor={SKY_TOP} />
            <stop offset="35%" stopColor={SKY_MID} />
            <stop offset="70%" stopColor={SKY_LOW} />
            <stop offset="100%" stopColor={SKY_HORIZON} />
          </linearGradient>

          {/* Lightning glow filter */}
          <filter id="storm-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Cloud blur */}
          <filter id="storm-cloud-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id="storm-mist-blur">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          {/* Flash overlay filter */}
          <filter id="storm-flash">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SKY BACKDROP                                              */}
        {/* ══════════════════════════════════════════════════════════ */}
        <rect width="400" height="400" fill="url(#storm-sky)" />

        {/* Atmospheric pressure gradient */}
        <motion.rect
          x="0" y="0" width="400" height="400"
          fill={PRESSURE}
          opacity="0.04"
          animate={{ opacity: [0.02, 0.08, 0.03, 0.06, 0.02] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  BACK CLOUD LAYER — massive looming masses                 */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.g
          filter="url(#storm-cloud-blur)"
          animate={{ x: [-8, 12, -8], y: [0, -4, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M-40 80 C20 40 70 55 120 35 C170 18 210 48 260 28 C310 12 350 40 400 30 C440 22 460 50 460 80 L460 160 L-40 160 Z"
            fill={CLOUD_DARK}
            opacity="0.9"
          />
          {/* Cloud underbelly highlights */}
          <motion.path
            d="M30 100 C70 88 120 95 170 85 C220 76 260 92 310 82 C350 74 390 88 430 80"
            fill="none" stroke={CLOUD_MID} strokeWidth="18" strokeLinecap="round"
            opacity="0.4"
            animate={{ opacity: [0.25, 0.5, 0.3, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  MID CLOUD LAYER — turbulent rolling forms                 */}
        {/* ══════════════════════════════════════════════════════════ */}
        <motion.g
          animate={{ x: [5, -10, 5], y: [-2, 3, -2] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Massive cumulonimbus shape */}
          <path
            d="M-20 130 C10 100 50 110 90 95 C130 82 160 105 200 88 C240 72 280 98 320 85 C360 74 400 95 440 90 L440 200 L-20 200 Z"
            fill={CLOUD_MID}
            opacity="0.82"
          />
          {/* Internal turbulence swirls */}
          {[
            'M40 120 C80 108 110 125 150 112',
            'M180 105 C220 92 260 110 300 98',
            'M280 115 C320 102 360 118 400 105',
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none" stroke={CLOUD_LIGHT} strokeWidth={10 + i * 2} strokeLinecap="round"
              opacity="0.25"
              filter="url(#storm-cloud-blur)"
              animate={{
                x: [0, 8 * (i % 2 === 0 ? 1 : -1), 0],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  FRONT CLOUD WISPS — low pressure tendrils                 */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { d: 'M-30 155 C30 140 80 158 140 142 C190 130 230 150 280 138 C330 126 370 148 430 135', dur: 18, x1: 25 },
          { d: 'M-20 180 C40 168 90 182 150 170 C210 158 260 176 320 164 C370 154 410 170 450 160', dur: 22, x1: -20 },
          { d: 'M-40 200 C20 190 70 205 130 192 C190 180 240 198 300 186 C360 176 400 195 450 185', dur: 15, x1: 30 },
        ].map((c, i) => (
          <motion.path
            key={`wisp-${i}`}
            d={c.d}
            fill="none"
            stroke={CLOUD_EDGE}
            strokeWidth={6 - i}
            strokeLinecap="round"
            opacity="0.3"
            filter="url(#storm-cloud-blur)"
            animate={{ x: [0, c.x1, 0], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  LIGHTNING BOLTS                                           */}
        {/* ══════════════════════════════════════════════════════════ */}

        {/* Main bolt — left side */}
        <LightningBolt
          path="M120 95 L115 130 L128 128 L118 165 L132 162 L110 210"
          duration={9} delay={0} width={2.5}
        />
        {/* Branch bolt */}
        <LightningBolt
          path="M118 165 L140 155 L148 180"
          duration={9} delay={0} width={1.5}
        />

        {/* Secondary bolt — right side */}
        <LightningBolt
          path="M290 85 L285 118 L298 115 L288 152 L302 148 L282 195"
          duration={12} delay={4} width={2}
        />

        {/* Subtle sheet lightning — background glow */}
        <motion.rect
          x="0" y="0" width="400" height="200"
          fill={LIGHTNING_B}
          opacity="0"
          filter="url(#storm-flash)"
          animate={{
            opacity: [0, 0, 0, 0.12, 0.2, 0, 0, 0, 0, 0, 0.08, 0, 0, 0, 0, 0, 0, 0.15, 0.06, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  RAIN — driving diagonal sheets                            */}
        {/* ══════════════════════════════════════════════════════════ */}
        <g style={{ transform: 'rotate(8deg)', transformOrigin: '200px 200px' }}>
          <RainColumn x={15}  count={8} speed={1.0} heaviness="heavy" />
          <RainColumn x={45}  count={7} speed={1.1} heaviness="light" />
          <RainColumn x={75}  count={8} speed={0.9} heaviness="heavy" />
          <RainColumn x={105} count={6} speed={1.2} heaviness="light" />
          <RainColumn x={135} count={8} speed={1.0} heaviness="heavy" />
          <RainColumn x={165} count={7} speed={1.1} heaviness="light" />
          <RainColumn x={195} count={8} speed={0.85} heaviness="heavy" />
          <RainColumn x={225} count={6} speed={1.15} heaviness="light" />
          <RainColumn x={255} count={8} speed={0.95} heaviness="heavy" />
          <RainColumn x={285} count={7} speed={1.05} heaviness="light" />
          <RainColumn x={315} count={8} speed={1.0} heaviness="heavy" />
          <RainColumn x={345} count={6} speed={1.2} heaviness="light" />
          <RainColumn x={375} count={7} speed={0.9} heaviness="heavy" />
        </g>

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  TURBULENT WAVES — churning water at bottom                */}
        {/* ══════════════════════════════════════════════════════════ */}
        {/* Far wave */}
        <motion.path
          d="M-30 310 C20 295 60 308 110 292 C160 278 200 300 260 285 C310 272 350 295 410 280 L410 340 L-30 340 Z"
          fill={WAVE_DARK}
          opacity="0.7"
          animate={{
            d: [
              'M-30 310 C20 295 60 308 110 292 C160 278 200 300 260 285 C310 272 350 295 410 280 L410 340 L-30 340 Z',
              'M-30 308 C20 298 60 302 110 296 C160 282 200 296 260 288 C310 276 350 292 410 284 L410 340 L-30 340 Z',
              'M-30 310 C20 295 60 308 110 292 C160 278 200 300 260 285 C310 272 350 295 410 280 L410 340 L-30 340 Z',
            ],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Mid wave */}
        <motion.path
          d="M-20 330 C30 315 70 328 130 312 C190 298 230 320 290 305 C340 292 380 315 430 300 L430 370 L-20 370 Z"
          fill={WAVE_MID}
          opacity="0.8"
          animate={{
            d: [
              'M-20 330 C30 315 70 328 130 312 C190 298 230 320 290 305 C340 292 380 315 430 300 L430 370 L-20 370 Z',
              'M-20 326 C30 318 70 322 130 316 C190 302 230 316 290 308 C340 296 380 312 430 304 L430 370 L-20 370 Z',
              'M-20 330 C30 315 70 328 130 312 C190 298 230 320 290 305 C340 292 380 315 430 300 L430 370 L-20 370 Z',
            ],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Near wave with foam */}
        <motion.path
          d="M-10 355 C40 342 80 358 140 340 C200 325 250 348 310 332 C360 320 400 340 440 330 L440 410 L-10 410 Z"
          fill={WAVE_DARK}
          opacity="0.92"
          animate={{
            d: [
              'M-10 355 C40 342 80 358 140 340 C200 325 250 348 310 332 C360 320 400 340 440 330 L440 410 L-10 410 Z',
              'M-10 350 C40 345 80 350 140 344 C200 330 250 344 310 336 C360 324 400 336 440 334 L440 410 L-10 410 Z',
              'M-10 355 C40 342 80 358 140 340 C200 325 250 348 310 332 C360 320 400 340 440 330 L440 410 L-10 410 Z',
            ],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Foam highlights on wave crests */}
        {[
          { d1: 'M60 352 C90 345 110 350 140 342', d2: 'M60 348 C90 348 110 345 140 346', dur: 3.5 },
          { d1: 'M200 338 C230 330 260 340 290 332', d2: 'M200 335 C230 334 260 336 290 336', dur: 3 },
          { d1: 'M340 330 C370 322 390 332 420 325', d2: 'M340 328 C370 326 390 328 420 328', dur: 3.8 },
        ].map((foam, i) => (
          <motion.path
            key={`foam-${i}`}
            d={foam.d1}
            fill="none"
            stroke={WAVE_FOAM}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
            animate={{
              d: [foam.d1, foam.d2, foam.d1],
              opacity: [0.25, 0.55, 0.25],
            }}
            transition={{ duration: foam.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SWIRLING PRESSURE FRONTS — rotating vortex hints          */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { cx: 140, cy: 160, r: 40, dur: 20 },
          { cx: 280, cy: 140, r: 35, dur: 25 },
        ].map((vortex, i) => (
          <motion.g key={`vortex-${i}`}>
            <motion.circle
              cx={vortex.cx} cy={vortex.cy} r={vortex.r}
              fill="none"
              stroke={PRESSURE}
              strokeWidth="1"
              strokeDasharray="8 12"
              opacity="0.2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: vortex.dur, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${vortex.cx}px ${vortex.cy}px` }}
            />
            <motion.circle
              cx={vortex.cx} cy={vortex.cy} r={vortex.r * 0.6}
              fill="none"
              stroke={PRESSURE}
              strokeWidth="0.8"
              strokeDasharray="5 10"
              opacity="0.15"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: vortex.dur * 0.7, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${vortex.cx}px ${vortex.cy}px` }}
            />
          </motion.g>
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  HUMIDITY MIST — purple haze rising                        */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { cx: 100, cy: 280, rx: 80, ry: 25, dur: 10, delay: 0 },
          { cx: 250, cy: 300, rx: 100, ry: 30, dur: 13, delay: 2 },
          { cx: 350, cy: 270, rx: 70, ry: 20, dur: 11, delay: 4 },
        ].map((m, i) => (
          <motion.ellipse
            key={`hmist-${i}`}
            cx={m.cx} cy={m.cy} rx={m.rx} ry={m.ry}
            fill={MIST_PURPLE}
            opacity="0.15"
            filter="url(#storm-mist-blur)"
            animate={{
              cy: [m.cy, m.cy - 18, m.cy],
              opacity: [0.1, 0.25, 0.1],
              rx: [m.rx, m.rx + 15, m.rx],
            }}
            transition={{ duration: m.dur, delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  SPLASH DROPLETS — rain hitting water surface              */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { cx: 60,  cy: 350, dur: 3, delay: 0 },
          { cx: 140, cy: 340, dur: 2.5, delay: 0.8 },
          { cx: 220, cy: 345, dur: 3.2, delay: 1.5 },
          { cx: 300, cy: 335, dur: 2.8, delay: 0.3 },
          { cx: 370, cy: 342, dur: 3.5, delay: 2 },
          { cx: 100, cy: 355, dur: 2.6, delay: 1.2 },
          { cx: 260, cy: 350, dur: 3.1, delay: 0.6 },
          { cx: 340, cy: 348, dur: 2.9, delay: 1.8 },
        ].map((splash, i) => (
          <motion.circle
            key={`splash-${i}`}
            cx={splash.cx} cy={splash.cy}
            r="1"
            fill="none"
            stroke={DROPLET}
            strokeWidth="0.8"
            opacity="0"
            animate={{
              r: [1, 8, 14],
              opacity: [0.5, 0.3, 0],
              strokeWidth: [1, 0.5, 0.2],
            }}
            transition={{
              duration: splash.dur,
              delay: splash.delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* ══════════════════════════════════════════════════════════ */}
        {/*  WIND STREAKS — horizontal pressure lines                  */}
        {/* ══════════════════════════════════════════════════════════ */}
        {[
          { y: 220, dur: 4, delay: 0 },
          { y: 245, dur: 5, delay: 1 },
          { y: 265, dur: 3.5, delay: 2.5 },
          { y: 235, dur: 4.5, delay: 0.5 },
          { y: 255, dur: 3.8, delay: 1.8 },
        ].map((w, i) => (
          <motion.line
            key={`wind-${i}`}
            x1="-40" y1={w.y}
            x2="40" y2={w.y - 3}
            stroke={RAIN_LIGHT}
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0"
            animate={{
              x1: [-40, 440],
              x2: [40, 520],
              opacity: [0, 0.3, 0.4, 0.2, 0],
            }}
            transition={{ duration: w.dur, delay: w.delay, repeat: Infinity, ease: 'easeIn' }}
          />
        ))}
      </svg>
    </div>
  );
}
