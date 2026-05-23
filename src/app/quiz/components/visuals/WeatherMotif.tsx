'use client';

import { motion } from 'framer-motion';

export type WeatherVariant = 'cloudy' | 'storm' | 'dry' | 'morning';

interface WeatherMotifProps {
  variant: WeatherVariant;
  isSelected?: boolean;
  isConfirming?: boolean;
}

export default function WeatherMotif({ variant, isSelected = false, isConfirming = false }: WeatherMotifProps) {
  if (variant === 'cloudy') {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full overflow-visible" role="presentation">
        <defs>
          <filter id="weather-cloud-soft">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <motion.path
          d="M38 48 C44 31 62 31 70 42 C80 25 107 33 108 52 C124 53 132 65 126 78 L42 78 C28 76 25 58 38 48 Z"
          fill="#e8eef2"
          opacity="0.9"
          filter="url(#weather-cloud-soft)"
          animate={{ x: isConfirming ? 0 : [-3, 3, -3], opacity: isConfirming ? 1 : [0.76, 0.92, 0.76] }}
          transition={{ duration: isConfirming ? 0.38 : 7, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
        <path
          d="M40 50 C47 35 63 36 71 46 C82 32 103 38 104 56 C118 57 124 66 119 76 L43 76 C31 74 29 59 40 50 Z"
          fill="rgba(255,255,255,0.54)"
        />
        {[48, 66, 84, 102].map((x, index) => (
          <motion.path
            key={x}
            d={`M${x} 82 L${x - 5} 101`}
            fill="none"
            stroke="#9fb2bf"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={0.34}
            animate={{ y: isConfirming ? 6 : [0, 7, 0], opacity: [0.16, 0.42, 0.16] }}
            transition={{ duration: 2.8 + index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {isSelected && <circle cx="80" cy="66" r="44" fill="none" stroke="#f8fafc" strokeOpacity="0.8" strokeWidth="1" />}
      </svg>
    );
  }

  if (variant === 'storm') {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full overflow-visible" role="presentation">
        <defs>
          <filter id="weather-storm-soft">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        <motion.path
          d="M30 48 C38 25 63 29 72 42 C83 24 116 30 119 54 C137 55 143 76 128 86 L35 86 C17 82 15 58 30 48 Z"
          fill="#9b8d98"
          opacity="0.42"
          filter="url(#weather-storm-soft)"
          animate={{ x: isConfirming ? 0 : [-3, 4, -3], opacity: isConfirming ? 0.58 : [0.34, 0.5, 0.34] }}
          transition={{ duration: isConfirming ? 0.38 : 4.5, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M80 30 C117 35 132 60 109 78 C85 97 39 78 55 49 C65 31 88 43 92 58"
          fill="none"
          stroke="#b87987"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.46"
          animate={{ rotate: isConfirming ? 8 : [-3, 5, -3], scale: isConfirming ? 1.08 : [1, 1.05, 1] }}
          transition={{ duration: isConfirming ? 0.38 : 5.2, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '80px 60px' }}
        />
        {[38, 54, 70, 86, 102, 118].map((x, index) => (
          <motion.path
            key={x}
            d={`M${x} 84 L${x - 10} 113`}
            fill="none"
            stroke={index % 2 === 0 ? '#74818f' : '#c08a92'}
            strokeWidth={index % 2 === 0 ? 1.6 : 1.2}
            strokeLinecap="round"
            opacity="0.54"
            animate={{ y: isConfirming ? 7 : [0, 9, 0], opacity: [0.24, 0.64, 0.24] }}
            transition={{ duration: 1.8 + index * 0.08, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {[36, 52, 68].map((y, index) => (
          <motion.path
            key={y}
            d={`M22 ${y} C56 ${y - 8}, 96 ${y + 10}, 138 ${y - 2}`}
            fill="none"
            stroke="#d6a098"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.24"
            animate={{ x: [-5, 5, -5], opacity: [0.16, 0.36, 0.16] }}
            transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    );
  }

  if (variant === 'dry') {
    return (
      <svg viewBox="0 0 160 120" className="h-full w-full overflow-visible" role="presentation">
        <defs>
          <linearGradient id="dry-skin-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff7ed" />
            <stop offset="100%" stopColor="#ead1b0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M28 77 C48 47 91 34 131 63 C118 92 59 105 28 77 Z"
          fill="url(#dry-skin-fill)"
          opacity="0.84"
          animate={{ y: isConfirming ? -1 : [0, 2, 0] }}
          transition={{ duration: isConfirming ? 0.42 : 6, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
        {[50, 67, 84, 101].map((x, index) => (
          <motion.path
            key={x}
            d={`M${x} ${index % 2 === 0 ? 63 : 75} C${x + 7} ${index % 2 === 0 ? 70 : 66}, ${x + 1} ${index % 2 === 0 ? 78 : 84}, ${x + 13} ${index % 2 === 0 ? 88 : 91}`}
            fill="none"
            stroke={index % 2 === 0 ? '#a8794e' : '#c38f83'}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
            animate={{ pathLength: isConfirming ? 1 : [0.45, 1, 0.45] }}
            transition={{ duration: isConfirming ? 0.42 : 4.8 + index * 0.3, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
          />
        ))}
        <motion.path
          d="M124 34 C116 42 117 52 126 58 C135 49 136 40 124 34 Z"
          fill="#d5a463"
          opacity="0.48"
          animate={{ rotate: [-4, 4, -4], y: [0, 4, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '126px 48px' }}
        />
        {[40, 60, 80].map((y, index) => (
          <motion.path
            key={y}
            d={`M30 ${y} C58 ${y - 8}, 95 ${y + 9}, 132 ${y - 4}`}
            fill="none"
            stroke="#d3ad76"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.25"
            animate={{ x: [-2, 3, -2], opacity: [0.16, 0.36, 0.16] }}
            transition={{ duration: 5.8 + index, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 120" className="h-full w-full overflow-visible" role="presentation">
      <defs>
        <linearGradient id="morning-reflection" x1="0" x2="1">
          <stop offset="0%" stopColor="#fff7d6" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f9cbd8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="80"
        cy="48"
        r="24"
        fill="#fff7d6"
        opacity="0.55"
        animate={{ scale: isConfirming ? 1.45 : [1, 1.08, 1], opacity: isConfirming ? 0.86 : [0.48, 0.7, 0.48] }}
        transition={{ duration: isConfirming ? 0.42 : 5.8, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '80px 48px' }}
      />
      {[36, 50, 64].map((r, index) => (
        <motion.path
          key={r}
          d={`M${80 - r} 68 A${r} ${r * 0.55} 0 0 1 ${80 + r} 68`}
          fill="none"
          stroke={index === 1 ? '#f3cbbd' : '#efd489'}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.28 + index * 0.12}
          animate={{ y: isConfirming ? -2 : [0, -3, 0], opacity: isConfirming ? 0.72 : [0.28, 0.48, 0.28] }}
          transition={{ duration: isConfirming ? 0.42 : 6 + index, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.path
        d="M34 88 C64 78 96 100 126 88"
        fill="none"
        stroke="url(#morning-reflection)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.5"
        animate={{ x: isConfirming ? 18 : [-8, 8, -8], opacity: isConfirming ? 0.72 : [0.24, 0.58, 0.24] }}
        transition={{ duration: isConfirming ? 0.42 : 4.6, repeat: isConfirming ? 0 : Infinity, ease: 'easeInOut' }}
      />
      {[44, 62, 98, 116].map((x, index) => (
        <motion.path
          key={x}
          d={`M${x} 84 L${x + (index % 2 === 0 ? 8 : -8)} 98`}
          fill="none"
          stroke="#f6d47d"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.38"
          animate={{ opacity: [0.18, 0.58, 0.18], y: [3, -3, 3] }}
          transition={{ duration: 3.8 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}
