import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import Portfolio from '@/components/Portfolio';
import { getBlogs, getExperience, getProfile, getProjects } from '@/lib/content';
import { absoluteUrl, createPersonSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Engineer Portfolio',
  description:
    'Justin Chan builds agentic AI, machine learning systems, and product-focused software with an engineering and research mindset.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    url: absoluteUrl('/'),
    title: 'Justin Chan | AI Engineer Portfolio',
    description:
      'Justin Chan builds agentic AI, machine learning systems, and product-focused software with an engineering and research mindset.',
  },
};

export default async function Home() {
  const [profile, experience, projects, blogs] = await Promise.all([
    getProfile(),
    getExperience(),
    getProjects(),
    getBlogs(),
  ]);

  return (
    <>
      <StructuredData data={createPersonSchema()} />
      <Portfolio
        blogs={blogs}
        experience={experience}
        profile={profile}
        projects={projects}
      />
    </>
  );
}
