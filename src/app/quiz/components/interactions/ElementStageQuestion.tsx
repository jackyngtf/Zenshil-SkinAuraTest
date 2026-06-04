'use client';

import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnswerOptionGrid from '../AnswerOptionGrid';
import ElementStageMotif from '../visuals/ElementStageMotif';
import { useQuizStore } from '@/store/useQuizStore';
import { useDoubleTapSelection } from '../useDoubleTapSelection';
import type { QuizInteractionProps } from '../types';

/* ------------------------------------------------------------------ */
/*  Theme mapping for Q4 and Q6                                       */
/* ------------------------------------------------------------------ */
type ElementTheme = {
  bgGradient: string;
  buttonBorder: string;
  buttonActiveBg: string;
  rippleColor: string;
  auraTint: string;
  auraSecondary: string;
};

const elementThemes: Record<string, ElementTheme> = {
  late_night: { // Q4 A (Sleep), Q6 B (Irregular)
    bgGradient: 'from-blue-900/40 via-indigo-900/30 to-slate-900/40',
    buttonBorder: 'border-blue-300/40',
    buttonActiveBg: 'bg-blue-100/30',
    rippleColor: 'rgba(147,197,253,0.6)',
    auraTint: 'rgba(30, 58, 138, 0.45)',
    auraSecondary: 'rgba(15, 23, 42, 0.3)',
  },
  burnout: { // Q4 B (Relaxation), Q6 A (High-speed)
    bgGradient: 'from-orange-50/60 via-red-50/40 to-stone-100/30',
    buttonBorder: 'border-orange-300/50',
    buttonActiveBg: 'bg-orange-100/60',
    rippleColor: 'rgba(253,186,116,0.85)',
    auraTint: 'rgba(251, 146, 60, 0.45)',
    auraSecondary: 'rgba(252, 211, 77, 0.3)',
  },
  preventive: { // Q4 C (Time), Q6 D (Disciplined)
    bgGradient: 'from-cyan-50/60 via-sky-50/40 to-stone-100/30',
    buttonBorder: 'border-cyan-300/50',
    buttonActiveBg: 'bg-cyan-100/60',
    rippleColor: 'rgba(103,232,249,0.85)',
    auraTint: 'rgba(56, 189, 248, 0.45)',
    auraSecondary: 'rgba(125, 211, 252, 0.3)',
  },
  overworked: { // Q4 D (Energy), Q6 C (Steady/Tiring)
    bgGradient: 'from-yellow-50/60 via-amber-50/40 to-stone-100/30',
    buttonBorder: 'border-yellow-300/50',
    buttonActiveBg: 'bg-yellow-100/60',
    rippleColor: 'rgba(253,224,71,0.85)',
    auraTint: 'rgba(230, 210, 170, 0.5)',
    auraSecondary: 'rgba(210, 190, 160, 0.35)',
  },
};

const q4ResourceThemes: Record<string, ElementTheme> = {
  A: {
    bgGradient: 'from-slate-50/80 via-indigo-50/45 to-stone-50/30',
    buttonBorder: 'border-indigo-300/60',
    buttonActiveBg: 'bg-indigo-50/70',
    rippleColor: 'rgba(199,210,254,0.86)',
    auraTint: 'rgba(165, 180, 252, 0.38)',
    auraSecondary: 'rgba(191, 219, 254, 0.24)',
  },
  B: {
    bgGradient: 'from-rose-50/65 via-violet-50/35 to-stone-50/35',
    buttonBorder: 'border-rose-300/60',
    buttonActiveBg: 'bg-rose-50/70',
    rippleColor: 'rgba(254,205,211,0.86)',
    auraTint: 'rgba(244, 114, 182, 0.3)',
    auraSecondary: 'rgba(196, 181, 253, 0.24)',
  },
  C: {
    bgGradient: 'from-cyan-50/65 via-sky-50/35 to-stone-50/35',
    buttonBorder: 'border-cyan-300/60',
    buttonActiveBg: 'bg-cyan-50/70',
    rippleColor: 'rgba(103,232,249,0.82)',
    auraTint: 'rgba(34, 211, 238, 0.28)',
    auraSecondary: 'rgba(125, 211, 252, 0.24)',
  },
  D: {
    bgGradient: 'from-amber-50/70 via-yellow-50/35 to-stone-50/35',
    buttonBorder: 'border-amber-300/60',
    buttonActiveBg: 'bg-amber-50/75',
    rippleColor: 'rgba(253,230,138,0.86)',
    auraTint: 'rgba(251, 191, 36, 0.32)',
    auraSecondary: 'rgba(254, 240, 138, 0.24)',
  },
};

const q4IdleTheme: ElementTheme = {
  bgGradient: 'from-stone-50/75 via-rose-50/25 to-teal-50/25',
  buttonBorder: 'border-stone-200/40',
  buttonActiveBg: 'bg-white/55',
  rippleColor: 'rgba(255,255,255,0.86)',
  auraTint: 'rgba(220, 210, 200, 0.28)',
  auraSecondary: 'rgba(210, 225, 220, 0.22)',
};

export default function ElementStageQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const { previewId, confirmedId, handleOptionTap } = useDoubleTapSelection({ onSelect });
  const isQ4 = question.id === 'q4';

  const selectedOption = question.options.find(o => o.id === previewId);
  const activeTheme = isQ4 && previewId
    ? q4ResourceThemes[previewId]
    : isQ4
    ? q4IdleTheme
    : selectedOption?.auraMapping && elementThemes[selectedOption.auraMapping]
    ? elementThemes[selectedOption.auraMapping]
    : elementThemes['overworked'];

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
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${activeTheme.bgGradient}`}
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
                background: `radial-gradient(ellipse at center, ${activeTheme.auraTint} 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '95vw', height: '95vw', maxWidth: '400px', maxHeight: '400px',
                background: `radial-gradient(ellipse at center, ${activeTheme.auraSecondary} 0%, transparent 65%)`,
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
          {/* SVG Visual Component */}
          <ElementStageMotif
            questionId={question.id}
            previewId={previewId}
            isConfirming={confirmedId !== null}
          />

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
        animationDelay={0.3}
        getOptionStyle={(option) => {
          const theme = isQ4
            ? q4ResourceThemes[option.id]
            : option.auraMapping && elementThemes[option.auraMapping]
            ? elementThemes[option.auraMapping]
            : elementThemes['overworked'];

          return {
            activeClassName: `${theme.buttonActiveBg} ${theme.buttonBorder} scale-[1.01] shadow-[0_4px_20px_rgba(0,0,0,0.05)]`,
            inactiveClassName: 'border-stone-200/40 bg-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.03)]',
            badgeActiveClassName: 'border-stone-800 bg-stone-800 font-semibold text-white shadow-[0_2px_8px_rgba(28,25,23,0.16)]',
            badgeInactiveClassName: 'border-stone-300/70 bg-stone-50/85 text-stone-500 shadow-[0_1px_4px_rgba(28,25,23,0.04)]',
            rippleColor: theme.rippleColor,
          };
        }}
      />
    </div>
  );
}
