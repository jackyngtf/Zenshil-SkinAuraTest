'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ElementStageMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

/* ================================================================== */
/*  Q4 SCENES: "What do you lack" (Atmospheric Lightscapes)           */
/* ================================================================== */

function Q4Sleep({ isConfirming }: { isConfirming: boolean }) {
  // Midnight blue velvet with golden dust motes
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q4-velvet">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 -0.2" result="coloredNoise" />
          <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
          <feDiffuseLighting in="texture" surfaceScale="5" diffuseConstant="1.2" lightingColor="#1e3a8a">
            <fePointLight x="200" y="50" z="60" />
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" in2="texture" />
        </filter>
        <filter id="q4-dust-blur"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <rect width="400" height="400" fill="#0f172a" filter="url(#q4-velvet)" />
      
      {/* Drifting golden dust motes */}
      {[...Array(12)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 400}
          cy={Math.random() * 400}
          r={Math.random() * 4 + 2}
          fill="#fef08a"
          filter="url(#q4-dust-blur)"
          animate={{
            y: isConfirming ? -100 : [0, -50, 0],
            x: isConfirming ? 0 : [0, Math.random() * 40 - 20, 0],
            opacity: isConfirming ? 0 : [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </svg>
  );
}

function Q4Relaxation({ isConfirming }: { isConfirming: boolean }) {
  // Billowing translucent silk fabric
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q4-silk">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.01 0.05; 0.015 0.04; 0.01 0.05" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
          <feSpecularLighting surfaceScale="8" specularConstant="1.2" specularExponent="30" lightingColor="#fdf4ff">
            <fePointLight x="200" y="100" z="100" />
          </feSpecularLighting>
          <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="specOut" />
        </filter>
        <linearGradient id="q4-silk-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#4c1d95" />
      <motion.rect
        width="400" height="400" fill="url(#q4-silk-grad)" filter="url(#q4-silk)"
        opacity="0.85"
        animate={{ scale: isConfirming ? 1.1 : [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q4Time({ isConfirming }: { isConfirming: boolean }) {
  // Slow concentric ripples forming from water droplets
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q4-ripple-blur"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <rect width="400" height="400" fill="#082f49" />
      
      {[1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="200" cy="200" r="0"
          stroke="#bae6fd"
          strokeWidth="4"
          fill="none"
          filter="url(#q4-ripple-blur)"
          animate={{
            r: isConfirming ? 300 : [0, 200],
            opacity: isConfirming ? 0 : [0.8, 0],
            strokeWidth: isConfirming ? 1 : [4, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.3
          }}
        />
      ))}
    </svg>
  );
}

function Q4Energy({ isConfirming }: { isConfirming: boolean }) {
  // Rising thermal current of gold particles
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q4-thermal-blur"><feGaussianBlur stdDeviation="8" /></filter>
        <linearGradient id="q4-thermal-bg" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#1c1917" />
      <motion.rect
        width="400" height="400" fill="url(#q4-thermal-bg)"
        animate={{ opacity: isConfirming ? 0 : [0.6, 0.9, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Flowing particles */}
      {[...Array(15)].map((_, i) => (
        <motion.path
          key={i}
          d={`M${150 + Math.random() * 100} 450 Q${100 + Math.random() * 200} 200, ${150 + Math.random() * 100} -50`}
          stroke="#fde047"
          strokeWidth={Math.random() * 15 + 5}
          strokeLinecap="round"
          fill="none"
          filter="url(#q4-thermal-blur)"
          animate={{
            pathLength: [0, 1],
            opacity: isConfirming ? 0 : [0, 0.6, 0]
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
          }}
        />
      ))}
    </svg>
  );
}

/* ================================================================== */
/*  Q6 SCENES: "Pace of life" (Flow & Kinetic Forces)                 */
/* ================================================================== */

function Q6HighSpeed({ isConfirming }: { isConfirming: boolean }) {
  // Fast-moving, motion-blurred light trails
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q6-speed-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0 15" /> {/* Horizontal blur only */}
        </filter>
      </defs>
      <rect width="400" height="400" fill="#020617" />
      
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={i}
          x1="-100" y1={Math.random() * 400}
          x2="-50" y2={Math.random() * 400}
          stroke={i % 2 === 0 ? "#f97316" : "#e2e8f0"}
          strokeWidth={Math.random() * 6 + 2}
          filter="url(#q6-speed-blur)"
          animate={{
            x1: isConfirming ? 500 : [-100, 500],
            x2: isConfirming ? 600 : [-50, 600],
            opacity: isConfirming ? 0 : [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 0.5 + 0.3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 1
          }}
        />
      ))}
    </svg>
  );
}

function Q6Irregular({ isConfirming }: { isConfirming: boolean }) {
  // Choppy, conflicting ocean waves colliding
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q6-choppy">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="4" result="noise">
            <animate attributeName="baseFrequency" values="0.06; 0.1; 0.06" dur="2s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" xChannelSelector="R" yChannelSelector="G" />
          <feSpecularLighting surfaceScale="8" specularConstant="1.5" specularExponent="20" lightingColor="#e0f2fe">
            <fePointLight x="200" y="200" z="50" />
          </feSpecularLighting>
          <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="specOut" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#0369a1" />
      <motion.rect
        width="400" height="400" fill="#0ea5e9" filter="url(#q6-choppy)"
        animate={{ scale: isConfirming ? 1.5 : [1, 1.1, 1], opacity: isConfirming ? 0 : 0.9 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

function Q6Steady({ isConfirming }: { isConfirming: boolean }) {
  // Heavy, repetitive cascading waterfall
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q6-waterfall">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.1" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.01 0.1; 0.015 0.15; 0.01 0.1" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 -0.2" />
        </filter>
        <linearGradient id="q6-fall-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#334155" />
      
      <motion.rect
        width="400" height="800" y="-400"
        fill="url(#q6-fall-grad)"
        filter="url(#q6-waterfall)"
        animate={{
          y: isConfirming ? 400 : [-400, 0],
          opacity: isConfirming ? 0 : 1
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function Q6Disciplined({ isConfirming }: { isConfirming: boolean }) {
  // Perfectly concentric, rhythmic ripples
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q6-disc-blur"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <rect width="400" height="400" fill="#064e3b" />
      
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="200" cy="200" r="0"
          stroke="#6ee7b7"
          strokeWidth="6"
          fill="none"
          filter="url(#q6-disc-blur)"
          animate={{
            r: isConfirming ? 400 : [0, 400],
            opacity: isConfirming ? 0 : [1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5
          }}
        />
      ))}
    </svg>
  );
}


export default function ElementStageMotif({
  questionId,
  previewId,
  isConfirming = false,
}: ElementStageMotifProps) {
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
            {questionId === 'q4' && previewId === 'A' && <Q4Sleep isConfirming={isConfirming} />}
            {questionId === 'q4' && previewId === 'B' && <Q4Relaxation isConfirming={isConfirming} />}
            {questionId === 'q4' && previewId === 'C' && <Q4Time isConfirming={isConfirming} />}
            {questionId === 'q4' && previewId === 'D' && <Q4Energy isConfirming={isConfirming} />}

            {questionId === 'q6' && previewId === 'A' && <Q6HighSpeed isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'B' && <Q6Irregular isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'C' && <Q6Steady isConfirming={isConfirming} />}
            {questionId === 'q6' && previewId === 'D' && <Q6Disciplined isConfirming={isConfirming} />}
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
          {/* Neutral idle texture */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
            <defs>
              <filter id="element-idle">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                <feGaussianBlur stdDeviation="15" />
              </filter>
            </defs>
            <rect width="400" height="400" fill="#f8fafc" />
            <motion.circle
              cx="200" cy="200" r="100" fill="#cbd5e1" filter="url(#element-idle)"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
