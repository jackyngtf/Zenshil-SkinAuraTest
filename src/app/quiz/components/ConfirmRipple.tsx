'use client';

import { motion } from 'framer-motion';

interface ConfirmRippleProps {
  color?: string;
}

export default function ConfirmRipple({ color = 'rgba(255,255,255,0.82)' }: ConfirmRippleProps) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0.36) 36%, transparent 72%)`,
      }}
      initial={{ opacity: 0.85, scale: 0.2 }}
      animate={{ opacity: 0, scale: 2.9 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
