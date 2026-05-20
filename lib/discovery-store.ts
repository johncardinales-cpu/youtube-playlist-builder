import type { DiscoveryResult } from './types';
import { getSupabaseAdminClient, hasSupabaseConfig } from './supabase-server';

type VideoRow = {
  id: string;
  youtube_video_id: string;
  title: string;
  channel_title: string | null;
  source_url: string;
  thumbnail_url: string | null;
  license_type: string;
  license_verified_at: string | null;
  embeddable: boolean;
  attribution_text: string | null;
  safety_score: number;
  summary: string | null;
  discovered_at: string | null;
  approved_at: string | null;
  rejected_at: string | null;
};

export type StoredDiscoveryVideo = {
  id: string;
  youtubeVideoId: string;
  title: string;
  channelTitle: string;
  sourceUrl: string;
  thumbnailUrl: string;
  licenseType: string;
  licenseVerifiedAt: string;
  embeddable: boolean;
  attributionText: string;
  safetyScore: number;
  status: DiscoveryResult['status'];
  reason: string;
  discoveredAt: string;
};

export async function saveDiscoveryResults(keyword: string, results: DiscoveryResult[]) {
  if (!hasSupabaseConfig()) {
    return { enabled: false, saved: 0, error: '' };
  }

  if (!process.env.YOUTUBE_API_KEY) {
    return {
      enabled: true,
      saved: 0,
      error: 'YOUTUBE_API_KEY is missing, so mock discovery results were not saved.'
    };
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return { enabled: false, saved: 0, error: '' };
  }

  const now = new Date().toISOString();
  const rows = results.map((result) => ({
    youtube_video_id: result.youtubeVideoId,
    title: result.title,
    channel_title: result.channelTitle,
    source_url: result.sourceUrl,
    thumbnail_url: result.thumbnailUrl,
    license_type: result.licenseType,
    license_verified_at: result.licenseType === 'creativeCommon' ? now : null,
    embeddable: result.embeddable,
    attribution_text: `Video: ${result.title} | Creator: ${result.channelTitle} | License: Creative Commons Attribution`,
    safety_score: result.safetyScore,
    summary: result.reason,
    discovered_at: now
  }));

  const { error: videoError } = rows.length
    ? await supabase.from('videos').upsert(rows, { onConflict: 'youtube_video_id' })
    : { error: null };

  if (videoError) {
    return { enabled: true, saved: 0, error: videoError.message };
  }

  const { error: runError } = await supabase.from('video_discovery_runs').insert({
    status: 'completed',
    started_at: now,
    completed_at: new Date().toISOString(),
    keywords: [keyword],
    total_found: results.length,
    total_verified: results.filter((result) => result.licenseType === 'creativeCommon' && result.embeddable).length,
    total_rejected: results.filter((result) => result.status === 'rejected').length,
    total_queued: results.filter((result) => result.status !== 'rejected').length
  });

  return {
    enabled: true,
    saved: rows.length,
    error: runError?.message ?? ''
  };
}

export async function getStoredDiscoveryVideos(limit = 30) {
  if (!hasSupabaseConfig()) {
    return { enabled: false, error: '', videos: [] as StoredDiscoveryVideo[] };
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return { enabled: false, error: '', videos: [] as StoredDiscoveryVideo[] };
  }

  const { data, error } = await supabase
    .from('videos')
    .select('id,youtube_video_id,title,channel_title,source_url,thumbnail_url,license_type,license_verified_at,embeddable,attribution_text,safety_score,summary,discovered_at,approved_at,rejected_at')
    .order('discovered_at', { ascending: false })
    .limit(limit);

  if (error) {
    return { enabled: true, error: error.message, videos: [] as StoredDiscoveryVideo[] };
  }

  return {
    enabled: true,
    error: '',
    videos: ((data ?? []) as VideoRow[]).map(mapVideoRow)
  };
}

function mapVideoRow(row: VideoRow): StoredDiscoveryVideo {
  return {
    id: row.id,
    youtubeVideoId: row.youtube_video_id,
    title: row.title,
    channelTitle: row.channel_title ?? 'Unknown creator',
    sourceUrl: row.source_url,
    thumbnailUrl: row.thumbnail_url ?? '',
    licenseType: row.license_type,
    licenseVerifiedAt: row.license_verified_at ?? '',
    embeddable: row.embeddable,
    attributionText: row.attribution_text ?? '',
    safetyScore: row.safety_score,
    status: getStoredStatus(row),
    reason: row.summary ?? 'Saved from Creative Commons discovery.',
    discoveredAt: row.discovered_at ?? ''
  };
}

function getStoredStatus(row: VideoRow): DiscoveryResult['status'] {
  if (row.rejected_at) return 'rejected';
  if (row.approved_at) return 'approved';
  return 'queued';
}
