'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import {
  GYM,
  sn,
  FLOOR_Y,
  DUMBBELLS,
  ENERGY_SOURCE,
} from './gymLayout';

/* ================================================================== */
/*  Q4·D 能量 (Energy) — KETTLEBELLS + ENERGY ATMOSPHERE (room TOPMOST). */
/*                                                                     */
/*  Renders over the gym backdrop + chest-press machine. A pair of BIG  */
/*  cast-iron KETTLEBELLS rests on the floor front-RIGHT (one in front, */
/*  one offset behind for depth) — a confident foreground object        */
/*  balancing the big machine on the left. A warm, vital ATMOSPHERE     */
/*  ties the scene together: a slow-breathing warm GLOW and rising warm  */
/*  energy MOTES (vitality lifting off the floor + machine), twinkling   */
/*  on desynced loops. NOTHING clinical — no pulse rings / heart-rate.   */
/*                                                                     */
/*  MOTION (deterministic, transform/opacity/geometry only): dumbbells  */
/*  are mostly static (a whisper of warm glint on the bar); the glow     */
/*  breathes, motes drift UP + twinkle on desynced loops. All blur is    */
/*  via static <filter> (never animated). CONFIRM (~0.6s one-shot, ease  */
/*  [0.32,0.94,0.4,1]): the warm glow BLOOMS + a burst of motes lifts +  */
/*  brightens (energy surge) + a soft power-bloom near the machine        */
/*  handles, then settle. reduceMotion: glow static at mid, motes parked  */
/*  mid-rise at mid opacity, no loops.                                   */
/* ================================================================== */

const loop = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

const drift = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'linear' };

const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

/* ── BIG cast-iron KETTLEBELL ──
   Drawn around a local origin (0,0) = the BODY centre. A round cast-iron
   bell BODY (top-lit) topped by a thick arched HANDLE (the grip gap reads
   between the arch + the body shoulder), with a coral weight-band + a soft
   specular. Positioned + scaled by the caller via transform; sized BIG so it
   reads as a confident foreground object, not a small prop. */
const KB_R = 23; // body radius
/* Flat base — the bell is truncated at the bottom so it rests FLAT on the
   floor (a perfect circle only touches at a point → reads as hovering). */
const KB_FB = sn(KB_R * 0.72); // local y of the flat base
const KB_HX = sn(Math.sqrt(KB_R * KB_R - KB_FB * KB_FB)); // half-width of the flat base

/* A single kettlebell as a <g> drawn around local (0,0) = body centre. The
   id() helper namespaces the shared gradient defs. */
function Kettlebell({ id }: { id: (n: string) => string }) {
  return (
    <g>
      {/* Arched HANDLE — drawn first so the body shoulder covers its feet,
          making it read as emerging from the bell. The open gap under the
          arch is the grip. */}
      <path
        d="M-13 -14 C -18 -38, -14 -48, 0 -48 C 14 -48, 18 -38, 13 -14"
        fill="none"
        stroke={`url(#${id('handle')})`}
        strokeWidth={7.6}
        strokeLinecap="round"
      />
      {/* Handle top sheen. */}
      <path
        d="M-11 -22 C -14 -39, -11 -45, 0 -45 C 11 -45, 14 -39, 11 -22"
        fill="none"
        stroke={GYM.metalHi}
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.55}
      />
      {/* Cast-iron bell BODY (round, top-lit). */}
      <circle cx={0} cy={0} r={KB_R} fill={`url(#${id('body')})`} />
      {/* Coral weight-band across the shoulder (energetic pop). */}
      <path
        d={`M${sn(-KB_R + 4)} -8 Q 0 -2 ${sn(KB_R - 4)} -8`}
        fill="none"
        stroke={GYM.padAccent}
        strokeWidth={3.4}
        strokeLinecap="round"
        opacity={0.9}
      />
      {/* Soft specular highlight, upper-left. */}
      <ellipse
        cx={-8}
        cy={-7}
        rx={7}
        ry={9.5}
        fill={GYM.weightHi}
        opacity={0.5}
        transform="rotate(-24 -8 -7)"
      />
    </g>
  );
}

/* Rising energy motes — warm sparks biased around the machine + floor,
   drifting UP + twinkling on desynced loops. Constant arrays only.
   halo => gets a soft static-blur glow behind it. */
const MOTES = [
  { cx: ENERGY_SOURCE.x - 6, cy: 212, r: 3.2, dx: -6, dy: -94, dur: 7.2, delay: 0.0, peak: 0.88, halo: true },
  { cx: 224, cy: 234, r: 2.4, dx: 8, dy: -100, dur: 8.8, delay: 1.6, peak: 0.72, halo: false },
  { cx: 290, cy: 228, r: 3.4, dx: -7, dy: -108, dur: 9.6, delay: 0.7, peak: 0.82, halo: true },
  { cx: 196, cy: 232, r: 2.0, dx: 5, dy: -86, dur: 7.8, delay: 3.2, peak: 0.62, halo: false },
  { cx: 332, cy: 224, r: 2.8, dx: 6, dy: -96, dur: 9.0, delay: 2.4, peak: 0.74, halo: false },
  { cx: 264, cy: 220, r: 2.6, dx: -5, dy: -104, dur: 8.2, delay: 4.1, peak: 0.68, halo: true },
  { cx: 240, cy: 236, r: 1.8, dx: 9, dy: -80, dur: 7.0, delay: 5.0, peak: 0.56, halo: false },
] as const;

export default function GymEquipment({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04gym-equip-' + n + '-' + uid;

  /* Warm glow pools over the floor + machine, biased toward the source. */
  const glowCx = (DUMBBELLS.cx + ENERGY_SOURCE.x) / 2 - 8;
  const glowCy = FLOOR_Y - 34;

  /* Kettlebell body-centre y so the bell bottom rests on the floor. */
  const kbBaseY = FLOOR_Y - KB_R;
  const SRC = ENERGY_SOURCE;

  return (
    <g aria-hidden="true">
      <defs>
        {/* Cast-iron bell body — top-lit, dark toward the base. */}
        <radialGradient id={id('body')} cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor={GYM.weightHi} />
          <stop offset="46%" stopColor={GYM.weight} />
          <stop offset="100%" stopColor="#211e26" />
        </radialGradient>
        {/* Handle — brushed metal, lit toward the top. */}
        <linearGradient id={id('handle')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={GYM.metalHi} />
          <stop offset="50%" stopColor={GYM.metal} />
          <stop offset="100%" stopColor={GYM.metalDark} />
        </linearGradient>
        {/* Warm energetic glow — bright amber core dissolving to nothing. */}
        <radialGradient id={id('glow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GYM.energyHi} stopOpacity="0.9" />
          <stop offset="45%" stopColor={GYM.energy} stopOpacity="0.42" />
          <stop offset="100%" stopColor={GYM.energy} stopOpacity="0" />
        </radialGradient>
        {/* Soft power-bloom near the machine handles (CONFIRM surge). */}
        <radialGradient id={id('bloom')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GYM.mote} stopOpacity="1" />
          <stop offset="40%" stopColor={GYM.energyHi} stopOpacity="0.62" />
          <stop offset="100%" stopColor={GYM.energy} stopOpacity="0" />
        </radialGradient>
        {/* Soft round mote fill — warm core dissolving out. */}
        <radialGradient id={id('mote')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GYM.mote} stopOpacity="1" />
          <stop offset="55%" stopColor={GYM.energyHi} stopOpacity="0.7" />
          <stop offset="100%" stopColor={GYM.energy} stopOpacity="0" />
        </radialGradient>
        {/* Soft halo behind the larger motes. */}
        <radialGradient id={id('halo')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GYM.energyHi} stopOpacity="0.7" />
          <stop offset="60%" stopColor={GYM.energy} stopOpacity="0.22" />
          <stop offset="100%" stopColor={GYM.energy} stopOpacity="0" />
        </radialGradient>

        {/* Static blur filters — never animated. */}
        <filter id={id('bGlow')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <filter id={id('bBloom')} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={id('bShadow')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
        <filter id={id('bHalo')} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3.6" />
        </filter>
      </defs>

      {/* ── WARM ENERGETIC GLOW breathing over the floor + machine ── */}
      <motion.ellipse
        cx={sn(glowCx)}
        cy={sn(glowCy)}
        rx={172}
        ry={102}
        fill={`url(#${id('glow')})`}
        filter={`url(#${id('bGlow')})`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={
          isConfirming
            ? { opacity: 0.54, scale: 1.14 }
            : reduceMotion
              ? { opacity: 0.3, scale: 1 }
              : { opacity: [0.22, 0.36, 0.22], scale: [0.98, 1.06, 0.98] }
        }
        transition={isConfirming ? surge(reduceMotion) : loop(reduceMotion, 6.4)}
        style={{ transformOrigin: `${sn(glowCx)}px ${sn(glowCy)}px` }}
      />

      {/* ── SOFT POWER-BLOOM near the machine handles (energy origin) ── */}
      <motion.circle
        cx={SRC.x}
        cy={SRC.y}
        r={30}
        fill={`url(#${id('bloom')})`}
        filter={`url(#${id('bBloom')})`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={
          isConfirming
            ? { opacity: 0.7, scale: 1.35 }
            : reduceMotion
              ? { opacity: 0.18, scale: 1 }
              : { opacity: [0.12, 0.24, 0.12], scale: [0.92, 1.08, 0.92] }
        }
        transition={isConfirming ? surge(reduceMotion) : loop(reduceMotion, 5.8, 0.4)}
        style={{ transformOrigin: `${SRC.x}px ${SRC.y}px` }}
      />

      {/* ── KETTLEBELLS (front-RIGHT) — one offset behind for depth ── */}
      {/* Soft contact shadows pooled under the bells. */}
      <ellipse
        cx={sn(DUMBBELLS.cx - 32)}
        cy={FLOOR_Y + 4}
        rx={20}
        ry={6}
        fill="#2a1f14"
        opacity={0.28}
        filter={`url(#${id('bShadow')})`}
      />
      <ellipse
        cx={sn(DUMBBELLS.cx)}
        cy={FLOOR_Y + 5}
        rx={27}
        ry={7.5}
        fill="#2a1f14"
        opacity={0.34}
        filter={`url(#${id('bShadow')})`}
      />

      {/* Back kettlebell — slightly smaller + dimmer, offset left; its base
          rests on the floor (grounded, not floating). */}
      <g opacity={0.84}>
        <g transform={`translate(${sn(DUMBBELLS.cx - 32)} ${sn(FLOOR_Y - KB_R * 0.78)}) scale(0.78)`}>
          <Kettlebell id={id} />
        </g>
      </g>

      {/* Front kettlebell — full size, resting on the floor with a glint. */}
      <g transform={`translate(${sn(DUMBBELLS.cx)} ${sn(kbBaseY)})`}>
        <Kettlebell id={id} />
        {/* A whisper of warm light glinting on the bell shoulder. */}
        <motion.ellipse
          cx={-7}
          cy={-9}
          rx={6}
          ry={8.5}
          fill={GYM.energyHi}
          transform="rotate(-24 -7 -9)"
          initial={{ opacity: 0.4 }}
          animate={
            isConfirming
              ? { opacity: 0.85 }
              : reduceMotion
                ? { opacity: 0.45 }
                : { opacity: [0.32, 0.6, 0.32] }
          }
          transition={isConfirming ? surge(reduceMotion) : loop(reduceMotion, 5.2)}
        />
      </g>

      {/* ── RISING ENERGY MOTES — warm sparks lifting off the floor ── */}
      <g>
        {MOTES.map((m, i) => {
          const animate = isConfirming
            ? {
                opacity: Math.min(1, m.peak + 0.1),
                x: m.dx * 0.3,
                y: -20,
                scale: 1.45,
              }
            : reduceMotion
              ? { opacity: m.peak * 0.6, x: m.dx * 0.5, y: m.dy * 0.5, scale: 1 }
              : {
                  opacity: [0, m.peak, m.peak * 0.5, 0],
                  x: [0, m.dx * 0.5, m.dx],
                  y: [0, m.dy * 0.5, m.dy],
                  scale: [0.7, 1.1, 0.85],
                };
          const transition: Transition = isConfirming
            ? surge(reduceMotion)
            : drift(reduceMotion, m.dur, m.delay);
          return (
            <motion.g
              key={`mote-${i}`}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.7 }}
              animate={animate}
              transition={transition}
              style={{ transformOrigin: `${sn(m.cx)}px ${sn(m.cy)}px` }}
            >
              {m.halo && (
                <circle
                  cx={sn(m.cx)}
                  cy={sn(m.cy)}
                  r={sn(m.r * 3)}
                  fill={`url(#${id('halo')})`}
                  filter={`url(#${id('bHalo')})`}
                />
              )}
              <circle
                cx={sn(m.cx)}
                cy={sn(m.cy)}
                r={sn(m.r)}
                fill={`url(#${id('mote')})`}
              />
            </motion.g>
          );
        })}
      </g>
    </g>
  );
}
