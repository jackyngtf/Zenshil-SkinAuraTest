'use client';

import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnswerOptionGrid from '../AnswerOptionGrid';
import { useQuizStore } from '@/store/useQuizStore';
import { useDoubleTapSelection } from '../useDoubleTapSelection';
import type { QuizInteractionProps } from '../types';
import AuraGlowPlaceholder from '../visuals/AuraGlowPlaceholder';

/* ------------------------------------------------------------------ */
/*  ImageStageQuestion — "Image Stage" interaction                     */
/*                                                                     */
/*  Layout (top to bottom):                                            */
/*    1. Question header (rendered by parent QuizQuestionRenderer)      */
/*    2. Large central image stage with cross-fade transitions         */
/*    3. Four compact answer buttons at the bottom                     */
/*                                                                     */
/*  UX:                                                               */
/*    - Tap        → PREVIEW: image cross-fades to selected option     */
/*    - Double tap → CONFIRM: ripple + auto-advance                    */
/*    - Tapping a different option switches the preview                */
/*                                                                     */
/*  This is for image-rich questions like Q1 (holiday destinations).   */
/* ------------------------------------------------------------------ */
export default function ImageStageQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const { previewId, confirmedId, handleOptionTap } = useDoubleTapSelection({ onSelect });

  const previewOption = previewId
    ? question.options.find((o) => o.id === previewId)
    : null;

  const handleGridTap = (event: MouseEvent<HTMLButtonElement>) => {
    const optionId = event.currentTarget.dataset.optionId;
    if (optionId) handleOptionTap(optionId, event);
  };

  return (
    <div
      className="app-screen relative flex flex-col overflow-hidden"
      aria-labelledby={`question-${question.id}`}
    >
      {/* Header spacer to offset the fixed QuizHeader */}
      <div className="h-[105px] sm:h-[115px] shrink-0 pointer-events-none" />

      {/* ============================================================ */}
      {/*  FULL-SCREEN IMAGE STAGE — cross-fades between options        */}
      {/* ============================================================ */}

      {/* Neutral background when nothing is selected */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100" />

      {/* Image layers — AnimatePresence for smooth cross-fade */}
      <AnimatePresence mode="wait">
        {previewOption?.imageUrl && (
          <motion.div
            key={previewId}
            className={`absolute inset-0 z-[1] ${confirmedId ? 'scale-105' : 'scale-100'} transition-transform duration-700`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewOption.imageUrl}
              alt={previewOption.text}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text readability fades — top and bottom gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[28vh] bg-gradient-to-b from-stone-50/95 via-stone-50/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[42vh] bg-gradient-to-t from-stone-50/95 via-stone-50/60 to-transparent" />

      {/* Noise texture */}
      <div className="noise-overlay pointer-events-none absolute inset-0 z-[3] opacity-[0.08]" />



      {/* Central content or spacer */}
      {!previewId ? (
        <div className="pointer-events-none relative z-[2] flex flex-1 items-center justify-center p-4">
          <div className="relative h-full max-h-[35vh] aspect-[390/480] w-full max-w-[320px]">
            <AuraGlowPlaceholder />
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}



      <AnswerOptionGrid
        options={question.options}
        language={language}
        previewId={previewId}
        confirmedId={confirmedId}
        onOptionTap={handleGridTap}
        animationDelay={0.3}
        getOptionStyle={() => ({
          activeClassName: 'border-stone-300/50 bg-stone-50/85 -translate-y-px shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
          inactiveClassName: 'border-stone-200/30 bg-white/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)]',
          badgeActiveClassName: 'border-stone-800 bg-stone-800 font-semibold text-white shadow-[0_2px_8px_rgba(28,25,23,0.16)]',
          badgeInactiveClassName: 'border-stone-300/70 bg-stone-50/85 text-stone-500 shadow-[0_1px_4px_rgba(28,25,23,0.04)]',
          rippleColor: 'rgba(255,255,255,0.6)',
        })}
      />
    </div>
  );
}
