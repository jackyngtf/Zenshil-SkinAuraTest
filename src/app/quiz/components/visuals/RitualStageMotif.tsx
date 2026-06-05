'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { seededNumber } from './deterministicMotion';

interface RitualStageMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

/* ================================================================== */
/*  Q10 SCENES: "Day for yourself" (Sanctuaries)                      */
/* ================================================================== */

function Q10Sleep({ isConfirming }: { isConfirming: boolean }) {
  // Deep night sky with shifting nebulas
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q10-nebula">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.2 0" result="coloredNoise" />
          <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
          <feBlend mode="screen" in="SourceGraphic" in2="texture" />
        </filter>
        <radialGradient id="q10-nebula-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="60%" stopColor="#3b0764" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#020617" />
      
      <motion.rect
        width="400" height="400" fill="url(#q10-nebula-grad)" filter="url(#q10-nebula)"
        animate={{
          scale: isConfirming ? 1.5 : [1, 1.1, 1],
          opacity: isConfirming ? 0 : [0.7, 0.9, 0.7],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.circle
          key={i}
          cx={seededNumber(9000 + i, 0, 400)}
          cy={seededNumber(9100 + i, 0, 400)}
          r={seededNumber(9200 + i, 0.5, 2.5)}
          fill="#ffffff"
          animate={{
            opacity: isConfirming ? 0 : [0.2, 1, 0.2]
          }}
          transition={{ duration: seededNumber(9300 + i, 2, 5), repeat: Infinity }}
        />
      ))}
    </svg>
  );
}

function Q10Spa({ isConfirming }: { isConfirming: boolean }) {
  // Steaming thermal pool with light caressing the surface
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q10-pool">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.04; 0.05; 0.04" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="q10-steam"><feGaussianBlur stdDeviation="15" /></filter>
      </defs>
      <rect width="400" height="400" fill="#0284c7" />
      
      {/* Water surface */}
      <motion.rect
        width="400" height="400" fill="#38bdf8" filter="url(#q10-pool)"
        animate={{ opacity: isConfirming ? 0 : 0.8 }}
      />
      
      {/* Steam rising */}
      <motion.ellipse
        cx="200" cy="300" rx="150" ry="80"
        fill="#ffffff" opacity="0.4" filter="url(#q10-steam)"
        animate={{
          cy: isConfirming ? -100 : [300, 100],
          opacity: isConfirming ? 0 : [0, 0.6, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function Q10Nature({ isConfirming }: { isConfirming: boolean }) {
  // Dappled sunlight filtering through swaying forest canopy
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q10-leaves">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 4 -1.5" result="contrast" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite operator="in" in="SourceGraphic" in2="contrast" />
        </filter>
        <radialGradient id="q10-sunlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#064e3b" />
      
      {/* Sunbeams */}
      <motion.circle
        cx="200" cy="200" r="200" fill="url(#q10-sunlight)"
        animate={{ scale: isConfirming ? 2 : [1, 1.2, 1], opacity: isConfirming ? 0 : [0.6, 0.9, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Dappled shadows */}
      <motion.rect
        width="400" height="400" fill="#022c22" filter="url(#q10-leaves)" opacity="0.8"
        animate={{
          x: isConfirming ? -50 : [0, 20, 0],
          y: isConfirming ? 50 : [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q10Facial({ isConfirming }: { isConfirming: boolean }) {
  // Slow-swirling pearlescent lotion texture
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q10-lotion">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.02; 0.03; 0.02" dur="6s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
          <feSpecularLighting surfaceScale="5" specularConstant="1" specularExponent="30" lightingColor="#ffffff">
            <fePointLight x="100" y="100" z="80" />
          </feSpecularLighting>
          <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="specOut" />
        </filter>
        <radialGradient id="q10-lotion-base" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#fce7f3" />
      
      <motion.rect
        width="400" height="400" fill="url(#q10-lotion-base)" filter="url(#q10-lotion)"
        animate={{
          rotate: isConfirming ? 90 : [0, 45, 0],
          scale: isConfirming ? 1.5 : [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q10IdleRitualAura() {
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    cx: seededNumber(9800 + i, 118, 282),
    cy: seededNumber(9900 + i, 112, 282),
    r: seededNumber(10000 + i, 0.7, 1.8),
    drift: seededNumber(10100 + i, -10, 10),
    delay: seededNumber(10200 + i, 0, 4),
    duration: seededNumber(10300 + i, 5.5, 8.5),
  }));

  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="q10-idle-pearl-field" cx="50%" cy="48%" r="58%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.94" />
          <stop offset="38%" stopColor="#f5f7f8" stopOpacity="0.86" />
          <stop offset="72%" stopColor="#e6f1ef" stopOpacity="0.48" />
          <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.18" />
        </radialGradient>
        <radialGradient id="q10-idle-blush-bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde2e8" stopOpacity="0.54" />
          <stop offset="62%" stopColor="#fff7ed" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="q10-idle-mint-bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#cdeee8" stopOpacity="0.5" />
          <stop offset="64%" stopColor="#e0f2fe" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="q10-idle-inner-light" cx="48%" cy="46%" r="46%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.86" />
          <stop offset="55%" stopColor="#edf7f5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="q10-idle-silk-line" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="48%" stopColor="#c7d2d8" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="q10-idle-soften" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <rect width="400" height="400" fill="url(#q10-idle-pearl-field)" opacity="0.92" />

      <motion.circle
        cx="168"
        cy="178"
        r="104"
        fill="url(#q10-idle-blush-bloom)"
        animate={{ x: [-5, 6, -5], y: [4, -3, 4], opacity: [0.28, 0.46, 0.28] }}
        transition={{ duration: 8.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.circle
        cx="232"
        cy="212"
        r="112"
        fill="url(#q10-idle-mint-bloom)"
        animate={{ x: [6, -5, 6], y: [-3, 4, -3], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.circle
        cx="200"
        cy="194"
        r="128"
        fill="url(#q10-idle-inner-light)"
        animate={{ scale: [0.985, 1.025, 0.985], opacity: [0.52, 0.74, 0.52] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 194px' }}
      />

      <motion.circle
        cx="200"
        cy="200"
        r="118"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
        opacity="0.44"
        animate={{ scale: [0.99, 1.025, 0.99], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 7.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '200px 200px' }}
      />

      {[126, 158, 196, 232].map((y, index) => (
        <motion.path
          key={`ritual-idle-flow-${y}`}
          d={`M74 ${y} C122 ${y - 10}, 160 ${y + 11}, 204 ${y - 3} S286 ${y + 8}, 326 ${y - 6}`}
          fill="none"
          stroke="url(#q10-idle-silk-line)"
          strokeWidth={index === 1 ? 1.4 : 1}
          strokeLinecap="round"
          opacity="0.48"
          filter="url(#q10-idle-soften)"
          animate={{ x: [index % 2 === 0 ? -5 : 5, index % 2 === 0 ? 6 : -6, index % 2 === 0 ? -5 : 5], opacity: [0.2, 0.44, 0.2] }}
          transition={{ duration: 6.5 + index * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {particles.map((particle, index) => (
        <motion.circle
          key={`ritual-idle-particle-${index}`}
          cx={particle.cx}
          cy={particle.cy}
          r={particle.r}
          fill="#ffffff"
          opacity="0.36"
          animate={{
            y: [0, -14, 0],
            x: [0, particle.drift, 0],
            opacity: [0.08, 0.46, 0.08],
            scale: [0.8, 1.12, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.circle
        cx="200"
        cy="200"
        r="154"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        opacity="0.52"
        animate={{ opacity: [0.32, 0.58, 0.32] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function RitualStageMotif({
  questionId,
  previewId,
  isConfirming = false,
}: RitualStageMotifProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        {previewId && (
          <motion.div
            key={previewId}
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {questionId === 'q10' && previewId === 'A' && <Q10Sleep isConfirming={isConfirming} />}
            {questionId === 'q10' && previewId === 'B' && <Q10Spa isConfirming={isConfirming} />}
            {questionId === 'q10' && previewId === 'C' && <Q10Nature isConfirming={isConfirming} />}
            {questionId === 'q10' && previewId === 'D' && <Q10Facial isConfirming={isConfirming} />}
          </motion.div>
        )}
      </AnimatePresence>

      {!previewId && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Q10IdleRitualAura />
        </motion.div>
      )}
    </div>
  );
}
