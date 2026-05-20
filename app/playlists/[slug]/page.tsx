import { getPlaylistBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function PlaylistPage({ params }: { params: { slug: string } }) {
  const playlist = getPlaylistBySlug(params.slug);
  if (!playlist) notFound();

  return (
    <main className="shell page">
      <section className="list-panel">
        <h1 className="section-title">{playlist.title}</h1>
        <p className="section-copy" style={{ maxWidth: 820 }}>{playlist.description}</p>
        <div className="meta-row">
          <span className="meta-badge">{playlist.mood}</span>
          <span className="meta-badge">{playlist.difficulty}</span>
          <span className="meta-badge">{playlist.estimatedWatchTime}</span>
        </div>
        <div className="grid cards" style={{ marginTop: 20 }}>
          <div className="card"><div className="card-topline">Best for</div><p>{playlist.bestFor}</p></div>
          <div className="card"><div className="card-topline">Goal</div><p>{playlist.goal}</p></div>
          <div className="card"><div className="card-topline">Format</div><p>Embedded videos, attribution, learning notes, and a cleaner watch order.</p></div>
        </div>
      </section>

      <section style={{ marginTop: 26, display: 'grid', gap: 18 }}>
        {playlist.videos.map((video, index) => (
          <article key={video.youtubeVideoId} className="video-card">
            <h2>{index + 1}. {video.title}</h2>
            <div className="video-frame">
              <iframe src={`https://www.youtube.com/embed/${video.youtubeVideoId}`} title={video.title} allowFullScreen />
            </div>
            <p className="section-copy" style={{ marginTop: 14 }}>{video.summary}</p>
            <p>{video.learningNotes}</p>
            <div className="attribution">
              <div><strong>Video:</strong> {video.title}</div>
              <div><strong>Creator:</strong> {video.channelTitle}</div>
              <div><strong>Source:</strong> <a href={video.sourceUrl}>{video.sourceUrl}</a></div>
              <div><strong>License:</strong> {video.licenseType}</div>
              <div><strong>Verified:</strong> {new Date(video.licenseVerifiedAt).toLocaleDateString()}</div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
