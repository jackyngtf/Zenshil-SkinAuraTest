'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { STUDY, WINDOW_WASH, LIGHT_SHAFT, DESK_Y, sn } from './studyLayout';

/* ================================================================== */
/*  Q4·C 時間 — STUDY BACKDROP (renders FIRST, behind everything).       */
/*                                                                     */
/*  A calm focused CYAN-DUSK wall: a deep cool cyan-slate gradient      */
/*  enriched above the desk, with a soft cool WINDOW WASH pooling        */
/*  upper-LEFT (light implied from an off-frame top-left window — no     */
/*  hard window rectangle, keeps the disc clean) + a faint angled        */
/*  LIGHT SHAFT raking down across wall+desk. A thin receding SHELF      */
/*  line + one tiny ellipsis "object" on it suggests a lived-in room.    */
/*  A soft CORNER VIGNETTE behind the furniture keeps corners dim.       */
/*                                                                     */
/*  MOSTLY STATIC — only the cool window wash + light shaft breathe     */
/*  (~8.4s). CONFIRM (~0.6s, ease [0.32,.94,.4,1]): the wash warms/      */
/*  brightens a touch, the shaft intensifies, then settle.              */
/*  reduceMotion: fully static representative state.                    */
/* ================================================================== */

/* slow eased breathe loop for the cool window wash / light shaft */
const breathe = (reduceMotion: boolean, duration: number, delay = 0): Transition =>
  reduceMotion
    ? { duration: 0 }
    : { duration, delay, repeat: Infinity, ease: 'easeInOut' };

/* one-shot confirm surge */
const surge = (reduceMotion: boolean, duration = 0.6): Transition =>
  reduceMotion ? { duration: 0 } : { duration, ease: [0.32, 0.94, 0.4, 1] };

export default function StudyBackdrop({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => 'q04study-bg-' + n + '-' + uid;

  const washLoop = breathe(reduceMotion, 8.4);
  const shaftLoop = breathe(reduceMotion, 8.4, 0.4);

  return (
    <g aria-hidden="true">
      <defs>
        {/* Deep cool cyan-slate wall nuance above the desk — skyTop → wallTop
            → wallLo. Painted at low opacity to enrich the base gradient laid by
            the assembler. */}
        <linearGradient id={id('wall')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={STUDY.skyTop} />
          <stop offset="52%" stopColor={STUDY.wallTop} />
          <stop offset="100%" stopColor={STUDY.wallLo} />
        </linearGradient>
        {/* Cool window-lit cyan WASH pooling upper-left on the wall. */}
        <radialGradient id={id('wash')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={STUDY.wallGlow} stopOpacity="0.5" />
          <stop offset="55%" stopColor={STUDY.wallGlow} stopOpacity="0.12" />
          <stop offset="100%" stopColor={STUDY.wallGlow} stopOpacity="0" />
        </radialGradient>
        {/* Faint angled LIGHT SHAFT raking from upper-left down to desk. */}
        <linearGradient id={id('shaft')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={STUDY.wallGlow} stopOpacity="0.5" />
          <stop offset="100%" stopColor={STUDY.wallGlow} stopOpacity="0" />
        </linearGradient>
        {/* Soft corner vignette behind the furniture. */}
        <radialGradient id={id('vig')} cx="50%" cy="46%" r="80%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor={STUDY.vig} stopOpacity="0.46" />
        </radialGradient>
        {/* Heavy blur for the breathing window wash + light shaft. */}
        <filter id={id('bWash')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id={id('bShaft')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* ── WALL cyan-dusk nuance above the desk (enriches base gradient) ── */}
      <rect x="0" y="0" width="400" height={sn(DESK_Y)} fill={`url(#${id('wall')})`} opacity={0.5} />

      {/* ── Cool WINDOW WASH pooling upper-left (breathes) ── */}
      <motion.ellipse
        cx={WINDOW_WASH.cx}
        cy={WINDOW_WASH.cy}
        rx={WINDOW_WASH.rx}
        ry={WINDOW_WASH.ry}
        fill={`url(#${id('wash')})`}
        filter={`url(#${id('bWash')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.5, scale: 1.06 }
            : reduceMotion
              ? { opacity: 0.3, scale: 1 }
              : { opacity: [0.22, 0.36, 0.22], scale: [0.98, 1.03, 0.98] }
        }
        transition={isConfirming ? surge(reduceMotion) : washLoop}
        style={{ transformOrigin: `${WINDOW_WASH.cx}px ${WINDOW_WASH.cy}px` }}
      />

      {/* ── Faint angled LIGHT SHAFT raking down (breathes) ── */}
      <motion.path
        d={LIGHT_SHAFT}
        fill={`url(#${id('shaft')})`}
        filter={`url(#${id('bShaft')})`}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.18 }
            : reduceMotion
              ? { opacity: 0.08 }
              : { opacity: [0.06, 0.12, 0.06] }
        }
        transition={isConfirming ? surge(reduceMotion) : shaftLoop}
      />

      {/* ── Faint receding SHELF line + tiny "object" (scandi detail, static).
          Shifted -20 to sit above the raised desk seam. ── */}
      <line
        x1={40}
        y1={150}
        x2={360}
        y2={150}
        stroke={STUDY.wallGlow}
        strokeWidth={1}
        opacity={0.12}
      />
      <ellipse cx={320} cy={144} rx={14} ry={4} fill={STUDY.wallGlow} opacity={0.1} />

      {/* ── Corner vignette behind the furniture (rendered last in this layer) ── */}
      <rect x="0" y="0" width="400" height={320} fill={`url(#${id('vig')})`} />
    </g>
  );
}
