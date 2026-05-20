import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Playlist Builder',
  description: 'A YouTube and Facebook inspired discovery hub for license-safe curated playlists.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="appbar">
          <div className="appbar-inner">
            <Link href="/" className="brand">
              <span className="brand-mark" />
              <span>
                <span className="brand-title">Playlist Builder</span>
                <span className="brand-tag">Watch smarter, search less</span>
              </span>
            </Link>
            <label className="searchbar">
              <span>⌕</span>
              <input placeholder="Search playlists, survival, music, AI tutorials..." />
            </label>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/admin">Admin</Link>
              <Link href="/admin/discovery">Discovery</Link>
              <Link href="/admin/settings" className="cta">Settings</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
