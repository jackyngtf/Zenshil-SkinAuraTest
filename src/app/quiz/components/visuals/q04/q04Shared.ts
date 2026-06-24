/* ================================================================== */
/*  Q4 shared helpers — used by all four scene layout files.           */
/*                                                                     */
/*  `sn` snaps an SVG coordinate to 1 decimal place. Keeping numbers   */
/*  short keeps the generated path `d` strings readable.               */
/* ================================================================== */

/** Round to 1 decimal place for compact, readable SVG path data. */
export const sn = (v: number) => +v.toFixed(1);
