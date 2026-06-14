/* ================================================================== */
/*  Q10·B「熱石按摩」— shared contract for the spa scene modules.       */
/*  Tech-lead owned interface so ReclineBody.tsx and Stone.tsx can be   */
/*  built in parallel and assembled by RitualSpaScene.tsx without drift.*/
/*  Coords are in the 400×400 viewBox (visible circle r≈190 @200,200).  */
/*  A draped towel body lies prone on a table; hot stones nestle along  */
/*  the back's ridge. Dawn light from the upper-left. DEPOPULATED — the */
/*  body is a soft towel-draped form with NO face (cf. Sleep's duvet).  */
/* ================================================================== */

export const sn = (v: number) => +v.toFixed(1);

/* Table / towel surface line the body rests on. */
export const TABLE_Y = 322;

/* Palette — warm ivory towel + dark basalt stones + amber spa glow. */
export const SPA = {
  towelHi: '#fbf5ea',
  towelMid: '#efe3cf',
  towelLo: '#d8c7ab',
  head: '#c9b79b', // wrapped head/towel tone (warm greige, never skin)
  accent: '#c9a070', // amber spa warmth
  deep: '#6b6358',
} as const;

/* Reclining figure, prone, seen from the side — the back is LONG and
   nearly FLAT (a real person lying on a table, NOT an arched hump):
   shoulder slightly high → waist dips a touch → buttock a gentle rise →
   thigh tapers to the table. Head rests at the LEFT, turned to the side,
   with a hair BUN on top. ReclineBody draws the torso to BODY_TOP + the
   head + bun; MassageHands press on the upper back (HANDS, below). */
export const HEAD = { cx: 118, cy: 286, r: 27 } as const; // round head, risen proud of the flat back
export const BUN = { cx: 103, cy: 276, r: 12 } as const; // hair bun, upper-left of the head

export const BODY_TOP =
  'M150 302 C158 294 170 288 190 288 ' +
  'C220 289 236 296 262 295 ' +
  'C286 294 304 289 320 292 ' +
  'C334 294 342 304 348 314';

/* Masseuse hands pressing on the upper back. (x,y) = palm-centre landing on
   the back; the hand reaches in from above. phase desyncs the press. */
export type HandCfg = { id: string; x: number; y: number; rot: number; phase: number };
export const HANDS: HandCfg[] = [
  { id: 'h1', x: 202, y: 286, rot: -6, phase: 0 },
  { id: 'h2', x: 236, y: 285, rot: 9, phase: 0.5 },
];

export type MassageHandsProps = {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
};

/* Hot stones along the back ridge (decreasing toward the ends), each a
   flattened basalt pebble resting on the towel. tone = index into TONES. */
export type StoneCfg = {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  tone: 0 | 1 | 2;
  /* phase offsets each stone's warm-glow pulse so they shimmer out of sync */
  phase: number;
};

export const STONE_TONES: [string, string, string][] = [
  ['#988d81', '#776c61', '#564e45'],
  ['#8e8378', '#6d6359', '#4d453d'],
  ['#847a70', '#655c53', '#453e36'],
];

/* Nestled in a line along the FLAT back, dipping a touch at the waist. */
export const STONES: StoneCfg[] = [
  { id: 's0', cx: 174, cy: 282, rx: 13, ry: 8, tone: 2, phase: 0.55 },
  { id: 's1', cx: 200, cy: 285, rx: 15, ry: 9.5, tone: 0, phase: 0.0 },
  { id: 's2', cx: 228, cy: 289, rx: 15.5, ry: 10, tone: 1, phase: 0.3 },
  { id: 's3', cx: 256, cy: 288, rx: 14, ry: 9, tone: 0, phase: 0.75 },
  { id: 's4', cx: 284, cy: 283, rx: 12, ry: 7.5, tone: 2, phase: 0.45 },
];

export type StoneProps = {
  uid: string;
  cfg: StoneCfg;
  isConfirming: boolean;
  reduceMotion: boolean;
};

export type ReclineBodyProps = {
  uid: string;
  reduceMotion: boolean;
};
