import Link from 'next/link';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/MarkdownContent';
import { getProjectBySlug, getProjects } from '@/lib/content';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-900 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-flex text-sm font-medium text-stone-600 transition-colors hover:text-stone-950 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Back to home
        </Link>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-200 bg-stone-100/80 px-3 py-1.5 text-sm font-medium text-stone-700 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>

        <MarkdownContent content={project.body} />
      </div>
    </main>
  );
}
