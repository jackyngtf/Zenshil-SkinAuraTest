'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { auraMoods } from '@/data/aura_moods';
import { useQuizStore, type Language } from '@/store/useQuizStore';
import type { QuizInteractionProps, QuizOption } from '../types';

const AnswerFooter = memo(({ optionId, text, textEn, isFocused, language }: { optionId: string; text: string; textEn?: string; isFocused: boolean; language: Language }) => (
  <div className={`absolute bottom-[5vh] left-0 right-0 z-20 flex flex-col items-center pointer-events-none transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-30'}`}>
    <span className="mb-3 ml-1 font-sans text-[9px] font-medium uppercase tracking-[0.5em] text-stone-600">
      Option {optionId}
    </span>
    <h3 className="mb-6 text-center font-serif text-3xl font-normal tracking-wider text-stone-800 drop-shadow-sm md:text-4xl">
      {language === 'en' && textEn ? textEn : text}
    </h3>
    <p className="ml-1 font-sans text-[9px] font-light uppercase tracking-[0.4em] text-stone-500/80">
      {language === 'en' ? 'Swipe to explore | Double tap to select' : '左右滑動選擇 ｜ 雙擊確認'}
    </p>
  </div>
));
AnswerFooter.displayName = 'AnswerFooter';

const SwipeNavigationHint = memo(({
  focusedIndex,
  total,
  onNavigate,
}: {
  focusedIndex: number;
  total: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}) => {
  const showLeft = focusedIndex > 0;
  const showRight = focusedIndex !== -1 && focusedIndex < total - 1;

  return (
    <>
      <AnimatePresence>
        {showLeft && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-y-0 left-0 z-40 flex items-center"
          >
            <button
              onClick={() => onNavigate('prev')}
              className="cursor-pointer p-6 transition-opacity hover:opacity-100"
              aria-label="Previous option"
            >
              <motion.div animate={{ x: [-3, 0, -3] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ChevronLeft className="h-6 w-6 text-stone-400" strokeWidth={1} />
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showRight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-y-0 right-0 z-40 flex items-center"
          >
            <button
              onClick={() => onNavigate('next')}
              className="cursor-pointer p-6 transition-opacity hover:opacity-100"
              aria-label="Next option"
            >
              <motion.div animate={{ x: [3, 0, 3] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ChevronRight className="h-6 w-6 text-stone-400" strokeWidth={1} />
              </motion.div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
SwipeNavigationHint.displayName = 'SwipeNavigationHint';

const HeroScene = memo(({
  option,
  isFocused,
  isConfirming,
  onDoubleTap,
  language
}: {
  option: QuizOption;
  isFocused: boolean;
  isConfirming: boolean;
  onDoubleTap: (id: string) => void;
  language: Language;
}) => {
  const [lastTap, setLastTap] = useState(0);
  const mood = auraMoods[option.auraMapping] || auraMoods['neutral'];

  const handleTap = () => {
    if (!isFocused) return;
    const now = Date.now();
    if (now - lastTap < 400) {
      onDoubleTap(option.id);
    }
    setLastTap(now);
  };

  return (
    <div
      className="relative flex h-full w-screen shrink-0 snap-center cursor-pointer flex-col items-center justify-center overflow-hidden"
      onClick={handleTap}
      data-option-id={option.id}
    >
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ease-out ${isFocused ? 'scale-100 opacity-100' : 'scale-105 opacity-50'} ${isConfirming ? 'scale-110 opacity-0' : ''}`}>
        {option.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={option.imageUrl}
            alt={option.text}
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-200">
            <span className="text-xs uppercase tracking-widest text-stone-400/50">Illustration Space</span>
          </div>
        )}
      </div>

      <div className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-b ${mood.gradient} mix-blend-multiply transition-opacity duration-1000 ${isFocused ? 'opacity-40' : 'opacity-80'}`} />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[30vh] bg-gradient-to-b from-stone-50/90 via-stone-50/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[45vh] bg-gradient-to-t from-stone-50/90 via-stone-50/50 to-transparent" />
      <div className="noise-overlay pointer-events-none absolute inset-0 z-10 opacity-[0.3]" />

      <AnimatePresence>
        {isConfirming && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`pointer-events-none absolute inset-0 z-30 bg-gradient-to-t ${mood.gradient} mix-blend-overlay`}
          />
        )}
      </AnimatePresence>

      <AnswerFooter 
        optionId={option.id} 
        text={option.text} 
        textEn={option.textEn}
        isFocused={isFocused} 
        language={language}
      />
    </div>
  );
});
HeroScene.displayName = 'HeroScene';

const ZenHarmonyScale = ({ progress }: { progress: number }) => {
  const tilt = (progress - 0.5) * 16;
  const offset = (progress - 0.5) * 100;
  
  return (
    <div className="absolute bottom-[23vh] left-0 right-0 z-20 flex flex-col items-center pointer-events-none">
      <div className="relative w-48 h-12 flex items-center justify-center">
        <motion.div 
          className="absolute w-40 h-[1.5px] bg-stone-500/20 rounded-full"
          style={{ rotate: tilt }}
          animate={{ rotate: tilt }}
          transition={{ type: 'spring', stiffness: 90, damping: 18 }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-stone-300 border border-stone-400/40" />
          <div className="absolute left-0 -top-1 w-1 h-2 rounded-sm bg-stone-400/20" />
          <div className="absolute right-0 -top-1 w-1 h-2 rounded-sm bg-stone-400/20" />
        </motion.div>

        <motion.div
          className="absolute w-4 h-2.5 rounded-full bg-stone-800/60 shadow-sm backdrop-blur-[0.5px]"
          style={{ x: offset, y: -4.5 }}
          animate={{ x: offset }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
        />
      </div>
      <span className="mt-1 font-sans text-[8px] font-light uppercase tracking-[0.35em] text-stone-400/60">
        Inner Balance
      </span>
    </div>
  );
};

export default function FullPageSceneQuestion({ question, onSelect }: QuizInteractionProps) {
  const [focusedOptionId, setFocusedOptionId] = useState<string | null>(question.options[0]?.id ?? null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const language = useQuizStore((state) => state.language);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'auto' });
      setScrollProgress(0);
    }
  }, [question.id]);

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scrollToOption = (optionId: string) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const child = Array.from(container.children).find(
      (el) => (el as HTMLElement).dataset.optionId === optionId,
    ) as HTMLElement | undefined;

    if (child) {
      const scrollLeft = child.offsetLeft - container.clientWidth / 2 + child.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Calculate real-time scroll progress for the balance scale
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(container.scrollLeft / maxScroll);
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const scrollCenter = container.scrollLeft + container.clientWidth / 2;
      let closestChild: Element | null = null;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child) => {
        if (!(child as HTMLElement).dataset.optionId) return;

        const childCenter = (child as HTMLElement).offsetLeft + (child as HTMLElement).clientWidth / 2;
        const distance = Math.abs(scrollCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestChild = child;
        }
      });

      if (closestChild) {
        const id = (closestChild as HTMLElement).dataset.optionId;
        if (id && id !== focusedOptionId) {
          setFocusedOptionId(id);
        }
      }
    }, 50);
  }, [focusedOptionId]);

  const handleDoubleTapConfirm = (optionId: string) => {
    if (confirmingId) return;
    setConfirmingId(optionId);
    window.setTimeout(() => onSelect(optionId), 800);
  };

  const focusedIndex = question.options.findIndex((option) => option.id === focusedOptionId);

  const handleNavigateArrow = (direction: 'prev' | 'next') => {
    if (focusedIndex === -1) return;

    let newIndex = focusedIndex;
    if (direction === 'prev' && focusedIndex > 0) {
      newIndex = focusedIndex - 1;
    } else if (direction === 'next' && focusedIndex < question.options.length - 1) {
      newIndex = focusedIndex + 1;
    }

    if (newIndex !== focusedIndex) {
      scrollToOption(question.options[newIndex].id);
    }
  };

  return (
    <>
      <SwipeNavigationHint focusedIndex={focusedIndex} total={question.options.length} onNavigate={handleNavigateArrow} />

      {/* Zen Harmony Scale balance indicator */}
      <ZenHarmonyScale progress={scrollProgress} />

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-full w-full hide-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        {question.options.map((option) => (
          <HeroScene
            key={option.id}
            option={option}
            isFocused={focusedOptionId === option.id}
            isConfirming={confirmingId === option.id}
            onDoubleTap={handleDoubleTapConfirm}
            language={language}
          />
        ))}
      </div>
    </>
  );
}
