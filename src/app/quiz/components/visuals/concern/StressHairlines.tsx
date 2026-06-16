'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { CONCERN, loop } from './concernShared';
import type { ConcernPartProps } from './concernShared';

/* ================================================================== */
/*  Q8 · C 壓力 — STRESS HAIRLINES (fine secondary craze)               */
/*                                                                     */
/*  The delicate crackle that sits BENEATH/AROUND the main fractures    */
/*  (StressFractures, a teammate's file). Short, thin hairline cracks    */
/*  branch off the main-crack vertices/segments and splinter into the    */
/*  gaps — the fine porcelain-glaze crazing that makes a stressed orb    */
/*  read as real. Rendered fainter + thinner than the main web so they   */
/*  recede and add depth, never clutter.                                 */
/*                                                                     */
/*  MOTION: fade in slightly after the main cracks; a whisper-subtle     */
/*  strained flicker on the group opacity at a different period than the */
/*  main web (so they don't lock in sync). CONFIRM (~0.55s one-shot):    */
/*  the craze brightens a touch then settles. reduceMotion: static at    */
/*  mid opacity, no flicker.                                             */
/* ================================================================== */

const S = CONCERN.stress;

/* Fine secondary craze. Each path starts AT a point on a main crack
   (vertex or along a segment) and splinters a short way into a gap with
   1–3 jagged segments (~14–40px). Deterministic constant array.
   Distributed across upper / lower / left / right, clear of the (185,170)
   origin and kept within r≈170 of (200,200). */
const HAIRLINES = [
  /* ── upper region (off the top spokes) ── */
  'M186 90 L168 84 L156 70',
  'M178 54 L196 60 L210 50',
  'M176 124 L198 118 L214 100',
  'M150 132 L138 110 L150 90',
  'M120 138 L104 122 L110 104',
  'M86 108 L70 116 L60 102',
  /* ── right region (off the right spokes) ── */
  'M214 196 L228 176 L246 168',
  'M250 200 L274 188 L292 196',
  'M296 222 L312 210 L324 218',
  'M260 118 L246 96 L256 78',
  'M302 98 L318 110 L332 100',
  'M286 150 L302 138',
  /* ── lower region (off the down spokes) ── */
  'M160 210 L142 220 L132 240',
  'M168 252 L188 262 L200 284',
  'M150 298 L134 312 L142 332',
  'M206 232 L224 224 L240 236',
  'M244 262 L262 252 L278 264',
  'M262 308 L246 322 L252 340',
  /* ── left region (off the upper-left + mid spokes) ── */
  'M132 168 L114 158 L102 168',
  'M100 188 L82 198 L72 188',
  'M106 300 L90 312 L94 330',
  'M132 268 L116 282',
  /* ── inner fillers (mid gaps, still clear of origin) ── */
  'M268 234 L284 248 L300 244',
  'M226 150 L240 134 L256 138',
] as const;

/* A FEW of these get a faint lit edge for a hint of sheen — keep subtle.
   Indices into HAIRLINES. */
const LIT = new Set([2, 7, 13, 19, 22]);

export default function StressHairlines({ isConfirming, reduceMotion }: ConcernPartProps) {
  const surge = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.34, 0.9, 0.43, 1] };

  /* Whisper-subtle strained flicker on the whole craze. A different period
     (3.8s) than the main web (3.6s) so the two don't lock in sync. The
     entrance fade (0→mid, delayed slightly after the main cracks) is merged
     into the same transition so a single group owns the opacity. */
  const crazeAnimate = isConfirming
    ? { opacity: 0 }
    : reduceMotion
      ? { opacity: 0.58 }
      : { opacity: [0.5, 0.7, 0.55, 0.66, 0.5] };
  const crazeTransition: Transition = isConfirming
    ? surge(0.55)
    : reduceMotion
      ? { duration: 0 }
      : { ...loop(reduceMotion, 3.8), opacity: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' } };

  return (
    <g aria-hidden="true">
      {/* Outer group: a pure entrance reveal (0→1), delayed slightly after
          the main cracks. Keeps opacity separate from the flicker below so
          the two never fight over the same property. */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 1.15 }}
      >
        {/* Inner group: the faint strained flicker on the craze opacity, at a
            different period (3.8s) than the main web (3.6s) so they don't
            lock in sync; brightens a touch on confirm, then settles. */}
        <motion.g initial={false} animate={crazeAnimate} transition={crazeTransition}>
          {/* Faint lit-edge sheen on a few hairlines (drawn under the dark
              body so the dark line still reads). */}
          {HAIRLINES.map((d, i) =>
            LIT.has(i) ? (
              <path
                key={`lit-${i}`}
                d={d}
                fill="none"
                stroke={S.fieldHi}
                strokeWidth={0.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.5}
              />
            ) : null,
          )}
          {/* Fine dark craze bodies — thin + faint so they recede. */}
          {HAIRLINES.map((d, i) => (
            <path
              key={`hair-${i}`}
              d={d}
              fill="none"
              stroke={i % 3 === 0 ? S.tension : S.weightDeep}
              strokeWidth={i % 4 === 0 ? 0.7 : i % 4 === 1 ? 1.0 : 0.85}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={i % 5 === 0 ? 0.22 : i % 5 === 2 ? 0.38 : 0.3}
            />
          ))}
        </motion.g>
      </motion.g>
    </g>
  );
}
