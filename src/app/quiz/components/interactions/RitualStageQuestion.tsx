'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmRipple from '../ConfirmRipple';
import RitualStageMotif from '../visuals/RitualStageMotif';
import { useQuizStore } from '@/store/useQuizStore';
import type { QuizInteractionProps } from '../types';

/* ------------------------------------------------------------------ */
/*  Theme mapping for Q10                                             */
/* ------------------------------------------------------------------ */
type RitualTheme = {
  bgGradient: string;
  buttonBorder: string;
  buttonActiveBg: string;
  accentDot: string;
  rippleColor: string;
  auraTint: string;
  auraSecondary: string;
};

const ritualThemes: Record<string, RitualTheme> = {
  late_night: { // Q10 A (Sleep)
    bgGradient: 'from-violet-900/40 via-purple-900/30 to-slate-900/40',
    buttonBorder: 'border-violet-300/40',
    buttonActiveBg: 'bg-violet-100/30',
    accentDot: 'bg-violet-400',
    rippleColor: 'rgba(167,139,250,0.6)',
    auraTint: 'rgba(192, 132, 252, 0.45)',
    auraSecondary: 'rgba(216, 180, 254, 0.3)',
  },
  recovery: { // Q10 B (Spa)
    bgGradient: 'from-sky-50/60 via-blue-50/40 to-cyan-50/30',
    buttonBorder: 'border-sky-300/50',
    buttonActiveBg: 'bg-sky-100/60',
    accentDot: 'bg-sky-400',
    rippleColor: 'rgba(125,211,252,0.85)',
    auraTint: 'rgba(56, 189, 248, 0.45)',
    auraSecondary: 'rgba(125, 211, 252, 0.3)',
  },
  preventive: { // Q10 C (Nature)
    bgGradient: 'from-emerald-50/60 via-green-50/40 to-teal-50/30',
    buttonBorder: 'border-emerald-300/50',
    buttonActiveBg: 'bg-emerald-100/60',
    accentDot: 'bg-emerald-400',
    rippleColor: 'rgba(167,243,208,0.85)',
    auraTint: 'rgba(52, 211, 153, 0.45)',
    auraSecondary: 'rgba(167, 243, 208, 0.3)',
  },
  glow: { // Q10 D (Facial)
    bgGradient: 'from-rose-50/60 via-pink-50/40 to-stone-100/30',
    buttonBorder: 'border-rose-300/50',
    buttonActiveBg: 'bg-rose-100/60',
    accentDot: 'bg-rose-400',
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
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef<{ id: string | null; time: number }>({ id: null, time: 0 });

  const selectedOption = question.options.find(o => o.id === previewId);
  const activeTheme = selectedOption?.auraMapping && ritualThemes[selectedOption.auraMapping]
    ? ritualThemes[selectedOption.auraMapping]
    : ritualThemes['recovery'];

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
          <RitualStageMotif
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

      <motion.div
        className="relative z-[5] px-5 pb-[max(3vh,env(safe-area-inset-bottom))] pt-2"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-2.5">
          {question.options.map((option) => {
            const theme = option.auraMapping && ritualThemes[option.auraMapping]
              ? ritualThemes[option.auraMapping]
              : ritualThemes['recovery'];
              
            const isPreviewing = previewId === option.id;
            const isMuted = confirmedId !== null && confirmedId !== option.id;

            return (
              <motion.button
                key={option.id}
                type="button"
                onClick={(event) => handleTap(option.id, event)}
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
                whileTap={confirmedId ? undefined : { scale: 0.985 }}
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

        <AnimatePresence mode="wait">
          {previewId && !confirmedId && (
            <motion.p
              key="hint"
              className="mt-3 text-center font-sans text-[9px] font-light tracking-[0.28em] text-stone-400"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.24 }}
            >
              {language === 'en' ? 'Double tap to confirm' : '雙擊確認選擇'}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
