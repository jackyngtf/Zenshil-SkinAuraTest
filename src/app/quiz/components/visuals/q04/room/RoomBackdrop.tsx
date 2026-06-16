'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { ROOM, POSTERS, DESK_Y, sn } from './roomLayout';

/* ================================================================== */
/*  Q4·B 放鬆 — ROOM BACKDROP (renders FIRST, behind everything).      */
/*                                                                     */
/*  A warm, dim, cosy NIGHT-ROOM wall: dim mauve gradient with a soft  */
/*  amber glow-wash pooling low-centre (where the lamp/candle light     */
/*  catches the wall) so the room is warmly lit in the middle + dimmer  */
/*  at the top corners. Three framed, minimalist "indie gig posters"    */
/*  hang on the wall (thin dark frame + slim mat + 2–4 bold abstract    */
/*  shapes each + tiny type-bars), each casting a soft shadow.          */
/*                                                                     */
/*  Wall fills y 0 → a little under DESK_Y so the desk overlaps it.     */
/*  MOSTLY STATIC — only the warm glow-wash breathes (~8s) and one      */
/*  poster's highlight drifts a hair. CONFIRM (~0.6s, [0.32,.94,.4,1]): */
/*  the wall glow warms/brightens a touch, then settles.                */
/*  reduceMotion: fully static representative state.                    */
/* ================================================================== */

const WALL_BOTTOM = DESK_Y + 18; // extend under the desk so it overlaps cleanly

/* slow eased breathe loop for the warm wall wash */
const breathe = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

/* one-shot confirm surge */
const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

/* ── Per-poster minimalist gig art ──
   Each poster gets a DISTINCT bold composition rendered inside its own
   (x,y,w,h). Coordinates are derived from the poster box so art scales
   with the layout. Keep to 2–4 simple shapes + 1–2 tiny type bars. */
type Poster = (typeof POSTERS)[number];

/* shared tiny "band-name" type bars sitting near the poster's lower edge */
function typeBars(p: Poster, id: (n: string) => string, key: string) {
  const padX = p.w * 0.16;
  const baseY = p.y + p.h - p.h * 0.16;
  const barW1 = p.w - padX * 2;
  const barW2 = barW1 * 0.55;
  return (
    <g key={key}>
      <rect
        x={sn(p.x + padX)}
        y={sn(baseY)}
        width={sn(barW1)}
        height={2.4}
        rx={1.2}
        fill={ROOM.ink}
        opacity={0.62}
      />
      <rect
        x={sn(p.x + padX)}
        y={sn(baseY + 5)}
        width={sn(barW2)}
        height={2}
        rx={1}
        fill={ROOM.ink}
        opacity={0.42}
      />
    </g>
  );
}

export default function RoomBackdrop({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04room-bg-' + n + '-' + uid;

  const glowLoop = breathe(reduceMotion, 8.4);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Dim warm mauve wall — lighter mauve up high washing to a deeper
            taupe low, so it reads as a softly lit interior wall. */}
        <linearGradient id={id('wall')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ROOM.wallTop} />
          <stop offset="64%" stopColor={ROOM.wallTop} />
          <stop offset="100%" stopColor={ROOM.wallLo} />
        </linearGradient>
        {/* Corner-vignette: top + corners recede into dim (room depth). */}
        <radialGradient id={id('vignette')} cx="50%" cy="22%" r="78%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="62%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#241a20" stopOpacity="0.42" />
        </radialGradient>
        {/* Warm glow-wash pooling low-centre where the lamp/candle hits the
            wall — bright warm core dissolving outward + upward. */}
        <radialGradient id={id('glow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ROOM.wallGlow} stopOpacity="0.6" />
          <stop offset="50%" stopColor={ROOM.wallGlow} stopOpacity="0.26" />
          <stop offset="100%" stopColor={ROOM.wallGlow} stopOpacity="0" />
        </radialGradient>
        {/* Soft poster drop-shadow blur (static). */}
        <filter id={id('drop')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        {/* Heavy blur for the breathing glow-wash. */}
        <filter id={id('soft')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        {/* Clip for each poster's art so shapes never spill the frame. */}
        {POSTERS.map((p, i) => (
          <clipPath key={`clip-${i}`} id={id('clip' + i)}>
            <rect
              x={sn(p.x + p.w * 0.085)}
              y={sn(p.y + p.h * 0.06)}
              width={sn(p.w * 0.83)}
              height={sn(p.h * 0.88)}
            />
          </clipPath>
        ))}
      </defs>

      {/* ── WALL base gradient ── */}
      <rect x="0" y="0" width="400" height={sn(WALL_BOTTOM)} fill={`url(#${id('wall')})`} />

      {/* Faint vertical seam so the surface reads as a wall, not flat fill. */}
      <rect
        x="262"
        y="0"
        width="1.2"
        height={sn(WALL_BOTTOM)}
        fill={ROOM.wallLo}
        opacity={0.22}
      />
      <rect
        x="263.2"
        y="0"
        width="1"
        height={sn(WALL_BOTTOM)}
        fill={ROOM.wallGlow}
        opacity={0.1}
      />

      {/* ── Warm GLOW-WASH (breathes; brightens on confirm) ── */}
      <motion.ellipse
        cx="190"
        cy="170"
        rx="178"
        ry="138"
        fill={`url(#${id('glow')})`}
        filter={`url(#${id('soft')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 1.18, scale: 1.05 }
            : reduceMotion
              ? { opacity: 0.92, scale: 1 }
              : { opacity: [0.84, 1.0, 0.84], scale: [1, 1.025, 1] }
        }
        transition={isConfirming ? surge(reduceMotion) : glowLoop}
        style={{ transformOrigin: '190px 170px' }}
      />

      {/* ── Top + corner depth vignette ── */}
      <rect x="0" y="0" width="400" height={sn(WALL_BOTTOM)} fill={`url(#${id('vignette')})`} />

      {/* ── POSTERS (framed minimalist indie gig art) ── */}
      {POSTERS.map((p, i) => {
        const cx = sn(p.x + p.w / 2);
        const matIn = 4; // mat inset from frame
        return (
          <g key={`poster-${i}`}>
            {/* soft drop-shadow on the wall */}
            <rect
              x={sn(p.x + 3)}
              y={sn(p.y + 5)}
              width={sn(p.w)}
              height={sn(p.h)}
              rx={2}
              fill="#1c1318"
              opacity={0.34}
              filter={`url(#${id('drop')})`}
            />
            {/* dark frame */}
            <rect
              x={sn(p.x)}
              y={sn(p.y)}
              width={sn(p.w)}
              height={sn(p.h)}
              rx={1.5}
              fill={ROOM.posterFrame}
            />
            {/* slim mat */}
            <rect
              x={sn(p.x + matIn)}
              y={sn(p.y + matIn)}
              width={sn(p.w - matIn * 2)}
              height={sn(p.h - matIn * 2)}
              fill={ROOM.posterMat}
            />
            {/* poster art field */}
            <rect
              x={sn(p.x + matIn + 1.5)}
              y={sn(p.y + matIn + 1.5)}
              width={sn(p.w - matIn * 2 - 3)}
              height={sn(p.h - matIn * 2 - 3)}
              fill={p.color}
            />

            {/* art — clipped to the field */}
            <g clipPath={`url(#${id('clip' + i)})`}>
              {i === 0 && (
                <>
                  {/* gig #1 — big rising sun + layered horizon bands */}
                  {(() => {
                    const sunCy = sn(p.y + p.h * 0.42);
                    const sunR = sn(p.w * 0.3);
                    const hzY = sn(p.y + p.h * 0.46);
                    return (
                      <g>
                        {/* sun disc */}
                        <circle cx={cx} cy={sunCy} r={sunR} fill={ROOM.posterMat} opacity={0.92} />
                        {/* a sun ray gap — thin band cutting the disc */}
                        <rect
                          x={sn(p.x + matIn)}
                          y={sn(sunCy - 2)}
                          width={sn(p.w - matIn * 2)}
                          height={3}
                          fill={p.color}
                          opacity={0.85}
                        />
                        {/* horizon bands beneath */}
                        <rect
                          x={sn(p.x + matIn)}
                          y={hzY}
                          width={sn(p.w - matIn * 2)}
                          height={sn(p.h * 0.07)}
                          fill={ROOM.ink}
                          opacity={0.78}
                        />
                        <rect
                          x={sn(p.x + matIn)}
                          y={sn(hzY + p.h * 0.1)}
                          width={sn(p.w - matIn * 2)}
                          height={sn(p.h * 0.045)}
                          fill={ROOM.ink}
                          opacity={0.5}
                        />
                      </g>
                    );
                  })()}
                </>
              )}

              {i === 1 && (
                <>
                  {/* gig #2 — concentric moon arcs + minimalist mountain.
                      One arc highlight drifts a hair (whisper of life). */}
                  {(() => {
                    const moonCx = sn(p.x + p.w * 0.62);
                    const moonCy = sn(p.y + p.h * 0.34);
                    const peakBase = sn(p.y + p.h * 0.84);
                    const peakTop = sn(p.y + p.h * 0.5);
                    return (
                      <g>
                        {/* concentric moon arcs */}
                        <circle
                          cx={moonCx}
                          cy={moonCy}
                          r={sn(p.w * 0.26)}
                          fill="none"
                          stroke={ROOM.posterMat}
                          strokeWidth={2.2}
                          opacity={0.85}
                        />
                        <motion.circle
                          cx={moonCx}
                          cy={moonCy}
                          r={sn(p.w * 0.16)}
                          fill="none"
                          stroke={ROOM.posterMat}
                          strokeWidth={1.6}
                          initial={false}
                          animate={
                            isConfirming
                              ? { opacity: 0.95 }
                              : reduceMotion
                                ? { opacity: 0.6 }
                                : { opacity: [0.42, 0.72, 0.42] }
                          }
                          transition={
                            isConfirming ? surge(reduceMotion) : breathe(reduceMotion, 9.2, 0.6)
                          }
                        />
                        <circle cx={moonCx} cy={moonCy} r={sn(p.w * 0.06)} fill={ROOM.posterMat} opacity={0.9} />
                        {/* minimalist mountain silhouette */}
                        <path
                          d={`M${sn(p.x + matIn)} ${peakBase} L${sn(p.x + p.w * 0.4)} ${peakTop} L${sn(
                            p.x + p.w * 0.66,
                          )} ${sn(p.y + p.h * 0.66)} L${sn(p.x + p.w - matIn)} ${sn(
                            p.y + p.h * 0.55,
                          )} L${sn(p.x + p.w - matIn)} ${sn(p.y + p.h)} L${sn(
                            p.x + matIn,
                          )} ${sn(p.y + p.h)} Z`}
                          fill={ROOM.ink}
                          opacity={0.82}
                        />
                      </g>
                    );
                  })()}
                </>
              )}

              {i === 2 && (
                <>
                  {/* gig #3 — bold geometric bands + a single dot accent */}
                  {(() => {
                    const bx = sn(p.x + matIn + 2);
                    const bw = sn(p.w - matIn * 2 - 4);
                    const top = sn(p.y + p.h * 0.22);
                    return (
                      <g>
                        {/* diagonal bold band */}
                        <path
                          d={`M${bx} ${sn(top)} L${sn(bx + bw)} ${sn(top - p.h * 0.06)} L${sn(
                            bx + bw,
                          )} ${sn(top + p.h * 0.14)} L${bx} ${sn(top + p.h * 0.2)} Z`}
                          fill={ROOM.ink}
                          opacity={0.8}
                        />
                        {/* slim band below */}
                        <rect
                          x={bx}
                          y={sn(top + p.h * 0.3)}
                          width={bw}
                          height={sn(p.h * 0.05)}
                          fill={ROOM.posterMat}
                          opacity={0.85}
                        />
                        {/* bold dot accent */}
                        <circle
                          cx={sn(p.x + p.w * 0.34)}
                          cy={sn(p.y + p.h * 0.6)}
                          r={sn(p.w * 0.12)}
                          fill={ROOM.posterMat}
                          opacity={0.9}
                        />
                      </g>
                    );
                  })()}
                </>
              )}
            </g>

            {/* tiny "band name" type bars */}
            {typeBars(p, id, `type-${i}`)}
          </g>
        );
      })}
    </g>
  );
}
