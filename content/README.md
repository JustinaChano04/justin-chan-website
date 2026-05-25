# Content Structure

This portfolio reads its editable content from Markdown files in this folder.

## Files

- `site/profile.md`
  Stores the homepage hero, about copy, headshot path, and social links.

- `experience/*.md`
  One file per experience entry.

- `projects/*.md`
  One file per project. Each file powers both the homepage card and its project detail page.

- `blogs/*.md`
  One file per blog post. Each file powers both the blogs index and its detail page.

## Frontmatter Rules

- Use simple `key: value` pairs.
- Use `tags: Tag One | Tag Two | Tag Three` for project tags.
- Use `order: 1`, `order: 2`, etc. to control display order.
- Everything after the closing `---` is the Markdown body.

## Project Links

Homepage project cards link to `/projects/[slug]`, where `slug` is the Markdown filename.

Blog cards link to `/blogs/[slug]`, where `slug` is the Markdown filename.
