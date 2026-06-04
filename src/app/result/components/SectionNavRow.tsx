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
      aria-label="Result report sections"
      className="w-full max-w-md mx-auto px-5 pb-3 pt-1"
    >
      <div className="flex items-center justify-between rounded-full border border-stone-200/45 bg-white/45 px-5 py-3 shadow-sm backdrop-blur-sm">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-[0.18em] text-stone-400"
          >
            <span className="text-[6px] opacity-60">{item.dot}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
