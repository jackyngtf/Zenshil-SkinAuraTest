'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ROOM, CANDLE, sn } from './room/roomLayout';
import RoomBackdrop from './room/RoomBackdrop';
import Turntable from './room/Turntable';
import RoomAtmosphere from './room/RoomAtmosphere';
import CandleHero from './relax/CandleHero';

/* ── Q4·B 放鬆「夜晚小房 · 黑膠 + 音樂」(assembly) ──
   A cosy lo-fi night room: a warm dim wall with indie band posters
   (RoomBackdrop), a wood desk holding a vinyl turntable playing music
   (Turntable) + a small candle (the reused CandleHero, shrunk on the desk),
   all bathed in warm candlelit glow with music notes drifting up
   (RoomAtmosphere). The whole scene fades at its edges so it melts into the
   page like the sibling photo scenes (moon / clock). Relaxation = unwinding
   in your own warm room with a record on. */

/* Place the reused CandleHero (drawn full-size, foot ≈ (200,262)) small on
   the desk: screenPoint = translate + scale·localPoint ⇒ solve for the foot
   to land at (CANDLE.baseX, CANDLE.baseY). */
const CANDLE_FOOT = { x: 200, y: 262 };
const CANDLE_TX = sn(CANDLE.baseX - CANDLE.scale * CANDLE_FOOT.x);
const CANDLE_TY = sn(CANDLE.baseY - CANDLE.scale * CANDLE_FOOT.y);

export default function RelaxScene({ isConfirming = false }: { isConfirming?: boolean }) {
  const reduceMotion = Boolean(useReducedMotion());
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `q04relax-${name}-${uid}`;

  return (
    <svg
      viewBox="0 0 400 320"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Dim base behind everything (fills floor / any gaps). */}
        <linearGradient id={id('base')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ROOM.wallTop} />
          <stop offset="66%" stopColor={ROOM.wallLo} />
          <stop offset="100%" stopColor="#42333b" />
        </linearGradient>
        {/* Soft elliptical edge-fade so the room melts into the page (like the
            moon / clock photos' radial mask) instead of a hard rectangle. */}
        <radialGradient id={id('fadeGrad')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="58%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <mask id={id('fade')}>
          <rect width="400" height="320" fill={`url(#${id('fadeGrad')})`} />
        </mask>
      </defs>

      <g mask={`url(#${id('fade')})`}>
        {/* ── Dim base ── */}
        <rect width="400" height="320" fill={`url(#${id('base')})`} />

        {/* ── Wall + indie posters + warm wall-wash ── */}
        <RoomBackdrop uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Desk + vinyl turntable (spinning record = music) ── */}
        <Turntable uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />

        {/* ── Small candle on the desk (reused hero, shrunk) ── */}
        <g transform={`translate(${CANDLE_TX} ${CANDLE_TY}) scale(${CANDLE.scale})`}>
          <CandleHero uid={`${uid}c`} isConfirming={isConfirming} reduceMotion={reduceMotion} />
        </g>

        {/* ── Warm cosy lighting + music notes + bokeh (topmost) ── */}
        <RoomAtmosphere uid={uid} isConfirming={isConfirming} reduceMotion={reduceMotion} />
      </g>
    </svg>
  );
}
