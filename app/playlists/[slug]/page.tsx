import { getPlaylistBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function PlaylistPage({ params }: { params: { slug: string } }) {
  const playlist = getPlaylistBySlug(params.slug);
  if (!playlist) notFound();

  return (
    <main style={{ maxWidth: 1120, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 44 }}>{playlist.title}</h1>
      <p style={{ color: '#475569', fontSize: 18 }}>{playlist.description}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
        <span style={{ background: '#e0f2fe', color: '#075985', padding: '8px 12px', borderRadius: 999, fontWeight: 700 }}>{playlist.mood}</span>
        <span style={{ background: '#dcfce7', color: '#166534', padding: '8px 12px', borderRadius: 999, fontWeight: 700 }}>{playlist.difficulty}</span>
        <span style={{ background: '#fef3c7', color: '#92400e', padding: '8px 12px', borderRadius: 999, fontWeight: 700 }}>{playlist.estimatedWatchTime}</span>
      </div>
      <section style={{ marginTop: 24, background: 'white', border: '1px solid #e2e8f0', borderRadius: 18, padding: 20 }}>
        <h2>Best for</h2>
        <p>{playlist.bestFor}</p>
        <h2>Goal</h2>
        <p>{playlist.goal}</p>
      </section>
      <section style={{ marginTop: 24, display: 'grid', gap: 20 }}>
        {playlist.videos.map((video, index) => (
          <article key={video.youtubeVideoId} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 18, padding: 20 }}>
            <h2>{index + 1}. {video.title}</h2>
            <div style={{ aspectRatio: '16 / 9', width: '100%', background: '#020617', borderRadius: 14, overflow: 'hidden' }}>
              <iframe src={`https://www.youtube.com/embed/${video.youtubeVideoId}`} title={video.title} style={{ width: '100%', height: '100%', border: 0 }} allowFullScreen />
            </div>
            <p style={{ color: '#475569' }}>{video.summary}</p>
            <p>{video.learningNotes}</p>
            <div style={{ marginTop: 12, background: '#f8fafc', padding: 12, borderRadius: 12, fontSize: 14 }}>
              <div>Video: {video.title}</div>
              <div>Creator: {video.channelTitle}</div>
              <div>Source: <a href={video.sourceUrl}>{video.sourceUrl}</a></div>
              <div>License: {video.licenseType}</div>
              <div>Verified: {new Date(video.licenseVerifiedAt).toLocaleDateString()}</div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
