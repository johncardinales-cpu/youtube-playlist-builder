import Link from 'next/link';
import { getCategoryBySlug, getPlaylistsByCategoryId } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryPlaylists = getPlaylistsByCategoryId(category.id);

  return (
    <main style={{ maxWidth: 1120, margin: '0 auto', padding: 24 }}>
      <Link href="/" style={{ color: '#0e7490', fontWeight: 700 }}>Back to categories</Link>
      <h1 style={{ fontSize: 44 }}>{category.name}</h1>
      <p style={{ color: '#475569', fontSize: 18, maxWidth: 760 }}>{category.description}</p>
      <section style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {categoryPlaylists.map((playlist) => (
          <Link key={playlist.id} href={`/playlists/${playlist.slug}`} style={{ border: '1px solid #e2e8f0', background: 'white', borderRadius: 18, padding: 20 }}>
            <div style={{ color: '#0e7490', fontWeight: 700 }}>{playlist.mood} • {playlist.difficulty}</div>
            <h2>{playlist.title}</h2>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>{playlist.description}</p>
            <p style={{ fontWeight: 700 }}>Watch time: {playlist.estimatedWatchTime}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
