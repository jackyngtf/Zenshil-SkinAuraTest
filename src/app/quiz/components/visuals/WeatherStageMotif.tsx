'use client';

import { motion, AnimatePresence } from 'framer-motion';
import DryAutumnScene from './DryAutumnScene';
import MorningSunriseScene from './MorningSunriseScene';
import HumidStormScene from './HumidStormScene';
import CloudyVeilScene from './CloudyVeilScene';

interface WeatherStageMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

/* ================================================================== */
/*  Q8 SCENES: "What affects skin easily" (Environmental Disruptions) */
/* ================================================================== */

function Q8Eclipse({ isConfirming }: { isConfirming: boolean }) {
  // Eclipse motif - dark orb covering a light source
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="q8-corona" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#fef08a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
        </radialGradient>
        <filter id="q8-corona-blur"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect width="400" height="400" fill="#020617" />
      
      {/* The glowing corona */}
      <motion.circle
        cx="200" cy="200" r="160"
        fill="url(#q8-corona)"
        filter="url(#q8-corona-blur)"
        animate={{ scale: isConfirming ? 1.5 : [1, 1.1, 1], opacity: isConfirming ? 0 : 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* The dark eclipsing orb */}
      <motion.circle
        cx="200" cy="200" r="120"
        fill="#020617"
        animate={{
          cx: isConfirming ? 400 : 200,
          opacity: isConfirming ? 0 : 1
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q8Emotions({ isConfirming }: { isConfirming: boolean }) {
  // Swirling mixing high-viscosity liquids (ink in water)
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q8-ink">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.02; 0.03; 0.02" dur="8s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -0.5" />
        </filter>
        <radialGradient id="q8-ink-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#be185d" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#fdf4ff" />
      
      <motion.circle
        cx="200" cy="200" r="140"
        fill="url(#q8-ink-grad)"
        filter="url(#q8-ink)"
        animate={{
          scale: isConfirming ? 2 : [1, 1.2, 0.9, 1.1, 1],
          opacity: isConfirming ? 0 : 0.9,
          rotate: isConfirming ? 90 : [0, 45, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q8Stress({ isConfirming }: { isConfirming: boolean }) {
  // Jagged lightning-like crack forming in thick ice
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q8-ice-texture">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0" result="coloredNoise" />
          <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture" />
          <feSpecularLighting in="texture" surfaceScale="3" specularConstant="1.2" specularExponent="20" lightingColor="#ffffff">
            <fePointLight x="200" y="200" z="50" />
          </feSpecularLighting>
          <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="specOut" />
        </filter>
        <filter id="q8-crack-glow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <rect width="400" height="400" fill="#e0f2fe" filter="url(#q8-ice-texture)" />
      
      {/* The crack */}
      <motion.path
        d="M50 50 L120 180 L200 220 L180 300 L350 400"
        stroke="#ffffff"
        strokeWidth="6"
        fill="none"
        filter="url(#q8-crack-glow)"
        animate={{
          pathLength: isConfirming ? 0 : [0, 1, 1],
          opacity: isConfirming ? 0 : [0, 1, 0.5, 1, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
      {/* Sharp core of the crack */}
      <motion.path
        d="M50 50 L120 180 L200 220 L180 300 L350 400"
        stroke="#0369a1"
        strokeWidth="2"
        fill="none"
        animate={{
          pathLength: isConfirming ? 0 : [0, 1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  );
}

function Q8Diet({ isConfirming }: { isConfirming: boolean }) {
  // Rich color pigments mixing with clear oil
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q8-oil">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" values="0.03; 0.05; 0.03" dur="6s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="60" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 4 -1" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#fef08a" /> {/* Oil base */}
      
      <motion.circle
        cx="150" cy="150" r="120" fill="#16a34a" filter="url(#q8-oil)"
        animate={{ scale: isConfirming ? 1.5 : [1, 1.2, 1], opacity: isConfirming ? 0 : 0.8 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="250" cy="250" r="100" fill="#ea580c" filter="url(#q8-oil)"
        animate={{ scale: isConfirming ? 1.5 : [1, 1.3, 1], opacity: isConfirming ? 0 : 0.8 }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  );
}

export default function WeatherStageMotif({
  questionId,
  previewId,
  isConfirming = false,
}: WeatherStageMotifProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        {previewId ? (
          <motion.div
            key={previewId}
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {/* Q2 Original SVG Weather Scenes */}
            {questionId === 'q2' && previewId === 'A' && <CloudyVeilScene />}
            {questionId === 'q2' && previewId === 'B' && <HumidStormScene />}
            {questionId === 'q2' && previewId === 'C' && <DryAutumnScene />}
            {questionId === 'q2' && previewId === 'D' && <MorningSunriseScene />}

            {/* Q8 Environmental Disruption Scenes */}
            {questionId === 'q8' && previewId === 'A' && <Q8Eclipse isConfirming={isConfirming} />}
            {questionId === 'q8' && previewId === 'B' && <Q8Emotions isConfirming={isConfirming} />}
            {questionId === 'q8' && previewId === 'C' && <Q8Stress isConfirming={isConfirming} />}
            {questionId === 'q8' && previewId === 'D' && <Q8Diet isConfirming={isConfirming} />}
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 45%, rgba(220,210,225,0.5) 0%, rgba(240,235,245,0.3) 50%, rgba(250,248,252,0.1) 100%)',
              }}
            />
            <motion.div
              className="h-20 w-20 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(200,190,215,0.5) 0%, transparent 70%)' }}
              animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
