'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmRipple from '../ConfirmRipple';
import { useQuizStore } from '@/store/useQuizStore';
import type { QuizInteractionProps } from '../types';
import WeatherStageMotif from '../visuals/WeatherStageMotif';

/* ------------------------------------------------------------------ */
/*  Q2 Specific visual configuration (Must remain unchanged)          */
/* ------------------------------------------------------------------ */
type WeatherOption = {
  imageUrl: string;
  bgGradient: string;
  auraTint: string;
  auraSecondary: string;
  buttonBorder: string;
  buttonActiveBg: string;
  accentDot: string;
  rippleColor: string;
  label: string;
  labelCn: string;
};

const weatherOptions: Record<string, WeatherOption> = {
  A: {
    imageUrl: '/assets/quiz/q02/a-cloudy.png',
    bgGradient: 'from-slate-100/60 via-blue-50/40 to-violet-50/30',
    auraTint: 'rgba(200, 210, 230, 0.45)',
    auraSecondary: 'rgba(180, 190, 220, 0.3)',
    buttonBorder: 'border-slate-300/60',
    buttonActiveBg: 'bg-slate-100/70',
    accentDot: 'bg-slate-400',
    rippleColor: 'rgba(203,213,225,0.8)',
    label: 'Cloud Veil',
    labelCn: '陰天',
  },
  B: {
    imageUrl: '/assets/quiz/q02/b-storm.png',
    bgGradient: 'from-stone-100/60 via-rose-50/40 to-violet-100/30',
    auraTint: 'rgba(200, 160, 180, 0.45)',
    auraSecondary: 'rgba(180, 140, 170, 0.3)',
    buttonBorder: 'border-rose-300/60',
    buttonActiveBg: 'bg-rose-50/70',
    accentDot: 'bg-rose-400',
    rippleColor: 'rgba(251,207,232,0.8)',
    label: 'Humid Pressure',
    labelCn: '悶熱暴風雨',
  },
  C: {
    imageUrl: '/assets/quiz/q02/c-dry.png',
    bgGradient: 'from-amber-50/60 via-stone-50/40 to-rose-50/30',
    auraTint: 'rgba(210, 185, 150, 0.45)',
    auraSecondary: 'rgba(200, 175, 140, 0.3)',
    buttonBorder: 'border-amber-300/60',
    buttonActiveBg: 'bg-amber-50/70',
    accentDot: 'bg-amber-500',
    rippleColor: 'rgba(254,243,199,0.85)',
    label: 'Dry Texture',
    labelCn: '乾燥秋天',
  },
  D: {
    imageUrl: '/assets/quiz/q02/d-morning.png',
    bgGradient: 'from-yellow-50/60 via-rose-50/40 to-white/30',
    auraTint: 'rgba(230, 210, 170, 0.5)',
    auraSecondary: 'rgba(210, 190, 160, 0.35)',
    buttonBorder: 'border-yellow-400/60',
    buttonActiveBg: 'bg-yellow-50/70',
    accentDot: 'bg-yellow-500',
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
  accentDot: string;
  rippleColor: string;
};

const auraThemes: Record<string, AuraTheme> = {
  late_night: { // Q8 A (Sleep/Eclipse)
    bgGradient: 'from-slate-900/40 via-blue-900/30 to-indigo-900/40',
    auraTint: 'rgba(30, 58, 138, 0.45)',
    auraSecondary: 'rgba(15, 23, 42, 0.3)',
    buttonBorder: 'border-slate-400/60',
    buttonActiveBg: 'bg-slate-200/50',
    accentDot: 'bg-slate-400',
    rippleColor: 'rgba(148,163,184,0.8)',
  },
  stress: { // Q8 B (Emotions/Ink)
    bgGradient: 'from-fuchsia-50/60 via-purple-50/40 to-pink-50/30',
    auraTint: 'rgba(192, 132, 252, 0.45)',
    auraSecondary: 'rgba(216, 180, 254, 0.3)',
    buttonBorder: 'border-fuchsia-300/60',
    buttonActiveBg: 'bg-fuchsia-100/70',
    accentDot: 'bg-fuchsia-400',
    rippleColor: 'rgba(240,171,252,0.8)',
  },
  burnout: { // Q8 C (Stress/Ice crack)
    bgGradient: 'from-cyan-50/60 via-sky-50/40 to-blue-50/30',
    auraTint: 'rgba(56, 189, 248, 0.45)',
    auraSecondary: 'rgba(125, 211, 252, 0.3)',
    buttonBorder: 'border-sky-300/60',
    buttonActiveBg: 'bg-sky-100/70',
    accentDot: 'bg-sky-400',
    rippleColor: 'rgba(125,211,252,0.8)',
  },
  recovery: { // Q8 D (Diet/Pigment)
    bgGradient: 'from-orange-50/60 via-amber-50/40 to-yellow-50/30',
    auraTint: 'rgba(251, 146, 60, 0.45)',
    auraSecondary: 'rgba(252, 211, 77, 0.3)',
    buttonBorder: 'border-orange-300/60',
    buttonActiveBg: 'bg-orange-100/70',
    accentDot: 'bg-orange-400',
    rippleColor: 'rgba(253,186,116,0.8)',
  },
};


export default function WeatherStageQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef<{ id: string | null; time: number }>({ id: null, time: 0 });

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
          className="relative overflow-hidden rounded-full flex-shrink-0"
          style={{
            height: '100%', width: '100%', maxWidth: '280px', maxHeight: '280px', aspectRatio: '1 / 1',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 72%)',
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

      {/* BOTTOM ANSWER BUTTONS */}
      <motion.div
        className="relative z-[5] px-5 pb-[max(3vh,env(safe-area-inset-bottom))] pt-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
          {question.options.map((option) => {
            const isPreviewing = previewId === option.id;
            const isMuted = confirmedId !== null && confirmedId !== option.id;

            let buttonActiveBg, buttonBorder, accentDot, rippleColor;

            if (isQ2) {
              const visual = weatherOptions[option.id] ?? weatherOptions.A;
              buttonActiveBg = visual.buttonActiveBg;
              buttonBorder = visual.buttonBorder;
              accentDot = visual.accentDot;
              rippleColor = visual.rippleColor;
            } else {
              const theme = option.auraMapping && auraThemes[option.auraMapping]
                ? auraThemes[option.auraMapping]
                : auraThemes['late_night'];
              buttonActiveBg = theme.buttonActiveBg;
              buttonBorder = theme.buttonBorder;
              accentDot = theme.accentDot;
              rippleColor = theme.rippleColor;
            }

            return (
              <motion.button
                key={option.id}
                type="button"
                onClick={(event) => handleTap(option.id, event)}
                disabled={confirmedId !== null}
                className={`
                  relative flex items-center gap-3 overflow-hidden rounded-2xl border
                  px-4 py-3 text-left outline-none transition-all duration-300
                  backdrop-blur-sm
                  focus-visible:ring-2 focus-visible:ring-stone-400/40
                  ${isPreviewing
                    ? `${buttonActiveBg} ${buttonBorder} scale-[1.01] shadow-[0_4px_20px_rgba(0,0,0,0.05)]`
                    : `bg-white/55 border-stone-200/40 shadow-[0_2px_10px_rgba(0,0,0,0.02)]`
                  }
                  ${isMuted ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                `}
                whileTap={confirmedId ? undefined : { scale: 0.97 }}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-medium tracking-normal transition-all duration-300 ${
                    isPreviewing
                      ? `${buttonActiveBg} ${buttonBorder} text-stone-700 font-semibold shadow-sm`
                      : 'bg-white/40 border-stone-200/50 text-stone-400'
                  }`}
                >
                  {option.id}
                </span>

                <div className="min-w-0 flex-1">
                  <p className={`font-serif text-[14px] tracking-wider transition-colors duration-300 ${
                    isPreviewing ? 'text-stone-800' : 'text-stone-600'
                  }`}>
                    {language === 'en' && option.textEn ? option.textEn : option.text}
                  </p>
                </div>

                {confirmedId === option.id && <ConfirmRipple color={rippleColor} />}

                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${accentDot} ${
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
