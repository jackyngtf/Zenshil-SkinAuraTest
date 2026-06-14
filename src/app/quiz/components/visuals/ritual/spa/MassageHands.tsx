'use client';

import { motion } from 'framer-motion';
import { loop } from '../ritualShared';
import { HANDS, SPA, sn } from './spaShared';
import type { MassageHandsProps, HandCfg } from './spaShared';

/* ================================================================== */
/*  Q10·B「熱石按摩」— the masseuse's TWO hands kneading the back.        */
/*  This is the single strongest "being massaged" cue: two relaxed     */
/*  line-art hands, seen from the back/top, reach DOWN from above and   */
/*  press their palms onto the upper back. Each hand = a soft rounded   */
/*  palm + four gently-spread curved fingers fanning down onto the back */
/*  + a thumb to one side + a hint of wrist/forearm fading out the top  */
/*  of the frame. Lit from the UPPER-LEFT (dawn) like the rest of the   */
/*  spa family: ivory towel fill, warm-neutral SPA.deep outline, kept   */
/*  slightly translucent so they sit in the premium family, never a     */
/*  hard cartoon glove.                                                 */
/*                                                                      */
/*  MOTION — a gentle KNEAD: each hand presses down ~2.5px then lifts   */
/*  on a calm ~4s loop, the two hands offset by `phase` so one presses  */
/*  while the other releases (like real alternating kneading). Only     */
/*  transform/opacity animate. Confirm = one deeper, slower press.      */
/*  Renders a single <g> drawing BOTH hands (defs inside), no <svg>.    */
/* ================================================================== */

/* The hand is authored ONCE in a local space whose origin (0,0) is the
   palm centre, +y pointing DOWN the back, then translated to (cfg.x,
   cfg.y) and rotated by cfg.rot. Building it locally keeps the cubic
   geometry readable and lets both hands share one path generator. */

/* Palm: a soft rounded lozenge, slightly wider than tall, its lower
   edge (where the fingers spring from) flattened a touch so the fingers
   fan from a believable knuckle-line. Authored around the local origin. */
const PALM_D =
  'M-15 -8 ' +
  /* upper-left wrist shoulder → top of palm */
  'C-16 -18 -10 -23 0 -23 ' +
  /* top → upper-right toward the thumb side */
  'C11 -23 17 -17 17 -7 ' +
  /* right side curving down to the knuckle line */
  'C17 2 15 9 11 13 ' +
  /* across the lower (knuckle) edge, gently scalloped */
  'C5 16 -5 16 -11 13 ' +
  /* left side back up to the wrist shoulder */
  'C-15 9 -16 1 -15 -8 Z';

/* One finger as a smooth tapering capsule springing from the palm's
   lower edge and curving slightly inward (relaxed, not stiff). Params:
   bx = base x on the knuckle line, len = reach down the back, spread =
   sideways fan of the tip, w = base half-width. Fingertips are rounded.
   Curl pulls the tip a little toward the back (a relaxed flex). */
const fingerD = (bx: number, len: number, spread: number, w: number) => {
  const baseY = 10;                 // springs from just inside the knuckle line
  const tipX = bx + spread;         // tip fans outward
  const tipY = baseY + len;         // tip reaches down onto the back
  const midX = bx + spread * 0.45;  // gentle inward bow midway
  const tw = sn(w * 0.42);          // tip half-width (tapered)
  return (
    `M${sn(bx - w)} ${sn(baseY)} ` +
    /* outer edge bowing down to the rounded tip */
    `C${sn(bx - w + 0.6)} ${sn(baseY + len * 0.55)} ${sn(midX - tw - 1)} ${sn(tipY - 4)} ${sn(tipX - tw)} ${sn(tipY)} ` +
    /* round the fingertip */
    `C${sn(tipX - tw * 0.4)} ${sn(tipY + 3)} ${sn(tipX + tw * 0.4)} ${sn(tipY + 3)} ${sn(tipX + tw)} ${sn(tipY)} ` +
    /* inner edge back up to the base */
    `C${sn(midX + tw + 1)} ${sn(tipY - 4)} ${sn(bx + w - 0.6)} ${sn(baseY + len * 0.55)} ${sn(bx + w)} ${sn(baseY)} Z`
  );
};

/* Four fingers fanning from the knuckle line: index (left, longest-ish)
   → little (right, shortest), each splayed a little more outward and the
   middle pair reaching deepest, so the spread reads natural. */
const FINGERS = [
  { bx: -9.5, len: 17, spread: -5, w: 3.1 }, // index
  { bx: -3, len: 19.5, spread: -1.5, w: 3.3 }, // middle (deepest)
  { bx: 3.5, len: 18, spread: 2.5, w: 3.2 }, // ring
  { bx: 9.5, len: 14.5, spread: 6, w: 2.8 }, // little (shortest)
];

/* Thumb: a shorter, fatter digit branching off the LEFT/lower side of
   the palm, angled across — the classic "thumb tucked beside the heel
   of the hand" read. Authored as its own tapering capsule. */
const THUMB_D =
  'M-15 1 ' +
  'C-21 3 -25 8 -25 14 ' +
  'C-25 18 -22 20 -19 19 ' +
  'C-16 18 -13 14 -12 9 ' +
  'C-12 5 -13 2 -15 1 Z';

/* Wrist / forearm: a soft band rising UP-and-out from the back of the
   palm toward the top of the frame, where the towel fill fades to clear
   via a gradient so the arm "leaves" the scene rather than ending hard. */
const WRIST_D =
  'M-14 -14 ' +
  'C-15 -34 -13 -52 -9 -70 ' +
  'L13 -70 ' +
  'C16 -50 17 -32 16 -13 ' +
  'C8 -20 -6 -20 -14 -14 Z';

/* Knuckle-shading creases: faint arcs hinting at the joint line where the
   fingers meet the palm — enough to read as a hand, never busy detail. */
const KNUCKLE_D = 'M-12 9 Q0 14 12 8';

function Hand({
  cfg,
  url,
  isConfirming,
  reduceMotion,
}: {
  cfg: HandCfg;
  url: (name: string) => string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const { x, y, rot, phase } = cfg;

  /* ── Knead timeline (transform only) ───────────────────────────────
     reduceMotion: hand resting in contact, no loop.
     confirm: one deeper, slower press then settle.
     ambient: press down ~2.5px then lift, phase-shifted via delay so the
     two hands alternate (one presses while the other releases). A tiny
     finger-flex (scaleY) rides along to sell the kneading. */
  const CYCLE = 4.2;
  const pressAnim = reduceMotion
    ? { y: 1.2, scaleY: 1 }
    : isConfirming
      ? { y: [0, 4, 1.4], scaleY: [1, 1.03, 1] }
      : { y: [0, 2.6, 0], scaleY: [1, 1.02, 1] };
  const pressTrans = isConfirming
    ? { duration: 0.5, ease: 'easeOut' as const }
    : loop(reduceMotion, CYCLE, phase * CYCLE); // phase∈[0,1) staggers the press across the cycle

  return (
    /* Outer group places + tilts the hand; the inner motion group does the
       vertical press about the palm centre (transformBox keeps scaleY local). */
    <g transform={`translate(${sn(x)} ${sn(y)}) rotate(${rot})`}>
      {/* Contact shadow on the back beneath the palm — blurred, biased
          lower-right (away from the dawn light). Static; the scene breathes. */}
      <ellipse
        cx={2}
        cy={13}
        rx={20}
        ry={7}
        fill={SPA.deep}
        opacity={0.2}
        filter={url('b3')}
      />

      <motion.g
        initial={false}
        animate={pressAnim}
        transition={pressTrans}
        style={{ transformOrigin: '0px 0px' }}
      >
        {/* Forearm/wrist fading out the top of the frame (drawn first, under
            the palm). Soft fill via the vertical fade gradient + faint edge. */}
        <path d={WRIST_D} fill={url('arm')} opacity={0.85} />
        <path
          d={WRIST_D}
          fill="none"
          stroke={SPA.deep}
          strokeWidth={1}
          strokeOpacity={0.18}
          strokeLinejoin="round"
        />

        {/* Fingers fanning down onto the back (under the palm so their bases
            tuck cleanly beneath the knuckle line). */}
        {FINGERS.map((f, i) => (
          <g key={`fin-${i}`}>
            <path
              d={fingerD(f.bx, f.len, f.spread, f.w)}
              fill={url('skin')}
              stroke={SPA.deep}
              strokeWidth={0.9}
              strokeOpacity={0.34}
              strokeLinejoin="round"
            />
          </g>
        ))}

        {/* Thumb branching off the lower-left of the palm. */}
        <path
          d={THUMB_D}
          fill={url('skin')}
          stroke={SPA.deep}
          strokeWidth={0.9}
          strokeOpacity={0.34}
          strokeLinejoin="round"
        />

        {/* Palm — the rounded heel of the hand pressing on the back. */}
        <path
          d={PALM_D}
          fill={url('skin')}
          stroke={SPA.deep}
          strokeWidth={1}
          strokeOpacity={0.4}
          strokeLinejoin="round"
        />

        {/* Soft ivory rim-light catching the upper-left of the palm (dawn). */}
        <path
          d="M-15 -8 C-16 -18 -10 -23 0 -23 C8 -23 13 -20 15 -14"
          fill="none"
          stroke={SPA.towelHi}
          strokeWidth={1.8}
          strokeLinecap="round"
          opacity={0.5}
          filter={url('b1')}
        />

        {/* Faint knuckle crease where fingers meet the palm — reads as a hand. */}
        <path
          d={KNUCKLE_D}
          fill="none"
          stroke={SPA.deep}
          strokeWidth={0.8}
          strokeOpacity={0.22}
          strokeLinecap="round"
        />

        {/* Tightest specular catch on the back of the hand (upper-left). */}
        <ellipse
          cx={-4}
          cy={-9}
          rx={6}
          ry={3.4}
          fill="#fdfaf2"
          opacity={0.5}
          filter={url('b1')}
          transform="rotate(-22 -4 -9)"
        />
      </motion.g>
    </g>
  );
}

export default function MassageHands({ uid, isConfirming, reduceMotion }: MassageHandsProps) {
  /* Namespaced + deterministic; per-hand defs disambiguated by id below. */
  const ns = (name: string) => `q10x-spa-hands-${name}-${uid}`;
  const url = (name: string) => `url(#${ns(name)})`;

  return (
    <g>
      <defs>
        {/* Hand fill: soft towel/ivory, lit upper-left → warmer mid lower-right. */}
        <radialGradient id={ns('skin')} cx="34%" cy="28%" r="84%">
          <stop offset="0%" stopColor={SPA.towelHi} stopOpacity="0.96" />
          <stop offset="52%" stopColor={SPA.towelMid} stopOpacity="0.94" />
          <stop offset="100%" stopColor={SPA.towelLo} stopOpacity="0.92" />
        </radialGradient>
        {/* Forearm fill: same ivory at the wrist, fading to clear toward the
            top of the frame so the arm "leaves" the scene. userSpaceOnUse so
            the fade tracks each hand's local y after translate/rotate. */}
        <linearGradient id={ns('arm')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SPA.towelMid} stopOpacity="0" />
          <stop offset="48%" stopColor={SPA.towelMid} stopOpacity="0.5" />
          <stop offset="100%" stopColor={SPA.towelHi} stopOpacity="0.92" />
        </linearGradient>
        {/* Blur passes — each stdDeviation defined exactly once. */}
        <filter id={ns('b1')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <filter id={ns('b3')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {HANDS.map((cfg) => (
        <Hand
          key={cfg.id}
          cfg={cfg}
          url={url}
          isConfirming={isConfirming}
          reduceMotion={reduceMotion}
        />
      ))}
    </g>
  );
}
