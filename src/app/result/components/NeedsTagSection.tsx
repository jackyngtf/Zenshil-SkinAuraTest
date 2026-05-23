import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';

interface NeedsTagSectionProps {
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
  'Maintenance': { zh: '極簡精準保養', en: 'Maintenance' },
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

export default function NeedsTagSection({ needs }: NeedsTagSectionProps) {
  const language = useQuizStore((state) => state.language);
  
  // Add 'Barrier Support' as universal need if not present
  const allNeeds = needs.includes('Barrier Support')
    ? needs
    : [...needs, 'Barrier Support'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto px-5 mb-5"
    >
      <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-stone-900 mb-5">
          {language === 'en' ? 'YOUR SKIN CURRENTLY NEEDS:' : '你的肌膚目前需要：'}
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {allNeeds.map((need, i) => {
            const trans = needTranslations[need] ?? { zh: need, en: need };
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-200/50 rounded-full text-[11px] font-sans text-stone-600 tracking-wide shadow-[0_2px_8px_rgba(0,0,0,0.03)] font-light"
              >
                <span className="text-stone-400 text-[9px]">✦</span>
                {language === 'en' ? trans.en : trans.zh}
              </motion.span>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
