'use client';

import { motion } from 'framer-motion';

interface AuraGlowPlaceholderProps {
  selectedOption?: string | null;
}

export default function AuraGlowPlaceholder({ selectedOption }: AuraGlowPlaceholderProps) {
  const isConverged = !!selectedOption;

  // Define converged color schemes matching the mood profiles
  // A: Exhausted (Soft, muted stone grey/purples)
  // B: Stressed (Warm warning pinks/reds)
  // C: Needs Rest (Dreamy calming blues/lavender)
  // D: Growth (Vibrant golden/lime energy)
  const getConvergedColor = (layer: number) => {
    if (!selectedOption) return '';
    switch (selectedOption) {
      case 'A': // Muted gray/purple
        return layer === 1 ? '#c7c0d2' : layer === 2 ? '#b3abbc' : layer === 3 ? '#9ca3af' : layer === 4 ? '#d1ccd6' : '#d8d5db';
      case 'B': // Stressed red/rose
        return layer === 1 ? '#fca5a5' : layer === 2 ? '#f87171' : layer === 3 ? '#ef4444' : layer === 4 ? '#fda4af' : '#fecdd3';
      case 'C': // Recovery lavender/blue
        return layer === 1 ? '#c084fc' : layer === 2 ? '#818cf8' : layer === 3 ? '#a78bfa' : layer === 4 ? '#60a5fa' : '#c084fc';
      case 'D': // Growth yellow/green
        return layer === 1 ? '#facc15' : layer === 2 ? '#84cc16' : layer === 3 ? '#a3e635' : layer === 4 ? '#eab308' : '#eab308';
      default:
        return '';
    }
  };

  return (
    <svg
      viewBox="0 0 390 480"
      className="absolute inset-0 h-full w-full overflow-visible"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <defs>
        {/* Deep gaussian blur filter to blend the aura blobs smoothly */}
        <filter id="aura-glow-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="38" />
        </filter>
      </defs>

      {/* Global breathing container: handles the overall inhale/exhale rhythm */}
      <motion.g
        animate={isConverged ? {
          scale: 1.15,
        } : {
          scale: [0.93, 1.07, 0.93],
        }}
        transition={isConverged ? {
          type: 'spring',
          stiffness: 80,
          damping: 15
        } : {
          duration: 7.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: '195px 220px' }}
      >
        {/* Layer 1: Vibrant Indigo/Violet (Deep background mass) */}
        <motion.circle
          cx={isConverged ? 195 : 160}
          cy={isConverged ? 220 : 200}
          r="105"
          fill={isConverged ? getConvergedColor(1) : '#4f46e5'}
          filter="url(#aura-glow-blur)"
          animate={isConverged ? {
            x: 0,
            y: 0,
            scale: 1.1,
            opacity: 0.7,
          } : {
            scale: [0.9, 1.18, 0.95, 0.9],
            opacity: [0.32, 0.48, 0.32],
            x: [-20, 20, -5, -20],
            y: [-10, 15, -15, -10],
          }}
          transition={isConverged ? {
            type: 'spring',
            stiffness: 70,
            damping: 14
          } : {
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '160px 200px' }}
        />

        {/* Layer 2: Vibrant Magenta/Pink */}
        <motion.circle
          cx={isConverged ? 195 : 230}
          cy={isConverged ? 220 : 240}
          r="115"
          fill={isConverged ? getConvergedColor(2) : '#db2777'}
          filter="url(#aura-glow-blur)"
          animate={isConverged ? {
            x: 0,
            y: 0,
            scale: 1.0,
            opacity: 0.65,
          } : {
            scale: [1.12, 0.86, 1.06, 1.12],
            opacity: [0.3, 0.52, 0.3],
            x: [25, -15, 10, 25],
            y: [15, -20, 5, 15],
          }}
          transition={isConverged ? {
            type: 'spring',
            stiffness: 70,
            damping: 14,
            delay: 0.05
          } : {
            duration: 13,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '230px 240px' }}
        />

        {/* Layer 3: Vibrant Lime Green */}
        <motion.circle
          cx={isConverged ? 195 : 150}
          cy={isConverged ? 220 : 270}
          r="90"
          fill={isConverged ? getConvergedColor(3) : '#84cc16'}
          filter="url(#aura-glow-blur)"
          animate={isConverged ? {
            x: 0,
            y: 0,
            scale: 0.9,
            opacity: 0.6,
          } : {
            scale: [0.85, 1.15, 0.92, 0.85],
            opacity: [0.26, 0.44, 0.26],
            x: [-15, 25, -20, -15],
            y: [20, -15, -10, 20],
          }}
          transition={isConverged ? {
            type: 'spring',
            stiffness: 70,
            damping: 14,
            delay: 0.1
          } : {
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '150px 270px' }}
        />

        {/* Layer 4: Bright Cyan/Teal */}
        <motion.circle
          cx={isConverged ? 195 : 240}
          cy={isConverged ? 220 : 170}
          r="100"
          fill={isConverged ? getConvergedColor(4) : '#06b6d4'}
          filter="url(#aura-glow-blur)"
          animate={isConverged ? {
            x: 0,
            y: 0,
            scale: 0.95,
            opacity: 0.65,
          } : {
            scale: [0.95, 1.18, 0.86, 0.95],
            opacity: [0.28, 0.46, 0.28],
            x: [15, -25, -5, 15],
            y: [-20, 10, 15, -20],
          }}
          transition={isConverged ? {
            type: 'spring',
            stiffness: 70,
            damping: 14,
            delay: 0.08
          } : {
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '240px 170px' }}
        />

        {/* Layer 5: Soft Golden Yellow (Shifted to right edge for a warm sunset highlight) */}
        <motion.circle
          cx={isConverged ? 195 : 260}
          cy={isConverged ? 220 : 210}
          r="75"
          fill={isConverged ? getConvergedColor(5) : '#facc15'}
          filter="url(#aura-glow-blur)"
          animate={isConverged ? {
            x: 0,
            y: 0,
            scale: 0.8,
            opacity: 0.5,
          } : {
            scale: [0.85, 1.15, 0.9, 0.85],
            opacity: [0.15, 0.32, 0.15],
            x: [15, -10, 5, 15],
            y: [-10, 15, -5, -10],
          }}
          transition={isConverged ? {
            type: 'spring',
            stiffness: 70,
            damping: 14,
            delay: 0.12
          } : {
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '260px 210px' }}
        />
      </motion.g>
    </svg>
  );
}
