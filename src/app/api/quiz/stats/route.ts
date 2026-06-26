import { NextResponse } from 'next/server';
import { readStats, rarityPercent } from '@/lib/quizStats/store';

/**
 * GET /api/quiz/stats
 * Returns current cumulative stats (no increment). Used to show live rarity
 * without recording a new completion.
 */
export async function GET() {
  const stats = await readStats();
  const rarityByAura = Object.fromEntries(
    Object.entries(stats.counts).map(([id, count]) => [
      id,
      rarityPercent(count, stats.total),
    ]),
  );
  return NextResponse.json({
    total: stats.total,
    counts: stats.counts,
    rarityByAura,
  });
}
