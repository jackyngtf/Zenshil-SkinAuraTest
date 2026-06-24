'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import {
  STUDY,
  DESK_Y,
  DESK_FRONT_Y,
  DESK_TOP_FRONT_Y,
  CLOCK,
  BOOKS,
  PLANT,
  PLANT_FRONDS,
  NOTEBOOK,
  PEN,
  sn,
} from './studyLayout';

/* ================================================================== */
/*  Q4·C 時間 — DESK STILL LIFE (desk + clock + books + plant + notebook)*/
/*                                                                     */
/*  A warm-wood DESKTOP band (the ONE warm accent's base) holding a     */
/*  small analog CLOCK left-of-centre (sweeping hands + thin teal       */
/*  second hand + a faint cyan tick-pulse synced to the second hand),   */
/*  a 3-slim BOOK STACK far right, a potted PLANT far left (lived-in),  */
/*  + an open NOTEBOOK + PEN in the FOREGROUND centre (the planning     */
/*  lens, overlapping the desk front to ground the foreground). Soft    */
/*  blurred CONTACT SHADOWS under each object ground them on the wood.  */
/*                                                                     */
/*  MOTION (deterministic, transform/opacity only): the clock hands     */
/*  SWEEP (slow linear rotation — minute ~24s, hour ~144s, second ~6s   */
/*  for visibility) + the cyan tick-pulse pulses in sync with the       */
/*  second hand; the book stack + notebook settle on confirm; the       */
/*  plant fronds gently breathe (~5.8s). CONFIRM (~0.6s one-shot,       */
/*  ease [0.32,.94,.4,1]): hands snap forward a crisp angle, fronds     */
/*  lift, stack/notebook settle, tick-pulse brightens.                  */
/*  reduceMotion: hands parked, fronds static, stack/notebook static.   */
/* ================================================================== */

const breathe = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

const drift = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'linear' };

const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

/* 4 dot markers at 12/3/6/9 around the clock face. */
const CLOCK_MARKERS = [
  { x: CLOCK.cx, y: CLOCK.cy - CLOCK.faceR }, // 12
  { x: CLOCK.cx + CLOCK.faceR, y: CLOCK.cy }, // 3
  { x: CLOCK.cx, y: CLOCK.cy + CLOCK.faceR }, // 6
  { x: CLOCK.cx - CLOCK.faceR, y: CLOCK.cy }, // 9
] as const;

export default function DeskStillLife({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04study-desk-' + n + '-' + uid;

  /* ── DESK TOP face subtle brighten on confirm ── */
  const deskAnim = isConfirming
    ? { opacity: 1 }
    : reduceMotion
      ? { opacity: 0.96 }
      : { opacity: [0.92, 0.98, 0.92] };
  const deskTrans = isConfirming ? surge(reduceMotion) : breathe(reduceMotion, 7.2);

  /* ── CLOCK hands: slow linear sweeps. drift = constant velocity. ── */
  const minAnim = isConfirming
    ? { rotate: 40 }
    : reduceMotion
      ? { rotate: 28 }
      : { rotate: [0, 360] };
  const minTrans = isConfirming ? surge(reduceMotion) : drift(reduceMotion, 24);

  const hourAnim = isConfirming
    ? { rotate: 12 }
    : reduceMotion
      ? { rotate: 8 }
      : { rotate: [0, 360] };
  const hourTrans = isConfirming ? surge(reduceMotion) : drift(reduceMotion, 144);

  const secAnim = isConfirming
    ? { rotate: 60 }
    : reduceMotion
      ? { rotate: 0 }
      : { rotate: [0, 360] };
  const secTrans = isConfirming ? surge(reduceMotion) : drift(reduceMotion, 6);

  /* ── Cyan clock-tick pulse synced to the second hand (~6s). ── */
  const tickAnim = isConfirming
    ? { opacity: 0.4 }
    : reduceMotion
      ? { opacity: 0.1 }
      : { opacity: [0.08, 0.22, 0.08] };
  const tickTrans = isConfirming ? surge(reduceMotion) : drift(reduceMotion, 6);

  /* ── PLANT fronds gentle breathe. ── */
  const frondAnim = isConfirming
    ? { scaleY: 1.04 }
    : reduceMotion
      ? { scaleY: 1 }
      : { scaleY: [1, 0.97, 1] };
  const frondTrans = isConfirming ? surge(reduceMotion) : breathe(reduceMotion, 5.8);

  /* ── BOOK stack + notebook: one-shot settle on confirm only. ── */
  const settleAnim = isConfirming ? { y: [0, -0.5, 0] } : { y: 0 };
  const settleTrans = isConfirming ? surge(reduceMotion) : { duration: 0 };

  return (
    <g aria-hidden="true">
      <defs>
        {/* Wood desktop top face — warm lit → highlight. */}
        <linearGradient id={id('deskTop')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.deskTop} />
          <stop offset="100%" stopColor={STUDY.deskTopHi} />
        </linearGradient>
        {/* Wood desktop front drop — front → deep floor. */}
        <linearGradient id={id('deskFront')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.deskFront} />
          <stop offset="100%" stopColor={STUDY.floorDeep} />
        </linearGradient>
        {/* Plant pot — warm wood, top → darker base. */}
        <linearGradient id={id('plantPot')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.plantPot} />
          <stop offset="100%" stopColor={STUDY.woodFrameDark} />
        </linearGradient>
        {/* Notebook paper — paper → faint shade. */}
        <linearGradient id={id('paper')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.paper} />
          <stop offset="100%" stopColor={STUDY.clockFaceShade} />
        </linearGradient>
        {/* Clock face — accentSoft → faint shade. */}
        <radialGradient id={id('clockFace')} cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor={STUDY.clockFace} />
          <stop offset="100%" stopColor={STUDY.clockFaceShade} />
        </radialGradient>
        {/* Cyan clock-tick pulse. */}
        <radialGradient id={id('tick')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={STUDY.glowBloom} stopOpacity="0.18" />
          <stop offset="100%" stopColor={STUDY.glowBloom} stopOpacity="0" />
        </radialGradient>

        {/* Static blur filters — never animated. */}
        <filter id={id('bShadow')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={id('bTick')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ── Soft ambient-occlusion shadow on the WALL above the desk's back
          edge (grounds the desk against the wall, separates the two). ── */}
      <rect x={0} y={DESK_Y - 4} width={400} height={6} fill={STUDY.wallLo} opacity={0.5} filter={`url(#${id('bShadow')})`} />

      {/* ── DESKTOP front face (the vertical drop below the top surface) ── */}
      <rect x={0} y={DESK_Y} width={400} height={DESK_FRONT_Y - DESK_Y} fill={`url(#${id('deskFront')})`} />

      {/* ── DESKTOP top face — a SLIM receding band DESK_Y → DESK_TOP_FRONT_Y
          (NOT the full desk height), so the desk keeps its 3D top + front
          form instead of reading as one flat slab. ── */}
      <motion.path
        d={`M0 ${DESK_Y} H400 L380 ${DESK_TOP_FRONT_Y} H20 Z`}
        fill={`url(#${id('deskTop')})`}
        initial={false}
        animate={deskAnim}
        transition={deskTrans}
      />
      {/* back-edge AO shadow on the top face (corner collects shadow) */}
      <rect x={0} y={DESK_Y} width={400} height={5} fill={STUDY.woodFrameDark} opacity={0.3} />
      {/* thin lit rim at the back seam (desk meets wall) */}
      <rect x={0} y={DESK_Y} width={400} height={1.5} fill={STUDY.deskEdge} opacity={0.85} />
      {/* crisp front-corner edge line (top surface meets front face) */}
      <rect x={20} y={DESK_TOP_FRONT_Y - 1} width={360} height={1.5} fill={STUDY.woodFrameDark} opacity={0.45} />

      {/* ── CONTACT SHADOWS under each object (static, track raised desk) ── */}
      <ellipse cx={200} cy={242} rx={22} ry={4} fill={STUDY.deskFront} opacity={0.34} filter={`url(#${id('bShadow')})`} />
      <ellipse cx={CLOCK.cx} cy={230} rx={16} ry={3} fill={STUDY.deskFront} opacity={0.34} filter={`url(#${id('bShadow')})`} />
      <ellipse cx={BOOKS.cx} cy={230} rx={20} ry={3} fill={STUDY.deskFront} opacity={0.34} filter={`url(#${id('bShadow')})`} />
      <ellipse cx={PLANT.potX} cy={236} rx={14} ry={3} fill={STUDY.deskFront} opacity={0.34} filter={`url(#${id('bShadow')})`} />
      <ellipse cx={NOTEBOOK.cx} cy={260} rx={30} ry={4} fill={STUDY.deskFront} opacity={0.34} filter={`url(#${id('bShadow')})`} />

      {/* ── POTTED PLANT (far left, fronds breathe) ── */}
      <g>
        {/* fronds */}
        <motion.g
          initial={false}
          animate={frondAnim}
          transition={frondTrans}
          style={{ transformOrigin: `${PLANT.potX}px ${PLANT.potY}px` }}
        >
          {PLANT_FRONDS.map((f, i) => {
            /* each frond drawn as a soft quadratic curve leaning up-left by a/len/curve */
            const baseX = PLANT.potX;
            const baseY = PLANT.potY;
            const rad = (f.a * Math.PI) / 180;
            const tipX = baseX + Math.sin(rad) * f.len;
            const tipY = baseY - Math.cos(rad) * f.len;
            const ctrlX = baseX + Math.sin(rad) * f.len * 0.4 + f.curve;
            const ctrlY = baseY - Math.cos(rad) * f.len * 0.6;
            return (
              <path
                key={`frond-${i}`}
                d={`M${sn(baseX)} ${sn(baseY)} Q${sn(ctrlX)} ${sn(ctrlY)} ${sn(tipX)} ${sn(tipY)} Q${sn(ctrlX - 3)} ${sn(ctrlY + 2)} ${sn(baseX)} ${sn(baseY)} Z`}
                fill={STUDY.plantLeaf}
                opacity={0.8}
              />
            );
          })}
        </motion.g>
        {/* pot trapezoid */}
        <path
          d={`M${sn(PLANT.potX - PLANT.potW / 2)} ${sn(PLANT.potY)} L${sn(PLANT.potX + PLANT.potW / 2)} ${sn(PLANT.potY)} L${sn(PLANT.potX + PLANT.potW / 2 - 2)} ${sn(PLANT.potY + PLANT.potH)} L${sn(PLANT.potX - PLANT.potW / 2 + 2)} ${sn(PLANT.potY + PLANT.potH)} Z`}
          fill={`url(#${id('plantPot')})`}
        />
        {/* pot rim */}
        <rect x={PLANT.potX - PLANT.potW / 2} y={PLANT.potY} width={PLANT.potW} height={2} fill={STUDY.woodFrameHi} opacity={0.6} />
      </g>

      {/* ── ANALOG CLOCK (left-of-centre, sweeping hands) ── */}
      <g>
        {/* cyan tick-pulse behind the clock */}
        <motion.circle
          cx={CLOCK.cx}
          cy={CLOCK.cy}
          r={CLOCK.r + 2}
          fill={`url(#${id('tick')})`}
          filter={`url(#${id('bTick')})`}
          initial={false}
          animate={tickAnim}
          transition={tickTrans}
          style={{ transformOrigin: `${CLOCK.cx}px ${CLOCK.cy}px` }}
        />
        {/* outer ring + face */}
        <circle cx={CLOCK.cx} cy={CLOCK.cy} r={CLOCK.r} fill={`url(#${id('clockFace')})`} stroke={STUDY.clockRing} strokeWidth={1.6} />
        {/* dot markers 12/3/6/9 */}
        {CLOCK_MARKERS.map((m, i) => (
          <circle key={`mk-${i}`} cx={m.x} cy={m.y} r={1.2} fill={STUDY.clockMarker} />
        ))}
        {/* tiny wood base foot */}
        <rect x={CLOCK.cx - 6} y={CLOCK.cy + CLOCK.r + 2} width={12} height={3} rx={1} fill={STUDY.woodFrame} />
        {/* hour hand */}
        <motion.g
          initial={false}
          animate={hourAnim}
          transition={hourTrans}
        >
          <line x1={CLOCK.cx} y1={CLOCK.cy} x2={CLOCK.cx} y2={CLOCK.cy - CLOCK.hourLen} stroke={STUDY.clockHand} strokeWidth={2.6} strokeLinecap="round" />
          {/* invisible balancer mirrors the hand below the hub so the group's fill-box bbox centres on (CLOCK.cx, CLOCK.cy) and framer's bbox-centre rotation pivots at the hub */}
          <line x1={CLOCK.cx} y1={CLOCK.cy} x2={CLOCK.cx} y2={CLOCK.cy + CLOCK.hourLen} stroke="transparent" />
        </motion.g>
        {/* minute hand */}
        <motion.g
          initial={false}
          animate={minAnim}
          transition={minTrans}
        >
          <line x1={CLOCK.cx} y1={CLOCK.cy} x2={CLOCK.cx} y2={CLOCK.cy - CLOCK.minLen} stroke={STUDY.clockHand} strokeWidth={1.8} strokeLinecap="round" />
          <line x1={CLOCK.cx} y1={CLOCK.cy} x2={CLOCK.cx} y2={CLOCK.cy + CLOCK.minLen} stroke="transparent" />
        </motion.g>
        {/* second hand (thin teal) */}
        <motion.g
          initial={false}
          animate={secAnim}
          transition={secTrans}
        >
          <line x1={CLOCK.cx} y1={CLOCK.cy + 2} x2={CLOCK.cx} y2={CLOCK.cy - CLOCK.secLen} stroke={STUDY.clockSec} strokeWidth={0.8} strokeLinecap="round" />
          <line x1={CLOCK.cx} y1={CLOCK.cy} x2={CLOCK.cx} y2={CLOCK.cy + CLOCK.secLen} stroke="transparent" />
        </motion.g>
        {/* hub */}
        <circle cx={CLOCK.cx} cy={CLOCK.cy} r={CLOCK.hubR} fill={STUDY.clockHub} />
        <circle cx={CLOCK.cx} cy={CLOCK.cy} r={0.8} fill={STUDY.clockFace} />
      </g>

      {/* ── BOOK STACK (far right, 3 slim books, settles on confirm) ── */}
      <motion.g
        initial={false}
        animate={settleAnim}
        transition={settleTrans}
      >
        {/* book 1 (bottom) */}
        <rect x={BOOKS.cx - 17} y={BOOKS.baseY - 3 * BOOKS.offsetY} width={BOOKS.bookW} height={BOOKS.bookH} rx={1.5} fill={STUDY.bookA} />
        <rect x={BOOKS.cx - 17} y={BOOKS.baseY - 3 * BOOKS.offsetY} width={BOOKS.bookW} height={2} fill={STUDY.bookSpine} opacity={0.5} />
        <rect x={BOOKS.cx - 13} y={BOOKS.baseY - 3 * BOOKS.offsetY + 3} width={12} height={1} fill={STUDY.bookSpine} opacity={0.3} />
        <rect x={BOOKS.cx - 13} y={BOOKS.baseY - 3 * BOOKS.offsetY + 4.5} width={8} height={1} fill={STUDY.bookSpine} opacity={0.3} />
        {/* book 2 (middle, x-offset +2) */}
        <rect x={BOOKS.cx - 15} y={BOOKS.baseY - 2 * BOOKS.offsetY} width={BOOKS.bookW} height={BOOKS.bookH} rx={1.5} fill={STUDY.bookB} />
        <rect x={BOOKS.cx - 15} y={BOOKS.baseY - 2 * BOOKS.offsetY} width={BOOKS.bookW} height={2} fill={STUDY.bookSpine} opacity={0.5} />
        <rect x={BOOKS.cx - 11} y={BOOKS.baseY - 2 * BOOKS.offsetY + 3} width={12} height={1} fill={STUDY.bookSpine} opacity={0.3} />
        <rect x={BOOKS.cx - 11} y={BOOKS.baseY - 2 * BOOKS.offsetY + 4.5} width={8} height={1} fill={STUDY.bookSpine} opacity={0.3} />
        {/* book 3 (top, x-offset -1) */}
        <rect x={BOOKS.cx - 18} y={BOOKS.baseY - BOOKS.offsetY} width={BOOKS.bookW} height={BOOKS.bookH} rx={1.5} fill={STUDY.bookC} />
        <rect x={BOOKS.cx - 18} y={BOOKS.baseY - BOOKS.offsetY} width={BOOKS.bookW} height={2} fill={STUDY.bookSpine} opacity={0.5} />
        <rect x={BOOKS.cx - 14} y={BOOKS.baseY - BOOKS.offsetY + 3} width={12} height={1} fill={STUDY.bookSpine} opacity={0.3} />
        <rect x={BOOKS.cx - 14} y={BOOKS.baseY - BOOKS.offsetY + 4.5} width={8} height={1} fill={STUDY.bookSpine} opacity={0.3} />
      </motion.g>

      {/* ── OPEN NOTEBOOK + PEN (foreground centre, settles on confirm) ── */}
      <motion.g
        initial={false}
        animate={settleAnim}
        transition={settleTrans}
      >
        {/* left page */}
        <path
          d={`M${sn(NOTEBOOK.cx - NOTEBOOK.halfW)} ${sn(NOTEBOOK.cy)} L${sn(NOTEBOOK.spineX)} ${sn(NOTEBOOK.cy - NOTEBOOK.halfH)} L${sn(NOTEBOOK.spineX)} ${sn(NOTEBOOK.cy + NOTEBOOK.halfH)} Z`}
          fill={`url(#${id('paper')})`}
        />
        {/* right page */}
        <path
          d={`M${sn(NOTEBOOK.spineX)} ${sn(NOTEBOOK.cy - NOTEBOOK.halfH)} L${sn(NOTEBOOK.cx + NOTEBOOK.halfW)} ${sn(NOTEBOOK.cy)} L${sn(NOTEBOOK.cx + NOTEBOOK.halfW)} ${sn(NOTEBOOK.cy + NOTEBOOK.halfH + 2)} L${sn(NOTEBOOK.spineX)} ${sn(NOTEBOOK.cy + NOTEBOOK.halfH)} Z`}
          fill={`url(#${id('paper')})`}
        />
        {/* spiral binding: 5 tiny circles along the spine */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={`bind-${i}`}
            cx={NOTEBOOK.spineX}
            cy={NOTEBOOK.cy - NOTEBOOK.halfH + 2 + i * ((NOTEBOOK.halfH * 2 - 2) / 4)}
            r={1}
            fill={STUDY.pen}
            opacity={0.6}
          />
        ))}
        {/* rule lines (left page) */}
        <line x1={NOTEBOOK.cx - NOTEBOOK.halfW + 4} y1={NOTEBOOK.cy - 2} x2={NOTEBOOK.spineX - 4} y2={NOTEBOOK.cy - 3} stroke={STUDY.rule} strokeWidth={0.5} opacity={0.5} />
        <line x1={NOTEBOOK.cx - NOTEBOOK.halfW + 4} y1={NOTEBOOK.cy + 1} x2={NOTEBOOK.spineX - 4} y2={NOTEBOOK.cy} stroke={STUDY.rule} strokeWidth={0.5} opacity={0.5} />
        <line x1={NOTEBOOK.cx - NOTEBOOK.halfW + 4} y1={NOTEBOOK.cy + 4} x2={NOTEBOOK.spineX - 4} y2={NOTEBOOK.cy + 3} stroke={STUDY.rule} strokeWidth={0.5} opacity={0.5} />
        {/* rule lines (right page) */}
        <line x1={NOTEBOOK.spineX + 4} y1={NOTEBOOK.cy - 3} x2={NOTEBOOK.cx + NOTEBOOK.halfW - 4} y2={NOTEBOOK.cy - 2} stroke={STUDY.rule} strokeWidth={0.5} opacity={0.5} />
        <line x1={NOTEBOOK.spineX + 4} y1={NOTEBOOK.cy} x2={NOTEBOOK.cx + NOTEBOOK.halfW - 4} y2={NOTEBOOK.cy + 1} stroke={STUDY.rule} strokeWidth={0.5} opacity={0.5} />
        {/* 2 tiny checkboxes + ink marks (left page) */}
        <rect x={NOTEBOOK.cx - NOTEBOOK.halfW + 4} y={NOTEBOOK.cy - 4} width={2} height={2} fill="none" stroke={STUDY.bookSpine} strokeWidth={0.4} opacity={0.4} />
        <rect x={NOTEBOOK.cx - NOTEBOOK.halfW + 4} y={NOTEBOOK.cy - 0.5} width={2} height={2} fill="none" stroke={STUDY.bookSpine} strokeWidth={0.4} opacity={0.4} />
        {/* PEN (warm) */}
        <line x1={PEN.x1} y1={PEN.y1} x2={PEN.x2} y2={PEN.y2} stroke={STUDY.pen} strokeWidth={2.4} strokeLinecap="round" />
        {/* nib highlight */}
        <circle cx={PEN.x2} cy={PEN.y2} r={0.8} fill={STUDY.woodFrameHi} />
      </motion.g>
    </g>
  );
}
