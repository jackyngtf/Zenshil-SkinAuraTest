'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkinVoiceMembraneProps {
  selectedOptionId: string | null;
  quote: string;
  moodState: 'tired' | 'pressure' | 'rest' | 'renewal' | 'idle';
  language: 'zh' | 'en';
  isConfirming: boolean;
}

export default function SkinVoiceMembrane({
  selectedOptionId,
  quote,
  moodState,
  language,
  isConfirming,
}: SkinVoiceMembraneProps) {
  const isEnglish = language === 'en';

  // Color values for dynamic confirm ripple effect
  const confirmRippleColor = useMemo(() => {
    switch (moodState) {
      case 'tired': return 'radial-gradient(circle, rgba(167,139,250,0.65) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)';
      case 'pressure': return 'radial-gradient(circle, rgba(239,113,113,0.55) 0%, rgba(200,220,255,0.2) 65%, transparent 100%)';
      case 'rest': return 'radial-gradient(circle, rgba(45,212,191,0.65) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)';
      case 'renewal': return 'radial-gradient(circle, rgba(253,224,71,0.65) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)';
      default: return 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 100%)';
    }
  }, [moodState]);

  const barColor = useMemo(() => {
    switch (moodState) {
      case 'tired': return 'bg-[#96A7C0]/90'; // soft blue-grey
      case 'pressure': return 'bg-[#C3A9D2]/90'; // smoky violet
      case 'rest': return 'bg-[#82C3B7]/90'; // mineral teal
      case 'renewal': return 'bg-[#E5C185]/95'; // soft gold
      default: return 'bg-stone-300/70';
    }
  }, [moodState]);

  return (
    <div className="relative flex h-full w-full max-w-[310px] max-h-[310px] aspect-square flex-shrink-0 items-center justify-center select-none">
      
      {/* ========================================== */}
      {/* 1. AuraBackgroundLayer (Soft Multicolor Glows) */}
      {/* ========================================== */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden rounded-[40px] pointer-events-none"
        style={{ filter: 'blur(50px)' }}
      >
        {/* Glow 1: Top Left */}
        <motion.div
          className="absolute -left-10 -top-10 h-44 w-44 rounded-full opacity-60"
          animate={{
            x: [0, 16, -12, 0],
            y: [0, -14, 18, 0],
            backgroundColor: 
              moodState === 'idle' ? '#E8E3F5' : // lavender
              moodState === 'tired' ? '#D9E2EC' : // mist blue
              moodState === 'pressure' ? '#D3C3DB' : // smoky violet
              moodState === 'rest' ? '#CCFBF1' : // teal
              '#FEF3C7', // soft gold
          }}
          transition={{
            backgroundColor: { duration: 0.8, ease: "easeInOut" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Glow 2: Top Right */}
        <motion.div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-60"
          animate={{
            x: [0, -18, 14, 0],
            y: [0, 16, -12, 0],
            backgroundColor: 
              moodState === 'idle' ? '#E1E6EB' : // mist blue
              moodState === 'tired' ? '#E3DDF2' : // muted lavender
              moodState === 'pressure' ? '#DBB8C2' : // muted mauve
              moodState === 'rest' ? '#E0F2FE' : // icy mint
              '#DCFCE7', // pearl green
          }}
          transition={{
            backgroundColor: { duration: 0.8, ease: "easeInOut" },
            x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Glow 3: Bottom Left */}
        <motion.div
          className="absolute -left-10 -bottom-10 h-44 w-44 rounded-full opacity-55"
          animate={{
            x: [0, -12, 16, 0],
            y: [0, 18, -14, 0],
            backgroundColor: 
              moodState === 'idle' ? '#F5E3E6' : // blush rose
              moodState === 'tired' ? '#F5E3E6' : // faint blush
              moodState === 'pressure' ? '#E6B3B3' : // soft coral
              moodState === 'rest' ? '#FEF3C7' : // warm ivory
              '#FCE7F3', // champagne
          }}
          transition={{
            backgroundColor: { duration: 0.8, ease: "easeInOut" },
            x: { duration: 14, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Glow 4: Bottom Right */}
        <motion.div
          className="absolute -right-10 -bottom-10 h-36 w-36 rounded-full opacity-50"
          animate={{
            x: [0, 14, -18, 0],
            y: [0, -12, 16, 0],
            backgroundColor: 
              moodState === 'idle' ? '#F5ECE3' : // pale gold
              moodState === 'tired' ? '#F5ECE3' : // pale gold (residual)
              moodState === 'pressure' ? '#E2E8F0' : // faint grey
              moodState === 'rest' ? '#F3E8FF' : // pale lavender
              '#F3E8FF', // faint lavender
          }}
          transition={{
            backgroundColor: { duration: 0.8, ease: "easeInOut" },
            x: { duration: 11, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Glow 5: Center Core */}
        <motion.div
          className="absolute left-16 top-16 h-36 w-36 rounded-full opacity-60"
          animate={{
            scale: [1, 1.15, 0.95, 1],
            backgroundColor: 
              moodState === 'idle' ? '#E3EBE4' : // faint sage
              moodState === 'tired' ? '#F0EFEB' : // pearl grey
              moodState === 'pressure' ? '#F5E3E6' : // rose haze
              moodState === 'rest' ? '#FFFFFF' : // white
              '#FFFBEB', // warm ivory
          }}
          transition={{
            backgroundColor: { duration: 0.8, ease: "easeInOut" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      {/* ========================================== */}
      {/* 2. OrganicMembraneLayer (Translucent layers) */}
      {/* ========================================== */}
      
      {/* Outer Membrane (Layer 1 - Back) */}
      <motion.div
        className="absolute h-[85%] w-[85%] border border-white/10 bg-white/5 opacity-40 shadow-[inset_0_0_24px_rgba(255,255,255,0.15)] backdrop-blur-md pointer-events-none"
        animate={{
          borderRadius: [
            "60% 40% 60% 40% / 40% 60% 40% 60%",
            "45% 55% 45% 55% / 55% 45% 55% 45%",
            "60% 40% 60% 40% / 40% 60% 40% 60%",
          ],
          rotate: [0, 360],
          scale: [0.97, 1.03, 0.97],
        }}
        transition={{
          borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Middle Membrane (Layer 2) */}
      <motion.div
        className="absolute h-[77%] w-[77%] border border-white/15 bg-white/10 opacity-60 shadow-[inset_0_0_18px_rgba(255,255,255,0.25)] backdrop-blur-md pointer-events-none"
        animate={{
          borderRadius: [
            "40% 60% 40% 60% / 60% 40% 60% 40%",
            "55% 45% 55% 45% / 45% 55% 45% 55%",
            "40% 60% 40% 60% / 60% 40% 60% 40%",
          ],
          rotate: [360, 0],
          scale: [1.02, 0.96, 1.02],
        }}
        transition={{
          borderRadius: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Inner Hero Membrane (Layer 3 - Front) */}
      <motion.div
        className="absolute h-[68%] w-[68%] border border-white/45 bg-white/20 shadow-[0_8px_32px_0_rgba(28,25,23,0.04),_inset_0_0_12px_rgba(255,255,255,0.45)] backdrop-blur-xl pointer-events-none"
        animate={{
          borderRadius: [
            "50% 50% 50% 50% / 50% 50% 50% 50%",
            "60% 40% 55% 45% / 45% 55% 40% 60%",
            "50% 50% 50% 50% / 50% 50% 50% 50%",
          ],
          rotate: [0, -360],
          scale: [1, 1.03, 1],
        }}
        transition={{
          borderRadius: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 9, repeat: Infinity, ease: "linear" },
          scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Subtle glass reflection highlight overlay inside front membrane */}
        <div className="absolute inset-0 overflow-hidden rounded-inherit">
          <div className="absolute -left-[50%] -top-[50%] h-[200%] w-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent rotate-[35deg] translate-x-[-10%] translate-y-[-10%]" />
        </div>
      </motion.div>

      {/* Static Content Overlay (No rotation, so text, particles, and waveform remain perfectly stable) */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-10">
        
        {/* ========================================== */}
        {/* 3. Upper Label (Eyes/Expression Area)      */}
        {/* ========================================== */}
        <div className="absolute top-[24%] left-0 right-0 text-center px-4">
          <AnimatePresence mode="wait">
            {!selectedOptionId ? (
              <motion.span
                key="listening-label"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.4 }}
                className={`font-serif leading-relaxed text-stone-600/85 ${
                  isEnglish
                    ? 'text-[10px] tracking-[0.16em]'
                    : 'text-[12px] tracking-[0.22em]'
                }`}
              >
                {isEnglish ? 'LISTENING TO YOUR SKIN' : '細聽肌膚的聲音'}
              </motion.span>
            ) : (
              <motion.span
                key="voice-label"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.4 }}
                className={`font-sans font-normal uppercase text-stone-400/85 ${
                  isEnglish
                    ? 'text-[8.5px] tracking-[0.14em]'
                    : 'text-[9.5px] tracking-[0.2em]'
                }`}
              >
                {isEnglish ? 'A MESSAGE FROM YOUR SKIN' : '來自肌膚的聲音'}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* 4. Center Quote Area (Fixed Position)     */}
        {/* ========================================== */}
        <div className="absolute top-[48%] -translate-y-1/2 left-4 right-4 text-center">
          <AnimatePresence mode="wait">
            {selectedOptionId && (
              <motion.p
                key={selectedOptionId}
                initial={{ opacity: 0, filter: 'blur(7px)', y: 4, scale: 0.985 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(7px)', y: -4, scale: 0.985 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`mx-auto font-serif font-medium text-stone-900 ${
                  isEnglish
                    ? 'max-w-[188px] px-1 text-[15px] leading-snug tracking-normal text-pretty'
                    : 'max-w-[210px] px-2 text-[17px] leading-relaxed tracking-wider sm:text-[18px]'
                }`}
              >
                {quote}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* 5. Waveform / Sound Bar (Mouth Area)      */}
        {/* ========================================== */}
        <div className="absolute bottom-[22%] left-0 right-0 z-10 flex items-center justify-center gap-[3.5px] px-8 h-10 select-none">
          {Array.from({ length: 19 }).map((_, index) => {
            const baseHeights = [5, 7, 10, 14, 19, 23, 27, 29, 31, 32, 31, 29, 27, 23, 19, 14, 10, 7, 5];
            const baseHeight = baseHeights[index];
            const isIdle = !selectedOptionId;

            // Idle state has quiet, almost still visualizer bars
            const scaleYValues = isIdle
              ? [0.18, 0.22, 0.18] // very flat, breathing slightly
              : moodState === 'tired' ? [0.7, 0.9, 0.7]
              : moodState === 'pressure' ? [0.6, 1.3, 0.5, 1.2, 0.6]
              : moodState === 'rest' ? [0.5, 1.2, 0.5]
              : [0.5, 1.4, 0.5]; // renewal

            const duration = isIdle
              ? 4.0 // slow breathing
              : moodState === 'tired' ? 3.5
              : moodState === 'pressure' ? 0.95
              : moodState === 'rest' ? 2.6
              : 1.4; // renewal

            const delay = isIdle
              ? index * 0.05
              : index * (
                  moodState === 'tired' ? 0.08 :
                  moodState === 'pressure' ? 0.04 :
                  moodState === 'rest' ? 0.09 :
                  0.06 // renewal
                );

            return (
              <motion.div
                key={index}
                className={`w-[3px] rounded-full transition-colors duration-500 ${barColor}`}
                style={{
                  height: `${baseHeight}px`,
                  transformOrigin: 'center',
                }}
                animate={{ 
                  scaleY: scaleYValues,
                  opacity: isIdle ? [0.35, 0.65, 0.35] : 1
                }}
                transition={{
                  scaleY: {
                    duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  },
                  opacity: {
                    duration: 3.0,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.05,
                  }
                }}
              />
            );
          })}
        </div>

        {/* ========================================== */}
        {/* 6. Floating Particles                      */}
        {/* ========================================== */}
        {moodState === 'tired' && (
          <div className="absolute inset-0 z-10 overflow-hidden rounded-full pointer-events-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={`p-down-${i}`}
                className="absolute w-[2px] h-[2px] rounded-full bg-indigo-300"
                style={{
                  left: `${15 + i * 8.5}%`,
                  top: '-5%',
                }}
                animate={{
                  y: [0, 160],
                  opacity: [0, 0.45, 0],
                }}
                transition={{
                  duration: 2.8 + (i % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay: i * 0.28,
                }}
              />
            ))}
          </div>
        )}

        {moodState === 'renewal' && (
          <div className="absolute inset-0 z-10 overflow-hidden rounded-full pointer-events-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={`p-up-${i}`}
                className="absolute w-[3px] h-[3px] rounded-full bg-amber-200 shadow-[0_0_6px_rgba(251,191,36,0.4)]"
                style={{
                  left: `${15 + i * 8.5}%`,
                  top: '105%',
                }}
                animate={{
                  y: [0, -160],
                  opacity: [0, 0.65, 0],
                }}
                transition={{
                  duration: 2.4 + (i % 3) * 0.3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.24,
                }}
              />
            ))}
          </div>
        )}

        {/* ========================================== */}
        {/* 7. ConfirmRipple (Selection Pulse Overlay) */}
        {/* ========================================== */}
        <AnimatePresence>
          {isConfirming && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 z-30 overflow-hidden rounded-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {/* Expanding ripple inside the membrane */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: confirmRippleColor }}
                initial={{ scale: 0.75, opacity: 0.9 }}
                animate={{
                  scale: [0.75, 1.35],
                  opacity: [0.9, 0],
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.25, 1, 0.5, 1],
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
