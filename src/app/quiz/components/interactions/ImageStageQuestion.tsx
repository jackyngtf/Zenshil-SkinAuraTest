'use client';

import { type MouseEvent, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmRipple from '../ConfirmRipple';
import { useQuizStore } from '@/store/useQuizStore';
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
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef<{ id: string | null; time: number }>({ id: null, time: 0 });

  const previewOption = previewId
    ? question.options.find((o) => o.id === previewId)
    : null;

  const handleCommit = (optionId: string) => {
    if (confirmedId) return;
    setConfirmedId(optionId);
    if (commitTimer.current) clearTimeout(commitTimer.current);
    commitTimer.current = setTimeout(() => onSelect(optionId), 450);
  };

  const handleTap = (optionId: string, event: MouseEvent<HTMLButtonElement>) => {
    if (confirmedId) return;
    const now = event.timeStamp;

    setPreviewId(optionId);

    if (lastTapRef.current.id === optionId && now - lastTapRef.current.time < 460) {
      handleCommit(optionId);
    }

    lastTapRef.current = { id: optionId, time: now };
  };

  return (
    <div
      className="relative flex h-[100dvh] flex-col overflow-hidden"
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



      {/* ============================================================ */}
      {/*  BOTTOM ANSWER BUTTONS — always visible, compact pills        */}
      {/* ============================================================ */}
      <motion.div
        className="relative z-[5] px-5 pb-[max(4vh,env(safe-area-inset-bottom))] pt-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-2.5">
          {question.options.map((option) => {
            const isPreviewing = previewId === option.id;
            const isMuted = confirmedId !== null && confirmedId !== option.id;

            return (
              <motion.button
                key={option.id}
                type="button"
                onClick={(event) => handleTap(option.id, event)}
                disabled={confirmedId !== null}
                aria-label={option.text}
                className={`
                  relative flex items-center gap-3 overflow-hidden rounded-2xl border
                  px-4 py-3.5 text-left outline-none transition-all duration-300
                  backdrop-blur-md
                  focus-visible:ring-2 focus-visible:ring-stone-400/40
                  ${isPreviewing
                    ? 'bg-white/80 border-stone-400/40 scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
                    : 'bg-white/50 border-stone-200/30 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
                  }
                  ${isMuted ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                `}
                whileTap={confirmedId ? undefined : { scale: 0.97 }}
              >
                {/* Unified Option Badge */}
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-medium tracking-normal transition-all duration-300 ${
                    isPreviewing
                      ? 'bg-stone-850 border-stone-850 text-white font-semibold shadow-sm'
                      : 'bg-white/40 border-stone-200/50 text-stone-400'
                  }`}
                >
                  {option.id}
                </span>

                {/* Text content */}
                <div className="min-w-0 flex-1">
                  <p className={`font-serif text-[14px] tracking-wider transition-colors duration-300 ${
                    isPreviewing ? 'text-stone-800' : 'text-stone-600'
                  }`}>
                    {language === 'en' && option.textEn ? option.textEn : option.text}
                  </p>
                </div>

                {/* Confirm Ripple inside button */}
                {confirmedId === option.id && (
                  <ConfirmRipple color="rgba(255,255,255,0.6)" />
                )}

                {/* Previewing indicator */}
                <AnimatePresence>
                  {isPreviewing && !confirmedId && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-2 w-2 shrink-0 rounded-full bg-stone-600 ring-2 ring-white/80"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Confirm hint — appears below buttons after first tap */}
        <AnimatePresence>
          {previewId && !confirmedId && (
            <motion.p
              className="mt-2 text-center font-sans text-[9px] font-light tracking-[0.3em] text-stone-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {language === 'en' ? 'Double tap to confirm' : '雙擊確認選擇'}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
