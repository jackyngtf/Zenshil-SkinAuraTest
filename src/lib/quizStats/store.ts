import { promises as fs } from 'fs';
import path from 'path';

/**
 * File-based cross-user quiz result counter.
 *
 * Stores a single JSON file on the server filesystem at `.data/quiz-stats.json`.
 * Each aura id maps to its cumulative completion count, plus a `total` counter
 * and a `lastUserNumber` so a freshly-completed user can be told "you are #N".
 *
 * This is intentionally simple (no DB). It works on any host with a writable
 * filesystem (Vercel functions would need a real DB or KV; this suits a
 * long-lived Node server / Docker / VPS / self-hosted setup).
 */

export type QuizStats = {
  /** Cumulative count per aura id (the 8 ids). */
  counts: Record<string, number>;
  /** Total completions across all auras. */
  total: number;
  /** Monotonic user counter; the next user is total + 1. */
  lastUserNumber: number;
};

const VALID_AURA_IDS = [
  'overworked',
  'stress',
  'hidden_aging',
  'recovery',
  'preventive',
  'glow',
  'burnout',
  'late_night',
];

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'quiz-stats.json');

const EMPTY: QuizStats = {
  counts: Object.fromEntries(VALID_AURA_IDS.map((id) => [id, 0])),
  total: 0,
  lastUserNumber: 0,
};

async function ensureFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(EMPTY, null, 2), 'utf-8');
  }
}

export async function readStats(): Promise<QuizStats> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  try {
    const parsed = JSON.parse(raw) as Partial<QuizStats>;
    // Merge with defaults so newly-added aura ids don't break old files.
    return {
      counts: { ...EMPTY.counts, ...parsed.counts },
      total: parsed.total ?? 0,
      lastUserNumber: parsed.lastUserNumber ?? 0,
    };
  } catch {
    return { ...EMPTY };
  }
}

/**
 * Atomically increment an aura's count and the totals, returning the stats
 * AFTER the increment plus the user number assigned to this completion.
 *
 * Uses a write-then-read with an in-process mutex so concurrent requests on
 * the same server instance don't corrupt the file.
 */
let writeChain: Promise<unknown> = Promise.resolve();

export async function recordResult(auraId: string): Promise<{
  stats: QuizStats;
  userNumber: number;
}> {
  if (!VALID_AURA_IDS.includes(auraId)) {
    throw new Error(`Unknown aura id: ${auraId}`);
  }

  const result = await (writeChain = writeChain.then(async () => {
    const stats = await readStats();
    stats.counts[auraId] = (stats.counts[auraId] ?? 0) + 1;
    stats.total += 1;
    stats.lastUserNumber += 1;
    await fs.writeFile(DATA_FILE, JSON.stringify(stats, null, 2), 'utf-8');
    return { stats, userNumber: stats.lastUserNumber };
  }));

  return result as { stats: QuizStats; userNumber: number };
}

/** Rarity of an aura = its count / total, as a percentage string like "18%". */
export function rarityPercent(count: number, total: number): string {
  if (total <= 0) return '0%';
  // Rare = how uncommon this aura is. Show the aura's share rounded to whole %.
  const pct = Math.round((count / total) * 100);
  return `${pct}%`;
}
