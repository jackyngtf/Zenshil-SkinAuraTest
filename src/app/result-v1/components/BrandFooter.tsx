'use client';

import { motion } from 'framer-motion';

import { useQuizStore } from '@/store/useQuizStore';

export default function BrandFooter() {
  const language = useQuizStore((state) => state.language);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto px-5 pt-6 pb-16 text-center"
    >
      <div className="w-8 h-px bg-stone-200 mx-auto mb-6" />
      <p className="text-[11px] font-serif tracking-[0.5em] uppercase text-stone-400 mb-2">
        ZENSHIL
      </p>
      <p className="text-[10px] font-sans text-stone-400/60 tracking-[0.2em] font-light italic">
        {language === 'en' 
          ? 'Your skin. Your rhythm. Your ritual.' 
          : '你的肌膚。你的節奏。你的儀式。'}
      </p>
    </motion.footer>
  );
}
