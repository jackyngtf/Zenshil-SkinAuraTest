'use client';

import Image from 'next/image';

type ShellConcernVariant = 'idle' | 'A' | 'B' | 'C' | 'D';

type ShellConcernStageProps = {
  variant?: ShellConcernVariant;
  isConfirming?: boolean;
};

type ShellConcernState = {
  src: string;
};

const shellConcernStates: Record<ShellConcernVariant, ShellConcernState> = {
  idle: {
    src: '/assets/quiz/q07/q7-idle-closed-shell.png',
  },
  A: {
    src: '/assets/quiz/q07/q7-a-dull-fatigue.png',
  },
  B: {
    src: '/assets/quiz/q07/q7-b-loss-firmness.png',
  },
  C: {
    src: '/assets/quiz/q07/q7-c-sensitive-flare.png',
  },
  D: {
    src: '/assets/quiz/q07/q7-d-lack-radiance.png',
  },
};

export default function ShellConcernStage({
  variant = 'idle',
  isConfirming = false,
}: ShellConcernStageProps) {
  const state = shellConcernStates[variant] ?? shellConcernStates.idle;

  return (
    <div className="absolute inset-0 overflow-hidden rounded-full bg-transparent">
      <div
        key={variant}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 select-none"
        style={{
          height: '109%',
          width: '109%',
          transform: 'translate(-50%, -51%)',
        }}
      >
        <Image
          src={state.src}
          alt=""
          fill
          draggable={false}
          sizes="370px"
          className="select-none object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-80"
        style={{
          background:
            'conic-gradient(from 140deg, rgba(255,255,255,0.92), rgba(190,218,211,0.72), rgba(244,211,225,0.62), rgba(235,218,178,0.68), rgba(255,255,255,0.92))',
          WebkitMask:
            'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
          mask:
            'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
        }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-full border border-white/55 shadow-[inset_0_0_0_1px_rgba(156,178,168,0.16)]" />
      {isConfirming && <div className="pointer-events-none absolute inset-[1px] rounded-full border border-white/80" />}
    </div>
  );
}
