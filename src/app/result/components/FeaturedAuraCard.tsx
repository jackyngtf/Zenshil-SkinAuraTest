'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
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
        <div className="relative mb-8 flex size-[min(78vw,318px)] items-center justify-center">
          <div
            className="absolute inset-0 rounded-full opacity-45 blur-3xl"
            style={{ background: `radial-gradient(circle, ${orb.outer} 0%, transparent 68%)` }}
          />
          <motion.div
            animate={{ opacity: [0.72, 0.9, 0.72], scale: [0.985, 1.01, 0.985] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-[7%] rounded-full border border-white/65 bg-white/20 shadow-[inset_0_1px_24px_rgba(255,255,255,0.75),0_20px_70px_rgba(120,100,90,0.12)] backdrop-blur-[1px]"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[10%] rounded-full opacity-30"
            style={{
              background: `conic-gradient(from 90deg, transparent 0deg, ${orb.inner} 78deg, ${orb.mid} 150deg, transparent 230deg, ${orb.outer} 310deg, transparent 360deg)`,
              filter: 'blur(10px)',
            }}
          />
          <div
            className="absolute inset-[16%] rounded-full opacity-80"
            style={{
              background: `radial-gradient(circle at 48% 42%, white 0%, ${orb.inner} 28%, ${orb.mid} 58%, transparent 78%)`,
              filter: 'blur(14px)',
            }}
          />
          <div
            className="absolute inset-[24%] rounded-full opacity-65"
            style={{
              background: `radial-gradient(circle, white 0%, ${orb.inner} 52%, transparent 72%)`,
              filter: 'blur(5px)',
            }}
          />
          <div className="absolute left-[20%] top-[24%] h-20 w-1/2 rotate-[-18deg] rounded-full bg-white/35 blur-xl" />
          <div className="absolute inset-[12%] rounded-full border border-white/55" />
          <div className="absolute inset-[22%] rounded-full border border-white/25" />
        </div>

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
