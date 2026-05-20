import Link from 'next/link';
import { categories, playlists } from '@/lib/data';

export default function HomePage() {
  const featured = playlists.slice(0, 6);

  return (
    <main className="home-shell">
      <div className="topic-row">
        <Link href="/" className="topic-chip">All</Link>
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="topic-chip">{category.name}</Link>
        ))}
      </div>

      <section className="hero-clean">
        <div className="hero-main">
          <small>LICENSE-SAFE PLAYLIST DISCOVERY</small>
          <h1>Find the right playlist faster.</h1>
          <p>
            A cleaner video hub for learning, survival, relaxing music, motivation, funny clips, kids learning,
            and faith content. Less browsing, more watching.
          </p>
          <div className="hero-actions">
            <Link href="/admin/discovery" className="btn btn-primary">View Discovery Queue</Link>
            <Link href="/admin/settings" className="btn btn-secondary">Auto Search Settings</Link>
          </div>
        </div>
        <div className="quick-panel">
          <div className="quick-card"><strong>30 min</strong><span>Auto discovery refresh</span></div>
          <div className="quick-card"><strong>{categories.length}</strong><span>Clean categories</span></div>
          <div className="quick-card"><strong>{playlists.length}</strong><span>Starter playlists</span></div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2>Recommended playlists</h2>
            <p className="section-copy">Simple video cards with clear purpose and category.</p>
          </div>
          <span className="pill pill-green">Auto-discovery every 30 mins</span>
        </div>

        <div className="playlist-grid">
          {featured.map((playlist) => {
            const category = categories.find((item) => item.id === playlist.categoryId);
            return (
              <Link key={playlist.id} href={`/playlists/${playlist.slug}`} className="playlist-card">
                <div className="thumb" />
                <div className="card-body">
                  <div className="card-meta">{playlist.mood} • {playlist.estimatedWatchTime}</div>
                  <h3>{playlist.title}</h3>
                  <p>{playlist.description}</p>
                  <div className="chip-row">
                    <span className="chip">{playlist.difficulty}</span>
                    <span className="chip">{category?.name}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
