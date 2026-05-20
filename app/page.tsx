import { categories, playlists } from '@/lib/data';
import { DiscoveryHub } from './components/discovery-hub';

type HomePageProps = {
  searchParams?: Promise<{
    q?: string | string[];
    category?: string | string[];
  }>;
};

function getSingleParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const query = getSingleParam(params?.q)?.trim() ?? '';
  const activeCategorySlug = getSingleParam(params?.category) ?? '';

  return (
    <main className="home-shell">
      <DiscoveryHub
        activeCategorySlug={activeCategorySlug}
        categories={categories}
        playlists={playlists}
        query={query}
      />
    </main>
  );
}
