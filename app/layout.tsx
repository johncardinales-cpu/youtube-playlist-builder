import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'YouTube Playlist Builder',
  description: 'Ready-made license-safe video playlists for learning, relaxing, laughing, and motivation.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: '1px solid #e2e8f0', background: 'white' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontWeight: 800 }}>Playlist Builder</Link>
            <nav style={{ display: 'flex', gap: 16, fontSize: 14 }}>
              <Link href="/admin">Admin</Link>
              <Link href="/admin/discovery">Discovery</Link>
              <Link href="/admin/settings">Settings</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
