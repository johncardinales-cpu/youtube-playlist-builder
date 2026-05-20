# Deployment Guide

This project is designed for low-cost deployment using GitHub and Vercel.

## 1. Import to Vercel

1. Open Vercel.
2. Click Add New Project.
3. Import `johncardinales-cpu/youtube-playlist-builder`.
4. Framework preset should detect Next.js.
5. Keep the default build command:

```bash
npm run build
```

6. Keep the default output settings.
7. Click Deploy.

## 2. Environment Variables

Add these in Vercel Project Settings, then Redeploy:

```bash
YOUTUBE_API_KEY=
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CRON_SECRET=change-this-secret
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

For the first deployment, the app can run without real keys because it has mock discovery data.

## 3. Cron Job

The Vercel cron route is already configured in `vercel.json`:

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

This means the app is designed to check for new videos every 30 minutes.

## 4. Test Routes

After deployment, test these pages:

- `/`
- `/admin`
- `/admin/discovery`
- `/admin/settings`
- `/api/youtube/search?q=jungle%20survival`
- `/api/cron/discover`

## 5. Current App Behavior

Without `YOUTUBE_API_KEY`, the discovery route returns mock results.

With `YOUTUBE_API_KEY`, the app searches YouTube with:

- `type=video`
- `videoLicense=creativeCommon`
- `videoEmbeddable=true`
- `safeSearch=moderate`

Then it verifies license and embeddable status through `videos.list`.

## 6. Safety Launch Setting

Keep auto-publish off first.

Recommended launch settings:

- Auto discovery: On
- Interval: 30 minutes
- License verification: On
- Manual admin review: On
- Auto publish: Off
- Only enable auto-publish later for very high-quality verified videos

## 7. Next Development Steps

1. Connect Supabase.
2. Save discovery results into database.
3. Add admin approve/reject buttons.
4. Add YouTube API key.
5. Add OpenAI summaries.
6. Add user favorites.
7. Add affiliate blocks.
8. Add analytics.
