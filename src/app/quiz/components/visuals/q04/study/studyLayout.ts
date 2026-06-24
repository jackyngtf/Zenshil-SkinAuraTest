/* ================================================================== */
/*  Q4·C 時間 — "cyan-dusk planning desk" shared LAYOUT + PALETTE.      */
/*  A calm focused dusk study: a cyan wall lit softly from a top-left   */
/*  window, a warm-wood desk holding a centred warm-wood HOURGLASS      */
/*  (hero, sand-flow = time passing) + analog clock + book stack +      */
/*  potted plant, an open notebook+pen in the foreground (the planning  */
/*  lens). The warm-wood hourglass + desk is the ONE warm accent in a   */
/*  cool cyan room. All four builder layers (StudyBackdrop /            */
/*  HourglassHero / DeskStillLife / StudyAtmosphere) + the assembler    */
/*  align to THESE coordinates.                                         */
/*  Parent svg: viewBox "0 0 400 320", preserveAspectRatio slice.       */
/* ================================================================== */

export { sn } from '../q04Shared';

/* The wall / desk seam. Wall fills 0 → DESK_Y; desktop DESK_Y → DESK_FRONT_Y
   (a slightly 3/4 top face band), front dropping to 320.
   NOTE: the whole room is shifted UP by 20px vs the first draft so the
   hourglass focal (the sand-flow neck) lands at y≈206 — inside the orb's
   safe mid-disc zone (y∈[120,210]), matching siblings A (moundCy=214) / D
   (pivot=172). Without this the hero sat at y≈226 and was faded/clipped at
   the orb's lower edge. */
export const DESK_Y = 194;
export const DESK_FRONT_Y = 230;
/* The front edge of the desk TOP face — where the horizontal top surface
   meets the vertical front face. The top face is a slim receding band
   DESK_Y → DESK_TOP_FRONT_Y; the front face drops DESK_TOP_FRONT_Y →
   DESK_FRONT_Y. Kept INDEPENDENT of DESK_FRONT_Y so the top stays a thin
   band (tying it to DESK_FRONT_Y flattens the whole desk into one slab and
   the 3D form is lost). */
export const DESK_TOP_FRONT_Y = DESK_Y + 18; // 212

/* The HOURGLASS hero, dead-centre on x=200 (matches B/A hero centring).
   Drawn in-place at these coords (like A's BedHero / D's ChestPress) — NOT
   translated+scaled. The hero d-morph targets are the sand fill levels.
   Neck (focal sand-flow) at y≈206 → safe zone. */
export const HOURGLASS = {
  cx: 200, // vertical centreline
  capTopY: 168, // wood top cap (top of glass assembly)
  topBulbCy: 180, // centre of the TOP (emptying) bulb
  topBulbTopY: 172,
  topBulbBotY: 198,
  neckY: 206, // narrow waist where sand streams through
  botBulbCy: 224, // centre of the BOTTOM (filling) bulb
  botBulbTopY: 212,
  botBulbBotY: 238,
  baseY: 240, // wood base feet (sits ON DESK_Y area, baseY is glass base)
  bulbHalfW: 20, // half-width of each bulb at its widest
  neckHalfW: 3.2, // half-width of the narrow neck
  pillarLX: 178, // left wood pillar x
  pillarRX: 222, // right wood pillar x
  pillarW: 4, // pillar thickness
} as const;

/* The ANALOG CLOCK — supporting, left-of-centre on the desk. Round light
   face, dot markers at 12/3/6/9, hour+minute hands + thin teal second hand.
   Hands sweep (transform rotate). */
export const CLOCK = {
  cx: 150,
  cy: 212, // face centre (sits on the desk, base ~DESK_Y)
  r: 18, // outer ring radius
  faceR: 16, // face radius inside ring
  hubR: 1.8, // centre pivot dot
  hourLen: 9, // hour hand length from centre
  minLen: 13, // minute hand length
  secLen: 14, // second hand length (thin, accent teal)
} as const;

/* BOOK STACK — far right on the desk. 3 slim books, slight offset. */
export const BOOKS = {
  cx: 268,
  baseY: 228, // bottom book sits with base near DESK_FRONT area
  bookH: 6, // each book slab thickness
  bookW: 34,
  offsetY: 7, // vertical step between stacked books
} as const;

/* POTTED PLANT — far left on the desk (lived-in touch, mirrors A's PLANT). */
export const PLANT = { potX: 86, potY: 226, potW: 18, potH: 12 } as const;
export const PLANT_FRONDS = [
  { a: -22, len: 22, curve: 7 },
  { a: -4, len: 28, curve: 10 },
  { a: 16, len: 20, curve: 6 },
] as const;

/* OPEN NOTEBOOK + PEN — FOREGROUND centre, the planning-desk lens. Sits
   forward on the desk front edge (overlaps DESK_FRONT_Y) so it grounds the
   foreground. Slightly 3/4-open, lying flat-forward. */
export const NOTEBOOK = {
  cx: 205,
  cy: 252,
  halfW: 30,
  halfH: 9,
  spineX: 205, // spiral binding x (centre crease)
} as const;
export const PEN = { x1: 214, y1: 248, x2: 236, y2: 256 } as const;

/* WINDOW LIGHT — off-frame top-left: only a soft cool-cyan wash pooling on
   the wall upper-left (no hard window rectangle, keeps the disc clean). */
export const WINDOW_WASH = { cx: 96, cy: 78, rx: 96, ry: 70 } as const;
/* A faint angled light shaft raking from upper-left down across wall+desk.
   Desk-end points track the raised desk seam (DESK_Y=194). */
export const LIGHT_SHAFT = 'M40 18 L150 6 L300 194 L210 230 Z' as const;

/* Deterministic cool dust motes drifting upward (cyan). Mirrors A's MOTES.
   Y shifted -20 to track the raised desk zone. */
export const MOTES = [
  { cx: 96, cy: 190, r: 3.4, dx: 5, dy: -28, dur: 12.0, delay: 0.0, peak: 0.24 },
  { cx: 150, cy: 148, r: 2.6, dx: -4, dy: -24, dur: 11.4, delay: 1.6, peak: 0.20 },
  { cx: 250, cy: 164, r: 3.8, dx: -6, dy: -30, dur: 13.2, delay: 0.9, peak: 0.26 },
  { cx: 308, cy: 180, r: 2.8, dx: 4, dy: -22, dur: 12.8, delay: 2.6, peak: 0.18 },
  { cx: 200, cy: 130, r: 2.4, dx: 3, dy: -20, dur: 11.8, delay: 3.4, peak: 0.16 },
  { cx: 128, cy: 206, r: 3.2, dx: -5, dy: -26, dur: 13.6, delay: 4.2, peak: 0.20 },
] as const;

/* Sand grains that CATCH LIGHT on confirm (3–4 tiny warm dots near the neck).
   Const, no Math.random. Y tracks the raised neck (y≈206). */
export const SAND_GRAINS = [
  { x: 199, y: 210, r: 0.9, delay: 0.0 },
  { x: 201, y: 214, r: 0.7, delay: 0.08 },
  { x: 200, y: 218, r: 0.8, delay: 0.16 },
  { x: 198, y: 222, r: 0.6, delay: 0.24 },
] as const;

/* Cyan-dusk room (keeps C's preventive/cyan identity so A藍 / B紫 / C青 / D金
   stay distinct) + ONE warm-wood accent (desk + hourglass frame + sand +
   plant pot + pen = the "time/life" warmth against the cool room).
   Aura identity from ResourceMeterVisual C: aura #a9dced, accent #6faabd,
   accentSoft #edfaff. */
export const STUDY = {
  /* walls / dusk sky — deep cool cyan-slate */
  skyTop: '#1d2f3d',
  wallTop: '#26495a',
  wallLo: '#17303d',
  wallGlow: '#5e97a8', // cool window-lit cyan wash
  /* floor / desk base */
  floorDeep: '#143039',
  floorFront: '#1b3b44',
  /* glass + cyan haze */
  glass: '#cfeefb',
  glassEdge: '#9fcfe0',
  glassShade: '#6faabd', // accent — neck tint + glass shade
  /* THE ONE WARM ACCENT — wood + sand */
  deskTop: '#b58a5e',
  deskTopHi: '#d2a878',
  deskFront: '#8a6240',
  deskEdge: '#caa074',
  woodFrame: '#9a6e48',
  woodFrameHi: '#c79a6e',
  woodFrameDark: '#6e4d33',
  sandPale: '#eaf7fb',
  sandMid: '#f3cf94', // warm pale amber (ties to wood)
  sandShade: '#c68f4e',
  /* clock */
  clockFace: '#edfaff', // accentSoft
  clockFaceShade: '#cfe6ef',
  clockRing: '#2f5a68',
  clockMarker: '#2f5a68',
  clockHand: '#15303a',
  clockSec: '#6faabd', // accent — second hand
  clockHub: '#2f5a68',
  /* books (cool so they don't compete with the wood accent) */
  bookA: '#6faabd',
  bookB: '#4f7e8c',
  bookC: '#8fbfd0',
  bookSpine: '#2e4250',
  /* plant */
  plantLeaf: '#7fae9a',
  plantPot: '#8a6a48', // warm wood pot (part of the warm island)
  /* notebook */
  paper: '#eefaff',
  rule: '#bcdde4',
  pen: '#a9784f', // warm pen (part of the warm island)
  /* cyan confirm glow bloom */
  glowBloom: '#a9dced', // aura
  glowSoft: '#edfaff', // accentSoft
  /* atmosphere */
  haze: '#bfe6ef',
  motes: '#a9dced',
  vig: '#0e2230',
} as const;
