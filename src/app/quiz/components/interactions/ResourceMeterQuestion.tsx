'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import AnswerOptionGrid from '../AnswerOptionGrid';
import ResourceMeterVisual, { type ResourceMeterOptionId } from '../visuals/ResourceMeterVisual';
import { useQuizStore } from '@/store/useQuizStore';
import { useDoubleTapSelection } from '../useDoubleTapSelection';
import type { QuizInteractionProps } from '../types';

type ResourceOptionTheme = {
  bgGradient: string;
  auraTint: string;
  auraSecondary: string;
  buttonBorder: string;
  buttonActiveBg: string;
  rippleColor: string;
};

const resourceOptionThemes: Record<ResourceMeterOptionId, ResourceOptionTheme> = {
  A: {
    bgGradient: 'from-indigo-100/90 via-slate-100/70 to-violet-50/50',
    auraTint: 'rgba(129, 140, 248, 0.52)',
    auraSecondary: 'rgba(165, 180, 252, 0.38)',
    buttonBorder: 'border-indigo-300/60',
    buttonActiveBg: 'bg-indigo-50/70',
    rippleColor: 'rgba(199,210,254,0.86)',
  },
  B: {
    bgGradient: 'from-rose-100/85 via-pink-50/65 to-violet-50/40',
    auraTint: 'rgba(244, 114, 182, 0.48)',
    auraSecondary: 'rgba(251, 182, 206, 0.36)',
    buttonBorder: 'border-rose-300/60',
    buttonActiveBg: 'bg-rose-50/70',
    rippleColor: 'rgba(254,205,211,0.86)',
  },
  C: {
    bgGradient: 'from-cyan-100/80 via-sky-50/60 to-teal-50/40',
    auraTint: 'rgba(34, 211, 238, 0.45)',
    auraSecondary: 'rgba(103, 232, 249, 0.32)',
    buttonBorder: 'border-cyan-300/60',
    buttonActiveBg: 'bg-cyan-50/70',
    rippleColor: 'rgba(103,232,249,0.82)',
  },
  D: {
    bgGradient: 'from-amber-100/85 via-yellow-50/60 to-orange-50/40',
    auraTint: 'rgba(251, 191, 36, 0.48)',
    auraSecondary: 'rgba(253, 224, 71, 0.34)',
    buttonBorder: 'border-amber-300/60',
    buttonActiveBg: 'bg-amber-50/75',
    rippleColor: 'rgba(253,230,138,0.86)',
  },
};

const idleTheme: ResourceOptionTheme = {
  bgGradient: 'from-stone-50/75 via-rose-50/25 to-teal-50/25',
  auraTint: 'rgba(220, 210, 200, 0.28)',
  auraSecondary: 'rgba(210, 225, 220, 0.22)',
  buttonBorder: 'border-stone-200/40',
  buttonActiveBg: 'bg-white/55',
  rippleColor: 'rgba(255,255,255,0.86)',
};

function normalizeResourceId(optionId: string | null): ResourceMeterOptionId | null {
  return optionId === 'A' || optionId === 'B' || optionId === 'C' || optionId === 'D' ? optionId : null;
}

export default function ResourceMeterQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const reduceMotion = useReducedMotion() ?? false;
  const { previewId, confirmedId, handleOptionTap } = useDoubleTapSelection({ onSelect });
  const selectedResourceId = normalizeResourceId(previewId);
  const activeTheme = selectedResourceId ? resourceOptionThemes[selectedResourceId] : idleTheme;

  const handleGridTap = (event: MouseEvent<HTMLButtonElement>) => {
    const optionId = event.currentTarget.dataset.optionId;
    if (optionId) handleOptionTap(optionId, event);
  };

  return (
    <div
      className="app-screen relative flex flex-col overflow-hidden"
      aria-labelledby={`question-${question.id}`}
    >
      <div className="h-[140px] shrink-0 pointer-events-none sm:h-[150px]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={previewId ?? 'neutral'}
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${activeTheme.bgGradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.56, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1] opacity-[0.06]" />

      <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute h-[80vw] max-h-[350px] w-[80vw] max-w-[350px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${activeTheme.auraTint} 0%, transparent 70%)`,
          }}
          animate={reduceMotion ? undefined : { scale: [1, 1.07, 1], opacity: [0.52, 0.8, 0.52] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute h-[92vw] max-h-[390px] w-[92vw] max-w-[390px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${activeTheme.auraSecondary} 0%, transparent 66%)`,
          }}
          animate={reduceMotion ? undefined : { scale: [1.04, 0.96, 1.04], opacity: [0.38, 0.58, 0.38] }}
          transition={{ duration: 9.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-[2] flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-1">
        <div className="relative h-full max-h-[330px] min-h-[245px] w-full max-w-[330px]">
          <ResourceMeterVisual
            selectedOptionId={selectedResourceId}
            isConfirming={confirmedId !== null}
          />
        </div>
      </div>

      <AnswerOptionGrid
        options={question.options}
        language={language}
        previewId={previewId}
        confirmedId={confirmedId}
        onOptionTap={handleGridTap}
        getOptionStyle={(option) => {
          const resourceId = normalizeResourceId(option.id) ?? 'A';
          const theme = resourceOptionThemes[resourceId];

          return {
            activeClassName: `${theme.buttonActiveBg} ${theme.buttonBorder} -translate-y-px shadow-[0_4px_20px_rgba(28,25,23,0.05)]`,
            badgeActiveClassName: 'border-stone-800 bg-stone-800 font-semibold text-white shadow-[0_2px_8px_rgba(28,25,23,0.16)]',
            badgeInactiveClassName: 'border-stone-300/70 bg-stone-50/85 text-stone-500 shadow-[0_1px_4px_rgba(28,25,23,0.04)]',
            rippleColor: theme.rippleColor,
          };
        }}
      />
    </div>
  );
}
