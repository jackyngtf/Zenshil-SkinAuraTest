'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/useQuizStore';
import { calculateResult } from '@/lib/quizLogic';

import FeaturedAuraCard from './components/FeaturedAuraCard';
import SkinAuraFamilySection from './components/SkinAuraFamilySection';
import PersonalitySkinBlock from './components/PersonalitySkinBlock';
import AuraCarousel from './components/AuraCarousel';
import SecondaryAuraCard from './components/SecondaryAuraCard';
import RitualCTASection from './components/RitualCTASection';
import ResultActionRow from './components/ResultActionRow';
import BrandFooter from './components/BrandFooter';

export default function ResultPage() {
  const router = useRouter();
  const answers = useQuizStore((state) => state.answers);
  const language = useQuizStore((state) => state.language);
  const completedAt = useQuizStore((state) => state.completedAt);
  // The authoritative gate is completedAt (persisted). answers alone is too
  // loose — a half-finished quiz would otherwise show an empty result.
  const hasCompleted = completedAt !== null;
  const result = hasCompleted ? calculateResult(answers) : null;

  useEffect(() => {
    if (!hasCompleted) {
      router.replace('/');
    }
  }, [hasCompleted, router]);

  if (!result) return null;

  const { primaryAura, primaryRawScore, primaryPercentage, secondaryAura, secondaryPercentage } = result;

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#f8f5ef] pb-8 text-stone-900 selection:bg-rose-200 touch-manipulation">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),transparent_42%),radial-gradient(circle_at_20%_45%,rgba(244,214,204,0.18),transparent_32%),radial-gradient(circle_at_82%_58%,rgba(201,211,226,0.18),transparent_32%)]" />
      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-0 noise-overlay opacity-70" />

      {/* All content layered above noise */}
      <div className="relative z-10">
        {/* 1 — Featured aura hero */}
        <FeaturedAuraCard
          aura={primaryAura}
          matchPercentage={primaryPercentage}
        />

        {/* 2 — Skin aura family + personality (horizontal carousel) */}
        <AuraCarousel language={language}>
          <SkinAuraFamilySection auraId={primaryAura.id} variant="carousel" />
          <PersonalitySkinBlock
            description={language === 'en' && primaryAura.descriptionEn ? primaryAura.descriptionEn : primaryAura.description}
            auraId={primaryAura.id}
            needs={primaryAura.skinNeeds}
            variant="carousel"
          />
        </AuraCarousel>

        {/* 3 — Secondary aura */}
        <SecondaryAuraCard
          aura={secondaryAura}
          matchPercentage={secondaryPercentage}
        />

        {/* 4 — Recommended ritual CTA */}
        <RitualCTASection auraId={primaryAura.id} />

        {/* 5 — Bottom action row */}
        <ResultActionRow
          aura={primaryAura}
          primaryRawScore={primaryRawScore}
          secondaryAuraId={secondaryAura.id}
        />

        {/* 6 — Brand footer */}
        <BrandFooter />
      </div>
    </main>
  );
}
