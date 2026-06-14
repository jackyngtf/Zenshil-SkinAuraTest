'use client';

import { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transition } from 'framer-motion';
import { seededNumber } from './deterministicMotion';
import ShellConcernStage from './ShellConcernStage';

interface EmotionStageMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

/* ================================================================== */
/*  Q3 SCENES: "If skin had feelings" (Layered Organic Aura)          */
/* ================================================================== */

function Q3SkinAura({ previewId, isConfirming }: { previewId: string | null; isConfirming: boolean }) {
  // Layered petal glass / organic membrane
  let primary = "#f5f5f4";
  let secondary = "#e7e5e4";
  let accent = "#d6d3d1";

  if (previewId === 'A') { primary = "#f3e8ff"; secondary = "#e9d5ff"; accent = "#c084fc"; }
  if (previewId === 'B') { primary = "#ffe4e6"; secondary = "#fecdd3"; accent = "#fb7185"; }
  if (previewId === 'C') { primary = "#ccfbf1"; secondary = "#99f6e4"; accent = "#2dd4bf"; }
  if (previewId === 'D') { primary = "#ecfccb"; secondary = "#d9f99d"; accent = "#a3e635"; }

  // Idle state
  if (!previewId) {
    primary = "#fafaf9";
    secondary = "#f5f5f4";
    accent = "#e7e5e4";
  }

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Layer 1: Base Membrane Gradient */}
      <motion.div
        className="absolute w-[180%] h-[180%] rounded-full blur-[30px] opacity-70"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${secondary}, ${primary}, ${accent}, ${secondary})`
        }}
        animate={{
          rotate: isConfirming ? 180 : [0, 360],
          scale: isConfirming ? 0.95 : [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Layer 2: Floating Petal Glass (lighter overlay) */}
      <motion.div
        className="absolute w-[140%] h-[140%] rounded-full mix-blend-overlay opacity-90 blur-[10px]"
        style={{
          background: `radial-gradient(ellipse at 40% 40%, #ffffff 0%, transparent 60%),
                       radial-gradient(ellipse at 60% 60%, ${accent} 0%, transparent 60%)`
        }}
        animate={{
          rotate: isConfirming ? -90 : [0, -360],
          scale: isConfirming ? 1.05 : [1, 1.03, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Layer 3: Central Soft Focus */}
      <motion.div
        className="absolute w-3/4 h-3/4 rounded-full bg-white/40 backdrop-blur-md shadow-[inset_0_0_30px_rgba(255,255,255,0.8)] border border-white/50"
        animate={{
          scale: isConfirming ? 1.05 : [1, 1.02, 1],
          opacity: isConfirming ? 0 : 1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 4: Skin Signal Waveform (subtle pulse at bottom) */}
      {previewId && (
        <div className="absolute bottom-[22%] flex items-center justify-center gap-[5px] mix-blend-multiply" style={{ color: accent }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-current opacity-50"
              animate={{
                height: isConfirming ? 4 : [4, seededNumber(7000 + i, 10, 18), 4],
                opacity: isConfirming ? 0 : 0.5,
              }}
              transition={{
                duration: seededNumber(7100 + i, 1.2, 2.2),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ================================================================== */
/*  Q7 SCENES: "Feeling to improve"                                   */
/*  A constant underwater world: teal water, sandy bed, an ivory      */
/*  clam. Idle = the clam rests CLOSED. Picking an answer OPENS the   */
/*  shell and reveals the pearl in that ailment's character.          */
/*  Tap 2 (confirm) cures the pearl.                                  */
/* ================================================================== */

type PearlVariant = 'idle' | 'A' | 'B' | 'C' | 'D';

/* ── The one constant scene palette ── */
const SEA = {
  wTop: '#7fa79e',
  wMid: '#94b3a6',
  wBot: '#c9c0a2',
  ray: '#eef2dc',
  sand: '#d9c8a4',
  sandDark: '#b3a17d',
  weed: '#5c7b6b',
  shellHi: '#faf4e6',
  shellMid: '#e9dcc4',
  shellLo: '#c2b292',
  deep: '#54665f',
  glow: '#f6ecd4',
};

/* ── Pearl geometry ── */
type PearlParams = {
  top: number;  // top point dropping (melting / squashing)
  bot: number;  // bottom point bulging downward
  w: number;    // equator widening
  sway: number; // slight lateral lean
};

const PCX = 200;
const PCY = 224;
const PR = 48;
const PK = 0.5523;

const PEARL_REST: PearlParams = { top: 0, bot: 0, w: 0, sway: 0 };
const PEARL_CURE: PearlParams = { top: -1, bot: -0.5, w: 0.5, sway: 0 };

const sn = (v: number) => +v.toFixed(1);

const pearlD = (p: PearlParams) => {
  const topY = PCY - PR + p.top;
  const botY = PCY + PR + p.bot;
  const eqY = PCY + (p.top + p.bot) * 0.35;
  const rx = PR + p.w;
  const L = PCX - rx + p.sway * 0.5;
  const R = PCX + rx + p.sway * 0.5;
  const hx = rx * PK;
  const vT = (eqY - topY) * PK;
  const vB = (botY - eqY) * PK;
  const tx = PCX + p.sway;
  const bx = PCX + p.sway * 0.7;
  return (
    `M${sn(tx)} ${sn(topY)} ` +
    `C${sn(tx + hx)} ${sn(topY)} ${sn(R)} ${sn(eqY - vT)} ${sn(R)} ${sn(eqY)} ` +
    `C${sn(R)} ${sn(eqY + vB)} ${sn(bx + hx)} ${sn(botY)} ${sn(bx)} ${sn(botY)} ` +
    `C${sn(bx - hx)} ${sn(botY)} ${sn(L)} ${sn(eqY + vB)} ${sn(L)} ${sn(eqY)} ` +
    `C${sn(L)} ${sn(eqY - vT)} ${sn(tx - hx)} ${sn(topY)} ${sn(tx)} ${sn(topY)} Z`
  );
};

/* ── Open shell: fan valve that swings open (o: 0 closed → 1 open) ── */
const FAN_HINGE = { x: 200, y: 310 };
const FAN_A0 = 208;
const FAN_A1 = 332;
const FAN_LOBES = 6;

const fanPoint = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return [FAN_HINGE.x + r * Math.cos(rad), FAN_HINGE.y + r * Math.sin(rad)];
};

const fanD = (o: number) => {
  const R = 60 + 105 * o;
  const bump = 8 + 5 * o;
  const step = (FAN_A1 - FAN_A0) / FAN_LOBES;
  const pts: number[][] = [];
  for (let i = 0; i <= FAN_LOBES; i++) pts.push(fanPoint(FAN_A0 + i * step, R));
  let d = `M${sn(pts[0][0])} ${sn(pts[0][1])} `;
  for (let i = 0; i < FAN_LOBES; i++) {
    const m = fanPoint(FAN_A0 + (i + 0.5) * step, R + bump);
    d += `Q${sn(m[0])} ${sn(m[1])} ${sn(pts[i + 1][0])} ${sn(pts[i + 1][1])} `;
  }
  const last = pts[FAN_LOBES];
  const first = pts[0];
  d += `Q${sn((last[0] + 304) / 2 + 6)} ${sn((last[1] + 262) / 2 - 4)} 304 262 `;
  d += 'C270 276 130 276 96 262 ';
  d += `Q${sn((first[0] + 96) / 2 - 6)} ${sn((first[1] + 262) / 2 - 4)} ${sn(first[0])} ${sn(first[1])} Z`;
  return d;
};

const fanEdgeD = () => {
  const R = 165;
  const bump = 13;
  const step = (FAN_A1 - FAN_A0) / FAN_LOBES;
  const pts: number[][] = [];
  for (let i = 0; i <= FAN_LOBES; i++) pts.push(fanPoint(FAN_A0 + i * step, R));
  let d = `M${sn(pts[0][0])} ${sn(pts[0][1])} `;
  for (let i = 0; i < FAN_LOBES; i++) {
    const m = fanPoint(FAN_A0 + (i + 0.5) * step, R + bump);
    d += `Q${sn(m[0])} ${sn(m[1])} ${sn(pts[i + 1][0])} ${sn(pts[i + 1][1])} `;
  }
  return d;
};

const FAN_RIB_TIPS = [1, 2, 3, 4, 5].map((i) =>
  fanPoint(FAN_A0 + i * ((FAN_A1 - FAN_A0) / FAN_LOBES), 165)
);
const FAN_GROWTH_ARCS = [
  'M111.7 263 Q200 157 288.3 263',
  'M80.8 246.6 Q200 103.5 319.2 246.6',
];

/* ── Cup valve (always present in open scenes) ── */
const CUP_D =
  'M96 262 C98 292 130 322 200 322 C270 322 302 292 304 262 ' +
  'C270 283 130 283 96 262 Z';
const CUP_RIM_WAVY_D =
  'M96 262 Q116 269 136 271 Q155 276 174 277 Q187 280 200 279 ' +
  'Q213 280 226 277 Q245 276 264 271 Q284 269 304 262';
const CUP_LIP_D =
  'M96 262 C130 283 270 283 304 262 Q284 269 264 271 Q245 276 226 277 ' +
  'Q213 280 200 279 Q187 280 174 277 Q155 276 136 271 Q116 269 96 262 Z';
const CUP_FLUTES = [
  [130, 270],
  [163, 276],
  [200, 279],
  [237, 276],
  [270, 270],
];

/* ── Closed shell (idle) ── */
const CLOSED_TOP_D =
  'M108 290 C104 240 134 192 178 176 C192 170 208 170 222 176 ' +
  'C266 192 296 240 292 290 C240 301 160 301 108 290 Z';
const CLOSED_SEAM_D =
  'M108 290 Q130 296 152 293 Q176 299 200 296 Q224 299 248 293 Q270 296 292 290';
const CLOSED_BOTTOM_D =
  'M108 290 C115 312 150 324 200 324 C250 324 285 312 292 290 ' +
  'C260 300 140 300 108 290 Z';
const CLOSED_FLUTE_TIPS = [
  [124, 288],
  [150, 292],
  [178, 295],
  [206, 295],
  [234, 292],
  [262, 288],
];

/* ── Seaweed: both keyframes share one path structure ── */
const weedD = (bx: number, lean: number) =>
  `M${sn(bx)} 402 C${sn(bx - 4 + lean * 0.3)} 368 ${sn(bx + 6 + lean * 0.6)} 340 ${sn(bx + lean)} 306 ` +
  `C${sn(bx - 2 + lean)} 288 ${sn(bx + 3 + lean * 1.4)} 272 ${sn(bx + lean * 1.8)} 252`;

/* ── Per-ailment pearl character ── */
type PearlCfg = {
  hi: string;
  mid: string;
  lo: string;
  subColor: string;
  frames: PearlParams[];
  times?: number[];
  dur: number;
  fxDur: number;
  specSoft: number[];
  specSoftDelay?: number;
  specPos: { cx: number; cy: number; rx: number; ry: number; rot: number };
  specDot: number[];
  dotPos: { cx: number; cy: number };
  sub: number[];
  subPos: { cx: number; cy: number; rx: number; ry: number };
  halo: number[];
  haloCure: number;
  marks: 'slow' | 'sag' | 'tremor' | 'none';
  wash?: string;
  washOp?: number;
};

const PEARL_CFG: Record<'A' | 'B' | 'C' | 'D', PearlCfg> = {
  // A 暗沉疲勞: a big dull grey stone of a pearl — heavy, lightless
  A: {
    hi: '#b9aca0', mid: '#958779', lo: '#675b50', subColor: '#857668',
    frames: [
      { top: -8, bot: 6, w: 12, sway: 2 },
      { top: -7, bot: 7, w: 12.5, sway: -1 },
      { top: -8, bot: 6, w: 12, sway: 2 },
    ],
    dur: 7.5,
    fxDur: 5.6,
    specSoft: [0.12, 0.2, 0.12],
    specPos: { cx: 183, cy: 196, rx: 21, ry: 11, rot: -16 },
    specDot: [0, 0, 0],
    dotPos: { cx: 178, cy: 190 },
    sub: [0.08, 0.14, 0.08],
    subPos: { cx: 201, cy: 246, rx: 30, ry: 20 },
    halo: [0, 0, 0],
    haloCure: 0.55,
    marks: 'slow',
    wash: '#4d463e',
    washOp: 0.07,
  },
  // B 鬆弛感: the pearl has melted into a soft slumped mass
  B: {
    hi: '#fbf4e6', mid: '#e7d9c2', lo: '#b6a78c', subColor: '#ffe9c9',
    frames: [
      { top: 52, bot: 3, w: 28, sway: 0 },
      { top: 55, bot: 5, w: 31, sway: -2 },
      { top: 52, bot: 4, w: 29, sway: 2 },
      { top: 52, bot: 3, w: 28, sway: 0 },
    ],
    dur: 5,
    fxDur: 5,
    specSoft: [0.48, 0.56, 0.48],
    specPos: { cx: 194, cy: 243, rx: 36, ry: 8, rot: -4 },
    specDot: [0.5, 0.56, 0.5],
    dotPos: { cx: 164, cy: 239 },
    sub: [0.25, 0.33, 0.25],
    subPos: { cx: 200, cy: 256, rx: 46, ry: 12 },
    halo: [0.1, 0.16, 0.1],
    haloCure: 0.55,
    marks: 'sag',
  },
  // C 不穩定敏感: blushing, trembling, a nervous ghost echo around it
  C: {
    hi: '#fffafa', mid: '#f7eae8', lo: '#cdb3ae', subColor: '#ffdde2',
    frames: [
      PEARL_REST,
      { top: 0.8, bot: -0.4, w: 0.6, sway: 1.2 },
      { top: -0.6, bot: 0.8, w: 0.4, sway: -1.3 },
      { top: 1, bot: 0.4, w: 0.8, sway: 0.8 },
      { top: -0.4, bot: -0.6, w: 0.5, sway: -1 },
      PEARL_REST,
    ],
    dur: 2.2,
    fxDur: 1.9,
    specSoft: [0.5, 0.26, 0.55, 0.3, 0.5],
    specPos: { cx: 183, cy: 200, rx: 16, ry: 9, rot: -18 },
    specDot: [0.85, 0.4, 0.9, 0.5, 0.85],
    dotPos: { cx: 180, cy: 193 },
    sub: [0.3, 0.4, 0.3],
    subPos: { cx: 201, cy: 244, rx: 28, ry: 19 },
    halo: [0.14, 0.24, 0.14],
    haloCure: 0.55,
    marks: 'tremor',
    wash: '#b06c79',
    washOp: 0.05,
  },
  // D 無光澤: round and smooth — but matte, its sparkle won't catch
  D: {
    hi: '#d8d2c6', mid: '#c7c0b3', lo: '#a59d8e', subColor: '#c9c0ae',
    frames: [PEARL_REST, { top: -1.5, bot: 1.5, w: 1.2, sway: 0 }, PEARL_REST],
    dur: 5.4,
    fxDur: 3,
    specSoft: [0, 0.16, 0],
    specSoftDelay: 1.3,
    specPos: { cx: 183, cy: 200, rx: 16, ry: 9, rot: -18 },
    specDot: [0.04, 0.06, 0.04],
    dotPos: { cx: 180, cy: 193 },
    sub: [0.06, 0.1, 0.06],
    subPos: { cx: 201, cy: 244, rx: 28, ry: 19 },
    halo: [0, 0, 0],
    haloCure: 0.7,
    marks: 'none',
    wash: '#776e54',
    washOp: 0.06,
  },
};

/* Motion marks — small illustrated arcs beside the pearl */
const MARK_SETS: Record<'slow' | 'sag' | 'tremor', { d: string; delay: number }[]> = {
  slow: [
    { d: 'M136 192 Q127 210 136 228', delay: 0 },
    { d: 'M145 197 Q138 210 145 223', delay: 0.4 },
    { d: 'M264 192 Q273 210 264 228', delay: 1.7 },
    { d: 'M255 197 Q262 210 255 223', delay: 2.1 },
  ],
  sag: [
    { d: 'M106 236 Q97 252 106 268', delay: 0 },
    { d: 'M115 241 Q108 252 115 263', delay: 0.35 },
    { d: 'M294 236 Q303 252 294 268', delay: 1.3 },
    { d: 'M285 241 Q292 252 285 263', delay: 1.65 },
  ],
  tremor: [
    { d: 'M138 192 Q129 210 138 228', delay: 0 },
    { d: 'M147 197 Q140 210 147 223', delay: 0.15 },
    { d: 'M262 192 Q271 210 262 228', delay: 0.45 },
    { d: 'M253 197 Q260 210 253 223', delay: 0.6 },
  ],
};

const MARK_DUR: Record<'slow' | 'sag' | 'tremor', number> = {
  slow: 3.6,
  sag: 2.6,
  tremor: 0.95,
};

/* C's blush spots */
const C_BLUSHES = [
  { cx: 174, cy: 240, rx: 13, ry: 9 },
  { cx: 228, cy: 240, rx: 13, ry: 9 },
];

/* D's hopeful sparkles */
const D_SPARKLES = [
  { cx: 150, cy: 188, size: 5, dur: 2.6, delay: 0 },
  { cx: 254, cy: 198, size: 4, dur: 3.1, delay: 1.2 },
  { cx: 236, cy: 162, size: 3.2, dur: 2.8, delay: 2.1 },
];

/* Light shafts slanting down from the surface */
const WATER_RAYS = [
  { x: 92, w: 20, peak: 0.1, dur: 7.5, delay: 0 },
  { x: 158, w: 26, peak: 0.13, dur: 6.6, delay: 1.6 },
  { x: 226, w: 18, peak: 0.1, dur: 8.2, delay: 0.7 },
  { x: 296, w: 24, peak: 0.12, dur: 7, delay: 2.4 },
];

/* Marine snow spawn points: [cx, cy, dur, delay] */
const SNOW_SPOTS = [
  [70, 96, 10, 0],
  [140, 160, 12, 3],
  [215, 110, 11, 1.5],
  [296, 150, 10.5, 4.5],
  [336, 92, 12.5, 2],
];

const SAND_RIPPLES = [
  'M58 352 Q92 347 126 352',
  'M158 366 Q194 361 230 366',
  'M258 354 Q290 349 322 354',
  'M108 380 Q146 375 184 380',
];
const PEBBLES = [
  { cx: 99, cy: 356, rx: 7, ry: 3.4 },
  { cx: 145, cy: 368, rx: 5, ry: 2.4 },
  { cx: 299, cy: 359, rx: 8, ry: 3.8 },
  { cx: 265, cy: 371, rx: 4, ry: 2 },
  { cx: 341, cy: 384, rx: 6, ry: 2.8 },
];

function SnowMote({ cx, cy, dur, delay }: { cx: number; cy: number; dur: number; delay: number }) {
  const drift = seededNumber(cx * 3 + cy, -12, 12);
  const r = seededNumber(cx + cy, 0.7, 1.5);
  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      fill={SEA.ray}
      initial={{ opacity: 0 }}
      animate={{ y: [0, 48], x: [0, drift], opacity: [0, 0.38, 0.28, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function Bubble({ cx, cy, dur, delay }: { cx: number; cy: number; dur: number; delay: number }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={2}
      fill="none"
      stroke="rgba(255,255,255,0.45)"
      strokeWidth="0.8"
      initial={{ opacity: 0 }}
      animate={{
        y: [0, -190],
        x: [0, 6, -5, 4, 0],
        opacity: [0, 0.4, 0.35, 0],
        r: [1.4, 2.7],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: 4.2, ease: 'easeOut' }}
    />
  );
}

function Sparkle({ cx, cy, size, dur, delay, cure }: { cx: number; cy: number; size: number; dur: number; delay: number; cure: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={cure ? { opacity: 1 } : { opacity: [0.1, 0.45, 0.1] }}
      transition={
        cure
          ? { duration: 0.4, ease: 'easeOut' }
          : { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      <line x1={cx} y1={cy - size} x2={cx} y2={cy + size} stroke="#fffdf2" strokeWidth="1" strokeLinecap="round" />
      <line x1={cx - size} y1={cy} x2={cx + size} y2={cy} stroke="#fffdf2" strokeWidth="1" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={size * 0.28} fill="#fffdf2" />
    </motion.g>
  );
}

/* ── Shared underwater stage ── */
function SeaStage({ uid, confirming }: { uid: string; confirming: boolean }) {
  return (
    <>
      <rect width="400" height="400" fill={`url(#q7p-water-${uid})`} />

      {/* Surface glow bleeding down */}
      <motion.ellipse
        cx={200} cy={-18} rx={272} ry={66}
        fill={SEA.ray}
        filter={`url(#q7p-b10-${uid})`}
        animate={{ opacity: [0.14, 0.22, 0.14] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Light shafts */}
      {WATER_RAYS.map((ray) => (
        <motion.line
          key={`ray-${ray.x}`}
          x1={ray.x} y1={-40} x2={ray.x - 52} y2={440}
          stroke={SEA.ray}
          strokeWidth={ray.w}
          strokeLinecap="round"
          filter={`url(#q7p-b10-${uid})`}
          initial={{ opacity: 0 }}
          animate={
            confirming
              ? { opacity: ray.peak * 2.6, x: 0 }
              : { opacity: [ray.peak * 0.3, ray.peak, ray.peak * 0.45, ray.peak * 0.3], x: [0, 12, -6, 0] }
          }
          transition={
            confirming
              ? { duration: 0.45, ease: 'easeOut' }
              : { duration: ray.dur, delay: ray.delay, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      ))}

      {/* Far dune */}
      <path
        d="M-10 322 C60 312 140 318 200 314 C270 309 340 318 410 312 L410 400 L-10 400 Z"
        fill={SEA.sandDark}
        opacity="0.5"
        filter={`url(#q7p-b6-${uid})`}
      />

      {/* Back seaweed */}
      <motion.path
        d={weedD(40, -6)}
        fill="none"
        stroke={SEA.weed}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.45"
        filter={`url(#q7p-b3-${uid})`}
        animate={{ d: [weedD(40, -6), weedD(40, 7), weedD(40, -6)] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Near sand */}
      <path
        d="M-10 334 C70 324 150 332 220 327 C290 322 350 330 410 326 L410 400 L-10 400 Z"
        fill={`url(#q7p-sandg-${uid})`}
      />

      {SAND_RIPPLES.map((d) => (
        <path key={d} d={d} fill="none" stroke={SEA.sandDark} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      ))}
      {PEBBLES.map((p) => (
        <g key={`peb-${p.cx}`}>
          <ellipse cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill={SEA.sandDark} opacity="0.7" />
          <ellipse cx={p.cx - p.rx * 0.25} cy={p.cy - p.ry * 0.35} rx={p.rx * 0.5} ry={p.ry * 0.45} fill={SEA.sand} opacity="0.6" />
        </g>
      ))}

      {/* Front seaweed */}
      <motion.path
        d={weedD(58, 5)}
        fill="none"
        stroke={SEA.weed}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
        animate={{ d: [weedD(58, 5), weedD(58, -7), weedD(58, 5)] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d={weedD(354, -5)}
        fill="none"
        stroke={SEA.weed}
        strokeWidth="3.4"
        strokeLinecap="round"
        opacity="0.55"
        animate={{ d: [weedD(354, -5), weedD(354, 6), weedD(354, -5)] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
    </>
  );
}

/* ── Idle: the clam rests closed, something faintly glowing inside ── */
function ClosedShell({ uid }: { uid: string }) {
  return (
    <>
      {/* Resting shadow */}
      <ellipse cx={200} cy={322} rx={96} ry={12} fill={SEA.deep} opacity="0.35" filter={`url(#q7p-b10-${uid})`} />

      {/* Bottom valve sliver */}
      <path d={CLOSED_BOTTOM_D} fill={`url(#q7p-cupg-${uid})`} stroke={SEA.shellLo} strokeOpacity="0.4" strokeWidth="1" />

      {/* Top valve dome */}
      <path
        d={CLOSED_TOP_D}
        fill={`url(#q7p-dome-${uid})`}
        stroke={SEA.shellLo}
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Creases + flutes radiating from the umbo */}
      {CLOSED_FLUTE_TIPS.map(([fx, fy]) => (
        <line
          key={`ccrease-${fx}`}
          x1={200} y1={182} x2={fx} y2={fy}
          stroke={SEA.deep}
          strokeWidth="5"
          opacity="0.1"
          filter={`url(#q7p-b6-${uid})`}
        />
      ))}
      {CLOSED_FLUTE_TIPS.map(([fx, fy]) => (
        <path
          key={`cflute-${fx}`}
          d={`M200 182 Q${sn((200 + fx) / 2 + (fx < 200 ? -8 : 8))} ${sn((182 + fy) / 2)} ${fx} ${fy}`}
          fill="none"
          stroke={SEA.shellLo}
          strokeWidth="1.2"
          opacity="0.4"
        />
      ))}
      {/* Shading at the rim of the dome */}
      <ellipse cx={200} cy={286} rx={92} ry={17} fill={SEA.deep} opacity="0.15" filter={`url(#q7p-b6-${uid})`} />
      {/* Dome edge catching the light */}
      <path d={CLOSED_TOP_D} fill="none" stroke={SEA.shellHi} strokeOpacity="0.35" strokeWidth="1.2" />

      {/* The seam — and a pearl-light leaking through it */}
      <motion.ellipse
        cx={200} cy={293} rx={62} ry={4.5}
        fill="#fff7da"
        filter={`url(#q7p-b6-${uid})`}
        animate={{ opacity: [0.12, 0.38, 0.12] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d={CLOSED_SEAM_D} fill="none" stroke={SEA.deep} strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />

      {/* A tiny bubble escapes the seam now and then */}
      <Bubble cx={208} cy={288} dur={7} delay={2.5} />
    </>
  );
}

/* ── Open shell + the ailing pearl ── */
function OpenShellPearl({ uid, variant, isConfirming }: { uid: string; variant: 'A' | 'B' | 'C' | 'D'; isConfirming: boolean }) {
  const cfg = PEARL_CFG[variant];
  const { frames, times, dur, fxDur } = cfg;
  const bodyFrames = frames.map(pearlD);

  const bodyTransition: Transition = isConfirming
    ? { duration: 0.55, ease: [0.3, 1.4, 0.5, 1] }
    : { duration: dur, times, repeat: Infinity, ease: 'easeInOut' };
  const bodyAnimate = isConfirming ? { d: pearlD(PEARL_CURE) } : { d: bodyFrames };

  const fxLoop = (delay = 0): Transition =>
    isConfirming
      ? { duration: 0.45, ease: 'easeOut' }
      : { duration: fxDur, repeat: Infinity, ease: 'easeInOut', repeatDelay: delay };

  return (
    <>
      {/* Resting shadow */}
      <ellipse cx={200} cy={326} rx={100} ry={12} fill={SEA.deep} opacity="0.35" filter={`url(#q7p-b10-${uid})`} />

      {/* Fan valve swings open on arrival */}
      <motion.path
        d={fanD(0.12)}
        fill={`url(#q7p-fang-${uid})`}
        stroke={SEA.shellLo}
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeLinejoin="round"
        initial={{ d: fanD(0.12) }}
        animate={{ d: fanD(1) }}
        transition={{ duration: 0.7, ease: [0.34, 1.2, 0.5, 1], delay: 0.05 }}
      />
      {/* Fan detail appears once the valve is open */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.45 }}>
        {FAN_RIB_TIPS.map(([rx2, ry2]) => (
          <line
            key={`fcrease-${sn(rx2)}`}
            x1={200} y1={300} x2={sn(rx2)} y2={sn(ry2)}
            stroke={SEA.deep}
            strokeWidth="6"
            opacity="0.12"
            filter={`url(#q7p-b6-${uid})`}
          />
        ))}
        {FAN_RIB_TIPS.map(([rx2, ry2]) => (
          <line
            key={`frib-${sn(rx2)}`}
            x1={200} y1={300} x2={sn(rx2)} y2={sn(ry2)}
            stroke={SEA.shellLo}
            strokeWidth="1.2"
            opacity="0.4"
          />
        ))}
        {FAN_GROWTH_ARCS.map((d) => (
          <path key={d} d={d} fill="none" stroke={SEA.shellLo} strokeWidth="1" opacity="0.22" />
        ))}
        <path d={fanEdgeD()} fill="none" stroke={SEA.shellHi} strokeOpacity="0.45" strokeWidth="1.3" strokeLinecap="round" />
        {/* Mother-of-pearl tints on the inner face */}
        <ellipse cx={158} cy={208} rx={26} ry={13} fill="#e8b4c8" opacity="0.08" filter={`url(#q7p-b10-${uid})`} />
        <ellipse cx={246} cy={202} rx={24} ry={12} fill="#a8d8cf" opacity="0.08" filter={`url(#q7p-b10-${uid})`} />
        {/* Hinge shadow cradling the pearl */}
        <ellipse cx={200} cy={252} rx={90} ry={40} fill={SEA.deep} opacity="0.22" filter={`url(#q7p-b10-${uid})`} />
      </motion.g>

      {/* Dark mouth of the cup */}
      <ellipse cx={200} cy={264} rx={98} ry={12} fill={SEA.deep} opacity="0.5" />
      {/* Seat shadow under the pearl */}
      <ellipse cx={200} cy={272} rx={34} ry={6} fill={SEA.deep} opacity="0.4" filter={`url(#q7p-b3-${uid})`} />

      {/* The pearl rises out of the cup as the shell opens */}
      <motion.g
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32, duration: 0.5, ease: 'easeOut' }}
      >
        {/* Gentle breath bob; confirm lifts the pearl slightly */}
        <motion.g
          initial={false}
          animate={isConfirming ? { y: -5 } : { y: [0, -1.5, 0] }}
          transition={isConfirming ? { duration: 0.5, ease: 'easeOut' } : { duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* C's nervous jitter */}
          <motion.g
            initial={false}
            animate={
              variant === 'C' && !isConfirming
                ? { x: [0, 1.1, -0.8, 0.8, -1.2, 0.6, 0], y: [0, -0.8, 0.9, -0.6, 0.7, -0.9, 0] }
                : { x: 0, y: 0 }
            }
            transition={
              variant === 'C' && !isConfirming
                ? { duration: 1.9, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
          >
            {/* Halo (mostly reserved for the cure) */}
            <motion.circle
              cx={PCX} cy={PCY} r={72}
              fill={`url(#q7p-halo-${uid})`}
              initial={false}
              animate={{ opacity: isConfirming ? cfg.haloCure : cfg.halo }}
              transition={fxLoop()}
            />

            {/* C: a ghost echo of the trembling pearl */}
            {variant === 'C' && !isConfirming && (
              <motion.path
                d={pearlD({ top: -5, bot: 5, w: 5, sway: 0 })}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.35, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Pearl body */}
            <motion.path
              d={bodyFrames[0]}
              fill={`url(#q7p-pearlg-${uid})`}
              initial={false}
              animate={bodyAnimate}
              transition={bodyTransition}
            />

            {/* On-surface details, clipped to the deforming pearl */}
            <g clipPath={`url(#q7p-clip-${uid})`}>
              {/* Subsurface glow */}
              <motion.ellipse
                cx={cfg.subPos.cx} cy={cfg.subPos.cy} rx={cfg.subPos.rx} ry={cfg.subPos.ry}
                fill={cfg.subColor}
                filter={`url(#q7p-b10-${uid})`}
                initial={false}
                animate={{ opacity: isConfirming ? 0.5 : cfg.sub }}
                transition={fxLoop()}
              />

              {/* C: blush spots */}
              {variant === 'C' &&
                C_BLUSHES.map((b) => (
                  <motion.ellipse
                    key={`blush-${b.cx}`}
                    cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
                    fill="#f0a0a8"
                    filter={`url(#q7p-b6-${uid})`}
                    initial={false}
                    animate={isConfirming ? { opacity: 0 } : { opacity: [0.35, 0.6, 0.35] }}
                    transition={isConfirming ? { duration: 0.4 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}

              {/* Limb darkening */}
              <circle cx={PCX} cy={PCY + 1} r={64} fill={`url(#q7p-vig-${uid})`} />

              {/* A cure: the grey washes away to ivory */}
              {variant === 'A' && isConfirming && (
                <motion.path
                  d={pearlD(PEARL_CURE)}
                  fill={`url(#q7p-cureg-${uid})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.92 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              )}

              {/* Cure sweeps */}
              {(variant === 'A' || variant === 'B') && isConfirming && (
                <g transform="rotate(24 200 224)">
                  <motion.rect
                    x="-120" y="55" width={variant === 'A' ? 100 : 64} height="280"
                    fill={`url(#q7p-sheen-${uid})`}
                    initial={{ x: 0, opacity: 0.85 }}
                    animate={{ x: 460 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </g>
              )}
              {variant === 'C' && isConfirming && (
                <motion.circle
                  cx={PCX} cy={PCY} r={50}
                  fill="#ffffff"
                  filter={`url(#q7p-b10-${uid})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.55 }}
                />
              )}
              {variant === 'D' && isConfirming && (
                <>
                  <g transform="rotate(24 200 224)">
                    <motion.rect
                      x="-120" y="55" width="110" height="280"
                      fill={`url(#q7p-irid-${uid})`}
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: 460 }}
                      transition={{ duration: 0.55, ease: 'easeOut' }}
                    />
                  </g>
                  <motion.rect
                    width="400" height="400" fill="#fff3d6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.22 }}
                    transition={{ duration: 0.5 }}
                  />
                </>
              )}

              {/* Speculars */}
              <motion.ellipse
                cx={cfg.specPos.cx} cy={cfg.specPos.cy} rx={cfg.specPos.rx} ry={cfg.specPos.ry}
                fill="#ffffff"
                filter={`url(#q7p-b6-${uid})`}
                transform={`rotate(${cfg.specPos.rot} ${cfg.specPos.cx} ${cfg.specPos.cy})`}
                initial={false}
                animate={{ opacity: isConfirming ? 0.65 : cfg.specSoft }}
                transition={fxLoop(cfg.specSoftDelay ?? 0)}
              />
              <motion.ellipse
                cx={cfg.dotPos.cx} cy={cfg.dotPos.cy} rx={4} ry={2.5}
                fill="#ffffff"
                transform={`rotate(-20 ${cfg.dotPos.cx} ${cfg.dotPos.cy})`}
                initial={false}
                animate={{ opacity: isConfirming ? 0.95 : cfg.specDot }}
                transition={fxLoop()}
              />
            </g>

            {/* C cure: one calm ring radiating outward */}
            {variant === 'C' && isConfirming && (
              <motion.circle
                cx={PCX} cy={PCY}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.8"
                initial={{ r: 52, opacity: 0.6 }}
                animate={{ r: 88, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            )}

            {/* D: sparkles that can't quite catch — until the cure */}
            {variant === 'D' &&
              D_SPARKLES.map((s) => (
                <Sparkle key={`spk-${s.cx}`} cx={s.cx} cy={s.cy} size={s.size} dur={s.dur} delay={s.delay} cure={isConfirming} />
              ))}
            {variant === 'D' && !isConfirming && (
              <circle cx={252} cy={184} r={12} fill="none" stroke={SEA.shellLo} strokeWidth="1" strokeDasharray="2.5 3.5" opacity="0.4" />
            )}
          </motion.g>
        </motion.g>

        {/* Illustrated motion marks beside the pearl */}
        {cfg.marks !== 'none' && !isConfirming &&
          MARK_SETS[cfg.marks].map((m) => (
            <motion.path
              key={`mark-${m.d.slice(0, 9)}`}
              d={m.d}
              fill="none"
              stroke="#8fa097"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: MARK_DUR[cfg.marks as 'slow' | 'sag' | 'tremor'], delay: m.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
      </motion.g>

      {/* Cup valve in front */}
      <path d={CUP_D} fill={`url(#q7p-cupg-${uid})`} stroke={SEA.shellLo} strokeOpacity="0.4" strokeWidth="1" strokeLinejoin="round" />
      <ellipse cx={200} cy={316} rx={92} ry={13} fill={SEA.deep} opacity="0.2" filter={`url(#q7p-b6-${uid})`} />
      {CUP_FLUTES.map(([fx2, fy2]) => (
        <line key={`cupflute-${fx2}`} x1={200} y1={318} x2={fx2} y2={fy2} stroke={SEA.shellLo} strokeWidth="1.2" opacity="0.32" />
      ))}
      <path d={CUP_LIP_D} fill={SEA.shellHi} opacity="0.3" />
      <path d={CUP_RIM_WAVY_D} fill="none" stroke={SEA.shellHi} strokeOpacity="0.55" strokeWidth="1.3" strokeLinecap="round" />

      {/* Per-ailment atmosphere wash */}
      {cfg.wash && !isConfirming && (
        <motion.rect
          width="400" height="400"
          fill={cfg.wash}
          initial={{ opacity: 0 }}
          animate={{ opacity: cfg.washOp }}
          transition={{ duration: 0.8 }}
        />
      )}
    </>
  );
}

// Legacy SVG prototype kept temporarily for rollback while the image-backed Q7 stage is reviewed.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Q7PearlScene({ variant, isConfirming }: { variant: PearlVariant; isConfirming: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const pearlCfg = variant === 'idle' ? null : PEARL_CFG[variant];
  const frames = pearlCfg ? pearlCfg.frames : [PEARL_REST];
  const bodyFrames = frames.map(pearlD);

  const bodyTransition: Transition = isConfirming
    ? { duration: 0.55, ease: [0.3, 1.4, 0.5, 1] }
    : { duration: pearlCfg?.dur ?? 5, times: pearlCfg?.times, repeat: Infinity, ease: 'easeInOut' };
  const bodyAnimate = isConfirming
    ? { d: pearlD(PEARL_CURE) }
    : { d: bodyFrames.length > 1 ? bodyFrames : bodyFrames[0] };

  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`q7p-water-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={SEA.wTop} />
          <stop offset="55%" stopColor={SEA.wMid} />
          <stop offset="100%" stopColor={SEA.wBot} />
        </linearGradient>
        <linearGradient id={`q7p-sandg-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={SEA.sand} />
          <stop offset="100%" stopColor={SEA.sandDark} />
        </linearGradient>
        <radialGradient id={`q7p-dome-${uid}`} cx="38%" cy="26%" r="80%">
          <stop offset="0%" stopColor={SEA.shellHi} />
          <stop offset="48%" stopColor={SEA.shellMid} />
          <stop offset="100%" stopColor={SEA.shellLo} />
        </radialGradient>
        <linearGradient id={`q7p-fang-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={SEA.shellMid} />
          <stop offset="100%" stopColor={SEA.shellLo} />
        </linearGradient>
        <linearGradient id={`q7p-cupg-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={SEA.shellMid} />
          <stop offset="100%" stopColor={SEA.shellLo} />
        </linearGradient>
        {pearlCfg && (
          <radialGradient id={`q7p-pearlg-${uid}`} cx="36%" cy="28%" r="78%">
            <stop offset="0%" stopColor={pearlCfg.hi} />
            <stop offset="42%" stopColor={pearlCfg.mid} />
            <stop offset="100%" stopColor={pearlCfg.lo} />
          </radialGradient>
        )}
        <radialGradient id={`q7p-cureg-${uid}`} cx="36%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="42%" stopColor="#ece2d0" />
          <stop offset="100%" stopColor="#b9ab90" />
        </radialGradient>
        <radialGradient id={`q7p-halo-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={SEA.glow} stopOpacity="0.8" />
          <stop offset="45%" stopColor={SEA.glow} stopOpacity="0.3" />
          <stop offset="100%" stopColor={SEA.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`q7p-vig-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="74%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
        </radialGradient>
        <linearGradient id={`q7p-sheen-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`q7p-irid-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#fff6d8" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </linearGradient>
        <filter id={`q7p-b10-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`q7p-b6-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={`q7p-b3-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <clipPath id={`q7p-clip-${uid}`}>
          <motion.path d={bodyFrames[0]} initial={false} animate={bodyAnimate} transition={bodyTransition} />
        </clipPath>
      </defs>

      <SeaStage uid={uid} confirming={isConfirming} />

      {variant === 'idle' ? (
        <ClosedShell uid={uid} />
      ) : (
        <OpenShellPearl uid={uid} variant={variant} isConfirming={isConfirming} />
      )}

      {/* Marine snow + ambient bubbles over everything */}
      {SNOW_SPOTS.map(([cx, cy, sdur, sdelay]) => (
        <SnowMote key={`snow-${cx}-${cy}`} cx={cx} cy={cy} dur={sdur} delay={sdelay} />
      ))}
      <Bubble cx={184} cy={280} dur={7} delay={1.2} />
      <Bubble cx={222} cy={284} dur={8} delay={4.6} />
    </svg>
  );
}

export default function EmotionStageMotif({
  questionId,
  previewId,
  isConfirming = false,
}: EmotionStageMotifProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      {questionId === 'q3' && (
        <AnimatePresence mode="wait">
          <Q3SkinAura key="q3-aura" previewId={previewId} isConfirming={isConfirming} />
        </AnimatePresence>
      )}

      {questionId === 'q7' && (
        <AnimatePresence mode="wait">
          <motion.div
            key={previewId ?? 'idle'}
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            <ShellConcernStage
              variant={(previewId ?? 'idle') as 'idle' | 'A' | 'B' | 'C' | 'D'}
              isConfirming={isConfirming}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
