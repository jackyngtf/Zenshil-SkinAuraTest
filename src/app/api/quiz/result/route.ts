import { NextRequest, NextResponse } from 'next/server';
import { recordResult, rarityPercent } from '@/lib/quizStats/store';

/**
 * POST /api/quiz/result
 * Body: { auraId: string }
 * Records a completed quiz and returns the rarity + the user's position.
 *
 * Idempotency note: this is a fire-and-forget counter. To avoid double-counting
 * from refreshes, the client gates the call on a localStorage flag set right
 * before the fetch.
 */
export async function POST(request: NextRequest) {
  let auraId: string;
  try {
    const body = await request.json();
    auraId = body.auraId;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!auraId || typeof auraId !== 'string') {
    return NextResponse.json({ error: 'auraId is required' }, { status: 400 });
  }

  try {
    const { stats, userNumber } = await recordResult(auraId);
    const rarity = rarityPercent(stats.counts[auraId] ?? 0, stats.total);
    return NextResponse.json({
      userNumber,
      total: stats.total,
      rarity,
      auraCount: stats.counts[auraId] ?? 0,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
