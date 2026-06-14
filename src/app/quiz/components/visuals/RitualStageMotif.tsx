'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import RitualIdleScene from './ritual/RitualIdleScene';
import RitualSleepScene from './ritual/RitualSleepScene';
import RitualSpaScene from './ritual/RitualSpaScene';
import RitualNatureScene from './ritual/RitualNatureScene';
import RitualFacialScene from './ritual/RitualFacialScene';

/* ================================================================== */
/*  Q10「一日四個時刻」 — orchestrator only.                           */
/*  Scenes live in ./ritual/ (one file per ritual, shared system in   */
/*  ritualShared.tsx). Spec:                                          */
/*  docs/superpowers/specs/2026-06-12-q10-ritual-redesign.md          */
/* ================================================================== */

interface RitualStageMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

const revealEase = [0.22, 1, 0.36, 1] as const;

const SCENES = {
  A: RitualSleepScene,
  B: RitualSpaScene,
  C: RitualNatureScene,
  D: RitualFacialScene,
} as const;

export default function RitualStageMotif({
  questionId,
  previewId,
  isConfirming = false,
}: RitualStageMotifProps) {
  const reduceMotion = Boolean(useReducedMotion());

  if (questionId !== 'q10') return null;

  const Scene =
    previewId && previewId in SCENES
      ? SCENES[previewId as keyof typeof SCENES]
      : RitualIdleScene;

  return (
    <div className="absolute inset-0 size-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={previewId ?? 'idle'}
          className="absolute inset-0 z-10"
          initial={{ opacity: 0, scale: 0.985, y: 8, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.012, y: -4, filter: 'blur(4px)' }}
          transition={{ duration: reduceMotion ? 0 : 0.48, ease: revealEase }}
        >
          <Scene isConfirming={isConfirming} reduceMotion={reduceMotion} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
