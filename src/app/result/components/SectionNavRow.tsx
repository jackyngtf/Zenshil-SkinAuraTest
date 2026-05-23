'use client';

import { motion } from 'framer-motion';

const navItems = [
  { label: 'AURA', dot: '◆' },
  { label: 'INSIGHT', dot: '◇' },
  { label: 'NEEDS', dot: '◇' },
  { label: 'REFLECTION', dot: '◇' },
];

export default function SectionNavRow() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="w-full max-w-md mx-auto px-5 py-3"
    >
      <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm border border-stone-200/40 rounded-2xl px-5 py-3">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 text-[9px] font-sans font-medium tracking-[0.2em] uppercase text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <span className="text-[6px] opacity-60">{item.dot}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
