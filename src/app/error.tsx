'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80dvh] w-full flex-col items-center justify-center px-6 text-center">
      <div className="max-w-sm">
        <p className="mb-3 font-serif text-[13px] uppercase tracking-[0.22em] text-stone-400">
          Zenshil
        </p>
        <h1 className="mb-3 font-serif text-[22px] leading-snug text-stone-800">
          Something went wrong
        </h1>
        <p className="mb-8 font-sans text-[14px] leading-relaxed text-stone-500">
          Please try again. If the problem persists, refresh the page.
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-stone-800 px-7 py-3 font-sans text-[13px] tracking-wide text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
