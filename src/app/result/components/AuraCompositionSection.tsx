'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import { getOrbColors, statLabels } from '@/data/resultData';

type ResultStats = {
  energy: number;
  glow: number;
  stress: number;
  recoveryNeeded: number;
};

interface AuraCompositionSectionProps {
  stats: ResultStats;
  auraId: string;
}

const statColors = {
  energy: { core: '#d4b679', edge: '#f2d7b5' },
  glow: { core: '#e99ab5', edge: '#f8cfdd' },
  stress: { core: '#b89ce4', edge: '#e2d3f8' },
  recoveryNeeded: { core: '#8ecbc0', edge: '#d7f0ec' },
};

const bubbleLayout = {
  energy: 'left-2 top-7',
  glow: 'right-1 top-[92px]',
  stress: 'bottom-[58px] left-5',
  recoveryNeeded: 'bottom-4 right-5',
};

function getBubbleSize(value: number) {
  const clamped = Math.max(0, Math.min(100, value));
  return Math.round(74 + clamped * 0.62);
}

function getTextTone(value: number) {
  return value >= 62 ? 'text-stone-700' : 'text-stone-600';
}

export default function AuraCompositionSection({ stats, auraId }: AuraCompositionSectionProps) {
  const language = useQuizStore((state) => state.language);
  const orb = getOrbColors(auraId);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="relative mx-auto mb-8 w-full max-w-md px-5"
    >
      <div className="relative px-3 py-7">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-screen -translate-x-1/2"
          style={{
            background: [
              `radial-gradient(circle at 22% 25%, ${statColors.energy.edge}28 0%, transparent 24%)`,
              `radial-gradient(circle at 78% 30%, ${statColors.glow.edge}24 0%, transparent 25%)`,
              `radial-gradient(circle at 24% 78%, ${statColors.stress.edge}22 0%, transparent 28%)`,
              `radial-gradient(circle at 76% 76%, ${statColors.recoveryNeeded.edge}24 0%, transparent 28%)`,
              `radial-gradient(circle at 50% 52%, ${orb.mid}12 0%, transparent 44%)`,
            ].join(', '),
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ backgroundColor: `${orb.outer}0f` }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
            {language === 'en' ? 'Aura Composition' : '你的光環組成'}
          </p>
          <h2 className="mt-2 font-serif text-[30px] leading-tight text-stone-900">
            {language === 'en' ? 'Skin Balance Map' : '肌膚平衡圖'}
          </h2>
        </div>

        <div
          className="relative z-10 mx-auto mt-3 min-h-[418px] w-full max-w-[342px]"
          role="list"
          aria-label={language === 'en' ? 'Aura composition bubble chart' : '光環組成球體圖'}
        >
          <div className="pointer-events-none absolute inset-x-6 top-[154px] h-28 rounded-full bg-white/28 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute left-1/2 top-[180px] z-10 w-[150px] -translate-x-1/2 text-center">
            <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-stone-400">
              {language === 'en' ? 'Relative Aura' : '相對氣場'}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-stone-500 text-pretty">
              {language === 'en' ? 'Size shows tendency' : '大小代表傾向強弱'}
            </p>
          </div>

          {statLabels.map((stat, index) => {
            const value = stats[stat.key];
            const size = getBubbleSize(value);
            const color = statColors[stat.key];

            return (
              <motion.div
                key={stat.key}
                role="listitem"
                className={`absolute z-20 flex items-center justify-center ${bubbleLayout[stat.key]}`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.04 * index, ease: 'easeOut' }}
              >
                <div
                  className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full text-center"
                  style={{
                    width: size,
                    height: size,
                    background: [
                      `radial-gradient(circle at 42% 34%, rgba(255,255,255,0.42), transparent 36%)`,
                      `radial-gradient(circle at 48% 52%, ${color.core}82 0%, ${color.core}62 45%, ${color.edge}42 73%, rgba(255,255,255,0.08) 100%)`,
                      `linear-gradient(145deg, ${color.edge}40 0%, ${color.core}44 48%, ${orb.outer}24 100%)`,
                    ].join(', '),
                    boxShadow: [
                      '0 16px 36px rgba(120, 113, 108, 0.10)',
                      'inset 0 18px 44px rgba(255, 255, 255, 0.24)',
                      'inset 0 -18px 42px rgba(120, 113, 108, 0.06)',
                    ].join(', '),
                  }}
                >
                  <div className="relative z-10 max-w-[78%]">
                    <p className={`text-[11px] font-medium leading-snug ${getTextTone(value)} text-balance`}>
                      {language === 'en' ? stat.nameEn : stat.nameZh}
                    </p>
                    <p className="mt-1 font-serif text-[30px] leading-none text-stone-900 tabular-nums">
                      {value}%
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="relative z-10 mx-auto mt-2 max-w-[300px] text-center text-[11px] leading-relaxed text-stone-400 text-pretty">
          {language === 'en'
            ? 'Bubble size and percentage show your relative Skin Aura tendencies from this 10-question consultation.'
            : '球體大小與百分比代表今次 10 題回答推算出的相對肌膚氣場傾向。'}
        </p>
      </div>
    </motion.section>
  );
}
