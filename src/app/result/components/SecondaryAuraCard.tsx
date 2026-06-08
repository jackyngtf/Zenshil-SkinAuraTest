'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import SoftAuraCloud, { auraCloudPaletteFromOrb } from '@/components/SoftAuraCloud';
import { auraOrbColors } from './resultData';

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
            ? `SECONDARY AURA — ${matchPercentage}% MATCH` 
            : `次要氣場 — 吻合度 ${matchPercentage}%`}
        </p>

        {/* Name */}
        <h3 className="text-lg font-serif text-stone-800 tracking-wider mb-3 uppercase">
          {aura.name}
        </h3>

        {/* Quote */}
        <p className="text-stone-500 font-serif text-[13px] italic font-light leading-relaxed max-w-xs mx-auto">
          &ldquo;{language === 'en' && aura.quoteEn ? aura.quoteEn : aura.quote}&rdquo;
        </p>
      </div>
    </motion.section>
  );
}
