'use client';

import type { MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnswerOptionGrid from '../AnswerOptionGrid';
import AuraFieldMotif from '../visuals/AuraFieldMotif';
import { useQuizStore } from '@/store/useQuizStore';
import { useDoubleTapSelection } from '../useDoubleTapSelection';
import type { QuizInteractionProps } from '../types';

/* ------------------------------------------------------------------ */
/*  Theme mapping for Q5 and Q9 based on auraMapping                  */
/* ------------------------------------------------------------------ */
type AuraTheme = {
  bgGradient: string;
  buttonBorder: string;
  buttonActiveBg: string;
  rippleColor: string;
  auraTint: string;
  auraSecondary: string;
};

const auraThemes: Record<string, AuraTheme> = {
  glow: { // Q5 A (Eyes), Q9 D (Radiant)
    bgGradient: 'from-amber-50/60 via-yellow-50/40 to-stone-100/30',
    buttonBorder: 'border-amber-300/50',
    buttonActiveBg: 'bg-amber-100/60',
    rippleColor: 'rgba(253,230,138,0.85)',
    auraTint: 'rgba(253, 224, 71, 0.45)',
    auraSecondary: 'rgba(252, 211, 77, 0.3)',
  },
  hidden_aging: { // Q5 B (Contour), Q9 B (Firm)
    bgGradient: 'from-indigo-50/60 via-purple-50/40 to-stone-100/30',
    buttonBorder: 'border-indigo-300/50',
    buttonActiveBg: 'bg-indigo-100/60',
    rippleColor: 'rgba(199,210,254,0.85)',
    auraTint: 'rgba(165, 180, 252, 0.45)',
    auraSecondary: 'rgba(196, 181, 253, 0.3)',
  },
  stress: { // Q5 C (Pores)
    bgGradient: 'from-rose-50/60 via-stone-50/40 to-red-50/30',
    buttonBorder: 'border-rose-300/50',
    buttonActiveBg: 'bg-rose-100/60',
    rippleColor: 'rgba(254,205,211,0.85)',
    auraTint: 'rgba(251, 113, 133, 0.45)',
    auraSecondary: 'rgba(254, 205, 211, 0.3)',
  },
  recovery: { // Q5 D (Puffiness), Q9 C (Stable)
    bgGradient: 'from-teal-50/60 via-slate-50/40 to-emerald-50/30',
    buttonBorder: 'border-teal-300/50',
    buttonActiveBg: 'bg-teal-100/60',
    rippleColor: 'rgba(153,246,228,0.85)',
    auraTint: 'rgba(94, 234, 212, 0.45)',
    auraSecondary: 'rgba(110, 231, 183, 0.3)',
  },
  overworked: { // Q9 A (Vitality)
    bgGradient: 'from-sky-50/60 via-blue-50/40 to-cyan-50/30',
    buttonBorder: 'border-sky-300/50',
    buttonActiveBg: 'bg-sky-100/60',
    rippleColor: 'rgba(186,230,253,0.85)',
    auraTint: 'rgba(125, 211, 252, 0.45)',
    auraSecondary: 'rgba(147, 197, 253, 0.3)',
  },
  preventive: { 
    bgGradient: 'from-lime-50/60 via-stone-50/40 to-green-50/30',
    buttonBorder: 'border-lime-300/50',
    buttonActiveBg: 'bg-lime-100/60',
    rippleColor: 'rgba(217,249,157,0.85)',
    auraTint: 'rgba(190, 242, 100, 0.45)',
    auraSecondary: 'rgba(167, 243, 208, 0.3)',
  },
};

export default function AuraFieldQuestion({ question, onSelect }: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const { previewId, confirmedId, handleOptionTap } = useDoubleTapSelection({ onSelect });

  const selectedOption = question.options.find(o => o.id === previewId);
  const activeTheme = selectedOption?.auraMapping && auraThemes[selectedOption.auraMapping]
    ? auraThemes[selectedOption.auraMapping]
    : auraThemes['glow'];

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
          <AuraFieldMotif
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
        className="relative z-[5] px-5 pb-[max(3vh,env(safe-area-inset-bottom))] pt-2"
        animationDelay={0.12}
        getOptionStyle={(option) => {
          const theme = option.auraMapping && auraThemes[option.auraMapping]
            ? auraThemes[option.auraMapping]
            : auraThemes['glow'];

          return {
            activeClassName: `${theme.buttonActiveBg} ${theme.buttonBorder} scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.06)]`,
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
