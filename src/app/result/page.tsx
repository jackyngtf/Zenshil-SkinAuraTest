'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/useQuizStore';
import { calculateResult } from '@/lib/quizLogic';

import FeaturedAuraCard from './components/FeaturedAuraCard';
import SectionNavRow from './components/SectionNavRow';
import CompactStatRow from './components/CompactStatRow';
import PersonalitySkinBlock from './components/PersonalitySkinBlock';
import NeedsTagSection from './components/NeedsTagSection';
import SecondaryAuraCard from './components/SecondaryAuraCard';
import RitualCTASection from './components/RitualCTASection';
import ResultActionRow from './components/ResultActionRow';
import BrandFooter from './components/BrandFooter';

export default function ResultPage() {
  const router = useRouter();
  const { answers } = useQuizStore();
  const language = useQuizStore((state) => state.language);
  const hasAnswers = Object.keys(answers).length > 0;
  const result = hasAnswers ? calculateResult(answers) : null;

  useEffect(() => {
    if (!hasAnswers) {
      router.replace('/');
    }
  }, [hasAnswers, router]);

  if (!result) return null;

  const { primaryAura, primaryPercentage, secondaryAura, secondaryPercentage, calculatedStats } = result;

  return (
    <main className="min-h-[100dvh] bg-[#f8f7f5] text-stone-900 pb-8 relative overflow-x-hidden selection:bg-rose-200 touch-manipulation">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 noise-overlay" />

      {/* All content layered above noise */}
      <div className="relative z-10">
        {/* Section 1 — Featured Aura Card Hero */}
        <FeaturedAuraCard
          aura={primaryAura}
          matchPercentage={primaryPercentage}
        />

        {/* Section 2 — Section Navigation Row */}
        <SectionNavRow />

        {/* Section 3 — Compact Micro Stats */}
        <CompactStatRow
          stats={calculatedStats}
          auraId={primaryAura.id}
        />

        {/* Section 4 — Personality & Skin Block */}
        <PersonalitySkinBlock
          description={language === 'en' && primaryAura.descriptionEn ? primaryAura.descriptionEn : primaryAura.description}
          auraId={primaryAura.id}
        />

        {/* Section 5 — Your Skin Currently Needs */}
        <NeedsTagSection needs={primaryAura.skinNeeds} />

        {/* Section 6 — Secondary Aura Block */}
        <SecondaryAuraCard
          aura={secondaryAura}
          matchPercentage={secondaryPercentage}
        />

        {/* Section 7 — Recommended Ritual CTA */}
        <RitualCTASection auraId={primaryAura.id} />

        {/* Section 8 — Bottom Action Row */}
        <ResultActionRow />

        {/* Section 9 — Brand Footer */}
        <BrandFooter />
      </div>
    </main>
  );
}
