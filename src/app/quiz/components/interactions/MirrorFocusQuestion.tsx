'use client';

import type { MouseEvent } from 'react';
import AnswerOptionGrid from '../AnswerOptionGrid';
import type { MirrorFocusOptionId } from '../visuals/MirrorFocusVisual';
import { useQuizStore } from '@/store/useQuizStore';
import { useDoubleTapSelection } from '../useDoubleTapSelection';
import type { QuizInteractionProps } from '../types';

/* ------------------------------------------------------------------ */
/*  Per-option theme tokens                                            */
/* ------------------------------------------------------------------ */

type MirrorOptionTheme = {
  bgGradient: string;
  buttonBorder: string;
  buttonActiveBg: string;
  rippleColor: string;
};

const mirrorOptionThemes: Record<MirrorFocusOptionId, MirrorOptionTheme> = {
  A: { // Eyes — cool blue
    bgGradient: 'from-blue-50/80 via-slate-50/60 to-indigo-50/40',
    buttonBorder: 'border-blue-200/55',
    buttonActiveBg: 'bg-blue-50/65',
    rippleColor: 'rgba(197,216,240,0.82)',
  },
  B: { // Contour — soft violet
    bgGradient: 'from-violet-50/80 via-purple-50/55 to-stone-50/35',
    buttonBorder: 'border-violet-200/55',
    buttonActiveBg: 'bg-violet-50/65',
    rippleColor: 'rgba(212,200,228,0.82)',
  },
  C: { // Pores — rose beige
    bgGradient: 'from-orange-50/75 via-rose-50/50 to-stone-50/35',
    buttonBorder: 'border-orange-200/55',
    buttonActiveBg: 'bg-orange-50/65',
    rippleColor: 'rgba(232,212,194,0.82)',
  },
  D: { // Puffiness — aqua mint
    bgGradient: 'from-teal-50/80 via-emerald-50/55 to-cyan-50/35',
    buttonBorder: 'border-teal-200/55',
    buttonActiveBg: 'bg-teal-50/65',
    rippleColor: 'rgba(184,224,214,0.82)',
  },
};

const idleTheme: MirrorOptionTheme = {
  bgGradient: 'from-stone-50/70 via-amber-50/20 to-rose-50/20',
  buttonBorder: 'border-stone-200/40',
  buttonActiveBg: 'bg-white/55',
  rippleColor: 'rgba(255,255,255,0.82)',
};

const MIRROR_SCENE_IMAGE = '/assets/quiz/q05/q5-mirror-room-spacious-v2.png';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function normalizeMirrorId(id: string | null): MirrorFocusOptionId | null {
  return id === 'A' || id === 'B' || id === 'C' || id === 'D' ? id : null;
}

export default function MirrorFocusQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const { previewId, confirmedId, handleOptionTap } = useDoubleTapSelection({ onSelect });

  const handleGridTap = (event: MouseEvent<HTMLButtonElement>) => {
    const optionId = event.currentTarget.dataset.optionId;
    if (optionId) handleOptionTap(optionId, event);
  };

  return (
    <div
      className="app-screen relative flex flex-col overflow-hidden"
      aria-labelledby={`question-${question.id}`}
    >
      {/* Header spacer */}
      <div className="h-[140px] shrink-0 pointer-events-none sm:h-[150px]" />

      {/* Full-bleed editorial mirror scene. Q5 keeps one calm image, like Q1, with soft readability fades. */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${idleTheme.bgGradient}`} />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MIRROR_SCENE_IMAGE}
          alt=""
          draggable={false}
          loading="eager"
          decoding="async"
          className="h-full w-full select-none object-cover"
          style={{ objectPosition: 'center 50%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] bg-stone-50/8" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[34vh] bg-gradient-to-b from-stone-50/98 via-stone-50/76 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[39vh] bg-gradient-to-t from-stone-50/98 via-stone-50/72 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b from-white/10 via-transparent to-white/10 mix-blend-soft-light" />

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0 z-[4] opacity-[0.08]" />

      <div className="flex-1" />

      {/* Answer option grid */}
      <AnswerOptionGrid
        options={question.options}
        language={language}
        previewId={previewId}
        confirmedId={confirmedId}
        onOptionTap={handleGridTap}
        getOptionStyle={(option) => {
          const mirrorId = normalizeMirrorId(option.id) ?? 'A';
          const theme = mirrorOptionThemes[mirrorId];

          return {
            activeClassName: `${theme.buttonActiveBg} ${theme.buttonBorder} scale-[1.01] shadow-[0_4px_20px_rgba(28,25,23,0.05)]`,
            inactiveClassName: 'border-stone-200/40 bg-white/58 shadow-[0_6px_20px_rgba(28,25,23,0.04)]',
            badgeActiveClassName: 'border-stone-800 bg-stone-800 font-semibold text-white shadow-[0_2px_8px_rgba(28,25,23,0.16)]',
            badgeInactiveClassName: 'border-stone-300/70 bg-stone-50/85 text-stone-500 shadow-[0_1px_4px_rgba(28,25,23,0.04)]',
            rippleColor: theme.rippleColor,
          };
        }}
      />
    </div>
  );
}
