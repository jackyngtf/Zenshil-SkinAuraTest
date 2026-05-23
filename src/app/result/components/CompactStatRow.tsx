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
      <div className="grid grid-cols-4 gap-2">
        {statLabels.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl py-4 px-2 text-center overflow-hidden"
          >
            {/* Subtle tinted top bar */}
            <div
              className="absolute top-0 left-2 right-2 h-px opacity-40"
              style={{
                background: `linear-gradient(90deg, transparent, ${orb.mid}, transparent)`,
              }}
            />

            <p className="text-[7px] font-sans font-medium tracking-[0.25em] uppercase text-stone-400 mb-1.5">
              {language === 'en' ? 'INDEX' : '指標'}
            </p>
            <p className="text-2xl font-serif tracking-tight text-stone-800 mb-1">
              {stats[stat.key]}%
            </p>
            <p className="text-[8px] font-sans tracking-[0.15em] uppercase text-stone-400 font-light">
              {language === 'en' ? stat.nameEn : stat.nameZh}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
