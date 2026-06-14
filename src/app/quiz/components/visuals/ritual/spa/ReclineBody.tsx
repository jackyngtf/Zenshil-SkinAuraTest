'use client';

import { BODY_TOP, HEAD, TABLE_Y, SPA, sn } from './spaShared';
import type { ReclineBodyProps } from './spaShared';

/* ================================================================== */
/*  Q10·B「熱石按摩」— ReclineBody (Agent A · Body · v4)                */
/*  A calm towel-draped form lying PRONE on a massage table, seen from */
/*  the side. The back is LONG and nearly FLAT (a real person on a     */
/*  table, NOT an arched hump); the head rests at the LEFT on a small  */
/*  folded-towel headrest. Reference idiom: Sleep's duvet — a soft     */
/*  draped mass, DEPOPULATED, no person-detail.                        */
/*                                                                     */
/*  v3 added a hair BUN + a closed-eye lash hint + hand-ish strokes.   */
/*  The client REJECTED all of those. v4 strips them out entirely:     */
/*   • NO bun (BUN is no longer imported), NO face, NO eyes/lashes,    */
/*     NO mouth, NO hands. Just a PLAIN smooth rounded head.            */
/*   • The back traces the FLAT BODY_TOP verbatim (shoulder slightly   */
/*     high ~y288 → waist dips ~y295 → gentle buttock → thigh to the   */
/*     table at ~y314). The ridge stays low & long — no arch/hump.      */
/*   • The silhouette welds head → neck → shoulder → flat back → hip → */
/*     thigh into ONE continuous draped mass (never a floating ball).   */
/*                                                                     */
/*  Style: a confident thin OUTLINE stroke defines the figure over a   */
/*  soft towel fill (SPA.towelHi→Mid→Lo, light upper-left). The TOP    */
/*  EDGE is the contract path BODY_TOP — the hot stones nestle onto    */
/*  that exact ridge (~x174–284, y282–289), so the spine line is left  */
/*  CLEAN: no folds/highlights fight the stones there. Output is a     */
/*  single STATIC <g>; the parent owns the breathing motion.           */
/* ================================================================== */

export default function ReclineBody({ uid, reduceMotion }: ReclineBodyProps) {
  void reduceMotion; // body is static; parent owns the breath loop
  const id = (name: string) => `q10x-spa-body-${name}-${uid}`;

  const { cx: hx, cy: hy, r: hr } = HEAD;

  /* ── Closed silhouette ──────────────────────────────────────────
     Trace BODY_TOP (neck/shoulder at (150,302) → long flat back →
     buttock → thigh ending at (348,314)), drop to the table at the
     right, run back ALONG the table past the head's footprint to x86,
     then sweep UP and AROUND the resting head and back to the neck —
     welding head + neck + flat back + hip + thigh into one drape. */
  const bodyFill =
    `${BODY_TOP} ` +
    `L${sn(348)} ${sn(TABLE_Y)} ` + // thigh meets the table at the right
    `L${sn(140)} ${sn(TABLE_Y)} ` + //  table base back to just under the neck
    `C${sn(142)} ${sn(TABLE_Y - 5)} ${sn(146)} ${sn(308)} ${sn(150)} ${sn(302)} ` + // up the front of the neck to the shoulder
    `Z`;
  /* The body closes at the NECK only — it does NOT sweep over the head, so
     the full round head dome stays exposed (the client wanted a round head,
     not a flattened one). Head + neck weld where the head's lower-right
     overlaps this neck and the headrest fills underneath. */

  /* Landmarks read off the FLAT BODY_TOP (for shading & creases):
       neck/shoulder ≈ (150,302) · shoulder rise ≈ (190,288)
       waist dip     ≈ (255,295) · buttock rise  ≈ (305,290)
       thigh→table   ≈ (348,314).  Ridge is long & low, never a hump. */

  return (
    <g aria-hidden="true">
      <defs>
        {/* Towel body — ivory highlight biased to the upper-left light,
            deepening to stone at the lower-right. (Q7 pearl: base ramp.) */}
        <linearGradient id={id('towel')} gradientUnits="userSpaceOnUse" x1="150" y1="280" x2="330" y2="324">
          <stop offset="0%" stopColor={SPA.towelHi} />
          <stop offset="46%" stopColor={SPA.towelMid} />
          <stop offset="100%" stopColor={SPA.towelLo} />
        </linearGradient>
        {/* Resting head — a warm greige (never skin), lit from upper-left,
            tone-matched to the towel family so it reads as the same drape. */}
        <radialGradient id={id('head')} gradientUnits="userSpaceOnUse" cx={hx - 9} cy={hy - 10} r={hr * 1.6}>
          <stop offset="0%" stopColor={SPA.towelMid} />
          <stop offset="54%" stopColor={SPA.head} />
          <stop offset="100%" stopColor="#b3a288" />
        </radialGradient>
        {/* Folded-towel headrest under the head — its own soft ramp. */}
        <linearGradient id={id('rest')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={SPA.towelHi} />
          <stop offset="100%" stopColor={SPA.towelLo} />
        </linearGradient>
        {/* Sheen running along the lit flank — used BELOW the stone band. */}
        <linearGradient id={id('sheen')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={SPA.towelHi} stopOpacity="0" />
          <stop offset="50%" stopColor="#fffdf6" stopOpacity="0.9" />
          <stop offset="100%" stopColor={SPA.towelHi} stopOpacity="0" />
        </linearGradient>
        {/* Blur kit — each stdDeviation defined exactly once. */}
        <filter id={id('b3')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={id('b6')} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={id('b10')} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        {/* Clip surface detail to the silhouette so highlights, shadow and
            creases stay welded to the form (Q7 idiom). The head joins the
            clip region so head-side shading welds to the same drape. */}
        <clipPath id={id('clip')}>
          <path d={bodyFill} />
          <circle cx={hx} cy={hy} r={hr} />
        </clipPath>
      </defs>

      {/* ── 1 · Cast shadow on the table — soft, blurred, biased lower-right
             (away from the upper-left light), grounding the whole body. ── */}
      <ellipse
        cx={250}
        cy={TABLE_Y + 13}
        rx={150}
        ry={14}
        fill={SPA.deep}
        opacity={0.22}
        filter={`url(#${id('b10')})`}
      />

      {/* ── 2 · Folded-towel headrest tucked under the head at the left —
             a low rounded pad the head settles into; sits a touch wider
             than the head so the head reads cradled and supported. ── */}
      <path
        d={`M${sn(hx - 34)} ${sn(TABLE_Y)} C${sn(hx - 34)} ${sn(hy + 6)} ${sn(hx - 20)} ${sn(hy + 1)} ${sn(hx - 2)} ${sn(hy + 1)} C${sn(hx + 20)} ${sn(hy + 1)} ${sn(hx + 34)} ${sn(hy + 8)} ${sn(hx + 34)} ${sn(TABLE_Y)} Z`}
        fill={`url(#${id('rest')})`}
      />
      {/* One pressed fold across the headrest pad */}
      <path
        d={`M${sn(hx - 26)} ${sn(TABLE_Y - 4)} C${sn(hx - 12)} ${sn(hy + 5)} ${sn(hx + 12)} ${sn(hy + 5)} ${sn(hx + 26)} ${sn(TABLE_Y - 4)}`}
        fill="none"
        stroke={SPA.deep}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.16}
        filter={`url(#${id('b3')})`}
      />

      {/* ── 3 · Contact shadow where the head meets the headrest (lower-right) ── */}
      <ellipse
        cx={hx + 4}
        cy={hy + hr - 5}
        rx={hr * 0.78}
        ry={hr * 0.4}
        fill={SPA.deep}
        opacity={0.13}
        filter={`url(#${id('b6')})`}
      />

      {/* ── 4 · The HEAD — a PLAIN smooth ROUND form, risen proud of the flat
             back and resting in the headrest. Drawn before the body so the
             neck overlaps its lower-right and welds them. NO bun/face/eyes.
             A thin outline matches the body's line-art edge. ── */}
      <circle cx={hx} cy={hy} r={hr} fill={`url(#${id('head')})`} />
      <circle
        cx={hx}
        cy={hy}
        r={hr}
        fill="none"
        stroke={SPA.deep}
        strokeWidth={1.6}
        opacity={0.38}
      />

      {/* ── 5 · The body — single towel-draped silhouette, base gradient,
             drawn OVER the head's right flank so head + back read continuous.
             This is the long FLAT form the stones nestle onto. ── */}
      <path d={bodyFill} fill={`url(#${id('towel')})`} />

      {/* ── 6 · Confident thin OUTLINE stroke defining the whole figure —
             the refined line-art silhouette. ── */}
      <path
        d={bodyFill}
        fill="none"
        stroke={SPA.deep}
        strokeWidth={1.6}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.4}
      />

      {/* ── 7 · Surface shading + folds, clipped to head + silhouette ── */}
      <g clipPath={`url(#${id('clip')})`}>
        {/* 7a · Edge darkening — soft shadow pooling along the lower / right
               flank where the towel turns away from the upper-left light. */}
        <path
          d={bodyFill}
          fill="none"
          stroke={SPA.deep}
          strokeWidth={20}
          opacity={0.15}
          filter={`url(#${id('b10')})`}
        />
        {/* Soft shadow settling into the waist dip (mid-back, ~y300) */}
        <ellipse
          cx={250}
          cy={300}
          rx={46}
          ry={16}
          fill={SPA.deep}
          opacity={0.14}
          filter={`url(#${id('b6')})`}
        />
        {/* Pool under the buttock / thigh overhang toward the table */}
        <ellipse
          cx={320}
          cy={312}
          rx={42}
          ry={16}
          fill={SPA.deep}
          opacity={0.14}
          filter={`url(#${id('b6')})`}
        />
        {/* Head's own shadow side (lower-right, away from the light) */}
        <ellipse
          cx={hx + 9}
          cy={hy + 7}
          rx={hr * 0.7}
          ry={hr * 0.6}
          fill={SPA.deep}
          opacity={0.12}
          filter={`url(#${id('b6')})`}
        />

        {/* 7b · Long soft highlight riding the lit back — kept LOW (~y300),
               below the stone band (y282–289) so it never fights the stones.
               A long low blurred ellipse (NOT a domed crest), upper-left lit. */}
        <ellipse
          cx={240}
          cy={301}
          rx={88}
          ry={8}
          fill={SPA.towelHi}
          opacity={0.5}
          filter={`url(#${id('b6')})`}
          transform="rotate(-2 240 301)"
        />
        {/* A crisper sheen sliver below the ridge (the lit lower back line) */}
        <path
          d="M170 305 C212 299 280 299 326 307"
          fill="none"
          stroke={`url(#${id('sheen')})`}
          strokeWidth={3.5}
          strokeLinecap="round"
          opacity={0.66}
          filter={`url(#${id('b3')})`}
        />
        {/* Shoulder catch-light on the rise just behind the neck (off the
            stone band, kept toward the shoulder's near face) */}
        <ellipse
          cx={176}
          cy={300}
          rx={18}
          ry={7}
          fill={SPA.towelHi}
          opacity={0.4}
          filter={`url(#${id('b3')})`}
          transform="rotate(-8 176 300)"
        />
        {/* Head highlight — upper-left, where the dawn light lands */}
        <ellipse
          cx={hx - 9}
          cy={hy - 11}
          rx={9}
          ry={6}
          fill={SPA.towelHi}
          opacity={0.4}
          filter={`url(#${id('b3')})`}
          transform={`rotate(-24 ${hx - 9} ${hy - 11})`}
        />

        {/* 7c · Fabric folds — gentle creases following the flat drape: the
               shoulder fall, a long spine hollow kept BELOW the stone ridge,
               the hip break, and the hem settling onto the table. ALL stay
               clear of the stone band (y282–289) so the spine reads clean. */}
        {/* Shoulder fold (shadow) dropping off the rise toward the table */}
        <path
          d="M172 300 C178 308 180 315 178 322"
          fill="none"
          stroke={SPA.deep}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.13}
          filter={`url(#${id('b3')})`}
        />
        {/* Long spine hollow running the back's length, well below the ridge */}
        <path
          d="M186 304 C228 300 280 302 320 308"
          fill="none"
          stroke={SPA.deep}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.12}
          filter={`url(#${id('b3')})`}
        />
        {/* Its highlight twin, a couple px above — gives the fold a lit lip */}
        <path
          d="M186 301 C228 297 280 299 320 305"
          fill="none"
          stroke={SPA.towelHi}
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.4}
          filter={`url(#${id('b3')})`}
        />
        {/* Hip break folding down toward the table */}
        <path
          d="M306 298 C314 307 320 315 322 322"
          fill="none"
          stroke={SPA.deep}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.13}
          filter={`url(#${id('b3')})`}
        />
        {/* Lower towel hem settling onto the table near the feet */}
        <path
          d="M324 309 C332 313 340 317 346 322"
          fill="none"
          stroke={SPA.deep}
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.11}
          filter={`url(#${id('b3')})`}
        />
      </g>
    </g>
  );
}
