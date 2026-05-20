import { Category, Playlist, Video } from './types';

export const categories: Category[] = [
  { id: 'survival', name: 'Survival and Emergency Skills', slug: 'survival', description: 'Jungle, sea, first aid, fire, shelter, camping, and disaster preparedness.', keywords: ['jungle survival basics', 'sea survival basics', 'emergency first aid'] },
  { id: 'relaxing', name: 'Relaxing Music', slug: 'relaxing-music', description: 'Calm piano, rain sounds, nature sounds, study music, worship instrumentals, and sleep music.', keywords: ['creative commons relaxing piano', 'creative commons study music', 'creative commons rain sounds'] },
  { id: 'motivation', name: 'Motivational Videos', slug: 'motivation', description: 'Morning motivation, discipline, comeback, faith, study, entrepreneur, and trading psychology.', keywords: ['creative commons motivation', 'discipline motivation creative commons'] },
  { id: 'funny', name: 'Funny Family-Friendly Videos', slug: 'funny', description: 'Clean funny animals, wholesome clips, family-safe comedy, funny pets, and safe entertainment.', keywords: ['creative commons funny animals', 'family friendly funny videos'] },
  { id: 'learning', name: 'Things to Learn', slug: 'things-to-learn', description: 'AI tools, computer basics, English, finance, cooking, repairs, business, coding, and design skills.', keywords: ['creative commons tutorial for beginners', 'learn basic computer skills'] },
  { id: 'kids', name: 'Kids Learning', slug: 'kids-learning', description: 'Alphabet, reading, math, science, Bible stories, drawing, English, and animal learning.', keywords: ['creative commons kids learning', 'educational videos for kids creative commons'] },
  { id: 'faith', name: 'Faith and Worship', slug: 'faith-worship', description: 'Worship instrumentals, Bible study basics, prayer music, Christian motivation, and gospel learning.', keywords: ['creative commons worship instrumental', 'Bible study basics creative commons'] }
];

const sampleVideo: Video = {
  youtubeVideoId: 'demo-video',
  title: 'Demo license-safe video placeholder',
  channelTitle: 'Demo Creator',
  sourceUrl: 'https://www.youtube.com',
  thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  licenseType: 'creativeCommon',
  licenseVerifiedAt: new Date().toISOString(),
  embeddable: true,
  attributionText: 'Video by Demo Creator, licensed under Creative Commons Attribution.',
  safetyScore: 90,
  summary: 'This is where AI will summarize the video after discovery.',
  learningNotes: 'This is where AI will add simple learning notes for the user.'
};

export const playlists: Playlist[] = [
  { id: 'jungle-survival-basics', categoryId: 'survival', title: 'Jungle Survival Basics', slug: 'jungle-survival-basics', description: 'A beginner-friendly path for jungle survival videos.', mood: 'Practical', difficulty: 'Beginner', estimatedWatchTime: '2 hours', bestFor: 'Campers and survival learners.', goal: 'Learn water, shelter, fire, and safety basics.', videos: [sampleVideo] },
  { id: 'relaxing-study-music', categoryId: 'relaxing', title: 'Relaxing Music for Study and Focus', slug: 'relaxing-study-music', description: 'Calm background music for work, study, prayer, or rest.', mood: 'Calm', difficulty: 'Easy listening', estimatedWatchTime: '3 hours', bestFor: 'Students and remote workers.', goal: 'Create a peaceful listening flow.', videos: [sampleVideo] },
  { id: 'family-safe-funny-videos', categoryId: 'funny', title: 'Clean Funny Family-Safe Videos', slug: 'family-safe-funny-videos', description: 'Light videos for family-friendly laughs.', mood: 'Funny', difficulty: 'All ages', estimatedWatchTime: '45 minutes', bestFor: 'Families and casual breaks.', goal: 'Find clean funny content without risky recommendations.', videos: [sampleVideo] }
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getPlaylistsByCategoryId(categoryId: string) {
  return playlists.filter((playlist) => playlist.categoryId === categoryId);
}

export function getPlaylistBySlug(slug: string) {
  return playlists.find((playlist) => playlist.slug === slug);
}
