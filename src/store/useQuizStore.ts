import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Language = 'zh' | 'en';

// Bump when quiz structure/scoring changes so stored results are invalidated.
const STATE_VERSION = 1;

interface QuizState {
  answers: Record<string, string>;
  language: Language;
  currentQuestionIndex: number | null;
  totalQuestions: number | null;
  /** Non-null once the user finishes the full quiz. Used as the "locked to result" gate. */
  completedAt: number | null;
  setAnswer: (questionId: string, optionId: string) => void;
  setLanguage: (lang: Language) => void;
  setCurrentQuestionInfo: (index: number | null, total: number | null) => void;
  markCompleted: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      language: 'zh',
      currentQuestionIndex: null,
      totalQuestions: null,
      completedAt: null,
      setAnswer: (questionId, optionId) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: optionId } })),
      setLanguage: (lang) => set({ language: lang }),
      setCurrentQuestionInfo: (index, total) =>
        set({ currentQuestionIndex: index, totalQuestions: total }),
      markCompleted: () => set({ completedAt: Date.now() }),
      resetQuiz: () => {
        // Clear the rarity posted flag so the next result records fresh.
        if (typeof window !== 'undefined') {
          localStorage.removeItem('zenshil-rarity-posted');
        }
        set({ answers: {}, currentQuestionIndex: null, totalQuestions: null, completedAt: null });
      },
    }),
    {
      name: 'zenshil-quiz',
      version: STATE_VERSION,
      storage: createJSONStorage(() => localStorage),
      // Persist only user-meaningful state; transient quiz progress is not needed
      // once the result is locked in.
      partialize: (state) => ({
        answers: state.answers,
        language: state.language,
        completedAt: state.completedAt,
      }),
    },
  ),
);
