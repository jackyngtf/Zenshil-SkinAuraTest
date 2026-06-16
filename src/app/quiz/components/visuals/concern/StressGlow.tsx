'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  Q8 · C 壓力 — STRAINED ENERGY (renders BEHIND the cracks)           */
/*                                                                     */
/*  Gives the "stress fractures" scene LIFE: a dim, cool, PRESSURIZED   */
/*  aura held behind a cracking glass surface. A low glow sits at the   */
/*  fracture origin and TIGHTENS under pressure (it contracts, it does  */
/*  not bloom), while soft cool seeps pool through the fracture         */
/*  JUNCTIONS — energy under pressure escaping through the cracks. Dim  */
/*  + slightly off-centre + always contracting, so it never reads as a  */
/*  bright centred disc / lamp.                                         */
/*                                                                     */
/*  DEPTH: a faint, heavily-blurred cool pocket sits low + off-centre   */
/*  toward the fracture origin, so the light feels held BEHIND the web  */
/*  (a pressurized pocket), not painted on top of it.                  */
/*                                                                     */
/*  HERO: a slow PRESSURE THROB — the strained core + the under-pocket  */
/*  build then ease (opacity up + a tiny scale) on a ~5.8s loop, like   */
/*  pressure mounting then releasing behind the glass; the core still   */
/*  CONTRACTS overall (scale stays ≤1, never blooms). The junction      */
/*  seeps pulse on their own desynced loops so none of them sync, held  */
/*  +1.0s so they don't float during the pre-tear beat. CONFIRM         */
/*  (~0.55s one-shot): the energy SURGES once — the core brightens +    */
/*  swells a touch and every seep pulses brighter (energy released      */
/*  through the new crack) — then it fades as the cracks retract.       */
/*  reduceMotion: everything parked at a representative mid state.       */
/* ================================================================== */

const S = CONCERN.stress;

/* Strained core sits at the fracture origin, a touch up-left of centre. */
const CORE_CX = 185;
const CORE_CY = 172;

/* Depth pocket: a faint pressurized pocket of light held BEHIND the web,
   nudged toward the fracture origin + lower so it never reads as a centred
   disc. Heavily blurred + very low opacity — pure depth. */
const POCKET_CX = 184;
const POCKET_CY = 186;

/* Fracture junctions — energy seeps through where the cracks meet. These
   match the crack web's junctions exactly. Each seep gets its own size +
   desynced loop (dur/delay) so the leakage never pulses in unison.
   Deterministic constant array (no Math.random). */
const SEEPS = [
  { cx: 185, cy: 170, r: 16, peak: 0.34, dur: 4.6, delay: 0.0 },
  { cx: 150, cy: 132, r: 12, peak: 0.26, dur: 3.8, delay: 1.1 },
  { cx: 260, cy: 118, r: 13, peak: 0.28, dur: 4.2, delay: 0.5 },
  { cx: 168, cy: 252, r: 12, peak: 0.24, dur: 5.0, delay: 1.8 },
  { cx: 250, cy: 200, r: 11, peak: 0.22, dur: 3.5, delay: 2.5 },
  { cx: 214, cy: 196, r: 10, peak: 0.2, dur: 4.4, delay: 0.8 },
] as const;

export default function StressGlow({ uid, isConfirming, reduceMotion }: ConcernPartProps) {
  const id = (n: string) => 'q8c-stressglow-' + n + '-' + uid;

  /* One-shot confirm easing (matches the family flare curve). */
  const flare = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.34, 0.9, 0.43, 1] };

  /* Strained core: dim + cool, CONTRACTS under strain (never blooms). A slow
     PRESSURE THROB — opacity builds then eases as pressure mounts behind the
     glass, while the core stays tight (scale ≤1, contracting). On confirm it
     surges (brighter + a touch larger), then fades as the cracks retract. */
  const coreAnimate = isConfirming
    ? { opacity: 0.42, scale: 1.05 }
    : reduceMotion
      ? { opacity: 0.29, scale: 0.98 }
      : { opacity: [0.24, 0.34, 0.24], scale: [0.99, 0.95, 0.99] };
  const coreTransition: Transition = isConfirming ? flare(0.55) : loop(reduceMotion, 5.8);

  /* Depth pocket: faint, heavily-blurred cool pocket behind the web. Shares
     the pressure throb (slightly slower + offset so it doesn't lock to the
     core) — builds then eases like the pressure pulsing in the cavity. Stays
     dim (≤0.22) so it reads as depth, not a focal glow. */
  const pocketAnimate = isConfirming
    ? { opacity: 0.26, scale: 1.04 }
    : reduceMotion
      ? { opacity: 0.16, scale: 1 }
      : { opacity: [0.13, 0.22, 0.13], scale: [0.98, 1.02, 0.98] };
  const pocketTransition: Transition = isConfirming ? flare(0.55) : loop(reduceMotion, 6.4, 0.9);

  /* Faint cool shimmer/haze over the whole web — very low opacity, just
     enough atmosphere so the field reads as charged, not flat. */
  const hazeAnimate = isConfirming
    ? { opacity: 0.16 }
    : reduceMotion
      ? { opacity: 0.09 }
      : { opacity: [0.07, 0.11, 0.07] };
  const hazeTransition: Transition = isConfirming ? flare(0.55) : loop(reduceMotion, 6.8, 0.6);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Strained core wash: dim cool centre → soft core → clear. Kept
            low-opacity so it stays a strain, not a lamp. */}
        <radialGradient id={id('core')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={S.coreHi} stopOpacity="0.55" />
          <stop offset="46%" stopColor={S.core} stopOpacity="0.26" />
          <stop offset="100%" stopColor={S.core} stopOpacity="0" />
        </radialGradient>
        {/* Seep wash: a small cool glow POOLING through a junction — energy
            concentrates where the cracks meet, so the core falloff is tight. */}
        <radialGradient id={id('seep')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={S.coreHi} stopOpacity="0.9" />
          <stop offset="38%" stopColor={S.core} stopOpacity="0.42" />
          <stop offset="72%" stopColor={S.core} stopOpacity="0.12" />
          <stop offset="100%" stopColor={S.core} stopOpacity="0" />
        </radialGradient>
        {/* Pressurized pocket wash: cool, soft, held behind the web. Dim
            centre fading wide — pure depth, never a defined disc. */}
        <radialGradient id={id('pocket')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={S.core} stopOpacity="0.5" />
          <stop offset="50%" stopColor={S.tension} stopOpacity="0.2" />
          <stop offset="100%" stopColor={S.tension} stopOpacity="0" />
        </radialGradient>
        {/* Heavy blur welds the strained core into a soft diffuse glow. */}
        <filter id={id('bCore')} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        {/* Heaviest blur — dissolves the pocket into pure depth behind the web. */}
        <filter id={id('bPocket')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="38" />
        </filter>
        {/* Light blur for the small junction seeps. */}
        <filter id={id('bSeep')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        {/* Soft blur for the atmospheric haze. */}
        <filter id={id('bHaze')} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* ── DEPTH: pressurized pocket of light held BEHIND the web ── */}
      {/* Off-centre + lower, heavily blurred, very dim — a sense of pressure
          pooled behind the fracture origin, not a focal disc. */}
      <motion.ellipse
        cx={POCKET_CX}
        cy={POCKET_CY}
        rx={138}
        ry={104}
        fill={`url(#${id('pocket')})`}
        filter={`url(#${id('bPocket')})`}
        initial={{ opacity: 0, scale: 1 }}
        animate={pocketAnimate}
        transition={pocketTransition}
        style={{ transformOrigin: `${POCKET_CX}px ${POCKET_CY}px` }}
      />

      {/* ── Faint cool shimmer/haze over the web (atmosphere) ── */}
      <motion.ellipse
        cx={196}
        cy={188}
        rx={168}
        ry={158}
        fill={`url(#${id('core')})`}
        filter={`url(#${id('bHaze')})`}
        initial={{ opacity: 0 }}
        animate={hazeAnimate}
        transition={hazeTransition}
        style={{ transformOrigin: '196px 188px' }}
      />

      {/* ── HERO: dim strained core that TIGHTENS under pressure ── */}
      <motion.ellipse
        cx={CORE_CX}
        cy={CORE_CY}
        rx={120}
        ry={106}
        fill={`url(#${id('core')})`}
        filter={`url(#${id('bCore')})`}
        initial={{ opacity: 0, scale: 1 }}
        animate={coreAnimate}
        transition={coreTransition}
        style={{ transformOrigin: `${CORE_CX}px ${CORE_CY}px` }}
      />

      {/* ── FRACTURE SEEPS: energy leaking through the junctions ── */}
      {SEEPS.map((s) => {
        const seepAnimate = isConfirming
          ? { opacity: 0, scale: 0.78 } // cracks retract → seeps fade back in
          : reduceMotion
            ? { opacity: s.peak * 0.72, scale: 0.98 }
            : // pressure pool: builds + concentrates (tighter scale), then eases
              { opacity: [s.peak * 0.4, s.peak, s.peak * 0.4], scale: [0.94, 1.06, 0.94] };
        const seepTransition: Transition = isConfirming
          ? flare(0.5)
          : loop(reduceMotion, s.dur, s.delay + 1.0); // hold until the cracks tear open
        return (
          <motion.circle
            key={`seep-${s.cx}-${s.cy}`}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={`url(#${id('seep')})`}
            filter={`url(#${id('bSeep')})`}
            initial={{ opacity: 0, scale: 1 }}
            animate={seepAnimate}
            transition={seepTransition}
            style={{ transformOrigin: `${s.cx}px ${s.cy}px` }}
          />
        );
      })}
    </g>
  );
}
