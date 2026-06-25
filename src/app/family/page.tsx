'use client';
// Family overview route. Editorial extension of the result page: shows all 4
// skin-aura families and their 8 member identities with the REAL ResultAuraOrb
// (same layered orb as the result page + share image), aura-colored atmospheric
// backgrounds, and identity depth per card. Design language mirrors the
// result page. No new deps, no em-dashes.

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  auraLensPalettes,
  auraNumbers,
  auraSymbols,
  getAuraIdentity,
  getOrbColors,
  skinAuraFamilies,
} from '@/data/resultData';
import type { AuraFamilyId } from '@/data/resultData';
import { useQuizStore } from '@/store/useQuizStore';
import { calculateResult } from '@/lib/quizLogic';
import GlobalHeader from '@/components/GlobalHeader';
import BrandFooter from '@/app/result-v1/components/BrandFooter';
import ResultAuraOrb from '@/app/result-v1/components/ResultAuraOrb';

type LanguageCopy = { zh: string; en: string };

const FAMILY_ORDER: AuraFamilyId[] = ['recovery', 'pressure', 'radiance', 'rhythm'];

const COPY = {
  heroKicker: { zh: '肌膚氣場地圖', en: 'The Skin Aura Map' },
  heroTitle: {
    zh: '四個肌膚家族 / 八種氣場身份',
    en: 'Four Skin Families / Eight Aura Identities',
  },
  heroSub: {
    zh: '了解你的測試結果之外，仲有咩其他肌膚身份。',
    en: 'Beyond your result, explore the full landscape of skin auras.',
  },
  yourAuraBadge: { zh: '你嘅身份', en: 'Your Aura' },
  yourFamilyBadge: { zh: '你嘅 Family', en: 'Your Family' },
  skinStateLabel: { zh: '肌膚狀態', en: 'Skin State' },
  needLabel: { zh: '核心需求', en: 'Core Need' },
  backHasResult: { zh: '返回結果', en: 'Back to result' },
  backNoResult: { zh: '返回主頁', en: 'Back to home' },
} satisfies Record<string, LanguageCopy>;

function t(copy: LanguageCopy, language: 'zh' | 'en') {
  return copy[language];
}

function MemberCard({
  auraId,
  isUserAura,
  language,
}: {
  auraId: string;
  isUserAura: boolean;
  language: 'zh' | 'en';
}) {
  const identity = getAuraIdentity(auraId);
  const orb = getOrbColors(auraId);
  const lens = auraLensPalettes[auraId];
  const number = auraNumbers[auraId]?.number ?? '';
  const symbol = auraSymbols[auraId];
  if (!identity || !lens) return null;

  const displayName = language === 'en' ? identity.displayName : identity.displayNameZh;
  const shortLine = language === 'en' ? identity.shortLine : identity.shortLineZh;
  const skinState = language === 'en' ? identity.skinState : identity.skinStateZh;
  const primaryNeed = language === 'en' ? identity.primaryNeed : identity.primaryNeedZh;
  const symbolLabel = symbol
    ? (language === 'en' ? symbol.labelEn : symbol.labelZh)
    : '';

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/65 bg-white/55 shadow-sm backdrop-blur-sm">
      {/* 3-layer aura-color atmospheric background, like the result hero + share image */}
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: [
            `radial-gradient(circle at 50% 32%, ${orb.inner}33 0%, transparent 38%)`,
            `radial-gradient(circle at 20% 64%, ${orb.mid}22 0%, transparent 36%)`,
            `radial-gradient(circle at 82% 70%, ${orb.outer}22 0%, transparent 38%)`,
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {isUserAura && (
        <span className="absolute right-4 top-4 z-20 rounded-full border border-stone-700/15 bg-stone-900/92 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
          {t(COPY.yourAuraBadge, language)}
        </span>
      )}

      <div className="relative z-10 flex flex-col items-center px-6 pb-7 pt-9 text-center">
        {/* The real layered orb — same component as the result page + share image */}
        <ResultAuraOrb palette={lens} className="size-[min(54vw,184px)]" />

        {/* Aura No. + symbol label pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-500 shadow-sm backdrop-blur-sm">
            {number ? `No. ${number}` : ''}
          </span>
          {symbolLabel && (
            <span className="rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500 shadow-sm backdrop-blur-sm">
              {symbolLabel}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-serif text-[22px] leading-tight text-stone-950 text-balance">
          {displayName}
        </h3>

        <p className="mt-3 max-w-[280px] font-serif text-[14px] italic leading-relaxed text-stone-500 text-pretty">
          &ldquo;{shortLine}&rdquo;
        </p>

        {/* Identity depth: skin state + core need */}
        <div className="mt-6 w-full max-w-[300px] space-y-3 text-left">
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              {t(COPY.skinStateLabel, language)}
            </span>
            <span className="text-[12px] font-light leading-relaxed text-stone-600 text-pretty">
              {skinState}
            </span>
          </div>
          <div className="h-px w-full bg-stone-200/55" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-stone-400">
              {t(COPY.needLabel, language)}
            </span>
            <span className="text-[12px] font-light leading-relaxed text-stone-600 text-pretty">
              {primaryNeed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FamilySection({
  familyId,
  userAuraId,
  language,
  reduce,
}: {
  familyId: AuraFamilyId;
  userAuraId: string | null;
  language: 'zh' | 'en';
  reduce: boolean | null;
}) {
  const family = skinAuraFamilies[familyId];
  const memberIds = family.memberIds;
  const familyName = language === 'en' ? family.name : family.nameZh;
  const tone = language === 'en' ? family.tone : family.toneZh;
  const description = language === 'en' ? family.description : family.descriptionZh;
  const isUserFamily =
    userAuraId !== null && getAuraIdentity(userAuraId)?.familyId === familyId;

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="mx-auto mb-6 w-full max-w-md px-5"
    >
      <div className="mb-5 px-1">
        <div className="mb-2 flex items-center gap-3">
          <h2 className="font-serif text-[26px] leading-tight text-stone-900">
            {familyName}
          </h2>
          {isUserFamily && (
            <span className="rounded-full border border-stone-700/15 bg-stone-900/92 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
              {t(COPY.yourFamilyBadge, language)}
            </span>
          )}
        </div>
        <p className="text-[11px] font-light tracking-wide text-stone-400">
          {tone}
        </p>
        <p className="mt-3 text-[13px] font-light leading-relaxed text-stone-600 text-pretty">
          {description}
        </p>
      </div>

      {/* Members stack vertically, each card has room to breathe with its orb */}
      <div className="space-y-4">
        {memberIds.map((memberId) => (
          <MemberCard
            key={memberId}
            auraId={memberId}
            isUserAura={userAuraId === memberId}
            language={language}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default function FamilyPage() {
  const language = useQuizStore((s) => s.language);
  const answers = useQuizStore((s) => s.answers);
  const completedAt = useQuizStore((s) => s.completedAt);
  const reduce = useReducedMotion();

  const userAuraId = completedAt ? calculateResult(answers).primaryAura.id : null;
  const backHref = userAuraId ? '/result' : '/';
  const backLabel = userAuraId ? COPY.backHasResult : COPY.backNoResult;

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#f8f5ef] pb-8 text-stone-900 selection:bg-rose-200 touch-manipulation">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),transparent_42%),radial-gradient(circle_at_20%_45%,rgba(244,214,204,0.18),transparent_32%),radial-gradient(circle_at_82%_58%,rgba(201,211,226,0.18),transparent_32%)]" />
      <div className="absolute inset-0 z-0 noise-overlay opacity-70" />

      <GlobalHeader />

      <div className="relative z-10">
        {/* Compact hero. Single kicker restraint. */}
        <motion.section
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mx-auto w-full max-w-md px-5 pb-6 pt-[max(6.5rem,env(safe-area-inset-top))] text-center"
        >
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-stone-400">
            {t(COPY.heroKicker, language)}
          </p>
          <h1 className="font-serif text-[30px] leading-[1.08] text-stone-950 text-balance sm:text-[34px]">
            {t(COPY.heroTitle, language)}
          </h1>
          <p className="mx-auto mt-4 max-w-[320px] text-[13px] font-light leading-relaxed text-stone-500 text-pretty">
            {t(COPY.heroSub, language)}
          </p>
        </motion.section>

        {FAMILY_ORDER.map((familyId) => (
          <FamilySection
            key={familyId}
            familyId={familyId}
            userAuraId={userAuraId}
            language={language}
            reduce={reduce}
          />
        ))}

        {/* Back navigation, quiet pill */}
        <motion.section
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-4 w-full max-w-md px-5 pt-4 text-center"
        >
          <a
            href={backHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/70 bg-white/58 px-4 py-2 text-[11px] font-medium tracking-wide text-stone-500 shadow-sm backdrop-blur-sm transition-colors hover:text-stone-800"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.8} />
            {t(backLabel, language)}
          </a>
        </motion.section>

        <BrandFooter />
      </div>
    </main>
  );
}
