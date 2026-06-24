'use client';
// Family overview route. Editorial extension of the result page: shows all 4
// skin-aura families and their 8 member identities, so a user who just got a
// result can see the full landscape. Design language mirrors result-v2-preview
// exactly (ivory base, radial backdrop, noise-overlay, glass cards, Playfair
// serif, stone palette, framer-motion reveals). No new deps, no em-dashes.

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  auraNumbers,
  getAuraIdentity,
  getOrbColors,
  skinAuraFamilies,
} from '@/data/resultData';
import type { AuraFamilyId } from '@/data/resultData';
import { useQuizStore } from '@/store/useQuizStore';
import { calculateResult } from '@/lib/quizLogic';
import GlobalHeader from '@/components/GlobalHeader';
import BrandFooter from '@/app/result/components/BrandFooter';

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
  memberLabel: { zh: '家族成員', en: 'Family members' },
  yourAuraBadge: { zh: '你嘅身份', en: 'Your Aura' },
  yourFamilyBadge: { zh: '你嘅 Family', en: 'Your Family' },
  backHasResult: { zh: '返回結果', en: 'Back to result' },
  backNoResult: { zh: '返回主頁', en: 'Back to home' },
} satisfies Record<string, LanguageCopy>;

function t(copy: LanguageCopy, language: 'zh' | 'en') {
  return copy[language];
}

function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border border-white/65 bg-white/58 shadow-sm backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium tracking-[0.16em] text-stone-400">{children}</p>
  );
}

/** Aura orb swatch in the established radial-gradient idiom. */
function OrbSwatch({ auraId }: { auraId: string }) {
  const orb = getOrbColors(auraId);
  return (
    <span
      className="block size-14 rounded-full shadow-inner"
      style={{
        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${orb.inner}66 30%, ${orb.mid}55 64%, transparent 100%)`,
      }}
      aria-hidden="true"
    />
  );
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
  const number = auraNumbers[auraId]?.number ?? '';
  if (!identity) return null;

  const displayName = language === 'en' ? identity.displayName : identity.displayNameZh;
  const shortLine = language === 'en' ? identity.shortLine : identity.shortLineZh;

  return (
    <div className="relative rounded-[24px] border border-white/60 bg-white/45 p-5 backdrop-blur-sm">
      <div
        className="absolute right-4 top-4 size-16 rounded-full opacity-60 blur-2xl"
        style={{ backgroundColor: `${orb.mid}22` }}
        aria-hidden="true"
      />
      {isUserAura && (
        <span className="absolute left-4 top-4 z-10 rounded-full border border-stone-700/15 bg-stone-900/92 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
          {t(COPY.yourAuraBadge, language)}
        </span>
      )}
      <div className="relative z-10">
        <OrbSwatch auraId={auraId} />
        <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-stone-400">
          {number ? `No. ${number}` : ''}
        </p>
        <h4 className="mt-1.5 font-serif text-[17px] leading-tight text-stone-900">
          {displayName}
        </h4>
        <p className="mt-2 font-serif text-[12px] italic leading-relaxed text-stone-500 text-pretty">
          &ldquo;{shortLine}&rdquo;
        </p>
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
    userAuraId !== null &&
    getAuraIdentity(userAuraId)?.familyId === familyId;

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="mx-auto mb-5 w-full max-w-md px-5"
    >
      <GlassCard className="p-7">
        {isUserFamily && (
          <span className="absolute right-5 top-5 z-10 rounded-full border border-stone-700/15 bg-stone-900/92 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
            {t(COPY.yourFamilyBadge, language)}
          </span>
        )}
        <div className="relative z-10">
          <div className="mb-5 flex items-center gap-3">
            <Kicker>{t(COPY.memberLabel, language)}</Kicker>
            <span className="h-px w-12 bg-stone-200/80" />
          </div>

          <h2 className="font-serif text-[27px] leading-tight text-stone-900">
            {familyName}
          </h2>
          <p className="mt-2 text-[11px] font-light tracking-wide text-stone-400">
            {tone}
          </p>
          <p className="mt-4 text-[13px] font-light leading-relaxed text-stone-600 text-pretty">
            {description}
          </p>

          <div className="my-6 h-px w-full bg-stone-200/55" />

          {/* Member grid: stacks under 768px (sm:), two columns at and above. */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {memberIds.map((memberId) => (
              <MemberCard
                key={memberId}
                auraId={memberId}
                isUserAura={userAuraId === memberId}
                language={language}
              />
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.section>
  );
}

export default function FamilyPage() {
  const language = useQuizStore((s) => s.language);
  const answers = useQuizStore((s) => s.answers);
  const completedAt = useQuizStore((s) => s.completedAt);
  const reduce = useReducedMotion();

  // null on first paint (no completed quiz, or pre-hydration); highlights
  // render conditionally so SSR markup and the hydrated state both read clean.
  const userAuraId = completedAt ? calculateResult(answers).primaryAura.id : null;
  const backHref = userAuraId ? '/result' : '/';
  const backLabel = userAuraId ? COPY.backHasResult : COPY.backNoResult;

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#f8f5ef] pb-8 text-stone-900 selection:bg-rose-200 touch-manipulation">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),transparent_42%),radial-gradient(circle_at_20%_45%,rgba(244,214,204,0.18),transparent_32%),radial-gradient(circle_at_82%_58%,rgba(201,211,226,0.18),transparent_32%)]" />
      <div className="absolute inset-0 z-0 noise-overlay opacity-70" />

      <GlobalHeader />

      <div className="relative z-10">
        {/* Compact hero. Single kicker restraint: only one small kicker line. */}
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

        {/* Back navigation, quiet pill. */}
        <motion.section
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-4 w-full max-w-md px-5 pt-2 text-center"
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
