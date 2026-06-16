'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';

/* ================================================================== */
/*  Q9 · C 穩定舒服 — SERENE BALANCED CALM                              */
/*                                                                     */
/*  The ideal "calm + stable + comfortable + settled + balanced" skin  */
/*  state, rebuilt from scratch (the old centred mint sphere was        */
/*  rejected — a centred blob that rhymed with option B's pearl ball).  */
/*                                                                     */
/*  THE READ: a soft restful field in equilibrium. Two broad luminous   */
/*  VEILS counter-poise — a sage/eucalyptus veil rises gently from       */
/*  below while a warm cream veil settles from above — and they meet in  */
/*  a calm, steady MIDDLE BAND that holds at rest. NOT a single hard      */
/*  horizon line (option A owns the sunrise-over-water horizon): the      */
/*  meeting is a soft wide band, the veils undulate as broad organic      */
/*  curves, and the whole composition is balanced rather than split.      */
/*  Two large, soft, rounded forms rest OFF-CENTRE in gentle balance      */
/*  (one low-left sage, one high-right cream), slowly counter-breathing   */
/*  so neither ever reads as a centred orb. A few unhurried motes drift   */
/*  evenly through the field; a soft even ambient glow sits over all.     */
/*                                                                     */
/*  MOTION: everything moves SLOWLY and returns to rest (settling) on     */
/*  slow premium easeInOut loops (~6.5–10s). The two veils breathe in     */
/*  opposition (one up while the other eases down) so the balance is      */
/*  always being gently restored — the hero motion is that even,          */
/*  symmetric settling. d-morphs share identical command structure        */
/*  (first frame === last frame) for a seamless loop. CONFIRM (~0.6s      */
/*  one-shot): everything eases to a balanced rest + soft brighten        */
/*  (deep calm realised) — opacity is never forced to 0 (parent fades).   */
/*  reduceMotion: parked at a representative balanced mid-state.          */
/* ================================================================== */

/* ── Palette: deepened sage/eucalyptus + warm cream/neutral + gentle white.
   Calm + comfortable + premium, now with real dimension — more saturated
   and present so it never reads as a blank wash; deliberately distinct
   from sky-blue, gold and pearl. ── */
const SAGE_ACCENT = '#86b6a0'; // deeper eucalyptus accent — depth + presence
const SAGE_DEEP = '#a9cdba'; // body of the rising veil
const SAGE_MID = '#cfe3d8'; // mid field
const SAGE_SOFT = '#dceae2'; // softest sage light
const CREAM = '#f7f4ec'; // warm cream highlight
const CREAM_WARM = '#f2efe6'; // settled warm neutral
const VIGNETTE = '#5d8a76'; // deep eucalyptus rim for luminous depth
const WHITE_SOFT = '#ffffff';

/* ── Smooth open path through anchor points (Catmull–Rom → cubic
   beziers). Same anchor count for every phase ⇒ identical command
   structure ⇒ seamless d-morph. ── */
const smooth = (pts: ReadonlyArray<readonly [number, number]>) => {
  const r = (n: number) => Math.round(n * 100) / 100;
  let d = `M${r(pts[0][0])} ${r(pts[0][1])} `;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[0];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[pts.length - 1];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${r(c1x)} ${r(c1y)} ${r(c2x)} ${r(c2y)} ${r(p2[0])} ${r(p2[1])} `;
  }
  return d;
};

/* Anchors run off-canvas each side so a veil's crest never shows a free
   endpoint inside the clipped circle. */
const AX = [-60, 20, 110, 200, 290, 380, 460] as const;

/* One broad veil: baseline y0 with a slow, shallow even undulation
   (gentle amp), so the form reads as soft + restful, never energetic.
   Deterministic — constant phase args only. The veil is filled DOWN to
   `floor` (or up to `ceil`) so it's a soft body, not a thin line. */
const veilUp = (y0: number, amp: number, phase: number) => {
  const pts: Array<readonly [number, number]> = AX.map((x, i) => {
    const y = y0 + amp * Math.sin(phase + i * 0.62);
    return [x, y] as const;
  });
  // close down to the bottom for a filled rising body
  return `${smooth(pts)} L460 460 L-60 460 Z`;
};

const veilDown = (y0: number, amp: number, phase: number) => {
  const pts: Array<readonly [number, number]> = AX.map((x, i) => {
    const y = y0 + amp * Math.sin(phase + i * 0.62);
    return [x, y] as const;
  });
  // close up to the top for a filled settling body
  return `${smooth(pts)} L460 -60 L-60 -60 Z`;
};

/* A few slow even motes drifting through the field — serene, unhurried,
   evenly spaced. Deterministic constants (no Math.random). */
const MOTES = [
  { cx: 132, cy: 168, r: 2.6, dx: 10, dy: -16, dur: 9.0, delay: 0.0, peak: 0.92 },
  { cx: 268, cy: 232, r: 2.1, dx: -12, dy: 14, dur: 10.0, delay: 1.4, peak: 0.78 },
  { cx: 196, cy: 132, r: 2.3, dx: 8, dy: 12, dur: 8.5, delay: 2.6, peak: 0.82 },
  { cx: 300, cy: 168, r: 1.8, dx: -9, dy: -12, dur: 9.6, delay: 0.8, peak: 0.7 },
  { cx: 110, cy: 256, r: 2.0, dx: 11, dy: -10, dur: 10.4, delay: 2.0, peak: 0.74 },
  { cx: 232, cy: 280, r: 2.4, dx: -8, dy: -15, dur: 8.8, delay: 3.2, peak: 0.8 },
] as const;

export default function Q9StableScene({ isConfirming }: { isConfirming: boolean }) {
  const reduceMotion = useReducedMotion();

  const id = (n: string) => `q9stable-${n}`;

  /* Slow premium settling loop. */
  const loop = (dur: number, delay = 0): Transition =>
    reduceMotion
      ? { duration: 0 }
      : { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' };

  /* One-shot confirm easing — gentle settle to balanced rest. */
  const settle = (dur: number): Transition =>
    reduceMotion ? { duration: 0 } : { duration: dur, ease: [0.32, 0.94, 0.4, 1] };

  /* ── Rising sage veil (from below). Baseline ~232, breathes UP a touch
     with a slightly fuller crest so the rising body clearly reads.
     On confirm it eases to a settled balanced baseline + soft brighten. ── */
  const sageFrames = [
    veilUp(232, 11, 0.0),
    veilUp(232, 11, Math.PI),
    veilUp(232, 11, 0.0),
  ];
  const sageAnimate = isConfirming
    ? { d: veilUp(228, 11, 1.0), y: -2, opacity: 1 }
    : reduceMotion
      ? { d: sageFrames[0], y: 0, opacity: 0.98 }
      : { d: sageFrames, y: [0, -7, 0], opacity: [0.92, 1, 0.92] };

  /* ── Settling cream veil (from above). Baseline ~176, breathes DOWN in
     OPPOSITION to the sage veil (offset phase + opposite y drift) so the
     balance is continuously restored — the hero even settling. ── */
  const creamFrames = [
    veilDown(176, 11, 1.6),
    veilDown(176, 11, 1.6 + Math.PI),
    veilDown(176, 11, 1.6),
  ];
  const creamAnimate = isConfirming
    ? { d: veilDown(180, 11, 2.6), y: 2, opacity: 0.98 }
    : reduceMotion
      ? { d: creamFrames[0], y: 0, opacity: 0.94 }
      : { d: creamFrames, y: [0, 7, 0], opacity: [0.88, 0.98, 0.88] };

  /* ── Calm steady middle band where the veils meet — holds at rest,
     only the faintest even breathing so it reads as settled. A clearer
     luminous seam now anchors the balanced equilibrium. ── */
  const bandAnimate = isConfirming
    ? { opacity: 0.82, scaleX: 1.04 }
    : reduceMotion
      ? { opacity: 0.64, scaleX: 1 }
      : { opacity: [0.56, 0.72, 0.56], scaleX: [1, 1.03, 1] };

  /* ── Two large soft rounded forms in BALANCED equilibrium (off-centre,
     counter-poising). Low-left sage form rises while high-right cream form
     eases — opposite phases keep them in balance, never a centred orb.
     Boosted presence so the soft forms clearly read without hard edges. ── */
  const formLeftAnimate = isConfirming
    ? { y: -4, scale: 1.04, opacity: 0.96 }
    : reduceMotion
      ? { y: 0, scale: 1, opacity: 0.82 }
      : { y: [0, -9, 0], scale: [1, 1.035, 1], opacity: [0.72, 0.9, 0.72] };

  const formRightAnimate = isConfirming
    ? { y: 4, scale: 1.04, opacity: 0.92 }
    : reduceMotion
      ? { y: 0, scale: 1, opacity: 0.78 }
      : { y: [0, 9, 0], scale: [1, 1.03, 1], opacity: [0.68, 0.86, 0.68] };

  /* ── Soft even ambient glow over all — comfort + luminosity. ── */
  const ambientAnimate = isConfirming
    ? { opacity: 0.62 }
    : reduceMotion
      ? { opacity: 0.44 }
      : { opacity: [0.36, 0.5, 0.36] };

  /* ── Luminous vignette for depth — a deep eucalyptus rim that frames the
     serene field so it reads as a crafted scene, not an empty wash. ── */
  const vignetteAnimate = isConfirming
    ? { opacity: 0.46 }
    : reduceMotion
      ? { opacity: 0.5 }
      : { opacity: [0.46, 0.56, 0.46] };

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* Restful base — luminous warm-cream centre easing to deepened sage
            then a saturated eucalyptus edge; real depth, calming yet present. */}
        <radialGradient id={id('base')} cx="50%" cy="46%" r="76%">
          <stop offset="0%" stopColor={CREAM} />
          <stop offset="38%" stopColor={SAGE_MID} />
          <stop offset="74%" stopColor={SAGE_DEEP} />
          <stop offset="100%" stopColor={SAGE_ACCENT} />
        </radialGradient>

        {/* Rising sage veil — saturated eucalyptus body softening upward. */}
        <linearGradient id={id('sage')} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={SAGE_ACCENT} stopOpacity="0.95" />
          <stop offset="40%" stopColor={SAGE_DEEP} stopOpacity="0.78" />
          <stop offset="72%" stopColor={SAGE_MID} stopOpacity="0.42" />
          <stop offset="100%" stopColor={SAGE_SOFT} stopOpacity="0" />
        </linearGradient>

        {/* Settling cream veil — warm-neutral body softening downward. */}
        <linearGradient id={id('cream')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={WHITE_SOFT} stopOpacity="0.96" />
          <stop offset="34%" stopColor={CREAM} stopOpacity="0.8" />
          <stop offset="68%" stopColor={CREAM_WARM} stopOpacity="0.44" />
          <stop offset="100%" stopColor={CREAM_WARM} stopOpacity="0" />
        </linearGradient>

        {/* Calm meeting band — soft luminous seam where the veils settle. */}
        <linearGradient id={id('band')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={WHITE_SOFT} stopOpacity="0" />
          <stop offset="50%" stopColor={WHITE_SOFT} stopOpacity="0.95" />
          <stop offset="100%" stopColor={WHITE_SOFT} stopOpacity="0" />
        </linearGradient>

        {/* Soft rounded resting forms — luminous core softening out, now with
            a deeper sage/cream body so the balanced forms clearly read. */}
        <radialGradient id={id('formSage')} cx="42%" cy="40%" r="64%">
          <stop offset="0%" stopColor={WHITE_SOFT} stopOpacity="0.85" />
          <stop offset="34%" stopColor={SAGE_SOFT} stopOpacity="0.66" />
          <stop offset="68%" stopColor={SAGE_DEEP} stopOpacity="0.34" />
          <stop offset="100%" stopColor={SAGE_ACCENT} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('formCream')} cx="56%" cy="40%" r="64%">
          <stop offset="0%" stopColor={WHITE_SOFT} stopOpacity="0.88" />
          <stop offset="36%" stopColor={CREAM} stopOpacity="0.66" />
          <stop offset="70%" stopColor={CREAM_WARM} stopOpacity="0.34" />
          <stop offset="100%" stopColor={CREAM_WARM} stopOpacity="0" />
        </radialGradient>

        {/* Even ambient glow. */}
        <radialGradient id={id('ambient')} cx="50%" cy="46%" r="60%">
          <stop offset="0%" stopColor={WHITE_SOFT} stopOpacity="0.62" />
          <stop offset="100%" stopColor={WHITE_SOFT} stopOpacity="0" />
        </radialGradient>

        {/* Luminous vignette — deep eucalyptus rim giving the field crafted
            depth; transparent through the centre so it never muddies the calm. */}
        <radialGradient id={id('vignette')} cx="50%" cy="46%" r="74%">
          <stop offset="0%" stopColor={VIGNETTE} stopOpacity="0" />
          <stop offset="62%" stopColor={VIGNETTE} stopOpacity="0" />
          <stop offset="100%" stopColor={VIGNETTE} stopOpacity="0.85" />
        </radialGradient>

        {/* Soft mote halo — bright core easing to a gentle glow. */}
        <radialGradient id={id('mote')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={WHITE_SOFT} stopOpacity="1" />
          <stop offset="40%" stopColor={WHITE_SOFT} stopOpacity="0.78" />
          <stop offset="100%" stopColor={SAGE_SOFT} stopOpacity="0" />
        </radialGradient>

        {/* Static blurs only — never animated. */}
        <filter id={id('bVeil')} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={id('bBand')} x="-40%" y="-60%" width="180%" height="220%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id={id('bForm')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id={id('bMote')} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {/* ── Restful base field ── */}
      <rect width="400" height="400" fill={`url(#${id('base')})`} />

      {/* ── Soft rounded resting forms in balanced equilibrium (off-centre) ── */}
      {/* Low-left sage form. */}
      <motion.ellipse
        cx={138}
        cy={262}
        rx={118}
        ry={104}
        fill={`url(#${id('formSage')})`}
        filter={`url(#${id('bForm')})`}
        initial={{ opacity: 0, scale: 1, y: 0 }}
        animate={formLeftAnimate}
        transition={isConfirming ? settle(0.6) : loop(9.2)}
        style={{ transformOrigin: '138px 262px' }}
      />
      {/* High-right cream form — counter-poises the sage one. */}
      <motion.ellipse
        cx={272}
        cy={142}
        rx={112}
        ry={100}
        fill={`url(#${id('formCream')})`}
        filter={`url(#${id('bForm')})`}
        initial={{ opacity: 0, scale: 1, y: 0 }}
        animate={formRightAnimate}
        transition={isConfirming ? settle(0.6) : loop(9.8, 0.6)}
        style={{ transformOrigin: '272px 142px' }}
      />

      {/* ── Settling cream veil from above ── */}
      <motion.path
        d={creamFrames[0]}
        fill={`url(#${id('cream')})`}
        filter={`url(#${id('bVeil')})`}
        initial={{ opacity: 0, y: 0 }}
        animate={creamAnimate}
        transition={isConfirming ? settle(0.6) : loop(8.6)}
      />

      {/* ── Rising sage veil from below ── */}
      <motion.path
        d={sageFrames[0]}
        fill={`url(#${id('sage')})`}
        filter={`url(#${id('bVeil')})`}
        initial={{ opacity: 0, y: 0 }}
        animate={sageAnimate}
        transition={isConfirming ? settle(0.6) : loop(9.4, 0.4)}
      />

      {/* ── Calm steady middle band where the veils meet ── */}
      <motion.rect
        x={-20}
        y={188}
        width={440}
        height={36}
        fill={`url(#${id('band')})`}
        filter={`url(#${id('bBand')})`}
        initial={{ opacity: 0, scaleX: 1 }}
        animate={bandAnimate}
        transition={isConfirming ? settle(0.6) : loop(10)}
        style={{ transformOrigin: '200px 206px' }}
      />

      {/* ── Slow even drifting motes — bright soft cores wrapped in a gentle
            halo so they're clearly visible, unhurried, premium ── */}
      {MOTES.map((m) => {
        const moteAnimate = isConfirming
          ? { opacity: m.peak, x: 0, y: 0 }
          : reduceMotion
            ? { opacity: m.peak * 0.8, x: m.dx * 0.5, y: m.dy * 0.5 }
            : {
                opacity: [m.peak * 0.45, m.peak, m.peak * 0.45],
                x: [0, m.dx, 0],
                y: [0, m.dy, 0],
              };
        return (
          <motion.g
            key={`mote-${m.cx}-${m.cy}`}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={moteAnimate}
            transition={isConfirming ? settle(0.6) : loop(m.dur, m.delay)}
          >
            {/* soft halo */}
            <circle
              cx={m.cx}
              cy={m.cy}
              r={m.r * 3.4}
              fill={`url(#${id('mote')})`}
              filter={`url(#${id('bMote')})`}
            />
            {/* bright core */}
            <circle cx={m.cx} cy={m.cy} r={m.r} fill={WHITE_SOFT} />
          </motion.g>
        );
      })}

      {/* ── Soft even ambient glow over all ── */}
      <motion.rect
        width="400"
        height="400"
        fill={`url(#${id('ambient')})`}
        initial={{ opacity: 0 }}
        animate={ambientAnimate}
        transition={isConfirming ? settle(0.6) : loop(8)}
      />

      {/* ── Luminous vignette rim — frames the calm field for crafted depth ── */}
      <motion.rect
        width="400"
        height="400"
        fill={`url(#${id('vignette')})`}
        initial={{ opacity: 0 }}
        animate={vignetteAnimate}
        transition={isConfirming ? settle(0.6) : loop(9)}
      />
    </svg>
  );
}
