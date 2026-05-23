'use client';

import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmRipple from '../ConfirmRipple';
import EmotionStageMotif from '../visuals/EmotionStageMotif';
import SkinVoiceMembrane from '../visuals/SkinVoiceMembrane';
import { useQuizStore } from '@/store/useQuizStore';
import type { QuizInteractionProps } from '../types';

/* ------------------------------------------------------------------ */
/*  We define generic emotion colors mapping based on the auraMapping  */
/*  This allows Q3 and Q7 to share styling logic while the SVG        */
/*  contents are entirely different.                                  */
/* ------------------------------------------------------------------ */
type EmotionTheme = {
  bgGradient: string;
  buttonBorder: string;
  buttonActiveBg: string;
  accentDot: string;
  rippleColor: string;
};

const q3NeutralTheme: EmotionTheme = {
  bgGradient: 'from-stone-50/70 via-slate-50/50 to-stone-100/40',
  buttonBorder: 'border-stone-200/40',
  buttonActiveBg: 'bg-white/50',
  accentDot: 'bg-stone-300',
  rippleColor: 'rgba(255,255,255,0.85)',
};

const emotionThemes: Record<string, EmotionTheme> = {
  overworked: { // Q3 A (Exhausted), Q7 A (Dullness)
    bgGradient: 'from-purple-50/60 via-slate-50/40 to-stone-100/30',
    buttonBorder: 'border-purple-300/50',
    buttonActiveBg: 'bg-purple-100/60',
    accentDot: 'bg-purple-400',
    rippleColor: 'rgba(216,180,254,0.85)',
  },
  stress: { // Q3 B (Stressed), Q7 C (Sensitive)
    bgGradient: 'from-rose-50/60 via-stone-50/40 to-red-50/30',
    buttonBorder: 'border-rose-300/50',
    buttonActiveBg: 'bg-rose-100/60',
    accentDot: 'bg-rose-400',
    rippleColor: 'rgba(254,205,211,0.85)',
  },
  recovery: { // Q3 C (Needs rest)
    bgGradient: 'from-teal-50/60 via-slate-50/40 to-emerald-50/30',
    buttonBorder: 'border-teal-300/50',
    buttonActiveBg: 'bg-teal-100/60',
    accentDot: 'bg-teal-400',
    rippleColor: 'rgba(153,246,228,0.85)',
  },
  preventive: { // Q3 D (Growth)
    bgGradient: 'from-lime-50/60 via-stone-50/40 to-green-50/30',
    buttonBorder: 'border-amber-300/40',
    buttonActiveBg: 'bg-amber-50/50',
    accentDot: 'bg-amber-400',
    rippleColor: 'rgba(253,230,138,0.85)',
  },
  hidden_aging: { // Q7 B (Firmness)
    bgGradient: 'from-indigo-50/60 via-purple-50/40 to-stone-100/30',
    buttonBorder: 'border-indigo-300/50',
    buttonActiveBg: 'bg-indigo-100/60',
    accentDot: 'bg-indigo-400',
    rippleColor: 'rgba(199,210,254,0.85)',
  },
  glow: { // Q7 D (Radiance)
    bgGradient: 'from-amber-50/60 via-yellow-50/40 to-stone-50/30',
    buttonBorder: 'border-amber-300/50',
    buttonActiveBg: 'bg-amber-100/60',
    accentDot: 'bg-amber-400',
    rippleColor: 'rgba(253,230,138,0.85)',
  },
};

/* ------------------------------------------------------------------ */
/*  Q3 Full Screen Background Aura Layer                              */
/* ------------------------------------------------------------------ */
type AuraColors = {
  blob1: string;
  blob2: string;
  blob3: string;
  blob4: string;
};

const q3AuraColors: Record<string, AuraColors> = {
  idle: {
    blob1: 'rgba(245, 236, 227, 0.4)', // pearl ivory
    blob2: 'rgba(235, 230, 245, 0.35)', // faint lavender
    blob3: 'rgba(248, 230, 232, 0.3)',  // soft blush
    blob4: 'rgba(225, 235, 242, 0.35)', // mist blue
  },
  A: { // Tired: soft blue grey + muted lavender + faint blush
    blob1: 'rgba(209, 218, 227, 0.45)', // soft blue grey
    blob2: 'rgba(215, 206, 230, 0.5)',  // muted lavender
    blob3: 'rgba(248, 230, 232, 0.22)', // faint blush residual
    blob4: 'rgba(220, 225, 235, 0.4)',  // blue grey blend
  },
  B: { // Pressure: smoky violet + muted mauve + very soft coral
    blob1: 'rgba(211, 195, 219, 0.45)', // smoky violet
    blob2: 'rgba(219, 184, 194, 0.45)', // muted mauve
    blob3: 'rgba(245, 207, 199, 0.4)',  // very soft coral
    blob4: 'rgba(215, 210, 225, 0.35)', // violet tint
  },
  C: { // Rest: mineral teal + ivory + soft mint + faint lavender
    blob1: 'rgba(180, 230, 222, 0.4)',  // mineral teal
    blob2: 'rgba(253, 248, 235, 0.45)', // ivory
    blob3: 'rgba(200, 240, 225, 0.35)', // soft mint
    blob4: 'rgba(235, 225, 245, 0.22)', // faint lavender residual
  },
  D: { // Renewal: soft gold + pearl green + warm ivory + faint blush
    blob1: 'rgba(253, 240, 190, 0.45)', // soft gold
    blob2: 'rgba(210, 242, 220, 0.4)',  // pearl green
    blob3: 'rgba(253, 248, 235, 0.35)', // warm ivory
    blob4: 'rgba(248, 230, 232, 0.22)', // faint blush residual
  },
};

function Q3FullScreenAura({ previewId }: { previewId: string | null }) {
  const currentMood = (previewId ?? 'idle') as 'idle' | 'A' | 'B' | 'C' | 'D';
  const colors = q3AuraColors[currentMood] || q3AuraColors.idle;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background base */}
      <div className="absolute inset-0 bg-[#f8f7f5]" />

      {/* Blob 1: Top Left */}
      <motion.div
        className="absolute -left-[10%] -top-[10%] h-[60dvh] w-[60dvh] rounded-full blur-[100px] opacity-70"
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -30, 15, 0],
          backgroundColor: colors.blob1,
        }}
        transition={{
          backgroundColor: { duration: 0.8, ease: "easeInOut" },
          x: { duration: 16, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Blob 2: Top Right */}
      <motion.div
        className="absolute -right-[10%] -top-[10%] h-[55dvh] w-[55dvh] rounded-full blur-[90px] opacity-70"
        animate={{
          x: [0, -25, 10, 0],
          y: [0, 25, -20, 0],
          backgroundColor: colors.blob2,
        }}
        transition={{
          backgroundColor: { duration: 0.8, ease: "easeInOut" },
          x: { duration: 17, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Blob 3: Bottom Center */}
      <motion.div
        className="absolute -right-[5%] -bottom-[15%] h-[65dvh] w-[65dvh] rounded-full blur-[110px] opacity-65"
        animate={{
          x: [0, -20, 25, 0],
          y: [0, -30, 10, 0],
          backgroundColor: colors.blob3,
        }}
        transition={{
          backgroundColor: { duration: 0.8, ease: "easeInOut" },
          x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Blob 4: Bottom Left */}
      <motion.div
        className="absolute -left-[15%] -bottom-[10%] h-[50dvh] w-[50dvh] rounded-full blur-[95px] opacity-60"
        animate={{
          x: [0, 30, -10, 0],
          y: [0, 15, -25, 0],
          backgroundColor: colors.blob4,
        }}
        transition={{
          backgroundColor: { duration: 0.8, ease: "easeInOut" },
          x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
}

export default function EmotionStageQuestion({
  question,
  onSelect,
}: QuizInteractionProps) {
  const language = useQuizStore((state) => state.language);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef<{ id: string | null; time: number }>({ id: null, time: 0 });

  const selectedOption = question.options.find(o => o.id === previewId);
  const activeTheme = selectedOption?.auraMapping && emotionThemes[selectedOption.auraMapping]
    ? emotionThemes[selectedOption.auraMapping]
    : (question.id === 'q3' ? q3NeutralTheme : emotionThemes['overworked']);

  const handleCommit = (optionId: string) => {
    if (confirmedId) return;
    setConfirmedId(optionId);
    if (commitTimer.current) clearTimeout(commitTimer.current);
    commitTimer.current = setTimeout(() => onSelect(optionId), 500);
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

  // Border and subtle tint styles for Q3 active option choices
  const q3ActiveStyles: Record<string, string> = {
    A: 'border-purple-300 bg-purple-50/35 -translate-y-[1px] shadow-sm',
    B: 'border-rose-300 bg-rose-50/35 -translate-y-[1px] shadow-sm',
    C: 'border-teal-300 bg-teal-50/35 -translate-y-[1px] shadow-sm',
    D: 'border-amber-300 bg-amber-50/35 -translate-y-[1px] shadow-sm',
  };

  return (
    <div
      className="relative flex h-[100dvh] flex-col overflow-hidden"
      aria-labelledby={`question-${question.id}`}
    >
      <div className="h-[140px] sm:h-[150px] shrink-0 pointer-events-none" />

      {/* Background tint gradient or Full Screen Aura */}
      {question.id === 'q3' ? (
        <Q3FullScreenAura previewId={previewId} />
      ) : (
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
      )}

      <div className="noise-overlay pointer-events-none absolute inset-0 z-[1] opacity-[0.06]" />

      {/* CENTRAL RESPONSIVE AURA CONTAINER */}
      <div className="relative z-[2] flex flex-1 min-h-0 flex-col items-center justify-center px-6 py-2">
        {question.id === 'q3' ? (
          <SkinVoiceMembrane
            selectedOptionId={previewId}
            quote={
              language === 'en' && selectedOption?.textEn 
                ? `"${selectedOption.textEn}."` 
                : selectedOption?.text 
                  ? `「${selectedOption.text}。」`
                  : ''
            }
            moodState={
              previewId === 'A' ? 'tired' :
              previewId === 'B' ? 'pressure' :
              previewId === 'C' ? 'rest' :
              previewId === 'D' ? 'renewal' :
              'idle'
            }
            language={language}
            isConfirming={confirmedId !== null}
          />
        ) : (
          /* Soft aura mask container for Q7 */
          <div
            className="relative overflow-hidden rounded-full flex-shrink-0"
            style={{
              height: '100%', width: '100%', maxWidth: '280px', maxHeight: '280px', aspectRatio: '1 / 1',
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 72%)',
            }}
          >
            {/* SVG Visual Component */}
            <EmotionStageMotif
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
        )}
      </div>

      {/* Choice buttons grid (2x2 grid is better for short answers like Q3/Q7) */}
      <motion.div
        className="relative z-[5] px-5 pb-[max(4vh,env(safe-area-inset-bottom))] pt-3"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-2">
          {question.options.map((option) => {
            const isQ3 = question.id === 'q3';
            const theme = option.auraMapping && emotionThemes[option.auraMapping]
              ? emotionThemes[option.auraMapping]
              : emotionThemes['overworked'];
            
            const isPreviewing = previewId === option.id;
            const isMuted = confirmedId !== null && confirmedId !== option.id;

            return (
              <motion.button
                key={option.id}
                type="button"
                onClick={(e) => handleTap(option.id, e)}
                disabled={confirmedId !== null}
                className={
                  isQ3
                    ? `
                      relative flex items-center gap-1.5 min-[390px]:gap-2 overflow-hidden border
                      text-left outline-none transition-all duration-300
                      backdrop-blur-md px-2.5 min-[390px]:px-3 py-2.5 rounded-xl
                      focus-visible:ring-2 focus-visible:ring-stone-400/40
                      ${isPreviewing
                        ? q3ActiveStyles[option.id]
                        : `bg-white/55 border-white/60 shadow-[0_4px_16px_rgba(28,25,23,0.02)]`
                      }
                      ${isMuted ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                    `
                    : `
                      relative flex items-center gap-3 overflow-hidden border
                      text-left outline-none transition-all duration-300
                      backdrop-blur-sm px-4 py-3.5 rounded-2xl
                      focus-visible:ring-2 focus-visible:ring-stone-400/40
                      ${isPreviewing
                        ? `${theme.buttonActiveBg} ${theme.buttonBorder} scale-[1.01] shadow-[0_4px_20px_rgba(0,0,0,0.06)]`
                        : `bg-white/50 border-stone-200/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)]`
                      }
                      ${isMuted ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                    `
                }
                whileTap={confirmedId ? undefined : { scale: 0.98 }}
              >
                <span
                  className={
                    isQ3
                      ? `flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full border text-[10px] font-sans font-medium tracking-normal transition-all duration-300 ${
                          isPreviewing
                            ? 'bg-stone-850 border-stone-850 text-white font-semibold'
                            : 'bg-stone-100/60 border-stone-200/30 text-stone-500'
                        }`
                      : `flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-medium tracking-normal transition-all duration-300 ${
                          isPreviewing
                            ? `${theme.buttonActiveBg} ${theme.buttonBorder} text-stone-750 font-semibold shadow-sm`
                            : 'bg-white/40 border-stone-200/50 text-stone-400'
                        }`
                  }
                >
                  {option.id}
                </span>

                <div className="min-w-0 flex-1">
                  <p className={`font-serif text-[13px] min-[360px]:text-[14px] min-[390px]:text-[15px] tracking-wider transition-colors duration-300 ${
                    isPreviewing ? 'text-stone-850 font-medium' : 'text-stone-600'
                  }`}>
                    {language === 'en' && option.textEn ? option.textEn : option.text}
                  </p>
                </div>

                {confirmedId === option.id && <ConfirmRipple color={theme.rippleColor} />}

                <span
                  className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${theme.accentDot} ${
                    isPreviewing ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {!previewId ? (
            <motion.p
              key="q3-idle-helper"
              className="mt-2.5 text-center font-sans text-[10px] font-light tracking-[0.18em] text-stone-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {question.id === 'q3'
                ? (language === 'en' ? 'Select the whisper that closest matches your skin' : '選擇最貼近皮膚心聲的一句')
                : ''
              }
            </motion.p>
          ) : !confirmedId ? (
            <motion.p
              key="q3-active-helper"
              className="mt-2.5 text-center font-sans text-[9px] font-light tracking-[0.3em] text-stone-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {language === 'en' ? 'Double tap to confirm' : '雙擊確認選擇'}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

