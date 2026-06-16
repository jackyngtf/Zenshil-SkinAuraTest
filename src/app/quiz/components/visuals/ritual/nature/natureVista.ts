/* ================================================================== */
/*  Q10·C「自然遠景」— shared contract for the nature-vista modules.     */
/*  Tech-lead owned interface so VistaHills.tsx and VistaFrame.tsx can  */
/*  be built in parallel and assembled by RitualNatureScene.tsx without */
/*  drift. Coords are the 400×400 viewBox (visible circle r≈190 @200,   */
/*  200). A serene escape-to-nature vista: layered misty hills above a  */
/*  calm water plane, framed by soft foreground foliage, warm dawn      */
/*  light from the upper-left. Stays in the family's soft-illustration  */
/*  language (NOT photoreal), matching the locked A and the new B / D.  */
/*  C owns the sage/green accent.                                       */
/* ================================================================== */

export const sn = (v: number) => +v.toFixed(1);

/* Sage / misty-green / warm-ivory palette (warm dawn light, sage accent). */
export const NAT = {
  skyHi: '#fcf6e8', // warm ivory sky top
  skyMid: '#eef1da', // pale warm sage
  skyLo: '#e6ecd2', // sage haze near the horizon
  sun: '#fde7bf', // warm sun glow
  hillFar: '#cfdcc1', // farthest ridge — light, hazy
  hillMid: '#a7c0a0',
  hillNear: '#7d9b82', // sage accent (nearer ridge)
  hillDeep: '#5c7b6b',
  water: '#c6d3c5', // calm cool sage-grey water
  waterLo: '#aabdad',
  waterHi: '#eef4e7',
  mist: '#fbf7ec',
  foliage: '#46604c', // deep fern — nearest foreground frame
  foliageMid: '#6f9072',
  vein: '#cfe0c2',
  bird: '#5b6b58',
  deep: '#54655f',
} as const;

/* Where the hills meet the water (the horizon). Hills rise above it;
   the water plane fills below it. Foreground foliage frames the rim. */
export const HORIZON_Y = 236;

export type VistaPartProps = {
  uid: string;
  isConfirming: boolean;
  reduceMotion: boolean;
};
