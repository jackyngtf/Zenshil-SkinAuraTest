'use client';

import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import ConfirmRipple from './ConfirmRipple';
import type { Language } from '@/store/useQuizStore';
import type { QuizOption } from './types';

export type AnswerOptionStyle = {
  activeClassName: string;
  inactiveClassName?: string;
  mutedClassName?: string;
  badgeActiveClassName?: string;
  badgeInactiveClassName?: string;
  rippleColor?: string;
};

type AnswerOptionGridProps = {
  options: QuizOption[];
  language: Language;
  previewId: string | null;
  confirmedId: string | null;
  onOptionTap: HTMLMotionProps<'button'>['onClick'];
  getOptionStyle: (option: QuizOption, isPreviewing: boolean) => AnswerOptionStyle;
  hintIdle?: string;
  hintActive?: string;
  className?: string;
  buttonBaseClassName?: string;
  textClassName?: string;
  animationDelay?: number;
};

const defaultInactiveClassName = 'border-white/65 bg-white/60 shadow-[0_8px_22px_rgba(28,25,23,0.035)]';
const defaultBadgeInactiveClassName = 'bg-white/40 border-stone-200/50 text-stone-400';
const defaultBadgeActiveClassName = 'bg-stone-900 border-stone-900 text-white font-semibold shadow-sm';

export default function AnswerOptionGrid({
  options,
  language,
  previewId,
  confirmedId,
  onOptionTap,
  getOptionStyle,
  hintIdle,
  hintActive,
  className = 'relative z-[5] px-5 pb-[max(4vh,env(safe-area-inset-bottom))] pt-3',
  buttonBaseClassName = 'relative flex min-h-[56px] touch-manipulation select-none items-center gap-2 overflow-hidden rounded-2xl border px-3 py-3.5 text-left outline-none transition-all duration-200 backdrop-blur-sm min-[390px]:min-h-[58px] min-[390px]:gap-3 min-[390px]:px-4 focus-visible:ring-2 focus-visible:ring-stone-400/40',
  textClassName = 'font-serif text-[13px] leading-tight tracking-[0.04em] transition-colors duration-200 min-[390px]:text-[14px]',
  animationDelay = 0.25,
}: AnswerOptionGridProps) {
  const activeHint = hintActive ?? (language === 'en' ? 'Double tap to confirm' : '雙擊確認選擇');

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-2 min-[390px]:gap-2.5">
        {options.map((option) => {
          const isPreviewing = previewId === option.id;
          const isMuted = confirmedId !== null && confirmedId !== option.id;
          const optionText = language === 'en' && option.textEn ? option.textEn : option.text;
          const style = getOptionStyle(option, isPreviewing);

          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={onOptionTap}
              data-option-id={option.id}
              disabled={confirmedId !== null}
              aria-label={language === 'en' ? `Select ${optionText}` : `選擇${optionText}`}
              aria-pressed={isPreviewing}
              className={`
                ${buttonBaseClassName}
                ${isPreviewing ? style.activeClassName : (style.inactiveClassName ?? defaultInactiveClassName)}
                ${isMuted ? (style.mutedClassName ?? 'opacity-45') : 'opacity-100'}
              `}
              whileTap={confirmedId ? undefined : { y: 1 }}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-medium tracking-normal transition-all duration-200 ${
                  isPreviewing
                    ? (style.badgeActiveClassName ?? defaultBadgeActiveClassName)
                    : (style.badgeInactiveClassName ?? defaultBadgeInactiveClassName)
                }`}
              >
                {option.id}
              </span>

              <div className="min-w-0 flex-1">
                <p
                  className={`${textClassName} max-w-full ${
                    language === 'zh'
                      ? 'whitespace-nowrap'
                      : 'text-pretty break-words leading-snug [overflow-wrap:anywhere]'
                  } ${isPreviewing ? 'text-stone-800' : 'text-stone-600'}`}
                >
                  {optionText}
                </p>
              </div>

              {confirmedId === option.id && <ConfirmRipple color={style.rippleColor} />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {!previewId && hintIdle ? (
          <motion.p
            key="idle-helper"
            className="mt-2.5 text-center font-sans text-[10px] font-light tracking-[0.18em] text-stone-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {hintIdle}
          </motion.p>
        ) : previewId && !confirmedId ? (
          <motion.p
            key="active-helper"
            className="mt-2 text-center font-sans text-[9px] font-light tracking-[0.3em] text-stone-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeHint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
