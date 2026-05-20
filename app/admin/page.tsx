import Link from 'next/link';
import { categories, playlists } from '@/lib/data';

export default function AdminPage() {
  return (
    <main style={{ maxWidth: 1120, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 42 }}>Admin Dashboard</h1>
      <p style={{ color: '#475569' }}>Control auto-discovery, review videos, and manage curated playlists.</p>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 18 }}><div style={{ fontSize: 32, fontWeight: 800 }}>30 min</div><p>Auto-discovery interval</p></div>
        <div style={{ background: 'white', padding: 20, borderRadius: 18 }}><div style={{ fontSize: 32, fontWeight: 800 }}>{categories.length}</div><p>Active categories</p></div>
        <div style={{ background: 'white', padding: 20, borderRadius: 18 }}><div style={{ fontSize: 32, fontWeight: 800 }}>{playlists.length}</div><p>Starter playlists</p></div>
      </div>
      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <Link href="/admin/discovery" style={{ background: 'white', border: '1px solid #e2e8f0', padding: 20, borderRadius: 18 }}><h2>Discovery Queue</h2><p>Review new license-safe videos discovered by automatic search.</p></Link>
        <Link href="/admin/settings" style={{ background: 'white', border: '1px solid #e2e8f0', padding: 20, borderRadius: 18 }}><h2>Settings</h2><p>Control cron interval, auto-publish, scoring threshold, and license strictness.</p></Link>
      </div>
    </main>
  );
}
