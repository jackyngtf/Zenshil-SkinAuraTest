'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import { insightPoints } from './resultData';

interface PersonalitySkinBlockProps {
  description: string;
  auraId: string;
}

export default function PersonalitySkinBlock({ description, auraId }: PersonalitySkinBlockProps) {
  const language = useQuizStore((state) => state.language);
  const insights = insightPoints[auraId] ?? [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-md mx-auto px-5 mb-5"
    >
      <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        {/* Section title */}
        <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-stone-900 mb-5">
          {language === 'en' ? 'PERSONALITY & SKIN' : '個性與肌膚'}
        </h3>

        {/* Summary paragraph */}
        <p className="text-stone-600 font-sans leading-relaxed text-[13px] mb-7 font-light">
          {description}
        </p>

        {/* Divider */}
        <div className="w-8 h-px bg-stone-200 mb-6" />

        {/* Insight items */}
        <div className="space-y-5">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-4"
            >
              <span className="text-lg mt-0.5 flex-shrink-0 w-7 h-7 flex items-center justify-center bg-stone-50 rounded-xl">
                {insight.icon}
              </span>
              <div>
                <h4 className="text-[12px] font-sans font-semibold text-stone-800 tracking-wide mb-0.5">
                  {language === 'en' ? insight.titleEn : insight.titleZh}
                </h4>
                <p className="text-[11px] font-sans text-stone-500 leading-relaxed font-light">
                  {language === 'en' ? insight.descEn : insight.descZh}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
