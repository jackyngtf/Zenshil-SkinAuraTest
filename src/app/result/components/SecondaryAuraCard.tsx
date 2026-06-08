'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import SoftAuraCloud, { auraCloudPaletteFromOrb } from '@/components/SoftAuraCloud';
import { auraOrbColors, getAuraFamily, getAuraIdentity } from './resultData';

interface AuraProfile {
  id: string;
  name: string;
  quote: string;
  quoteEn?: string;
}

interface SecondaryAuraCardProps {
  aura: AuraProfile;
  matchPercentage: number;
}

export default function SecondaryAuraCard({ aura, matchPercentage }: SecondaryAuraCardProps) {
  const language = useQuizStore((state) => state.language);
  const orb = auraOrbColors[aura.id] ?? { inner: '#c4b5fd', mid: '#f9a8d4', outer: '#93c5fd' };
  const identity = getAuraIdentity(aura.id);
  const family = getAuraFamily(aura.id);
  const displayName = identity
    ? language === 'en' ? identity.displayName : identity.displayNameZh
    : aura.name;
  const familyName = family
    ? language === 'en' ? family.name : family.nameZh
    : language === 'en' ? 'Skin Aura Family' : '肌膚氣場家族';
  const signal = identity
    ? language === 'en' ? identity.skinState : identity.skinStateZh
    : language === 'en' && aura.quoteEn ? aura.quoteEn : aura.quote;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full max-w-md mx-auto px-5 mb-5"
    >
      <div className="relative bg-[#fefdfb]/90 backdrop-blur-sm border border-stone-200/40 rounded-3xl p-7 text-center overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
        <SoftAuraCloud className="mx-auto mb-5 size-20" palette={auraCloudPaletteFromOrb(orb)} />

        {/* Label */}
        <p className="text-[9px] font-sans text-stone-400 uppercase tracking-[0.25em] mb-3">
          {language === 'en' 
            ? `SUPPORTING TENDENCY — ${matchPercentage}%`
            : `次要傾向 — ${matchPercentage}%`}
        </p>

        {/* Name */}
        <p className="mb-2 font-serif text-[14px] italic text-stone-500">
          {familyName}
        </p>
        <h3 className="mb-3 font-serif text-[22px] uppercase leading-tight tracking-wide text-stone-800">
          {displayName}
        </h3>

        {/* Quote */}
        <p className="mx-auto max-w-xs text-[13px] leading-relaxed text-stone-500 text-pretty">
          {language === 'en'
            ? `This is not your main type; it simply shows a supporting signal of ${signal}.`
            : `呢個唔係你嘅主導類型，只係代表你同時帶有「${signal}」呢個補充訊號。`}
        </p>
      </div>
    </motion.section>
  );
}
