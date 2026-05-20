import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Playlist Builder',
  description: 'Professional license-safe curated playlists for learning, relaxing, motivation, and safe entertainment.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <div className="shell topbar-inner">
            <Link href="/" className="brand">
              <span className="brand-mark" />
              <span className="brand-copy">
                <span className="brand-title">Playlist Builder</span>
                <span className="brand-tag">Curated like social, filtered like premium</span>
              </span>
            </Link>
            <nav className="nav">
              <Link href="/">Home</Link>
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
