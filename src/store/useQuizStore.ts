import { create } from 'zustand';

export type Language = 'zh' | 'en';

interface QuizState {
  answers: Record<string, string>;
  language: Language;
  currentQuestionIndex: number | null;
  totalQuestions: number | null;
  setAnswer: (questionId: string, optionId: string) => void;
  setLanguage: (lang: Language) => void;
  setCurrentQuestionInfo: (index: number | null, total: number | null) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  answers: {},
  language: 'zh',
  currentQuestionIndex: null,
  totalQuestions: null,
  setAnswer: (questionId, optionId) => 
    set((state) => ({ answers: { ...state.answers, [questionId]: optionId } })),
  setLanguage: (lang) => set({ language: lang }),
  setCurrentQuestionInfo: (index, total) => set({ currentQuestionIndex: index, totalQuestions: total }),
  resetQuiz: () => set({ answers: {}, currentQuestionIndex: null, totalQuestions: null })
}));
