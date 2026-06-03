'use client';

import { useQuizStore } from '@/store/useQuizStore';

function ZenshilLogo() {
  return (
    <div className="flex flex-col items-center justify-center pt-2">
      <svg viewBox="0 0 100 80" className="w-8 h-8 opacity-90" aria-hidden="true">
        {/* Top stone */}
        <path d="M50 10 C38 10, 35 25, 50 30 C65 25, 62 10, 50 10 Z" fill="currentColor" />
        {/* Middle stone */}
        <path d="M50 35 C20 45, 25 55, 50 50 C75 45, 80 35, 50 35 Z" fill="currentColor" />
        {/* Bottom stone */}
        <path d="M50 55 C10 55, 15 70, 50 70 C85 70, 90 55, 50 55 Z" fill="currentColor" />
      </svg>
      <span className="font-serif tracking-[0.25em] text-[10px] mt-1 ml-1 font-medium uppercase text-stone-800">
        Zenshil
      </span>
    </div>
  );
}

export default function GlobalHeader() {
  const language = useQuizStore((state) => state.language);
  const setLanguage = useQuizStore((state) => state.setLanguage);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const totalQuestions = useQuizStore((state) => state.totalQuestions);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none">
      <div className="pointer-events-auto">
        <ZenshilLogo />
      </div>

      {currentQuestionIndex !== null && totalQuestions !== null && (
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pt-2">
          <span className="font-sans text-[10px] tracking-[0.3em] text-stone-600 font-semibold">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
      )}

      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-stone-200/50 bg-white/50 backdrop-blur-md p-1 shadow-sm mt-2">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-[10px] font-sans font-medium transition-colors ${
            language === 'en' ? 'bg-stone-800 text-white' : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-pressed={language === 'en'}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('zh')}
          className={`px-3 py-1 rounded-full text-[10px] font-sans font-medium transition-colors ${
            language === 'zh' ? 'bg-stone-800 text-white' : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-pressed={language === 'zh'}
        >
          中
        </button>
      </div>
    </header>
  );
}
