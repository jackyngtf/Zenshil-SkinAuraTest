'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import WeatherStageQuestion from './interactions/WeatherStageQuestion';
import ElementStageQuestion from './interactions/ElementStageQuestion';
import ImageStageQuestion from './interactions/ImageStageQuestion';
import EmotionStageQuestion from './interactions/EmotionStageQuestion';
import RitualStageQuestion from './interactions/RitualStageQuestion';
import AuraFieldQuestion from './interactions/AuraFieldQuestion';
import ResourceMeterQuestion from './interactions/ResourceMeterQuestion';
import MirrorFocusQuestion from './interactions/MirrorFocusQuestion';
import { useQuizStore } from '@/store/useQuizStore';
import type { QuizQuestion } from './types';

const QuizHeader = ({
  currentNum,
  totalNum,
  questionId,
  questionText,
  onBack,
}: {
  currentNum: number;
  totalNum: number;
  questionId: string;
  questionText: string;
  onBack: () => void;
}) => (
  <div className="pointer-events-none fixed left-0 right-0 top-0 z-40 flex flex-col items-center px-6 pb-2 pt-[85px]">

    {/* Top Row: Back Button & Progress Bar (Full width) */}
    <div className="relative flex w-full items-center mb-4">
      <button
        onClick={onBack}
        className="pointer-events-auto absolute left-[-16px] p-2 text-stone-500 transition-colors hover:text-stone-800"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {/* Progress Bar Line */}
      <div className="relative h-[2px] w-full ml-6 overflow-hidden rounded-full bg-stone-300/40">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-[#C1A88A]"
          initial={{ width: 0 }}
          animate={{ width: `${(currentNum / totalNum) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>

    {/* Question Title Row */}
    <div className="flex w-full items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.h2
          id={`question-${questionId}`}
          key={questionText}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="w-full max-w-[320px] text-center font-serif text-[18px] sm:text-[20px] font-normal leading-relaxed tracking-[0.03em] text-stone-800 drop-shadow-sm"
        >
          {questionText}
        </motion.h2>
      </AnimatePresence>
    </div>

  </div>
);

interface QuizQuestionRendererProps {
  question: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  onSelect: (optionId: string) => void;
  onBack: () => void;
}

export default function QuizQuestionRenderer({
  question,
  currentQuestionIndex,
  totalQuestions,
  onSelect,
  onBack,
}: QuizQuestionRendererProps) {
  const language = useQuizStore((state) => state.language);
  const interactionType = question.interaction?.type;

  const localizedQuestionText = language === 'en' && question.questionTextEn
    ? question.questionTextEn
    : question.questionText;

  const interactionProps = {
    question,
    currentQuestionIndex,
    totalQuestions,
    onSelect,
  };

  return (
    <>
      <QuizHeader
        currentNum={currentQuestionIndex + 1}
        totalNum={totalQuestions}
        questionId={question.id}
        questionText={localizedQuestionText}
        onBack={onBack}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`question-${question.id}-${interactionType}`}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42 }}
          className="absolute inset-0 h-full w-full"
        >
          {interactionType === 'auraField' ? (
            <AuraFieldQuestion {...interactionProps} />
          ) : interactionType === 'imageStage' ? (
            <ImageStageQuestion {...interactionProps} />
          ) : interactionType === 'resourceMeter' ? (
            <ResourceMeterQuestion {...interactionProps} />
          ) : interactionType === 'mirrorFocus' ? (
            <MirrorFocusQuestion {...interactionProps} />
          ) : interactionType === 'elementStage' ? (
            <ElementStageQuestion {...interactionProps} />
          ) : interactionType === 'weatherStage' ? (
            <WeatherStageQuestion {...interactionProps} />
          ) : interactionType === 'emotionStage' ? (
            <EmotionStageQuestion {...interactionProps} />
          ) : interactionType === 'ritualStage' ? (
            <RitualStageQuestion {...interactionProps} />
          ) : (
            null
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
