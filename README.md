# YouTube Playlist Builder

A license-safe curated video library for ready-made playlists. The app helps users find organized videos for survival, relaxing music, motivational content, funny family-safe videos, kids learning, faith and worship, and useful skills without searching deeply on YouTube.

## Core Direction

The app itself searches for videos. Admins define categories, topics, and keywords. A scheduled job runs every 30 minutes, searches YouTube for Creative Commons embeddable videos, verifies the license, scores the results, removes duplicates, then sends good videos to admin review.

## Safety Rules

Allowed:

- YouTube Creative Commons videos
- Public domain videos
- CC0 videos
- Royalty-free videos with clear commercial-use rights
- Videos owned by your own channel or team

Blocked:

- Standard YouTube License videos
- Official music videos without reuse permission
- Random reuploaded music
- Videos with unclear ownership
- Videos that cannot be embedded
- Spammy or suspicious videos

## Auto Discovery

The Vercel cron is configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/discover",
      "schedule": "*/30 * * * *"
    }
  ]
}
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required later:

```bash
YOUTUBE_API_KEY=
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CRON_SECRET=change-this-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to GitHub and Vercel

```bash
git init
git add .
git commit -m "Initial YouTube Playlist Builder MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/youtube-playlist-builder.git
git push -u origin main
```

Then import the GitHub repo in Vercel and add environment variables.

## MVP Included

- Homepage category cards
- Category pages
- Playlist pages
- Admin dashboard
- Discovery queue preview
- Settings page
- YouTube Creative Commons search route
- 30-minute cron discovery route
- Video scoring logic
- Supabase schema migration
- License attribution model
