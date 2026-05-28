# Justin Chan Portfolio

A clean, minimal portfolio website built with Next.js and Tailwind CSS.

## Features

- ✅ Dark/Light mode toggle with system preference detection
- ✅ Notion-inspired typography and spacing
- ✅ Fully responsive design
- ✅ Clean, minimal aesthetic
- ✅ Fast and SEO-friendly

## Quick Start

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Deploy to Vercel (Recommended)

1. Push this repo to GitHub:
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy" - Vercel auto-detects Next.js!

Your site will be live at `https://<your-project>.vercel.app`

### Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project → Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)

## SEO Setup

Set `NEXT_PUBLIC_SITE_URL` to your production domain before deploying so canonical URLs, sitemap entries, and structured data point to the correct host.

Example:

```bash
NEXT_PUBLIC_SITE_URL=https://justinchan.tech
```

## Editing Content

Most portfolio content lives in Markdown under `content/`:

- **Profile**: `content/site/profile.md`
- **Projects**: `content/projects/*.md`
- **Experience**: `content/experience/*.md`
- **Blogs**: `content/blogs/*.md`

Shared SEO settings live in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `lib/seo.ts`.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Geist Sans (default Next.js font)
- **Deploy**: Vercel

## File Structure

```
portfolio/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page (imports Portfolio)
│   └── globals.css      # Global styles + Tailwind
├── components/
│   └── Portfolio.tsx    # Main portfolio component
└── package.json
```

## Customization Tips

### Change Colors
Edit the Tailwind classes in `Portfolio.tsx`:
- Background: `bg-white dark:bg-neutral-900`
- Text: `text-neutral-900 dark:text-neutral-50`
- Tags: `bg-neutral-100 dark:bg-neutral-800`

### Change Spacing
Tailwind spacing scale:
- `mb-16` = 4rem (64px)
- `mb-8` = 2rem (32px)
- `space-y-6` = 1.5rem (24px) between items

### Add New Sections
Copy the section structure from existing sections in `Portfolio.tsx`

## License

MIT - Feel free to use this for your own portfolio!
# justin-chan-website
