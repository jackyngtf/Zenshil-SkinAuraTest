'use client';

import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/useQuizStore';
import { statLabels } from './resultData';
import { auraOrbColors } from './resultData';

interface CompactStatRowProps {
  stats: { energy: number; glow: number; stress: number; recoveryNeeded: number };
  auraId: string;
}

export default function CompactStatRow({ stats, auraId }: CompactStatRowProps) {
  const language = useQuizStore((state) => state.language);
  const orb = auraOrbColors[auraId] ?? { inner: '#c4b5fd', mid: '#f9a8d4', outer: '#93c5fd' };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto px-5 mb-5"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-white/65 bg-white/55 px-3 py-4 shadow-sm backdrop-blur-sm">
        <div
          className="absolute left-6 right-6 top-0 h-px opacity-60"
          style={{
            background: `linear-gradient(90deg, transparent, ${orb.inner}, ${orb.mid}, ${orb.outer}, transparent)`,
          }}
        />
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-stone-400">
            {language === 'en' ? 'Clinical Aura Index' : '肌膚氣場指標'}
          </p>
          <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-stone-400">
            Zenshil
          </p>
        </div>
        <div className="grid grid-cols-4">
        {statLabels.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative px-2 py-1 text-center"
          >
            {i > 0 && <div className="absolute left-0 top-2 bottom-2 w-px bg-stone-200/55" />}

            <p className="mb-1 font-serif text-[24px] leading-none text-stone-800 tabular-nums">
              {stats[stat.key]}%
            </p>
            <p className="text-[8px] font-medium uppercase tracking-[0.12em] text-stone-400">
              {language === 'en' ? stat.nameEn : stat.nameZh}
            </p>
          </motion.div>
        ))}
        </div>
      </div>
    </motion.section>
  );
}
