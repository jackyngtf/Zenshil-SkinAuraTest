'use client';

import { motion } from 'framer-motion';
import { loop } from '../ritualShared';
import { ROOM, BED_RIDGE, sn } from './spaRoom';
import type { SpaPartProps } from './spaRoom';

/* ================================================================== */
/*  Q10·B「暖調 SPA 鬆弛室」— focal still-life on the linen ridge.        */
/*  Three ritual objects resting at y≈BED_RIDGE (286) in the           */
/*  CENTER-LEFT zone (x≈130–245, clear of the towels @252–335):        */
/*    • a slim VASE behind-left (~x146) holding a cherry-blossom sprig */
/*    • a LIT CANDLE in a ribbed glass holder (~x186) — the cosy light */
/*    • a small ceramic BOWL (~x222) breathing STEAM — the HERO motion */
/*  Lit from the UPPER-LEFT (dawn): highlights upper-left, soft shadow */
/*  lower-right. Renders a single <g> (defs inside) so it composites   */
/*  into RitualSpaScene without an extra <svg>. Only opacity/transform */
/*  /d ever animate — never filter attributes.                         */
/* ================================================================== */

export default function SpaStillLife({ uid, isConfirming, reduceMotion }: SpaPartProps) {
  const ns = (name: string) => `q10-spaSL-${name}-${uid}`;
  const url = (name: string) => `url(#${ns(name)})`;

  /* Shared one-shot confirm timing (steam swell + flame flare). */
  const confirmShot = { duration: 0.5, ease: 'easeOut' as const };

  /* ── HERO: two steam ribbons rising from the bowl mouth (~y268) up to
        ~y150. Each is a 3-frame d-morph where first===last so the loop is
        seamless; the middle frame leans the wisp the other way. Desynced
        durations/delays keep them out of phase. On confirm the whole steam
        group swells (scale + lift) via the wrapping <motion.g>. ── */
  const steam1: string[] = [
    'M216 268 C208 244 226 224 216 198 C208 176 222 168 217 150',
    'M216 268 C224 244 208 224 220 198 C230 176 214 168 221 150',
    'M216 268 C208 244 226 224 216 198 C208 176 222 168 217 150',
  ];
  const steam2: string[] = [
    'M228 268 C236 244 220 226 230 202 C238 182 226 172 231 154',
    'M228 268 C220 244 238 226 226 202 C216 182 230 172 223 154',
    'M228 268 C236 244 220 226 230 202 C238 182 226 172 231 154',
  ];

  /* Flame flicker — opacity+scale loop, fast-ish but calm (~3s). On confirm
     the flame flares brighter and a touch taller. */
  const flameAnim = isConfirming
    ? { opacity: 0.96, scaleY: 1.22, scaleX: 1.06 }
    : reduceMotion
      ? { opacity: 0.8, scaleY: 1, scaleX: 1 }
      : { opacity: [0.78, 0.96, 0.82, 0.92, 0.78], scaleY: [1, 1.08, 0.97, 1.04, 1], scaleX: [1, 0.96, 1.03, 0.98, 1] };
  const flameTrans = isConfirming ? confirmShot : loop(reduceMotion, 3.1);

  /* Warm glow halo around the flame — gentle pulse, flares on confirm. */
  const glowAnim = isConfirming
    ? { opacity: 0.85 }
    : reduceMotion
      ? { opacity: 0.4 }
      : { opacity: [0.3, 0.52, 0.3] };
  const glowTrans = isConfirming ? confirmShot : loop(reduceMotion, 3.7, 0.4);

  return (
    <g>
      <defs>
        {/* Glass candle holder — warm ivory, lit upper-left. */}
        <linearGradient id={ns('glass')} x1="14%" y1="6%" x2="92%" y2="100%">
          <stop offset="0%" stopColor={ROOM.fieldHi} stopOpacity="0.95" />
          <stop offset="52%" stopColor={ROOM.fieldMid} stopOpacity="0.92" />
          <stop offset="100%" stopColor={ROOM.fieldLo} stopOpacity="0.95" />
        </linearGradient>
        {/* Flame body — hot core fading to warm tip. */}
        <radialGradient id={ns('flame')} cx="50%" cy="64%" r="58%">
          <stop offset="0%" stopColor="#fff6e2" />
          <stop offset="42%" stopColor={ROOM.flame} />
          <stop offset="100%" stopColor={ROOM.candleGlow} stopOpacity="0.2" />
        </radialGradient>
        {/* Warm glow halo bleeding from the flame. */}
        <radialGradient id={ns('glow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ROOM.candleGlow} stopOpacity="0.95" />
          <stop offset="46%" stopColor={ROOM.candleGlow} stopOpacity="0.4" />
          <stop offset="100%" stopColor={ROOM.candleGlow} stopOpacity="0" />
        </radialGradient>
        {/* Ceramic bowl/diffuser — light upper-left → shadow lower-right. */}
        <radialGradient id={ns('bowl')} cx="34%" cy="22%" r="92%">
          <stop offset="0%" stopColor={ROOM.fieldHi} />
          <stop offset="50%" stopColor={ROOM.fieldMid} />
          <stop offset="100%" stopColor={ROOM.fieldLo} />
        </radialGradient>
        {/* Slim vase — same ceramic family, slightly cooler greige. */}
        <linearGradient id={ns('vase')} x1="18%" y1="4%" x2="88%" y2="100%">
          <stop offset="0%" stopColor={ROOM.blanket} />
          <stop offset="60%" stopColor={ROOM.vase} />
          <stop offset="100%" stopColor={ROOM.blanketLo} />
        </linearGradient>
        {/* Vertical fade applied to the steam so wisps dissolve as they rise.
            userSpaceOnUse so it spans the bowl mouth (~268) up to ~146. */}
        <linearGradient id={ns('steam')} gradientUnits="userSpaceOnUse" x1="222" y1="274" x2="222" y2="146">
          <stop offset="0%" stopColor={ROOM.steam} stopOpacity="0" />
          <stop offset="26%" stopColor={ROOM.steam} stopOpacity="0.62" />
          <stop offset="70%" stopColor={ROOM.steam} stopOpacity="0.3" />
          <stop offset="100%" stopColor={ROOM.steam} stopOpacity="0" />
        </linearGradient>
        {/* Blur passes — each stdDeviation defined exactly once. */}
        <filter id={ns('b2')} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={ns('b5')} x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id={ns('b12')} x="-140%" y="-140%" width="380%" height="380%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* ── Contact shadows on the linen ridge (y≈BED_RIDGE), lower-right
            bias so each object sits ON the linen, not floating. Static. ── */}
      <g filter={url('b5')} opacity={0.16}>
        <ellipse cx={154} cy={BED_RIDGE + 2} rx={20} ry={6} fill={ROOM.deep} />
        <ellipse cx={190} cy={BED_RIDGE + 2} rx={22} ry={6.5} fill={ROOM.deep} />
        <ellipse cx={226} cy={BED_RIDGE + 2} rx={19} ry={6} fill={ROOM.deep} />
      </g>

      {/* ════ VASE + CHERRY-BLOSSOM SPRIG (behind-left, ~x146) ════
            Slim tapered vase y266–286; a thin stem rises to ~y186 with a
            few soft 5-petal blossoms. Drawn first so it sits behind the
            candle. */}
      <g>
        {/* Vase body: narrow neck flaring to a soft foot. */}
        <path
          d={
            `M139 286 C137 274 139 270 140 266 ` +
            `C141 262 151 262 152 266 ` +
            `C153 270 155 274 153 286 Z`
          }
          fill={url('vase')}
        />
        {/* Thin ivory rim-light down the lit (left) edge. */}
        <path
          d="M140.5 268 C139.6 273 139.4 279 140 285"
          fill="none"
          stroke={ROOM.blanket}
          strokeWidth={1}
          strokeLinecap="round"
          opacity={0.6}
        />
        {/* Stem rising from the vase mouth up to ~y186, leaning gently right. */}
        <path
          d="M146 268 C147 240 150 214 152 188"
          fill="none"
          stroke={ROOM.gold}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.55}
        />
        {/* A short side twig for a second blossom cluster. */}
        <path
          d="M148 226 C153 220 158 216 163 212"
          fill="none"
          stroke={ROOM.gold}
          strokeWidth={1.1}
          strokeLinecap="round"
          opacity={0.5}
        />
        {/* 4 blossoms — each a ring of 5 soft petals + a deeper centre.
            Kept sparse and small (r≈4.2) so the sprig stays calm. */}
        <Blossom cx={152} cy={186} r={4.6} petal={ROOM.blossom} deep={ROOM.blossomDeep} />
        <Blossom cx={164} cy={210} r={4.2} petal={ROOM.blossom} deep={ROOM.blossomDeep} />
        <Blossom cx={141} cy={206} r={3.8} petal={ROOM.blossom} deep={ROOM.blossomDeep} />
        <Blossom cx={155} cy={228} r={3.6} petal={ROOM.blossom} deep={ROOM.blossomDeep} />
      </g>

      {/* ════ STEAMING BOWL (right of centre, ~x222) ════
            Shallow ceramic bowl y268–286; steam (HERO) rises from its
            mouth. */}
      <g>
        {/* Bowl body — a shallow rounded vessel. */}
        <path
          d="M204 270 C204 284 216 290 222 290 C228 290 240 284 240 270 C232 266 212 266 204 270 Z"
          fill={url('bowl')}
        />
        {/* Inner mouth shadow (the rim catches light, the cavity dips dark). */}
        <ellipse cx={222} cy={270} rx={18} ry={4.4} fill={ROOM.deep} opacity={0.16} />
        {/* Lit rim-light along the upper-left lip. */}
        <path
          d="M206 269 C212 266.5 222 266 230 267"
          fill="none"
          stroke={ROOM.fieldHi}
          strokeWidth={1.4}
          strokeLinecap="round"
          opacity={0.7}
        />
      </g>

      {/* ── HERO: steam ribbons. The wrapping group swells/lifts on confirm;
            each ribbon morphs its own d on a desynced loop. The vertical
            fade gradient dissolves them as they climb. ── */}
      <motion.g
        initial={false}
        animate={isConfirming ? { scale: 1.12, y: -6, opacity: 1 } : { scale: 1, y: 0, opacity: 1 }}
        transition={isConfirming ? confirmShot : { duration: 0.4 }}
        style={{ transformOrigin: '222px 268px' }}
        stroke={url('steam')}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
        filter={url('b2')}
      >
        <motion.path
          d={steam1[0]}
          initial={false}
          animate={
            isConfirming
              ? { opacity: [0.4, 0.78, 0.5] }
              : reduceMotion
                ? { opacity: 0.4 }
                : { d: steam1, opacity: [0.28, 0.5, 0.28] }
          }
          transition={
            isConfirming
              ? confirmShot
              : { duration: 6.6, repeat: Infinity, ease: 'easeInOut', delay: 0 }
          }
        />
        <motion.path
          d={steam2[0]}
          initial={false}
          animate={
            isConfirming
              ? { opacity: [0.34, 0.7, 0.44] }
              : reduceMotion
                ? { opacity: 0.34 }
                : { d: steam2, opacity: [0.22, 0.44, 0.22] }
          }
          transition={
            isConfirming
              ? confirmShot
              : { duration: 7.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }
          }
        />
      </motion.g>

      {/* ════ LIT CANDLE in a ribbed glass holder (centre, ~x186) ════ */}
      {/* Warm glow halo — sits behind the flame, widest, pulsing. */}
      <motion.ellipse
        cx={186}
        cy={250}
        rx={34}
        ry={40}
        fill={url('glow')}
        filter={url('b12')}
        initial={false}
        animate={glowAnim}
        transition={glowTrans}
      />

      {/* Glass holder body y260–286, gently barrel-shaped. */}
      <path
        d="M173 286 C171 276 171 268 173 260 C179 257 193 257 199 260 C201 268 201 276 199 286 Z"
        fill={url('glass')}
      />
      {/* Ribbing — three faint vertical flutes catching the upper-left light. */}
      <g stroke={ROOM.gold} strokeWidth={0.9} opacity={0.22} strokeLinecap="round" fill="none">
        <path d="M180 262 L179 284" />
        <path d="M186 261 L186 285" />
        <path d="M192 262 L193 284" />
      </g>
      {/* Lit ivory rim down the left edge of the glass. */}
      <path
        d="M174 262 C172.4 270 172.4 278 174 285"
        fill="none"
        stroke={ROOM.fieldHi}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.75}
      />
      {/* Molten-wax glow pooling at the top of the holder. */}
      <ellipse cx={186} cy={261} rx={12} ry={3.2} fill={ROOM.candleGlow} opacity={0.5} />

      {/* Flame — teardrop, anchored at the wick (~y260) so scaleY grows it
          upward toward ~y244. transformOrigin at the base keeps the flicker
          rooted. */}
      <motion.path
        d="M186 261 C181 255 182 249 186 244 C190 249 191 255 186 261 Z"
        fill={url('flame')}
        initial={false}
        animate={flameAnim}
        transition={flameTrans}
        style={{ transformOrigin: '186px 261px' }}
      />
      {/* Hot inner tongue of the flame. */}
      <motion.path
        d="M186 259 C183.5 255 184 251 186 248 C188 251 188.5 255 186 259 Z"
        fill="#fffaf0"
        opacity={0.85}
        initial={false}
        animate={
          isConfirming
            ? { opacity: 0.95, scaleY: 1.18 }
            : reduceMotion
              ? { opacity: 0.8 }
              : { opacity: [0.7, 0.92, 0.7], scaleY: [1, 1.06, 1] }
        }
        transition={isConfirming ? confirmShot : loop(reduceMotion, 2.6, 0.2)}
        style={{ transformOrigin: '186px 259px' }}
      />
    </g>
  );
}

/* ── Cherry blossom: 5 soft petals around a deeper centre. A small,
      static, deterministic flower (no per-instance animation — the sprig
      reads as calm). Petals are placed at 72° steps starting from the top. */
function Blossom({
  cx,
  cy,
  r,
  petal,
  deep,
}: {
  cx: number;
  cy: number;
  r: number;
  petal: string;
  deep: string;
}) {
  /* Petal centres on a ring at radius r; each petal a small ellipse pointing
     outward (rotated to face its angle). */
  const petals = [0, 1, 2, 3, 4].map((i) => {
    const a = -90 + i * 72; // degrees, first petal points up
    const rad = (a * Math.PI) / 180;
    const px = sn(cx + Math.cos(rad) * r * 0.7);
    const py = sn(cy + Math.sin(rad) * r * 0.7);
    return { px, py, rot: sn(a + 90) };
  });
  return (
    <g>
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx={p.px}
          cy={p.py}
          rx={sn(r * 0.5)}
          ry={sn(r * 0.78)}
          fill={petal}
          opacity={0.92}
          transform={`rotate(${p.rot} ${p.px} ${p.py})`}
        />
      ))}
      <circle cx={sn(cx)} cy={sn(cy)} r={sn(r * 0.32)} fill={deep} opacity={0.85} />
    </g>
  );
}
