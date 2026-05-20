import Link from 'next/link';
import { categories, playlists } from '@/lib/data';

export default function HomePage() {
  const featured = playlists.slice(0, 6);

  return (
    <main className="social-shell">
      <aside className="left-rail">
        <div className="rail-card">
          <div className="rail-title">Explore</div>
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="rail-link">
              <span className="rail-icon">{category.icon.slice(0, 1)}</span>
              <span>{category.name.replace(' and ', ' & ')}</span>
            </Link>
          ))}
        </div>
      </aside>

      <section className="feed">
        <div className="stories">
          <Link href="/categories/survival" className="story"><small>Trending</small><strong>Survival Skills</strong></Link>
          <Link href="/categories/relaxing-music" className="story"><small>Relax</small><strong>Focus Music</strong></Link>
          <Link href="/categories/motivation" className="story"><small>Daily Push</small><strong>Motivation</strong></Link>
          <Link href="/categories/things-to-learn" className="story"><small>Learn Fast</small><strong>AI Tutorials</strong></Link>
        </div>

        <section className="feed-card hero-feed">
          <h1>Watch smarter. Search less. Learn faster.</h1>
          <p>
            A social-style discovery hub for license-safe curated playlists. Users open a topic, choose a clean list,
            and start watching without falling into random search results.
          </p>
          <div className="feed-actions">
            <Link href="/admin/discovery" className="btn btn-primary">View Discovery Queue</Link>
            <Link href="/admin/settings" className="btn btn-secondary">Auto Search Settings</Link>
          </div>
        </section>

        <div className="feed-section-head">
          <div>
            <h2>Recommended playlists</h2>
            <p>Video-style cards, curated categories, and ready-to-watch topics.</p>
          </div>
          <span className="pill pill-green">Auto-discovery every 30 mins</span>
        </div>

        <div className="video-grid">
          {featured.map((playlist) => {
            const category = categories.find((item) => item.id === playlist.categoryId);
            return (
              <Link key={playlist.id} href={`/playlists/${playlist.slug}`} className="feed-card video-tile">
                <div className="thumb"><span>{category?.icon}</span></div>
                <div className="tile-body">
                  <div className="tile-meta">{playlist.mood} • {playlist.estimatedWatchTime}</div>
                  <h3>{playlist.title}</h3>
                  <p>{playlist.description}</p>
                  <div className="tile-tags">
                    <span className="chip">{playlist.difficulty}</span>
                    <span className="chip">{category?.name}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <aside className="right-rail">
        <div className="side-card">
          <h3>Platform status</h3>
          <div className="metric-row">
            <div className="metric-box"><strong>30m</strong><span>Refresh</span></div>
            <div className="metric-box"><strong>{categories.length}</strong><span>Categories</span></div>
            <div className="metric-box"><strong>{playlists.length}</strong><span>Playlists</span></div>
            <div className="metric-box"><strong>CC</strong><span>Safe mode</span></div>
          </div>
        </div>
        <div className="side-card">
          <h3>What makes this better</h3>
          <div className="side-list">
            <div className="side-item"><span className="side-dot">1</span><div><strong>Clean lists</strong><span>No deep searching</span></div></div>
            <div className="side-item"><span className="side-dot">2</span><div><strong>License filter</strong><span>Creative Commons direction</span></div></div>
            <div className="side-item"><span className="side-dot">3</span><div><strong>Admin review</strong><span>Quality before publish</span></div></div>
          </div>
        </div>
      </aside>
    </main>
  );
}
