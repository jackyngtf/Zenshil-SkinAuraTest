'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import { auraOrbColors } from './resultData';
import { WHATSAPP_BOOKING_URL } from './resultLinks';

interface RitualCTASectionProps {
  auraId: string;
}

export default function RitualCTASection({ auraId }: RitualCTASectionProps) {
  const language = useQuizStore((state) => state.language);
  const orb = auraOrbColors[auraId] ?? { inner: '#c4b5fd', mid: '#f9a8d4', outer: '#93c5fd' };

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md mx-auto px-5 mb-5"
    >
      <div className="relative bg-gradient-to-b from-[#1a1225] via-[#1e1530] to-[#0f0a1a] rounded-3xl p-8 text-center overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
        {/* Glowing portal / arch motif */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 -mt-24">
          <div
            className="absolute inset-0 rounded-full opacity-20 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${orb.mid} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-8 rounded-full opacity-15 blur-2xl"
            style={{
              background: `radial-gradient(circle, ${orb.inner} 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Arch border motif */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-16 border border-white/5 rounded-t-full" />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-12 border border-white/3 rounded-t-full" />

        {/* CSS star particles */}
        <div className="absolute top-10 left-8 w-1 h-1 bg-white/20 rounded-full" />
        <div className="absolute top-16 right-12 w-0.5 h-0.5 bg-white/30 rounded-full" />
        <div className="absolute top-24 left-16 w-0.5 h-0.5 bg-white/15 rounded-full" />
        <div className="absolute bottom-20 right-8 w-1 h-1 bg-white/10 rounded-full" />
        <div className="absolute bottom-28 left-12 w-0.5 h-0.5 bg-white/25 rounded-full" />

        <div className="relative z-10 pt-4">
          {/* Title */}
          <h3 className="text-[10px] font-sans text-white/40 uppercase tracking-[0.35em] mb-6">
            {language === 'en' ? 'RECOMMENDED RITUAL' : '推薦護理療程'}
          </h3>

          {/* Main copy */}
          <p className="text-lg font-serif text-white/90 mb-3 leading-relaxed tracking-wide font-light">
            {language === 'en' ? (
              <>Schedule your personal <br /> skin restoration ritual</>
            ) : (
              <>為肌膚安排一場專屬的 <br /> 能量修復儀式</>
            )}
          </p>

          {/* Supporting copy */}
          <p className="text-[11px] font-sans text-white/35 tracking-wider mb-8 font-light">
            {language === 'en' 
              ? 'Personal Consultation × Deep Restoration × Tailored Skincare'
              : '個人化諮詢 × 深層修復療程 × 專屬護理計畫'}
          </p>

          {/* CTA Link */}
          <a
            href={WHATSAPP_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={language === 'en' ? 'Book your Zenshil skin ritual on WhatsApp' : '透過 WhatsApp 預約 Zenshil 肌膚諮詢'}
            className="w-full inline-flex items-center justify-center px-6 py-4 bg-white text-stone-900 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full hover:bg-stone-50 transition-all duration-300 shadow-[0_4px_24px_rgba(255,255,255,0.15)] active:scale-[0.98]"
          >
            {language === 'en' ? 'BOOK YOUR RITUAL' : '預約專屬儀式'}
            <svg className="w-4 h-4 ml-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
