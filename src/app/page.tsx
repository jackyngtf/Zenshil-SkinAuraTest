'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useQuizStore } from '@/store/useQuizStore';

export default function LandingPage() {
  const language = useQuizStore((state) => state.language);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden bg-stone-50 selection:bg-rose-200 touch-manipulation">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-0 noise-overlay" />

      {/* Background Organic Aura (Fluid Blob) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-rose-200 via-stone-100 to-teal-100 opacity-80 blur-3xl fluid-blob" />
      </div>
      
      {/* Content Container - Mobile Optimized */}
      <div className="relative z-10 w-full px-5 max-w-md mx-auto pt-[8vh]">
        <div className="flex flex-col items-center justify-center p-8 md:p-10 text-center glass-panel w-full">
          <h3 className="text-[10px] tracking-[0.4em] text-stone-500 uppercase mb-6 font-sans">
            {language === 'en' ? 'Zenshil Presents' : 'Zenshil 呈現'}
          </h3>
          <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight text-stone-900 mb-6 leading-tight">
            {language === 'en' ? (
              <>Skin Aura <br /> Test</>
            ) : (
              <>肌膚氣場 <br /> 測試</>
            )}
          </h1>
          <p className="text-stone-600 font-sans mb-12 leading-relaxed font-light text-sm md:text-base px-2">
            {language === 'en' 
              ? "Discover your skin's true energy. A 10-question journey to uncover your emotional and physical aura." 
              : "探索你肌膚的真實氣場能量。展開 10 題的感官旅程，一步步揭示你獨特的身心肌膚狀態。"}
          </p>
          
          <Link href="/quiz" className="group relative w-full inline-flex items-center justify-center px-8 py-4 font-sans text-xs tracking-[0.2em] text-white uppercase bg-stone-900 rounded-full overflow-hidden transition-all hover:bg-stone-800 active:scale-[0.98] shadow-lg">
            <span>{language === 'en' ? 'Start the Test' : '開始測試'}</span>
            <ArrowRight className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
