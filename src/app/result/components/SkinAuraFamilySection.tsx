'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import { auraIdentityProfiles, auraOrbColors, getAuraFamily, getAuraIdentity, skinAuraFamilies } from './resultData';

interface SkinAuraFamilySectionProps {
  auraId: string;
}

const familyOrder = ['recovery', 'pressure', 'radiance', 'rhythm'] as const;

export default function SkinAuraFamilySection({ auraId }: SkinAuraFamilySectionProps) {
  const language = useQuizStore((state) => state.language);
  const identity = getAuraIdentity(auraId);
  const family = getAuraFamily(auraId);
  const orb = auraOrbColors[auraId] ?? { inner: '#c4b5fd', mid: '#f9a8d4', outer: '#93c5fd' };

  if (!identity || !family) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="mx-auto mb-5 w-full max-w-md px-5"
    >
      <div className="relative overflow-hidden rounded-[30px] border border-white/65 bg-white/58 p-6 shadow-sm backdrop-blur-sm">
        <div
          className="absolute right-5 top-5 size-24 rounded-full blur-3xl"
          style={{ backgroundColor: `${orb.inner}26` }}
          aria-hidden="true"
        />

        <div className="relative z-10 mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">
            {language === 'en' ? 'Skin Aura Family' : 'Skin Aura Family'}
          </p>
          <h2 className="mt-2 font-serif text-[25px] leading-tight text-stone-900">
            {language === 'en' ? family.name : `你屬於 ${family.nameZh}`}
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-stone-500 text-pretty">
            {language === 'en' ? family.description : family.descriptionZh}
          </p>
        </div>

        <div className="relative z-10 space-y-2.5">
          {familyOrder.map((familyId) => {
            const item = skinAuraFamilies[familyId];
            const isActive = item.id === identity.familyId;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border px-3.5 py-3 transition-colors duration-300 ${
                  isActive
                    ? 'border-white/80 bg-white/72 shadow-sm'
                    : 'border-white/45 bg-white/30'
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: isActive ? orb.mid : 'rgba(168,162,158,0.42)' }}
                      aria-hidden="true"
                    />
                    <span className="text-[12px] font-semibold text-stone-700">
                      {language === 'en' ? item.name : item.nameZh}
                    </span>
                  </div>
                  {isActive && (
                    <span className="rounded-full bg-stone-900 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-white">
                      {language === 'en' ? 'You' : '你'}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {item.memberIds.map((memberId) => {
                    const member = auraIdentityProfiles[memberId];
                    const isCurrent = memberId === auraId;

                    return (
                      <span
                        key={memberId}
                        className={`rounded-full border px-2.5 py-1 text-[9px] font-medium tracking-[0.08em] ${
                          isCurrent
                            ? 'border-stone-900 bg-stone-900 text-white'
                            : 'border-stone-200/70 bg-white/48 text-stone-500'
                        }`}
                      >
                        {language === 'en' ? member.displayName : member.displayNameZh}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
