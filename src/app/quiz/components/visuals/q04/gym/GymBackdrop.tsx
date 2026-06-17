'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { GYM, sn, FLOOR_Y, WINDOW } from './gymLayout';

/* Q4·D 能量 — sunlit, warm, ENERGETIC gym ROOM SHELL.
   Renders FIRST, behind treadmill + equipment. Wall + bright window with
   light rays + warm wood floor + a tasteful wall accent. Essentially static;
   only the sun glow + rays gently breathe. */

export default function GymBackdrop({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => `q04gym-${n}-${uid}`;

  /* slow "breathing" loop for the sun glow + rays */
  const breathe: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 8, repeat: Infinity, ease: 'easeInOut' };

  const rayBreathe: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 8.5, repeat: Infinity, ease: 'easeInOut' };

  /* CONFIRM: warm light brightens a touch then settles (~0.6s one-shot). */
  const confirmEase: [number, number, number, number] = [0.32, 0.94, 0.4, 1];

  /* sun glow centred near the window */
  const glowCx = sn(WINDOW.x + WINDOW.w * 0.55);
  const glowCy = sn(WINDOW.y + WINDOW.h * 0.45);

  /* window-frame geometry */
  const wx = WINDOW.x;
  const wy = WINDOW.y;
  const ww = WINDOW.w;
  const wh = WINDOW.h;
  const wMidX = sn(wx + ww / 2);
  const wMidY = sn(wy + wh / 2);

  /* floor lands a touch past FLOOR_Y so it overlaps the wall seam */
  const floorY = FLOOR_Y;

  return (
    <g aria-hidden="true">
      <defs>
        {/* warm sunlit wall gradient */}
        <linearGradient id={id('wall')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GYM.wallTop} />
          <stop offset="1" stopColor={GYM.wallLo} />
        </linearGradient>

        {/* warm wood floor — receding plane */}
        <linearGradient id={id('floor')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GYM.floorTop} />
          <stop offset="0.35" stopColor={GYM.floorTopHi} />
          <stop offset="1" stopColor={GYM.floorFront} />
        </linearGradient>

        {/* warm morning light inside the window */}
        <linearGradient id={id('win')} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={GYM.windowLight} />
          <stop offset="1" stopColor={GYM.windowGold} />
        </linearGradient>

        {/* soft radial sun wash on the wall */}
        <radialGradient id={id('glow')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={GYM.wallGlow} stopOpacity="0.95" />
          <stop offset="1" stopColor={GYM.wallGlow} stopOpacity="0" />
        </radialGradient>

        {/* warm ambient floor sheen where the window light lands */}
        <radialGradient id={id('floorSheen')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={GYM.floorEdge} stopOpacity="0.55" />
          <stop offset="1" stopColor={GYM.floorEdge} stopOpacity="0" />
        </radialGradient>

        <filter
          id={id('soft')}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="14" />
        </filter>

        <filter
          id={id('softFloor')}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* ---------------------------------------------------------------- */}
      {/* 1 · WALL — fill upper area; floor overlaps its lower seam        */}
      {/* ---------------------------------------------------------------- */}
      <rect
        x="0"
        y="0"
        width="400"
        height={sn(floorY + 8)}
        fill={`url(#${id('wall')})`}
      />

      {/* soft warm sun glow wash, centred near the window */}
      <motion.ellipse
        cx={glowCx}
        cy={glowCy}
        rx="150"
        ry="132"
        fill={`url(#${id('glow')})`}
        filter={`url(#${id('soft')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: [0.9, 1, 0.92], scale: [1, 1.07, 1] }
            : reduceMotion
              ? { opacity: 0.88, scale: 1 }
              : { opacity: [0.78, 0.96, 0.78], scale: [1, 1.05, 1] }
        }
        transition={
          isConfirming
            ? { duration: 0.6, ease: confirmEase }
            : breathe
        }
        style={{ transformOrigin: `${glowCx}px ${glowCy}px` }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* 2 · WINDOW — bright morning light + frame + mullion + rays        */}
      {/* ---------------------------------------------------------------- */}

      {/* soft halo bleed just outside the window panes */}
      <rect
        x={sn(wx - 6)}
        y={sn(wy - 6)}
        width={sn(ww + 12)}
        height={sn(wh + 12)}
        rx="10"
        fill={GYM.windowLight}
        opacity="0.5"
        filter={`url(#${id('soft')})`}
      />

      {/* glass / light fill */}
      <rect
        x={wx}
        y={wy}
        width={ww}
        height={wh}
        rx="4"
        fill={`url(#${id('win')})`}
      />

      {/* a brighter sun hotspot in the upper-left pane */}
      <circle
        cx={sn(wx + ww * 0.32)}
        cy={sn(wy + wh * 0.3)}
        r="22"
        fill={GYM.windowLight}
        opacity="0.7"
        filter={`url(#${id('softFloor')})`}
      />

      {/* cross mullion — two bars */}
      <rect
        x={sn(wMidX - 2)}
        y={wy}
        width="4"
        height={wh}
        fill={GYM.windowGold}
        opacity="0.85"
      />
      <rect
        x={wx}
        y={sn(wMidY - 2)}
        width={ww}
        height="4"
        fill={GYM.windowGold}
        opacity="0.85"
      />

      {/* thin outer frame */}
      <rect
        x={wx}
        y={wy}
        width={ww}
        height={wh}
        rx="4"
        fill="none"
        stroke={GYM.metalHi}
        strokeWidth="4"
        opacity="0.9"
      />

      {/* 3 light RAYS fanning DOWN-RIGHT out of the window. Each ray gently
          shimmers (opacity + a small length sway via scaleY). Anchored at the
          window so the sway reads as light reaching into the room. */}
      <g opacity="0.16">
        {[
          { x1: wx + ww * 0.5, dx: 150, w: 26, dur: 7.2, base: 0.95 },
          { x1: wx + ww * 0.72, dx: 180, w: 34, dur: 8.4, base: 0.8 },
          { x1: wx + ww * 0.9, dx: 210, w: 42, dur: 9.0, base: 1 },
        ].map((r, i) => {
          const ox = sn(r.x1);
          const oy = sn(wy + wh * 0.78);
          // each ray is a thin triangle splaying down-right from the window
          const d = `M ${ox} ${oy} L ${sn(ox + r.dx)} ${sn(oy + r.dx * 0.9)} L ${sn(
            ox + r.dx + r.w,
          )} ${sn(oy + r.dx * 0.9)} Z`;
          return (
            <motion.path
              key={i}
              d={d}
              fill={GYM.ray}
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: r.base, scaleY: 1 }
                  : isConfirming
                    ? { opacity: [r.base, 1, r.base], scaleY: [1, 1.04, 1] }
                    : {
                        opacity: [r.base * 0.7, r.base, r.base * 0.7],
                        scaleY: [0.97, 1.03, 0.97],
                      }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : isConfirming
                    ? { duration: 0.6, ease: confirmEase }
                    : { ...rayBreathe, duration: r.dur }
              }
              style={{ transformOrigin: `${ox}px ${oy}px` }}
            />
          );
        })}
      </g>

      {/* ---------------------------------------------------------------- */}
      {/* 3 · FLOOR — warm light wood, lit front edge, faint seams          */}
      {/* ---------------------------------------------------------------- */}
      <rect
        x="0"
        y={floorY}
        width="400"
        height={sn(320 - floorY)}
        fill={`url(#${id('floor')})`}
      />

      {/* warm ambient floor sheen where window light pools */}
      <ellipse
        cx={sn(wMidX + 70)}
        cy={sn(floorY + 36)}
        rx="150"
        ry="48"
        fill={`url(#${id('floorSheen')})`}
        filter={`url(#${id('softFloor')})`}
      />

      {/* lit front edge highlight along the floor's leading line */}
      <rect
        x="0"
        y={floorY}
        width="400"
        height="3"
        fill={GYM.floorEdge}
        opacity="0.9"
      />

      {/* faint plank seams receding toward the wall */}
      <line
        x1="0"
        y1={sn(floorY + 34)}
        x2="400"
        y2={sn(floorY + 34)}
        stroke={GYM.floorFront}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="0"
        y1={sn(floorY + 74)}
        x2="400"
        y2={sn(floorY + 74)}
        stroke={GYM.floorFront}
        strokeWidth="1.5"
        opacity="0.3"
      />

      {/* ---------------------------------------------------------------- */}
      {/* 4 · WALL ACCENT — small framed motivational poster (upper-right)  */}
      {/* ---------------------------------------------------------------- */}
      <g transform="translate(322 56)">
        {/* frame */}
        <rect
          x="0"
          y="0"
          width="44"
          height="54"
          rx="3"
          fill={GYM.wallTop}
          stroke={GYM.floorFront}
          strokeWidth="2.5"
        />
        {/* poster ground */}
        <rect
          x="4"
          y="4"
          width="36"
          height="46"
          rx="2"
          fill={GYM.energyHi}
        />
        {/* a simple upward "vitality" chevron mark */}
        <path
          d="M 11 36 L 22 20 L 33 36"
          fill="none"
          stroke={GYM.coral}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="15" r="3" fill={GYM.coral} />
      </g>
    </g>
  );
}
