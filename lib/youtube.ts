import { DiscoveryResult } from './types';
import { calculateVideoQuality, getQueueStatus, isUsableTitle } from './video-quality';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export async function searchCreativeCommonsVideos(keyword: string): Promise<DiscoveryResult[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return mockDiscoveryResults(keyword);
  }

  const searchUrl = new URL(`${YOUTUBE_API_BASE}/search`);
  searchUrl.searchParams.set('key', apiKey);
  searchUrl.searchParams.set('part', 'snippet');
  searchUrl.searchParams.set('q', keyword);
  searchUrl.searchParams.set('type', 'video');
  searchUrl.searchParams.set('videoLicense', 'creativeCommon');
  searchUrl.searchParams.set('videoEmbeddable', 'true');
  searchUrl.searchParams.set('safeSearch', 'moderate');
  searchUrl.searchParams.set('order', 'relevance');
  searchUrl.searchParams.set('maxResults', '25');

  const searchResponse = await fetch(searchUrl.toString(), { next: { revalidate: 0 } });
  if (!searchResponse.ok) {
    throw new Error(`YouTube search failed: ${searchResponse.status}`);
  }

  const searchData = await searchResponse.json();
  const videoIds = (searchData.items ?? []).map((item: any) => item.id?.videoId).filter(Boolean).join(',');

  if (!videoIds) return [];

  const verifyUrl = new URL(`${YOUTUBE_API_BASE}/videos`);
  verifyUrl.searchParams.set('key', apiKey);
  verifyUrl.searchParams.set('part', 'snippet,status,contentDetails');
  verifyUrl.searchParams.set('id', videoIds);

  const verifyResponse = await fetch(verifyUrl.toString(), { next: { revalidate: 0 } });
  if (!verifyResponse.ok) {
    throw new Error(`YouTube verification failed: ${verifyResponse.status}`);
  }

  const verifyData = await verifyResponse.json();

  return (verifyData.items ?? []).map((item: any) => {
    const licenseVerified = item.status?.license === 'creativeCommon';
    const embeddable = item.status?.embeddable === true;
    const title = item.snippet?.title ?? 'Untitled video';
    const thumbnailUrl = item.snippet?.thumbnails?.high?.url ?? item.snippet?.thumbnails?.default?.url ?? '';
    const quality = licenseVerified && embeddable && isUsableTitle(title) ? calculateVideoQuality() : 50;

    return {
      youtubeVideoId: item.id,
      title,
      channelTitle: item.snippet?.channelTitle ?? 'Unknown creator',
      sourceUrl: `https://www.youtube.com/watch?v=${item.id}`,
      thumbnailUrl,
      licenseType: item.status?.license ?? 'unknown',
      embeddable,
      safetyScore: quality,
      status: getQueueStatus(quality) as DiscoveryResult['status'],
      reason: licenseVerified && embeddable ? 'License verified and embeddable.' : 'Rejected due to license or embed status.'
    };
  });
}

function mockDiscoveryResults(keyword: string): DiscoveryResult[] {
  return [
    {
      youtubeVideoId: 'mock-video-001',
      title: `Mock Creative Commons result for ${keyword}`,
      channelTitle: 'License Safe Demo Channel',
      sourceUrl: 'https://www.youtube.com/watch?v=mock-video-001',
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      licenseType: 'creativeCommon',
      embeddable: true,
      safetyScore: 92,
      status: 'approved',
      reason: 'Mock result. Add YOUTUBE_API_KEY to search real videos.'
    },
    {
      youtubeVideoId: 'mock-video-002',
      title: `Review queue example for ${keyword}`,
      channelTitle: 'Curated Learning Demo',
      sourceUrl: 'https://www.youtube.com/watch?v=mock-video-002',
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      licenseType: 'creativeCommon',
      embeddable: true,
      safetyScore: 78,
      status: 'queued',
      reason: 'Mock result. Good enough for review but not auto-approved.'
    }
  ];
}
