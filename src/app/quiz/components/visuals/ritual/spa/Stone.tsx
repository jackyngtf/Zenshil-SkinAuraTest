'use client';

import { motion } from 'framer-motion';
import { loop } from '../ritualShared';
import { STONE_TONES, SPA, sn } from './spaShared';
import type { StoneProps } from './spaShared';

/* ================================================================== */
/*  Q10·B「熱石按摩」— ONE premium hot basalt stone.                     */
/*  A flattened pebble resting on the towel ridge, lit from the        */
/*  UPPER-LEFT (dawn), with a warm amber under-glow because it is a    */
/*  HEATED stone. Renders a single <g> (defs inside) so five instances */
/*  composite into RitualSpaScene without an extra <svg> per stone.    */
/*                                                                     */
/*  Look replicated + elevated from the praised scene stones:          */
/*    body radial gradient (light→mid→shadow) · soft ivory rim-light   */
/*    on the upper-left + a crisp thin rim · a darker lower-right base  */
/*    · a blurred contact shadow on the towel · a specular glint.      */
/*  NEW for the hot variant: a pulsing amber under-glow that flares on  */
/*  confirm. Only OPACITY ever animates; the body is static (the scene */
/*  breathes the whole row).                                            */
/* ================================================================== */

export default function Stone({ uid, cfg, isConfirming, reduceMotion }: StoneProps) {
  const { id, cx, cy, rx, ry, tone, phase } = cfg;
  const [hi, mid, lo] = STONE_TONES[tone];

  /* Unique per (uid, stone) so the five coexisting instances never collide. */
  const ns = (name: string) => `q10x-spa-stone-${name}-${uid}-${id}`;
  const url = (name: string) => `url(#${ns(name)})`;

  /* ── Pebble silhouette ──────────────────────────────────────────
     A flattened ellipse, deliberately irregular: the upper-left "brow"
     bulges slightly outward (toward the light) and the lower-right is
     pulled in a touch, so the form reads hand-picked, not geometric.
     Built as four cubic arcs around (cx,cy). bx/by = control reach. */
  const bx = sn(rx * 0.55);          // horizontal control reach
  const by = sn(ry * 0.62);          // vertical control reach
  const ulBulge = sn(rx * 0.06);     // upper-left pushed toward the light
  const lrTuck = sn(rx * 0.05);      // lower-right pulled in
  const xL = sn(cx - rx - ulBulge);
  const xR = sn(cx + rx - lrTuck);
  const yT = sn(cy - ry - ulBulge * 0.5);
  const yB = sn(cy + ry);
  const bodyD =
    `M${xL} ${sn(cy)} ` +
    /* upper-left → top */
    `C${xL} ${sn(cy - by)} ${sn(cx - bx)} ${yT} ${sn(cx)} ${yT} ` +
    /* top → right */
    `C${sn(cx + bx)} ${yT} ${xR} ${sn(cy - by)} ${xR} ${sn(cy)} ` +
    /* right → bottom */
    `C${xR} ${sn(cy + by)} ${sn(cx + bx)} ${yB} ${sn(cx)} ${yB} ` +
    /* bottom → upper-left */
    `C${sn(cx - bx)} ${yB} ${xL} ${sn(cy + by)} ${xL} ${sn(cy)} Z`;

  /* Rim arc tracing the upper-left edge (light source side). */
  const rimD =
    `M${sn(cx - rx * 0.86)} ${sn(cy + ry * 0.28)} ` +
    `C${sn(cx - rx * 0.9)} ${sn(cy - ry * 0.4)} ${sn(cx - rx * 0.5)} ${yT} ${sn(cx + rx * 0.1)} ${sn(yT - 0.2)}`;

  /* Darker base hugging the lower-right (turned away from the light). */
  const baseD =
    `M${sn(cx - rx * 0.2)} ${yB} ` +
    `C${sn(cx + rx * 0.5)} ${yB} ${xR} ${sn(cy + by * 0.6)} ${xR} ${sn(cy + ry * 0.1)} ` +
    `C${sn(cx + rx * 0.8)} ${sn(cy + ry * 0.7)} ${sn(cx + rx * 0.4)} ${sn(cy + ry * 0.95)} ${sn(cx - rx * 0.2)} ${yB} Z`;

  /* ── Warm glow opacity timeline ────────────────────────────────
     reduceMotion: frozen mid. confirm: one-shot flare → settle.
     ambient: gentle ~5s pulse, phase-shifted per stone via delay so the
     row shimmers out of sync. (loop() returns easeInOut + Infinity.) */
  const GLOW_LO = 0.22;
  const GLOW_HI = 0.42;
  const glowAnim = reduceMotion
    ? { opacity: 0.3 }
    : isConfirming
      ? { opacity: [0.3, 0.75, 0.4] }
      : { opacity: [GLOW_LO, GLOW_HI, GLOW_LO] };
  const glowTrans = isConfirming
    ? { duration: 0.5, ease: 'easeOut' as const }
    : loop(reduceMotion, 5, phase * 5); // phase∈[0,1) → delay across the 5s cycle

  const accentGlow = url('glow');

  return (
    <g>
      <defs>
        {/* Body shading: light at upper-left → mid → shadow at lower-right. */}
        <radialGradient id={ns('body')} cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor={hi} />
          <stop offset="46%" stopColor={mid} />
          <stop offset="100%" stopColor={lo} />
        </radialGradient>
        {/* Warm amber under-glow (heat bleeding from beneath the stone). */}
        <radialGradient id={ns('glow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={SPA.accent} stopOpacity="0.9" />
          <stop offset="48%" stopColor={SPA.accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={SPA.accent} stopOpacity="0" />
        </radialGradient>
        {/* Lower-right base falloff — deepens the turned-away side. */}
        <linearGradient id={ns('base')} x1="20%" y1="10%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={lo} stopOpacity="0" />
          <stop offset="100%" stopColor={SPA.deep} stopOpacity="0.55" />
        </linearGradient>
        {/* Blur passes — each stdDeviation defined exactly once. */}
        <filter id={ns('b2')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={ns('b5')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ── Warm under-glow (HOT stone) — sits widest & lowest, biased
            beneath/around the pebble so heat reads as bleeding out of
            the towel. Animates opacity only; never filter attributes. ── */}
      <motion.ellipse
        cx={sn(cx + rx * 0.08)}
        cy={sn(cy + ry * 0.55)}
        rx={sn(rx * 1.75)}
        ry={sn(ry * 1.7)}
        fill={accentGlow}
        filter={url('b5')}
        initial={false}
        animate={glowAnim}
        transition={glowTrans}
      />

      {/* ── Contact shadow on the towel — blurred, lower-right bias so the
            stone sits ON the body, not floating. Static. ── */}
      <ellipse
        cx={sn(cx + rx * 0.16)}
        cy={sn(cy + ry * 0.82)}
        rx={sn(rx * 0.96)}
        ry={sn(ry * 0.42)}
        fill={SPA.deep}
        opacity={0.26}
        filter={url('b2')}
      />

      {/* ── Stone body ── */}
      <path d={bodyD} fill={url('body')} />

      {/* ── Darker lower-right base (limb-darkening on the shadow side) ── */}
      <path d={baseD} fill={url('base')} />

      {/* ── Soft ivory rim-light along the upper-left edge (blurred pass) ── */}
      <path
        d={rimD}
        fill="none"
        stroke={SPA.towelHi}
        strokeWidth={2.3}
        strokeLinecap="round"
        opacity={0.5}
        filter={url('b2')}
      />
      {/* ── Crisp thin rim highlight (sharp pass over the soft one) ── */}
      <path
        d={rimD}
        fill="none"
        stroke={SPA.towelHi}
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.7}
      />

      {/* ── Specular glint — the tightest catch on the upper-left dome ── */}
      <ellipse
        cx={sn(cx - rx * 0.34)}
        cy={sn(cy - ry * 0.42)}
        rx={sn(rx * 0.2)}
        ry={sn(ry * 0.16)}
        fill="#fdfaf2"
        opacity={0.85}
        transform={`rotate(-24 ${sn(cx - rx * 0.34)} ${sn(cy - ry * 0.42)})`}
      />
    </g>
  );
}
