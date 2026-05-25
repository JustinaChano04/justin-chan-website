import Link from 'next/link';
import { getProjects } from '@/lib/content';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-900 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-rose-700 dark:text-rose-300">
          Project
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-stone-600 dark:text-neutral-400">
          A complete index of projects, research, and case studies.
        </p>

        <div className="space-y-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block rounded-3xl border border-stone-200/80 bg-white/75 px-6 py-6 no-underline shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(217,119,6,0.12)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_20px_50px_rgba(34,211,238,0.10)]"
            >
              <div className="mb-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400 dark:from-amber-300 dark:via-rose-300 dark:to-cyan-300" />
              <h2 className="mb-2 text-xl font-medium text-stone-950 sm:text-2xl dark:text-neutral-100">
                {project.title}
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-stone-700 dark:text-neutral-300">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stone-200 bg-stone-100/80 px-3 py-1.5 text-sm font-medium text-stone-700 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
