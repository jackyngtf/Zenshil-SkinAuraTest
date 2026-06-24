/* ================================================================== */
/*  Q4·B 放鬆 — "cosy night room" shared LAYOUT + PALETTE contract.     */
/*  A warm, dim, lo-fi room at night: a desk holds a vinyl turntable     */
/*  playing music + a small candle; indie band posters hang on the wall. */
/*  All three builder layers (RoomBackdrop / Turntable / RoomAtmosphere) */
/*  + the assembler align to THESE coordinates so the room composes.     */
/*  Parent svg: viewBox "0 0 400 320", preserveAspectRatio slice.        */
/* ================================================================== */

export { sn } from '../q04Shared';

/* The desk's tabletop surface line — every object on the desk sits with
   its BASE on DESK_Y. The tabletop front edge drops to DESK_FRONT_Y. */
export const DESK_Y = 214;
export const DESK_FRONT_Y = 250;

/* Vinyl turntable — the hero, centred-left on the desk. cx is the spindle
   (record centre). It sits with its base on DESK_Y. */
export const TURNTABLE = { cx: 168, spindleY: 188, baseY: DESK_Y, halfW: 60 };

/* Small candle on the desk, right side (the assembler places the reused
   CandleHero here, scaled down). baseX / baseY = where the candle foot sits. */
export const CANDLE = { baseX: 312, baseY: DESK_Y, scale: 0.4 };

/* Three framed indie-band posters on the wall (above the desk). */
export const POSTERS = [
  { x: 40, y: 50, w: 74, h: 104, color: '#c67d6c' }, // muted terracotta
  { x: 150, y: 34, w: 92, h: 122, color: '#5d7b84' }, // muted teal
  { x: 280, y: 58, w: 78, h: 92, color: '#c79f57' }, // muted ochre
] as const;

/* Where music notes / sound ripples rise from (the record). */
export const MUSIC_SOURCE = { x: TURNTABLE.cx, y: 184 };

/* Warm, dim, cosy-night palette. Warm amber light pools against dim mauve
   walls — clearly an INTERIOR at night (distinct from Q4·A's cool moon sky). */
export const ROOM = {
  /* walls — dim warm mauve/taupe, cosy not black */
  wallTop: '#6d5662',
  wallLo: '#56424e',
  wallGlow: '#9c7b76', // warm wash on the wall near the light
  /* desk — warm wood */
  deskTop: '#8a6450',
  deskTopHi: '#a87e62',
  deskFront: '#5e4234',
  deskEdge: '#b08664',
  /* turntable */
  ttBody: '#332c34', // dark plinth
  ttBodyHi: '#4a4049',
  ttPlate: '#2a2530', // platter
  vinyl: '#1b181d', // black record
  vinylSheen: '#5a5560',
  label: '#e3a45c', // warm record label
  arm: '#cdbfc4', // tonearm (brushed metal)
  /* warm light */
  lamp: '#ffd79a',
  lampSoft: '#ffe8c2',
  glowAmber: '#ffc878',
  /* posters */
  posterFrame: '#372e36',
  posterMat: '#efe6dc',
  ink: '#2b2430', // poster art / dark accents
  /* accents */
  note: '#ffe6bc', // music notes
  star: '#ffeccb',
} as const;
