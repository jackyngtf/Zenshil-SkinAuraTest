/* ================================================================== */
/*  Q10·D「精華滴注」— shared contract for the facial scene modules.   */
/*  Tech-lead owned interface so Pipette.tsx and SerumDrip.tsx can be  */
/*  built in parallel and assembled by RitualFacialScene.tsx without   */
/*  coordinate/colour drift. Coords are in the 400×400 scene viewBox   */
/*  (visible circle r≈190 around 200,200). Dawn light from upper-left. */
/* ================================================================== */

export const sn = (v: number) => +v.toFixed(1);

/* A serum's three-stop colour ramp (lit → body → shadow). */
export type Serum = { hi: string; mid: string; lo: string; name: string };

/* Family accents reused as the three serums (ties D to its siblings). */
export const SERUMS: Record<'amber' | 'blush' | 'sage', Serum> = {
  amber: { hi: '#f1dba9', mid: '#c9a070', lo: '#9a6f37', name: 'amber' },
  blush: { hi: '#f7d3d0', mid: '#d9a8ad', lo: '#ab7681', name: 'blush' },
  sage: { hi: '#d2e1c4', mid: '#7d9b82', lo: '#516a57', name: 'sage' },
};

/* Where the falling beads land / where soft pools sit. */
export const SURFACE_Y = 318;

/* One pipette: glass barrel rotated `angle`° about its tip (tipX,tipY),
   extending `len` upward (top runs off-frame, like the reference). The
   matching SerumDrip hangs from the same tip. `phase` (0..1) offsets the
   drip cycle so the three vials drip out of sync. */
export type PipetteCfg = {
  id: string;
  tipX: number;
  tipY: number;
  angle: number;
  len: number;
  w: number;
  serum: Serum;
  hero?: boolean;
  phase: number;
};

/* Three pipettes converging from the top edge (left tilts in, right tilts
   in, centre vertical). Centre is the blush hero with the long viscous
   stringy drip. */
export const PIPETTES: PipetteCfg[] = [
  { id: 'l', tipX: 146, tipY: 202, angle: -12, len: 156, w: 30, serum: SERUMS.amber, phase: 0.66 },
  { id: 'm', tipX: 202, tipY: 186, angle: 0, len: 176, w: 31, serum: SERUMS.blush, hero: true, phase: 0 },
  { id: 'r', tipX: 258, tipY: 200, angle: 12, len: 150, w: 30, serum: SERUMS.sage, phase: 0.33 },
];

export type PipetteProps = {
  uid: string;
  cfg: PipetteCfg;
  reduceMotion: boolean;
};

export type SerumDripProps = {
  uid: string;
  cfg: PipetteCfg;
  isConfirming: boolean;
  reduceMotion: boolean;
};
