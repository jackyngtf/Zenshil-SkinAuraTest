'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import { insightPoints } from './resultData';

interface PersonalitySkinBlockProps {
  description: string;
  auraId: string;
  needs: string[];
}

const needTranslations: Record<string, { zh: string; en: string }> = {
  'Deep Hydration': { zh: '深層注水保濕', en: 'Deep Hydration' },
  'Skin Recovery': { zh: '肌膚能量修護', en: 'Skin Recovery' },
  'Nervous System Reset': { zh: '神經放鬆重設', en: 'Nervous System Reset' },
  'Calming & Cooling': { zh: '舒緩鎮靜降溫', en: 'Calming & Cooling' },
  'Barrier Repair': { zh: '修護肌膚屏障', en: 'Barrier Repair' },
  'Anti-inflammation': { zh: '消炎抗紅防敏', en: 'Anti-inflammation' },
  'Collagen Support': { zh: '促進膠原蛋白', en: 'Collagen Support' },
  'Contour Lifting': { zh: '面部輪廓提拉', en: 'Contour Lifting' },
  'Elasticity Boost': { zh: '提升彈性飽滿', en: 'Elasticity Boost' },
  'Better Circulation': { zh: '促進微循環', en: 'Better Circulation' },
  'Detoxification': { zh: '深層排毒代謝', en: 'Detoxification' },
  'Deep Tissue Relaxation': { zh: '深層組織舒壓', en: 'Deep Tissue Relaxation' },
  'Antioxidant Protection': { zh: '抗氧化細胞防護', en: 'Antioxidant Protection' },
  Maintenance: { zh: '極簡精準保養', en: 'Maintenance' },
  'Preventive Care': { zh: '未來抗衰預防', en: 'Preventive Care' },
  'Ultimate Brightening': { zh: '極致煥亮提亮', en: 'Ultimate Brightening' },
  'Glass Skin Effect': { zh: '水光玻璃肌感', en: 'Glass Skin Effect' },
  'Texture Refinement': { zh: '細緻毛孔理膚', en: 'Texture Refinement' },
  'Total Reset': { zh: '身心肌膚重置', en: 'Total Reset' },
  'Intensive Repair': { zh: '高濃縮密集修復', en: 'Intensive Repair' },
  'Deep Awakening': { zh: '深層喚醒細胞', en: 'Deep Awakening' },
  'De-puffing': { zh: '排水緊緻消腫', en: 'De-puffing' },
  'Awakening & Brightening': { zh: '喚醒去黃提亮', en: 'Awakening & Brightening' },
  'Eye Contour Rescue': { zh: '眼周密集急救', en: 'Eye Contour Rescue' },
  'Barrier Support': { zh: '強韌屏障支持', en: 'Barrier Support' },
};

export default function PersonalitySkinBlock({ description, auraId, needs }: PersonalitySkinBlockProps) {
  const language = useQuizStore((state) => state.language);
  const insights = insightPoints[auraId] ?? [];
  const allNeeds = needs.includes('Barrier Support')
    ? needs
    : [...needs, 'Barrier Support'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-md mx-auto px-5 mb-5"
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
            {allNeeds.map((need, i) => {
              const trans = needTranslations[need] ?? { zh: need, en: need };
              return (
                <motion.span
                  key={need}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.18, delay: 0.04 + i * 0.035, ease: 'easeOut' }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/55 bg-white/70 px-3.5 py-2 font-sans text-[12px] font-light leading-none tracking-wide text-stone-600 shadow-sm"
                >
                  <span className="text-[9px] text-stone-400">✦</span>
                  {language === 'en' ? trans.en : trans.zh}
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
