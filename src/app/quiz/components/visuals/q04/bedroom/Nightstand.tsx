'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { BEDROOM, NIGHTSTAND, LAMP, sn } from './bedroomLayout';

/* ================================================================== */
/*  Q4·A 睡眠 — NIGHTSTAND + BEDSIDE LAMP (room small-hero furniture)   */
/*                                                                     */
/*  A small cool nightstand to the RIGHT of the bed: a darker front     */
/*  face dropping from a slightly-lit top band. On it sit an OPEN BOOK  */
/*  (face-down, fanned pages) + a small ALARM CLOCK (late-hour hands).  */
/*  THE ONE WARM ACCENT in the cool room: a bedside LAMP — a turned     */
/*  slim base + a trumpet SHADE (warm honey) glowing with a soft warm   */
/*  halo + a wide warm WASH pooling onto the nightstand, bed edge +     */
/*  wall behind. The halo + wash breathe in sync with the sleeper's     */
/*  ~5.5s breath so warm + breath read together ("someone asleep").    */
/*                                                                     */
/*  MOTION (deterministic, transform/opacity only): the lamp HALO +     */
/*  warm WASH gently breathe synced to the sleeper's 5.5s breath.       */
/*  CONFIRM (~0.6s one-shot, ease [0.32,.94,.4,1]): the halo BLOOMS     */
/*  (scale 1.3, opacity up) + the wash expands (scale 1.16) + shade     */
/*  brightens, then settle.                                            */
/*  reduceMotion: halo/wash static at mid opacity.                     */
/* ================================================================== */

/* Geometry — derived from the shared layout. */
const AX = LAMP.baseX; // 309 — lamp centre x
const APEX_Y = LAMP.shadeApexY; // 196
const MOUTH_Y = LAMP.shadeMouthY; // 206
const STAND_TOP = NIGHTSTAND.topY; // 214
const STAND_BASE = NIGHTSTAND.baseY; // 248

const breathe = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

export default function Nightstand({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04sleep-stand-' + n + '-' + uid;

  const breathLoop = breathe(reduceMotion, 5.5);

  /* ── wide warm WASH: pools onto nightstand + bed edge + wall ── */
  const washAnim = isConfirming
    ? { opacity: 0.42, scale: 1.16 }
    : reduceMotion
      ? { opacity: 0.22, scale: 1 }
      : { opacity: [0.18, 0.3, 0.18], scale: [0.98, 1.04, 0.98] };

  /* ── lamp HALO behind the shade ── */
  const haloCy = (APEX_Y + MOUTH_Y) / 2;
  const haloAnim = isConfirming
    ? { opacity: 0.7, scale: 1.3 }
    : reduceMotion
      ? { opacity: 0.42, scale: 1 }
      : { opacity: [0.34, 0.52, 0.34], scale: [0.97, 1.05, 0.97] };

  /* ── shade brightens on confirm ── */
  const shadeAnim = isConfirming ? { opacity: 1 } : { opacity: 0.96 };

  return (
    <g aria-hidden="true">
      <defs>
        {/* Nightstand top band — slightly lit. */}
        <linearGradient id={id('standTop')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.standTop} />
          <stop offset="100%" stopColor="#4a5470" />
        </linearGradient>
        {/* Nightstand front face — darker, dropping into shadow. */}
        <linearGradient id={id('standFront')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.standFront} />
          <stop offset="100%" stopColor="#1a2138" />
        </linearGradient>
        {/* Warm trumpet shade — soft cream top → honey glow mouth. */}
        <linearGradient id={id('shade')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={BEDROOM.lampSoft} />
          <stop offset="55%" stopColor={BEDROOM.lampShade} />
          <stop offset="100%" stopColor={BEDROOM.lampGlow} />
        </linearGradient>
        {/* Warm lamp halo glow. */}
        <radialGradient id={id('lampHalo')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BEDROOM.lampSoft} stopOpacity="0.9" />
          <stop offset="42%" stopColor={BEDROOM.warmPool} stopOpacity="0.45" />
          <stop offset="100%" stopColor={BEDROOM.warmPool} stopOpacity="0" />
        </radialGradient>
        {/* Wide warm wash cast on the nightstand + bed edge + wall. */}
        <radialGradient id={id('warmWash')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BEDROOM.warmPool} stopOpacity="0.55" />
          <stop offset="55%" stopColor={BEDROOM.warmPool} stopOpacity="0.2" />
          <stop offset="100%" stopColor={BEDROOM.warmPool} stopOpacity="0" />
        </radialGradient>
        {/* Alarm clock face. */}
        <radialGradient id={id('clock')} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2a3450" />
          <stop offset="100%" stopColor={BEDROOM.clock} />
        </radialGradient>

        {/* Static blur filters — never animated. */}
        <filter id={id('bHalo')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={id('bWash')} x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={id('bShadow')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ── Contact shadow under the nightstand ── */}
      <ellipse
        cx={sn(NIGHTSTAND.x + NIGHTSTAND.w / 2)}
        cy={sn(STAND_BASE + 4)}
        rx={sn(NIGHTSTAND.w / 2 + 6)}
        ry={6}
        fill="#0c1024"
        opacity={0.4}
        filter={`url(#${id('bShadow')})`}
      />

      {/* ── Front face ── */}
      <rect
        x={NIGHTSTAND.x}
        y={sn(STAND_TOP + 6)}
        width={NIGHTSTAND.w}
        height={sn(STAND_BASE - STAND_TOP - 6)}
        fill={`url(#${id('standFront')})`}
      />
      {/* lit top edge strip */}
      <rect
        x={NIGHTSTAND.x}
        y={sn(STAND_TOP + 6)}
        width={NIGHTSTAND.w}
        height={1.6}
        fill="#5a6490"
        opacity={0.5}
      />

      {/* ── Top face band ── */}
      <rect
        x={NIGHTSTAND.x}
        y={STAND_TOP}
        width={NIGHTSTAND.w}
        height={7}
        fill={`url(#${id('standTop')})`}
      />
      {/* front lip highlight */}
      <rect
        x={NIGHTSTAND.x}
        y={sn(STAND_TOP + 5.4)}
        width={NIGHTSTAND.w}
        height={1.6}
        fill="#5a6490"
        opacity={0.6}
      />

      {/* ── WIDE WARM WASH (pools onto nightstand + bed edge + wall) —
            rendered EARLY so the lamp sits over it. ── */}
      <motion.ellipse
        cx={AX}
        cy={sn(MOUTH_Y + 6)}
        rx={92}
        ry={64}
        fill={`url(#${id('warmWash')})`}
        filter={`url(#${id('bWash')})`}
        initial={false}
        animate={washAnim}
        transition={isConfirming ? surge(reduceMotion) : breathLoop}
        style={{ transformOrigin: `${AX}px ${MOUTH_Y}px` }}
      />

      {/* ── LAMP BASE (turned slim) ── */}
      <path
        d={`M${sn(AX - 3)} ${STAND_TOP} L${sn(AX - 1.5)} ${sn(MOUTH_Y + 2)} L${sn(
          AX + 1.5,
        )} ${sn(MOUTH_Y + 2)} L${sn(AX + 3)} ${STAND_TOP} Z`}
        fill={BEDROOM.standFront}
      />

      {/* ── LAMP HALO (behind the shade) ── */}
      <motion.ellipse
        cx={AX}
        cy={haloCy}
        rx={26}
        ry={30}
        fill={`url(#${id('lampHalo')})`}
        filter={`url(#${id('bHalo')})`}
        initial={false}
        animate={haloAnim}
        transition={isConfirming ? surge(reduceMotion) : breathLoop}
        style={{ transformOrigin: `${AX}px ${haloCy}px` }}
      />

      {/* ── TRUMPET SHADE (brightens on confirm) ── */}
      <motion.g
        initial={false}
        animate={shadeAnim}
        transition={surge(reduceMotion)}
      >
        <path
          d={`M${sn(AX - 2)} ${APEX_Y} C${sn(AX - 9)} ${sn(APEX_Y + 4)} ${sn(
            AX - 11,
          )} ${sn(MOUTH_Y - 2)} ${sn(AX - 12)} ${MOUTH_Y} L${sn(AX + 12)} ${MOUTH_Y} C${sn(
            AX + 11,
          )} ${sn(MOUTH_Y - 2)} ${sn(AX + 9)} ${sn(APEX_Y + 4)} ${sn(AX + 2)} ${APEX_Y} Z`}
          fill={`url(#${id('shade')})`}
        />
        {/* warm inner glow at the mouth */}
        <ellipse
          cx={AX}
          cy={sn(MOUTH_Y - 1)}
          rx={10}
          ry={2.4}
          fill={BEDROOM.lampSoft}
          opacity={0.8}
        />
      </motion.g>

      {/* ── OPEN BOOK (face-down on the nightstand top) ── */}
      <g>
        {/* left page */}
        <path
          d={`M${sn(AX - 30)} ${sn(STAND_TOP + 2)} L${sn(AX - 11)} ${sn(STAND_TOP + 4)} L${sn(
            AX - 11,
          )} ${sn(STAND_TOP + 8)} L${sn(AX - 30)} ${sn(STAND_TOP + 6)} Z`}
          fill={BEDROOM.book}
        />
        {/* right page */}
        <path
          d={`M${sn(AX - 11)} ${sn(STAND_TOP + 4)} L${sn(AX + 4)} ${sn(STAND_TOP + 2)} L${sn(
            AX + 4,
          )} ${sn(STAND_TOP + 6)} L${sn(AX - 11)} ${sn(STAND_TOP + 8)} Z`}
          fill={BEDROOM.book}
        />
        {/* cool gutter shadow */}
        <path
          d={`M${sn(AX - 11)} ${sn(STAND_TOP + 4)} L${sn(AX - 11)} ${sn(STAND_TOP + 8)}`}
          stroke={BEDROOM.bookInk}
          strokeWidth={1}
          opacity={0.3}
        />
        {/* ink lines */}
        <line
          x1={sn(AX - 27)}
          y1={sn(STAND_TOP + 4)}
          x2={sn(AX - 14)}
          y2={sn(STAND_TOP + 5)}
          stroke={BEDROOM.bookInk}
          strokeWidth={0.6}
          opacity={0.5}
        />
        <line
          x1={sn(AX - 8)}
          y1={sn(STAND_TOP + 5)}
          x2={sn(AX + 1)}
          y2={sn(STAND_TOP + 4)}
          stroke={BEDROOM.bookInk}
          strokeWidth={0.6}
          opacity={0.5}
        />
      </g>

      {/* ── ALARM CLOCK (right of the book) ── */}
      <g>
        <ellipse
          cx={sn(AX + 14)}
          cy={sn(STAND_TOP + 3)}
          rx={9}
          ry={6}
          fill={`url(#${id('clock')})`}
        />
        {/* faint warm dial glow */}
        <ellipse
          cx={sn(AX + 14)}
          cy={sn(STAND_TOP + 3)}
          rx={6}
          ry={3.6}
          fill={BEDROOM.warmPool}
          opacity={0.18}
        />
        {/* two fixed late-hour hands pointing to ~10:40 */}
        <line
          x1={sn(AX + 14)}
          y1={sn(STAND_TOP + 3)}
          x2={sn(AX + 14 - 3.5)}
          y2={sn(STAND_TOP + 3 - 3)}
          stroke={BEDROOM.book}
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.8}
        />
        <line
          x1={sn(AX + 14)}
          y1={sn(STAND_TOP + 3)}
          x2={sn(AX + 14 + 4)}
          y2={sn(STAND_TOP + 3 - 1)}
          stroke={BEDROOM.book}
          strokeWidth={0.8}
          strokeLinecap="round"
          opacity={0.8}
        />
      </g>
    </g>
  );
}
