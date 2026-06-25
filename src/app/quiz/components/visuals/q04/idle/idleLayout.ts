/* ================================================================== */
/*  Q4 · idle 「Soft Room, Held Light」微光空房 — shared LAYOUT + PALETTE. */
/*                                                                     */
/*  The NEUTRAL "before you choose" scene: a soft-focus empty interior  */
/*  in the SAME orb-clip room language as A–D. One upper-centre window  */
/*  (the bedroom WINDOW slot) holds a frosted pane with a warm-neutral  */
/*  light-BLOOM that breathes (the reincarnated idle orb, now diegetic) */
/*  + two sheer CURTAIN folds (the reincarnated drifting meter-lines).  */
/*  A bare wall washes into an empty floor with a wide light-POOL (the  */
/*  secondary breathing mass that holds the centre-of-gravity low so    */
/*  the focal weight doesn't jump on cross-fade into A–D). Resolutely   */
/*  warm-neutral taupe/cream — NO bed, candle, hourglass or gym gear.   */
/*  Parent svg: viewBox "0 0 400 320", preserveAspectRatio slice.       */
/* ================================================================== */

export { sn } from '../q04Shared';

/* Wall fills 0 → FLOOR_Y; floor FLOOR_Y → 320. Same seam as the siblings. */
export const FLOOR_Y = 272;

/* The single upper-centre WINDOW — reuses the bedroom slot geometry verbatim
   so idle stacks on the centerline exactly like A's moonlit window. */
export const WINDOW = {
  x: 158,
  y: 26,
  w: 84,
  h: 72, // frame box
  mullionX: 200, // vertical crossbar
  crossbarY: 62, // horizontal crossbar
  sillY: 98, // thin inner sill ledge
} as const;

/* The reincarnated idle orb — a soft warm-neutral light-BLOOM seated ON the
   frosted pane (centre of the window box). The HERO motion target. */
export const BLOOM = { cx: 200, cy: 62, haloR: 40 } as const;

/* Two sheer CURTAIN folds drifting down the window sides — the reincarnated
   three drifting meter-lines, rotated into soft vertical fabric. Each sways
   x±4 on an offset phase. Kept few + soft so they never read as bars. */
export const CURTAINS = {
  topY: 30,
  botY: 96,
  w: 13,
  leftX: 170, // centre x of the left fold
  rightX: 230, // centre x of the right fold
} as const;

/* The wide floor LIGHT-POOL where the window light lands — the SECONDARY
   breathing mass. Seated a touch HIGHER than the bedroom's (cy254 → cy246)
   so it carries focal weight nearer A–D's hero zone (y≈200), killing the
   centre-of-gravity jump from the high window bloom. */
export const POOL = { cx: 200, cy: 246, rx: 140, ry: 54 } as const;

/* The breathing wall-wash behind the window (mirrors BedroomBackdrop). */
export const WALL_WASH = { cx: 200, cy: 72, rx: 120, ry: 78 } as const;

/* Warm-neutral dust motes drifting up in soft daylight (deterministic — no
   Math.random). Cloned from the bedroom MOTES shape, recoloured neutral,
   with the spec's staggered per-mote delays. */
export const MOTES = [
  { cx: 96, cy: 182, r: 4.2, dx: 6, dy: -30, dur: 12.0, delay: 0.0, peak: 0.24 },
  { cx: 150, cy: 136, r: 3.0, dx: -5, dy: -26, dur: 11.4, delay: 1.6, peak: 0.2 },
  { cx: 250, cy: 154, r: 4.6, dx: -7, dy: -32, dur: 13.2, delay: 0.9, peak: 0.26 },
  { cx: 312, cy: 174, r: 3.4, dx: 5, dy: -24, dur: 12.8, delay: 2.6, peak: 0.18 },
  { cx: 200, cy: 114, r: 2.8, dx: 4, dy: -22, dur: 11.8, delay: 3.4, peak: 0.16 },
  { cx: 132, cy: 210, r: 3.8, dx: -6, dy: -28, dur: 13.6, delay: 4.2, peak: 0.2 },
] as const;

/* Warm-neutral idle palette — anchored to ResourceMeterVisual.visualStates.idle
   (aura #e9ded4, auraSoft #dbe9e6, accent #b8a895, accentSoft #efe8df) plus
   derived tones. Deliberately ZERO indigo/rose/cyan/amber so it borrows no
   branch's signature and sits chromatically between all four. auraSoft sage
   is confined to the bloom RIM + a trace of haze so it never tips toward C. */
export const IDLE = {
  /* walls — warm greige washing to a deeper taupe low */
  wallTop: '#e9ded4', // aura
  wallLo: '#d8cabb',
  wallGlow: '#efe8df', // accentSoft, warm wall wash
  /* floor */
  floorFront: '#cbbdad',
  floorSeam: '#b8a895', // accent, lit seam strip
  /* window — frame + FROSTED pane + sill (all CRISP except the pane) */
  frame: '#cdbfaa',
  paneTop: '#efe8df', // frosted cream, flat-ish (no disc / hotspot)
  paneLo: '#e3d8cb',
  paneBevel: '#b8a895',
  sill: '#c0b09a',
  /* the reincarnated orb — warm-neutral light bloom */
  bloomCore: '#ffffff',
  bloomMid: '#efe8df', // accentSoft
  bloomRim: '#dbe9e6', // auraSoft sage — RIM ONLY
  /* sheer curtains */
  curtain: '#efe8df',
  /* atmosphere */
  haze: '#efe8df',
  pool: '#efe8df',
  motes: '#b8a895',
  vig: '#b8a895', // warm taupe corner vignette (low opacity)
} as const;
