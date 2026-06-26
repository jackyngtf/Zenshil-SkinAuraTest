'use client';

import { createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import auraProfilesData from '@/data/aura_profiles.json';
import ResultActionRow from '@/app/result-v1/components/ResultActionRow';
import {
  auraLensPalettes,
  auraNumbers,
  auraV2Content,
  auraV2Editorial,
  getCouplet,
  getNeedLabel,
  getOrbColors,
  withUniversalNeeds,
} from '@/data/resultData';
import type { LanguageCopy } from '@/data/resultData';
import { calculateResult } from '@/lib/quizLogic';
import { useQuizStore } from '@/store/useQuizStore';
import ResultAuraOrb from '@/app/result-v1/components/ResultAuraOrb';
import AuraCarousel from '@/app/result-v1/components/AuraCarousel';
import BrandFooter from '@/app/result-v1/components/BrandFooter';
import { getBookingUrl } from '@/app/result-v1/components/resultLinks';
import { useQuizRarity, type RarityData } from '@/app/result/components/useQuizRarity';

type IdentityNote = {
  label: LanguageCopy;
  value: LanguageCopy;
};

type JourneyStep = {
  label: LanguageCopy;
  treatment: string;
  detail: LanguageCopy;
};

type SocietyTrait = {
  title: LanguageCopy;
  detail: LanguageCopy;
};

type IdentityDetail = {
  title: LanguageCopy;
  detail: LanguageCopy;
};

type AuraV2Preview = {
  auraId: keyof typeof auraProfilesData;
  secondaryAuraId: keyof typeof auraProfilesData;
  /** Frequency of the primary aura across 10 answers (truthful signal strength). */
  primaryRawScore: number;
  secondaryPercentage: number;
  family: LanguageCopy;
  societyDescription: LanguageCopy;
  societyPercent: string;
  auraNumber: string;
  auraCore: LanguageCopy;
  rareTone: LanguageCopy;
  luckyTone: LanguageCopy;
  dailyReminder: LanguageCopy;
  societyTraits: SocietyTrait[];
  identityDetails: IdentityDetail[];
  skinMessage: LanguageCopy;
  skinAdviceNotes: IdentityNote[];
  journey: JourneyStep[];
};

/** Assemble the v2 view from a real quiz result (no more hardcoded stress). */
function buildPreview(answers: Record<string, string>): AuraV2Preview | null {
  const result = calculateResult(answers);
  if (!result?.primaryAura?.id) return null;
  const primaryId = result.primaryAura.id as keyof typeof auraProfilesData;
  const secondaryId = (result.secondaryAura?.id ?? 'glow') as keyof typeof auraProfilesData;
  const ed = auraV2Editorial[primaryId];
  if (!ed) return null;
  const number = auraNumbers[primaryId]?.number ?? '000';

  return {
    auraId: primaryId,
    secondaryAuraId: secondaryId,
    primaryRawScore: result.primaryRawScore,
    secondaryPercentage: result.secondaryPercentage,
    family: ed.society,
    societyDescription: ed.societyDescription,
    societyPercent: ed.societyPercent,
    auraNumber: number,
    auraCore: ed.auraCore,
    rareTone: ed.rareTone,
    luckyTone: ed.luckyTone,
    dailyReminder: ed.dailyReminder,
    societyTraits: ed.societyTraits,
    identityDetails: ed.identityDetails,
    skinMessage: ed.skinMessage,
    skinAdviceNotes: ed.skinAdviceNotes,
    journey: ed.journey,
  };
}

const PreviewContext = createContext<{ preview: AuraV2Preview; rarity: RarityData | null } | null>(null);
const usePreview = () => {
  const ctx = useContext(PreviewContext);
  if (!ctx) throw new Error('usePreview must be used within PreviewContext.Provider');
  return ctx;
};


function t(copy: LanguageCopy, language: 'zh' | 'en') {
  return copy[language];
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[30px] border border-white/65 bg-white/58 shadow-sm backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium tracking-[0.16em] text-stone-400">
      {children}
    </p>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/70 bg-white/58 px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-stone-500 shadow-sm backdrop-blur-sm">
      {children}
    </span>
  );
}

function ResultV2Hero({ language }: { language: 'zh' | 'en' }) {
  const { preview, rarity } = usePreview();
  const aura = auraProfilesData[preview.auraId];
  const orb = getOrbColors(preview.auraId);
  const lens = auraLensPalettes[preview.auraId] ?? auraLensPalettes.glow;
  const displayName = language === 'en' ? aura.name : aura.chineseName;
  const secondaryName = language === 'en' ? aura.chineseName : aura.name;
  const purityPercent = Math.floor((preview.primaryRawScore / 10) * 100);
  const couplet = getCouplet(preview.auraId, preview.secondaryAuraId);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative mx-auto flex min-h-[96svh] w-full max-w-md flex-col overflow-hidden px-5 pb-8 pt-[max(5.25rem,env(safe-area-inset-top))]"
    >
      <div
        className="absolute inset-0 opacity-95"
        style={{
          background: [
            `radial-gradient(circle at 50% 26%, ${orb.inner}34 0%, transparent 35%)`,
            `radial-gradient(circle at 18% 62%, ${orb.mid}22 0%, transparent 34%)`,
            `radial-gradient(circle at 82% 68%, ${orb.outer}1f 0%, transparent 36%)`,
          ].join(', '),
        }}
      />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#fbfaf7] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f8f5ef] to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center pb-5 pt-14 text-center">
        <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/58 px-4 py-2 shadow-sm backdrop-blur-sm">
          <span className="size-2 rounded-full" style={{ backgroundColor: orb.mid }} aria-hidden="true" />
          <span className="text-[10px] font-medium tracking-[0.16em] text-stone-500">
            {language === 'en' ? `Match ${purityPercent}%` : `吻合度 ${purityPercent}%`}
          </span>
        </div>

        <div className="relative mb-8">
          <ResultAuraOrb palette={lens} className="size-[min(67vw,286px)]" />
          <div className="absolute inset-x-0 -bottom-3 mx-auto h-10 w-36 rounded-full bg-stone-300/10 blur-2xl" aria-hidden="true" />
        </div>

        <div className="max-w-[342px]">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-400">
            {language === 'en' ? 'Your Skin Aura Identity' : '你的 Skin Aura 身份'}
          </p>
          <p className="mb-2 font-serif text-[17px] italic text-stone-500 text-balance">
            {t(preview.family, language)}
          </p>
          <h1 className="font-serif text-[44px] uppercase leading-[0.96] text-stone-950 text-balance sm:text-[48px]">
            {displayName}
          </h1>
          <p className="mt-3 font-serif text-[18px] leading-tight text-stone-500 text-balance">
            {secondaryName}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Pill>Aura No. {preview.auraNumber}</Pill>
            {rarity ? (
              <Pill>{language === 'en' ? `Rarity ${rarity.rarity}` : `稀有度 ${rarity.rarity}`}</Pill>
            ) : (
              <Pill>{t(preview.rareTone, language)}</Pill>
            )}
            <Pill>{t(preview.luckyTone, language)}</Pill>
          </div>

          {rarity && (
            <p className="mt-3 text-[11px] font-light tracking-wide text-stone-400">
              {language === 'en'
                ? `You are #${rarity.userNumber} of ${rarity.total} to take this test`
                : `你是第 ${rarity.userNumber} 位完成測試嘅人（共 ${rarity.total} 位）`}
            </p>
          )}

          <div className="mx-auto mt-7 max-w-[322px]">
            <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.24em] text-stone-400">
              {language === 'en' ? 'What you need to hear today' : '今日最需要聽到的一句'}
            </p>
            <p className="font-serif text-[19px] leading-relaxed text-stone-700 text-pretty">
              &ldquo;{t(couplet, language)}&rdquo;
            </p>
          </div>

        </div>
      </div>

      <div className="relative z-10 pb-2 text-center">
        <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-stone-400">
          {language === 'en' ? 'Personalized Skin Aura Report' : '個人化肌膚氣場報告'}
        </p>
      </div>
    </motion.section>
  );
}

function SocietySlide({ language }: { language: 'zh' | 'en' }) {
  const { preview } = usePreview();
  const orb = getOrbColors(preview.auraId);
  const aura = auraProfilesData[preview.auraId];
  const societyNeeds = withUniversalNeeds(aura.skinNeeds);

  return (
    <GlassCard className="min-h-[500px] p-7">
      <div className="absolute right-5 top-5 size-24 rounded-full blur-3xl" style={{ backgroundColor: `${orb.inner}26` }} aria-hidden="true" />
      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <Kicker>Skin Aura Society</Kicker>
          <span className="h-px w-12 bg-stone-200/80" />
        </div>

        <p className="text-[11px] font-medium tracking-[0.12em] text-stone-400">
          {language === 'en' ? 'Common traits of your society' : '這個 Society 的共同特質'}
        </p>
        <h2 className="mt-2 font-serif text-[27px] leading-tight text-stone-900">
          {t(preview.family, language)}
        </h2>
        <p className="mt-5 text-[14px] font-light leading-relaxed text-stone-600 text-pretty">
          {t(preview.societyDescription, language)}
        </p>

        <div className="my-6 h-px w-full bg-stone-200/55" />

        <div className="space-y-5">
          {preview.societyTraits.map((trait, index) => (
            <div key={trait.title.zh} className="flex items-start gap-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-stone-200/70 bg-white/60 font-serif text-[11px] text-stone-500 tabular-nums shadow-sm">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mb-1 text-[13px] font-semibold tracking-wide text-stone-800">
                  {t(trait.title, language)}
                </h3>
                <p className="text-[12px] font-light leading-relaxed text-stone-500 text-pretty">
                  {t(trait.detail, language)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-6 h-px w-full bg-stone-200/55" />

        <div>
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.12em] text-stone-900">
            {language === 'en' ? 'This society currently needs:' : '這個 Society 目前需要：'}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {societyNeeds.map((need) => (
              <span
                key={need}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/55 bg-white/70 px-3.5 py-2 text-[12px] font-light leading-none tracking-wide text-stone-600 shadow-sm"
              >
                <span className="text-[9px] text-stone-400">✦</span>
                {getNeedLabel(need, language)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function IdentitySlide({ language }: { language: 'zh' | 'en' }) {
  const { preview } = usePreview();
  const orb = getOrbColors(preview.auraId);
  const lucky = auraV2Content[preview.auraId];
  const ritualNotes: IdentityNote[] = [
    { label: { zh: '水果', en: 'Fruit' }, value: lucky ? lucky.luckyFruit : { zh: '—', en: '—' } },
    { label: { zh: '輕食', en: 'Light Bite' }, value: { zh: '核桃', en: 'Walnut' } },
    { label: { zh: '飲品', en: 'Drink' }, value: lucky ? lucky.luckyDrink : { zh: '—', en: '—' } },
    { label: { zh: '生活提醒', en: 'Lifestyle Cue' }, value: { zh: '晨早一杯溫水', en: 'Warm water each morning' } },
  ];

  return (
    <GlassCard className="min-h-[500px] p-7">
      <div className="absolute left-6 top-6 size-16 rounded-full blur-3xl" style={{ backgroundColor: `${orb.mid}24` }} aria-hidden="true" />
      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <Kicker>Skin Aura Identity</Kicker>
          <span className="h-px w-12 bg-stone-200/80" />
        </div>

        <p className="text-[11px] font-medium tracking-[0.12em] text-stone-400">
          {language === 'en' ? 'Details to keep today' : '今日值得收藏的細節'}
        </p>
        <h2 className="mt-2 font-serif text-[27px] leading-tight text-stone-900">
          {language === 'en' ? 'Your keepsake card' : '你的高感知身份卡'}
        </h2>
        <p className="mt-5 text-[14px] font-light leading-relaxed text-stone-600 text-pretty">
          {language === 'en'
            ? 'A compact set of details worth saving, sharing, and actually using today.'
            : '收藏幾個今日用得上的細節，讓肌膚更容易回到安定。'}
        </p>

        <div className="my-6 h-px w-full bg-stone-200/55" />

        <div className="space-y-5">
          {preview.identityDetails.map((detail, index) => (
            <div key={detail.title.zh} className="flex items-start gap-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-stone-200/70 bg-white/60 font-serif text-[11px] text-stone-500 tabular-nums shadow-sm">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mb-1 text-[13px] font-semibold tracking-wide text-stone-800">
                  {t(detail.title, language)}
                </h3>
                <p className="text-[12px] font-light leading-relaxed text-stone-500 text-pretty">
                  {t(detail.detail, language)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-6 h-px w-full bg-stone-200/55" />

        <div className="mt-5">
          <h3 className="mb-4 text-[11px] font-semibold tracking-[0.12em] text-stone-900">
            {language === 'en' ? 'Today Ritual Cues' : '今日小儀式'}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {ritualNotes.map((note) => (
              <span
                key={note.label.zh}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/55 bg-white/70 px-3.5 py-2 text-[12px] font-light leading-none tracking-wide text-stone-600 shadow-sm"
              >
                <span className="text-[9px] text-stone-400">✦</span>
                {t(note.label, language)} {t(note.value, language)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function SkinMessageCard({ language }: { language: 'zh' | 'en' }) {
  const { preview } = usePreview();
  const orb = getOrbColors(preview.auraId);
  const q3Echo: LanguageCopy = { zh: '你話我會講『我頂唔順』', en: 'You said I would say “I can’t cope”' };

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="mx-auto mb-5 w-full max-w-md px-5"
    >
      <GlassCard className="p-7">
        <div className="absolute right-5 top-7 size-28 rounded-full blur-3xl" style={{ backgroundColor: `${orb.mid}24` }} aria-hidden="true" />
        <div className="relative z-10">
          <div className="mb-5 flex items-center justify-between">
            <Kicker>{language === 'en' ? 'Skin Note' : '肌膚想同你講'}</Kicker>
            <span className="h-px w-12 bg-stone-200/80" />
          </div>

          <h3 className="font-serif text-[26px] leading-tight text-stone-900 text-balance">
            {language === 'en' ? 'What you need to hear today' : '今日先替肌膚降噪'}
          </h3>
          <p className="mt-4 text-[15px] font-light leading-relaxed text-stone-600 text-pretty">
            &ldquo;<span className="font-medium text-stone-700">{t(q3Echo, language)}</span>{language === 'en' ? '.' : '。'} {t(preview.skinMessage, language)}&rdquo;
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/55 bg-white/34">
            {preview.skinAdviceNotes.map((note) => (
              <div key={note.label.zh} className="flex items-start justify-between gap-4 border-b border-white/50 px-4 py-3 last:border-b-0">
                <p className="min-w-[82px] text-[9px] font-semibold uppercase tracking-[0.16em] text-stone-400">
                  {t(note.label, language)}
                </p>
                <p className="text-right text-[12px] leading-relaxed text-stone-600">
                  {t(note.value, language)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.section>
  );
}

function JourneyCard({ language }: { language: 'zh' | 'en' }) {
  const { preview } = usePreview();
  const orb = getOrbColors(preview.auraId);

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="mx-auto mb-5 w-full max-w-md px-5"
    >
      <GlassCard className="p-7">
        <div className="mb-6">
          <Kicker>Your Skin Journey</Kicker>
          <h2 className="mt-2 font-serif text-[28px] leading-tight text-stone-900">
            {language === 'en' ? 'Treatment rhythm' : '專屬護理節奏'}
          </h2>
          <p className="mt-3 text-[12px] leading-relaxed text-stone-500">
            {language === 'en'
              ? 'A calm route from sensitivity reset to long-term stability.'
              : '由降溫、修復，到長期穩定的三步路線。'}
          </p>
        </div>

        <div className="space-y-4">
          {preview.journey.map((step, index) => (
            <div key={step.treatment} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className="flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/62 font-serif text-[12px] text-stone-600 shadow-sm"
                  style={{ boxShadow: `0 10px 28px ${orb.mid}16` }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                {index < preview.journey.length - 1 && <span className="my-2 h-10 w-px bg-stone-200/80" />}
              </div>
              <div className="pb-3">
                <p className="font-serif text-[17px] leading-tight text-stone-900">
                  {t(step.label, language)}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                  {step.treatment}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-stone-500">
                  {t(step.detail, language)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.section>
  );
}

function SupportingSignal({ language }: { language: 'zh' | 'en' }) {
  const { preview } = usePreview();
  const aura = auraProfilesData[preview.secondaryAuraId];
  const orb = getOrbColors(preview.secondaryAuraId);

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="mx-auto mb-5 w-full max-w-md px-5"
    >
      <GlassCard className="p-7 text-center">
        <div className="mx-auto mb-5 size-16 rounded-full blur-[1px]" style={{
          background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${orb.inner}66 28%, ${orb.mid}44 62%, transparent 100%)`,
        }} />
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-stone-400">
          {language === 'en' ? `Supporting tendency ${preview.secondaryPercentage}%` : `次要傾向 ${preview.secondaryPercentage}%`}
        </p>
        <p className="mb-1 font-serif text-[14px] italic text-stone-500">
          {language === 'en' ? 'Time Rhythm Family' : '時間節奏系'}
        </p>
        <h3 className="font-serif text-[25px] leading-tight text-stone-900">
          {language === 'en' ? aura.name : aura.chineseName}
        </h3>
        <p className="mx-auto mt-4 max-w-[290px] text-[13px] leading-relaxed text-stone-500 text-pretty">
          {language === 'en'
            ? 'A supporting rhythm that explains your need for structure and steadier timing.'
            : '呢個補充訊號代表你同時需要結構感、時間節奏同細節覺察。'}
        </p>
        <a
          href="/family"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-stone-200/70 bg-white/58 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-600 shadow-sm transition-colors hover:text-stone-900"
        >
          {language === 'en' ? 'View full family' : '查看 Family 全家'}
        </a>
      </GlassCard>
    </motion.section>
  );
}

function BookingCta({ language }: { language: 'zh' | 'en' }) {
  const { preview } = usePreview();
  const orb = getOrbColors(preview.auraId);
  const bookingUrl = getBookingUrl(preview.auraId, language);

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mx-auto mb-5 w-full max-w-md px-5"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1225] via-[#1e1530] to-[#0f0a1a] p-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
        <div className="absolute left-1/2 top-0 -mt-24 h-48 w-48 -translate-x-1/2">
          <div className="absolute inset-0 rounded-full opacity-20 blur-3xl" style={{ background: `radial-gradient(circle, ${orb.mid} 0%, transparent 70%)` }} />
          <div className="absolute inset-8 rounded-full opacity-15 blur-2xl" style={{ background: `radial-gradient(circle, ${orb.inner} 0%, transparent 70%)` }} />
        </div>
        <div className="absolute left-1/2 top-6 h-16 w-32 -translate-x-1/2 rounded-t-full border border-white/5" />
        <div className="absolute left-1/2 top-8 h-12 w-24 -translate-x-1/2 rounded-t-full border border-white/3" />

        <div className="relative z-10 pt-4">
          <h3 className="mb-6 text-[10px] font-sans uppercase tracking-[0.35em] text-white/40">
            {language === 'en' ? 'Recommended Ritual' : '推薦護理療程'}
          </h3>
          <p className="mb-3 font-serif text-lg font-light leading-relaxed tracking-wide text-white/90">
            {language === 'en' ? (
              <>Schedule your personal <br /> calm repair ritual</>
            ) : (
              <>為肌膚安排一場專屬的 <br /> 能量修復儀式</>
            )}
          </p>
          <p className="mb-8 text-[11px] font-light tracking-wider text-white/35">
            {language === 'en'
              ? 'Personal Consultation × Barrier Repair × Long-Term Rhythm'
              : '個人化諮詢 × 屏障修復療程 × 長期穩定計畫'}
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-stone-900 shadow-[0_4px_24px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-stone-50 active:scale-[0.98]"
          >
            {language === 'en' ? 'Book your ritual' : '預約專屬儀式'}
            <ArrowRight className="ml-3 size-4" strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default function ResultV2PreviewPage() {
  const language = useQuizStore((state) => state.language);
  const answers = useQuizStore((state) => state.answers);
  const completedAt = useQuizStore((state) => state.completedAt);
  const preview = completedAt ? buildPreview(answers) : null;
  // Record + fetch live rarity once a result exists.
  const rarityState = useQuizRarity(preview?.auraId ?? null);

  // No completed result: render a quiet empty state (the lock gate normally
  // redirects here only after completion; a direct visit shows this).
  if (!preview) {
    return (
      <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#f8f5ef] pb-8 text-stone-900 selection:bg-rose-200 touch-manipulation">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),transparent_42%)]" />
        <div className="absolute inset-0 z-0 noise-overlay opacity-70" />
        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-5 pt-[40vh] text-center">
          <p className="font-serif text-[20px] text-stone-500">
            {language === 'en' ? 'No result yet.' : '未有結果。'}
          </p>
          <a
            href="/quiz"
            className="mt-6 rounded-full border border-stone-300/70 bg-white/70 px-6 py-3 text-[12px] font-medium tracking-wide text-stone-700 shadow-sm backdrop-blur-sm"
          >
            {language === 'en' ? 'Take the test' : '做測試'}
          </a>
        </div>
      </main>
    );
  }

  return (
    <PreviewContext.Provider value={{ preview, rarity: rarityState.data }}>
      <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#f8f5ef] pb-8 text-stone-900 selection:bg-rose-200 touch-manipulation">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),transparent_42%),radial-gradient(circle_at_20%_45%,rgba(244,214,204,0.18),transparent_32%),radial-gradient(circle_at_82%_58%,rgba(201,211,226,0.18),transparent_32%)]" />
        <div className="absolute inset-0 z-0 noise-overlay opacity-70" />

        <div className="relative z-10">
          <ResultV2Hero language={language} />

          <AuraCarousel language={language}>
            <SocietySlide language={language} />
            <IdentitySlide language={language} />
          </AuraCarousel>

          <SkinMessageCard language={language} />
          <JourneyCard language={language} />
          <SupportingSignal language={language} />
          <BookingCta language={language} />
          <ResultActionRow
            aura={auraProfilesData[preview.auraId]}
            primaryRawScore={preview.primaryRawScore}
            secondaryAuraId={preview.secondaryAuraId}
          />
          <BrandFooter />
        </div>
      </main>
    </PreviewContext.Provider>
  );
}
