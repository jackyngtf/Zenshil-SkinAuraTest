'use client';

import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnswerOptionGrid from '../AnswerOptionGrid';
import { useQuizStore } from '@/store/useQuizStore';
import { useDoubleTapSelection } from '../useDoubleTapSelection';
import type { QuizInteractionProps } from '../types';
import WeatherStageMotif from '../visuals/WeatherStageMotif';

/* ------------------------------------------------------------------ */
/*  Q2 Specific visual configuration (Must remain unchanged)          */
/* ------------------------------------------------------------------ */
type WeatherOption = {
  bgGradient: string;
  auraTint: string;
  auraSecondary: string;
  buttonBorder: string;
  buttonActiveBg: string;
  rippleColor: string;
  label: string;
  labelCn: string;
};

const weatherOptions: Record<string, WeatherOption> = {
  A: {
    bgGradient: 'from-slate-100/60 via-blue-50/40 to-violet-50/30',
    auraTint: 'rgba(200, 210, 230, 0.45)',
    auraSecondary: 'rgba(180, 190, 220, 0.3)',
    buttonBorder: 'border-slate-300/60',
    buttonActiveBg: 'bg-slate-100/70',
    rippleColor: 'rgba(203,213,225,0.8)',
    label: 'Cloud Veil',
    labelCn: '陰天',
  },
  B: {
    bgGradient: 'from-stone-100/60 via-rose-50/40 to-violet-100/30',
    auraTint: 'rgba(200, 160, 180, 0.45)',
    auraSecondary: 'rgba(180, 140, 170, 0.3)',
    buttonBorder: 'border-rose-300/60',
    buttonActiveBg: 'bg-rose-50/70',
    rippleColor: 'rgba(251,207,232,0.8)',
    label: 'Humid Pressure',
    labelCn: '悶熱暴風雨',
  },
  C: {
    bgGradient: 'from-amber-50/60 via-stone-50/40 to-rose-50/30',
    auraTint: 'rgba(210, 185, 150, 0.45)',
    auraSecondary: 'rgba(200, 175, 140, 0.3)',
    buttonBorder: 'border-amber-300/60',
    buttonActiveBg: 'bg-amber-50/70',
    rippleColor: 'rgba(254,243,199,0.85)',
    label: 'Dry Texture',
    labelCn: '乾燥秋天',
  },
  D: {
    bgGradient: 'from-yellow-50/60 via-rose-50/40 to-white/30',
    auraTint: 'rgba(230, 210, 170, 0.5)',
    auraSecondary: 'rgba(210, 190, 160, 0.35)',
    buttonBorder: 'border-yellow-400/60',
    buttonActiveBg: 'bg-yellow-50/70',
    rippleColor: 'rgba(254,249,195,0.85)',
    label: 'Morning Light',
    labelCn: '清晨陽光',
  },
};

/* ------------------------------------------------------------------ */
/*  Q8 Theme mapping based on auraMapping                             */
/* ------------------------------------------------------------------ */
type AuraTheme = {
  bgGradient: string;
  auraTint: string;
  auraSecondary: string;
  buttonBorder: string;
  buttonActiveBg: string;
  rippleColor: string;
};

const auraThemes: Record<string, AuraTheme> = {
  late_night: { // Q8 A 捱夜 — soft dusty blue-violet
    bgGradient: 'from-indigo-50/55 via-violet-50/40 to-slate-50/30',
    auraTint: 'rgba(154, 151, 189, 0.4)',
    auraSecondary: 'rgba(188, 184, 216, 0.28)',
    buttonBorder: 'border-violet-300/50',
    buttonActiveBg: 'bg-violet-100/40',
    rippleColor: 'rgba(188,184,216,0.72)',
  },
  stress: { // Q8 B 情緒 — mauve / blush
    bgGradient: 'from-pink-50/55 via-fuchsia-50/35 to-rose-50/30',
    auraTint: 'rgba(215, 166, 195, 0.4)',
    auraSecondary: 'rgba(238, 203, 216, 0.3)',
    buttonBorder: 'border-pink-300/50',
    buttonActiveBg: 'bg-pink-100/45',
    rippleColor: 'rgba(238,203,216,0.75)',
  },
  burnout: { // Q8 C 壓力 — cool grey-purple / blue-grey / beige
    bgGradient: 'from-slate-100/55 via-violet-50/35 to-stone-100/30',
    auraTint: 'rgba(167, 164, 189, 0.42)',
    auraSecondary: 'rgba(189, 183, 196, 0.3)',
    buttonBorder: 'border-slate-300/55',
    buttonActiveBg: 'bg-slate-100/50',
    rippleColor: 'rgba(189,183,196,0.7)',
  },
  recovery: { // Q8 D 飲食 — warm amber / peach
    bgGradient: 'from-amber-50/55 via-orange-50/35 to-rose-50/25',
    auraTint: 'rgba(233, 180, 134, 0.42)',
    auraSecondary: 'rgba(243, 209, 168, 0.3)',
    buttonBorder: 'border-amber-300/55',
    buttonActiveBg: 'bg-amber-100/50',
    rippleColor: 'rgba(243,209,168,0.75)',
  },
};


export default function WeatherStageQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const { previewId, confirmedId, handleOptionTap } = useDoubleTapSelection({ onSelect });

  const isQ2 = question.id === 'q2';
  
  const selectedOption = question.options.find(o => o.id === previewId);
  const q2Visual = previewId ? weatherOptions[previewId] : null;
  const q8Theme = selectedOption?.auraMapping && auraThemes[selectedOption.auraMapping] 
    ? auraThemes[selectedOption.auraMapping] 
    : auraThemes['late_night'];

  const bgGradient = isQ2 
    ? (q2Visual?.bgGradient ?? 'from-stone-50 to-stone-100/50')
    : (previewId ? q8Theme.bgGradient : 'from-stone-50 to-stone-100/50');
    
  const auraTint = isQ2 
    ? (q2Visual?.auraTint ?? 'rgba(200, 190, 210, 0.3)')
    : (previewId ? q8Theme.auraTint : 'rgba(200, 190, 210, 0.3)');
    
  const auraSecondary = isQ2 
    ? (q2Visual?.auraSecondary ?? 'rgba(210, 200, 220, 0.2)')
    : (previewId ? q8Theme.auraSecondary : 'rgba(210, 200, 220, 0.2)');

  const handleGridTap = (event: MouseEvent<HTMLButtonElement>) => {
    const optionId = event.currentTarget.dataset.optionId;
    if (optionId) handleOptionTap(optionId, event);
  };

  return (
    <div
      className="app-screen relative flex flex-col overflow-hidden"
      aria-labelledby={`question-${question.id}`}
    >
      <div className="h-[140px] sm:h-[150px] shrink-0 pointer-events-none" />

      {/* BACKGROUND GRADIENT TINT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={previewId ?? 'neutral'}
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${bgGradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1] opacity-[0.06]" />

      {/* CENTRAL GLASS SQUIRCLE CONTAINER */}
      <div className="relative z-[2] flex flex-1 min-h-0 flex-col items-center justify-center px-6 py-2">
        {/* Outer aura glow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={previewId ?? 'idle'}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '85vw', height: '85vw', maxWidth: '360px', maxHeight: '360px',
                background: `radial-gradient(ellipse at center, ${auraTint} 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '95vw', height: '95vw', maxWidth: '400px', maxHeight: '400px',
                background: `radial-gradient(ellipse at center, ${auraSecondary} 0%, transparent 65%)`,
              }}
              animate={{ scale: [1.05, 0.95, 1.05], rotate: [0, 8, 0], opacity: [0.4, 0.65, 0.4] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft aura mask container */}
        <div
          className="skin-aura-orb-clip relative flex-shrink-0"
          style={{
            height: '100%', width: '100%', maxWidth: '280px', maxHeight: '280px', aspectRatio: '1 / 1',
          }}
        >
          <WeatherStageMotif questionId={question.id} previewId={previewId} isConfirming={confirmedId !== null} />

          <AnimatePresence>
            {confirmedId && (
              <motion.div
                className="absolute inset-0 z-30 bg-white/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </div>


      </div>

      <AnswerOptionGrid
        options={question.options}
        language={language}
        previewId={previewId}
        confirmedId={confirmedId}
        onOptionTap={handleGridTap}
        className="relative z-[5] px-5 pb-[max(4vh,env(safe-area-inset-bottom))] pt-2"
        animationDelay={0.3}
        getOptionStyle={(option) => {
          if (isQ2) {
            const visual = weatherOptions[option.id] ?? weatherOptions.A;
            return {
              activeClassName: `${visual.buttonActiveBg} ${visual.buttonBorder} -translate-y-px shadow-[0_4px_20px_rgba(0,0,0,0.05)]`,
              inactiveClassName: 'border-stone-200/40 bg-white/55 shadow-[0_2px_10px_rgba(0,0,0,0.02)]',
              badgeActiveClassName: 'border-stone-800 bg-stone-800 font-semibold text-white shadow-[0_2px_8px_rgba(28,25,23,0.16)]',
              badgeInactiveClassName: 'border-stone-300/70 bg-stone-50/85 text-stone-500 shadow-[0_1px_4px_rgba(28,25,23,0.04)]',
              rippleColor: visual.rippleColor,
            };
          }

          const theme = option.auraMapping && auraThemes[option.auraMapping]
            ? auraThemes[option.auraMapping]
            : auraThemes['late_night'];

          return {
            activeClassName: `${theme.buttonActiveBg} ${theme.buttonBorder} -translate-y-px shadow-[0_4px_20px_rgba(0,0,0,0.05)]`,
            inactiveClassName: 'border-stone-200/40 bg-white/55 shadow-[0_2px_10px_rgba(0,0,0,0.02)]',
            badgeActiveClassName: 'border-stone-800 bg-stone-800 font-semibold text-white shadow-[0_2px_8px_rgba(28,25,23,0.16)]',
            badgeInactiveClassName: 'border-stone-300/70 bg-stone-50/85 text-stone-500 shadow-[0_1px_4px_rgba(28,25,23,0.04)]',
            rippleColor: theme.rippleColor,
          };
        }}
      />
    </div>
  );
}
