'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { seededNumber } from './deterministicMotion';
import Q9FirmScene from './q9/Q9FirmScene';
import Q9StableScene from './q9/Q9StableScene';

interface AuraFieldMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

/* ================================================================== */
/*  Q5 SCENES: "Looking in mirror" (Refractions & Glass)              */
/* ================================================================== */

function Q5Energy({ isConfirming }: { isConfirming: boolean }) {
  // Clear pristine water drop magnifying lens
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="q5-lens-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde047" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </radialGradient>
        <filter id="q5-lens-distort">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#f8fafc" />
      
      {/* Background glowing light */}
      <motion.circle
        cx="200" cy="200" r="120"
        fill="url(#q5-lens-bg)"
        animate={{ scale: isConfirming ? 1.5 : [1, 1.2, 1], opacity: isConfirming ? 0 : 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* The water drop lens */}
      <motion.circle
        cx="200" cy="200" r="80"
        fill="#ffffff"
        fillOpacity="0.2"
        stroke="#e2e8f0"
        strokeWidth="2"
        filter="url(#q5-lens-distort)"
        animate={{
          r: isConfirming ? 200 : [80, 85, 78, 80],
          opacity: isConfirming ? 0 : 1
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Highlight on the drop */}
      <motion.ellipse
        cx="170" cy="150" rx="20" ry="10"
        fill="#ffffff"
        opacity="0.8"
        transform="rotate(-45 170 150)"
        animate={{ opacity: isConfirming ? 0 : [0.6, 0.9, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  );
}

function Q5Contour({ isConfirming }: { isConfirming: boolean }) {
  // Sharp contour with specular lighting highlighting the edge
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q5-specular">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="#ffffff">
            <fePointLight x="50" y="50" z="200" />
          </feSpecularLighting>
          <feComposite in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#1e1b4b" />
      
      <motion.path
        d="M-50,450 C100,400 200,300 350,-50 L450,-50 L450,450 Z"
        fill="#312e81"
        filter="url(#q5-specular)"
        animate={{
          d: isConfirming
            ? "M-50,450 C200,450 400,450 450,450 L450,-50 L450,450 Z"
            : [
              "M-50,450 C100,400 200,300 350,-50 L450,-50 L450,450 Z",
              "M-50,450 C120,380 220,280 370,-50 L450,-50 L450,450 Z",
              "M-50,450 C100,400 200,300 350,-50 L450,-50 L450,450 Z"
            ],
          opacity: isConfirming ? 0 : 1
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q5Pores({ isConfirming }: { isConfirming: boolean }) {
  // Porous organic sponge texture
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q5-sponge">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -2" result="contrast" />
          <feComposite operator="in" in="contrast" in2="SourceGraphic" result="texture" />
          <feDiffuseLighting in="texture" surfaceScale="8" diffuseConstant="1.2" lightingColor="#fca5a5">
            <fePointLight x="100" y="100" z="50" />
          </feDiffuseLighting>
          <feBlend mode="multiply" in="SourceGraphic" in2="texture" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#fecaca" />
      <motion.rect
        width="400" height="400" fill="#ef4444" filter="url(#q5-sponge)"
        animate={{ opacity: isConfirming ? 0 : [0.7, 0.9, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q5Puffiness({ isConfirming }: { isConfirming: boolean }) {
  // Frosted glass pane clearing condensation
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q5-frost">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="q5-clear">
          <feGaussianBlur stdDeviation="0" />
        </filter>
        <linearGradient id="q5-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#q5-bg)" />
      
      {/* Frosted overlay */}
      <motion.rect
        width="400" height="400" fill="#ccfbf1" opacity="0.6"
        filter={isConfirming ? "url(#q5-clear)" : "url(#q5-frost)"}
        animate={{ opacity: isConfirming ? 0 : [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ================================================================== */
/*  Q9 SCENES: "Ideal skin state" (Perfected Elements)                */
/* ================================================================== */

function Q9Vitality({ isConfirming }: { isConfirming: boolean }) {
  // Clean living glow without clipped filter edges.
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="q9-vital-center" cx="50%" cy="48%" r="48%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
          <stop offset="22%" stopColor="#fef3c7" stopOpacity="0.76" />
          <stop offset="58%" stopColor="#bae6fd" stopOpacity="0.48" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="q9-vital-horizon" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.7" />
          <stop offset="48%" stopColor="#fde68a" stopOpacity="0.58" />
          <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.76" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#f8fafc" />
      <circle cx="200" cy="200" r="190" fill="url(#q9-vital-horizon)" opacity="0.92" />
      <motion.circle
        cx="200" cy="198" r="145"
        fill="url(#q9-vital-center)"
        animate={{
          scale: isConfirming ? 1.12 : [1, 1.04, 1],
          opacity: isConfirming ? 0 : [0.86, 1, 0.86]
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M78 214 C126 198 166 204 205 214 C248 226 292 220 326 202"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeOpacity="0.34"
        strokeLinecap="round"
        animate={{ opacity: isConfirming ? 0 : [0.22, 0.42, 0.22], y: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q9Radiant({ isConfirming }: { isConfirming: boolean }) {
  // Warm golden sunburst with flares
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="q9-sunburst" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
        </radialGradient>
        <filter id="q9-flare-blur"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <rect width="400" height="400" fill="#78350f" />
      
      <motion.circle
        cx="200" cy="200" r="250"
        fill="url(#q9-sunburst)"
        animate={{
          scale: isConfirming ? 1.5 : [1, 1.1, 1],
          opacity: isConfirming ? 0 : 1
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating lens flares/embers */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          cx={seededNumber(8000 + i, 0, 400)}
          cy={seededNumber(8100 + i, 0, 400)}
          r={seededNumber(8200 + i, 5, 20)}
          fill="#fef08a" opacity="0.6"
          filter="url(#q9-flare-blur)"
          animate={{
            scale: [1, 1.5, 1],
            opacity: isConfirming ? 0 : [0.3, 0.8, 0.3],
            x: [0, seededNumber(8300 + i, -25, 25), 0],
            y: [0, seededNumber(8400 + i, -50, 0), 0]
          }}
          transition={{ duration: seededNumber(8500 + i, 3, 6), repeat: Infinity }}
        />
      ))}
    </svg>
  );
}


export default function AuraFieldMotif({
  questionId,
  previewId,
  isConfirming = false,
}: AuraFieldMotifProps) {
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
            {questionId === 'q5' && previewId === 'A' && <Q5Energy isConfirming={isConfirming} />}
            {questionId === 'q5' && previewId === 'B' && <Q5Contour isConfirming={isConfirming} />}
            {questionId === 'q5' && previewId === 'C' && <Q5Pores isConfirming={isConfirming} />}
            {questionId === 'q5' && previewId === 'D' && <Q5Puffiness isConfirming={isConfirming} />}

            {questionId === 'q9' && previewId === 'A' && <Q9Vitality isConfirming={isConfirming} />}
            {questionId === 'q9' && previewId === 'B' && <Q9FirmScene isConfirming={isConfirming} />}
            {questionId === 'q9' && previewId === 'C' && <Q9StableScene isConfirming={isConfirming} />}
            {questionId === 'q9' && previewId === 'D' && <Q9Radiant isConfirming={isConfirming} />}
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
              <filter id="aura-idle">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 -0.2" />
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>
            <rect width="400" height="400" fill="#f8fafc" />
            <motion.circle
              cx="200" cy="200" r="150" fill="#e2e8f0" filter="url(#aura-idle)"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
