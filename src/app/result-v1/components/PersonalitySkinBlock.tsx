'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import { insightPoints, withUniversalNeeds, getNeedLabel } from '@/data/resultData';

interface PersonalitySkinBlockProps {
  description: string;
  auraId: string;
  needs: string[];
  /** 'stacked' renders standalone (legacy); 'carousel' renders inside AuraCarousel. */
  variant?: 'stacked' | 'carousel';
}

export default function PersonalitySkinBlock({ description, auraId, needs, variant = 'stacked' }: PersonalitySkinBlockProps) {
  const language = useQuizStore((state) => state.language);
  const insights = insightPoints[auraId] ?? [];
  const allNeeds = withUniversalNeeds(needs);

  const sectionClass =
    variant === 'carousel'
      ? 'mx-auto flex w-full flex-col'
      : 'w-full max-w-md mx-auto px-5 mb-5';

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={sectionClass}
    >
      <div className="rounded-[30px] border border-white/60 bg-[#fefcf8]/64 p-7 shadow-sm backdrop-blur-sm">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-900">
            {language === 'en' ? 'PERSONALITY & SKIN' : '個性與肌膚'}
          </h3>
          <span className="h-px w-12 bg-stone-200/80" />
        </div>

        <p className="mb-7 text-[14px] font-light leading-relaxed text-stone-600 text-pretty">
          {description}
        </p>

        <div className="mb-6 h-px w-full bg-stone-200/55" />

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
              <span className="mt-0.5 flex size-8 flex-shrink-0 items-center justify-center rounded-full border border-stone-200/70 bg-white/60 font-serif text-[11px] text-stone-500 tabular-nums shadow-sm">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="mb-1 text-[13px] font-semibold tracking-wide text-stone-800">
                  {language === 'en' ? insight.titleEn : insight.titleZh}
                </h4>
                <p className="text-[12px] font-light leading-relaxed text-stone-500 text-pretty">
                  {language === 'en' ? insight.descEn : insight.descZh}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="my-7 h-px w-full bg-stone-200/55" />

        <div>
          <h3 className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-900">
            {language === 'en' ? 'YOUR SKIN CURRENTLY NEEDS:' : '你的肌膚目前需要：'}
          </h3>

          <div className="flex flex-wrap gap-2.5">
            {allNeeds.map((need, i) => (
              <motion.span
                key={need}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.18, delay: 0.04 + i * 0.035, ease: 'easeOut' }}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/55 bg-white/70 px-3.5 py-2 font-sans text-[12px] font-light leading-none tracking-wide text-stone-600 shadow-sm"
              >
                <span className="text-[9px] text-stone-400">✦</span>
                {getNeedLabel(need, language)}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
