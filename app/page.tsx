import Link from 'next/link';
import { categories, playlists } from '@/lib/data';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1120, margin: '0 auto', padding: 24 }}>
      <section style={{ borderRadius: 24, background: '#0f172a', color: 'white', padding: 40 }}>
        <p style={{ color: '#67e8f9', fontWeight: 700, letterSpacing: 2 }}>LICENSE-SAFE CURATED PLAYLISTS</p>
        <h1 style={{ fontSize: 48, lineHeight: 1.05, maxWidth: 850 }}>Learn, relax, laugh, and get motivated without searching for hours.</h1>
        <p style={{ fontSize: 18, color: '#cbd5e1', maxWidth: 760 }}>The app automatically finds Creative Commons embeddable videos every 30 minutes, verifies the license, scores quality, and prepares playlists for review.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
          <Link href="/admin/discovery" style={{ background: '#22d3ee', color: '#0f172a', padding: '12px 18px', borderRadius: 999, fontWeight: 700 }}>View Discovery Queue</Link>
          <Link href="/admin/settings" style={{ border: '1px solid #94a3b8', padding: '12px 18px', borderRadius: 999, fontWeight: 700 }}>Auto Search Settings</Link>
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'end' }}>
          <div>
            <h2 style={{ fontSize: 28 }}>Browse by category</h2>
            <p style={{ color: '#475569' }}>Simple lists instead of deep YouTube searching.</p>
          </div>
          <span style={{ background: '#dcfce7', color: '#166534', padding: '8px 14px', borderRadius: 999, fontWeight: 700 }}>Auto-discovery every 30 mins</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 20 }}>
          {categories.map((category) => {
            const count = playlists.filter((playlist) => playlist.categoryId === category.id).length;
            return (
              <Link key={category.id} href={`/categories/${category.slug}`} style={{ border: '1px solid #e2e8f0', background: 'white', padding: 20, borderRadius: 18 }}>
                <div style={{ color: '#0e7490', fontWeight: 700 }}>{count} starter playlists</div>
                <h3>{category.name}</h3>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>{category.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
