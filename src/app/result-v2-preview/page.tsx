'use client';
// ponytail: throwaway design preview (670 LOC, hardcoded 'stress' aura),
//   ceiling = only exists until the v2 result layout ships at /result,
//   upgrade = once v2 is the live result page, delete this whole file
//   rather than lifting GlassCard/Kicker/Pill into result/components.

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import auraProfilesData from '@/data/aura_profiles.json';
import ResultActionRow from '@/app/result/components/ResultActionRow';
import {
  auraLensPalettes,
  auraV2Content,
  getCouplet,
  getNeedLabel,
  getOrbColors,
  withUniversalNeeds,
} from '@/data/resultData';
import { useQuizStore } from '@/store/useQuizStore';
import ResultAuraOrb from '@/app/result/components/ResultAuraOrb';
import AuraCarousel from '@/app/result/components/AuraCarousel';
import BrandFooter from '@/app/result/components/BrandFooter';
import { getBookingUrl } from '@/app/result/components/resultLinks';

type LanguageCopy = {
  zh: string;
  en: string;
};

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

const preview: AuraV2Preview = {
  auraId: 'stress',
  secondaryAuraId: 'hidden_aging',
  primaryRawScore: 7,
  secondaryPercentage: 51,
  family: {
    zh: '壓力屏障系 Society',
    en: 'Barrier Pressure Society',
  },
  societyDescription: {
    zh: '你的肌膚對壓力、溫差、睡眠同情緒變化特別快有反應。不是脆弱，而是屏障正在提示你：先降噪，再修復。',
    en: 'Your skin reacts quickly to pressure, temperature shifts, sleep, and emotional changes. It is not weakness; your barrier is asking for less noise and gentler repair.',
  },
  societyPercent: '18%',
  auraNumber: '222',
  auraCore: {
    zh: '高感知接收',
    en: 'High Sensitivity',
  },
  rareTone: {
    zh: '稀有度 18%',
    en: 'Rarity 18%',
  },
  luckyTone: {
    zh: '海霧粉紫',
    en: 'Sea-Mist Mauve',
  },
  dailyReminder: {
    zh: '先替肌膚降噪',
    en: 'Lower the noise',
  },
  societyTraits: [
    {
      title: { zh: '壓力訊號快', en: 'Fast pressure signals' },
      detail: {
        zh: '情緒、溫差與忙碌節奏，會較快反映在泛紅、繃緊與不穩定上。',
        en: 'Emotion, temperature shifts, and busy rhythms show up quickly as redness, tightness, and instability.',
      },
    },
    {
      title: { zh: '屏障容易受壓', en: 'Barrier under pressure' },
      detail: {
        zh: '這一系的肌膚不是弱，而是屏障更容易被外界刺激推到緊繃狀態。',
        en: 'This society is not weak. Its barrier is more easily pushed into a tense state by external stimulation.',
      },
    },
    {
      title: { zh: '需要鎮靜修復', en: 'Needs calm repair' },
      detail: {
        zh: '比起加強攻效，低刺激、降溫與屏障修復會更適合這一系。',
        en: 'Low-stimulation calming and barrier repair work better than stronger actives for this society.',
      },
    },
  ],
  identityDetails: [
    {
      title: { zh: 'Aura No. 222', en: 'Aura No. 222' },
      detail: { zh: '代表你的高感知身份編號。', en: 'Your High Sensitivity Operator identity number.' },
    },
    {
      title: { zh: '幸運色：海霧粉紫', en: 'Lucky tone: Sea-Mist Mauve' },
      detail: { zh: '用柔和冷粉紫，幫肌膚情緒先降溫。', en: 'A soft cool mauve that cues calm before repair.' },
    },
    {
      title: { zh: '今日提醒：先替肌膚降噪', en: 'Today cue: lower the noise' },
      detail: { zh: '少一點刺激，多一點鎮靜，讓屏障慢慢回穩。', en: 'Less stimulation, more calm, and time for the barrier to settle.' },
    },
  ],
  skinMessage: {
    zh: '我不是鬧情緒，只是替你接收了太多。今日少一點刺激，多一點鎮靜，讓屏障有時間回穩。',
    en: 'I am not being dramatic. I have simply been receiving too much for you. Today, choose less stimulation and more calm so your barrier has time to settle.',
  },
  skinAdviceNotes: [
    { label: { zh: '目前訊號', en: 'Current Signal' }, value: { zh: '泛紅、繃緊、不穩', en: 'Redness, tightness, imbalance' } },
    { label: { zh: '有幫助的是', en: 'What Helps' }, value: { zh: '少刺激，多鎮靜', en: 'Less stimulation, more calming' } },
    { label: { zh: '今晚提醒', en: 'Tonight' }, value: { zh: '提早 30 分鐘離線', en: 'Log off 30 min earlier' } },
  ],
  journey: [
    {
      label: { zh: 'Calm the Signal', en: 'Calm the Signal' },
      treatment: 'X.prof 040',
      detail: { zh: '先降低泛紅與高感知反應。', en: 'Lower visible redness and high-sensitivity response first.' },
    },
    {
      label: { zh: 'Repair the Barrier', en: 'Repair the Barrier' },
      treatment: 'EXOXEN',
      detail: { zh: '把修復重點放回肌膚屏障。', en: 'Bring the focus back to barrier repair.' },
    },
    {
      label: { zh: 'Maintain the Rhythm', en: 'Maintain the Rhythm' },
      treatment: 'PLASONIC',
      detail: { zh: '用低壓方式維持穩定與吸收力。', en: 'Maintain stability and absorption with a low-pressure rhythm.' },
    },
  ],
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
            {language === 'en' ? `Aura Match ${purityPercent}%` : `氣場吻合度 ${purityPercent}%`}
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
            <Pill>{t(preview.rareTone, language)}</Pill>
            <Pill>{t(preview.luckyTone, language)}</Pill>
          </div>

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
  const orb = getOrbColors(preview.auraId);
  const lucky = auraV2Content[preview.auraId];
  const ritualNotes: IdentityNote[] = [
    { label: { zh: '水果', en: 'Fruit' }, value: lucky ? lucky.luckyFruit : { zh: '—', en: '—' } },
    { label: { zh: '輕食', en: 'Light Bite' }, value: { zh: '核桃', en: 'Walnut' } },
    { label: { zh: '飲品', en: 'Drink' }, value: lucky ? lucky.luckyDrink : { zh: '—', en: '—' } },
    { label: { zh: '生活提醒', en: 'Lifestyle Cue' }, value: { zh: '今晚提早 30 分鐘離線', en: 'Log off 30 min earlier tonight' } },
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

  return (
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
        <ResultActionRow aura={auraProfilesData[preview.auraId]} />
        <BrandFooter />
      </div>
    </main>
  );
}
