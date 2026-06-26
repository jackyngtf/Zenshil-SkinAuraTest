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

/** Per-device record of "you are #N, aura X". Cleared on retake. */
type RaritySession = {
  userNumber: number;
  auraId: string;
};

const SESSION_KEY = 'zenshil-rarity-session';

function readSession(): RaritySession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as RaritySession) : null;
  } catch {
    return null;
  }
}

function writeSession(session: RaritySession | null) {
  if (typeof window === 'undefined') return;
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

/**
 * Rarity tracking per the spec:
 * - The client device stores { userNumber, auraId } after completing the quiz.
 * - On mount, if a session exists, show it (no re-record).
 * - If no session but an auraId is present, POST to record and store the session.
 * - On retake: call clearRaritySession() which DELETEs the old aura from the
 *   server counter and clears the local session, so the next completion records
 *   fresh.
 */
export function useQuizRarity(auraId: string | null): RarityState {
  const [data, setData] = useState<RarityData | null>(null);
  const [loading, setLoading] = useState(false);
  const lastFetched = useRef<string | null>(null);

  useEffect(() => {
    if (!auraId) {
      if (lastFetched.current !== null) {
        lastFetched.current = null;
        setData(null);
        setLoading(false);
      }
      return;
    }

    if (lastFetched.current === auraId) return;
    lastFetched.current = auraId;
    const id = auraId; // string, narrowed for the async closure

    let cancelled = false;
    setLoading(true);

    async function run() {
      const session = readSession();

      // Already recorded for this aura (or a previous one) on this device:
      // show the stored number, but read live rarity from stats.
      try {
        if (session) {
          const res = await fetch('/api/quiz/stats');
          const json = await res.json();
          if (cancelled) return;
          setData({
            userNumber: session.userNumber,
            total: json.total,
            rarity: json.rarityByAura?.[session.auraId] ?? '0%',
            auraCount: json.counts?.[session.auraId] ?? 0,
          });
          setLoading(false);
          return;
        }

        // No session: record this completion fresh.
        const res = await fetch('/api/quiz/result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ auraId: id }),
        });
        if (!res.ok) throw new Error(`record failed: ${res.status}`);
        const json = (await res.json()) as RarityData;
        if (cancelled) return;
        writeSession({ userNumber: json.userNumber, auraId: id });
        setData(json);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setData(null);
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [auraId]);

  return { data, loading };
}

/**
 * Retake flow: tell the server to stop counting the old result, then clear
 * the local session so the next completion records fresh. Fire-and-forget.
 */
export async function clearRaritySession() {
  const session = readSession();
  if (session) {
    try {
      await fetch('/api/quiz/result', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auraId: session.auraId }),
      });
    } catch {
      // best-effort; if the server is unreachable the local session still clears
    }
  }
  writeSession(null);
}
