'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { loop } from '../ritualShared';
import { FROOM, COUNTER_Y, MIRROR, sn } from './facialRoom';
import type { FacialPartProps } from './facialRoom';

/* ================================================================== */
/*  Q10·D「煥膚梳妝角」— VanityMirror (Agent B · Mirror)                */
/*  The backdrop the products sit in front of: a backlit round vanity */
/*  mirror — the scene's clear focal, twinned with A's glowing window */
/*  and C's sky opening — plus a slim bud vase of roses to its right. */
/*  Soft-illustration family: warm dawn light from the UPPER-LEFT,    */
/*  gold rim, calm empty glass reflecting light (no face). Backlight   */
/*  halo gently pulses (~6s); confirm flares it brighter + a light     */
/*  streak sweeps the glass (the "reset / clarity" beat).             */
/*                                                                     */
/*  Layer order (back → front):                                       */
/*    1. backlit halo (glow behind the rim)                           */
/*    2. mirror body: glass interior + diagonal light streak + rim    */
/*    3. bud vase: contact shadow → vase → stem → leaves → roses      */
/* ================================================================== */

/* Mirror geometry from the shared contract: round, upper-centre. */
const MX = MIRROR.cx; // 250
const MY = MIRROR.cy; // 142
const MR = MIRROR.r; //  82

/* Bud vase stands on the counter to the RIGHT of the mirror.
   Slim ivory/glass body y262→288, neck pinching in toward the top. */
const VASE_X = 300; // centre line of the vase / stem
const VASE_TOP = 262;
const VASE_BOT = 288; // ≈ COUNTER_Y (286) — foot meets the surface
const STEM_TOP = 150; // a thin stem rises to here, under the main rose

/* A single rose as stacked petal arcs around (cx,cy). `r` is the bloom
   radius; the outer ring reads as opening petals, the inner curl as the
   tightly-wound centre. Lit upper-left, so the highlight sits top-left. */
function Rose({
  cx,
  cy,
  r,
  deep = false,
}: {
  cx: number;
  cy: number;
  r: number;
  deep?: boolean;
}) {
  const fill = deep ? FROOM.roseDeep : FROOM.rose;
  const hx = sn(cx - r * 0.32); // highlight centre (upper-left of bloom)
  const hy = sn(cy - r * 0.34);
  return (
    <g>
      {/* Outer cupped petals — a soft rounded blossom mass */}
      <path
        d={`M${sn(cx)} ${sn(cy - r)} C${sn(cx + r * 0.95)} ${sn(cy - r * 0.8)} ${sn(cx + r)} ${sn(cy + r * 0.55)} ${sn(cx)} ${sn(cy + r * 0.92)} C${sn(cx - r)} ${sn(cy + r * 0.55)} ${sn(cx - r * 0.95)} ${sn(cy - r * 0.8)} ${sn(cx)} ${sn(cy - r)} Z`}
        fill={fill}
      />
      {/* Mid layer, darker, gives the layered-petal depth */}
      <path
        d={`M${sn(cx)} ${sn(cy - r * 0.62)} C${sn(cx + r * 0.6)} ${sn(cy - r * 0.5)} ${sn(cx + r * 0.64)} ${sn(cy + r * 0.4)} ${sn(cx)} ${sn(cy + r * 0.6)} C${sn(cx - r * 0.64)} ${sn(cy + r * 0.4)} ${sn(cx - r * 0.6)} ${sn(cy - r * 0.5)} ${sn(cx)} ${sn(cy - r * 0.62)} Z`}
        fill={FROOM.roseDeep}
        opacity={deep ? 0.55 : 0.34}
      />
      {/* Tight inner curl — the wound centre of the bloom */}
      <path
        d={`M${sn(cx)} ${sn(cy - r * 0.3)} Q${sn(cx + r * 0.34)} ${sn(cy)} ${sn(cx)} ${sn(cy + r * 0.3)} Q${sn(cx - r * 0.34)} ${sn(cy)} ${sn(cx)} ${sn(cy - r * 0.3)} Z`}
        fill={FROOM.roseDeep}
        opacity={0.5}
      />
      {/* Upper-left petal highlight */}
      <ellipse
        cx={hx}
        cy={hy}
        rx={sn(r * 0.34)}
        ry={sn(r * 0.22)}
        fill={FROOM.fieldHi}
        opacity={0.5}
        transform={`rotate(-32 ${hx} ${hy})`}
      />
    </g>
  );
}

export default function VanityMirror({ uid, isConfirming, reduceMotion }: FacialPartProps) {
  const id = (name: string) => `q10-vanM-${name}-${uid}`;

  /* Idle halo breath (~6s); confirm = one clean brighten/expand. */
  const haloAnimate = isConfirming
    ? { opacity: 0.92, scale: 1.07 }
    : reduceMotion
      ? { opacity: 0.55, scale: 1 }
      : { opacity: [0.4, 0.66, 0.4], scale: [1, 1.03, 1] };
  const haloTransition: Transition = isConfirming
    ? { duration: 0.5, ease: 'easeOut' }
    : loop(reduceMotion, 6);

  /* The rose sprig barely sways — a slow, small rotate about its base. */
  const swayTransition: Transition = loop(reduceMotion, 7.6, 0.4);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Backlit halo: brightest at the rim, fading OUTWARD into the room */}
        <radialGradient id={id('halo')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={FROOM.mirrorGlow} stopOpacity="0" />
          <stop offset="62%" stopColor={FROOM.mirrorGlow} stopOpacity="0" />
          <stop offset="80%" stopColor={FROOM.mirrorGlow} stopOpacity="0.85" />
          <stop offset="100%" stopColor={FROOM.mirrorGlow} stopOpacity="0" />
        </radialGradient>
        {/* Glass interior: a calm pale reflection, brightest upper-left */}
        <radialGradient id={id('glass')} cx="36%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="34%" stopColor={FROOM.glassHi} />
          <stop offset="70%" stopColor={FROOM.mirrorGlass} />
          <stop offset="100%" stopColor={FROOM.glassLo} />
        </radialGradient>
        {/* Gold rim: lit on the upper-left arc, deepening to the lower-right */}
        <linearGradient id={id('rim')} x1="18%" y1="8%" x2="86%" y2="96%">
          <stop offset="0%" stopColor={FROOM.goldHi} />
          <stop offset="46%" stopColor={FROOM.gold} />
          <stop offset="100%" stopColor="#9c7c4e" />
        </linearGradient>
        {/* Diagonal light streak sweeping the glass (upper-left → lower-right) */}
        <linearGradient id={id('streak')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Slim vase glass: ivory lit-left → blush-shadow right */}
        <linearGradient id={id('vase')} x1="14%" y1="0%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={FROOM.glassHi} />
          <stop offset="55%" stopColor={FROOM.cream} />
          <stop offset="100%" stopColor={FROOM.glassLo} />
        </linearGradient>
        <filter id={id('b12')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={id('b4')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ── 1. Backlit halo: glow radiating OUTWARD behind the rim ── */}
      <motion.circle
        cx={MX}
        cy={MY}
        r={MR + 26}
        fill={`url(#${id('halo')})`}
        filter={`url(#${id('b12')})`}
        style={{ transformOrigin: `${MX}px ${MY}px` }}
        initial={false}
        animate={haloAnimate}
        transition={haloTransition}
      />
      {/* A warmer inner bloom hugging the rim, biased to the lit upper-left */}
      <motion.ellipse
        cx={MX - 14}
        cy={MY - 16}
        rx={MR * 0.9}
        ry={MR * 0.9}
        fill={FROOM.mirrorGlow}
        filter={`url(#${id('b12')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.5 }
            : reduceMotion
              ? { opacity: 0.24 }
              : { opacity: [0.16, 0.3, 0.16] }
        }
        transition={isConfirming ? { duration: 0.5, ease: 'easeOut' } : loop(reduceMotion, 6.4, 0.5)}
      />

      {/* ── 2. Mirror body ── */}
      <motion.g
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: `${MX}px ${MY}px` }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass interior — calm, empty, reflecting soft light */}
        <circle cx={MX} cy={MY} r={MR} fill={`url(#${id('glass')})`} />
        {/* Faint blush bounce low-right, so the glass isn't flat */}
        <ellipse
          cx={MX + 24}
          cy={MY + 30}
          rx={38}
          ry={30}
          fill={FROOM.blush}
          opacity={0.1}
          filter={`url(#${id('b12')})`}
        />

        {/* One faint diagonal light streak across the glass.
            Clipped to the glass circle; it sweeps + brightens on confirm. */}
        <clipPath id={id('glassclip')}>
          <circle cx={MX} cy={MY} r={MR} />
        </clipPath>
        <g clipPath={`url(#${id('glassclip')})`}>
          {/* skewed band of light, tilted to follow the upper-left source */}
          <motion.rect
            x={MX - 96}
            y={MY - 120}
            width={46}
            height={240}
            fill={`url(#${id('streak')})`}
            transform={`rotate(28 ${MX} ${MY})`}
            filter={`url(#${id('b4')})`}
            initial={false}
            animate={
              isConfirming
                ? { x: [MX - 96, MX + 40], opacity: [0.5, 0.85, 0.4] }
                : reduceMotion
                  ? { x: MX - 70, opacity: 0.3 }
                  : { x: [MX - 86, MX - 54, MX - 86], opacity: [0.22, 0.4, 0.22] }
            }
            transition={
              isConfirming
                ? { duration: 0.5, ease: 'easeOut' }
                : loop(reduceMotion, 8.4, 0.6)
            }
          />
        </g>

        {/* Thin warm gold rim — bright upper-left, deeper lower-right */}
        <circle
          cx={MX}
          cy={MY}
          r={MR}
          fill="none"
          stroke={`url(#${id('rim')})`}
          strokeWidth={5}
        />
        {/* A crisp gold-highlight arc on the upper-left lit edge */}
        <path
          d={`M${sn(MX - MR * 0.72)} ${sn(MY - MR * 0.62)} A${MR} ${MR} 0 0 1 ${sn(MX + MR * 0.3)} ${sn(MY - MR * 0.96)}`}
          fill="none"
          stroke={FROOM.goldHi}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.85}
        />
      </motion.g>

      {/* ── 3. Bud vase + rose sprig (right of the mirror, on the counter) ── */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Soft contact shadow pooling under the vase */}
        <ellipse
          cx={VASE_X + 2}
          cy={COUNTER_Y + 4}
          rx={20}
          ry={6}
          fill={FROOM.deep}
          opacity={0.12}
          filter={`url(#${id('b4')})`}
        />

        {/* Slim glass/ivory vase: pinched neck (y262) → wider foot (y288) */}
        <path
          d={
            `M${VASE_X - 6} ${VASE_TOP} ` +
            `C${VASE_X - 7} ${VASE_TOP + 12} ${VASE_X - 10} ${VASE_BOT - 6} ${VASE_X - 8} ${VASE_BOT} ` +
            `L${VASE_X + 8} ${VASE_BOT} ` +
            `C${VASE_X + 10} ${VASE_BOT - 6} ${VASE_X + 7} ${VASE_TOP + 12} ${VASE_X + 6} ${VASE_TOP} Z`
          }
          fill={`url(#${id('vase')})`}
        />
        {/* Lit-left glass highlight running down the vase */}
        <path
          d={`M${VASE_X - 3} ${VASE_TOP + 4} C${VASE_X - 5} ${VASE_TOP + 12} ${VASE_X - 6} ${VASE_BOT - 8} ${VASE_X - 5} ${VASE_BOT - 2}`}
          fill="none"
          stroke={FROOM.fieldHi}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.6}
        />

        {/* The sprig sways as one unit, pivoting at the vase mouth. */}
        <motion.g
          style={{ transformOrigin: `${VASE_X}px ${VASE_TOP}px` }}
          initial={false}
          animate={
            isConfirming
              ? { rotate: 0, x: 0 }
              : reduceMotion
                ? { rotate: 0, x: 0 }
                : { rotate: [-1.1, 1.1, -1.1], x: [-0.6, 0.6, -0.6] }
          }
          transition={isConfirming ? { duration: 0.5, ease: 'easeOut' } : swayTransition}
        >
          {/* Main stem rising from the vase mouth up to the top bloom */}
          <path
            d={`M${VASE_X} ${VASE_TOP} C${VASE_X - 3} ${sn((VASE_TOP + STEM_TOP) / 2)} ${VASE_X - 2} ${STEM_TOP + 24} ${VASE_X - 4} ${STEM_TOP + 4}`}
            fill="none"
            stroke={FROOM.leaf}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          {/* A short secondary stem branching to the lower rose */}
          <path
            d={`M${VASE_X - 1} ${STEM_TOP + 64} C${VASE_X + 10} ${STEM_TOP + 58} ${VASE_X + 16} ${STEM_TOP + 50} ${VASE_X + 18} ${STEM_TOP + 40}`}
            fill="none"
            stroke={FROOM.leaf}
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* Two leaves along the stem (lit upper-left) */}
          <path
            d={`M${VASE_X - 3} ${STEM_TOP + 78} C${VASE_X - 22} ${STEM_TOP + 74} ${VASE_X - 28} ${STEM_TOP + 60} ${VASE_X - 20} ${STEM_TOP + 50} C${VASE_X - 12} ${STEM_TOP + 58} ${VASE_X - 6} ${STEM_TOP + 66} ${VASE_X - 3} ${STEM_TOP + 78} Z`}
            fill={FROOM.leaf}
            opacity={0.9}
          />
          <path
            d={`M${VASE_X + 2} ${STEM_TOP + 104} C${VASE_X + 20} ${STEM_TOP + 102} ${VASE_X + 27} ${STEM_TOP + 90} ${VASE_X + 20} ${STEM_TOP + 80} C${VASE_X + 12} ${STEM_TOP + 88} ${VASE_X + 5} ${STEM_TOP + 95} ${VASE_X + 2} ${STEM_TOP + 104} Z`}
            fill={FROOM.leaf}
            opacity={0.78}
          />

          {/* Three roses — the premium accent. Top bloom is the largest. */}
          <Rose cx={VASE_X - 4} cy={STEM_TOP} r={15} />
          <Rose cx={VASE_X + 20} cy={STEM_TOP + 36} r={11} deep />
          <Rose cx={VASE_X - 18} cy={STEM_TOP + 30} r={9} deep />
        </motion.g>
      </motion.g>
    </g>
  );
}
