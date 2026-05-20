import { categories } from '@/lib/data';
import { searchCreativeCommonsVideos } from '@/lib/youtube';

export default async function DiscoveryPage() {
  const firstCategory = categories[0];
  const results = await searchCreativeCommonsVideos(firstCategory.keywords[0]);

  return (
    <main className="shell page">
      <div className="section-head">
        <div>
          <h1 className="section-title">Discovery Queue</h1>
          <p className="section-copy">New Creative Commons embeddable videos found by the app.</p>
        </div>
        <a href="/api/cron/discover" className="btn btn-primary">Run Discovery Check</a>
      </div>

      <div className="info-banner">Auto-publish is off by default. New videos should go to admin review first until the system is stable.</div>

      <div className="grid" style={{ marginTop: 18 }}>
        {results.map((video) => (
          <div key={video.youtubeVideoId} className="card">
            <div className="card-topline">{video.status.toUpperCase()}</div>
            <h2>{video.title}</h2>
            <p>{video.channelTitle}</p>
            <div className="card-tags">
              <span className="chip">License: {video.licenseType}</span>
              <span className="chip">Score: {video.safetyScore}/100</span>
              <span className="chip">Embeddable: {video.embeddable ? 'Yes' : 'No'}</span>
            </div>
            <p style={{ marginTop: 14 }}>{video.reason}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
