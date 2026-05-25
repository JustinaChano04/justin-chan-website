# Quick Start Guide

## What You Got

A complete Next.js portfolio with:
- ✅ Working dark/light mode toggle (top-right button)
- ✅ Clean Notion-inspired design
- ✅ Proper spacing and typography
- ✅ All your projects and experience
- ✅ Fully responsive

## To Get Started

1. **Extract the archive**:
   ```bash
   tar -xzf portfolio.tar.gz
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run locally**:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

4. **Deploy to Vercel** (easiest):
   - Create GitHub repo
   - Push code: `git init && git add . && git commit -m "init" && git push`
   - Go to vercel.com → "New Project" → Import your repo
   - Click "Deploy" - done!

## Editing Content

Everything is in `components/Portfolio.tsx`:

- **Line 28-64**: Projects (add/edit/remove projects here)
- **Line 66-73**: Experience (your work history)
- **Line 135**: About section text
- **Line 113-134**: Social links

## Change Theme Colors

In `components/Portfolio.tsx`, find these Tailwind classes:

**Background colors:**
- `bg-white dark:bg-neutral-900` → Try `bg-neutral-50 dark:bg-neutral-950`

**Text colors:**
- `text-neutral-900 dark:text-neutral-50` → Main text
- `text-neutral-600 dark:text-neutral-400` → Secondary text

**Tag colors:**
- `bg-neutral-100 dark:bg-neutral-800` → Project tags

## Adjust Spacing

Tailwind spacing (just change the numbers):
- `mb-16` = large gap (64px)
- `mb-8` = medium gap (32px)  
- `mb-6` = small gap (24px)

Want tighter spacing? Change `mb-16` → `mb-12` or `mb-8`

## Need Help?

- Next.js docs: https://nextjs.org/docs
- Tailwind docs: https://tailwindcss.com/docs
- Deploy guide: https://vercel.com/docs

## What's Different from Your Old Site?

- ✅ Real framework (can add features easily)
- ✅ Working dark/light toggle
- ✅ Better spacing (closer to Notion)
- ✅ Easy to edit (just arrays of data)
- ✅ Fast deployment (Vercel auto-detects everything)

Enjoy!
