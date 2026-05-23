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

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-5 pt-12 pb-6"
    >
      <div className="relative bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Subtle top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${orb.inner}, ${orb.mid}, ${orb.outer}, transparent)`,
          }}
        />

        <div className="px-7 pt-8 pb-10 flex flex-col items-center text-center">
          {/* Top labels */}
          <span className="text-[9px] font-sans font-medium tracking-[0.35em] uppercase text-stone-400 mb-1">
            SKIN AURA REPORT
          </span>
          <span className="text-[10px] font-serif tracking-[0.5em] uppercase text-stone-500/60 mb-8">
            ZENSHIL
          </span>

          {/* Aura Orb */}
          <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${orb.outer} 0%, transparent 70%)`,
              }}
            />
            {/* Mid layer */}
            <div
              className="absolute inset-4 rounded-full opacity-50 blur-2xl"
              style={{
                background: `radial-gradient(circle, ${orb.mid} 0%, transparent 70%)`,
              }}
            />
            {/* Inner glow */}
            <div
              className="absolute inset-8 rounded-full opacity-60 blur-xl"
              style={{
                background: `radial-gradient(circle, ${orb.inner} 0%, transparent 70%)`,
              }}
            />
            {/* Core bright spot */}
            <div
              className="absolute w-16 h-16 rounded-full opacity-80 blur-md"
              style={{
                background: `radial-gradient(circle, white 0%, ${orb.inner} 50%, transparent 100%)`,
              }}
            />
            {/* Dreamy animated ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full opacity-20"
              style={{
                background: `conic-gradient(from 0deg, ${orb.inner}, ${orb.mid}, ${orb.outer}, ${orb.inner})`,
                filter: 'blur(8px)',
              }}
            />
          </div>

          {/* Aura Name */}
          <h1 className="text-3xl sm:text-4xl font-serif uppercase tracking-wide text-stone-900 leading-tight mb-2">
            {aura.name}
          </h1>

          {/* Chinese subtitle */}
          <p className="text-sm font-serif text-stone-500 tracking-[0.3em] mb-6 italic font-light">
            {aura.chineseName}
          </p>

          {/* Metadata row */}
          <div className="flex items-center gap-3 text-[10px] font-sans text-stone-400 tracking-wider mb-5">
            <span>Aura No. {meta.number}</span>
            <span className="text-stone-300">|</span>
            <span>{language === 'en' ? 'Match' : '吻合度'} {matchPercentage}%</span>
            <span className="text-stone-300">|</span>
            <span>{language === 'en' ? 'Color' : '氣場色'} {language === 'en' ? meta.colorLabelEn : meta.colorLabel}</span>
          </div>

          {/* Keywords row */}
          <p className="text-[11px] font-sans text-stone-500/80 tracking-[0.15em] font-light">
            {language === 'en' ? keywords.en : keywords.zh}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
