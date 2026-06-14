'use client';

import { motion } from 'framer-motion';
import type { PipetteProps } from './facialShared';
import { sn } from './facialShared';
import { loop } from '../ritualShared';

/* ================================================================== */
/*  Q10·D「精華滴注」— Agent A · GLASS                                  */
/*  One photoreal glass serum pipette. Built vertically in local      */
/*  coords (fine tip at the BOTTOM, barrel running UP off-frame), then */
/*  rotated about its tip by cfg.angle so the row converges from the   */
/*  top. Light is upper-left; the modest tilt keeps the lit edge on    */
/*  the local-left. Layering mirrors the Q7 pearl: soft+crisp rim,     */
/*  inner streak, tip glint, translucent body, refractive shadow edge. */
/*  Only ONE thing animates: a subtle serum shimmer (opacity loop).    */
/* ================================================================== */

export default function Pipette({ uid, cfg, reduceMotion }: PipetteProps) {
  const { tipX, tipY, len, w, serum } = cfg;
  const half = w / 2;

  /* ── Vertical geometry (local coords; tip at bottom) ──
     Barrel top runs above the frame (negative y is fine). The cylinder
     keeps full width until `shoulderY`, then necks in to a fine throat
     and swells into a bulbous tip that magnifies the serum colour. */
  const top = tipY - len;            // barrel top (off-frame)
  const shoulderY = tipY - w * 1.5;  // where the taper begins
  const throatY = tipY - w * 0.5;    // narrowest neck above the bulb
  const throatW = w * 0.22;          // half-width at the throat
  const bulbY = tipY - w * 0.16;     // bulb equator (magnifying lens)
  const bulbW = w * 0.34;            // half-width of the bulbous tip
  const tipPtY = tipY;               // rounded tip point

  /* Closed glass outline: round-topped barrel → shoulder → throat → bulb
     → tip → back up the other side. Authored left-edge first. */
  const r = half * 0.55; // top corner radius
  const bodyD =
    `M${sn(tipX - half)} ${sn(top + r)} ` +
    `Q${sn(tipX - half)} ${sn(top)} ${sn(tipX - half + r)} ${sn(top)} ` +
    `L${sn(tipX + half - r)} ${sn(top)} ` +
    `Q${sn(tipX + half)} ${sn(top)} ${sn(tipX + half)} ${sn(top + r)} ` +
    `L${sn(tipX + half)} ${sn(shoulderY)} ` +
    // right shoulder neck into the throat
    `C${sn(tipX + half)} ${sn(shoulderY + w * 0.5)} ${sn(tipX + throatW)} ${sn(throatY - w * 0.3)} ${sn(tipX + throatW)} ${sn(throatY)} ` +
    // right side of the bulb
    `C${sn(tipX + throatW)} ${sn(throatY + w * 0.2)} ${sn(tipX + bulbW)} ${sn(bulbY - w * 0.18)} ${sn(tipX + bulbW)} ${sn(bulbY)} ` +
    `C${sn(tipX + bulbW)} ${sn(bulbY + w * 0.22)} ${sn(tipX + bulbW * 0.4)} ${sn(tipPtY)} ${sn(tipX)} ${sn(tipPtY)} ` +
    // left side of the bulb back up
    `C${sn(tipX - bulbW * 0.4)} ${sn(tipPtY)} ${sn(tipX - bulbW)} ${sn(bulbY + w * 0.22)} ${sn(tipX - bulbW)} ${sn(bulbY)} ` +
    `C${sn(tipX - bulbW)} ${sn(bulbY - w * 0.18)} ${sn(tipX - throatW)} ${sn(throatY + w * 0.2)} ${sn(tipX - throatW)} ${sn(throatY)} ` +
    // left shoulder back to the barrel
    `C${sn(tipX - throatW)} ${sn(throatY - w * 0.3)} ${sn(tipX - half)} ${sn(shoulderY + w * 0.5)} ${sn(tipX - half)} ${sn(shoulderY)} ` +
    `Z`;

  /* Serum fills the lower ~55% of the straight barrel + the whole tip.
     The meniscus (curved top surface) sits at meniscusY. */
  const meniscusY = top + len * 0.45; // top of the serum column (~55% full)
  const serumRectY = meniscusY;
  const serumRectH = tipY - meniscusY + 6;

  /* Namespaced ids — three instances share one <svg>, so collisions
     would corrupt rendering. */
  const id = (name: string) => `q10x-facial-pip-${name}-${uid}-${cfg.id}`;
  const url = (name: string) => `url(#${id(name)})`;

  /* Inner left-edge specular streak (the crisp vertical light bar inside
     the glass). Sits just inside the lit edge, fades before the bulb. */
  const streakX = tipX - half * 0.52;
  const streakTop = top + r + 4;
  const streakBot = shoulderY - w * 0.2;

  return (
    <g transform={`rotate(${cfg.angle} ${sn(tipX)} ${sn(tipY)})`}>
      <defs>
        {/* Translucent glass body — lit (left) to refractive shadow (right) */}
        <linearGradient id={id('glass')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fffdf8" stopOpacity="0.92" />
          <stop offset="34%" stopColor="#f4ede2" stopOpacity="0.5" />
          <stop offset="66%" stopColor="#e8ddce" stopOpacity="0.56" />
          <stop offset="100%" stopColor="#c6b8a3" stopOpacity="0.82" />
        </linearGradient>

        {/* Serum column — shadow at the bottom rising to lit near meniscus,
            but it GLOWS brighter again right at the tip (concentrated). */}
        <linearGradient id={id('serum')} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={serum.lo} />
          <stop offset="42%" stopColor={serum.mid} />
          <stop offset="100%" stopColor={serum.hi} />
        </linearGradient>

        {/* Bulb lens — radial so the rounded tip reads like a magnifier */}
        <radialGradient id={id('bulb')} cx="40%" cy="32%" r="72%">
          <stop offset="0%" stopColor={serum.hi} />
          <stop offset="46%" stopColor={serum.mid} />
          <stop offset="100%" stopColor={serum.lo} />
        </radialGradient>

        {/* Soft outer edge halo — the glass catching ambient light */}
        <linearGradient id={id('halo')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fffefb" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#fffefb" stopOpacity="0" />
          <stop offset="100%" stopColor="#fffefb" stopOpacity="0" />
        </linearGradient>

        {/* Inner specular streak — bright core feathering to nothing */}
        <linearGradient id={id('streak')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Limb darkening across the cylinder for roundness */}
        <linearGradient id={id('round')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="58%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#3a3024" stopOpacity="0.22" />
        </linearGradient>

        <filter id={id('b1')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <filter id={id('b3')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>

        {/* Clip every internal element to the glass silhouette */}
        <clipPath id={id('clip')}>
          <path d={bodyD} />
        </clipPath>
      </defs>

      {/* ── Soft outer edge glow (blurred silhouette behind the glass) ── */}
      <path d={bodyD} fill="none" stroke="#fffefb" strokeWidth={3} strokeOpacity={0.32} filter={url('b3')} />

      {/* ── Translucent glass body ── */}
      <path d={bodyD} fill={url('glass')} />

      {/* ── Everything refractive lives inside the glass ── */}
      <g clipPath={`url(#${id('clip')})`}>
        {/* Serum column in the straight barrel */}
        <rect x={sn(tipX - half)} y={sn(serumRectY)} width={sn(w)} height={sn(serumRectH)} fill={url('serum')} />

        {/* Bulbous tip filled by the radial lens — concentrated colour */}
        <ellipse cx={sn(tipX)} cy={sn(bulbY)} rx={sn(bulbW + 1)} ry={sn(w * 0.4)} fill={url('bulb')} />

        {/* Tip glow — the serum reads brightest where it pools at the point */}
        <motion.ellipse
          cx={sn(tipX)}
          cy={sn(tipY - w * 0.22)}
          rx={sn(bulbW * 0.7)}
          ry={sn(w * 0.34)}
          fill={serum.hi}
          filter={url('b3')}
          initial={false}
          animate={reduceMotion ? { opacity: 0.34 } : { opacity: [0.28, 0.48, 0.28] }}
          transition={loop(reduceMotion, 6.6 + cfg.phase * 2)}
        />

        {/* Meniscus: a darker concave lip then a bright surface highlight */}
        <ellipse cx={sn(tipX)} cy={sn(meniscusY)} rx={sn(half * 0.9)} ry={3} fill={serum.lo} opacity={0.5} />
        <ellipse cx={sn(tipX)} cy={sn(meniscusY - 1.6)} rx={sn(half * 0.78)} ry={2.2} fill="#ffffff" opacity={0.55} filter={url('b1')} />

        {/* Limb darkening — bends the whole cylinder into round */}
        <rect x={sn(tipX - half)} y={sn(top)} width={sn(w)} height={sn(len + w)} fill={url('round')} />
      </g>

      {/* ── Refractive dark edge on the lower-right (away from light) ── */}
      <path d={bodyD} fill="none" stroke="#5a4d3a" strokeWidth={0.9} strokeOpacity={0.18} />

      {/* ── Soft WIDE rim-light hugging the lit upper-left edge ── */}
      <path
        d={
          `M${sn(tipX - half + r)} ${sn(top + 1)} ` +
          `Q${sn(tipX - half + 1)} ${sn(top + 1)} ${sn(tipX - half + 1)} ${sn(top + r)} ` +
          `L${sn(tipX - half + 1)} ${sn(shoulderY)}`
        }
        fill="none"
        stroke="#fffefb"
        strokeWidth={3.2}
        strokeOpacity={0.5}
        strokeLinecap="round"
        filter={url('b3')}
      />

      {/* ── Crisp THIN rim-light on the same edge ── */}
      <path
        d={
          `M${sn(tipX - half + r)} ${sn(top + 0.6)} ` +
          `Q${sn(tipX - half + 0.6)} ${sn(top + 0.6)} ${sn(tipX - half + 0.6)} ${sn(top + r)} ` +
          `L${sn(tipX - half + 0.6)} ${sn(shoulderY - w * 0.3)}`
        }
        fill="none"
        stroke="#ffffff"
        strokeWidth={1}
        strokeOpacity={0.8}
        strokeLinecap="round"
      />

      {/* ── Inner vertical specular streak inside the barrel ── */}
      <rect
        x={sn(streakX - 2.6)}
        y={sn(streakTop)}
        width={5.2}
        height={sn(streakBot - streakTop)}
        rx={2.6}
        fill={url('streak')}
        opacity={0.85}
        filter={url('b1')}
      />

      {/* ── Faint secondary glint just right of the core streak ── */}
      <rect
        x={sn(streakX + half * 0.34)}
        y={sn(streakTop + 6)}
        width={1.6}
        height={sn((streakBot - streakTop) * 0.7)}
        rx={0.8}
        fill="#ffffff"
        opacity={0.3}
      />

      {/* ── Soft ambient catch on the right edge (subtle bounce light) ── */}
      <path d={bodyD} fill={url('halo')} opacity={0.4} />

      {/* ── Tip glint: a tiny crisp specular dot on the bulb's lit side ── */}
      <ellipse
        cx={sn(tipX - bulbW * 0.4)}
        cy={sn(bulbY - w * 0.14)}
        rx={2.4}
        ry={1.5}
        fill="#ffffff"
        opacity={0.9}
        transform={`rotate(-24 ${sn(tipX - bulbW * 0.4)} ${sn(bulbY - w * 0.14)})`}
      />
    </g>
  );
}
