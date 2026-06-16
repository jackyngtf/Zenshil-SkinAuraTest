'use client';

import { motion } from 'framer-motion';
import { loop } from '../ritualShared';
import { ROOM, BED_RIDGE, sn } from './spaRoom';
import type { SpaPartProps } from './spaRoom';

/* ================================================================== */
/*  Q10·B「暖調 SPA 鬆弛室」— SPA TOWELS (the "freshly-prepared" cue).   */
/*  A neat stack of two folded ivory towels with a rolled towel        */
/*  resting in front, and a tiny cherry-blossom sprig laid on top.     */
/*  Sits in the RIGHT zone (x≈250–336) on the linen ridge (y≈BED_RIDGE */
/*  286) so it never collides with the candle/steam still-life a       */
/*  teammate draws at x≈130–245.                                        */
/*                                                                     */
/*  Family finish (cf. locked A/C scenes): soft ROOM.towel→towelLo     */
/*  gradients, blurred contact shadow, upper-left dawn light → ivory   */
/*  rim-light on the upper-left edges + soft shadow lower-right and    */
/*  between the folds. Renders a single <g> (defs inside) so it        */
/*  composites into RitualSpaScene without an extra <svg>.             */
/*                                                                     */
/*  Motion: the towels are essentially STATIC (the scene breathes the  */
/*  whole still-life). Only a whisper of life — a faint highlight      */
/*  shimmer + the blossom barely settling — and on confirm a one-shot  */
/*  (~0.5s) bright sweep across the stack. transform/opacity only.     */
/* ================================================================== */

export default function SpaDaybed({ uid, isConfirming, reduceMotion }: SpaPartProps) {
  /* Namespaced so multiple coexisting instances never collide. */
  const ns = (name: string) => `q10-spaTowel-${name}-${uid}`;
  const url = (name: string) => `url(#${ns(name)})`;

  /* The stack rests with its base on the linen ridge. The lower folded
     towel is the WIDER one; the upper folded towel is NARROWER and
     stacked on it, ~y252–288 total. */
  const STACK_CX = 286; // visual centre-x of the folded stack

  /* ── Confirm highlight sweep ──────────────────────────────────────
     A bright bar that slides L→R across the towels once (~0.5s). The
     bar lives inside a clip welded to the stack silhouette so the
     brighten only reads ON the linen. Static when reduceMotion. ── */
  const sweepAnim = reduceMotion
    ? { x: 0, opacity: 0 }
    : isConfirming
      ? { x: [-70, 90], opacity: [0, 0.85, 0] }
      : { x: 0, opacity: 0 };
  const sweepTrans = isConfirming
    ? { duration: 0.5, ease: 'easeOut' as const }
    : { duration: 0 };

  /* Faint idle shimmer on the top fold's lit edge — barely-there life. */
  const shimmerAnim = reduceMotion
    ? { opacity: 0.34 }
    : { opacity: [0.24, 0.42, 0.24] };

  /* Blossom sprig barely settling (a tiny rock about its stem base). */
  const sprigAnim = reduceMotion
    ? { rotate: 0 }
    : isConfirming
      ? { rotate: [-1.4, 1.2, 0] }
      : { rotate: [-1, 1, -1] };
  const sprigTrans = isConfirming
    ? { duration: 0.55, ease: 'easeOut' as const }
    : loop(reduceMotion, 7.6);

  /* Folded-stack silhouette (lower wide towel + upper narrow towel),
     used as the sweep clip so the brighten is masked to the linen. */
  const stackClipD =
    /* lower wide towel: rounded slab y268–288, x252–334 */
    'M260 288 C254 288 250 284 250 278 L250 270 C250 264 254 268 260 268 ' +
    'L326 268 C332 268 336 264 336 270 L336 278 C336 284 332 288 326 288 Z ' +
    /* upper narrow towel: rounded slab y250–268, x262–326 */
    'M270 268 C264 268 260 264 260 258 L260 252 C260 248 264 250 270 250 ' +
    'L318 250 C324 250 328 248 328 252 L328 258 C328 264 324 268 318 268 Z';

  return (
    <g>
      <defs>
        {/* Folded-towel face: dawn-lit ivory at the upper-left → towelLo
            at the lower-right (limb-darkening on the turned-away side). */}
        <linearGradient id={ns('fold')} x1="14%" y1="6%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={ROOM.towel} />
          <stop offset="56%" stopColor="#f3e6d2" />
          <stop offset="100%" stopColor={ROOM.towelLo} />
        </linearGradient>
        {/* Rolled-towel END cap — radial so it reads as a soft cylinder
            seen end-on, brightest toward the upper-left light. */}
        <radialGradient id={ns('rollEnd')} cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor={ROOM.towel} />
          <stop offset="52%" stopColor="#f1e3ce" />
          <stop offset="100%" stopColor={ROOM.towelLo} />
        </radialGradient>
        {/* Rolled-towel BODY — left-to-right falloff along the cylinder. */}
        <linearGradient id={ns('rollBody')} x1="0%" y1="20%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#f6ead8" />
          <stop offset="60%" stopColor={ROOM.towelLo} />
          <stop offset="100%" stopColor="#e2cfb2" />
        </linearGradient>
        {/* The travelling brighten gradient for the confirm sweep. */}
        <linearGradient id={ns('sweep')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={ROOM.fieldHi} stopOpacity="0" />
          <stop offset="50%" stopColor="#fffaf0" stopOpacity="0.95" />
          <stop offset="100%" stopColor={ROOM.fieldHi} stopOpacity="0" />
        </linearGradient>
        {/* Blur passes — each stdDeviation defined exactly once. */}
        <filter id={ns('b2')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={ns('b5')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <clipPath id={ns('stackClip')}>
          <path d={stackClipD} />
        </clipPath>
      </defs>

      {/* ── Contact shadow: blurred pool under the whole stack, biased
            lower-right (away from the upper-left light) so the linens
            sit ON the ridge, not floating. ── */}
      <ellipse
        cx={STACK_CX + 6}
        cy={BED_RIDGE + 6}
        rx={56}
        ry={13}
        fill={ROOM.deep}
        opacity={0.2}
        filter={url('b5')}
      />

      {/* ── LOWER folded towel (the WIDER one) — soft rounded slab ── */}
      <g>
        <rect
          x={250}
          y={268}
          width={86}
          height={20}
          rx={9}
          fill={url('fold')}
        />
        {/* Front face shadow strip (the fold turns down toward us, away
            from the light) — soft lower-right darkening. */}
        <rect
          x={250}
          y={282}
          width={86}
          height={6}
          rx={3}
          fill={ROOM.towelLo}
          opacity={0.5}
        />
        {/* Two gentle fold lines along the towel's rolled edge. */}
        <path
          d="M258 274 C282 270 312 270 330 274"
          fill="none"
          stroke={ROOM.gold}
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.22}
        />
        <path
          d="M260 280 C284 277 312 277 328 280"
          fill="none"
          stroke={ROOM.gold}
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.16}
        />
        {/* Ivory rim-light catching the upper-left top edge. */}
        <path
          d="M256 270 C280 266 308 266 326 269"
          fill="none"
          stroke={ROOM.fieldHi}
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.7}
        />
      </g>

      {/* ── UPPER folded towel (the NARROWER one) — stacked on top ── */}
      <g>
        {/* Seam shadow where the upper towel meets the lower one. */}
        <rect
          x={260}
          y={264}
          width={68}
          height={6}
          rx={3}
          fill={ROOM.deep}
          opacity={0.12}
          filter={url('b2')}
        />
        <rect
          x={260}
          y={250}
          width={68}
          height={18}
          rx={8}
          fill={url('fold')}
        />
        <rect
          x={260}
          y={262}
          width={68}
          height={6}
          rx={3}
          fill={ROOM.towelLo}
          opacity={0.45}
        />
        <path
          d="M267 256 C288 252 312 252 322 256"
          fill="none"
          stroke={ROOM.gold}
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.2}
        />
        {/* Lit top edge with a whisper of idle shimmer. */}
        <motion.path
          d="M266 252 C288 248 312 248 322 251"
          fill="none"
          stroke={ROOM.fieldHi}
          strokeWidth={1.6}
          strokeLinecap="round"
          initial={false}
          animate={shimmerAnim}
          transition={loop(reduceMotion, 6.2)}
        />
      </g>

      {/* ── ROLLED towel lying in FRONT of the stack — a soft cylinder
            seen end-on. The circular END cap faces us (left), the body
            recedes to the right. Sits ~x300–334, base on the ridge. ── */}
      <g>
        {/* Its own little contact shadow. */}
        <ellipse
          cx={316}
          cy={BED_RIDGE + 2}
          rx={22}
          ry={6}
          fill={ROOM.deep}
          opacity={0.16}
          filter={url('b2')}
        />
        {/* Cylinder body (the side seen between the two ends). */}
        <path
          d="M300 274 L332 274 C335 274 336 277 336 280 L336 282 C336 285 335 288 332 288 L300 288 Z"
          fill={url('rollBody')}
        />
        {/* End cap — soft ellipse facing the light. */}
        <ellipse cx={302} cy={281} rx={9} ry={9} fill={url('rollEnd')} />
        {/* Spiral hint on the end: a short inward curl. */}
        <path
          d="M299 278 C304 277 306 281 303 283 C301 284 300 282 301 281"
          fill="none"
          stroke={ROOM.gold}
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.3}
        />
        {/* Crisp rim-light on the cap's upper-left arc. */}
        <path
          d="M296 278 C297 275 300 273 303 273"
          fill="none"
          stroke={ROOM.fieldHi}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.75}
        />
        {/* One soft length-line down the body. */}
        <path
          d="M306 278 C316 277 326 277 332 278"
          fill="none"
          stroke={ROOM.gold}
          strokeWidth={0.9}
          strokeLinecap="round"
          opacity={0.18}
        />
      </g>

      {/* ── CHERRY-BLOSSOM sprig resting on the folded stack — the soft
            premium accent. A thin stem with two open blossoms + one bud,
            barely settling about its stem base (rotate origin ≈ 274,250). ── */}
      <motion.g
        initial={false}
        animate={sprigAnim}
        transition={sprigTrans}
        style={{ transformOrigin: '274px 250px' }}
      >
        {/* Stem arcing up-left across the top fold. */}
        <path
          d="M274 250 C282 244 292 242 300 238"
          fill="none"
          stroke="#9fae86"
          strokeWidth={1.2}
          strokeLinecap="round"
          opacity={0.7}
        />
        <path
          d="M288 244 C290 240 293 238 296 236"
          fill="none"
          stroke="#9fae86"
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.55}
        />
        <Blossom ns={ns} cx={300} cy={236} r={6} />
        <Blossom ns={ns} cx={284} cy={243} r={5} />
        {/* A tiny closed bud at the stem base. */}
        <circle cx={276} cy={248} r={2.6} fill={ROOM.blossomDeep} opacity={0.85} />
        <circle cx={275.4} cy={247.2} r={1} fill={ROOM.blossom} />
      </motion.g>

      {/* ── Confirm bright sweep — masked to the folded-stack silhouette
            so the brighten only reads on the linen. transform/opacity. ── */}
      <g clipPath={url('stackClip')}>
        <motion.rect
          x={244}
          y={246}
          width={48}
          height={48}
          fill={url('sweep')}
          initial={false}
          animate={sweepAnim}
          transition={sweepTrans}
        />
      </g>
    </g>
  );
}

/* ── A single 5-petal cherry blossom, lit from the upper-left ──
   Five soft petals around a small deep-pink centre. Petals are simple
   teardrop ellipses fanned at 72° steps (top petal slightly toward the
   light). Kept deterministic — fixed angles, no randomness. */
function Blossom({
  ns,
  cx,
  cy,
  r,
}: {
  ns: (name: string) => string;
  cx: number;
  cy: number;
  r: number;
}) {
  const petals = [0, 72, 144, 216, 288].map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180; // start at top, go clockwise
    const px = sn(cx + Math.cos(rad) * r * 0.62);
    const py = sn(cy + Math.sin(rad) * r * 0.62);
    return { px, py, rot: sn(deg) };
  });
  return (
    <g>
      {petals.map((p, i) => (
        <ellipse
          key={`${ns('petal')}-${i}`}
          cx={p.px}
          cy={p.py}
          rx={sn(r * 0.46)}
          ry={sn(r * 0.62)}
          fill={ROOM.blossom}
          transform={`rotate(${p.rot} ${p.px} ${p.py})`}
        />
      ))}
      {/* Upper-left petals catch a touch more light. */}
      <ellipse
        cx={sn(cx - r * 0.3)}
        cy={sn(cy - r * 0.34)}
        rx={sn(r * 0.26)}
        ry={sn(r * 0.34)}
        fill="#fdeef0"
        opacity={0.7}
      />
      {/* Deep-pink centre. */}
      <circle cx={cx} cy={cy} r={sn(r * 0.3)} fill={ROOM.blossomDeep} />
      <circle cx={sn(cx - 0.6)} cy={sn(cy - 0.6)} r={sn(r * 0.14)} fill="#f7d9dd" />
    </g>
  );
}
