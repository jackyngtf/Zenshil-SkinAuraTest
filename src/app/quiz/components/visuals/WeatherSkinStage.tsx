'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type WeatherOptionId = 'A' | 'B' | 'C' | 'D';

type WeatherState = {
  label: string;
  subtitle: string;
  glow: string;
  membrane: string;
  edge: string;
  accent: string;
  haze: string;
};

type WeatherSkinStageProps = {
  selectedOptionId: string | null;
  confirmedOptionId: string | null;
};

const weatherStates: Record<WeatherOptionId | 'neutral', WeatherState> = {
  neutral: {
    label: 'Skin Weather',
    subtitle: 'neutral lens',
    glow: '#efe8f4',
    membrane: '#fffdfb',
    edge: '#eaded4',
    accent: '#d8cbe2',
    haze: 'rgba(239,232,244,0.38)',
  },
  A: {
    label: '陰天',
    subtitle: 'cloudy skin state',
    glow: '#c7d1dd',
    membrane: '#eef3f6',
    edge: '#b9c6d2',
    accent: '#8fa1b8',
    haze: 'rgba(203,213,225,0.54)',
  },
  B: {
    label: '悶熱暴風雨',
    subtitle: 'humid pressure',
    glow: '#d6a1ad',
    membrane: '#f4e6e5',
    edge: '#b896a5',
    accent: '#c77c8b',
    haze: 'rgba(251,207,232,0.52)',
  },
  C: {
    label: '乾燥秋天',
    subtitle: 'dry membrane',
    glow: '#e4c39a',
    membrane: '#fff2df',
    edge: '#d7b38d',
    accent: '#c79b62',
    haze: 'rgba(254,215,170,0.48)',
  },
  D: {
    label: '清晨陽光',
    subtitle: 'morning glow',
    glow: '#f6d47a',
    membrane: '#fff5e4',
    edge: '#e9c988',
    accent: '#e4c55f',
    haze: 'rgba(254,249,195,0.55)',
  },
};

const lensPath = 'M88 63 C88 35 111 20 139 20 L251 20 C279 20 302 35 302 63 L302 242 C302 282 274 306 235 306 L155 306 C116 306 88 282 88 242 Z';

function LensFrame({ state, reducedMotion }: { state: WeatherState; reducedMotion: boolean }) {
  return (
    <>
      <motion.path
        d={lensPath}
        fill={state.membrane}
        fillOpacity="0.42"
        stroke={state.edge}
        strokeWidth="1.3"
        initial={false}
        animate={{
          fill: state.membrane,
          stroke: state.edge,
          scale: reducedMotion ? 1 : [1, 1.012, 1],
        }}
        transition={{ duration: reducedMotion ? 0 : 7.4, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '195px 164px' }}
      />
      <path
        d="M112 65 C116 48 132 40 151 40 L248 40 C268 40 284 50 288 68"
        fill="none"
        stroke="rgba(255,255,255,0.78)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <motion.path
        d="M105 76 C116 42 142 30 181 30"
        fill="none"
        stroke="rgba(255,255,255,0.72)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.42"
        animate={{ opacity: reducedMotion ? 0.42 : [0.26, 0.54, 0.26], x: reducedMotion ? 0 : [-2, 4, -2] }}
        transition={{ duration: 6.5, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
      />
      <path
        d="M92 238 C118 270 151 285 196 285 C241 285 273 270 298 238"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </>
  );
}

function CloudyState({ state, reducedMotion }: { state: WeatherState; reducedMotion: boolean }) {
  return (
    <>
      {[112, 146, 181].map((y, index) => (
        <motion.path
          key={y}
          d={`M82 ${y} C126 ${y - 16}, 158 ${y + 13}, 198 ${y - 5} S265 ${y + 12}, 313 ${y - 10}`}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.7)'}
          strokeWidth={index === 1 ? 8 : 5}
          strokeLinecap="round"
          opacity={index === 1 ? 0.24 : 0.2}
          animate={{
            x: reducedMotion ? 0 : [-18, 16, -18],
            opacity: reducedMotion ? 0.22 : [0.13, 0.32, 0.13],
          }}
          transition={{ duration: 7 + index * 1.2, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      {[120, 165, 215, 258].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={205 + (index % 2) * 14}
          r={1.7}
          fill={state.accent}
          opacity="0.28"
          animate={{ y: reducedMotion ? 0 : [0, 20, 0], opacity: reducedMotion ? 0.2 : [0.1, 0.35, 0.1] }}
          transition={{ duration: 5.8 + index * 0.4, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}

function StormState({ state, reducedMotion }: { state: WeatherState; reducedMotion: boolean }) {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <motion.ellipse
          key={index}
          cx="195"
          cy="157"
          rx={62 + index * 30}
          ry={36 + index * 17}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.58)'}
          strokeWidth={index === 1 ? 1.6 : 1}
          opacity={0.2 + index * 0.06}
          animate={{
            rx: reducedMotion ? 68 + index * 28 : [58 + index * 28, 72 + index * 30, 58 + index * 28],
            ry: reducedMotion ? 38 + index * 17 : [32 + index * 15, 45 + index * 17, 32 + index * 15],
            rotate: reducedMotion ? 0 : [-2, 4, -2],
          }}
          transition={{ duration: 5.4 + index * 0.6, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '195px 157px' }}
        />
      ))}
      <motion.path
        d="M132 116 C166 90 224 88 257 124 C286 156 266 207 224 218 C176 231 130 201 129 157"
        fill="none"
        stroke={state.accent}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
        animate={{ rotate: reducedMotion ? 0 : [-3, 4, -3], opacity: reducedMotion ? 0.28 : [0.2, 0.42, 0.2] }}
        transition={{ duration: 7.4, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '195px 160px' }}
      />
      {[139, 171, 204, 238].map((x, index) => (
        <motion.path
          key={x}
          d={`M${x} 94 C${x - 10} 130, ${x + 13} 162, ${x - 2} 206`}
          fill="none"
          stroke={index === 2 ? 'rgba(255,244,230,0.62)' : 'rgba(176,151,165,0.44)'}
          strokeWidth={index === 2 ? 1.2 : 0.9}
          strokeLinecap="round"
          opacity="0.36"
          animate={{ pathLength: reducedMotion ? 0.8 : [0.2, 0.95, 0.2], opacity: reducedMotion ? 0.26 : [0.12, 0.42, 0.12] }}
          transition={{ duration: 4.6 + index * 0.45, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}

function DryState({ state, reducedMotion }: { state: WeatherState; reducedMotion: boolean }) {
  return (
    <>
      {[116, 145, 174, 203].map((y, index) => (
        <motion.path
          key={y}
          d={`M103 ${y} C143 ${y - 10}, 159 ${y + 13}, 198 ${y - 3} S260 ${y + 9}, 291 ${y - 8}`}
          fill="none"
          stroke={index % 2 === 0 ? state.accent : 'rgba(215,170,163,0.72)'}
          strokeWidth="0.95"
          strokeLinecap="round"
          opacity="0.42"
          animate={{
            scaleX: reducedMotion ? 1 : [0.96, 1.025, 0.96],
            opacity: reducedMotion ? 0.36 : [0.24, 0.52, 0.24],
          }}
          transition={{ duration: 5.8 + index * 0.4, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '195px 160px' }}
        />
      ))}
      {[
        'M146 101 C136 129 155 147 142 176 C134 195 146 218 137 238',
        'M205 96 C195 126 213 149 197 178 C185 200 204 219 194 244',
        'M257 126 C236 148 247 170 225 190 C211 203 218 226 204 242',
      ].map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(197,151,102,0.58)'}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.38"
          animate={{ pathLength: reducedMotion ? 0.85 : [0.55, 1, 0.55] }}
          transition={{ duration: 6.2 + index * 0.5, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.rect
        x="80"
        y="78"
        width="94"
        height="182"
        rx="47"
        fill="rgba(255,255,255,0.45)"
        opacity="0.15"
        animate={{ x: reducedMotion ? 142 : [80, 215, 80], opacity: reducedMotion ? 0.16 : [0.08, 0.26, 0.08] }}
        transition={{ duration: 8, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function MorningState({ state, reducedMotion }: { state: WeatherState; reducedMotion: boolean }) {
  return (
    <>
      <motion.circle
        cx="196"
        cy="143"
        r="42"
        fill="#fff6cc"
        opacity="0.64"
        animate={{
          r: reducedMotion ? 42 : [36, 48, 36],
          opacity: reducedMotion ? 0.58 : [0.48, 0.76, 0.48],
        }}
        transition={{ duration: 6, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
      />
      {[56, 76, 98].map((radius, index) => (
        <motion.path
          key={radius}
          d={`M${196 - radius} 180 A${radius} ${radius * 0.54} 0 0 1 ${196 + radius} 180`}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.76)'}
          strokeWidth={index === 1 ? 1.45 : 1}
          strokeLinecap="round"
          opacity={0.28 + index * 0.08}
          animate={{ y: reducedMotion ? 0 : [4, -5, 4], opacity: reducedMotion ? 0.34 : [0.2, 0.5, 0.2] }}
          transition={{ duration: 5.8 + index * 0.7, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      {[112, 138, 164, 226, 250, 278].map((x, index) => (
        <motion.circle
          key={x}
          cx={x}
          cy={224 - (index % 3) * 26}
          r={index % 2 === 0 ? 1.8 : 2.4}
          fill="rgba(255,249,230,0.9)"
          animate={{ y: reducedMotion ? 0 : [12, -18, 12], opacity: reducedMotion ? 0.4 : [0.12, 0.72, 0.12] }}
          transition={{ duration: 4.4 + index * 0.34, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.path
        d="M100 224 C139 199 166 216 200 196 C232 177 254 197 292 178"
        fill="none"
        stroke="rgba(255,255,255,0.82)"
        strokeWidth="2.3"
        strokeLinecap="round"
        opacity="0.48"
        animate={{ pathLength: reducedMotion ? 1 : [0.35, 1, 0.35], x: reducedMotion ? 0 : [-5, 7, -5] }}
        transition={{ duration: 6.8, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function NeutralState({ state, reducedMotion }: { state: WeatherState; reducedMotion: boolean }) {
  return (
    <>
      {[98, 139, 180].map((y, index) => (
        <motion.path
          key={y}
          d={`M108 ${y} C144 ${y - 14}, 168 ${y + 11}, 198 ${y - 4} S254 ${y + 8}, 286 ${y - 7}`}
          fill="none"
          stroke={index === 1 ? state.accent : 'rgba(255,255,255,0.72)'}
          strokeWidth={index === 1 ? 1.4 : 1}
          strokeLinecap="round"
          opacity="0.28"
          animate={{ x: reducedMotion ? 0 : [-6, 7, -6], opacity: reducedMotion ? 0.26 : [0.18, 0.36, 0.18] }}
          transition={{ duration: 6 + index * 0.8, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.circle
        cx="196"
        cy="161"
        r="54"
        fill="none"
        stroke={state.accent}
        strokeWidth="1"
        opacity="0.2"
        animate={{ r: reducedMotion ? 54 : [48, 60, 48], opacity: reducedMotion ? 0.2 : [0.12, 0.26, 0.12] }}
        transition={{ duration: 7.2, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function StageState({
  optionId,
  state,
  reducedMotion,
}: {
  optionId: WeatherOptionId | 'neutral';
  state: WeatherState;
  reducedMotion: boolean;
}) {
  if (optionId === 'A') return <CloudyState state={state} reducedMotion={reducedMotion} />;
  if (optionId === 'B') return <StormState state={state} reducedMotion={reducedMotion} />;
  if (optionId === 'C') return <DryState state={state} reducedMotion={reducedMotion} />;
  if (optionId === 'D') return <MorningState state={state} reducedMotion={reducedMotion} />;
  return <NeutralState state={state} reducedMotion={reducedMotion} />;
}

export default function WeatherSkinStage({
  selectedOptionId,
  confirmedOptionId,
}: WeatherSkinStageProps) {
  const reducedMotion = useReducedMotion();
  const optionId = selectedOptionId === 'A' || selectedOptionId === 'B' || selectedOptionId === 'C' || selectedOptionId === 'D'
    ? selectedOptionId
    : 'neutral';
  const state = weatherStates[optionId];
  const isConfirming = Boolean(confirmedOptionId);

  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <motion.div
        className="absolute inset-[-10%] rounded-[44%] blur-3xl"
        style={{ backgroundColor: state.haze }}
        initial={false}
        animate={{
          backgroundColor: state.haze,
          opacity: reducedMotion ? 0.42 : [0.28, 0.48, 0.28],
          scale: isConfirming ? 1.08 : reducedMotion ? 1 : [0.96, 1.04, 0.96],
        }}
        transition={{ duration: isConfirming ? 0.7 : 7.6, repeat: isConfirming || reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
      />

      <svg viewBox="0 0 390 330" className="relative h-full w-full overflow-visible">
        <defs>
          <radialGradient id="weather-skin-lens-core" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor={state.glow} stopOpacity="0.2" />
            <stop offset="100%" stopColor={state.membrane} stopOpacity="0.08" />
          </radialGradient>
          <linearGradient id="weather-skin-lens-surface" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.78" />
            <stop offset="48%" stopColor={state.glow} stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>
          <filter id="weather-skin-lens-blur" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="weather-skin-glass-soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.45" />
          </filter>
          <clipPath id="weather-skin-lens-clip">
            <path d={lensPath} />
          </clipPath>
        </defs>

        <motion.ellipse
          cx="195"
          cy="167"
          rx="170"
          ry="126"
          fill={state.glow}
          opacity="0.22"
          filter="url(#weather-skin-lens-blur)"
          initial={false}
          animate={{
            fill: state.glow,
            opacity: isConfirming ? 0.34 : reducedMotion ? 0.22 : [0.16, 0.28, 0.16],
            scale: isConfirming ? 1.08 : reducedMotion ? 1 : [0.98, 1.03, 0.98],
          }}
          transition={{ duration: isConfirming ? 0.7 : 7.2, repeat: isConfirming || reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '195px 167px' }}
        />

        <LensFrame state={state} reducedMotion={Boolean(reducedMotion)} />
        <path d={lensPath} fill="url(#weather-skin-lens-core)" opacity="0.58" filter="url(#weather-skin-glass-soften)" />

        <g clipPath="url(#weather-skin-lens-clip)">
          <motion.rect
            x="72"
            y="20"
            width="246"
            height="286"
            fill="url(#weather-skin-lens-surface)"
            opacity="0.42"
            initial={false}
            animate={{ fill: 'url(#weather-skin-lens-surface)', opacity: isConfirming ? 0.52 : 0.42 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          <AnimatePresence mode="wait">
            <motion.g
              key={optionId}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.72, ease: 'easeInOut' }}
              style={{ transformOrigin: '195px 164px' }}
            >
              <StageState optionId={optionId} state={state} reducedMotion={Boolean(reducedMotion)} />
            </motion.g>
          </AnimatePresence>

          <motion.path
            d="M88 223 C128 196 158 212 196 190 C232 169 260 194 302 169 L302 306 L88 306 Z"
            fill="rgba(255,255,255,0.3)"
            opacity="0.36"
            animate={{ x: reducedMotion ? 0 : [-5, 6, -5], opacity: reducedMotion ? 0.34 : [0.24, 0.42, 0.24] }}
            transition={{ duration: 7.8, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
          />

          <motion.rect
            x="-40"
            y="28"
            width="86"
            height="258"
            rx="43"
            fill="rgba(255,255,255,0.46)"
            opacity="0.12"
            animate={{ x: reducedMotion ? 176 : [-40, 348], opacity: reducedMotion ? 0.1 : [0, 0.22, 0] }}
            transition={{ duration: 8.8, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
          />
        </g>

        <motion.path
          d={lensPath}
          fill="none"
          stroke={state.edge}
          strokeWidth="2"
          opacity="0.54"
          initial={false}
          animate={{ stroke: state.edge, opacity: isConfirming ? 0.82 : 0.54 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        <path
          d="M103 238 C128 278 158 292 195 292 C233 292 263 278 287 238"
          fill="none"
          stroke="rgba(255,255,255,0.58)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
