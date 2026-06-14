'use client';

import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnswerOptionGrid from '../AnswerOptionGrid';
import RitualStageMotif from '../visuals/RitualStageMotif';
import { useQuizStore } from '@/store/useQuizStore';
import { useDoubleTapSelection } from '../useDoubleTapSelection';
import type { QuizInteractionProps } from '../types';

/* ------------------------------------------------------------------ */
/*  Theme mapping for Q10                                             */
/* ------------------------------------------------------------------ */
type RitualTheme = {
  bgGradient: string;
  buttonBorder: string;
  buttonActiveBg: string;
  rippleColor: string;
  auraTint: string;
  auraSecondary: string;
};

const ritualThemes: Record<string, RitualTheme> = {
  neutral: {
    bgGradient: 'from-stone-50/70 via-rose-50/30 to-emerald-50/25',
    buttonBorder: 'border-stone-300/40',
    buttonActiveBg: 'bg-stone-50/60',
    rippleColor: 'rgba(214, 197, 178, 0.62)',
    auraTint: 'rgba(232, 224, 214, 0.36)',
    auraSecondary: 'rgba(211, 238, 230, 0.22)',
  },
  late_night: { // Q10 A (Sleep)
    bgGradient: 'from-indigo-50/55 via-violet-50/40 to-stone-50/30',
    buttonBorder: 'border-violet-300/40',
    buttonActiveBg: 'bg-violet-100/30',
    rippleColor: 'rgba(167,139,250,0.6)',
    auraTint: 'rgba(164, 178, 218, 0.36)',
    auraSecondary: 'rgba(222, 214, 239, 0.26)',
  },
  recovery: { // Q10 B (Spa)
    bgGradient: 'from-stone-50/65 via-rose-50/35 to-amber-50/25',
    buttonBorder: 'border-rose-200/60',
    buttonActiveBg: 'bg-rose-50/55',
    rippleColor: 'rgba(244, 190, 174, 0.75)',
    auraTint: 'rgba(238, 196, 180, 0.34)',
    auraSecondary: 'rgba(230, 214, 196, 0.28)',
  },
  preventive: { // Q10 C (Nature)
    bgGradient: 'from-emerald-50/60 via-green-50/40 to-teal-50/30',
    buttonBorder: 'border-emerald-300/50',
    buttonActiveBg: 'bg-emerald-100/60',
    rippleColor: 'rgba(167,243,208,0.85)',
    auraTint: 'rgba(52, 211, 153, 0.45)',
    auraSecondary: 'rgba(167, 243, 208, 0.3)',
  },
  glow: { // Q10 D (Facial)
    bgGradient: 'from-rose-50/60 via-pink-50/40 to-stone-100/30',
    buttonBorder: 'border-rose-300/50',
    buttonActiveBg: 'bg-rose-100/60',
    rippleColor: 'rgba(253,164,175,0.85)',
    auraTint: 'rgba(251, 113, 133, 0.45)',
    auraSecondary: 'rgba(253, 164, 175, 0.3)',
  },
};

export default function RitualStageQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const { previewId, confirmedId, handleOptionTap } = useDoubleTapSelection({ onSelect });

  const selectedOption = question.options.find(o => o.id === previewId);
  const activeTheme = selectedOption?.auraMapping && ritualThemes[selectedOption.auraMapping]
    ? ritualThemes[selectedOption.auraMapping]
    : ritualThemes['neutral'];

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
          className="skin-aura-orb-clip relative flex-shrink-0 ring-1 ring-white/65 shadow-[0_24px_80px_rgba(28,25,23,0.10),inset_0_1px_0_rgba(255,255,255,0.78)]"
          style={{
            height: '100%', width: '100%', maxWidth: '300px', maxHeight: '300px', aspectRatio: '1 / 1',
          }}
        >
          {/* SVG Visual Component */}
          <RitualStageMotif
            questionId={question.id}
            previewId={previewId}
            isConfirming={confirmedId !== null}
          />

          <AnimatePresence>
            {confirmedId && (
              <motion.div
                className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.66)_0%,rgba(255,255,255,0.24)_32%,rgba(255,255,255,0)_68%)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.72, 0] }}
                transition={{ duration: 0.56, ease: 'easeOut' }}
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
          const theme = option.auraMapping && ritualThemes[option.auraMapping]
            ? ritualThemes[option.auraMapping]
            : ritualThemes['neutral'];

          return {
            activeClassName: `${theme.buttonActiveBg} ${theme.buttonBorder} -translate-y-px shadow-[0_4px_20px_rgba(0,0,0,0.06)]`,
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
