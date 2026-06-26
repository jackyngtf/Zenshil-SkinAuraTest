'use client';

import { useEffect, useRef, useState } from 'react';

export type RarityData = {
  userNumber: number;
  total: number;
  rarity: string;
  auraCount: number;
};

type RarityState = {
  data: RarityData | null;
  loading: boolean;
};

const POSTED_FLAG_KEY = 'zenshil-rarity-posted';

/**
 * On mount, if the user just completed the quiz (not yet recorded), POST the
 * result to the server counter and return the live rarity + the user's number
 * ("you are #N to take this test").
 *
 * Idempotent: a localStorage flag prevents double-counting on refresh. The
 * flag is cleared on retake (resetQuiz) by the store.
 *
 * When auraId is null, loading is false and data is null (no setState needed
 * in the effect body, satisfying react-hooks/set-state-in-effect).
 */
export function useQuizRarity(auraId: string | null): RarityState {
  // Derive the idle (no-aura) state from props directly so the effect body
  // never has to call setState synchronously.
  const [data, setData] = useState<RarityData | null>(null);
  const [loading, setLoading] = useState<boolean>(auraId !== null);
  const lastFetched = useRef<string | null>(null);

  useEffect(() => {
    if (!auraId) {
      // Reset to idle if aura clears.
      if (lastFetched.current !== null) {
        lastFetched.current = null;
        setData(null);
        setLoading(false);
      }
      return;
    }

    // Avoid refetching the same aura id.
    if (lastFetched.current === auraId) return;
    lastFetched.current = auraId;
    const id = auraId; // string, narrowed for the async closure

    let cancelled = false;
    setLoading(true);

    async function run() {
      const posted = typeof window !== 'undefined'
        ? localStorage.getItem(POSTED_FLAG_KEY)
        : null;

      try {
        const url = posted ? '/api/quiz/stats' : '/api/quiz/result';
        const res = await fetch(url, {
          method: posted ? 'GET' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: posted ? undefined : JSON.stringify({ auraId: id }),
        });
        if (!res.ok) throw new Error(`stats fetch failed: ${res.status}`);
        const json = await res.json();

        if (!posted && typeof window !== 'undefined') {
          localStorage.setItem(POSTED_FLAG_KEY, id);
        }

        if (cancelled) return;

        if (posted) {
          setData({
            userNumber: json.total,
            total: json.total,
            rarity: json.rarityByAura?.[id] ?? '0%',
            auraCount: json.counts?.[id] ?? 0,
          });
        } else {
          setData(json as RarityData);
        }
      } catch {
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [auraId]);

  return { data, loading };
}
