'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { BEDROOM, WINDOW, MOON, STARS, PICTURE, FLOOR_Y, sn } from './bedroomLayout';

/* ================================================================== */
/*  Q4·A 睡眠 — BEDROOM BACKDROP (renders FIRST, behind everything).    */
/*                                                                     */
/*  A cool, calm NIGHT-ROOM wall: deep indigo gradient with a soft cool */
/*  moonlit wash pooling centred (where the window's light catches the  */
/*  wall) so the room is gently moonlit in the middle + dimmer at the   */
/*  top corners. A single framed WINDOW sits upper-centre behind the    */
/*  headboard holding a night sky: a soft crescent MOON with a breathing*/
/*  halo + 5 twinkling STARS (cool dots). One framed starry-night line  */
/*  PRINT hangs on the left wall (replaces B's 3 posters). A thin floor */
/*  band drops below the wall seam.                                    */
/*                                                                     */
/*  MOSTLY STATIC — only the cool wall-wash + moon halo breathe (~8.4s) */
/*  and the stars twinkle (~4.6–6.2s). CONFIRM (~0.6s,                 */
/*  ease [0.32,.94,.4,1]): the wash warms/brightens a touch + the moon  */
/*  halo BLOOMS + stars flash, then settle.                            */
/*  reduceMotion: fully static representative state.                    */
/* ================================================================== */

/* slow eased breathe loop for the cool wall wash / moon halo */
const breathe = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

/* one-shot confirm surge */
const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

export default function BedroomBackdrop({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04sleep-bg-' + n + '-' + uid;

  const washLoop = breathe(reduceMotion, 8.4);
  const moonLoop = breathe(reduceMotion, 8.4, 0.4);

  /* picture art field geometry (inset from the frame box). */
  const picMatIn = 4;

  return (
    <g aria-hidden="true">
      <defs>
        {/* Deep cool indigo wall — lighter indigo up high washing to a deeper
            navy low, so it reads as a softly moonlit interior wall. */}
        <linearGradient id={id('wall')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.wallTop} />
          <stop offset="64%" stopColor={BEDROOM.wallTop} />
          <stop offset="100%" stopColor={BEDROOM.wallLo} />
        </linearGradient>
        {/* Night sky inside the window pane — lighter indigo to deep navy. */}
        <linearGradient id={id('paneSky')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.paneSkyTop} />
          <stop offset="100%" stopColor={BEDROOM.paneSkyLo} />
        </linearGradient>
        {/* Soft moon halo glow (cool). */}
        <radialGradient id={id('moonGlow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BEDROOM.moonHalo} stopOpacity="0.6" />
          <stop offset="50%" stopColor={BEDROOM.moonHalo} stopOpacity="0.24" />
          <stop offset="100%" stopColor={BEDROOM.moonHalo} stopOpacity="0" />
        </radialGradient>
        {/* Cool moonlit wall wash behind / around the window. */}
        <radialGradient id={id('wallWash')} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={BEDROOM.wallGlow} stopOpacity="0.4" />
          <stop offset="55%" stopColor={BEDROOM.wallGlow} stopOpacity="0.16" />
          <stop offset="100%" stopColor={BEDROOM.wallGlow} stopOpacity="0" />
        </radialGradient>
        {/* Top + corner night vignette (deep night). */}
        <radialGradient id={id('vig')} cx="50%" cy="44%" r="80%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor={BEDROOM.vig} stopOpacity="0.46" />
        </radialGradient>
        {/* Soft picture drop-shadow blur (static). */}
        <filter id={id('drop')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        {/* Heavy blur for the breathing wall wash + moon halo. */}
        <filter id={id('soft')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        {/* Clip for the picture's starry-night art so it never spills. */}
        <clipPath id={id('picArt')}>
          <rect
            x={sn(PICTURE.x + 4)}
            y={sn(PICTURE.y + 4)}
            width={sn(PICTURE.w - 8)}
            height={sn(PICTURE.h - 8)}
          />
        </clipPath>
      </defs>

      {/* ── WALL base gradient ── */}
      <rect x="0" y="0" width="400" height={sn(FLOOR_Y)} fill={`url(#${id('wall')})`} />

      {/* Faint vertical seam at the centerline so the surface reads as a wall. */}
      <rect x="198.8" y="0" width="1.2" height={sn(FLOOR_Y)} fill={BEDROOM.wallLo} opacity={0.18} />
      <rect x="200" y="0" width="1" height={sn(FLOOR_Y)} fill={BEDROOM.wallGlow} opacity={0.08} />

      {/* ── Cool MOONLIT WALL WASH behind the window (breathes) ── */}
      <motion.ellipse
        cx={200}
        cy={72}
        rx={120}
        ry={78}
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
        style={{ transformOrigin: '200px 72px' }}
      />

      {/* ── WINDOW frame + pane + mullions + sill (mostly static) ── */}
      <g>
        {/* outer dark frame */}
        <rect
          x={WINDOW.x}
          y={WINDOW.y}
          width={WINDOW.w}
          height={WINDOW.h}
          rx={3}
          fill={BEDROOM.frame}
        />
        {/* night-sky pane */}
        <rect
          x={WINDOW.x + 4}
          y={WINDOW.y + 4}
          width={WINDOW.w - 8}
          height={WINDOW.h - 8}
          fill={`url(#${id('paneSky')})`}
        />
        {/* thin inner bevel shadow border */}
        <rect
          x={WINDOW.x + 4}
          y={WINDOW.y + 4}
          width={WINDOW.w - 8}
          height={WINDOW.h - 8}
          fill="none"
          stroke={BEDROOM.paneShadow}
          strokeWidth={1}
          opacity={0.18}
        />
        {/* vertical mullion */}
        <rect
          x={WINDOW.mullionX - 0.6}
          y={WINDOW.y + 4}
          width={1.2}
          height={WINDOW.h - 8}
          fill={BEDROOM.frame}
        />
        {/* horizontal crossbar */}
        <rect
          x={WINDOW.x + 4}
          y={WINDOW.crossbarY - 0.6}
          width={WINDOW.w - 8}
          height={1.2}
          fill={BEDROOM.frame}
        />
        {/* thin inner sill ledge */}
        <rect
          x={WINDOW.x - 4}
          y={WINDOW.sillY}
          width={WINDOW.w + 8}
          height={2.5}
          rx={1}
          fill={BEDROOM.sill}
        />
      </g>

      {/* ── MOON: breathing halo + static crescent ── */}
      <motion.circle
        cx={MOON.cx}
        cy={MOON.cy}
        r={MOON.haloR}
        fill={`url(#${id('moonGlow')})`}
        filter={`url(#${id('soft')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.66, scale: 1.18 }
            : reduceMotion
              ? { opacity: 0.42, scale: 1 }
              : { opacity: [0.36, 0.56, 0.36], scale: [0.96, 1.06, 0.96] }
        }
        transition={isConfirming ? surge(reduceMotion) : moonLoop}
        style={{ transformOrigin: `${MOON.cx}px ${MOON.cy}px` }}
      />
      {/* crescent: full moon disc ... */}
      <circle cx={MOON.cx} cy={MOON.cy} r={MOON.r} fill={BEDROOM.moon} />
      {/* ... carved by a pane-sky disc offset up-right */}
      <circle cx={MOON.cx + 3} cy={MOON.cy - 2} r={MOON.r} fill={BEDROOM.paneSkyLo} />

      {/* ── STARS (twinkle) ── */}
      {STARS.map((s, i) => (
        <motion.circle
          key={`star-${i}`}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={BEDROOM.star}
          initial={false}
          animate={
            isConfirming
              ? { opacity: Math.min(1, s.peak + 0.1), scale: 1.3 }
              : reduceMotion
                ? { opacity: s.peak * 0.6, scale: 1 }
                : { opacity: [0.2, s.peak, 0.2], scale: [0.8, 1.2, 0.8] }
          }
          transition={isConfirming ? surge(reduceMotion) : breathe(reduceMotion, s.dur, s.delay)}
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
        />
      ))}

      {/* ── FRAMED STARRY-NIGHT PRINT on the left wall (static) ── */}
      <g>
        {/* soft drop-shadow on the wall */}
        <rect
          x={sn(PICTURE.x + 3)}
          y={sn(PICTURE.y + 5)}
          width={sn(PICTURE.w)}
          height={sn(PICTURE.h)}
          rx={2}
          fill="#0d1224"
          opacity={0.4}
          filter={`url(#${id('drop')})`}
        />
        {/* dark frame */}
        <rect
          x={PICTURE.x}
          y={PICTURE.y}
          width={PICTURE.w}
          height={PICTURE.h}
          rx={1.5}
          fill={BEDROOM.picFrame}
        />
        {/* slim mat */}
        <rect
          x={sn(PICTURE.x + picMatIn)}
          y={sn(PICTURE.y + picMatIn)}
          width={sn(PICTURE.w - picMatIn * 2)}
          height={sn(PICTURE.h - picMatIn * 2)}
          fill={BEDROOM.picMat}
        />
        {/* art field */}
        <rect
          x={sn(PICTURE.x + picMatIn + 1.5)}
          y={sn(PICTURE.y + picMatIn + 1.5)}
          width={sn(PICTURE.w - picMatIn * 2 - 3)}
          height={sn(PICTURE.h - picMatIn * 2 - 3)}
          fill={BEDROOM.paneSkyLo}
        />
        {/* clipped mini-nightscape: crescent moon + rolling hill + stars
            (a landscape painting — replaces the old vertical capsule art
            that read as a "pad" stuck on the wall). */}
        <g clipPath={`url(#${id('picArt')})`}>
          {/* rolling hill along the base (the ground) */}
          <path
            d={`M${sn(PICTURE.x + 1)} ${sn(PICTURE.y + 22)} Q${sn(PICTURE.x + 15)} ${sn(PICTURE.y + 15)} ${sn(PICTURE.x + 28)} ${sn(PICTURE.y + 20)} Q${sn(PICTURE.x + 42)} ${sn(PICTURE.y + 25)} ${sn(PICTURE.x + 51)} ${sn(PICTURE.y + 19)} L${sn(PICTURE.x + 51)} ${sn(PICTURE.y + 34)} L${sn(PICTURE.x + 1)} ${sn(PICTURE.y + 34)} Z`}
            fill={BEDROOM.picAccent}
            opacity={0.5}
          />
          {/* crescent moon (disc carved by a pane-sky disc) */}
          <circle cx={sn(PICTURE.x + 13)} cy={sn(PICTURE.y + 11)} r={4.5} fill={BEDROOM.picMat} opacity={0.92} />
          <circle cx={sn(PICTURE.x + 15.5)} cy={sn(PICTURE.y + 9)} r={4.5} fill={BEDROOM.paneSkyLo} />
          {/* 3 tiny stars */}
          <circle cx={sn(PICTURE.x + 34)} cy={sn(PICTURE.y + 8)} r={0.9} fill={BEDROOM.picMat} />
          <circle cx={sn(PICTURE.x + 42)} cy={sn(PICTURE.y + 13)} r={0.7} fill={BEDROOM.picMat} />
          <circle cx={sn(PICTURE.x + 28)} cy={sn(PICTURE.y + 12)} r={0.7} fill={BEDROOM.picMat} />
        </g>
      </g>

      {/* ── FLOOR band ── */}
      <rect
        x={0}
        y={FLOOR_Y}
        width={400}
        height={320 - FLOOR_Y}
        fill={BEDROOM.floorFront}
      />
      {/* faint front-edge lit strip at the wall/floor seam */}
      <rect
        x={0}
        y={sn(FLOOR_Y - 1.5)}
        width={400}
        height={1.6}
        fill={BEDROOM.wallGlow}
        opacity={0.3}
      />

      {/* ── Top + corner night vignette (rendered last in this layer) ── */}
      <rect x={0} y={0} width={400} height={sn(FLOOR_Y)} fill={`url(#${id('vig')})`} />
    </g>
  );
}
