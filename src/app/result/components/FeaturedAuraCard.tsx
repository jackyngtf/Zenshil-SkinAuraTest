'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import {
  auraLensPalettes,
  auraNumbers,
  getOrbColors,
  auraSymbols,
  getAuraFamily,
  getAuraIdentity,
} from '@/data/resultData';
import ResultAuraOrb from './ResultAuraOrb';

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
  const symbol = auraSymbols[aura.id] ?? {
    labelZh: '氣場核心',
    labelEn: 'Aura Core',
    coreZh: '個人節奏',
    coreEn: 'Personal Rhythm',
  };
  const orb = getOrbColors(aura.id);
  const lens = auraLensPalettes[aura.id] ?? auraLensPalettes.glow;
  const identity = getAuraIdentity(aura.id);
  const family = getAuraFamily(aura.id);
  const quote = identity
    ? language === 'en' ? identity.shortLine : identity.shortLineZh
    : language === 'en' && aura.quoteEn ? aura.quoteEn : aura.quote;
  const displayName = identity
    ? language === 'en' ? identity.displayName : identity.displayNameZh
    : language === 'en' ? aura.name : aura.chineseName;
  const secondaryName = identity
    ? language === 'en' ? identity.displayNameZh : identity.displayName
    : language === 'en' ? aura.chineseName : aura.name;
  const familyName = family
    ? language === 'en' ? family.name : family.nameZh
    : language === 'en' ? 'Skin Aura Family' : '肌膚氣場家族';
  const symbolLabel = language === 'en' ? symbol.labelEn : symbol.labelZh;
  const symbolCore = language === 'en' ? symbol.coreEn : symbol.coreZh;
  const titleSizeClass = language === 'en' && displayName.length > 13
    ? 'text-[32px] sm:text-[36px]'
    : language === 'en'
      ? 'text-[42px] sm:text-[46px]'
      : 'text-[44px] sm:text-[48px]';

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
        <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 shadow-sm backdrop-blur-sm">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: orb.mid }}
            aria-hidden="true"
          />
          <span className="text-[10px] font-medium tracking-[0.16em] text-stone-500">
            {language === 'en' ? `Aura Match ${matchPercentage}%` : `氣場吻合度 ${matchPercentage}%`}
          </span>
        </div>

        <div className="relative mb-7">
          <ResultAuraOrb palette={lens} className="size-[min(67vw,286px)]" />
          <div className="absolute inset-x-0 -bottom-3 mx-auto h-10 w-36 rounded-full bg-stone-300/10 blur-2xl" aria-hidden="true" />
        </div>

        <div className="max-w-[340px]">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-400">
            {language === 'en' ? 'Your Skin Aura Identity' : '你的 Skin Aura 身份'}
          </p>
          <p className="mb-2 font-serif text-[17px] italic text-stone-500 text-balance">
            {language === 'en' ? `${familyName} Society` : `${familyName} Society`}
          </p>
          <h1 className={`font-serif ${titleSizeClass} uppercase leading-[0.96] text-stone-950 text-balance`}>
            {displayName}
          </h1>
          <p className="mt-3 font-serif text-[18px] leading-tight text-stone-500 text-balance">
            {secondaryName}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-500 shadow-sm backdrop-blur-sm">
              Aura No. {meta.number}
            </span>
            <span className="rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500 shadow-sm backdrop-blur-sm">
              {symbolLabel}
            </span>
          </div>

          <p className="mx-auto mt-5 max-w-[318px] font-serif text-[18px] leading-relaxed text-stone-700 text-pretty">
            &ldquo;{quote}&rdquo;
          </p>

          <p className="mx-auto mt-4 max-w-[278px] text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">
            {language === 'en' ? `Aura core · ${symbolCore}` : `Aura Core · ${symbolCore}`}
          </p>
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
