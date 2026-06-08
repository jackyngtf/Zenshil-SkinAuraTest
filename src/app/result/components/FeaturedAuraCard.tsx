'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import SoftAuraCloud, { auraCloudPaletteFromOrb } from '@/components/SoftAuraCloud';
import {
  auraKeywordsDisplay,
  auraNumbers,
  auraOrbColors,
  getAuraFamily,
  getAuraIdentity,
} from './resultData';

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
  const identity = getAuraIdentity(aura.id);
  const family = getAuraFamily(aura.id);
  const quote = identity
    ? language === 'en' ? identity.shortLine : identity.shortLineZh
    : language === 'en' && aura.quoteEn ? aura.quoteEn : aura.quote;
  const displayName = identity
    ? language === 'en' ? identity.displayName : identity.displayNameZh
    : language === 'en' ? aura.name : aura.chineseName;
  const familyName = family
    ? language === 'en' ? family.name : family.nameZh
    : language === 'en' ? 'Skin Aura Family' : '肌膚氣場家族';
  const titleSizeClass = language === 'en' && displayName.length > 13
    ? 'text-[34px] sm:text-[38px]'
    : 'text-[40px] sm:text-[44px]';
  const summaryItems = identity
    ? [
      {
        label: language === 'en' ? 'Main skin signal' : '主要肌膚訊號',
        value: language === 'en' ? identity.skinState : identity.skinStateZh,
      },
      {
        label: language === 'en' ? 'Priority focus' : '優先改善',
        value: language === 'en' ? identity.primaryNeed : identity.primaryNeedZh,
      },
      {
        label: language === 'en' ? 'Lifestyle profile' : '生活輪廓',
        value: language === 'en' ? identity.demographic : identity.demographicZh,
      },
    ]
    : [];

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
        <div className="mb-5 flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 shadow-sm backdrop-blur-sm">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: orb.mid }}
            aria-hidden="true"
          />
          <span className="text-[10px] font-medium tracking-[0.16em] text-stone-500">
            {language === 'en' ? `Aura Match ${matchPercentage}%` : `氣場吻合度 ${matchPercentage}%`}
          </span>
        </div>

        <SoftAuraCloud
          className="mb-7 size-[min(68vw,276px)]"
          palette={auraCloudPaletteFromOrb(orb)}
        />

        <div className="max-w-[340px]">
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.26em] text-stone-400">
            {language === 'en' ? 'You belong to' : '你屬於'}
          </p>
          <p className="mb-3 font-serif text-[17px] italic text-stone-500 text-balance">
            {familyName}
          </p>
          <h1 className={`font-serif ${titleSizeClass} uppercase leading-[0.96] text-stone-950 text-balance`}>
            {displayName}
          </h1>
          <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">
            {language === 'en' ? 'Specific Skin Aura Type' : '具體 Skin Aura 類型'}
          </p>
          <p className="mx-auto mt-5 max-w-[318px] font-serif text-[17px] leading-relaxed text-stone-700 text-pretty">
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        {summaryItems.length > 0 && (
          <div className="mt-6 grid w-full max-w-[338px] gap-2">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/70 bg-white/48 px-4 py-3 text-left shadow-sm backdrop-blur-sm"
              >
                <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                  {item.label}
                </p>
                <p className="text-[13px] font-medium leading-snug text-stone-700 text-pretty">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="rounded-full border border-white/65 bg-white/45 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-stone-500 shadow-sm backdrop-blur-sm">
            Aura No. {meta.number}
          </span>
          <span className="rounded-full border border-white/65 bg-white/45 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-stone-500 shadow-sm backdrop-blur-sm">
            {language === 'en' ? meta.colorLabelEn : meta.colorLabel}
          </span>
          <span className="max-w-[320px] rounded-full border border-white/65 bg-white/45 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-stone-500 shadow-sm backdrop-blur-sm">
            {language === 'en' ? keywords.en : keywords.zh}
          </span>
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
