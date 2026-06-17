'use client';

import { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import SoftAuraCloud from '@/components/SoftAuraCloud';
import { useQuizStore } from '@/store/useQuizStore';

function useHasHydrated() {
  // Zustand hydrates synchronously on the client at store init; on the server
  // there is no localStorage so it reports not-yet-hydrated. useSyncExternalStore
  // gives us a mismatch-free way to read that without setState-in-effect.
  return useSyncExternalStore(
    () => () => {},
    () => useQuizStore.persist.hasHydrated(),
    () => false,
  );
}

function useHasCompleted() {
  const hydrated = useHasHydrated();
  const completedAt = useQuizStore((state) => state.completedAt);
  return hydrated ? completedAt : null;
}

function LandingLightField() {
  return (
    <div className="landing-light-field" aria-hidden="true">
      <div className="landing-light-layer landing-light-rose" />
      <div className="landing-light-layer landing-light-mint" />
      <div className="landing-light-layer landing-light-champagne" />
      <div className="landing-light-layer landing-light-pearl" />
      <svg
        className="landing-light-ribbons"
        viewBox="0 0 390 844"
        preserveAspectRatio="none"
        role="img"
        focusable="false"
      >
        <defs>
          <linearGradient id="landingFullRibbonRose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(244, 194, 208, 0)" />
            <stop offset="42%" stopColor="rgba(244, 194, 208, 0.36)" />
            <stop offset="56%" stopColor="rgba(255, 255, 255, 0.58)" />
            <stop offset="100%" stopColor="rgba(208, 232, 226, 0)" />
          </linearGradient>
          <linearGradient id="landingFullRibbonMint" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(205, 229, 223, 0)" />
            <stop offset="38%" stopColor="rgba(205, 229, 223, 0.28)" />
            <stop offset="58%" stopColor="rgba(255, 255, 255, 0.48)" />
            <stop offset="100%" stopColor="rgba(246, 218, 190, 0)" />
          </linearGradient>
        </defs>
        <g className="landing-light-ribbon landing-light-ribbon-one">
          <path
            d="M-30 536 C78 460, 133 439, 220 482 C292 518, 334 482, 426 382"
            fill="none"
            stroke="url(#landingFullRibbonRose)"
            strokeWidth="28"
            strokeLinecap="round"
          />
        </g>
        <g className="landing-light-ribbon landing-light-ribbon-two">
          <path
            d="M420 256 C319 344, 252 373, 170 344 C90 316, 42 356, -34 450"
            fill="none"
            stroke="url(#landingFullRibbonMint)"
            strokeWidth="20"
            strokeLinecap="round"
          />
        </g>
      </svg>
      <div className="landing-light-breath" />
    </div>
  );
}

function LandingAuraLens() {
  return <SoftAuraCloud className="landing-aura-stage mx-auto" />;
}

export default function LandingPage() {
  const router = useRouter();
  const language = useQuizStore((state) => state.language);
  const isEnglish = language === 'en';
  const heroTitle = isEnglish ? 'Skin Aura Analysis' : '肌膚氣場分析';

  const completedAt = useHasCompleted();

  // Lock-to-result: once the user has finished the quiz, any visit to the home
  // page bounces them to their result until they explicitly retake.
  useEffect(() => {
    if (completedAt !== null) {
      router.replace('/result');
    }
  }, [completedAt, router]);

  // Render nothing (ivory base) until we've checked — avoids a flash of the
  // landing screen before the redirect fires.
  if (completedAt !== null) {
    return <main className="app-screen bg-[#f8f4ee]" aria-busy="true" />;
  }

  return (
    <main className="app-screen relative overflow-hidden bg-[#f8f4ee] selection:bg-rose-200 touch-manipulation">
      <div className="landing-ivory-field" aria-hidden="true" />
      <LandingLightField />
      <div className="absolute inset-0 z-0 noise-overlay opacity-[0.08]" />

      <section className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col px-6 pb-[max(1.85rem,env(safe-area-inset-bottom))] pt-28">
        <div className="flex flex-1 flex-col justify-center text-center">
          <LandingAuraLens />

          <p className="mt-7 text-[10px] font-medium uppercase tracking-[0.3em] text-stone-700/75">
            {isEnglish ? 'Zenshil Skin Aura Consultation' : 'Zenshil 肌膚氣場諮詢'}
          </p>

          <h1
            className={`mx-auto max-w-[360px] text-balance font-serif font-light leading-[0.98] text-stone-950 drop-shadow-[0_2px_18px_rgba(255,255,255,0.76)] ${
              isEnglish
                ? 'text-[clamp(2.85rem,11vw,3.7rem)] tracking-[0.01em]'
                : 'whitespace-nowrap text-[clamp(2.25rem,9.5vw,2.9rem)] tracking-[0.01em]'
            }`}
          >
            {heroTitle}
          </h1>

          <p className="mx-auto mt-5 max-w-[330px] text-sm font-light leading-relaxed text-stone-700/95 text-pretty">
            {isEnglish
              ? 'A 10-question sensorial consultation to reveal your skin rhythm, lifestyle energy, and personalized aura report.'
              : '以 10 題感知生活節奏、肌膚狀態與情緒能量，生成你的專屬肌膚氣場報告。'}
          </p>

          <div className="mx-auto mt-7 flex max-w-[320px] items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-700/70">
            <span>{isEnglish ? '10 Questions' : '10 題'}</span>
            <span className="h-px w-5 bg-stone-400/40" aria-hidden="true" />
            <span>{isEnglish ? '~2 Min' : '約 2 分鐘'}</span>
            <span className="h-px w-5 bg-stone-400/40" aria-hidden="true" />
            <span>{isEnglish ? 'Aura Report' : '專屬報告'}</span>
          </div>

          <Link
            href="/quiz"
            className="group mx-auto mt-8 inline-flex w-full max-w-[320px] items-center justify-center rounded-full bg-stone-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_45px_rgba(45,36,30,0.22)] transition-all duration-200 hover:bg-stone-800 active:scale-[0.985]"
          >
            <span>{isEnglish ? 'Start Analysis' : '開始分析'}</span>
            <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <p className="mt-5 text-[10px] font-light uppercase tracking-[0.28em] text-stone-600/70">
            {isEnglish ? 'Hong Kong Skin Management Clinic' : 'Hong Kong Skin Management Clinic'}
          </p>
        </div>
      </section>
    </main>
  );
}
