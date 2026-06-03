'use client';

export type MirrorFocusOptionId = 'A' | 'B' | 'C' | 'D';

const BASE_IMAGE = '/assets/quiz/q05/q5-mirror-room-base.png';

export default function MirrorFocusVisual({
  selectedOptionId,
  isConfirming,
}: {
  selectedOptionId: MirrorFocusOptionId | null;
  isConfirming: boolean;
}) {
  void selectedOptionId;
  void isConfirming;

  return (
    <div
      className="relative h-full w-full overflow-visible"
      role="img"
      aria-label="premium mirror room skin focus scene"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-stone-50/70 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BASE_IMAGE}
          alt=""
          draggable={false}
          loading="eager"
          decoding="async"
          className="h-full w-full select-none object-cover"
          style={{
            objectPosition: 'center 48%',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, #000 10%, #000 76%, rgba(0,0,0,0.68) 88%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, #000 10%, #000 76%, rgba(0,0,0,0.68) 88%, transparent 100%)',
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-50/10 via-transparent to-stone-50/35" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-stone-50/80 via-stone-50/30 to-transparent" />
    </div>
  );
}
