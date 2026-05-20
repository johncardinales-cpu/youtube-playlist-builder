import { NextResponse } from 'next/server';
import { categories } from '@/lib/data';
import { searchCreativeCommonsVideos } from '@/lib/youtube';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
  }

  const startedAt = new Date().toISOString();
  const discoveryResults = [];

  for (const category of categories) {
    for (const keyword of category.keywords.slice(0, 2)) {
      const results = await searchCreativeCommonsVideos(keyword);
      discoveryResults.push({
        category: category.name,
        keyword,
        totalFound: results.length,
        queued: results.filter((result) => result.status === 'queued').length,
        approved: results.filter((result) => result.status === 'approved').length,
        rejected: results.filter((result) => result.status === 'rejected').length,
        results
      });
    }
  }

  return NextResponse.json({
    status: 'completed',
    startedAt,
    completedAt: new Date().toISOString(),
    note: 'In production, save these results into Supabase discovery tables and admin review queue.',
    discoveryResults
  });
}
