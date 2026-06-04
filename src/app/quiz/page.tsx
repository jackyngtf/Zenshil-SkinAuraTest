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
  const [analysisStep, setAnalysisStep] = useState(0);

  const setCurrentQuestionInfo = useQuizStore((state) => state.setCurrentQuestionInfo);
  const language = useQuizStore((state) => state.language);
  const analysisSteps = language === 'en'
    ? ['Reading your skin rhythm...', 'Analysing your lifestyle pace...', 'Revealing your Skin Aura...']
    : ['正在讀取你的肌膚能量...', '分析生活節奏...', '生成專屬 Aura...'];

  useEffect(() => {
    setCurrentQuestionInfo(currentIndex, questions.length);
    return () => {
      setCurrentQuestionInfo(null, null);
    };
  }, [currentIndex, setCurrentQuestionInfo]);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (!isAnalyzing) return;

    const timer1 = setTimeout(() => setAnalysisStep(1), 1200);
    const timer2 = setTimeout(() => setAnalysisStep(2), 2400);
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
      setAnalysisStep(0);
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
      <main className="app-min-screen relative flex touch-manipulation flex-col items-center justify-center overflow-hidden bg-[#f8f5ef] px-6 text-stone-800">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: [
              'radial-gradient(circle at 50% 34%, rgba(255,255,255,0.92) 0%, transparent 38%)',
              'radial-gradient(circle at 38% 48%, rgba(244,190,205,0.34) 0%, transparent 28%)',
              'radial-gradient(circle at 62% 46%, rgba(165,214,203,0.32) 0%, transparent 30%)',
              'radial-gradient(circle at 50% 82%, rgba(222,205,181,0.16) 0%, transparent 36%)',
            ].join(', '),
          }}
        />
        <div className="noise-overlay absolute inset-0 z-0 opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 flex w-full max-w-sm flex-col items-center text-center"
        >
          <p className="mb-8 text-[9px] font-medium uppercase tracking-[0.28em] text-stone-400">
            {language === 'en' ? 'Skin Aura Analysis' : '肌膚氣場分析中'}
          </p>

          <div className="relative mb-10 flex size-56 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-white/45 shadow-[inset_0_1px_24px_rgba(255,255,255,0.75),0_24px_80px_rgba(170,145,130,0.12)]" />
            <motion.div
              animate={{ opacity: [0.55, 0.85, 0.55], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_48%_44%,rgba(255,255,255,0.95),rgba(247,170,198,0.54)_36%,rgba(157,212,198,0.42)_68%,transparent_82%)] blur-sm"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-6 rounded-full opacity-45"
              style={{
                background: 'conic-gradient(from 90deg, transparent, rgba(246,185,211,0.42), rgba(182,219,208,0.36), rgba(239,220,182,0.28), transparent)',
                filter: 'blur(10px)',
              }}
            />
            <div className="absolute inset-3 rounded-full border border-white/65" />
            <div className="absolute inset-12 rounded-full border border-white/35" />
            <div className="absolute left-[25%] top-[27%] h-16 w-1/2 rotate-[-18deg] rounded-full bg-white/45 blur-xl" />
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={analysisStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="min-h-8 rounded-full bg-[#f8f5ef]/60 px-5 py-1.5 text-center font-serif text-[21px] leading-relaxed text-stone-800 shadow-sm text-balance"
            >
              {analysisSteps[analysisStep]}
            </motion.p>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-3">
            {analysisSteps.map((step, index) => (
              <span
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === analysisStep
                    ? 'w-8 bg-[#c1a88a]'
                    : index < analysisStep
                      ? 'w-3 bg-stone-300'
                      : 'w-3 bg-stone-200/80'
                }`}
              />
            ))}
          </div>

          <p className="mt-7 max-w-[280px] text-[11px] font-light leading-relaxed text-stone-500 text-pretty">
            {language === 'en'
              ? 'Zenshil is translating your choices into a personalized skin aura profile.'
              : 'Zenshil 正在將你的選擇轉化成專屬肌膚氣場報告。'}
          </p>
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
