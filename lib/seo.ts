const defaultSiteUrl = 'http://localhost:3000';

function normalizeSiteUrl(value: string | undefined) {
  if (!value) {
    return defaultSiteUrl;
  }

  const normalizedValue = value.startsWith('http') ? value : `https://${value}`;
  return normalizedValue.replace(/\/+$/, '');
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL
);

export const siteOrigin = new URL(siteUrl);

export function absoluteUrl(pathname = '/') {
  return new URL(pathname, siteOrigin).toString();
}

export function createPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Justin Chan',
    url: absoluteUrl('/'),
    image: absoluteUrl('/headshot-casual.jpg'),
    jobTitle: 'AI Engineer',
    sameAs: [
      'https://www.linkedin.com/in/justin-chan04/',
      'https://github.com/JustinaChano04',
    ],
    knowsAbout: [
      'AI engineering',
      'LLM systems',
      'Agentic AI',
      'Machine learning',
      'Product engineering',
    ],
  };
}

export function createProjectSchema(input: {
  title: string;
  description: string;
  slug: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    description: input.description,
    url: absoluteUrl(`/projects/${input.slug}`),
    image: absoluteUrl('/headshot-casual.jpg'),
    author: {
      '@type': 'Person',
      name: 'Justin Chan',
      url: absoluteUrl('/'),
    },
    keywords: input.tags.join(', '),
  };
}

export function createBlogSchema(input: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    mainEntityOfPage: absoluteUrl(`/blogs/${input.slug}`),
    url: absoluteUrl(`/blogs/${input.slug}`),
    image: absoluteUrl('/headshot-casual.jpg'),
    author: {
      '@type': 'Person',
      name: 'Justin Chan',
      url: absoluteUrl('/'),
    },
    publisher: {
      '@type': 'Person',
      name: 'Justin Chan',
      url: absoluteUrl('/'),
    },
  };
}
