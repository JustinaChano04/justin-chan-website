import { promises as fs } from 'node:fs';
import path from 'node:path';

type Frontmatter = Record<string, string>;

export type Profile = {
  name: string;
  headline: string;
  subheadline: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  headshot: string;
  about: string;
};

export type Experience = {
  slug: string;
  title: string;
  company: string;
  period: string;
  order: number;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  order: number;
  tags: string[];
  summary: string;
  body: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  order: number;
  date: string;
  summary: string;
  body: string;
};

const contentRoot = path.join(process.cwd(), 'content');

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  if (!raw.startsWith('---')) {
    return { data: {}, body: raw.trim() };
  }

  const parts = raw.split('---');
  const frontmatterBlock = parts[1] ?? '';
  const body = parts.slice(2).join('---').trim();
  const data: Frontmatter = {};

  for (const line of frontmatterBlock.split('\n')) {
    const trimmed = line.trim();

    if (!trimmed) {
      continue;
    }

    const separatorIndex = trimmed.indexOf(':');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    data[key] = value;
  }

  return { data, body };
}

async function readMarkdownFile(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf8');
  return parseFrontmatter(raw);
}

async function readMarkdownDirectory(directory: string) {
  const entries = await fs.readdir(directory);

  return Promise.all(
    entries
      .filter((entry) => entry.endsWith('.md') && entry.toLowerCase() !== 'readme.md')
      .map(async (entry) => {
        const filePath = path.join(directory, entry);
        const parsed = await readMarkdownFile(filePath);

        return {
          slug: entry.replace(/\.md$/, ''),
          ...parsed,
        };
      })
  );
}

export async function getProfile(): Promise<Profile> {
  const filePath = path.join(contentRoot, 'site', 'profile.md');
  const { data, body } = await readMarkdownFile(filePath);

  return {
    name: data.name ?? '',
    headline: data.headline ?? '',
    subheadline: data.subheadline ?? '',
    linkedinUrl: data.linkedinUrl ?? '',
    githubUrl: data.githubUrl ?? '',
    resumeUrl: data.resumeUrl ?? '',
    headshot: data.headshot ?? '',
    about: body,
  };
}

export async function getExperience(): Promise<Experience[]> {
  const directory = path.join(contentRoot, 'experience');
  const entries = await readMarkdownDirectory(directory);

  return entries
    .map(({ slug, data, body }) => ({
      slug,
      title: data.title ?? '',
      company: data.company ?? '',
      period: data.period ?? '',
      order: Number(data.order ?? 999),
      description: body,
    }))
    .sort((a, b) => a.order - b.order);
}

export async function getProjects(): Promise<Project[]> {
  const directory = path.join(contentRoot, 'projects');
  const entries = await readMarkdownDirectory(directory);

  return entries
    .map(({ slug, data, body }) => {
      const paragraphs = body
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

      return {
        slug,
        title: data.title ?? '',
        order: Number(data.order ?? 999),
        tags: (data.tags ?? '')
          .split('|')
          .map((tag) => tag.trim())
          .filter(Boolean),
        summary: paragraphs[0] ?? '',
        body,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(contentRoot, 'projects', `${slug}.md`);

  try {
    const { data, body } = await readMarkdownFile(filePath);
    const paragraphs = body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    return {
      slug,
      title: data.title ?? '',
      order: Number(data.order ?? 999),
      tags: (data.tags ?? '')
        .split('|')
        .map((tag) => tag.trim())
        .filter(Boolean),
      summary: paragraphs[0] ?? '',
      body,
    };
  } catch (error) {
    const isMissingFile =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT';

    if (isMissingFile) {
      return null;
    }

    throw error;
  }
}

export async function getBlogs(): Promise<BlogPost[]> {
  const directory = path.join(contentRoot, 'blogs');
  const entries = await readMarkdownDirectory(directory);

  return entries
    .map(({ slug, data, body }) => {
      const paragraphs = body
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

      return {
        slug,
        title: data.title ?? '',
        order: Number(data.order ?? 999),
        date: data.date ?? '',
        summary: paragraphs[0] ?? '',
        body,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(contentRoot, 'blogs', `${slug}.md`);

  try {
    const { data, body } = await readMarkdownFile(filePath);
    const paragraphs = body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    return {
      slug,
      title: data.title ?? '',
      order: Number(data.order ?? 999),
      date: data.date ?? '',
      summary: paragraphs[0] ?? '',
      body,
    };
  } catch (error) {
    const isMissingFile =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'ENOENT';

    if (isMissingFile) {
      return null;
    }

    throw error;
  }
}
