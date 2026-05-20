import Link from 'next/link';
import { categories, playlists } from '@/lib/data';

export default function AdminPage() {
  return (
    <main className="shell page">
      <section className="hero" style={{ paddingBottom: 34 }}>
        <span className="hero-kicker">Admin workspace</span>
        <h1 style={{ maxWidth: 720 }}>Manage discovery, playlist quality, and review flow with a cleaner dashboard.</h1>
        <p>Professional control center for your content system before connecting the live YouTube API and database.</p>
      </section>

      <section className="stats-grid" style={{ marginTop: 24 }}>
        <div className="stat-box"><div className="big">30 min</div><div className="small">Auto-discovery interval</div></div>
        <div className="stat-box"><div className="big">{categories.length}</div><div className="small">Active categories</div></div>
        <div className="stat-box"><div className="big">{playlists.length}</div><div className="small">Starter playlists</div></div>
      </section>

      <section className="grid playlists" style={{ marginTop: 22 }}>
        <Link href="/admin/discovery" className="card">
          <div className="card-topline">Discovery</div>
          <h2>Review new videos</h2>
          <p>See queued, approved, and rejected license-safe videos discovered by the app.</p>
        </Link>
        <Link href="/admin/settings" className="card">
          <div className="card-topline">Settings</div>
          <h2>Control your filters</h2>
          <p>Keep the launch safe with strict licensing, manual review, and controlled auto-publish.</p>
        </Link>
      </section>
    </main>
  );
}
