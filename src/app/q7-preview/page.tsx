'use client';

/* ================================================================== */
/*  DEV-ONLY — Q7 (emotionStage / shell-concern) scenes preview.       */
/*  Renders the idle + A/B/C/D shell states in the circular orb so     */
/*  they can be eyeballed side-by-side without playing the quiz, plus  */
/*  a toggle to flip isConfirming. Mirrors /q4-preview. Safe to delete.*/
/* ================================================================== */

import { useState } from 'react';
import ShellConcernStage from '@/app/quiz/components/visuals/ShellConcernStage';

const STATES: ReadonlyArray<{ id: 'idle' | 'A' | 'B' | 'C' | 'D'; label: string }> = [
  { id: 'idle', label: 'idle · 未揀 — Generated closed shell + SVG backdrop' },
  { id: 'A', label: 'A · 暗沉疲勞 Dull fatigue — generated shell' },
  { id: 'B', label: 'B · 鬆弛感 Loss of firmness — generated shell' },
  { id: 'C', label: 'C · 不穩定敏感 Sensitive flare-ups — generated shell' },
  { id: 'D', label: 'D · 無光澤 Lack of radiance — generated shell' },
];

export default function Q7PreviewPage() {
  const [confirming, setConfirming] = useState(false);

  return (
    <main className="min-h-[100dvh] bg-[#0e1419] px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-[16px] tracking-wide text-stone-200">
            Q7 Shell Scenes Preview
          </h1>
          <button
            onClick={() => setConfirming((c) => !c)}
            className="rounded-full bg-stone-200 px-4 py-2 font-sans text-[12px] text-stone-900 transition-opacity hover:opacity-90"
          >
            isConfirming: {confirming ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {STATES.map((s) => (
            <div key={s.id} className="rounded-2xl bg-[#151c23] p-4">
              <p className="mb-2 text-center font-sans text-[12px] tracking-wide text-stone-400">
                {s.label}
              </p>
              <div className="mx-auto flex items-center justify-center">
                <div className="skin-aura-orb-clip relative h-[320px] w-[320px]">
                  <ShellConcernStage variant={s.id} isConfirming={confirming} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
