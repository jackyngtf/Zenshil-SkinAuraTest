'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { IDLE, WINDOW, WALL_WASH, FLOOR_Y, sn } from './idleLayout';

/* ================================================================== */
/*  Q4 · idle 微光空房 — BACKDROP (renders FIRST, behind everything).    */
/*                                                                     */
/*  A warm-neutral wall washing into a bare floor band, a single CRISP  */
/*  upper-centre window with a FROSTED (out-of-focus) cream pane —      */
/*  deliberately no moon/sun disc — a slow wall-wash ellipse behind it, */
/*  and a soft top/corner vignette. The room shell: an empty, undecided */
/*  interior. NO furniture of any kind.                                 */
/*                                                                     */
/*  MOSTLY STATIC — only the warm wall-wash breathes (~8.4s, offset     */
/*  from the hero so it's out of phase). CONFIRM (~0.6s,                */
/*  ease [0.32,.94,.4,1]): the wash brightens/swells a touch.           */
/*  reduceMotion: wash parked mid; window + vignette fully static.      */
/* ================================================================== */

const breathe = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

export default function IdleBackdrop({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04idle-bg-' + n + '-' + uid;

  const washLoop = breathe(reduceMotion, 8.4, 0.4);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Warm-neutral wall — greige up high washing to a deeper taupe low. */}
        <linearGradient id={id('wall')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={IDLE.wallTop} />
          <stop offset="64%" stopColor={IDLE.wallTop} />
          <stop offset="100%" stopColor={IDLE.wallLo} />
        </linearGradient>
        {/* FROSTED pane — a flat-ish cream gradient, NO radial hotspot, so it
            commits to no time-of-day and never re-reads as the old free orb. */}
        <linearGradient id={id('pane')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={IDLE.paneTop} />
          <stop offset="100%" stopColor={IDLE.paneLo} />
        </linearGradient>
        {/* Warm wall wash behind / around the window (breathes). */}
        <radialGradient id={id('wallWash')} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={IDLE.wallGlow} stopOpacity="0.46" />
          <stop offset="55%" stopColor={IDLE.wallGlow} stopOpacity="0.18" />
          <stop offset="100%" stopColor={IDLE.wallGlow} stopOpacity="0" />
        </radialGradient>
        {/* Soft top + corner vignette (warm taupe). */}
        <radialGradient id={id('vig')} cx="50%" cy="44%" r="80%">
          <stop offset="0%" stopColor={IDLE.vig} stopOpacity="0" />
          <stop offset="62%" stopColor={IDLE.vig} stopOpacity="0" />
          <stop offset="100%" stopColor={IDLE.vig} stopOpacity="0.3" />
        </radialGradient>
        {/* Heavy blur for the breathing wall wash. */}
        <filter id={id('soft')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* ── WALL base gradient ── */}
      <rect x="0" y="0" width="400" height={sn(FLOOR_Y)} fill={`url(#${id('wall')})`} />

      {/* Faint vertical seam at the centerline so the surface reads as a wall. */}
      <rect x="198.8" y="0" width="1.2" height={sn(FLOOR_Y)} fill={IDLE.wallLo} opacity={0.16} />
      <rect x="200" y="0" width="1" height={sn(FLOOR_Y)} fill={IDLE.wallGlow} opacity={0.1} />

      {/* ── WARM WALL WASH behind the window (breathes) ── */}
      <motion.ellipse
        cx={WALL_WASH.cx}
        cy={WALL_WASH.cy}
        rx={WALL_WASH.rx}
        ry={WALL_WASH.ry}
        fill={`url(#${id('wallWash')})`}
        filter={`url(#${id('soft')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.5, scale: 1.06 }
            : reduceMotion
              ? { opacity: 0.34, scale: 1 }
              : { opacity: [0.3, 0.44, 0.3], scale: [1, 1.03, 1] }
        }
        transition={isConfirming ? surge(reduceMotion) : washLoop}
        style={{ transformOrigin: `${WALL_WASH.cx}px ${WALL_WASH.cy}px` }}
      />

      {/* ── WINDOW frame + frosted pane + mullion + crossbar + sill (CRISP) ── */}
      <g>
        {/* outer frame */}
        <rect x={WINDOW.x} y={WINDOW.y} width={WINDOW.w} height={WINDOW.h} rx={3} fill={IDLE.frame} />
        {/* frosted cream pane */}
        <rect
          x={WINDOW.x + 4}
          y={WINDOW.y + 4}
          width={WINDOW.w - 8}
          height={WINDOW.h - 8}
          fill={`url(#${id('pane')})`}
        />
        {/* thin inner bevel border */}
        <rect
          x={WINDOW.x + 4}
          y={WINDOW.y + 4}
          width={WINDOW.w - 8}
          height={WINDOW.h - 8}
          fill="none"
          stroke={IDLE.paneBevel}
          strokeWidth={1}
          opacity={0.18}
        />
        {/* vertical mullion */}
        <rect x={WINDOW.mullionX - 0.6} y={WINDOW.y + 4} width={1.2} height={WINDOW.h - 8} fill={IDLE.frame} />
        {/* horizontal crossbar */}
        <rect x={WINDOW.x + 4} y={WINDOW.crossbarY - 0.6} width={WINDOW.w - 8} height={1.2} fill={IDLE.frame} />
        {/* thin inner sill ledge */}
        <rect x={WINDOW.x - 4} y={WINDOW.sillY} width={WINDOW.w + 8} height={2.5} rx={1} fill={IDLE.sill} />
      </g>

      {/* ── FLOOR band ── */}
      <rect x={0} y={FLOOR_Y} width={400} height={320 - FLOOR_Y} fill={IDLE.floorFront} />
      {/* faint front-edge lit strip at the wall/floor seam */}
      <rect x={0} y={sn(FLOOR_Y - 1.5)} width={400} height={1.6} fill={IDLE.floorSeam} opacity={0.3} />

      {/* ── Top + corner vignette (rendered last in this layer) ── */}
      <rect x={0} y={0} width={400} height={sn(FLOOR_Y)} fill={`url(#${id('vig')})`} />
    </g>
  );
}
