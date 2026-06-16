/* ================================================================== */
/*  Q10·B「暖調 SPA 鬆弛室」— shared contract for the spa-room modules.  */
/*  Tech-lead owned interface so SpaDaybed.tsx and SpaStillLife.tsx can */
/*  be built in parallel and assembled by RitualSpaScene.tsx without    */
/*  drift. Coords are the 400×400 viewBox (visible circle r≈190 @200,   */
/*  200). Reference vibe: a cosy candlelit spa room — warm peach/cream, */
/*  a soft daybed with a peach throw + folded towels, a side-table      */
/*  still-life (lit candle + steaming bowl + cherry-blossom sprig).     */
/*  Stays in the family's soft-illustration language (NOT photoreal),   */
/*  consistent with the locked A (sleep) and C (nature) scenes.         */
/*  Light: warm dawn from the upper-left.                               */
/* ================================================================== */

export const sn = (v: number) => +v.toFixed(1);

/* Warm, cosy peach/cream palette (peachier than the neutral A/C base,
   matching the reference photo's candlelit warmth). */
export const ROOM = {
  fieldHi: '#fcf4e9',
  fieldMid: '#f3ddc6',
  fieldLo: '#e7c7a9',
  blanket: '#fdf6ec',
  blanketLo: '#ecd9bf',
  pillow: '#fbeede',
  throwHi: '#edc9ad',
  throwLo: '#d7a07e',
  towel: '#fffaf1',
  towelLo: '#ecdcc6',
  candleGlow: '#ffce8a',
  flame: '#ffdca6',
  steam: '#fff6ea',
  blossom: '#f5cdd2',
  blossomDeep: '#e79aa6',
  vase: '#efe6d8',
  gold: '#caa46f',
  deep: '#6b5d4f',
} as const;

/* Reference lines (approx) used to align the modules:
   BED_RIDGE  — top of the daybed mass where towels/throw rest (~y286)
   TABLE_Y    — the side-table surface the still-life sits on (~y322) */
export const BED_RIDGE = 286;
export const TABLE_Y = 322;

export type SpaPartProps = {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
};
