/* ================================================================== */
/*  Q4·A 睡眠 — "moonlit serene bedroom" shared LAYOUT + PALETTE.       */
/*  A cool, calm NIGHT bedroom: a bed (hero) under a moonlit window,    */
/*  a nightstand with one warm lamp (the sole warm accent). All four    */
/*  builder layers (BedroomBackdrop / BedHero / Nightstand /             */
/*  BedroomAtmosphere) + the assembler align to THESE coordinates.       */
/*  Parent svg: viewBox "0 0 400 320", preserveAspectRatio slice.       */
/* ================================================================== */

export const sn = (v: number) => +v.toFixed(1);

/* The back-wall / floor seam. Wall fills 0 → FLOOR_Y; floor FLOOR_Y → 320.
   NOTE: the whole scene is seated ~14px HIGH so the breathing mound hero
   lands at y≈200 — squarely inside the safe mid-disc zone (y∈[120,210])
   so it never clips or fades at the orb edge. Every y below is shifted by
   the same −14 so the bed/nightstand/lamp/window/rug stack stays aligned. */
export const FLOOR_Y = 272;

/* The BED (hero), centred on x=200. Drawn as a soft 3/4 trapezoid:
   narrower head edge receding up, wider foot edge in front. All values
   are viewBox coords. */
export const BED = {
  cx: 200,
  headTopY: 174, // top of headboard
  headFootY: 182, // where headboard meets mattress (pillow line)
  matTopY: 182, // mattress top (head edge) y
  matFootY: 230, // mattress front (foot edge) y
  headHalfW: 50, // half-width at the head (narrower, receding)
  footHalfW: 62, // half-width at the foot (wider, front) → 3/4 angle
  moundCy: 200, // centre of the breathing chest/duvet mound (safe zone)
} as const;

/* The breathing mound on the bed — the hero MOTION target. Centred at
   (BED.cx, BED.moundCy). Path-d keyframes live in BedHero (identical
   command structure, like CandleHero's FLAME_* constants). */
export const MOUND = { cx: BED.cx, cy: BED.moundCy };

/* The WINDOW behind the headboard (upper-centre) holding the night sky +
   moon + stars. Centred on x=200 so moon+bed stack on the centerline. */
export const WINDOW = {
  x: 158,
  y: 26,
  w: 84,
  h: 72, // frame box
  mullionX: 200, // vertical crossbar
  crossbarY: 62, // horizontal crossbar
  sillY: 98, // thin inner sill ledge
} as const;

/* The MOON — a soft crescent inside the upper pane (night-identity anchor). */
export const MOON = { cx: 184, cy: 52, r: 9, haloR: 30 } as const;

/* Deterministic stars inside the window pane (cool dots, twinkle). Placed
   AWAY from the moon disc so both read. Const arrays only — no Math.random. */
export const STARS = [
  { x: 212, y: 40, r: 1.0, dur: 4.6, delay: 0.0, peak: 0.9 },
  { x: 224, y: 56, r: 0.8, dur: 5.4, delay: 1.1, peak: 0.7 },
  { x: 168, y: 66, r: 0.9, dur: 5.0, delay: 0.6, peak: 0.8 },
  { x: 206, y: 78, r: 0.7, dur: 6.2, delay: 2.0, peak: 0.6 },
  { x: 178, y: 42, r: 0.7, dur: 4.8, delay: 1.7, peak: 0.65 },
] as const;

/* The single framed picture on the wall, LEFT of the bed. LANDSCAPE
   orientation (wider than tall) with a clean mini-nightscape inside — a
   portrait frame read as a "pad" at this scale; landscape reads as art. */
export const PICTURE = { x: 58, y: 128, w: 52, h: 34 } as const;

/* The NIGHTSTAND (small furniture) to the RIGHT of the bed. Top aligned
   to the mattress top so the lamp+book+clock sit at bed height. */
export const NIGHTSTAND = {
  x: 286,
  y: 200,
  w: 46,
  h: 34, // box: top face band y, front drops to y+h
  topY: 200,
  baseY: 234,
} as const;

/* The bedside LAMP on the nightstand — THE ONE WARM ACCENT. */
export const LAMP = {
  baseX: 309, // lamp centre x (on the nightstand)
  baseY: 200, // lamp foot on the nightstand top
  shadeApexY: 182, // top of the trumpet shade
  shadeMouthY: 192, // bottom (mouth) of the shade
} as const;

/* Plant frond leaning in from bottom-left (lived-in touch). */
export const PLANT = { potX: 46, potY: 248 } as const;
export const PLANT_FRONDS = [
  { a: -18, len: 34, curve: 10 },
  { a: 6, len: 40, curve: 14 },
  { a: 26, len: 30, curve: 8 },
] as const;

/* The oval rug forward of / under the bed foot, grounding the scene. */
export const RUG = { cx: 200, cy: 258, rx: 132, ry: 20 } as const;

/* Cool dust motes drifting up in moonlit air (deterministic). Mirrors B's
   MOTES but recoloured cool + sparser. */
export const MOTES = [
  { cx: 96, cy: 182, r: 4.2, dx: 6, dy: -30, dur: 12.0, delay: 0.0, peak: 0.26 },
  { cx: 150, cy: 136, r: 3.0, dx: -5, dy: -26, dur: 11.4, delay: 1.6, peak: 0.22 },
  { cx: 250, cy: 154, r: 4.6, dx: -7, dy: -32, dur: 13.2, delay: 0.9, peak: 0.28 },
  { cx: 312, cy: 174, r: 3.4, dx: 5, dy: -24, dur: 12.8, delay: 2.6, peak: 0.2 },
  { cx: 200, cy: 114, r: 2.8, dx: 4, dy: -22, dur: 11.8, delay: 3.4, peak: 0.18 },
  { cx: 132, cy: 210, r: 3.8, dx: -6, dy: -28, dur: 13.6, delay: 4.2, peak: 0.22 },
] as const;

/* Cool-blue late_night night-bedroom palette. Cool room + ONE warm island
   (the bedside lamp) — the inverse of B's warm-room/cool-accent balance.
   Mirrors ResourceMeterVisual visualStates.A: aura #b8c3ed, accent #7b86b2,
   accentSoft #eef0ff. */
export const BEDROOM = {
  /* walls / sky — deep cool indigo night */
  skyTop: '#1c2545',
  skyLo: '#10162e',
  wallTop: '#2a3658',
  wallLo: '#1a2240',
  wallGlow: '#46527a', // cool moonlit wall wash
  /* floor + rug */
  floorDeep: '#11162b',
  floorFront: '#1a2138',
  rug: '#3a4470',
  rugEdge: '#4a5490',
  /* window + moon + stars */
  frame: '#29344f',
  paneSkyTop: '#2a3658',
  paneSkyLo: '#10162e',
  paneShadow: '#7b86b2',
  sill: '#39476a',
  moon: '#eef0ff',
  moonHalo: '#b8c3ed',
  star: '#eef0ff',
  /* bed */
  headboard: '#2a3358',
  headboardHi: '#39446e',
  mattressBase: '#c4cef0', // cool moonlit ivory-blue
  mattressHi: '#eef0ff', // accentSoft, lit edge
  duvet: '#bcc8ee',
  duvetShade: '#9aa6d4',
  duvetFold: '#7b86b2', // accent
  pillow: '#dfe4ff',
  pillowShade: '#aeb9e0',
  pillowHi: '#eef0ff',
  bedRim: '#b8c3ed', // cool rim-light on lit edges (low opacity)
  /* nightstand + book + clock + plant + picture */
  standTop: '#3a4258',
  standFront: '#262d44',
  book: '#efe6dc',
  bookInk: '#6a6055',
  clock: '#1c2440',
  plant: '#6f8a86',
  plantPot: '#3a4258',
  picFrame: '#1c2440',
  picMat: '#dfe6f8',
  picAccent: '#7b86b2',
  /* THE ONE WARM ACCENT — bedside lamp (life/contrast) */
  lampShade: '#ffd79a',
  lampGlow: '#ffc878',
  lampSoft: '#ffe8c2',
  warmPool: '#ffdca0',
  /* atmosphere */
  moonPool: '#b8c3ed', // moonlight pool on floor (low opacity)
  haze: '#d9e6fb', // faint overall cool haze
  motes: '#b8c3ed',
  vig: '#10162e', // corner vignette (deep night)
} as const;
