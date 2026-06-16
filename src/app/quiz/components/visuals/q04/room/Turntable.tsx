'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { ROOM, DESK_Y, DESK_FRONT_Y, TURNTABLE, sn } from './roomLayout';

/* ================================================================== */
/*  Q4 · B 放鬆 (Relaxation) — DESK + VINYL TURNTABLE (room HERO)        */
/*                                                                     */
/*  A warm WOOD desk spans the width: a slightly-lit tabletop surface   */
/*  (receding to the wall) whose front edge drops into a darker front   */
/*  face + a hint of apron/legs into shadow. Sitting on the desk,       */
/*  centred on TURNTABLE.cx, is a low dark PLINTH carrying a black      */
/*  vinyl RECORD on a platter — fine concentric grooves, a warm round   */
/*  label + spindle, a soft sheen sweep — with a brushed-metal TONEARM  */
/*  resting near the outer groove. A small lean of two spare records    */
/*  sits on the far side of the desk.                                   */
/*                                                                     */
/*  MOTION (deterministic, transform/opacity only): the record PLAYS —  */
/*  the warm LABEL + a few tiny surface specks/highlight rotate slowly  */
/*  + continuously about the spindle (~33rpm feel, linear, ~7.5s/turn), */
/*  clipped to the record ellipse so the spin reads WITHOUT distorting  */
/*  the perspective disc. The outer record ellipse, grooves, platter,   */
/*  tonearm + plinth stay still. CONFIRM (~0.6s one-shot,               */
/*  ease [0.32,0.94,0.4,1]): a gentle "music swells" beat — label +     */
/*  record sheen brighten + the desk warms a touch, then settle.        */
/*  reduceMotion: record static (no spin).                             */
/* ================================================================== */

/* Geometry — derived from the shared layout. */
const CX = TURNTABLE.cx; // spindle x (record centre) = 168
const SPY = TURNTABLE.spindleY; // spindle y = 188
const HW = TURNTABLE.halfW; // plinth half-width = 60

/* Plinth (the turntable body box) — sits on the desk, base on DESK_Y. */
const PL_X = sn(CX - HW); // 108
const PL_W = sn(HW * 2); // 120
const PL_TOP = 196;
const PL_BASE = DESK_Y; // 214

/* Record / platter ellipse (perspective). */
const REC_RX = 54;
const REC_RY = 20;

/* Concentric groove rings (fractions of the record radius). */
const GROOVES = [0.9, 0.78, 0.66, 0.54, 0.42] as const;

/* A few tiny surface specks that ride the record so the spin reads. The
   spin group rotates about the spindle; these are placed deterministically
   around the disc (const angle/radius, no Math.random). */
const SPECKS = [
  { a: 18, r: 0.84, s: 1.1 },
  { a: 96, r: 0.7, s: 0.9 },
  { a: 168, r: 0.86, s: 1.0 },
  { a: 244, r: 0.62, s: 0.8 },
  { a: 312, r: 0.8, s: 1.05 },
] as const;

export default function Turntable({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04room-tt-' + n + '-' + uid;

  /* Continuous linear spin (a real turntable feel). */
  const spinAnim =
    reduceMotion || isConfirming ? { rotate: 0 } : { rotate: 360 };
  const spinTrans: Transition =
    reduceMotion || isConfirming
      ? { duration: 0 }
      : { duration: 7.5, ease: 'linear', repeat: Infinity, repeatType: 'loop' };

  /* One-shot confirm "music swells". */
  const swell = (duration: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

  /* Label brightens a touch on confirm. */
  const labelAnim = isConfirming ? { opacity: 1 } : { opacity: 0.96 };
  const labelTrans: Transition = swell(0.6);

  /* Record sheen blooms a touch on confirm. */
  const sheenAnim = isConfirming ? { opacity: 0.5 } : { opacity: 0.3 };
  const sheenTrans: Transition = swell(0.6);

  /* Desk warms slightly on confirm (a soft amber wash over the surface). */
  const warmAnim = isConfirming ? { opacity: 0.34 } : { opacity: 0 };
  const warmTrans: Transition = swell(0.6);

  const spinStyle = { transformOrigin: `${CX}px ${SPY}px` } as const;

  return (
    <g aria-hidden="true">
      <defs>
        {/* Desk tabletop — lit warm wood, brighter toward the front/light. */}
        <linearGradient id={id('deskTop')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ROOM.deskTop} />
          <stop offset="100%" stopColor={ROOM.deskTopHi} />
        </linearGradient>
        {/* Desk front face — darker, dropping into shadow. */}
        <linearGradient id={id('deskFront')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ROOM.deskFront} />
          <stop offset="100%" stopColor="#3f2c22" />
        </linearGradient>
        {/* Plinth body — dark, faintly lit toward the top. */}
        <linearGradient id={id('plinth')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ROOM.ttBodyHi} />
          <stop offset="22%" stopColor={ROOM.ttBody} />
          <stop offset="100%" stopColor="#28222a" />
        </linearGradient>
        {/* Vinyl body — near-black with a faint warm bias. */}
        <radialGradient id={id('vinyl')} cx="42%" cy="36%" r="74%">
          <stop offset="0%" stopColor="#231f26" />
          <stop offset="60%" stopColor={ROOM.vinyl} />
          <stop offset="100%" stopColor="#141117" />
        </radialGradient>
        {/* Warm record label. */}
        <radialGradient id={id('label')} cx="44%" cy="36%" r="70%">
          <stop offset="0%" stopColor="#f3bd7a" />
          <stop offset="60%" stopColor={ROOM.label} />
          <stop offset="100%" stopColor="#c9813f" />
        </radialGradient>
        {/* Soft elliptical sheen sweeping one side of the record. */}
        <radialGradient id={id('sheen')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ROOM.vinylSheen} stopOpacity="0.85" />
          <stop offset="60%" stopColor={ROOM.vinylSheen} stopOpacity="0.28" />
          <stop offset="100%" stopColor={ROOM.vinylSheen} stopOpacity="0" />
        </radialGradient>
        {/* Brushed-metal tonearm. */}
        <linearGradient id={id('arm')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6dde0" />
          <stop offset="50%" stopColor={ROOM.arm} />
          <stop offset="100%" stopColor="#9d8f95" />
        </linearGradient>
        {/* Warm confirm wash over the desk surface. */}
        <radialGradient id={id('warm')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ROOM.glowAmber} stopOpacity="0.8" />
          <stop offset="60%" stopColor={ROOM.glowAmber} stopOpacity="0.3" />
          <stop offset="100%" stopColor={ROOM.glowAmber} stopOpacity="0" />
        </radialGradient>

        {/* Static blur filters — never animated. */}
        <filter id={id('bShadow')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={id('bWarm')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="22" />
        </filter>

        {/* Clip the spinning specks/label to the record ellipse. */}
        <clipPath id={id('recClip')}>
          <ellipse cx={CX} cy={SPY} rx={REC_RX} ry={REC_RY} />
        </clipPath>
      </defs>

      {/* ── DESK ── */}
      {/* Front face + apron dropping into shadow below the tabletop edge. */}
      <rect
        x={0}
        y={DESK_Y}
        width={400}
        height={DESK_FRONT_Y - DESK_Y}
        fill={`url(#${id('deskFront')})`}
      />
      {/* Hint of apron/legs into deeper shadow below the front face. */}
      <rect
        x={0}
        y={DESK_FRONT_Y}
        width={400}
        height={320 - DESK_FRONT_Y}
        fill="#33241c"
        opacity={0.92}
      />
      {/* Tabletop surface — a shallow parallelogram receding to the wall,
          slightly lit. Top (back) edge ~y206, front edge at DESK_Y. */}
      <path
        d={`M0 206 L400 206 L400 ${DESK_Y} L0 ${DESK_Y} Z`}
        fill={`url(#${id('deskTop')})`}
      />
      {/* Soft sheen sweep on the receding surface (toward the light). */}
      <path
        d={`M0 207 L400 207 L400 211 L0 211 Z`}
        fill={ROOM.deskTopHi}
        opacity={0.4}
      />
      {/* Lit front EDGE highlight along the tabletop lip. */}
      <rect x={0} y={sn(DESK_Y - 1.6)} width={400} height={1.8} fill={ROOM.deskEdge} />

      {/* Warm confirm wash seated on the desk surface around the turntable. */}
      <motion.ellipse
        cx={CX}
        cy={SPY + 6}
        rx={150}
        ry={48}
        fill={`url(#${id('warm')})`}
        filter={`url(#${id('bWarm')})`}
        initial={false}
        animate={warmAnim}
        transition={warmTrans}
      />

      {/* Soft contact shadow under the turntable. */}
      <ellipse
        cx={CX}
        cy={PL_BASE + 3}
        rx={HW + 6}
        ry={8}
        fill="#241812"
        opacity={0.4}
        filter={`url(#${id('bShadow')})`}
      />

      {/* ── SPARE RECORDS leaning on the far (right) side of the desk ── */}
      <g>
        <ellipse cx={296} cy={210} rx={8.5} ry={20} fill={ROOM.vinyl} transform="rotate(12 296 210)" />
        <ellipse cx={296} cy={210} rx={2.6} ry={6} fill={ROOM.label} transform="rotate(12 296 210)" />
        <ellipse cx={303} cy={210.5} rx={8} ry={19} fill="#221e26" transform="rotate(14 303 210.5)" />
      </g>

      {/* ── PLINTH / turntable body box ── */}
      <rect
        x={PL_X}
        y={PL_TOP}
        width={PL_W}
        height={PL_BASE - PL_TOP}
        rx={3}
        fill={`url(#${id('plinth')})`}
      />
      {/* Lit top edge of the plinth. */}
      <rect x={PL_X} y={PL_TOP} width={PL_W} height={2} rx={1} fill={ROOM.ttBodyHi} />
      {/* Tiny control knob on the plinth (front-left). */}
      <circle cx={PL_X + 13} cy={206} r={3.2} fill="#1f1b22" />
      <circle cx={sn(PL_X + 12.2)} cy={205.2} r={1} fill={ROOM.ttBodyHi} opacity={0.8} />

      {/* ── PLATTER under the record ── */}
      <ellipse cx={CX} cy={SPY} rx={REC_RX + 4} ry={REC_RY + 2.4} fill={ROOM.ttPlate} />

      {/* ── VINYL RECORD (static perspective ellipse) ── */}
      <ellipse cx={CX} cy={SPY} rx={REC_RX} ry={REC_RY} fill={`url(#${id('vinyl')})`} />

      {/* Fine concentric GROOVE rings (static, thin sheen ellipses). */}
      {GROOVES.map((f, i) => (
        <ellipse
          key={i}
          cx={CX}
          cy={SPY}
          rx={sn(REC_RX * f)}
          ry={sn(REC_RY * f)}
          fill="none"
          stroke={ROOM.vinylSheen}
          strokeWidth={0.5}
          opacity={0.32}
        />
      ))}

      {/* Soft elliptical SHEEN highlight sweeping one side of the record. */}
      <motion.ellipse
        cx={CX - 18}
        cy={SPY - 5}
        rx={26}
        ry={9}
        fill={`url(#${id('sheen')})`}
        clipPath={`url(#${id('recClip')})`}
        initial={false}
        animate={sheenAnim}
        transition={sheenTrans}
      />

      {/* ── SPINNING group: label + tiny surface specks rotate about the
            spindle (clipped to the record so the perspective stays right). ── */}
      <g clipPath={`url(#${id('recClip')})`}>
        <motion.g
          initial={false}
          animate={spinAnim}
          transition={spinTrans}
          style={spinStyle}
        >
          {/* Warm round LABEL. */}
          <motion.ellipse
            cx={CX}
            cy={SPY}
            rx={16}
            ry={6}
            fill={`url(#${id('label')})`}
            initial={false}
            animate={labelAnim}
            transition={labelTrans}
          />
          {/* A tiny logo mark on the label so its rotation reads. */}
          <ellipse cx={CX + 7} cy={SPY - 1.4} rx={2.4} ry={1} fill="#8a4f22" opacity={0.7} />
          {/* Tiny surface specks riding the record (deterministic placement). */}
          {SPECKS.map((p, i) => {
            const rad = (p.a * Math.PI) / 180;
            const px = sn(CX + Math.cos(rad) * REC_RX * p.r);
            const py = sn(SPY + Math.sin(rad) * REC_RY * p.r);
            return (
              <circle
                key={i}
                cx={px}
                cy={py}
                r={sn(0.7 * p.s)}
                fill={ROOM.vinylSheen}
                opacity={0.5}
              />
            );
          })}
        </motion.g>
      </g>

      {/* Spindle dot + label rim (static, over the spin so the centre is fixed). */}
      <ellipse cx={CX} cy={SPY} rx={16} ry={6} fill="none" stroke="#a86a32" strokeWidth={0.5} opacity={0.5} />
      <circle cx={CX} cy={SPY} r={1.4} fill="#f6e6cf" />

      {/* ── TONEARM — slim brushed arm from the back-right plinth corner onto
            the record near the outer groove (static, resting on the record). ── */}
      <g>
        {/* Pivot base at the back-right corner of the plinth. */}
        <circle cx={PL_X + PL_W - 10} cy={199} r={4} fill="#7d7178" />
        <circle cx={PL_X + PL_W - 10} cy={199} r={2} fill={ROOM.arm} />
        {/* The arm shaft angling onto the record. */}
        <line
          x1={PL_X + PL_W - 10}
          y1={199}
          x2={CX + 14}
          y2={SPY + 1}
          stroke={`url(#${id('arm')})`}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        {/* Counterweight stub behind the pivot. */}
        <line
          x1={PL_X + PL_W - 10}
          y1={199}
          x2={PL_X + PL_W - 2}
          y2={196}
          stroke={ROOM.arm}
          strokeWidth={3}
          strokeLinecap="round"
        />
        {/* Headshell resting near the outer groove. */}
        <rect
          x={CX + 11}
          y={SPY - 2}
          width={6}
          height={4}
          rx={1}
          fill="#b7a9af"
          transform={`rotate(28 ${CX + 14} ${SPY})`}
        />
      </g>
    </g>
  );
}
