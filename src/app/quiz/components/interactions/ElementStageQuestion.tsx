'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmRipple from '../ConfirmRipple';
import ElementStageMotif from '../visuals/ElementStageMotif';
import { useQuizStore } from '@/store/useQuizStore';
import type { QuizInteractionProps } from '../types';

/* ------------------------------------------------------------------ */
/*  Theme mapping for Q4 and Q6                                       */
/* ------------------------------------------------------------------ */
type ElementTheme = {
  bgGradient: string;
  buttonBorder: string;
  buttonActiveBg: string;
  accentDot: string;
  rippleColor: string;
  auraTint: string;
  auraSecondary: string;
};

const elementThemes: Record<string, ElementTheme> = {
  late_night: { // Q4 A (Sleep), Q6 B (Irregular)
    bgGradient: 'from-blue-900/40 via-indigo-900/30 to-slate-900/40',
    buttonBorder: 'border-blue-300/40',
    buttonActiveBg: 'bg-blue-100/30',
    accentDot: 'bg-blue-400',
    rippleColor: 'rgba(147,197,253,0.6)',
    auraTint: 'rgba(30, 58, 138, 0.45)',
    auraSecondary: 'rgba(15, 23, 42, 0.3)',
  },
  burnout: { // Q4 B (Relaxation), Q6 A (High-speed)
    bgGradient: 'from-orange-50/60 via-red-50/40 to-stone-100/30',
    buttonBorder: 'border-orange-300/50',
    buttonActiveBg: 'bg-orange-100/60',
    accentDot: 'bg-orange-400',
    rippleColor: 'rgba(253,186,116,0.85)',
    auraTint: 'rgba(251, 146, 60, 0.45)',
    auraSecondary: 'rgba(252, 211, 77, 0.3)',
  },
  preventive: { // Q4 C (Time), Q6 D (Disciplined)
    bgGradient: 'from-cyan-50/60 via-sky-50/40 to-stone-100/30',
    buttonBorder: 'border-cyan-300/50',
    buttonActiveBg: 'bg-cyan-100/60',
    accentDot: 'bg-cyan-400',
    rippleColor: 'rgba(103,232,249,0.85)',
    auraTint: 'rgba(56, 189, 248, 0.45)',
    auraSecondary: 'rgba(125, 211, 252, 0.3)',
  },
  overworked: { // Q4 D (Energy), Q6 C (Steady/Tiring)
    bgGradient: 'from-yellow-50/60 via-amber-50/40 to-stone-100/30',
    buttonBorder: 'border-yellow-300/50',
    buttonActiveBg: 'bg-yellow-100/60',
    accentDot: 'bg-yellow-400',
    rippleColor: 'rgba(253,224,71,0.85)',
    auraTint: 'rgba(230, 210, 170, 0.5)',
    auraSecondary: 'rgba(210, 190, 160, 0.35)',
  },
};

export default function ElementStageQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef<{ id: string | null; time: number }>({ id: null, time: 0 });

  const selectedOption = question.options.find(o => o.id === previewId);
  const activeTheme = selectedOption?.auraMapping && elementThemes[selectedOption.auraMapping]
    ? elementThemes[selectedOption.auraMapping]
    : elementThemes['overworked'];

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
          className="relative overflow-hidden rounded-full flex-shrink-0"
          style={{
            height: '100%', width: '100%', maxWidth: '280px', maxHeight: '280px', aspectRatio: '1 / 1',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 72%)',
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

      {/* Choice buttons grid (2x2) */}
      <motion.div
        className="relative z-[5] px-5 pb-[max(4vh,env(safe-area-inset-bottom))] pt-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-2.5">
          {question.options.map((option) => {
            const theme = option.auraMapping && elementThemes[option.auraMapping]
              ? elementThemes[option.auraMapping]
              : elementThemes['overworked'];
            
            const isPreviewing = previewId === option.id;
            const isMuted = confirmedId !== null && confirmedId !== option.id;

            return (
              <motion.button
                key={option.id}
                type="button"
                onClick={(e) => handleTap(option.id, e)}
                disabled={confirmedId !== null}
                className={`
                  relative flex items-center gap-3 overflow-hidden rounded-2xl border
                  px-4 py-3.5 text-left outline-none transition-all duration-300
                  backdrop-blur-sm
                  focus-visible:ring-2 focus-visible:ring-stone-400/40
                  ${isPreviewing
                    ? `${theme.buttonActiveBg} ${theme.buttonBorder} scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.06)]`
                    : `bg-white/50 border-stone-200/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)]`
                  }
                  ${isMuted ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                `}
                whileTap={confirmedId ? undefined : { scale: 0.97 }}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-medium tracking-normal transition-all duration-300 ${
                    isPreviewing
                      ? `${theme.buttonActiveBg} ${theme.buttonBorder} text-stone-750 font-semibold shadow-sm`
                      : 'bg-white/40 border-stone-200/50 text-stone-400'
                  }`}
                >
                  {option.id}
                </span>

                <div className="min-w-0 flex-1">
                  <p className={`font-serif text-[15px] tracking-wider transition-colors duration-300 ${
                    isPreviewing ? 'text-stone-800' : 'text-stone-600'
                  }`}>
                    {language === 'en' && option.textEn ? option.textEn : option.text}
                  </p>
                </div>

                {confirmedId === option.id && <ConfirmRipple color={theme.rippleColor} />}

                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${theme.accentDot} ${
                    isPreviewing ? 'opacity-100 scale-110' : 'opacity-50'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>

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
