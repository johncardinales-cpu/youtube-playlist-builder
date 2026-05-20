export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  keywords: string[];
};

export type Video = {
  youtubeVideoId: string;
  title: string;
  channelTitle: string;
  sourceUrl: string;
  thumbnailUrl: string;
  licenseType: string;
  licenseVerifiedAt: string;
  embeddable: boolean;
  attributionText: string;
  safetyScore: number;
  summary: string;
  learningNotes: string;
};

export type Playlist = {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  mood: string;
  difficulty: string;
  estimatedWatchTime: string;
  bestFor: string;
  goal: string;
  videos: Video[];
};

export type DiscoveryResult = {
  youtubeVideoId: string;
  title: string;
  channelTitle: string;
  sourceUrl: string;
  thumbnailUrl: string;
  licenseType: string;
  embeddable: boolean;
  safetyScore: number;
  status: 'queued' | 'rejected' | 'approved';
  reason: string;
};
