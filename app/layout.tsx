import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video Lite',
  description: 'A YouTube and Facebook inspired discovery hub for license-safe curated playlists.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="appbar">
          <div className="appbar-inner">
            <Link href="/" className="brand" aria-label="Video Lite home">
              <span className="brand-mark" />
              <span className="brand-title">Video Lite</span>
            </Link>
            <form action="/" method="get" className="searchbar">
              <button type="submit" aria-label="Search">
                <Search size={18} aria-hidden="true" />
              </button>
              <input name="q" placeholder="Search videos, playlists, creators, and topics" />
            </form>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
