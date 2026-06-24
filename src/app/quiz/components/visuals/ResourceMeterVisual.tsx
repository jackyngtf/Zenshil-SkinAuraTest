'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import RelaxScene from './q04/RelaxScene';
import GymScene from './q04/GymScene';
import SleepScene from './q04/SleepScene';
import StudyScene from './q04/StudyScene';

export type ResourceMeterOptionId = 'A' | 'B' | 'C' | 'D';

type ResourceVisualState = {
  aura: string;
  auraSoft: string;
  accent: string;
  accentSoft: string;
};

const visualStates: Record<ResourceMeterOptionId | 'idle', ResourceVisualState> = {
  idle: {
    aura: '#e9ded4',
    auraSoft: '#dbe9e6',
    accent: '#b8a895',
    accentSoft: '#efe8df',
  },
  A: {
    // A「睡眠」is a full SVG moonlit-bedroom scene (SleepScene) — no base photo.
    aura: '#b8c3ed',
    auraSoft: '#d9e6fb',
    accent: '#7b86b2',
    accentSoft: '#eef0ff',
  },
  B: {
    // B「放鬆」is a full SVG spa-candle scene (RelaxScene) — no base photo.
    aura: '#e9aab7',
    auraSoft: '#f7d8d7',
    accent: '#bd7084',
    accentSoft: '#fff0ee',
  },
  C: {
    // C「時間」is a full SVG cyan-dusk study scene (StudyScene) — no base photo.
    aura: '#a9dced',
    auraSoft: '#d7edf2',
    accent: '#6faabd',
    accentSoft: '#edfaff',
  },
  D: {
    // D「能量」is a full SVG gym-room scene (GymScene) — no base photo.
    aura: '#f2c75f',
    auraSoft: '#fff0bf',
    accent: '#c99432',
    accentSoft: '#fff6dc',
  },
};

function getOptionId(optionId: ResourceMeterOptionId | null): ResourceMeterOptionId | 'idle' {
  return optionId ?? 'idle';
}

function AmbientBackdrop({
  state,
  reduceMotion,
}: {
  state: ResourceVisualState;
  reduceMotion: boolean;
}) {
  return (
    <>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${state.aura}44 0%, transparent 68%)`,
        }}
        animate={reduceMotion ? undefined : { scale: [0.98, 1.08, 0.98], opacity: [0.42, 0.72, 0.42] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[46%] top-[52%] h-[82%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${state.auraSoft}5c 0%, transparent 70%)`,
        }}
        animate={reduceMotion ? undefined : { x: [-5, 7, -5], y: [4, -6, 4], opacity: [0.36, 0.58, 0.36] }}
        transition={{ duration: 9.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}

function IdleLayer({
  state,
  reduceMotion,
}: {
  state: ResourceVisualState;
  reduceMotion: boolean;
}) {
  return (
    <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="resource-idle-orb" cx="50%" cy="43%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="56%" stopColor={state.accentSoft} stopOpacity="0.7" />
          <stop offset="100%" stopColor={state.auraSoft} stopOpacity="0.12" />
        </radialGradient>
        <filter id="resource-idle-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>
      <motion.circle
        cx="200"
        cy="142"
        r="82"
        fill={state.aura}
        opacity="0.18"
        filter="url(#resource-idle-blur)"
        animate={reduceMotion ? undefined : { scale: [0.96, 1.06, 0.96], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 7.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 142px' }}
      />
      <motion.circle
        cx="200"
        cy="142"
        r="64"
        fill="url(#resource-idle-orb)"
        opacity="0.84"
        animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 142px' }}
      />
      {[118, 150, 184].map((y, index) => (
        <motion.path
          key={y}
          d={`M108 ${y} C144 ${y - 7}, 176 ${y + 5}, 208 ${y - 2} S260 ${y + 6}, 292 ${y - 5}`}
          fill="none"
          stroke={index === 1 ? state.accent : '#ffffff'}
          strokeLinecap="round"
          strokeWidth={index === 1 ? 1.2 : 1}
          opacity={index === 1 ? 0.22 : 0.32}
          animate={reduceMotion ? undefined : { x: [-5, 6, -5], opacity: [0.14, 0.32, 0.14] }}
          transition={{ duration: 6 + index * 0.9, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

export default function ResourceMeterVisual({
  selectedOptionId,
  isConfirming = false,
}: {
  selectedOptionId: ResourceMeterOptionId | null;
  isConfirming?: boolean;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const optionId = getOptionId(selectedOptionId);
  const state = visualStates[optionId];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-visible" aria-hidden="true">
      <AmbientBackdrop state={state} reduceMotion={reduceMotion} />

      <AnimatePresence mode="wait">
        <motion.div
          key={optionId}
          className="relative flex h-full w-full flex-col items-center justify-center"
          initial={{ opacity: 0, y: 8, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: isConfirming ? 1.012 : 1 }}
          exit={{ opacity: 0, y: -8, scale: 1.01 }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-[min(86vw,330px)] w-[min(92vw,350px)] overflow-visible">
            <motion.div
              className="absolute inset-[-5%] rounded-[42%] blur-2xl"
              style={{
                background: `radial-gradient(ellipse at center, ${state.accentSoft}99 0%, transparent 72%)`,
              }}
              animate={reduceMotion ? undefined : { scale: [0.98, 1.035, 0.98], opacity: [0.38, 0.62, 0.38] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {optionId === 'A' || optionId === 'B' || optionId === 'C' || optionId === 'D' ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="skin-aura-orb-clip relative h-[min(80vw,300px)] w-[min(80vw,300px)]">
                  {optionId === 'A' ? (
                    <SleepScene isConfirming={isConfirming} />
                  ) : optionId === 'B' ? (
                    <RelaxScene isConfirming={isConfirming} />
                  ) : optionId === 'C' ? (
                    <StudyScene isConfirming={isConfirming} />
                  ) : (
                    <GymScene isConfirming={isConfirming} />
                  )}
                </div>
              </div>
            ) : (
              <IdleLayer state={state} reduceMotion={reduceMotion} />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
