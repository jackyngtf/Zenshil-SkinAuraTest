'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useQuizStore } from '@/store/useQuizStore';

export default function LandingPage() {
  const language = useQuizStore((state) => state.language);
  const isEnglish = language === 'en';

  return (
    <main className="app-screen relative overflow-hidden bg-[#f8f3ed] selection:bg-rose-200 touch-manipulation">
      <Image
        src="/assets/landing/skin-aura-portal.jpg"
        alt=""
        aria-hidden="true"
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 z-0 noise-overlay opacity-[0.08]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(250,247,242,0.76) 0%, rgba(250,247,242,0.18) 24%, rgba(250,247,242,0.08) 48%, rgba(250,247,242,0.68) 76%, rgba(250,247,242,0.94) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background:
            'linear-gradient(0deg, rgba(250,247,242,0.98) 0%, rgba(250,247,242,0.74) 42%, rgba(250,247,242,0) 100%)',
        }}
      />
      <div className="landing-aura-motion pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="landing-aura-orb" />
        <div className="landing-aura-ribbon landing-aura-ribbon-rose" />
        <div className="landing-aura-ribbon landing-aura-ribbon-mint" />
        <div className="landing-aura-glint landing-aura-glint-one" />
        <div className="landing-aura-glint landing-aura-glint-two" />
        <div className="landing-aura-glint landing-aura-glint-three" />
      </div>

      <section className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col justify-end px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28">
        <div className="pb-[4vh] text-center">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.34em] text-stone-600/75">
            {isEnglish ? 'Zenshil Skin Aura Consultation' : 'Zenshil 肌膚氣場諮詢'}
          </p>

          <h1 className="mx-auto max-w-[330px] font-serif text-[48px] font-light leading-[0.98] tracking-[0.02em] text-stone-950 drop-shadow-[0_2px_16px_rgba(255,255,255,0.7)] sm:text-[54px]">
            {isEnglish ? (
              <>
                Skin Aura
                <br />
                Analysis
              </>
            ) : (
              <>
                肌膚氣場
                <br />
                分析
              </>
            )}
          </h1>

          <p className="mx-auto mt-5 max-w-[325px] text-sm font-light leading-relaxed text-stone-700/90 text-pretty">
            {isEnglish
              ? 'A 10-question sensorial consultation to reveal your skin rhythm, lifestyle energy, and personalized aura report.'
              : '以 10 題感知生活節奏、肌膚狀態與情緒能量，生成你的專屬肌膚氣場報告。'}
          </p>

          <div className="mx-auto mt-7 flex max-w-[320px] items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-600/75">
            <span>{isEnglish ? '10 Questions' : '10 題'}</span>
            <span className="h-px w-5 bg-stone-400/40" aria-hidden="true" />
            <span>{isEnglish ? '~2 Min' : '約 2 分鐘'}</span>
            <span className="h-px w-5 bg-stone-400/40" aria-hidden="true" />
            <span>{isEnglish ? 'Aura Report' : '專屬報告'}</span>
          </div>

          <Link
            href="/quiz"
            className="group mx-auto mt-8 inline-flex w-full max-w-[320px] items-center justify-center rounded-full bg-stone-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_45px_rgba(45,36,30,0.2)] transition-all duration-300 hover:bg-stone-800 active:scale-[0.985]"
          >
            <span>{isEnglish ? 'Start Analysis' : '開始分析'}</span>
            <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <p className="mt-5 text-[10px] font-light uppercase tracking-[0.28em] text-stone-500/75">
            {isEnglish ? 'Hong Kong Skin Management Clinic' : 'Hong Kong Skin Management Clinic'}
          </p>
        </div>
      </section>
    </main>
  );
}
