'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { STUDY, HOURGLASS, SAND_GRAINS, sn } from './studyLayout';

/* ================================================================== */
/*  Q4 · C 時間 (Time) — HOURGLASS HERO                                 */
/*                                                                     */
/*  The HERO of the study scene: a warm-wood HOURGLASS centred on      */
/*  x=200. A warm-wood top cap + two wood pillars + base feet hold two */
/*  clear glass bulbs (top emptying, bottom filling) pinched at a      */
/*  narrow neck. The focal animated element is the SAND: a coordinated  */
/*  d-morph — the TOP bulb's sand level LOWERS (FULL → MID → LOW →     */
/*  EMPTY) while the BOTTOM bulb's sand level RISES (EMPTY → MID →     */
/*  HIGH → FULL) in lockstep on a shared ~8s loop, plus a continuous    */
/*  falling STREAM thread + a single cycling GRAIN, so the whole reads */
/*  unambiguously as "sand falling = time passing". A cyan NECK-GLOW   */
/*  breathes with the flow (the time-glow).                            */
/*                                                                     */
/*  MOTION (deterministic, transform/opacity/path-d only): a LIVING    */
/*  SAND-FLOW — top empties as bottom fills, lockstep, ~8s eased loop, */
/*  with a continuous falling stream + grain. CONFIRM (~0.6s one-shot, */
/*  ease [0.32,.94,.4,1]): the top snaps toward EMPTY + bottom toward  */
/*  FULL + the stream stretches/brightens + the neck-glow BLOOMS + a   */
/*  few sand grains sparkle, then settle.                              */
/*  reduceMotion: top parked half-empty, bottom half-full, glow static.*/
/* ================================================================== */

/* Geometry — derived from the shared layout. */
const CX = HOURGLASS.cx; // 200

/* ── TOP bulb sand silhouettes: 4 keyframes that share the IDENTICAL
   command structure (M + 5× C) with first === last so the d-morph loops
   seamlessly — exactly CandleHero's / BedHero's FLAME_* discipline. The
   surface line drops over time (172 → 202) as the top bulb empties.
   Y-shifted -20 so the neck focal lands in the orb safe zone (y≈206). ── */
const SAND_TOP_FULL =
  'M180 172 ' +
  'C176 182 176 194 182 202 ' +
  'C186 206 194 206 200 206 ' +
  'C206 206 214 206 218 202 ' +
  'C224 194 224 182 220 172 ' +
  'C210 168 190 168 180 172 Z';
const SAND_TOP_MID =
  'M180 186 ' +
  'C182 192 182 200 186 204 ' +
  'C192 206 200 206 200 206 ' +
  'C206 206 214 206 218 204 ' +
  'C222 200 222 192 220 186 ' +
  'C210 184 190 184 180 186 Z';
const SAND_TOP_LOW =
  'M184 192 ' +
  'C186 197 188 202 192 204 ' +
  'C196 206 200 206 200 206 ' +
  'C206 206 210 206 214 204 ' +
  'C218 202 220 197 220 192 ' +
  'C212 190 188 190 184 192 Z';
const SAND_TOP_EMPTY =
  'M197 202 ' +
  'C198 204 200 206 200 206 ' +
  'C200 206 202 204 203 202 ' +
  'C202 201.5 199 201.5 197 202 ' +
  'C200 206 200 206 200 206 ' +
  'C200 206 200 206 200 206 Z';

/* ── BOTTOM bulb sand silhouettes: 4 keyframes, M + 4× C structure,
   first === last (so the d-morph loops seamlessly). Each is a SYMMETRIC
   CONE centred on x=200 (directly under the falling stream): a single
   peak at x=200 with rounded slopes falling equally to both sides (angle
   of repose), the peak rising EMPTY (low mound, ~y234) → FULL (tall cone,
   ~y219) as the bottom bulb fills. ── */
const SAND_BOT_EMPTY =
  'M193 238 C191 234 195 237 197 236 C197 234 203 234 203 236 C205 237 209 234 207 238 C212 240 188 240 193 238 Z';
const SAND_BOT_MID =
  'M190 238 C188 234 194 233 196 232 C196 230 204 230 204 232 C206 233 212 234 210 238 C212 240 188 240 190 238 Z';
const SAND_BOT_HIGH =
  'M187 238 C185 234 193 227 195 226 C195 224 205 224 205 226 C207 227 215 234 213 238 C212 240 188 240 187 238 Z';
const SAND_BOT_FULL =
  'M184 238 C182 234 192 222 194 221 C194 219 206 219 206 221 C208 222 218 234 216 238 C212 240 188 240 184 238 Z';

/* Reused glass bulb outlines (also used as clipPath shapes). */
const TOP_BULB_D =
  'M180 172 ' +
  'C176 182 176 194 182 202 ' +
  'C186 206 194 206 200 206 ' +
  'C206 206 214 206 218 202 ' +
  'C224 194 224 182 220 172 ' +
  'C210 168 190 168 180 172 Z';
const BOT_BULB_D =
  'M182 210 ' +
  'C186 206 194 206 200 206 ' +
  'C206 206 214 206 218 210 ' +
  'C224 220 224 232 220 238 ' +
  'C210 242 190 242 180 238 ' +
  'C176 232 176 220 182 210 Z';

/* one-shot confirm easing */
const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

export default function HourglassHero({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04study-hour-' + n + '-' + uid;

  /* ~8s shared eased loop for the sand levels + neck glow. */
  const breathe = (duration: number, delay = 0): Transition =>
    reduceMotion
      ? { duration: 0 }
      : {
          duration,
          delay,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        };

  /* linear loop for the falling stream + grain (constant velocity). */
  const drift = (duration: number, delay = 0): Transition =>
    reduceMotion
      ? { duration: 0 }
      : {
          duration,
          delay,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        };

  /* ── TOP bulb sand: level lowers (FULL→MID→LOW→EMPTY→FULL). ── */
  const topAnim = isConfirming
    ? { d: SAND_TOP_EMPTY }
    : reduceMotion
      ? { d: SAND_TOP_MID }
      : { d: [SAND_TOP_FULL, SAND_TOP_MID, SAND_TOP_LOW, SAND_TOP_EMPTY, SAND_TOP_FULL] };
  const topTrans: Transition = isConfirming ? surge(reduceMotion, 0.6) : breathe(8);

  /* ── BOTTOM bulb sand: level rises (EMPTY→MID→HIGH→FULL→EMPTY). ── */
  const botAnim = isConfirming
    ? { d: SAND_BOT_FULL }
    : reduceMotion
      ? { d: SAND_BOT_MID }
      : { d: [SAND_BOT_EMPTY, SAND_BOT_MID, SAND_BOT_HIGH, SAND_BOT_FULL, SAND_BOT_EMPTY] };
  const botTrans: Transition = isConfirming ? surge(reduceMotion, 0.6) : breathe(8);

  /* ── Falling STREAM: continuous thread; brightens + stretches on confirm. ── */
  const streamAnim = isConfirming
    ? { scaleY: 1.4, opacity: 1 }
    : reduceMotion
      ? { scaleY: 1, opacity: 0.7 }
      : { scaleY: [1, 1.12, 0.96, 1], opacity: [0.7, 0.9, 0.7] };
  const streamTrans: Transition = isConfirming ? surge(reduceMotion, 0.6) : drift(1.6);

  /* ── Single falling GRAIN: translate y loop (neck y≈206 → drops to ≈226). ── */
  const grainAnim = isConfirming
    ? { y: 226, opacity: 1 }
    : reduceMotion
      ? { y: 214, opacity: 0.6 }
      : { y: [206, 226, 206], opacity: [0, 0.9, 0] };
  const grainTrans: Transition = isConfirming ? surge(reduceMotion, 0.6) : drift(1.8);

  /* ── Cyan NECK-GLOW: breathes with the flow. ── */
  const neckAnim = isConfirming
    ? { opacity: 0.7, scale: 1.3 }
    : reduceMotion
      ? { opacity: 0.25, scale: 1 }
      : { opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.08, 0.95] };
  const neckTrans: Transition = isConfirming ? surge(reduceMotion, 0.6) : breathe(4);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Wood top cap / base — warm highlight → wood. */}
        <linearGradient id={id('woodCap')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.woodFrameHi} />
          <stop offset="100%" stopColor={STUDY.woodFrame} />
        </linearGradient>
        {/* Wood pillars — warm highlight → dark. */}
        <linearGradient id={id('woodPillar')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.woodFrameHi} />
          <stop offset="100%" stopColor={STUDY.woodFrameDark} />
        </linearGradient>
        {/* Top bulb sand — pale → warm amber. */}
        <linearGradient id={id('sandTop')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.sandPale} />
          <stop offset="100%" stopColor={STUDY.sandMid} />
        </linearGradient>
        {/* Bottom bulb sand — warm amber → shade. */}
        <linearGradient id={id('sandBot')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.sandMid} />
          <stop offset="100%" stopColor={STUDY.sandShade} />
        </linearGradient>
        {/* Glass — clear, low opacity, faint shade at base. */}
        <linearGradient id={id('glass')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.glass} stopOpacity="0.22" />
          <stop offset="70%" stopColor={STUDY.glassShade} stopOpacity="0.12" />
          <stop offset="100%" stopColor={STUDY.glassShade} stopOpacity="0" />
        </linearGradient>
        {/* Cyan neck glow. */}
        <radialGradient id={id('neckGlow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={STUDY.glowBloom} stopOpacity="0.5" />
          <stop offset="100%" stopColor={STUDY.glowBloom} stopOpacity="0" />
        </radialGradient>

        {/* ClipPaths so the sand never spills outside the bulbs. */}
        <clipPath id={id('glassTopClip')}>
          <path d={TOP_BULB_D} />
        </clipPath>
        <clipPath id={id('glassBotClip')}>
          <path d={BOT_BULB_D} />
        </clipPath>

        {/* Static blur filters — never animated. */}
        <filter id={id('bNeck')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={id('bShadow')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ── Contact shadow under the hourglass (tracks raised base y≈240) ── */}
      <ellipse
        cx={CX}
        cy={242}
        rx={22}
        ry={4}
        fill={STUDY.deskFront}
        opacity={0.34}
        filter={`url(#${id('bShadow')})`}
      />

      {/* ── WOOD FRAME: base feet + pillars + top cap (the warm structure) ── */}
      {/* base feet */}
      <rect x={174} y={236} width={52} height={6} rx={2} fill={STUDY.woodFrame} />
      <ellipse cx={CX} cy={HOURGLASS.baseY} rx={26} ry={5} fill={`url(#${id('woodCap')})`} />
      {/* pillars */}
      <rect x={HOURGLASS.pillarLX} y={HOURGLASS.capTopY} width={HOURGLASS.pillarW} height={72} rx={2} fill={`url(#${id('woodPillar')})`} />
      <rect x={HOURGLASS.pillarRX} y={HOURGLASS.capTopY} width={HOURGLASS.pillarW} height={72} rx={2} fill={`url(#${id('woodPillar')})`} />
      {/* top cap */}
      <ellipse cx={CX} cy={HOURGLASS.capTopY} rx={26} ry={5} fill={`url(#${id('woodCap')})`} />
      <ellipse cx={CX} cy={170} rx={24} ry={3} fill={STUDY.woodFrameDark} opacity={0.5} />

      {/* ── BOTTOM glass bulb + sand (clipped) ── */}
      <path d={BOT_BULB_D} fill={`url(#${id('glass')})`} stroke={STUDY.glassEdge} strokeWidth={1} opacity={0.5} />
      <motion.path
        d={isConfirming ? SAND_BOT_FULL : SAND_BOT_EMPTY}
        fill={`url(#${id('sandBot')})`}
        clipPath={`url(#${id('glassBotClip')})`}
        initial={false}
        animate={botAnim}
        transition={botTrans}
      />
      {/* faint inner shade on the right side of the bottom bulb */}
      <path d={BOT_BULB_D} fill={STUDY.glassShade} opacity={0.14} clipPath={`url(#${id('glassBotClip')})`} style={{ transformOrigin: '210px 224px' }} transform="translate(6 0)" />

      {/* ── TOP glass bulb + sand (clipped) ── */}
      <path d={TOP_BULB_D} fill={`url(#${id('glass')})`} stroke={STUDY.glassEdge} strokeWidth={1} opacity={0.5} />
      <motion.path
        d={isConfirming ? SAND_TOP_EMPTY : SAND_TOP_FULL}
        fill={`url(#${id('sandTop')})`}
        clipPath={`url(#${id('glassTopClip')})`}
        initial={false}
        animate={topAnim}
        transition={topTrans}
      />

      {/* ── NECK: narrow dark slot between the bulbs (y≈206) ── */}
      <rect x={197} y={202} width={6} height={8} fill={STUDY.woodFrameDark} opacity={0.4} />

      {/* ── Falling STREAM thread (continuous) ── */}
      <motion.rect
        x={199}
        y={206}
        width={2}
        height={18}
        rx={1}
        fill={STUDY.sandMid}
        opacity={0.85}
        initial={false}
        animate={streamAnim}
        transition={streamTrans}
        style={{ transformOrigin: '200px 206px' }}
      />

      {/* ── Single falling GRAIN (translate y loop) ── */}
      <motion.circle
        cx={200}
        cy={206}
        r={0.8}
        fill={STUDY.sandPale}
        initial={false}
        animate={grainAnim}
        transition={grainTrans}
      />

      {/* ── Cyan NECK-GLOW (breathes with the flow, centred on neck y≈206) ── */}
      <motion.ellipse
        cx={CX}
        cy={206}
        rx={10}
        ry={6}
        fill={`url(#${id('neckGlow')})`}
        filter={`url(#${id('bNeck')})`}
        initial={false}
        animate={neckAnim}
        transition={neckTrans}
        style={{ transformOrigin: '200px 206px' }}
      />

      {/* ── Confirm sand-grain sparkles (catch light near the neck) ── */}
      {SAND_GRAINS.map((g, i) => (
        <motion.circle
          key={`grain-${i}`}
          cx={g.x}
          cy={g.y}
          r={g.r}
          fill={STUDY.sandPale}
          initial={false}
          animate={
            isConfirming
              ? { opacity: [0, 1, 0.4] }
              : reduceMotion
                ? { opacity: 0.3 }
                : { opacity: [0.2, 0.6, 0.2] }
          }
          transition={isConfirming ? surge(reduceMotion, 0.6) : breathe(2.4, g.delay)}
          style={{ transformOrigin: `${g.x}px ${g.y}px` }}
        />
      ))}
    </g>
  );
}
