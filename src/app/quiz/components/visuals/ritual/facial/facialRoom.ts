/* ================================================================== */
/*  Q10·D「煥膚梳妝角」— shared contract for the facial-vanity modules.  */
/*  Tech-lead owned interface so VanityProducts.tsx and VanityMirror.tsx*/
/*  can be built in parallel and assembled by RitualFacialScene.tsx     */
/*  without drift. Coords are the 400×400 viewBox (visible circle       */
/*  r≈190 @200,200). Reference vibe: a warm blush facial vanity — a      */
/*  glowing round mirror, skincare products on a counter, a serum       */
/*  dropper releasing a drop, a rose sprig. Stays in the family's soft- */
/*  illustration language (NOT photoreal), matching the locked A/C and  */
/*  the new B. Light: warm dawn from the upper-left; accent = blush.     */
/* ================================================================== */

export const sn = (v: number) => +v.toFixed(1);

/* Warm blush / cream / soft-gold palette (D owns the blush accent). */
export const FROOM = {
  fieldHi: '#fdf5ef',
  fieldMid: '#f6e0d8',
  fieldLo: '#ecccc7',
  counter: '#fbf2ec',
  counterLo: '#e7d3cb',
  glassHi: '#fdf7f2',
  glassMid: '#f0ddd6',
  glassLo: '#e0c7c0',
  serumHi: '#f7d4d5',
  serumMid: '#e3a9ad',
  serumLo: '#c98890',
  blush: '#d9a8ad',
  rose: '#f1b7c1',
  roseDeep: '#d98897',
  leaf: '#9fae8f',
  cream: '#fbeee6',
  gold: '#caa46f',
  goldHi: '#ecd2a6',
  mirrorGlow: '#fff1e6',
  mirrorGlass: '#f3e7df',
  deep: '#6b5d4f',
} as const;

/* Reference geometry shared by the modules:
   COUNTER_Y — the vanity surface products stand on (~y286)
   MIRROR    — the round vanity mirror (upper-right), the clear focal. */
export const COUNTER_Y = 286;
export const MIRROR = { cx: 250, cy: 142, r: 82 } as const;

export type FacialPartProps = {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
};
