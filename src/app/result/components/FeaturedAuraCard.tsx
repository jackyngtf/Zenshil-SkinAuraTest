'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import SoftAuraCloud, { auraCloudPaletteFromOrb } from '@/components/SoftAuraCloud';
import { auraNumbers, auraKeywordsDisplay, auraOrbColors } from './resultData';

interface AuraProfile {
  id: string;
  name: string;
  chineseName: string;
  quote: string;
  quoteEn?: string;
}

interface FeaturedAuraCardProps {
  aura: AuraProfile;
  matchPercentage: number;
}

export default function FeaturedAuraCard({ aura, matchPercentage }: FeaturedAuraCardProps) {
  const language = useQuizStore((state) => state.language);
  const meta = auraNumbers[aura.id] ?? { number: '000', colorLabel: '—', colorLabelEn: '—' };
  const keywords = auraKeywordsDisplay[aura.id] ?? { zh: '', en: '' };
  const orb = auraOrbColors[aura.id] ?? { inner: '#c4b5fd', mid: '#f9a8d4', outer: '#93c5fd' };
  const quote = language === 'en' && aura.quoteEn ? aura.quoteEn : aura.quote;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative mx-auto flex min-h-[100svh] w-full max-w-md flex-col overflow-hidden px-5 pb-8 pt-[max(2rem,env(safe-area-inset-top))]"
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: [
            `radial-gradient(circle at 50% 28%, ${orb.inner}38 0%, transparent 35%)`,
            `radial-gradient(circle at 18% 62%, ${orb.mid}24 0%, transparent 34%)`,
            `radial-gradient(circle at 82% 68%, ${orb.outer}24 0%, transparent 36%)`,
          ].join(', '),
        }}
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fbfaf7] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f8f5ef] to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pb-7 pt-24 text-center">
        <SoftAuraCloud
          className="mb-8 size-[min(76vw,306px)]"
          palette={auraCloudPaletteFromOrb(orb)}
        />

        <div className="max-w-[340px]">
          <p className="mb-4 text-center text-[11px] font-medium text-stone-500 tabular-nums">
            {language === 'en' ? `Aura match ${matchPercentage}%` : `氣場吻合度 ${matchPercentage}%`}
          </p>
          <h1 className="font-serif text-[34px] uppercase leading-[0.95] text-stone-900 text-balance sm:text-[40px]">
            {aura.name}
          </h1>
          <p className="mt-4 font-serif text-sm italic text-stone-500 text-balance">
            {aura.chineseName}
          </p>
          <p className="mx-auto mt-5 max-w-[310px] font-serif text-[15px] leading-relaxed text-stone-600 text-pretty">
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-white/65 bg-white/45 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500 shadow-sm backdrop-blur-sm">
            Aura No. {meta.number}
          </span>
          <span className="rounded-full border border-white/65 bg-white/45 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500 shadow-sm backdrop-blur-sm">
            {language === 'en' ? meta.colorLabelEn : meta.colorLabel}
          </span>
          <span className="rounded-full border border-white/65 bg-white/45 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.18em] text-stone-500 shadow-sm backdrop-blur-sm">
            {language === 'en' ? keywords.en : keywords.zh}
          </span>
        </div>
      </div>

      <div className="relative z-10 pb-2 text-center">
        <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-stone-400">
          {language === 'en' ? 'Personalized Skin Aura Analysis' : '個人化肌膚氣場分析'}
        </p>
      </div>
    </motion.section>
  );
}
