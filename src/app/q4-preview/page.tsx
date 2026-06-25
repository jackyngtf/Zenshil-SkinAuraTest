'use client';

/* ================================================================== */
/*  DEV-ONLY — Q4 (resourceMeter) scenes preview.                      */
/*  Renders all 4 answer scenes (A/B/C/D) stacked in the circular orb  */
/*  so they can be eyeballed side-by-side without playing the quiz,    */
/*  plus a toggle to flip isConfirming (see the confirm surge).         */
/*  Mirrors the /result-preview pattern. Safe to delete this folder.    */
/* ================================================================== */

import { useState } from 'react';
import ResourceMeterVisual, {
  type ResourceMeterOptionId,
} from '@/app/quiz/components/visuals/ResourceMeterVisual';

const OPTIONS: ReadonlyArray<{ id: ResourceMeterOptionId; label: string }> = [
  { id: 'A', label: 'A · 睡眠 Sleep — Moonlit Bedroom' },
  { id: 'B', label: 'B · 放鬆 Relax — Cosy Night Room' },
  { id: 'C', label: 'C · 時間 Time — Cyan Study' },
  { id: 'D', label: 'D · 能量 Energy — Gym Room' },
];

export default function Q4PreviewPage() {
  const [confirming, setConfirming] = useState(false);

  return (
    <main className="min-h-[100dvh] bg-[#0e1419] px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-[16px] tracking-wide text-stone-200">
            Q4 Scenes Preview
          </h1>
          <button
            onClick={() => setConfirming((c) => !c)}
            className="rounded-full bg-stone-200 px-4 py-2 font-sans text-[12px] text-stone-900 transition-opacity hover:opacity-90"
          >
            isConfirming: {confirming ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="rounded-2xl bg-[#151c23] p-4">
            <p className="mb-2 text-center font-sans text-[12px] tracking-wide text-stone-400">
              idle · 未揀 — Soft Room, Held Light
            </p>
            <div className="h-[360px] w-full">
              <ResourceMeterVisual selectedOptionId={null} isConfirming={confirming} />
            </div>
          </div>

          {OPTIONS.map((o) => (
            <div key={o.id} className="rounded-2xl bg-[#151c23] p-4">
              <p className="mb-2 text-center font-sans text-[12px] tracking-wide text-stone-400">
                {o.label}
              </p>
              <div className="h-[360px] w-full">
                <ResourceMeterVisual selectedOptionId={o.id} isConfirming={confirming} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
