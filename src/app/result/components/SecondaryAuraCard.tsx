'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
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
        {/* Small secondary orb */}
        <div className="relative w-20 h-20 mx-auto mb-5 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full opacity-30 blur-2xl"
            style={{
              background: `radial-gradient(circle, ${orb.outer} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-2 rounded-full opacity-45 blur-xl"
            style={{
              background: `radial-gradient(circle, ${orb.mid} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-4 rounded-full opacity-60 blur-lg"
            style={{
              background: `radial-gradient(circle, ${orb.inner} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute w-5 h-5 rounded-full opacity-70 blur-sm"
            style={{
              background: `radial-gradient(circle, white 0%, ${orb.inner} 100%)`,
            }}
          />
        </div>

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
