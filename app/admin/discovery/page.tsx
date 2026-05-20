import { approveDiscoveryVideo, rejectDiscoveryVideo } from './actions';
import { categories } from '@/lib/data';
import { getStoredDiscoveryVideos } from '@/lib/discovery-store';
import type { DiscoveryResult } from '@/lib/types';
import { searchCreativeCommonsVideos } from '@/lib/youtube';

export const dynamic = 'force-dynamic';

type DiscoveryCardVideo = DiscoveryResult & {
  id?: string;
  discoveredAt?: string;
};

export default async function DiscoveryPage() {
  const stored = await getStoredDiscoveryVideos();
  const firstCategory = categories[0];
  const fallbackResults = stored.enabled ? [] : await searchCreativeCommonsVideos(firstCategory.keywords[0]);
  const videos: DiscoveryCardVideo[] = stored.enabled ? stored.videos : fallbackResults;

  return (
    <main className="shell page">
      <div className="section-head">
        <div>
          <h1 className="section-title">Discovery Queue</h1>
          <p className="section-copy">Review Creative Commons, embeddable videos before they become playlist content.</p>
        </div>
        <a href="/api/cron/discover" className="btn btn-primary">Run Discovery Check</a>
      </div>

      <div className="info-banner">
        {stored.enabled
          ? 'Supabase queue is connected. Cron runs can save videos here for approval or rejection.'
          : 'Supabase is not connected yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to turn this into a saved review queue.'}
      </div>

      {stored.error ? <div className="info-banner error-banner">Supabase error: {stored.error}</div> : null}

      <div className="grid" style={{ marginTop: 18 }}>
        {videos.map((video) => (
          <div key={video.youtubeVideoId} className="card review-card">
            <div className="review-card-top">
              <div className="card-topline">{video.status.toUpperCase()}</div>
              {video.discoveredAt ? <span className="small">{new Date(video.discoveredAt).toLocaleString()}</span> : null}
            </div>
            <h2>{video.title}</h2>
            <p>{video.channelTitle}</p>
            <div className="card-tags">
              <span className="chip">License: {video.licenseType}</span>
              <span className="chip">Score: {video.safetyScore}/100</span>
              <span className="chip">Embeddable: {video.embeddable ? 'Yes' : 'No'}</span>
            </div>
            <p style={{ marginTop: 14 }}>{video.reason}</p>
            <div className="admin-actions">
              <a href={video.sourceUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">Open Video</a>
              {stored.enabled && video.id ? (
                <>
                  <form action={approveDiscoveryVideo}>
                    <input type="hidden" name="videoId" value={video.id} />
                    <button type="submit" className="btn btn-primary">Approve</button>
                  </form>
                  <form action={rejectDiscoveryVideo}>
                    <input type="hidden" name="videoId" value={video.id} />
                    <button type="submit" className="btn btn-danger">Reject</button>
                  </form>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
