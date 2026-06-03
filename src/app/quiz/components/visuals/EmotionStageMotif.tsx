'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { seededNumber } from './deterministicMotion';

interface EmotionStageMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

/* ================================================================== */
/*  Q3 SCENES: "If skin had feelings" (Layered Organic Aura)          */
/* ================================================================== */

function Q3SkinAura({ previewId, isConfirming }: { previewId: string | null; isConfirming: boolean }) {
  // Layered petal glass / organic membrane
  let primary = "#f5f5f4";
  let secondary = "#e7e5e4";
  let accent = "#d6d3d1";

  if (previewId === 'A') { primary = "#f3e8ff"; secondary = "#e9d5ff"; accent = "#c084fc"; }
  if (previewId === 'B') { primary = "#ffe4e6"; secondary = "#fecdd3"; accent = "#fb7185"; }
  if (previewId === 'C') { primary = "#ccfbf1"; secondary = "#99f6e4"; accent = "#2dd4bf"; }
  if (previewId === 'D') { primary = "#ecfccb"; secondary = "#d9f99d"; accent = "#a3e635"; }

  // Idle state
  if (!previewId) {
    primary = "#fafaf9";
    secondary = "#f5f5f4";
    accent = "#e7e5e4";
  }

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Layer 1: Base Membrane Gradient */}
      <motion.div
        className="absolute w-[180%] h-[180%] rounded-full blur-[30px] opacity-70"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${secondary}, ${primary}, ${accent}, ${secondary})`
        }}
        animate={{
          rotate: isConfirming ? 180 : [0, 360],
          scale: isConfirming ? 0.95 : [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Layer 2: Floating Petal Glass (lighter overlay) */}
      <motion.div
        className="absolute w-[140%] h-[140%] rounded-full mix-blend-overlay opacity-90 blur-[10px]"
        style={{
          background: `radial-gradient(ellipse at 40% 40%, #ffffff 0%, transparent 60%),
                       radial-gradient(ellipse at 60% 60%, ${accent} 0%, transparent 60%)`
        }}
        animate={{
          rotate: isConfirming ? -90 : [0, -360],
          scale: isConfirming ? 1.05 : [1, 1.03, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Layer 3: Central Soft Focus */}
      <motion.div 
        className="absolute w-3/4 h-3/4 rounded-full bg-white/40 backdrop-blur-md shadow-[inset_0_0_30px_rgba(255,255,255,0.8)] border border-white/50"
        animate={{
          scale: isConfirming ? 1.05 : [1, 1.02, 1],
          opacity: isConfirming ? 0 : 1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Layer 4: Skin Signal Waveform (subtle pulse at bottom) */}
      {previewId && (
        <div className="absolute bottom-[22%] flex items-center justify-center gap-[5px] mix-blend-multiply" style={{ color: accent }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-current opacity-50"
              animate={{
                height: isConfirming ? 4 : [4, seededNumber(7000 + i, 10, 18), 4],
                opacity: isConfirming ? 0 : 0.5,
              }}
              transition={{
                duration: seededNumber(7100 + i, 1.2, 2.2),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ================================================================== */
/*  Q7 SCENES: "Feeling to improve" (Material Transmutations)         */
/* ================================================================== */

function Q7Dullness({ isConfirming }: { isConfirming: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q7-stone">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <linearGradient id="q7-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#44403c" filter="url(#q7-stone)" />
      <motion.rect
        width="800" height="400"
        fill="url(#q7-sweep)"
        animate={{ x: isConfirming ? 400 : [-400, 400] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q7Firmness({ isConfirming }: { isConfirming: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="q7-elastic" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#4f46e5" />
        </radialGradient>
        <filter id="q7-wobble">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#312e81" />
      <motion.circle
        cx="200" cy="200" r="160"
        fill="url(#q7-elastic)"
        filter="url(#q7-wobble)"
        animate={{
          scale: isConfirming ? 1.1 : [1, 1.05, 0.98, 1],
          opacity: isConfirming ? 0 : 0.9
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function Q7Sensitive({ isConfirming }: { isConfirming: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="q7-ice">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -0.5" />
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="#e2e8f0" />
      <motion.rect
        width="400" height="400" fill="#bae6fd" filter="url(#q7-ice)"
        animate={{ opacity: isConfirming ? 0 : [0.7, 0.9, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="200" cy="200" r="100" fill="#fecaca" opacity="0.4" filter="blur(30px)"
        animate={{ scale: isConfirming ? 2 : [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  );
}

function Q7Radiance({ isConfirming }: { isConfirming: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="q7-rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.6" />
          <stop offset="33%" stopColor="#fde047" stopOpacity="0.6" />
          <stop offset="66%" stopColor="#86efac" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.6" />
        </linearGradient>
        <filter id="q7-prism-blur"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <rect width="400" height="400" fill="#f8fafc" />
      <motion.polygon
        points="200,50 350,200 200,350 50,200"
        fill="url(#q7-rainbow)"
        filter="url(#q7-prism-blur)"
        animate={{
          rotate: isConfirming ? 90 : [0, 45, 0],
          scale: isConfirming ? 1.5 : [1, 1.1, 1],
          opacity: isConfirming ? 0 : 1
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "200px 200px" }}
      />
    </svg>
  );
}

export default function EmotionStageMotif({
  questionId,
  previewId,
  isConfirming = false,
}: EmotionStageMotifProps) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        {questionId === 'q3' && (
          <Q3SkinAura key="q3-aura" previewId={previewId} isConfirming={isConfirming} />
        )}

        {questionId === 'q7' && previewId && (
          <motion.div
            key={previewId}
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {previewId === 'A' && <Q7Dullness isConfirming={isConfirming} />}
            {previewId === 'B' && <Q7Firmness isConfirming={isConfirming} />}
            {previewId === 'C' && <Q7Sensitive isConfirming={isConfirming} />}
            {previewId === 'D' && <Q7Radiance isConfirming={isConfirming} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle state for Q7 */}
      {!previewId && questionId === 'q7' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
            <defs>
              <filter id="idle-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2 -0.5" />
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            <rect width="400" height="400" fill="#f5f5f4" />
            <motion.rect
              width="400" height="400" fill="#d6d3d1" filter="url(#idle-noise)"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}
