'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';

export default function ResultActionRow() {
  const language = useQuizStore((state) => state.language);

  const actions = [
    {
      label: language === 'en' ? 'SHARE TO IG' : '分享至 IG STORY',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      label: language === 'en' ? 'SAVE RESULT' : '儲存測試結果',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      label: language === 'en' ? 'BOOK RITUAL' : '預約肌膚諮詢',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-5 mb-8"
    >
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-2.5 py-4 px-2 bg-white/60 backdrop-blur-sm border border-stone-200/40 rounded-2xl text-stone-500 hover:text-stone-800 hover:bg-white/80 transition-all duration-300 active:scale-[0.97]"
          >
            {action.icon}
            <span className="text-[7px] font-sans font-medium tracking-[0.15em] uppercase leading-tight text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </motion.section>
  );
}
