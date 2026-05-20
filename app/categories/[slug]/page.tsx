import Link from 'next/link';
import { getCategoryBySlug, getPlaylistsByCategoryId } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryPlaylists = getPlaylistsByCategoryId(category.id);

  return (
    <main className="shell page">
      <Link href="/" className="inline-back">Back to categories</Link>
      <section className="list-panel">
        <span className="pill pill-soft">{category.icon}</span>
        <h1 className="section-title" style={{ marginTop: 14 }}>{category.name}</h1>
        <p className="section-copy" style={{ maxWidth: 760 }}>{category.description}</p>
        <div className="card-tags">
          {category.keywords.map((keyword) => <span key={keyword} className="chip">{keyword}</span>)}
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <h2 className="section-title">Ready playlists</h2>
            <p className="section-copy">Open a curated playlist instead of searching deeply.</p>
          </div>
          <span className="pill pill-success">{categoryPlaylists.length} playlist{categoryPlaylists.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="grid playlists">
          {categoryPlaylists.map((playlist) => (
            <Link key={playlist.id} href={`/playlists/${playlist.slug}`} className="card">
              <div className="card-topline">{playlist.mood} • {playlist.difficulty}</div>
              <h2>{playlist.title}</h2>
              <p>{playlist.description}</p>
              <div className="card-tags">
                <span className="chip">{playlist.estimatedWatchTime}</span>
                <span className="chip">{playlist.bestFor}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
