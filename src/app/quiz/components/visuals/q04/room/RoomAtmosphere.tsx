'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { ROOM, MUSIC_SOURCE, DESK_Y, sn } from './roomLayout';

/* ================================================================== */
/*  Q4·B 放鬆 (Relaxation) — ATMOSPHERE over the cosy night room.       */
/*                                                                     */
/*  Renders TOPMOST, over the room backdrop + turntable + candle. It    */
/*  ties the scene together in warm candlelit night light + a gentle    */
/*  float of music rising from the record (MUSIC_SOURCE ≈ 168,184).     */
/*                                                                     */
/*  1. COSY LIGHTING — a wide soft warm GLOW pools over the desk/turn-  */
/*     table area (low opacity, statically blurred) that gently         */
/*     BREATHES; a faint overall warm HAZE so the whole room reads      */
/*     candlelit; a soft warm vignette keeps corners dim (cosy night).  */
/*  2. MUSIC NOTES — 4 small elegant ♪ (filled notehead + thin stem +   */
/*     flag) rise + sway side-to-side from the record, fading as they   */
/*     climb. Desynced slow loops (~5–9s). Tasteful, not a shower.      */
/*  3. SOUND RIPPLE — two very soft concentric arcs pulse outward from  */
/*     the record (low opacity) — sound waves drifting up. Subtle.      */
/*  4. WARM BOKEH — 6 soft out-of-focus warm motes drift slowly UP +    */
/*     twinkle (warm air dust in candlelight). Blurred, low opacity.    */
/*                                                                     */
/*  CONFIRM (~0.6s one-shot, ease [0.32,0.94,0.4,1]): the warm light     */
/*  BLOOMS a touch + a burst of notes lifts/brightens (music swells),   */
/*  then settles. reduceMotion: light static at mid, notes parked mid-  */
/*  rise at mid opacity, no loops.                                      */
/* ================================================================== */

const SRC = MUSIC_SOURCE;

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

/* ── Music note glyph ──
   A small filled notehead (slightly slanted ellipse) + a thin stem
   rising on its right, capped with a soft flag. Drawn around a local
   origin so the whole ♪ can be transformed as a unit. nx/ny = notehead
   centre; the stem rises from the notehead's right edge. */
function noteGlyph(stem: number, flag: boolean) {
  const headRx = 4.2;
  const headRy = 3.1;
  const stemX = headRx - 0.4; // stem hugs the right edge of the head
  const topY = -stem;
  const stemD = `M${sn(stemX)} 0 L${sn(stemX)} ${sn(topY)}`;
  /* flag: a soft curl off the top of the stem */
  const flagD = flag
    ? `M${sn(stemX)} ${sn(topY)} C${sn(stemX + 5)} ${sn(topY + 2)} ${sn(
        stemX + 5.5,
      )} ${sn(topY + 7)} ${sn(stemX + 2.5)} ${sn(topY + 9)}`
    : '';
  return { headRx, headRy, stemX, topY, stemD, flagD };
}

/* Four notes rising from the record. Each on its own slow desynced loop.
   x = launch x (clustered just above the record), rise = how far up it
   drifts, sway = horizontal wander, rot = slight tilt, scale = size.
   Constant arrays only — deterministic. */
const NOTES = [
  { x: SRC.x - 14, rise: 86, sway: -12, stem: 12, flag: true, rot: -8, scale: 1.0, dur: 7.4, delay: 0.0, peak: 0.5 },
  { x: SRC.x + 8, rise: 96, sway: 14, stem: 14, flag: false, rot: 7, scale: 0.85, dur: 8.6, delay: 1.9, peak: 0.42 },
  { x: SRC.x - 4, rise: 78, sway: -8, stem: 11, flag: true, rot: -5, scale: 0.74, dur: 6.2, delay: 3.4, peak: 0.46 },
  { x: SRC.x + 18, rise: 104, sway: 18, stem: 13, flag: false, rot: 10, scale: 0.62, dur: 9.0, delay: 4.6, peak: 0.36 },
] as const;

/* Warm out-of-focus motes — scattered around the desk + upper air, each
   on a slow desynced loop, gentle up-drift. Deterministic. */
const MOTES = [
  { cx: SRC.x - 40, cy: 200, r: 4.6, dx: 6, dy: -30, dur: 11.0, delay: 0.0, peak: 0.32 },
  { cx: SRC.x + 58, cy: 196, r: 6.2, dx: -7, dy: -34, dur: 13.0, delay: 1.7, peak: 0.36 },
  { cx: SRC.x - 70, cy: 150, r: 3.4, dx: 5, dy: -26, dur: 12.0, delay: 3.0, peak: 0.26 },
  { cx: SRC.x + 96, cy: 158, r: 5.0, dx: -6, dy: -28, dur: 13.8, delay: 0.8, peak: 0.3 },
  { cx: SRC.x + 24, cy: 110, r: 3.0, dx: 4, dy: -22, dur: 12.6, delay: 2.4, peak: 0.22 },
  { cx: 312, cy: 196, r: 5.6, dx: -8, dy: -26, dur: 14.4, delay: 3.9, peak: 0.24 }, // by the candle
] as const;

export default function RoomAtmosphere({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04room-atmo-' + n + '-' + uid;

  /* The warm light pools over the desk/turntable, biased to the source. */
  const glowCx = (SRC.x + 200) / 2 + 4; // gently centred over the desk
  const glowCy = DESK_Y - 16;

  const glowLoop = loop(reduceMotion, 6.6);
  const hazeLoop = loop(reduceMotion, 9.0, 0.6);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Warm desk light pool — bright amber core dissolving to nothing. */}
        <radialGradient id={id('pool')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ROOM.glowAmber} stopOpacity="0.85" />
          <stop offset="45%" stopColor={ROOM.lamp} stopOpacity="0.4" />
          <stop offset="100%" stopColor={ROOM.lamp} stopOpacity="0" />
        </radialGradient>
        {/* Faint overall warm haze — whole-room candlelit wash. */}
        <radialGradient id={id('haze')} cx="46%" cy="62%" r="62%">
          <stop offset="0%" stopColor={ROOM.lampSoft} stopOpacity="0.5" />
          <stop offset="60%" stopColor={ROOM.lampSoft} stopOpacity="0.16" />
          <stop offset="100%" stopColor={ROOM.lampSoft} stopOpacity="0" />
        </radialGradient>
        {/* Cosy night vignette — corners stay dim. Transparent centre,
            warm-dark edge wash (uses the deep wall tone, kept very soft). */}
        <radialGradient id={id('vig')} cx="50%" cy="52%" r="72%">
          <stop offset="0%" stopColor={ROOM.wallLo} stopOpacity="0" />
          <stop offset="68%" stopColor={ROOM.wallLo} stopOpacity="0" />
          <stop offset="100%" stopColor={ROOM.wallLo} stopOpacity="0.34" />
        </radialGradient>
        {/* Soft round bokeh fill — warm core dissolving to nothing. */}
        <radialGradient id={id('boke')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ROOM.lampSoft} stopOpacity="0.95" />
          <stop offset="45%" stopColor={ROOM.note} stopOpacity="0.5" />
          <stop offset="100%" stopColor={ROOM.glowAmber} stopOpacity="0" />
        </radialGradient>

        {/* Static blurs only — never animated. */}
        <filter id={id('bGlow')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id={id('bHaze')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
        <filter id={id('bNote')} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <filter id={id('bRipple')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id={id('bBoke')} x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>

      {/* ── COSY LIGHTING: warm haze wash over the whole room ── */}
      <motion.rect
        x={0}
        y={0}
        width={400}
        height={320}
        fill={`url(#${id('haze')})`}
        filter={`url(#${id('bHaze')})`}
        initial={{ opacity: 0 }}
        animate={
          isConfirming
            ? { opacity: 0.34 }
            : reduceMotion
              ? { opacity: 0.2 }
              : { opacity: [0.16, 0.24, 0.16] }
        }
        transition={isConfirming ? surge(reduceMotion) : hazeLoop}
        style={{ transformOrigin: '200px 200px' }}
      />

      {/* ── COSY LIGHTING: warm light pool breathing over the desk ── */}
      <motion.ellipse
        cx={sn(glowCx)}
        cy={sn(glowCy)}
        rx={132}
        ry={84}
        fill={`url(#${id('pool')})`}
        filter={`url(#${id('bGlow')})`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={
          isConfirming
            ? { opacity: 0.42, scale: 1.1 }
            : reduceMotion
              ? { opacity: 0.24, scale: 1 }
              : { opacity: [0.18, 0.3, 0.18], scale: [0.98, 1.05, 0.98] }
        }
        transition={isConfirming ? surge(reduceMotion) : glowLoop}
        style={{ transformOrigin: `${sn(glowCx)}px ${sn(glowCy)}px` }}
      />

      {/* ── SOUND RIPPLE: soft concentric arcs pulsing up from the record ── */}
      <g opacity={0.9}>
        {[
          { dur: 5.4, delay: 0.0, peak: 0.22 },
          { dur: 6.4, delay: 2.7, peak: 0.16 },
        ].map((rp, i) => (
          <motion.path
            key={`ripple-${i}`}
            d={`M${sn(SRC.x - 26)} ${sn(SRC.y)} A 26 26 0 0 1 ${sn(
              SRC.x + 26,
            )} ${sn(SRC.y)}`}
            fill="none"
            stroke={ROOM.note}
            strokeWidth={1.4}
            strokeLinecap="round"
            filter={`url(#${id('bRipple')})`}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={
              isConfirming
                ? { opacity: rp.peak + 0.12, scale: 1.6 }
                : reduceMotion
                  ? { opacity: rp.peak * 0.6, scale: 1.1 }
                  : { opacity: [0, rp.peak, 0], scale: [0.5, 1.9, 2.3] }
            }
            transition={
              isConfirming ? surge(reduceMotion) : drift(reduceMotion, rp.dur, rp.delay)
            }
            style={{ transformOrigin: `${sn(SRC.x)}px ${sn(SRC.y)}px` }}
          />
        ))}
      </g>

      {/* ── MUSIC NOTES: small ♪ rising + swaying from the record ── */}
      <g>
        {NOTES.map((n, i) => {
          const g = noteGlyph(n.stem, n.flag);
          const animate = isConfirming
            ? {
                x: n.sway * 0.4,
                y: -(n.rise * 0.28) - 8,
                opacity: Math.min(0.7, n.peak + 0.2),
                scale: n.scale * 1.16,
              }
            : reduceMotion
              ? {
                  x: n.sway * 0.5,
                  y: -(n.rise * 0.5),
                  opacity: n.peak * 0.62,
                  scale: n.scale,
                }
              : {
                  x: [0, n.sway * 0.5, n.sway],
                  y: [0, -(n.rise * 0.5), -n.rise],
                  opacity: [0, n.peak, n.peak * 0.4, 0],
                  scale: [n.scale * 0.8, n.scale, n.scale * 0.9],
                };
          const transition: Transition = isConfirming
            ? surge(reduceMotion)
            : drift(reduceMotion, n.dur, n.delay);
          return (
            <motion.g
              key={`note-${i}`}
              initial={{ x: 0, y: 0, opacity: 0, scale: n.scale * 0.8 }}
              animate={animate}
              transition={transition}
              style={{ transformOrigin: `${sn(n.x)}px ${sn(SRC.y)}px` }}
            >
              {/* fixed inner transform places + tilts the glyph; motion.g
                  above only handles rise/sway/fade so the d stays static. */}
              <g
                transform={`translate(${sn(n.x)} ${sn(SRC.y)}) rotate(${sn(n.rot)})`}
                opacity={0.92}
                filter={`url(#${id('bNote')})`}
              >
                <ellipse
                  cx={0}
                  cy={0}
                  rx={sn(g.headRx)}
                  ry={sn(g.headRy)}
                  fill={ROOM.note}
                  transform="rotate(-20)"
                />
                <path
                  d={g.stemD}
                  stroke={ROOM.note}
                  strokeWidth={1.3}
                  strokeLinecap="round"
                  fill="none"
                />
                {n.flag && (
                  <path
                    d={g.flagD}
                    stroke={ROOM.note}
                    strokeWidth={1.3}
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </g>
            </motion.g>
          );
        })}
      </g>

      {/* ── WARM BOKEH: soft motes drifting up + twinkling ── */}
      <g>
        {MOTES.map((m) => {
          const animate = isConfirming
            ? {
                opacity: Math.min(0.58, m.peak + 0.18),
                x: m.dx * 0.35,
                y: -9,
                scale: 1.2,
              }
            : reduceMotion
              ? { opacity: m.peak * 0.6, x: 0, y: 0, scale: 1 }
              : {
                  opacity: [0, m.peak, m.peak * 0.5, 0],
                  x: [0, m.dx * 0.5, m.dx],
                  y: [0, m.dy * 0.5, m.dy],
                  scale: [0.85, 1.1, 0.92],
                };
          const transition: Transition = isConfirming
            ? surge(reduceMotion)
            : drift(reduceMotion, m.dur, m.delay);
          return (
            <motion.circle
              key={`boke-${m.cx}-${m.cy}`}
              cx={m.cx}
              cy={m.cy}
              r={sn(m.r)}
              fill={`url(#${id('boke')})`}
              filter={`url(#${id('bBoke')})`}
              initial={{ opacity: 0, x: 0, y: 0, scale: 1 }}
              animate={animate}
              transition={transition}
              style={{ transformOrigin: `${m.cx}px ${m.cy}px` }}
            />
          );
        })}
      </g>

      {/* ── COSY NIGHT VIGNETTE: dim the corners (rendered above light,
            below nothing — keeps the room feeling intimate at night) ── */}
      <rect
        x={0}
        y={0}
        width={400}
        height={320}
        fill={`url(#${id('vig')})`}
        pointerEvents="none"
      />
    </g>
  );
}
