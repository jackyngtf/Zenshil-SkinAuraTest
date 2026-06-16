'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { NAT, sn, type VistaPartProps } from './natureVista';
import { loop } from '../ritualShared';

/* ================================================================== */
/*  Q10·C「自然遠景」— VistaFrame (Agent B: Frame & Life)              */
/*  Drawn IN FRONT of the hills/water/mist. Soft foreground foliage    */
/*  arcs in from the rim so the vista reads as a view glimpsed from    */
/*  beneath overhanging branches — a dense darkest cluster top-left,   */
/*  a lighter cluster top-right, a small sprig from the bottom-left.   */
/*  A small bird glides across the mid-upper sky; one leaf twirls down */
/*  through the centre. The central ~55% stays clear for the vista.    */
/*  Soft-illustration family, NOT photoreal. Warm dawn light from the  */
/*  upper-left → leaf faces toward UL are lighter (gradient bias).     */
/* ================================================================== */

/* ── Leaf geometry (same two-cubic idiom as RitualNatureScene) ──
   A closed blade from a stem base (bx,by) on the branch to a tip
   (tx,ty) pointing into the frame. `w` is half-width; `shape` biases
   where the blade is widest; `sway` swings the tip + bends the blade
   laterally (deterministic wind). M-C-C-Z structure is identical for
   every keyframe so Framer can morph `d` cleanly. */
type LeafShape = { f1: number; sh: number; f2: number };

const OVATE: LeafShape = { f1: 0.16, sh: 0.74, f2: 0.58 }; // broad, widest mid-blade
const WILLOW: LeafShape = { f1: 0.1, sh: 0.46, f2: 0.5 }; // narrow willow blade

const leafD = (
  bx: number,
  by: number,
  tx: number,
  ty: number,
  w: number,
  shape: LeafShape,
  sway: number,
) => {
  const dx = tx - bx;
  const dy = ty - by;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len; // unit normal (lateral across the blade)
  const py = dx / len;
  const tipX = tx + px * sway;
  const tipY = ty + py * sway;
  const c1x = bx + dx * shape.f1 + px * w * shape.sh;
  const c1y = by + dy * shape.f1 + py * w * shape.sh;
  const c2x = bx + dx * shape.f2 + px * (w + sway * 0.5);
  const c2y = by + dy * shape.f2 + py * (w + sway * 0.5);
  const c3x = bx + dx * shape.f2 - px * (w - sway * 0.5);
  const c3y = by + dy * shape.f2 - py * (w - sway * 0.5);
  const c4x = bx + dx * shape.f1 - px * w * shape.sh;
  const c4y = by + dy * shape.f1 - py * w * shape.sh;
  return (
    `M${sn(bx)} ${sn(by)} ` +
    `C${sn(c1x)} ${sn(c1y)} ${sn(c2x)} ${sn(c2y)} ${sn(tipX)} ${sn(tipY)} ` +
    `C${sn(c3x)} ${sn(c3y)} ${sn(c4x)} ${sn(c4y)} ${sn(bx)} ${sn(by)} Z`
  );
};

/* Midrib stopping short of the tip so the vein stays inside the blade. */
const veinD = (bx: number, by: number, tx: number, ty: number) => {
  const dx = tx - bx;
  const dy = ty - by;
  const len = Math.hypot(dx, dy) || 1;
  const mx = bx + dx * 0.42 + (-dy / len) * 2;
  const my = by + dy * 0.42 + (dx / len) * 2;
  return `M${sn(bx)} ${sn(by)} Q${sn(mx)} ${sn(my)} ${sn(bx + dx * 0.78)} ${sn(by + dy * 0.78)}`;
};

type Leaf = {
  bx: number;
  by: number;
  tx: number;
  ty: number;
  w: number;
  shape: LeafShape;
};

/* Static markup for one leaf (face fill + faint midrib). The whole
   cluster sways as a group, so individual leaves need no own motion. */
function LeafPath({ leaf, fill }: { leaf: Leaf; fill: string }) {
  const { bx, by, tx, ty, w, shape } = leaf;
  return (
    <>
      <path d={leafD(bx, by, tx, ty, w, shape, 0)} fill={fill} />
      <path
        d={veinD(bx, by, tx, ty)}
        fill="none"
        stroke={NAT.vein}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.32"
      />
    </>
  );
}

/* ── Clusters: leaves fan off a thin branch and arc INTO the frame,
   leaving the central vista clear. Tips stay outside the middle ~55%
   (x≈90–310). Each cluster pivots about its branch root so the sway/
   confirm rotation reads as the whole bough flexing. ── */

/* TOP-LEFT — densest, darkest (nearest). Branch root ~(-6,40). */
const CLUSTER_TL = {
  pivot: { x: -6, y: 40 },
  branch: 'M-12 30 Q34 50 72 96 Q86 116 92 140',
  leaves: [
    { bx: -2, by: 40, tx: 70, ty: 38, w: 17, shape: OVATE },
    { bx: 10, by: 52, tx: 86, ty: 70, w: 18, shape: OVATE },
    { bx: 26, by: 66, tx: 96, ty: 104, w: 16, shape: OVATE },
    { bx: 46, by: 84, tx: 104, ty: 138, w: 15, shape: OVATE },
    { bx: 16, by: 60, tx: 52, ty: 6, w: 13, shape: WILLOW },
    { bx: 60, by: 100, tx: 118, ty: 150, w: 13, shape: WILLOW },
  ] as Leaf[],
};

/* TOP-RIGHT — lighter, sparser (mid layer). Branch root ~(406,52). */
const CLUSTER_TR = {
  pivot: { x: 406, y: 52 },
  branch: 'M412 36 Q372 56 340 96 Q326 116 322 138',
  leaves: [
    { bx: 402, by: 50, tx: 332, ty: 44, w: 15, shape: OVATE },
    { bx: 388, by: 62, tx: 318, ty: 78, w: 15, shape: OVATE },
    { bx: 366, by: 80, tx: 312, ty: 116, w: 13, shape: WILLOW },
    { bx: 392, by: 56, tx: 356, ty: 8, w: 12, shape: WILLOW },
    { bx: 346, by: 96, tx: 300, ty: 146, w: 12, shape: WILLOW },
  ] as Leaf[],
};

/* BOTTOM-LEFT — small sprig creeping up (accent). Branch root ~(-4,402). */
const SPRIG_BL = {
  pivot: { x: -4, y: 402 },
  branch: 'M-10 410 Q24 392 44 356 Q54 338 56 318',
  leaves: [
    { bx: 4, by: 392, tx: 48, ty: 332, w: 12, shape: OVATE },
    { bx: 20, by: 372, tx: 64, ty: 318, w: 11, shape: WILLOW },
    { bx: 36, by: 350, tx: 58, ty: 292, w: 10, shape: WILLOW },
  ] as Leaf[],
};

/* Sway loop for a cluster group: gentle rotate about its branch root
   plus a touch of x drift (wind). reduceMotion → parked at rest.
   isConfirming → eases slightly OUTWARD (rotate away from frame +
   nudge toward its corner): the "breathe open" beat. `sign` flips the
   open direction so left/right clusters both swing off-screen. */
const clusterAnim = (
  reduceMotion: boolean,
  isConfirming: boolean,
  rest: number,
  amp: number,
  driftX: number,
  openRot: number,
  openX: number,
) => {
  if (isConfirming) return { rotate: rest + openRot, x: openX };
  if (reduceMotion) return { rotate: rest, x: 0 };
  return {
    rotate: [rest, rest + amp, rest - amp * 0.55, rest],
    x: [0, driftX, 0],
  };
};

export default function VistaFrame({ uid, isConfirming, reduceMotion }: VistaPartProps) {
  const id = (name: string) => `q10-vistaF-${name}-${uid}`;

  const confirmOut: Transition = { duration: 0.5, ease: 'easeOut' };

  return (
    <g aria-hidden="true">
      <defs>
        {/* Near foliage — deepest fern, lit toward the upper-left */}
        <linearGradient id={id('near')} x1="0%" y1="0%" x2="78%" y2="100%">
          <stop offset="0%" stopColor="#9fb99c" />
          <stop offset="50%" stopColor={NAT.foliageMid} />
          <stop offset="100%" stopColor="#566f59" />
        </linearGradient>
        {/* Mid foliage — lighter sage cluster (top-right) */}
        <linearGradient id={id('mid')} x1="0%" y1="0%" x2="78%" y2="100%">
          <stop offset="0%" stopColor="#a7c2a3" />
          <stop offset="52%" stopColor={NAT.foliageMid} />
          <stop offset="100%" stopColor="#577a5e" />
        </linearGradient>
        <filter id={id('soft')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* ── TOP-LEFT cluster: densest + darkest, breathes open on confirm ── */}
      <motion.g
        style={{ transformOrigin: `${CLUSTER_TL.pivot.x}px ${CLUSTER_TL.pivot.y}px` }}
        initial={false}
        animate={clusterAnim(reduceMotion, isConfirming, 0, 2.4, 2.2, -5, -7)}
        transition={isConfirming ? confirmOut : loop(reduceMotion, 7.4, 0.2)}
      >
        <path
          d={CLUSTER_TL.branch}
          fill="none"
          stroke={NAT.foliage}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <g filter={`url(#${id('soft')})`} opacity={0.82}>
          {CLUSTER_TL.leaves.map((leaf, i) => (
            <LeafPath key={`tl-${i}`} leaf={leaf} fill={`url(#${id('near')})`} />
          ))}
        </g>
      </motion.g>

      {/* ── TOP-RIGHT cluster: lighter sage, sparser, desynced sway ── */}
      <motion.g
        style={{ transformOrigin: `${CLUSTER_TR.pivot.x}px ${CLUSTER_TR.pivot.y}px` }}
        initial={false}
        animate={clusterAnim(reduceMotion, isConfirming, 0, -2.8, -2, 5, 8)}
        transition={isConfirming ? confirmOut : loop(reduceMotion, 8.6, 1.3)}
      >
        <path
          d={CLUSTER_TR.branch}
          fill="none"
          stroke="#5e7d64"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.6"
        />
        <g filter={`url(#${id('soft')})`} opacity={0.82}>
          {CLUSTER_TR.leaves.map((leaf, i) => (
            <LeafPath key={`tr-${i}`} leaf={leaf} fill={`url(#${id('mid')})`} />
          ))}
        </g>
      </motion.g>

      {/* ── BOTTOM-LEFT sprig: small, creeps up, slowest sway ── */}
      <motion.g
        style={{ transformOrigin: `${SPRIG_BL.pivot.x}px ${SPRIG_BL.pivot.y}px` }}
        initial={false}
        animate={clusterAnim(reduceMotion, isConfirming, 0, 2, 1.6, -4, -5)}
        transition={isConfirming ? confirmOut : loop(reduceMotion, 9, 2.4)}
      >
        <path
          d={SPRIG_BL.branch}
          fill="none"
          stroke={NAT.foliage}
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.62"
        />
        <g filter={`url(#${id('soft')})`} opacity={0.82}>
          {SPRIG_BL.leaves.map((leaf, i) => (
            <LeafPath key={`bl-${i}`} leaf={leaf} fill={`url(#${id('near')})`} />
          ))}
        </g>
      </motion.g>

      {/* ── DRIFTING LEAF: one blade twirling down through the open
         centre. The group descends + sways x; the inner leaf rotates
         (twirl). Single fall on reduceMotion → parked, faint. ── */}
      <motion.g
        initial={false}
        animate={
          reduceMotion
            ? { x: 206, y: 150, opacity: 0.3 }
            : { x: [188, 210, 196, 214], y: [110, 180, 250, 320], opacity: [0, 0.7, 0.7, 0] }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 13, repeat: Infinity, ease: 'easeIn', delay: 2 }
        }
      >
        <motion.g
          initial={false}
          animate={reduceMotion ? { rotate: 0 } : { rotate: [0, 180, 360] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 5.2, repeat: Infinity, ease: 'linear' }}
        >
          {/* a small free leaf centred on its own origin (base at 0,0,
             tip down-right) so it twirls about its middle */}
          <path d={leafD(-7, -5, 7, 6, 6, OVATE, 0)} fill={NAT.foliageMid} opacity="0.92" />
          <path
            d={veinD(-7, -5, 7, 6)}
            fill="none"
            stroke={NAT.vein}
            strokeWidth="0.8"
            opacity="0.4"
          />
        </motion.g>
      </motion.g>
    </g>
  );
}
