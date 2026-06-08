'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/useQuizStore';
import { calculateResult } from '@/lib/quizLogic';

import FeaturedAuraCard from './components/FeaturedAuraCard';
import AuraCompositionSection from './components/AuraCompositionSection';
import SkinAuraFamilySection from './components/SkinAuraFamilySection';
import PersonalitySkinBlock from './components/PersonalitySkinBlock';
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
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#f8f5ef] pb-8 text-stone-900 selection:bg-rose-200 touch-manipulation">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),transparent_42%),radial-gradient(circle_at_20%_45%,rgba(244,214,204,0.18),transparent_32%),radial-gradient(circle_at_82%_58%,rgba(201,211,226,0.18),transparent_32%)]" />
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 noise-overlay opacity-70" />

      {/* All content layered above noise */}
      <div className="relative z-10">
        {/* Section 1 — Featured Aura Card Hero */}
        <FeaturedAuraCard
          aura={primaryAura}
          matchPercentage={primaryPercentage}
        />

        {/* Section 2 — Aura Composition & Skin Balance */}
        <AuraCompositionSection
          stats={calculatedStats}
          auraId={primaryAura.id}
        />

        {/* Section 3 — Skin Aura Family Map */}
        <SkinAuraFamilySection auraId={primaryAura.id} />

        {/* Section 4 — Personality & Skin Block */}
        <PersonalitySkinBlock
          description={language === 'en' && primaryAura.descriptionEn ? primaryAura.descriptionEn : primaryAura.description}
          auraId={primaryAura.id}
          needs={primaryAura.skinNeeds}
        />

        {/* Section 6 — Secondary Aura Block */}
        <SecondaryAuraCard
          aura={secondaryAura}
          matchPercentage={secondaryPercentage}
        />

        {/* Section 7 — Recommended Ritual CTA */}
        <RitualCTASection auraId={primaryAura.id} />

        {/* Section 8 — Bottom Action Row */}
        <ResultActionRow
          aura={primaryAura}
          matchPercentage={primaryPercentage}
        />

        {/* Section 9 — Brand Footer */}
        <BrandFooter />
      </div>
    </main>
  );
}
