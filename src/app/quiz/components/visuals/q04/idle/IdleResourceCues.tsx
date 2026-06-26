'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { IDLE, RESOURCE_CUES, RESOURCE_SHELF, sn } from './idleLayout';

/* ================================================================== */
/*  Q4 · idle 微光空房 — DORMANT RESOURCE CUES (idle-only object layer). */
/*                                                                    */
/*  A quiet low console/tray anchors the middle-lower zone, holding    */
/*  four equal-weight neutral resource tokens: folded pillow/duvet,    */
/*  tiny candle/record sleeve, closed notebook/hourglass, kettlebell.  */
/*  These are dormant pre-choice cues only; selected A–D scenes stay   */
/*  untouched and carry their own stronger colors/motion/details.      */
/* ================================================================== */

const loop = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

function ShelfAnchor({ isConfirming, reduceMotion }: { isConfirming: boolean; reduceMotion: boolean }) {
  const shelf = RESOURCE_SHELF;

  return (
    <g aria-hidden="true">
      <ellipse
        cx={shelf.x + shelf.w / 2}
        cy={shelf.y + shelf.h + 8}
        rx={shelf.shadowRx}
        ry={shelf.shadowRy}
        fill={IDLE.objectShadow}
        opacity={0.2}
      />
      <motion.g
        initial={false}
        animate={isConfirming ? { opacity: 0.92, y: -1 } : { opacity: 0.78, y: 0 }}
        transition={surge(reduceMotion)}
      >
        <path
          d={`M${sn(shelf.x + 12)} ${sn(shelf.y)} H${sn(shelf.x + shelf.w - 12)} Q${sn(shelf.x + shelf.w)} ${sn(shelf.y)} ${sn(shelf.x + shelf.w)} ${sn(shelf.y + 9)} V${sn(shelf.y + 20)} H${sn(shelf.x)} V${sn(shelf.y + 9)} Q${sn(shelf.x)} ${sn(shelf.y)} ${sn(shelf.x + 12)} ${sn(shelf.y)} Z`}
          fill={IDLE.objectTop}
          opacity={0.62}
        />
        <rect
          x={shelf.x + 5}
          y={shelf.y + 16}
          width={shelf.w - 10}
          height={shelf.h - 14}
          rx={7}
          fill={IDLE.objectBase}
          opacity={0.5}
        />
        <path
          d={`M${sn(shelf.x + 16)} ${sn(shelf.y + 6)} H${sn(shelf.x + shelf.w - 16)}`}
          fill="none"
          stroke={IDLE.objectLine}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.28}
        />
        <path
          d={`M${sn(shelf.x + 18)} ${sn(shelf.y + shelf.h - 3)} H${sn(shelf.x + shelf.w - 18)}`}
          fill="none"
          stroke={IDLE.objectShadow}
          strokeWidth={1.8}
          strokeLinecap="round"
          opacity={0.2}
        />
      </motion.g>
    </g>
  );
}

function SleepCue() {
  const cue = RESOURCE_CUES.sleep;

  return (
    <g transform={`translate(${cue.x} ${cue.y})`} opacity={cue.opacity} aria-hidden="true">
      <path
        d="M-20 4 C-16 -7 -3 -10 8 -7 C18 -4 22 4 18 12 C10 18 -8 17 -20 11 Z"
        fill={IDLE.tokenFill}
        opacity={0.76}
      />
      <path
        d="M-18 2 C-10 7 -1 8 11 5 C15 4 18 5 20 8"
        fill="none"
        stroke={IDLE.tokenLine}
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={0.45}
      />
      <path
        d="M-13 -5 C-7 -9 4 -9 11 -5 C7 -2 -4 -1 -13 -5 Z"
        fill={IDLE.tokenLight}
        opacity={0.36}
      />
    </g>
  );
}

function RelaxCue() {
  const cue = RESOURCE_CUES.relax;

  return (
    <g transform={`translate(${cue.x} ${cue.y})`} opacity={cue.opacity} aria-hidden="true">
      <path d="M-17 12 L-12 -13 H12 L17 12 Z" fill={IDLE.tokenFill} opacity={0.54} />
      <path d="M-10 -8 H9 M-12 -2 H11 M-13 4 H13" stroke={IDLE.tokenLine} strokeWidth={1.1} opacity={0.36} />
      <rect x={-4} y={-2} width={8} height={14} rx={2.4} fill={IDLE.tokenLight} opacity={0.34} />
      <path d="M0 -5 C-3 -8 -2 -11 1 -13 C4 -10 4 -7 0 -5 Z" fill={IDLE.tokenLine} opacity={0.3} />
    </g>
  );
}

function TimeCue() {
  const cue = RESOURCE_CUES.time;

  return (
    <g transform={`translate(${cue.x} ${cue.y})`} opacity={cue.opacity} aria-hidden="true">
      <path d="M-17 10 H13 L17 14 H-13 Z" fill={IDLE.tokenFill} opacity={0.52} />
      <rect x={-16} y={-9} width={24} height={18} rx={2.6} fill={IDLE.tokenLight} opacity={0.4} />
      <path d="M-12 -4 H3 M-12 1 H5 M-12 6 H0" stroke={IDLE.tokenLine} strokeWidth={1.1} strokeLinecap="round" opacity={0.36} />
      <path
        d="M14 -10 H27 M16 -10 C16 -4 24 -4 24 1 C24 6 16 6 16 12 H27 M18 -6 L23 -6 M18 9 L23 9"
        fill="none"
        stroke={IDLE.tokenLine}
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.38}
      />
    </g>
  );
}

function EnergyCue() {
  const cue = RESOURCE_CUES.energy;

  return (
    <g transform={`translate(${cue.x} ${cue.y})`} opacity={cue.opacity} aria-hidden="true">
      <path
        d="M-10 -2 C-10 -14 10 -14 10 -2"
        fill="none"
        stroke={IDLE.tokenLine}
        strokeWidth={3.2}
        strokeLinecap="round"
        opacity={0.4}
      />
      <path
        d="M-18 3 C-15 -5 -8 -8 0 -8 C8 -8 15 -5 18 3 L15 14 H-15 Z"
        fill={IDLE.tokenFill}
        opacity={0.6}
      />
      <path d="M-9 4 H9" stroke={IDLE.tokenLight} strokeWidth={1.4} strokeLinecap="round" opacity={0.4} />
    </g>
  );
}

const cueRenderers = {
  sleep: SleepCue,
  relax: RelaxCue,
  time: TimeCue,
  energy: EnergyCue,
} as const;

export default function IdleResourceCues({
  isConfirming,
  reduceMotion,
}: {
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  return (
    <g aria-hidden="true">
      <ShelfAnchor isConfirming={isConfirming} reduceMotion={reduceMotion} />
      {RESOURCE_CUES.order.map((key) => {
        const cue = RESOURCE_CUES[key];
        const Cue = cueRenderers[key];
        const animate = isConfirming
          ? { opacity: Math.min(0.62, cue.opacity + 0.1), scale: 1.025, y: -2 }
          : reduceMotion
            ? { opacity: cue.opacity, scale: 1, y: 0 }
            : {
                opacity: [cue.opacity * 0.88, cue.opacity, cue.opacity * 0.88],
                scale: [1, cue.scale, 1],
                y: [0, cue.dy, 0],
              };

        return (
          <motion.g
            key={key}
            initial={false}
            animate={animate}
            transition={isConfirming ? surge(reduceMotion) : loop(reduceMotion, cue.dur, cue.delay)}
            style={{ transformOrigin: `${cue.x}px ${cue.y}px` }}
          >
            <Cue />
          </motion.g>
        );
      })}
    </g>
  );
}
