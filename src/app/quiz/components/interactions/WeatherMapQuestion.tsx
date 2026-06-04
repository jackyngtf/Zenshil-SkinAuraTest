'use client';

import { type MouseEvent, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ConfirmRipple from '../ConfirmRipple';
import { useQuizStore } from '@/store/useQuizStore';
import type { QuizInteractionProps } from '../types';
import WeatherMotif, { type WeatherVariant } from '../visuals/WeatherMotif';

type WeatherVisual = {
  variant: WeatherVariant;
  label: string;
  description: string;
  background: string;
  border: string;
  text: string;
  accent: string;
  ripple: string;
};

const weatherVisuals: Record<string, WeatherVisual> = {
  A: {
    variant: 'cloudy',
    label: 'Light Rain',
    description: '清淡陰雨感',
    background: 'from-slate-100 via-blue-50 to-white',
    border: 'border-slate-200/70',
    text: 'text-slate-700',
    accent: 'bg-slate-400/50',
    ripple: 'rgba(226,232,240,0.9)',
  },
  B: {
    variant: 'storm',
    label: 'Humid Storm',
    description: '濕熱壓迫感',
    background: 'from-stone-100 via-rose-50 to-slate-100',
    border: 'border-rose-200/60',
    text: 'text-stone-700',
    accent: 'bg-rose-400/45',
    ripple: 'rgba(251,207,232,0.82)',
  },
  C: {
    variant: 'dry',
    label: 'Dry Surface',
    description: '乾裂繃緊感',
    background: 'from-amber-50 via-orange-50 to-stone-50',
    border: 'border-amber-200/60',
    text: 'text-stone-700',
    accent: 'bg-amber-400/45',
    ripple: 'rgba(254,243,199,0.86)',
  },
  D: {
    variant: 'morning',
    label: 'Skin Glow',
    description: '晨光透亮感',
    background: 'from-yellow-50 via-rose-50 to-white',
    border: 'border-yellow-200/60',
    text: 'text-stone-700',
    accent: 'bg-yellow-400/45',
    ripple: 'rgba(254,249,195,0.9)',
  },
};

export default function WeatherMapQuestion({
  question,
  currentQuestionIndex,
  totalQuestions,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const lastTapRef = useRef<{ id: string | null; time: number }>({ id: null, time: 0 });

  const handleSelect = (optionId: string, event: MouseEvent<HTMLButtonElement>) => {
    if (confirmedId) return;
    const now = event.timeStamp;

    setPreviewId(optionId);

    if (lastTapRef.current.id === optionId && now - lastTapRef.current.time < 460) {
      setConfirmedId(optionId);
      window.setTimeout(() => onSelect(optionId), 430);
    }

    lastTapRef.current = { id: optionId, time: now };
  };

  return (
    <div
      className="app-min-screen relative overflow-hidden bg-gradient-to-b from-[#fbf6f4] via-[#f7f8f5] to-[#eef8f4] px-5 pb-8 pt-[23vh]"
      aria-labelledby={`question-${question.id}`}
    >
      <div className="absolute inset-0 noise-overlay opacity-[0.07]" />
      <div className="pointer-events-none absolute -left-24 top-[18vh] h-72 w-72 rounded-full bg-rose-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-[8vh] h-80 w-80 rounded-full bg-teal-100/70 blur-3xl" />

      <motion.div
        key={`weather-grid-${currentQuestionIndex}-${totalQuestions}`}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto grid w-full max-w-md grid-cols-2 gap-3"
      >
        {question.options.map((option) => {
          const visual = weatherVisuals[option.id] ?? weatherVisuals.A;
          const isPreviewing = previewId === option.id;
          const isConfirmed = confirmedId === option.id;
          const isMuted = confirmedId !== null && !isConfirmed;

          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={(event) => handleSelect(option.id, event)}
              disabled={confirmedId !== null}
              aria-label={`${option.text}，${visual.description}，${language === 'en' ? 'double tap to confirm' : '雙擊確認'}`}
              className={`relative min-h-[204px] overflow-hidden rounded-[26px] border bg-gradient-to-br ${visual.background} ${visual.border} px-4 pb-4 pt-4 text-left shadow-[0_16px_44px_rgba(80,64,56,0.08)] outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-stone-500/40 active:translate-y-px ${isPreviewing ? '-translate-y-px border-stone-500/45 bg-white/80' : ''} ${isMuted ? 'opacity-[0.45]' : 'opacity-100'}`}
              whileTap={confirmedId ? undefined : { y: 1 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-white/28 backdrop-blur-[1px]" />
              <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="font-sans text-[9px] font-medium uppercase tracking-[0.38em] text-stone-400">
                  Option {option.id}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${visual.accent}`} />
              </div>

              <div className="relative z-10 mt-2 h-24">
                <WeatherMotif variant={visual.variant} isSelected={isPreviewing} isConfirming={isConfirmed} />
              </div>

              <div className="relative z-10 mt-3">
                <p className={`font-serif text-[25px] leading-tight tracking-[0.08em] ${visual.text}`}>
                  {language === 'en' && option.textEn ? option.textEn : option.text}
                </p>
                <p className="mt-2 font-sans text-[10px] font-light uppercase tracking-[0.24em] text-stone-400">
                  {visual.label}
                </p>
                <p className="mt-3 font-sans text-[11px] font-light leading-relaxed tracking-[0.08em] text-stone-500">
                  {visual.description}
                </p>
              </div>

              {isConfirmed && <ConfirmRipple color={visual.ripple} />}
            </motion.button>
          );
        })}
      </motion.div>

      <p className="relative z-10 mt-3 text-center font-sans text-[9px] font-light tracking-[0.28em] text-stone-400">
        {language === 'en' ? 'Tap to preview | Double tap to confirm' : '點一下預覽 ｜ 雙擊確認'}
      </p>
    </div>
  );
}
