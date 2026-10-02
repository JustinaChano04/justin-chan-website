<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Purpose of this repo

This repo is the central place for Justin's career and personal-profile content. The goal is to give Justin and agents shared context across his career material, so it's easier to generate new content or update a source when needed. The sources are intentionally not kept in sync: each has its own purpose and audience.

## Sources of truth

1. **Personal website** (this Next.js app)
   - Holds Justin's profile and the projects he wants to showcase.
   - Content lives in `content/` (`experience`, `projects`, `blogs`, `site`, `misc.`) and is rendered by `app/` and `components/`.
2. **Notion**
   - Holds cover letters and things Justin has written about himself and his aspirations.
   - Not stored in this repo. Access it through the Notion MCP connector (`mcp__claude_ai_Notion__*` tools, e.g. `notion-search`, `notion-fetch`). Fetch the relevant pages instead of guessing at their content.
   - Main page Justin adds to: [About Me](https://app.notion.com/p/3ebcfb6d3eb080f4b825fc19df62f1e3) (Personal / Career). It holds his LinkedIn bio drafts (dated toggles) and a Templates section linking the AI/ML Cover Letter Template. Fetch it before drafting bios, cover letters, or other first-person writing, and match its voice.
3. **Resumes**
   - Updated resumes live in `resume/` (LaTeX, e.g. `ds-f26-resume.tex`).
   - `resume/` is gitignored, so it stays local and is never published with the site.

## Working across sources

- Don't force consistency between sources. Differences in wording, detail, or emphasis are expected and usually intentional.
- Use the other sources as context when drafting or updating one (e.g. pull from the resume and Notion writing when writing a cover letter or a new project entry), but only edit the source Justin asked about.
- Don't write to Notion or publish site changes without being asked.
