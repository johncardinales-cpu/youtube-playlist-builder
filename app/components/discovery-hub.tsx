'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Category, DiscoveryResult, Playlist } from '@/lib/types';

type DiscoveryHubProps = {
  activeCategorySlug: string;
  categories: Category[];
  playlists: Playlist[];
  query: string;
};

type SearchState = {
  error: string;
  loading: boolean;
  results: DiscoveryResult[];
};

export function DiscoveryHub({ activeCategorySlug, categories, playlists, query }: DiscoveryHubProps) {
  const [searchState, setSearchState] = useState<SearchState>({
    error: '',
    loading: false,
    results: []
  });

  const activeCategory = categories.find((category) => category.slug === activeCategorySlug);
  const filteredPlaylists = useMemo(() => {
    if (!activeCategory) return playlists;
    return playlists.filter((playlist) => playlist.categoryId === activeCategory.id);
  }, [activeCategory, playlists]);

  useEffect(() => {
    if (!query) {
      setSearchState({ error: '', loading: false, results: [] });
      return;
    }

    let isCurrent = true;
    setSearchState({ error: '', loading: true, results: [] });

    async function runSearch() {
      try {
        const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Search failed');

        const data = await response.json();
        if (!isCurrent) return;

        setSearchState({
          error: '',
          loading: false,
          results: data.results ?? []
        });
      } catch {
        if (!isCurrent) return;
        setSearchState({
          error: 'Search is unavailable right now. Try again in a moment.',
          loading: false,
          results: []
        });
      }
    }

    runSearch();

    return () => {
      isCurrent = false;
    };
  }, [query]);

  return (
    <>
      <div className="topic-row" aria-label="Video categories">
        <Link href="/" className={`topic-chip${!activeCategorySlug && !query ? ' is-active' : ''}`}>
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/?category=${category.slug}`}
            className={`topic-chip${activeCategorySlug === category.slug ? ' is-active' : ''}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <section className="hero-clean">
        <small>CREATIVE COMMONS DISCOVERY</small>
        <h1>Watch-ready playlists without the noisy feed.</h1>
        <p>
          A lighter YouTube-style home feed with Facebook-simple discovery: search at the top,
          browse by category, and open curated playlists built from embeddable, license-safe videos.
        </p>
      </section>

      {query ? (
        <SearchResults query={query} searchState={searchState} />
      ) : (
        <PlaylistFeed
          activeCategoryName={activeCategory?.name}
          categories={categories}
          playlists={filteredPlaylists}
        />
      )}
    </>
  );
}

function SearchResults({ query, searchState }: { query: string; searchState: SearchState }) {
  return (
    <section>
      <div className="section-head">
        <h2>Search results for "{query}"</h2>
        <span>Creative Commons and embeddable checks run before results appear</span>
      </div>

      {searchState.loading && <div className="search-empty">Searching license-safe videos...</div>}
      {searchState.error && <div className="search-empty">{searchState.error}</div>}
      {!searchState.loading && !searchState.error && searchState.results.length === 0 && (
        <div className="search-empty">No matching Creative Commons videos found yet.</div>
      )}

      <div className="playlist-grid">
        {searchState.results.map((video) => (
          <a
            key={video.youtubeVideoId}
            href={video.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="playlist-card result-card"
          >
            <div className="thumb">
              {video.thumbnailUrl ? <img src={video.thumbnailUrl} alt={`${video.title} thumbnail`} /> : null}
              <span className="play-button" />
            </div>
            <div className="card-body">
              <div className="card-meta">
                <span>{video.channelTitle}</span>
                <span>{video.status}</span>
              </div>
              <h3>{video.title}</h3>
              <p>{video.reason}</p>
              <div className="video-footer">
                <span>{video.licenseType}</span>
                <span>Score {video.safetyScore}</span>
                <span>{video.embeddable ? 'Embeddable' : 'Not embeddable'}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function PlaylistFeed({
  activeCategoryName,
  categories,
  playlists
}: {
  activeCategoryName?: string;
  categories: Category[];
  playlists: Playlist[];
}) {
  return (
    <section>
      <div className="section-head">
        <h2>{activeCategoryName ?? 'Playlist videos'}</h2>
        <span>Creative Commons checks refresh every 30 minutes</span>
      </div>

      <div className="playlist-grid">
        {playlists.map((playlist) => {
          const category = categories.find((item) => item.id === playlist.categoryId);
          const firstVideo = playlist.videos[0];

          return (
            <Link key={playlist.id} href={`/playlists/${playlist.slug}`} className="playlist-card">
              <div className="thumb">
                <img src={firstVideo.thumbnailUrl} alt={`${playlist.title} thumbnail`} />
                <span className="play-button" />
              </div>
              <div className="card-body">
                <div className="card-meta">
                  <span>{category?.name}</span>
                  <span>{playlist.estimatedWatchTime}</span>
                </div>
                <h3>{playlist.title}</h3>
                <p>{playlist.description}</p>
                <div className="video-footer">
                  <span>{playlist.mood}</span>
                  <span>{playlist.difficulty}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
