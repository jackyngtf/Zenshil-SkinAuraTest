'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { GYM, CHESTPRESS } from './gymLayout';

/* ==================================================================
   Q4·D 能量 — HERO: a big side-view SEATED CHEST-PRESS MACHINE.
   Heavy metal frame post + base rails, a stacked WEIGHT STACK column,
   a padded seat + angled backrest (coral accent stripe), and press
   arms whose handles push forward (a rep). The selected top portion
   of the weight stack lifts on its guide rods in sync with the push.
   NO screen / monitor / ECG — reads as gym strength, not medical.
   ================================================================== */

export default function ChestPress({
  uid,
  isConfirming,
  reduceMotion,
}: {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
}) {
  const id = (n: string) => `q04gym-chestpress-${n}-${uid}`;

  const { postX, baseY, pivot, seat, backrestTopY, handleBack, handleFwd, stack } =
    CHESTPRESS;

  /* ---- rep geometry -------------------------------------------------- */
  // The arm group rotates about the pivot. handleBack = chest (rep start),
  // handleFwd = pushed forward. We rotate the whole arm group a few degrees.
  const REP_ROT_PUSH = -16; // degrees: push forward (handle travels out)
  const REP_ROT_MID = -8; // a representative mid-rep parked pose
  // Weight-stack lift: selected top portion rises on its rods during a push.
  const STACK_LIFT = 7; // px the lifted block travels up
  const STACK_LIFT_MID = 3.5;

  // The lifted (selected) portion of the stack — top 3 plates ride the rods.
  const liftedTop = stack.y; // y of stack top
  const liftedH = 30; // height of the moving top block

  /* ---- transitions --------------------------------------------------- */
  const repLoop: Transition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 2.6,
        ease: [0.45, 0, 0.55, 1],
        repeat: Infinity,
        repeatType: 'mirror',
      };

  const confirmEase: [number, number, number, number] = [0.32, 0.94, 0.4, 1];
  const confirmRep: Transition = { duration: 0.6, ease: confirmEase };

  // arm rotation keyframes
  let armRotate: number | number[];
  let armTransition: Transition;
  if (reduceMotion) {
    armRotate = REP_ROT_MID;
    armTransition = { duration: 0 };
  } else if (isConfirming) {
    armRotate = [REP_ROT_MID, REP_ROT_PUSH - 5, REP_ROT_MID];
    armTransition = confirmRep;
  } else {
    armRotate = [0, REP_ROT_PUSH];
    armTransition = repLoop;
  }

  // weight-stack lift keyframes (in sync with the arm)
  let stackY: number | number[];
  let stackTransition: Transition;
  if (reduceMotion) {
    stackY = -STACK_LIFT_MID;
    stackTransition = { duration: 0 };
  } else if (isConfirming) {
    stackY = [-STACK_LIFT_MID, -(STACK_LIFT + 3), -STACK_LIFT_MID];
    stackTransition = confirmRep;
  } else {
    stackY = [0, -STACK_LIFT];
    stackTransition = repLoop;
  }

  // power glow on confirm
  const glowOpacity = reduceMotion
    ? 0
    : isConfirming
      ? [0, 0.85, 0]
      : 0;
  const glowTransition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: confirmEase };

  /* ---- derived frame geometry ---------------------------------------- */
  const postW = 14;
  const postLeft = postX - postW / 2;
  const railY = baseY;
  const stackRight = stack.x + stack.w;

  return (
    <g aria-hidden="true">
      <defs>
        {/* metal post gradient */}
        <linearGradient id={id('post')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={GYM.metalHi} />
          <stop offset="0.45" stopColor={GYM.metal} />
          <stop offset="1" stopColor={GYM.metalDark} />
        </linearGradient>
        {/* weight plate gradient */}
        <linearGradient id={id('plate')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={GYM.stackPlateHi} />
          <stop offset="0.5" stopColor={GYM.stackPlate} />
          <stop offset="1" stopColor={GYM.metalDark} />
        </linearGradient>
        {/* pad gradient */}
        <linearGradient id={id('pad')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GYM.padHi} />
          <stop offset="1" stopColor={GYM.pad} />
        </linearGradient>
        {/* power glow radial */}
        <radialGradient id={id('glow')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={GYM.energyHi} stopOpacity="0.95" />
          <stop offset="0.5" stopColor={GYM.energy} stopOpacity="0.55" />
          <stop offset="1" stopColor={GYM.energy} stopOpacity="0" />
        </radialGradient>
        {/* soft contact shadow blur (STATIC filter) */}
        <filter id={id('softshadow')} x="-40%" y="-60%" width="180%" height="260%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ===== contact shadow on the floor ===== */}
      <ellipse
        cx={postX - 4}
        cy={baseY + 6}
        rx={92}
        ry={11}
        fill={GYM.ink}
        opacity="0.2"
        filter={`url(#${id('softshadow')})`}
      />

      {/* ===== base rails / feet ===== */}
      {/* long floor rail */}
      <rect
        x={stack.x - 6}
        y={railY - 5}
        width={postX + 36 - (stack.x - 6)}
        height={9}
        rx={4}
        fill={`url(#${id('post')})`}
      />
      {/* front foot */}
      <rect x={postX + 22} y={railY - 4} width={16} height={8} rx={3} fill={GYM.metalDark} />
      {/* rear foot under stack */}
      <rect x={stack.x - 8} y={railY - 4} width={16} height={8} rx={3} fill={GYM.metalDark} />

      {/* ===== WEIGHT STACK column (the key gym-machine signal) ===== */}
      {/* two guide rods running the full height */}
      <rect
        x={stack.x + 4}
        y={stack.y - 12}
        width={3}
        height={stack.h + 12}
        rx={1.5}
        fill={GYM.metalDark}
      />
      <rect
        x={stackRight - 7}
        y={stack.y - 12}
        width={3}
        height={stack.h + 12}
        rx={1.5}
        fill={GYM.metalDark}
      />

      {/* STATIC lower plates (the un-lifted stack) */}
      {[0, 1, 2, 3, 4].map((i) => {
        const py = stack.y + liftedH + i * 9;
        return (
          <g key={`plate-lo-${i}`}>
            <rect
              x={stack.x}
              y={py}
              width={stack.w}
              height={8}
              rx={2}
              fill={`url(#${id('plate')})`}
            />
            {/* top bevel highlight */}
            <rect
              x={stack.x + 1.5}
              y={py + 0.8}
              width={stack.w - 3}
              height={1.6}
              rx={0.8}
              fill={GYM.stackPlateHi}
              opacity="0.7"
            />
          </g>
        );
      })}

      {/* selector PIN in one of the static plates */}
      <g>
        <rect
          x={stackRight - 2}
          y={stack.y + liftedH + 1 * 9 + 2.5}
          width={10}
          height={3}
          rx={1.5}
          fill={GYM.energy}
        />
        <circle
          cx={stackRight + 8}
          cy={stack.y + liftedH + 1 * 9 + 4}
          r={2.4}
          fill={GYM.energyHi}
        />
      </g>

      {/* LIFTED top block — rides up on the rods during the rep */}
      <motion.g
        animate={{ y: stackY }}
        transition={stackTransition}
        style={{ willChange: 'transform' }}
      >
        {/* top cap / bracket */}
        <rect
          x={stack.x - 3}
          y={liftedTop - 7}
          width={stack.w + 6}
          height={7}
          rx={2.5}
          fill={GYM.metalDark}
        />
        <rect
          x={stack.x - 1.5}
          y={liftedTop - 6}
          width={stack.w + 3}
          height={2}
          rx={1}
          fill={GYM.metalHi}
          opacity="0.8"
        />
        {/* the 3 selected plates */}
        {[0, 1, 2].map((i) => {
          const py = liftedTop + i * 9;
          return (
            <g key={`plate-hi-${i}`}>
              <rect
                x={stack.x}
                y={py}
                width={stack.w}
                height={8}
                rx={2}
                fill={`url(#${id('plate')})`}
              />
              <rect
                x={stack.x + 1.5}
                y={py + 0.8}
                width={stack.w - 3}
                height={1.6}
                rx={0.8}
                fill={GYM.stackPlateHi}
                opacity="0.85"
              />
            </g>
          );
        })}
      </motion.g>

      {/* ===== MAIN vertical frame POST ===== */}
      <rect
        x={postLeft}
        y={pivot.y - 10}
        width={postW}
        height={baseY - (pivot.y - 10)}
        rx={4}
        fill={`url(#${id('post')})`}
      />
      {/* post highlight edge */}
      <rect
        x={postLeft + 2}
        y={pivot.y - 8}
        width={3}
        height={baseY - (pivot.y - 8) - 2}
        rx={1.5}
        fill={GYM.metalHi}
        opacity="0.7"
      />
      {/* top cap of the post (pivot housing) */}
      <circle cx={pivot.x} cy={pivot.y} r={9} fill={GYM.metalDark} />
      <circle cx={pivot.x} cy={pivot.y} r={4.5} fill={GYM.metalHi} />

      {/* ===== SEAT + angled BACKREST ===== */}
      {/* seat support strut down to the rail */}
      <rect
        x={seat.x + seat.w / 2 - 4}
        y={seat.y + 8}
        width={8}
        height={baseY - (seat.y + 8)}
        rx={3}
        fill={`url(#${id('post')})`}
      />
      {/* backrest (angled, behind/left of the seat) */}
      <g>
        <path
          d={`M ${seat.x - 4} ${seat.y + 4}
              L ${seat.x + 4} ${backrestTopY}
              L ${seat.x + 20} ${backrestTopY}
              L ${seat.x + 14} ${seat.y + 4} Z`}
          fill={`url(#${id('pad')})`}
        />
        {/* backrest highlight */}
        <path
          d={`M ${seat.x - 1} ${seat.y + 2}
              L ${seat.x + 6} ${backrestTopY + 3}
              L ${seat.x + 10} ${backrestTopY + 3}
              L ${seat.x + 3} ${seat.y + 2} Z`}
          fill={GYM.padHi}
          opacity="0.55"
        />
        {/* coral accent stripe on the backrest */}
        <path
          d={`M ${seat.x + 9} ${seat.y + 2}
              L ${seat.x + 14} ${backrestTopY + 4}
              L ${seat.x + 18} ${backrestTopY + 4}
              L ${seat.x + 13} ${seat.y + 2} Z`}
          fill={GYM.padAccent}
        />
      </g>
      {/* seat pad (chunky cushion) */}
      <rect
        x={seat.x}
        y={seat.y}
        width={seat.w}
        height={13}
        rx={5}
        fill={`url(#${id('pad')})`}
      />
      <rect
        x={seat.x + 3}
        y={seat.y + 2}
        width={seat.w - 6}
        height={3}
        rx={1.5}
        fill={GYM.padHi}
        opacity="0.6"
      />
      {/* coral accent stripe on the seat front edge */}
      <rect
        x={seat.x + 2}
        y={seat.y + 9.5}
        width={seat.w - 4}
        height={2.5}
        rx={1.2}
        fill={GYM.padAccent}
      />

      {/* ===== PRESS ARM + HANDLE (the animated rep) ===== */}
      <motion.g
        animate={{ rotate: armRotate }}
        transition={armTransition}
        style={{
          transformOrigin: `${pivot.x}px ${pivot.y}px`,
          willChange: 'transform',
        }}
      >
        {/* arm bar from pivot out to the handle */}
        <path
          d={`M ${pivot.x} ${pivot.y}
              L ${handleBack.x} ${handleBack.y - 4}
              L ${handleBack.x} ${handleBack.y + 4}
              L ${pivot.x + 4} ${pivot.y + 8} Z`}
          fill={`url(#${id('post')})`}
        />
        {/* arm highlight */}
        <line
          x1={pivot.x + 2}
          y1={pivot.y - 1}
          x2={handleBack.x - 2}
          y2={handleBack.y - 2.5}
          stroke={GYM.metalHi}
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* handle vertical grip (chest height) */}
        <rect
          x={handleBack.x - 3}
          y={handleBack.y - 22}
          width={6}
          height={40}
          rx={3}
          fill={GYM.grip}
        />
        {/* handle grip highlight */}
        <rect
          x={handleBack.x - 2}
          y={handleBack.y - 20}
          width={2}
          height={36}
          rx={1}
          fill={GYM.metalHi}
          opacity="0.45"
        />
        {/* handle end caps */}
        <circle cx={handleBack.x} cy={handleBack.y - 22} r={4} fill={GYM.metalDark} />
        <circle cx={handleBack.x} cy={handleBack.y + 18} r={4} fill={GYM.metalDark} />
      </motion.g>

      {/* ===== POWER GLOW flash (confirm only) ===== */}
      <motion.circle
        cx={(handleBack.x + handleFwd.x) / 2}
        cy={(handleBack.y + handleFwd.y) / 2}
        r={48}
        fill={`url(#${id('glow')})`}
        initial={false}
        animate={{ opacity: glowOpacity }}
        transition={glowTransition}
        style={{ willChange: 'opacity' }}
      />
    </g>
  );
}
