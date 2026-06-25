'use client';

import { motion, AnimatePresence } from 'framer-motion';
import DryAutumnScene from './DryAutumnScene';
import MorningSunriseScene from './MorningSunriseScene';
import HumidStormScene from './HumidStormScene';
import CloudyVeilScene from './CloudyVeilScene';
import ConcernLateNight from './concern/ConcernLateNight';
import ConcernEmotion from './concern/ConcernEmotion';
import ConcernStress from './concern/ConcernStress';
import ConcernDiet from './concern/ConcernDiet';
import Q2IdleWeatherScene from './q02/IdleWeatherScene';

interface WeatherStageMotifProps {
  questionId: string;
  previewId: string | null;
  isConfirming?: boolean;
}

/* Q2 = weather scenes (unchanged). Q8 = soft "concern aura" scenes that
   read as a feeling seeping into the skin (see concern/concernShared). */
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

            {/* Q8 Concern Aura Scenes */}
            {questionId === 'q8' && previewId === 'A' && <ConcernLateNight isConfirming={isConfirming} />}
            {questionId === 'q8' && previewId === 'B' && <ConcernEmotion isConfirming={isConfirming} />}
            {questionId === 'q8' && previewId === 'C' && <ConcernStress isConfirming={isConfirming} />}
            {questionId === 'q8' && previewId === 'D' && <ConcernDiet isConfirming={isConfirming} />}
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
            {questionId === 'q2' ? (
              <Q2IdleWeatherScene />
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 45%, rgba(220,210,225,0.5) 0%, rgba(240,235,245,0.3) 50%, rgba(250,248,252,0.1) 100%)',
                  }}
                />
                <motion.div
                  className="h-20 w-20 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(200,190,215,0.5) 0%, transparent 70%)' }}
                  animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
