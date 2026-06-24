'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, AlertTriangle } from 'lucide-react';
import auraProfilesData from '@/data/aura_profiles.json';
import { useQuizStore } from '@/store/useQuizStore';
import {
  createResultShareImage,
  type ShareAuraProfile,
} from '../result/components/shareResultImage';

// ─────────────────────────────────────────────────────────────────────────────
// /result-preview — HIDDEN internal review route (not linked anywhere in the app).
// Renders every aura's 1080×1920 share image as a gallery so Jacky & the client
// can compare all 8 in one place without playing the quiz 8 times.
// The dev server must be running:  npm run dev  →  http://localhost:3000/result-preview
// Safe to delete this whole folder when review is done.
// ─────────────────────────────────────────────────────────────────────────────

type AuraProfile = {
  id: string;
  name: string;
  chineseName: string;
  quote: string;
  quoteEn?: string;
};

const auras = (Object.values(auraProfilesData) as AuraProfile[]);

// How to answer Q1→Q10 to force each aura as the PRIMARY result.
// Verified by solver; ★ questions are the ones that map to that aura.
type PreviewEntry = {
  auraId: string;
  answerKey: string;   // Q1→Q10 option letters
  primaryPct: number;
  secondary: string;
  secondaryPct: number;
};

const previewEntries: PreviewEntry[] = [
  { auraId: 'overworked',   answerKey: 'CAADACADAC', primaryPct: 83, secondary: 'preventive', secondaryPct: 49 },
  { auraId: 'stress',       answerKey: 'CBBCCDCBDC', primaryPct: 81, secondary: 'preventive', secondaryPct: 54 },
  { auraId: 'hidden_aging', answerKey: 'CCDCBDBDBD', primaryPct: 78, secondary: 'preventive', secondaryPct: 54 },
  { auraId: 'recovery',     answerKey: 'ADCCDDDDCB', primaryPct: 83, secondary: 'glow',       secondaryPct: 49 },
  { auraId: 'preventive',   answerKey: 'CDDCADDDDC', primaryPct: 81, secondary: 'glow',       secondaryPct: 54 },
  { auraId: 'glow',         answerKey: 'DDDCADDDDD', primaryPct: 83, secondary: 'preventive', secondaryPct: 51 },
  { auraId: 'burnout',      answerKey: 'BDDBAADCDC', primaryPct: 78, secondary: 'glow',       secondaryPct: 54 },
  { auraId: 'late_night',   answerKey: 'CDDAABDADA', primaryPct: 78, secondary: 'glow',       secondaryPct: 54 },
];

const languageLabels = {
  en: 'EN',
  zh: '中',
} as const;

export default function ResultPreviewPage() {
  const language = useQuizStore((state) => state.language);
  const [blobs, setBlobs] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, 'idle' | 'loading' | 'done' | 'error'>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate all 8 share images on mount (and again if language changes).
  useEffect(() => {
    let cancelled = false;
    const objectUrls: string[] = [];

    async function generateAll() {
      for (const aura of auras) {
        if (cancelled) return;
        setStatus((prev) => ({ ...prev, [aura.id]: 'loading' }));
        try {
          const profile: ShareAuraProfile = {
            id: aura.id,
            name: aura.name,
            chineseName: aura.chineseName,
            quote: aura.quote,
            quoteEn: aura.quoteEn,
          };
          const entry = previewEntries.find((e) => e.auraId === aura.id);
          const blob = await createResultShareImage({
            aura: profile,
            language,
            primaryRawScore: entry ? Math.round((entry.primaryPct / 100) * 10) : 7,
            secondaryAuraId: entry?.secondary,
          });
          if (cancelled) return;
          const url = URL.createObjectURL(blob);
          objectUrls.push(url);
          setBlobs((prev) => ({ ...prev, [aura.id]: url }));
          setStatus((prev) => ({ ...prev, [aura.id]: 'done' }));
        } catch (err) {
          if (cancelled) return;
          setStatus((prev) => ({ ...prev, [aura.id]: 'error' }));
          setErrors((prev) => ({
            ...prev,
            [aura.id]: err instanceof Error ? err.message : 'Failed to generate image.',
          }));
        }
      }
    }

    // Clear previous blobs (revoke old URLs) before regenerating.
    setBlobs((prev) => {
      Object.values(prev).forEach((url) => URL.revokeObjectURL(url));
      return {};
    });
    generateAll();

    return () => {
      cancelled = true;
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [language]);

  function downloadOne(auraId: string) {
    const url = blobs[auraId];
    if (!url) return;
    const aura = auras.find((a) => a.id === auraId)!;
    const slug = aura.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const link = document.createElement('a');
    link.href = url;
    link.download = `zenshil-skin-aura-${slug || 'result'}.jpg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const doneCount = Object.values(status).filter((s) => s === 'done').length;

  return (
    <main className="min-h-[100dvh] bg-[#f8f5ef] text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-stone-200/60 bg-[#f8f5ef]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-stone-500">
              Zenshil · Internal Review
            </p>
            <h1 className="mt-1 font-serif text-xl text-stone-900 sm:text-2xl">
              Skin Aura · Share Image Preview
            </h1>
            <p className="mt-1 text-xs text-stone-500">
              {doneCount}/{auras.length} generated · 1080×1920 (IG Story) · hidden route
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
              Language
            </span>
            <div className="flex overflow-hidden rounded-full border border-stone-300/60 bg-white/60">
              {(['zh', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => useQuizStore.getState().setLanguage(lang)}
                  className={`px-4 py-1.5 text-xs font-medium transition-colors ${
                    language === lang
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {languageLabels[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {previewEntries.map((entry) => {
            const aura = auras.find((a) => a.id === entry.auraId)!;
            const url = blobs[entry.auraId];
            const s = status[entry.auraId] ?? 'idle';
            return (
              <motion.figure
                key={entry.auraId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col overflow-hidden rounded-2xl border border-stone-200/70 bg-white/50 shadow-sm"
              >
                {/* Image area (9:16 aspect ratio to match the share card) */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-stone-100">
                  {s === 'loading' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-400">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span className="text-[10px] uppercase tracking-[0.2em]">Generating…</span>
                    </div>
                  )}
                  {s === 'error' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-stone-500">
                      <AlertTriangle className="h-6 w-6 text-rose-400" />
                      <span className="text-[10px] leading-relaxed">
                        {errors[entry.auraId] ?? 'Failed'}
                      </span>
                    </div>
                  )}
                  {s === 'done' && url && (
                    // blob: URL from a runtime-generated canvas — next/image cannot
                    // optimize this, so a plain <img> is intentional here.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={url}
                      alt={`${aura.name} share card`}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {s === 'done' && (
                    <button
                      type="button"
                      onClick={() => downloadOne(entry.auraId)}
                      className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/65"
                    >
                      <Download className="h-3 w-3" />
                      JPG
                    </button>
                  )}
                </div>

                {/* Caption */}
                <figcaption className="flex flex-col gap-1.5 px-3.5 py-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-serif text-sm text-stone-900">{aura.name}</span>
                    <span className="font-serif text-xs text-stone-400">{aura.chineseName}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-stone-500">
                    <span className="rounded-full bg-stone-900/90 px-2 py-0.5 font-semibold text-white">
                      {entry.primaryPct}%
                    </span>
                    <span className="text-stone-400">·</span>
                    <span>
                      2nd {entry.secondary} {entry.secondaryPct}%
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-stone-400">
                      Answers
                    </span>
                    <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[11px] tracking-[0.18em] text-stone-700">
                      {entry.answerKey}
                    </code>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-[11px] leading-relaxed text-stone-400">
          Answer key shows Q1→Q10 option letters. Tap <span className="font-medium text-stone-600">JPG</span> on
          any card to download the full-resolution share image. This route is not linked from the app —
          safe to delete <code className="rounded bg-stone-100 px-1 font-mono text-stone-600">src/app/result-preview/</code>{' '}
          when review is complete.
        </p>
      </section>
    </main>
  );
}
