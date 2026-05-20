import { categories } from '@/lib/data';
import { searchCreativeCommonsVideos } from '@/lib/youtube';

export default async function DiscoveryPage() {
  const firstCategory = categories[0];
  const results = await searchCreativeCommonsVideos(firstCategory.keywords[0]);

  return (
    <main style={{ maxWidth: 1120, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 42 }}>Discovery Queue</h1>
          <p style={{ color: '#475569' }}>New Creative Commons embeddable videos found by the app.</p>
        </div>
        <form action="/api/cron/discover" method="GET">
          <button style={{ background: '#0f172a', color: 'white', padding: '12px 18px', borderRadius: 999, border: 0, fontWeight: 700 }}>Run Discovery Check</button>
        </form>
      </div>
      <div style={{ marginTop: 18, background: '#fef3c7', color: '#92400e', padding: 16, borderRadius: 16 }}>Auto-publish is off by default. New videos should go to admin review first until the system is stable.</div>
      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        {results.map((video) => (
          <div key={video.youtubeVideoId} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16 }}>
            <h2>{video.title}</h2>
            <p style={{ color: '#475569' }}>{video.channelTitle}</p>
            <p>License: {video.licenseType}</p>
            <p>Score: {video.safetyScore}/100</p>
            <p>Status: {video.status}</p>
            <p>{video.reason}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
