'use client';

import { motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import type { SerumDripProps } from './facialShared';
import { sn, SURFACE_Y } from './facialShared';

/* ================================================================== */
/*  Q10·D「精華滴注」— SerumDrip (Liquid)                              */
/*  A glossy pendant drop swells from the pipette tip, the surface-     */
/*  tension neck stretches & necks down, then a LEAD drop detaches,     */
/*  falls under gravity (accelerating + elongating), and SPLASHES on    */
/*  the surface — a crown of rebounding droplets + expanding ripple     */
/*  rings. (Fall/splash language referenced from the "Drip Drop" pen:   */
/*  a strong ease-in fall + a wave ring, extended here with a scatter   */
/*  crown.) Dawn light upper-left ⇒ speculars on the upper-LEFT.        */
/* ================================================================== */

export default function SerumDrip({ uid, cfg, isConfirming, reduceMotion }: SerumDripProps) {
  const { tipX, tipY, serum, hero, phase } = cfg;

  const ns = (name: string) => `q10x-facial-drip-${name}-${uid}-${cfg.id}`;
  const goo = `q10x-facial-goo-${uid}-${cfg.id}`;
  const bodyGrad = `url(#${ns('body')})`;
  const beadGrad = `url(#${ns('bead')})`;
  const softBlur = `url(#${ns('soft')})`;

  /* Drip cycle; hero is slower/stringier. `phase` offsets `delay`. */
  const cycle = hero ? 7.2 : 6.0;
  const delay = phase * cycle;

  /* ---- Pendant-drop + neck path (one morphing body) ---- */
  const HX = 0.5523;
  const pendantD = (neck: number, bulb: number, r: number, pinch: number) => {
    const topY = sn(tipY);
    const eqY = sn(tipY + bulb);
    const botY = sn(tipY + bulb + r * 1.05);
    const L = sn(tipX - r);
    const R = sn(tipX + r);
    const hx = sn(r * HX);
    const neckY = sn(tipY + neck);
    const vT = sn((eqY - neckY) * HX);
    const vB = sn((botY - eqY) * HX);
    return (
      `M${sn(tipX - pinch)} ${topY} ` +
      `C${sn(tipX - pinch)} ${neckY} ${L} ${sn(eqY - vT)} ${L} ${sn(eqY)} ` +
      `C${L} ${sn(eqY + vB)} ${sn(tipX - hx)} ${botY} ${sn(tipX)} ${botY} ` +
      `C${sn(tipX + hx)} ${botY} ${R} ${sn(eqY + vB)} ${R} ${sn(eqY)} ` +
      `C${R} ${sn(eqY - vT)} ${sn(tipX + pinch)} ${neckY} ${sn(tipX + pinch)} ${topY} Z`
    );
  };

  // swell → grow → stretch & thin → snap → reform (first === last for a clean loop)
  const swell = pendantD(6, hero ? 16 : 13, hero ? 7.5 : 6.5, hero ? 4.5 : 4.2);
  const grow = pendantD(hero ? 14 : 11, hero ? 30 : 23, hero ? 8.5 : 7, hero ? 3 : 3.2);
  const stretch = pendantD(hero ? 26 : 19, hero ? 46 : 34, hero ? 7 : 6, hero ? 1.6 : 2);
  const snap = pendantD(hero ? 30 : 22, hero ? 50 : 38, hero ? 5.5 : 5, hero ? 0.9 : 1.2);
  const pendantFrames = [swell, grow, stretch, snap, swell];

  const pendantConfirm = [
    pendantD(7, hero ? 18 : 15, hero ? 8 : 7, hero ? 5 : 4.5),
    pendantD(hero ? 30 : 24, hero ? 52 : 42, hero ? 8 : 6.5, hero ? 1.4 : 1.8),
    pendantD(hero ? 34 : 28, hero ? 58 : 46, hero ? 5 : 4.5, hero ? 0.8 : 1),
  ];

  const pendantTrans: Transition = isConfirming
    ? { duration: 0.5, times: [0, 0.55, 1], ease: 'easeIn' }
    : { duration: cycle, delay, times: [0, 0.34, 0.62, 0.74, 1], repeat: Infinity, ease: 'easeInOut' };

  /* ---- Fall + splash geometry ---- */
  const leadR = hero ? 5 : 4.2;
  const releaseY = tipY + (hero ? 36 : 28); // where the lead drop pulls free of the neck
  const midY = sn((releaseY + SURFACE_Y) / 2);

  // Trailing droplets — a short string chasing the lead down. Each actually
  // FALLS from releaseY to the surface over [startFall, land]; both land
  // AFTER the lead (IMPACT) so no bead ever sits on the floor early.
  const trail = hero
    ? [{ r: 3.2, startFall: 0.78, land: 0.92 }, { r: 2.3, startFall: 0.84, land: 0.97 }]
    : [{ r: 2.8, startFall: 0.78, land: 0.93 }, { r: 1.9, startFall: 0.84, land: 0.98 }];

  // Splash crown — droplets that fan up-and-out from the impact, then fall
  // back (the "rebound/scatter"). dx outward, up = peak height, r = size.
  const crown = hero
    ? [
        { dx: -24, up: 22, r: 2.2 }, { dx: -14, up: 31, r: 1.8 }, { dx: -6, up: 35, r: 1.4 },
        { dx: 6, up: 34, r: 1.6 }, { dx: 15, up: 29, r: 1.9 }, { dx: 24, up: 19, r: 2.1 }, { dx: 0, up: 14, r: 1.2 },
      ]
    : [
        { dx: -18, up: 17, r: 1.8 }, { dx: -8, up: 25, r: 1.4 }, { dx: 7, up: 26, r: 1.5 },
        { dx: 16, up: 16, r: 1.7 }, { dx: 0, up: 11, r: 1.1 },
      ];

  const IMPACT = 0.86; // fraction of the cycle when the lead drop lands

  /* ---- Reduced motion: static pendant + 2 beads + a faint ground ring ---- */
  if (reduceMotion) {
    const staticBeads = [
      { y: tipY + 74, r: hero ? 4.2 : 3.8 },
      { y: Math.min(tipY + 138, SURFACE_Y - 8), r: hero ? 3 : 2.6 },
    ];
    return (
      <g aria-hidden="true">
        <Defs />
        <g filter={`url(#${goo})`}>
          <path d={swell} fill={bodyGrad} />
        </g>
        <DropGloss cx={tipX} cy={tipY + (hero ? 16 : 13)} r={hero ? 7.5 : 6.5} soft={softBlur} />
        {staticBeads.map((b, i) => (
          <g key={`rb-${i}`}>
            <circle cx={tipX} cy={sn(b.y)} r={b.r} fill={beadGrad} />
            <DropGloss cx={tipX} cy={sn(b.y)} r={b.r} soft={softBlur} />
          </g>
        ))}
        <ellipse cx={tipX} cy={SURFACE_Y} rx={20} ry={5} fill="none" stroke={serum.mid} strokeWidth={1.2} opacity={0.3} />
      </g>
    );
  }

  return (
    <g aria-hidden="true">
      <Defs />

      {/* Gooey body: pendant drop + necking thread fuse as one liquid mass. */}
      <g filter={`url(#${goo})`}>
        <motion.path
          d={swell}
          fill={bodyGrad}
          initial={false}
          animate={{ d: isConfirming ? pendantConfirm : pendantFrames }}
          transition={pendantTrans}
        />
      </g>

      {/* ── LEAD drop: detaches, falls under gravity (easeIn), elongates
            mid-fall, then vanishes at impact where the splash takes over. ── */}
      <motion.ellipse
        cx={tipX}
        fill={beadGrad}
        initial={false}
        animate={
          isConfirming
            ? { cy: [releaseY, midY, SURFACE_Y, SURFACE_Y], rx: [leadR, leadR * 0.9, leadR, leadR], ry: [leadR, leadR * 1.6, leadR, leadR], opacity: [1, 1, 1, 0] }
            : {
                cy: [releaseY, releaseY, releaseY, midY, SURFACE_Y, SURFACE_Y, SURFACE_Y],
                rx: [leadR, leadR, leadR, leadR * 0.9, leadR, leadR, leadR],
                ry: [leadR, leadR, leadR, leadR * 1.6, leadR, leadR, leadR],
                opacity: [0, 0, 1, 1, 1, 0, 0],
              }
        }
        transition={
          isConfirming
            ? { duration: 0.46, times: [0, 0.55, 0.85, 1], ease: 'easeIn' }
            : { duration: cycle, delay, times: [0, 0.6, 0.7, 0.78, IMPACT, 0.9, 1], repeat: Infinity, ease: 'easeIn' }
        }
      />
      {/* Lead-drop gloss travelling with it */}
      <motion.circle
        cx={tipX}
        r={sn(leadR * 0.38)}
        fill="#fffdf8"
        initial={false}
        animate={
          isConfirming
            ? { cy: [releaseY - 1, midY - 1, SURFACE_Y - 1], opacity: [0.85, 0.85, 0] }
            : { cy: [releaseY - 1, releaseY - 1, releaseY - 1, midY - 1, SURFACE_Y - 1, SURFACE_Y - 1, SURFACE_Y - 1], opacity: [0, 0, 0.85, 0.85, 0.85, 0, 0] }
        }
        transition={
          isConfirming
            ? { duration: 0.46, times: [0, 0.6, 1], ease: 'easeIn' }
            : { duration: cycle, delay, times: [0, 0.6, 0.7, 0.78, IMPACT, 0.9, 1], repeat: Infinity, ease: 'easeIn' }
        }
      />

      {/* ── Trailing droplets chasing the lead down ── */}
      {!isConfirming &&
        trail.map((t, i) => (
          <motion.circle
            key={`trail-${i}`}
            cx={tipX}
            r={t.r}
            fill={beadGrad}
            initial={false}
            animate={{ cy: [releaseY, releaseY, SURFACE_Y, SURFACE_Y, SURFACE_Y], opacity: [0, 1, 1, 0, 0] }}
            transition={{
              duration: cycle,
              delay,
              times: [0, t.startFall, t.land, t.land + 0.02, 1],
              repeat: Infinity,
              ease: 'easeIn',
            }}
          />
        ))}

      {/* ── SPLASH: impact flat + crown of rebounding droplets + ripple rings ── */}
      {/* Coloured splat that flashes at the impact point */}
      <motion.ellipse
        cx={tipX}
        cy={SURFACE_Y}
        fill={serum.hi}
        initial={false}
        animate={
          isConfirming
            ? { rx: [0, 14, 18], ry: [0, 3.4, 4], opacity: [0, 0.5, 0] }
            : { rx: [0, 0, 12, 17, 18], ry: [0, 0, 2.6, 4, 4], opacity: [0, 0, 0.5, 0.18, 0] }
        }
        transition={
          isConfirming
            ? { duration: 0.4, delay: 0.34, times: [0, 0.4, 1], ease: 'easeOut' }
            : { duration: cycle, delay, times: [0, IMPACT, IMPACT + 0.03, 0.95, 1], repeat: Infinity, ease: 'easeOut' }
        }
      />
      {/* Crown droplets fanning up-and-out, then falling back */}
      {crown.map((c, i) => (
        <motion.circle
          key={`crown-${i}`}
          cx={tipX}
          cy={SURFACE_Y - 2}
          r={c.r}
          fill={beadGrad}
          initial={false}
          animate={
            isConfirming
              ? { x: [0, c.dx * 0.6, c.dx], y: [0, -c.up, 5], opacity: [0, 1, 0] }
              : { x: [0, 0, c.dx * 0.6, c.dx, c.dx], y: [0, 0, -c.up, 5, 5], opacity: [0, 0, 1, 1, 0] }
          }
          transition={
            isConfirming
              ? { duration: 0.55, delay: 0.34, times: [0, 0.5, 1], ease: 'easeOut' }
              : { duration: cycle, delay, times: [0, IMPACT, IMPACT + 0.06, 0.98, 1], repeat: Infinity, ease: 'easeOut' }
          }
        />
      ))}
      {/* Ripple rings expanding on the surface (the "wave") */}
      <motion.ellipse
        cx={tipX}
        cy={SURFACE_Y}
        fill="none"
        stroke={serum.mid}
        strokeWidth={1.5}
        initial={false}
        animate={
          isConfirming
            ? { rx: [3, 32], ry: [0.8, 8.5], opacity: [0.6, 0] }
            : { rx: [2, 2, 9, 28, 33], ry: [0.6, 0.6, 2.4, 7.4, 8.6], opacity: [0, 0, 0.6, 0.16, 0] }
        }
        transition={
          isConfirming
            ? { duration: 0.6, delay: 0.32, ease: 'easeOut' }
            : { duration: cycle, delay, times: [0, IMPACT, IMPACT + 0.04, 0.98, 1], repeat: Infinity, ease: 'easeOut' }
        }
      />
      <motion.ellipse
        cx={tipX}
        cy={SURFACE_Y}
        fill="none"
        stroke={serum.hi}
        strokeWidth={1}
        initial={false}
        animate={
          isConfirming
            ? { rx: [2, 24], ry: [0.6, 6.4], opacity: [0.5, 0] }
            : { rx: [2, 2, 5, 22, 26], ry: [0.5, 0.5, 1.4, 5.8, 6.8], opacity: [0, 0, 0.5, 0.12, 0] }
        }
        transition={
          isConfirming
            ? { duration: 0.62, delay: 0.4, ease: 'easeOut' }
            : { duration: cycle, delay, times: [0, IMPACT + 0.03, IMPACT + 0.07, 0.99, 1], repeat: Infinity, ease: 'easeOut' }
        }
      />

      {/* Pendant-drop gloss (OUTSIDE goo so the highlight stays crisp). */}
      <motion.ellipse
        cx={sn(tipX - (hero ? 2.6 : 2.2))}
        rx={hero ? 3.6 : 3.1}
        ry={hero ? 6 : 5.2}
        fill="#ffffff"
        filter={softBlur}
        initial={false}
        animate={
          isConfirming
            ? { cy: tipY + (hero ? 22 : 18), opacity: [0.5, 0.9] }
            : { cy: [tipY + (hero ? 14 : 12), tipY + (hero ? 26 : 21)], opacity: [0.55, 0.4] }
        }
        transition={
          isConfirming
            ? { duration: 0.5, ease: 'easeIn' }
            : { duration: cycle, delay, times: [0, 1], repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
        }
      />
      <motion.circle
        cx={sn(tipX - (hero ? 3 : 2.6))}
        r={hero ? 2 : 1.7}
        fill="#fffdf8"
        initial={false}
        animate={
          isConfirming
            ? { cy: tipY + (hero ? 14 : 11), opacity: [0.9, 1] }
            : { cy: [tipY + (hero ? 9 : 8), tipY + (hero ? 16 : 13)], opacity: [0.85, 0.55] }
        }
        transition={
          isConfirming
            ? { duration: 0.5, ease: 'easeIn' }
            : { duration: cycle, delay, times: [0, 1], repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
        }
      />
    </g>
  );

  /* ---- Reusable defs (scoped per instance) ---- */
  function Defs() {
    return (
      <defs>
        <radialGradient id={ns('body')} cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="22%" stopColor={serum.hi} />
          <stop offset="60%" stopColor={serum.mid} />
          <stop offset="100%" stopColor={serum.lo} />
        </radialGradient>
        <radialGradient id={ns('bead')} cx="36%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor={serum.hi} />
          <stop offset="64%" stopColor={serum.mid} />
          <stop offset="100%" stopColor={serum.lo} />
        </radialGradient>
        <filter id={ns('soft')} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
        {/* "Gooey" merge: blur → high-contrast alpha threshold → blend. */}
        <filter id={goo} x="-80%" y="-40%" width="260%" height="320%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    );
  }
}

/* A single drop/bead gloss for the static (reduced-motion) render. */
function DropGloss({ cx, cy, r, soft }: { cx: number; cy: number; r: number; soft: string }) {
  return (
    <>
      <ellipse
        cx={sn(cx - r * 0.38)}
        cy={sn(cy - r * 0.42)}
        rx={sn(r * 0.46)}
        ry={sn(r * 0.32)}
        fill="#ffffff"
        opacity={0.5}
        filter={soft}
      />
      <circle cx={sn(cx - r * 0.42)} cy={sn(cy - r * 0.46)} r={sn(r * 0.24)} fill="#fffdf8" opacity={0.85} />
    </>
  );
}
