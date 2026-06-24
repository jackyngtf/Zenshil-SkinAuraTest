/* ================================================================== */
/*  Q4·D 能量 — "energetic gym room" shared LAYOUT + PALETTE contract.   */
/*  Pairs with Q4·B's cosy night room (same "room in a circle orb"       */
/*  idiom) but BRIGHT + WARM + ENERGETIC: a sunlit gym with a treadmill  */
/*  (belt running) + dumbbells. Energy = vitality / working out.         */
/*  All builder layers (GymBackdrop / Treadmill / GymEquipment) + the    */
/*  assembler align to THESE coordinates. Parent svg: viewBox            */
/*  "0 0 400 320", slice, clipped to a 300px CIRCLE — so keep key        */
/*  content within ~radius 150 of (200,160); corners are cropped.        */
/* ================================================================== */

export { sn } from '../q04Shared';

/* Floor line — equipment sits with its base on FLOOR_Y. Lowered so the
   whole scene sits LOWER in the circle orb (less empty floor foreground, so
   objects read grounded, not floating high at the back). */
export const FLOOR_Y = 244;

/* CHEST-PRESS MACHINE (the hero) — a big, substantial side-view strength
   machine: a SEAT + angled BACKREST, two PRESS ARMS with handles that push
   forward (a rep), and a visible WEIGHT STACK column (the unmistakable "gym
   machine" signal) — NO screen / monitor (it must NOT read medical). The
   press arms animate a rep; the stack lifts a little in sync. */
export const CHESTPRESS = {
  baseY: FLOOR_Y, // 244 (sits on the lowered floor)
  postX: 178, // main vertical frame post (carries the arm pivot + backrest)
  pivot: { x: 178, y: 172 }, // press-arm pivot at the top of the post
  seat: { x: 150, y: 222, w: 52 }, // seat pad top
  backrestTopY: 162, // top of the angled backrest (behind/left of the seat)
  handleBack: { x: 226, y: 206 }, // handle near the chest (rep START)
  handleFwd: { x: 262, y: 198 }, // handle pushed forward (rep END)
  stack: { x: 114, y: 168, w: 32, h: 76 }, // weight-stack column (top → floor)
};

/* A pair of dumbbells resting on the floor, front-RIGHT (bigger now). */
export const DUMBBELLS = { cx: 314, baseY: FLOOR_Y };

/* A bright window on the wall (upper-left) — warm morning light flooding in
   = the energy source. */
export const WINDOW = { x: 50, y: 48, w: 104, h: 98 };

/* Where energy motes radiate from (the press handles). */
export const ENERGY_SOURCE = { x: 250, y: 194 };

/* Bright, warm, ENERGETIC palette — a sunlit gym (deliberately brighter than
   Q4·B's dim night room, to read as vitality, not rest). */
export const GYM = {
  /* walls — warm sunlit cream/peach */
  wallTop: '#f8e7cc',
  wallLo: '#f0d3a8',
  wallGlow: '#fff2d2', // sun wash on the wall
  /* floor — warm light wood */
  floorTop: '#dcb684',
  floorTopHi: '#ecca94',
  floorFront: '#bf9457',
  floorEdge: '#e8c794', // lit front edge of the floor
  /* window + light */
  windowLight: '#fff5d8',
  windowGold: '#ffd98a',
  ray: '#fff8e8',
  /* metal frame (treadmill / dumbbell bars) */
  metal: '#aeb4bd',
  metalHi: '#d9dde2',
  metalDark: '#6b717b',
  /* treadmill */
  deck: '#312e39', // dark belt
  deckDash: '#4d4955', // belt texture
  deckHi: '#5b5662',
  console: '#2a2731',
  consoleHi: '#3c3844',
  screenGlow: '#ffce5e', // warm screen
  pulse: '#5fd39a', // vitality heart-rate line (fresh green)
  /* chest-press machine pads + weight stack */
  pad: '#3a3640', // seat / backrest pad (charcoal)
  padHi: '#4d4955',
  padAccent: '#ff8a5c', // a coral stripe on the pads (energetic pop)
  stackPlate: '#646a74', // weight-stack plates (metal)
  stackPlateHi: '#878d97',
  /* dumbbells */
  weight: '#3a3640', // rubber hex heads
  weightHi: '#4f4a56',
  grip: '#26232c',
  /* energy accents */
  energy: '#ffcf6e',
  energyHi: '#ffe7ad',
  mote: '#fff1ca',
  coral: '#ff8a5c', // warm vitality pop
  ink: '#2c2530',
} as const;
