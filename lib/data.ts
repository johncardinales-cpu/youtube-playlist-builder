import { Category, Playlist, Video } from './types';

export const categories: Category[] = [
  { id: 'survival', name: 'Survival and Emergency Skills', slug: 'survival', icon: 'Compass', description: 'Jungle, sea, first aid, fire, shelter, camping, and disaster preparedness.', keywords: ['jungle survival basics', 'sea survival basics', 'emergency first aid'] },
  { id: 'relaxing', name: 'Relaxing Music', slug: 'relaxing-music', icon: 'Music', description: 'Calm piano, rain sounds, nature sounds, study music, worship instrumentals, and sleep music.', keywords: ['creative commons relaxing piano', 'creative commons study music', 'creative commons rain sounds'] },
  { id: 'motivation', name: 'Motivational Videos', slug: 'motivation', icon: 'Flame', description: 'Morning motivation, discipline, comeback, faith, study, entrepreneur, and trading psychology.', keywords: ['creative commons motivation', 'discipline motivation creative commons'] },
  { id: 'funny', name: 'Funny Family-Friendly Videos', slug: 'funny', icon: 'Smile', description: 'Clean funny animals, wholesome clips, family-safe comedy, funny pets, and safe entertainment.', keywords: ['creative commons funny animals', 'family friendly funny videos'] },
  { id: 'learning', name: 'Things to Learn', slug: 'things-to-learn', icon: 'Book', description: 'AI tools, computer basics, English, finance, cooking, repairs, business, coding, and design skills.', keywords: ['creative commons tutorial for beginners', 'learn basic computer skills'] },
  { id: 'kids', name: 'Kids Learning', slug: 'kids-learning', icon: 'Sparkles', description: 'Alphabet, reading, math, science, Bible stories, drawing, English, and animal learning.', keywords: ['creative commons kids learning', 'educational videos for kids creative commons'] },
  { id: 'faith', name: 'Faith and Worship', slug: 'faith-worship', icon: 'Heart', description: 'Worship instrumentals, Bible study basics, prayer music, Christian motivation, and gospel learning.', keywords: ['creative commons worship instrumental', 'Bible study basics creative commons'] }
];

const makeVideo = (title: string, notes: string): Video => ({
  youtubeVideoId: 'dQw4w9WgXcQ',
  title,
  channelTitle: 'Creator Channel',
  sourceUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  licenseType: 'creativeCommon',
  licenseVerifiedAt: new Date().toISOString(),
  embeddable: true,
  attributionText: `Video: ${title} | Creator: Creator Channel | License: Creative Commons Attribution`,
  safetyScore: 92,
  summary: 'This placeholder shows how a verified Creative Commons video appears inside the curated playlist experience.',
  learningNotes: notes
});

export const playlists: Playlist[] = [
  { id: 'jungle-survival-basics', categoryId: 'survival', title: 'Jungle Survival Basics', slug: 'jungle-survival-basics', description: 'A practical beginner playlist for the first actions you should learn in a jungle survival situation.', mood: 'Practical', difficulty: 'Beginner', estimatedWatchTime: '2 hours 10 mins', bestFor: 'Campers, travelers, scouts, emergency-minded learners, and outdoor beginners.', goal: 'Learn water, shelter, fire, and basic safety in a clear starting order.', videos: [makeVideo('Jungle Survival Basics', 'Use this slot for real survival videos after the YouTube API is connected.')] },
  { id: 'relaxing-study-music', categoryId: 'relaxing', title: 'Relaxing Music for Study and Focus', slug: 'relaxing-study-music', description: 'A calm background stream for work, studying, reflection, reading, and light prayer time.', mood: 'Calm', difficulty: 'Easy listening', estimatedWatchTime: '3 hours', bestFor: 'Students, remote workers, readers, creators, and anyone who wants a quiet flow.', goal: 'Help users focus faster without browsing through endless music results.', videos: [makeVideo('Relaxing Music for Study and Focus', 'Swap this placeholder with verified relaxing music once discovery is connected.')] },
  { id: 'morning-motivation', categoryId: 'motivation', title: 'Motivational Morning Playlist', slug: 'motivational-morning-playlist', description: 'A clean push to help users start the day with energy, discipline, and better focus.', mood: 'Driven', difficulty: 'All levels', estimatedWatchTime: '55 mins', bestFor: 'Morning routines, workouts, studying, and mindset resets.', goal: 'Give users one strong place to start their day without digging through random videos.', videos: [makeVideo('Motivational Morning Playlist', 'Use this spot for discipline, workout, and faith-based motivational content.')] },
  { id: 'family-safe-funny-videos', categoryId: 'funny', title: 'Clean Funny Family-Safe Videos', slug: 'family-safe-funny-videos', description: 'Wholesome funny content that feels safe to watch with family and kids.', mood: 'Funny', difficulty: 'All ages', estimatedWatchTime: '48 mins', bestFor: 'Families, casual breaks, and safe light entertainment.', goal: 'Give people a fast way to find clean funny content without risky suggestions.', videos: [makeVideo('Clean Funny Family-Safe Videos', 'This will later hold real safe entertainment from verified discovery results.')] },
  { id: 'ai-tools-for-beginners', categoryId: 'learning', title: 'AI Tools for Beginners', slug: 'ai-tools-for-beginners', description: 'A simple starter list for useful AI tutorials and practical beginner education.', mood: 'Useful', difficulty: 'Beginner', estimatedWatchTime: '1 hour 20 mins', bestFor: 'Beginners, freelancers, students, and business owners.', goal: 'Teach the basics of useful AI tools without the noise of unfiltered search.', videos: [makeVideo('AI Tools for Beginners', 'This section is ideal for ChatGPT, AI workflow, and productivity tutorials.')] },
  { id: 'kids-abc-and-reading', categoryId: 'kids', title: 'Kids ABC and Reading', slug: 'kids-abc-and-reading', description: 'A safe, simple learning playlist for letters, words, and early reading support.', mood: 'Friendly', difficulty: 'Beginner', estimatedWatchTime: '1 hour', bestFor: 'Young children, parents, and guardians.', goal: 'Help parents find safe educational content fast.', videos: [makeVideo('Kids ABC and Reading', 'This playlist should later include verified kids educational content only.')] },
  { id: 'worship-instrumental-flow', categoryId: 'faith', title: 'Worship Instrumental Flow', slug: 'worship-instrumental-flow', description: 'A peaceful listening flow for devotion, prayer, reflection, and quiet work.', mood: 'Peaceful', difficulty: 'Easy listening', estimatedWatchTime: '2 hours 25 mins', bestFor: 'Prayer time, devotion, journaling, and faith-based reflection.', goal: 'Give users a peaceful faith playlist without endless scrolling.', videos: [makeVideo('Worship Instrumental Flow', 'This section will later include real worship-friendly creative commons content.')] }
];

export function getCategoryBySlug(slug: string) { return categories.find((category) => category.slug === slug); }
export function getPlaylistsByCategoryId(categoryId: string) { return playlists.filter((playlist) => playlist.categoryId === categoryId); }
export function getPlaylistBySlug(slug: string) { return playlists.find((playlist) => playlist.slug === slug); }
