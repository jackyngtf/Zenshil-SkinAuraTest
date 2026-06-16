'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';

/* ================================================================== */
/*  Q9 · B 緊緻細滑 — TAUT PEARL-SATIN SURFACE (firm + smooth)          */
/*                                                                     */
/*  REPLACES the rejected dead-centre grey pearl SPHERE. The ideal     */
/*  "firm + smooth + refined" skin reads here as a luminous, taut,     */
/*  pearl-satin SURFACE filling the whole frame — NOT a centred ball.  */
/*                                                                     */
/*  Built from flowing smooth planes, lit upper-left → soft shadow     */
/*  lower-right so the surface has gentle form (a taut sheet, not flat */
/*  paper, not a curtain):                                             */
/*    1. BASE — pearl-cream/champagne field with a soft diagonal       */
/*       luminance (light UL, soft warm-grey shadow LR).               */
/*    2. SATIN SWEEPS — 3 broad, smooth, overlapping taut folds with   */
/*       pearlescent cool-blue / soft-rose highlights + warm-grey fold */
/*       shadows. They breathe very subtly (slow d-morph / few-px).    */
/*    3. SPECULAR SHEEN (signature) — a soft bright highlight band     */
/*       that slowly SWEEPS diagonally across the surface, giving the  */
/*       polished-smooth read.                                         */
/*    4. CREST LINES — a couple of crisp, faint highlight lines along  */
/*       a fold crest for refinement.                                  */
/*                                                                     */
/*  CONFIRM (~0.6s one-shot, ease [0.32,0.94,0.4,1]): the surface      */
/*  firms/lifts — a clean bright sheen pulse sweeps through + the      */
/*  whole field brightens/tautens a touch (the ideal realized).        */
/*  reduceMotion: parked at a representative static mid state.         */
/* ================================================================== */

const CONFIRM_EASE: [number, number, number, number] = [0.32, 0.94, 0.4, 1];

/* First-frame fold paths (entrance starts from these; identical command
   structure to every animated keyframe so morphs stay seamless). */
const SWEEP_TOP_0 =
  'M-20 162 C90 138 170 146 250 132 C320 120 372 138 420 120 L420 -20 L-20 -20 Z';
const SWEEP_MID_0 =
  'M-20 262 C70 238 150 254 232 240 C312 226 366 248 420 232 L420 134 C366 156 312 138 232 154 C150 170 70 152 -20 176 Z';
const SWEEP_LOW_0 =
  'M-20 420 L420 420 L420 310 C360 330 300 314 224 328 C150 342 70 324 -20 348 Z';

export default function Q9FirmScene({ isConfirming }: { isConfirming: boolean }) {
  const reduceMotion = useReducedMotion();

  /* Slow premium idle loop helper. */
  const loop = (duration: number, delay = 0): Transition =>
    reduceMotion
      ? { duration: 0 }
      : { duration, delay, repeat: Infinity, ease: 'easeInOut' };
  /* One-shot firm/lift on confirm. */
  const firm = (duration: number, delay = 0): Transition =>
    reduceMotion ? { duration: 0 } : { duration, delay, ease: CONFIRM_EASE };

  /* ── BASE field: gentle breathing brighten ── */
  const baseAnimate = isConfirming
    ? { opacity: 1, scale: 1.015 }
    : reduceMotion
      ? { opacity: 0.97, scale: 1 }
      : { opacity: [0.94, 1, 0.94], scale: [1, 1.008, 1] };

  /* ── SATIN SWEEPS: taut fold paths breathe in place (identical command
     structure across keyframes; first frame === last frame). ── */
  const sweepTop = isConfirming
    ? 'M-20 150 C90 118 170 132 250 116 C320 102 372 120 420 100 L420 -20 L-20 -20 Z'
    : reduceMotion
      ? 'M-20 158 C90 130 170 142 250 126 C320 113 372 130 420 112 L420 -20 L-20 -20 Z'
      : [
          'M-20 162 C90 138 170 146 250 132 C320 120 372 138 420 120 L420 -20 L-20 -20 Z',
          'M-20 154 C90 124 170 140 250 122 C320 106 372 124 420 106 L420 -20 L-20 -20 Z',
          'M-20 162 C90 138 170 146 250 132 C320 120 372 138 420 120 L420 -20 L-20 -20 Z',
        ];

  const sweepMid = isConfirming
    ? 'M-20 252 C70 224 150 244 232 226 C312 209 366 238 420 218 L420 120 C366 142 312 124 232 140 C150 156 70 138 -20 162 Z'
    : reduceMotion
      ? 'M-20 258 C70 232 150 250 232 234 C312 218 366 244 420 226 L420 128 C366 150 312 132 232 148 C150 164 70 146 -20 170 Z'
      : [
          'M-20 262 C70 238 150 254 232 240 C312 226 366 248 420 232 L420 134 C366 156 312 138 232 154 C150 170 70 152 -20 176 Z',
          'M-20 254 C70 226 150 248 232 228 C312 210 366 240 420 220 L420 122 C366 144 312 126 232 142 C150 158 70 140 -20 164 Z',
          'M-20 262 C70 238 150 254 232 240 C312 226 366 248 420 232 L420 134 C366 156 312 138 232 154 C150 170 70 152 -20 176 Z',
        ];

  const sweepLow = isConfirming
    ? 'M-20 420 L420 420 L420 300 C360 320 300 304 224 318 C150 332 70 314 -20 338 Z'
    : reduceMotion
      ? 'M-20 420 L420 420 L420 306 C360 326 300 310 224 324 C150 338 70 320 -20 344 Z'
      : [
          'M-20 420 L420 420 L420 310 C360 330 300 314 224 328 C150 342 70 324 -20 348 Z',
          'M-20 420 L420 420 L420 302 C360 322 300 306 224 320 C150 334 70 316 -20 340 Z',
          'M-20 420 L420 420 L420 310 C360 330 300 314 224 328 C150 342 70 324 -20 348 Z',
        ];

  /* Subtle drift on the sweeps (firm, not floppy — only a few px). The
     taut-fold breathing rides in the animated `d` so the path morphs
     with identical command structure + seamless loop. */
  const sweepTopMotion = isConfirming
    ? { d: sweepTop, opacity: 0.92, x: 0, y: -3 }
    : reduceMotion
      ? { d: sweepTop, opacity: 0.85, x: 0, y: 0 }
      : { d: sweepTop, opacity: [0.78, 0.9, 0.78], x: [-3, 3, -3], y: [2, -2, 2] };
  const sweepMidMotion = isConfirming
    ? { d: sweepMid, opacity: 0.9, x: 0, y: -2 }
    : reduceMotion
      ? { d: sweepMid, opacity: 0.82, x: 0, y: 0 }
      : { d: sweepMid, opacity: [0.74, 0.88, 0.74], x: [3, -3, 3], y: [-2, 2, -2] };
  const sweepLowMotion = isConfirming
    ? { d: sweepLow, opacity: 0.94, x: 0, y: 2 }
    : reduceMotion
      ? { d: sweepLow, opacity: 0.86, x: 0, y: 0 }
      : { d: sweepLow, opacity: [0.8, 0.92, 0.8], x: [-2, 2, -2], y: [2, -2, 2] };

  /* ── SPECULAR SHEEN (signature): a soft bright band that sweeps
     diagonally across the surface. Idle = slow full sweep across; on
     confirm = a fast clean pulse through the middle. ── */
  const sheenAnimate = isConfirming
    ? { x: 70, y: 0, opacity: 1, scaleY: 1.06 }
    : reduceMotion
      ? { x: 10, y: -10, opacity: 0.7, scaleY: 1 }
      : { x: [-160, 160, -160], y: [64, -64, 64], opacity: [0.5, 0.92, 0.5], scaleY: [1, 1.06, 1] };
  const sheenTransition: Transition = isConfirming ? firm(0.6) : loop(7.2);

  /* ── CREST LINES: thin bright refinement highlights along a fold. ── */
  const crestAnimate = isConfirming
    ? { opacity: 0.7, x: 6 }
    : reduceMotion
      ? { opacity: 0.42, x: 0 }
      : { opacity: [0.28, 0.5, 0.28], x: [-4, 4, -4] };

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* BASE luminance: bright pearl-white UL → soft champagne mid →
            deeper warm-grey LR. Widened value range for sculpted form. */}
        <linearGradient id="q9firm-base" x1="14%" y1="8%" x2="86%" y2="94%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#fdf4e8" />
          <stop offset="64%" stopColor="#f3ead9" />
          <stop offset="86%" stopColor="#e4ddd1" />
          <stop offset="100%" stopColor="#d8d0c4" />
        </linearGradient>
        {/* Cool-pearlescent highlight wash for the upper sweep — brighter
            white crest, stronger soft-blue iridescence, deeper fold base. */}
        <linearGradient id="q9firm-satinCool" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="30%" stopColor="#eef4ff" stopOpacity="0.82" />
          <stop offset="56%" stopColor="#dbeafe" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#d8d0c4" stopOpacity="0.32" />
        </linearGradient>
        {/* Pearl-cream sweep with a deeper warm-grey fold shadow at its base. */}
        <linearGradient id="q9firm-satinCream" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="52%" stopColor="#fdf4e8" stopOpacity="0.66" />
          <stop offset="100%" stopColor="#d8d0c4" stopOpacity="0.55" />
        </linearGradient>
        {/* Soft-rose pearlescent lower sweep, settling into deep warm shadow. */}
        <linearGradient id="q9firm-satinRose" x1="6%" y1="0%" x2="94%" y2="100%">
          <stop offset="0%" stopColor="#fce7f3" stopOpacity="0.78" />
          <stop offset="38%" stopColor="#fdeef2" stopOpacity="0.58" />
          <stop offset="100%" stopColor="#d8d0c4" stopOpacity="0.62" />
        </linearGradient>
        {/* Bright specular band — clear → pearl-cool flank → hot white core
            → pearl-rose flank → clear (iridescent polished sheen). */}
        <linearGradient id="q9firm-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="34%" stopColor="#dbeafe" stopOpacity="0.65" />
          <stop offset="46%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="54%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="66%" stopColor="#fce7f3" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Soft warm-grey lower-right shading to round the taut surface off
            (deeper core for clearer form). */}
        <radialGradient id="q9firm-shade" cx="80%" cy="88%" r="66%">
          <stop offset="0%" stopColor="#d8d0c4" stopOpacity="0.62" />
          <stop offset="54%" stopColor="#d8d0c4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#d8d0c4" stopOpacity="0" />
        </radialGradient>
        {/* Bright pearl glow in the upper-left to lift the highlight zone. */}
        <radialGradient id="q9firm-glow" cx="26%" cy="20%" r="58%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="46%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Soft blur welds the satin sweeps into smooth folds (static). */}
        <filter id="q9firm-bSoft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        {/* Tighter blur keeps the sheen a defined bright band, not a haze. */}
        <filter id="q9firm-bSheen" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        {/* Gentle blur for the lower-right rounding shade. */}
        <filter id="q9firm-bShade" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        {/* Gentle blur for the upper-left pearl glow. */}
        <filter id="q9firm-bGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      {/* ── 1. BASE luminous field (fills the frame, soft diagonal form) ── */}
      <motion.rect
        x={-20}
        y={-20}
        width={440}
        height={440}
        fill="url(#q9firm-base)"
        initial={{ opacity: 0, scale: 1 }}
        animate={baseAnimate}
        transition={isConfirming ? firm(0.6) : loop(8)}
        style={{ transformOrigin: '200px 200px' }}
      />

      {/* Lower-right rounding shade — keeps the surface from reading flat. */}
      <rect
        x={-20}
        y={-20}
        width={440}
        height={440}
        fill="url(#q9firm-shade)"
        filter="url(#q9firm-bShade)"
      />

      {/* Upper-left pearl glow — lifts the highlight zone for luminous form. */}
      <motion.rect
        x={-20}
        y={-20}
        width={440}
        height={440}
        fill="url(#q9firm-glow)"
        filter="url(#q9firm-bGlow)"
        initial={{ opacity: 0 }}
        animate={
          isConfirming
            ? { opacity: 0.95 }
            : reduceMotion
              ? { opacity: 0.7 }
              : { opacity: [0.6, 0.82, 0.6] }
        }
        transition={isConfirming ? firm(0.6) : loop(8.4)}
      />

      {/* ── 2. SATIN SWEEPS (broad smooth taut folds, lit by the gradients) ── */}
      <motion.path
        fill="url(#q9firm-satinCool)"
        filter="url(#q9firm-bSoft)"
        initial={{ d: SWEEP_TOP_0, opacity: 0, x: 0, y: 0 }}
        animate={sweepTopMotion}
        transition={isConfirming ? firm(0.6) : loop(8.5)}
      />
      <motion.path
        fill="url(#q9firm-satinCream)"
        filter="url(#q9firm-bSoft)"
        initial={{ d: SWEEP_MID_0, opacity: 0, x: 0, y: 0 }}
        animate={sweepMidMotion}
        transition={isConfirming ? firm(0.6) : loop(7.6, 0.4)}
      />
      <motion.path
        fill="url(#q9firm-satinRose)"
        filter="url(#q9firm-bSoft)"
        initial={{ d: SWEEP_LOW_0, opacity: 0, x: 0, y: 0 }}
        animate={sweepLowMotion}
        transition={isConfirming ? firm(0.6) : loop(9, 0.2)}
      />

      {/* ── 4. CREST LINES (crisp fine refinement highlights on a fold) ── */}
      {/* Soft wider under-glow beneath the crest, for a polished bloom. */}
      <motion.path
        d="M-10 150 C90 122 170 138 250 122 C320 108 372 126 410 108"
        fill="none"
        stroke="#ffffff"
        strokeWidth={5}
        strokeOpacity={0.4}
        strokeLinecap="round"
        filter="url(#q9firm-bSoft)"
        initial={{ opacity: 0, x: 0 }}
        animate={crestAnimate}
        transition={isConfirming ? firm(0.6) : loop(7.2, 0.3)}
      />
      {/* The hero crisp bright crest line along the top fold. */}
      <motion.path
        d="M-10 150 C90 122 170 138 250 122 C320 108 372 126 410 108"
        fill="none"
        stroke="#ffffff"
        strokeWidth={1.6}
        strokeOpacity={1}
        strokeLinecap="round"
        initial={{ opacity: 0, x: 0 }}
        animate={
          isConfirming
            ? { opacity: 0.95, x: 6 }
            : reduceMotion
              ? { opacity: 0.62, x: 0 }
              : { opacity: [0.42, 0.72, 0.42], x: [-4, 4, -4] }
        }
        transition={isConfirming ? firm(0.6) : loop(7.2, 0.3)}
      />
      <motion.path
        d="M-10 250 C70 224 150 242 232 226 C312 210 366 236 410 218"
        fill="none"
        stroke="#ffffff"
        strokeWidth={1.1}
        strokeOpacity={0.85}
        strokeLinecap="round"
        initial={{ opacity: 0, x: 0 }}
        animate={crestAnimate}
        transition={isConfirming ? firm(0.6, 0.04) : loop(8, 0.6)}
      />

      {/* ── 3. SPECULAR SHEEN (signature diagonal polish sweep) ── */}
      <motion.rect
        x={130}
        y={-120}
        width={140}
        height={640}
        fill="url(#q9firm-sheen)"
        filter="url(#q9firm-bSheen)"
        transform="rotate(24 200 200)"
        initial={{ opacity: 0, x: -160, y: 64 }}
        animate={sheenAnimate}
        transition={sheenTransition}
        style={{ transformOrigin: '200px 200px' }}
      />
    </svg>
  );
}
