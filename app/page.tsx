import Link from 'next/link';
import { categories, playlists } from '@/lib/data';

export default function HomePage() {
  return (
    <main className="shell page">
      <section className="hero">
        <span className="hero-kicker">License-safe curated playlists</span>
        <h1>Learn, relax, laugh, and stay inspired in one clean experience.</h1>
        <p>
          A more polished way to browse videos. Inspired by the familiarity of YouTube, Instagram, and Facebook,
          but cleaner, faster, and curated for useful playlists people can open right away.
        </p>
        <div className="hero-actions">
          <Link href="/admin/discovery" className="btn btn-primary">View Discovery Queue</Link>
          <Link href="/admin/settings" className="btn btn-secondary">Auto Search Settings</Link>
        </div>
      </section>

      <section className="metrics">
        <div className="metric-card"><div className="metric-value">30 min</div><div className="metric-label">Auto discovery refresh</div></div>
        <div className="metric-card"><div className="metric-value">{categories.length}</div><div className="metric-label">Curated categories</div></div>
        <div className="metric-card"><div className="metric-value">{playlists.length}</div><div className="metric-label">Starter playlists</div></div>
        <div className="metric-card"><div className="metric-value">CC only</div><div className="metric-label">License-safe direction</div></div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">Browse by category</h2>
            <p className="section-copy">Less clutter, less noise, and more useful video collections.</p>
          </div>
          <span className="pill pill-success">Auto-discovery every 30 mins</span>
        </div>

        <div className="grid cards">
          {categories.map((category) => {
            const count = playlists.filter((playlist) => playlist.categoryId === category.id).length;
            return (
              <Link key={category.id} href={`/categories/${category.slug}`} className="card">
                <div className="card-topline">{count} starter playlists</div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="card-tags">
                  {category.keywords.slice(0, 2).map((keyword) => <span key={keyword} className="chip">{keyword}</span>)}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <p className="footer-note">Professional curated discovery experience with room for real YouTube API, AI summaries, and monetization later.</p>
    </main>
  );
}
