"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import questionsData from '@/data/questions.json';
import { useQuizStore } from '@/store/useQuizStore';
import QuizQuestionRenderer from './components/QuizQuestionRenderer';
import type { QuizQuestion } from './components/types';

// Forced HMR reload comment for questions.json update
const questions = questionsData as QuizQuestion[];

export default function QuizQuestionScreen() {
  const router = useRouter();
  const { setAnswer } = useQuizStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState('正在讀取你的肌膚能量...');

  const setCurrentQuestionInfo = useQuizStore((state) => state.setCurrentQuestionInfo);

  useEffect(() => {
    setCurrentQuestionInfo(currentIndex, questions.length);
    return () => {
      setCurrentQuestionInfo(null, null);
    };
  }, [currentIndex, setCurrentQuestionInfo]);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!isAnalyzing) return;

    const timer1 = setTimeout(() => setAnalysisText('分析生活節奏...'), 1200);
    const timer2 = setTimeout(() => setAnalysisText('生成專屬 Aura...'), 2400);
    const timer3 = setTimeout(() => router.push('/result'), 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isAnalyzing, router]);

  const handleSelect = (optionId: string) => {
    setAnswer(currentQuestion.id, optionId);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((current) => current + 1);
    } else {
      setIsAnalyzing(true);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((current) => current - 1);
    } else {
      router.push('/');
    }
  };

  if (isAnalyzing) {
    return (
      <main className="app-min-screen relative flex touch-manipulation flex-col items-center justify-center overflow-hidden bg-stone-900 text-stone-100">
        <div className="noise-overlay absolute inset-0 z-0" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex h-32 w-32 items-center justify-center"
        >
          <div className="fluid-blob absolute inset-0 bg-gradient-to-tr from-rose-400 to-teal-300 opacity-70 blur-xl" />
          <AnimatePresence mode="wait">
            <motion.p
              key={analysisText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="z-10 whitespace-nowrap text-center font-serif text-lg tracking-[0.15em] text-white/90"
            >
              {analysisText}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="app-screen relative w-full touch-manipulation overflow-hidden bg-stone-50 selection:bg-rose-200">
      <QuizQuestionRenderer
        question={currentQuestion}
        currentQuestionIndex={currentIndex}
        totalQuestions={questions.length}
        onSelect={handleSelect}
        onBack={handleBack}
      />
    </main>
  );
}
