import { NextResponse } from 'next/server';
import { searchCreativeCommonsVideos } from '@/lib/youtube';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('q') ?? 'jungle survival basics';
  const results = await searchCreativeCommonsVideos(keyword);

  return NextResponse.json({
    keyword,
    mode: process.env.YOUTUBE_API_KEY ? 'live-youtube-api' : 'mock-data',
    results
  });
}
