'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Moon, Sun, FileText, Mail } from 'lucide-react';
import type { BlogPost, Experience, Profile, Project } from '@/lib/content';

type PortfolioProps = {
  blogs: BlogPost[];
  profile: Profile;
  experience: Experience[];
  projects: Project[];
};

export default function Portfolio({
  blogs,
  profile,
  experience,
  projects,
}: PortfolioProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark);

    queueMicrotask(() => {
      setIsDark(initialTheme);
      setIsMounted(true);
    });
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark, isMounted]);

  const toggleTheme = () => {
    setIsDark((current) => !current);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 text-stone-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-amber-200/55 blur-3xl dark:bg-amber-500/15" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl dark:bg-cyan-500/15" />
        <div className="absolute bottom-20 left-1/3 h-56 w-56 rounded-full bg-rose-100/60 blur-3xl dark:bg-fuchsia-500/10" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed right-6 top-6 z-20 rounded-full border border-stone-300/70 bg-white/80 p-3 backdrop-blur transition-colors hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/80 dark:hover:bg-neutral-900"
          aria-label="Toggle theme"
        >
          {isMounted && isDark ? (
            <Sun className="h-5 w-5 text-amber-500 dark:text-amber-300" />
          ) : (
            <Moon className="h-5 w-5 text-stone-700 dark:text-neutral-300" />
          )}
        </button>

        {/* Header */}
        <header className="mb-10 grid items-center gap-10 lg:grid-cols-[1.35fr_0.85fr]">
          <div>
            <h1 className="mb-4 max-w-3xl text-5xl font-bold tracking-tight text-stone-950 sm:text-7xl dark:text-neutral-50">
              {profile.name}
            </h1>
            <p className="mb-6 max-w-3xl text-2xl leading-tight text-stone-700 sm:text-3xl dark:text-neutral-300">
              {profile.headline}
            </p>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl dark:text-neutral-400">
              {profile.subheadline}
            </p>
            <div className="mb-8 flex items-center gap-5">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="text-stone-500 transition-colors hover:text-sky-700 dark:text-neutral-400 dark:hover:text-cyan-300"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="text-stone-500 transition-colors hover:text-stone-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Contact me"
                title="Contact me"
                className="text-stone-500 transition-colors hover:text-amber-700 dark:text-neutral-400 dark:hover:text-amber-300"
              >
                <Mail className="h-6 w-6" aria-hidden="true" />
              </a>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
                title="Resume"
                className="text-stone-500 transition-colors hover:text-rose-700 dark:text-neutral-400 dark:hover:text-rose-300"
              >
                <FileText className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
            <div className="mb-5 h-px w-full max-w-2xl bg-gradient-to-r from-amber-400 via-sky-400 to-transparent opacity-70 dark:from-amber-300 dark:via-cyan-300" />
            <nav
              aria-label="Primary links"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-neutral-500"
            >
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                <li>
                  <Link
                    href="/projects"
                    className="transition-colors hover:text-stone-900 dark:hover:text-neutral-100"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="transition-colors hover:text-stone-900 dark:hover:text-neutral-100"
                  >
                    Blogs
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/70 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70 dark:shadow-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={profile.headshot}
                  alt="Justin Chan outdoors"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        {/* About */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl dark:text-neutral-50">
            About
          </h2>
          <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-stone-700 sm:text-xl dark:text-neutral-300">
            {profile.about
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-cyan-300">
            Experience
          </div>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl dark:text-neutral-50">
            Experience
          </h2>
          <div className="relative space-y-6 before:absolute before:bottom-3 before:left-2 before:top-3 before:w-px before:bg-gradient-to-b before:from-sky-400 before:via-stone-300 before:to-transparent dark:before:from-cyan-300 dark:before:via-neutral-700 sm:before:left-[5.35rem]">
            {experience.map((job, index) => (
              <div
                key={index}
                className="relative grid grid-cols-[1rem_minmax(0,1fr)] gap-x-4 gap-y-2 sm:grid-cols-[5.25rem_1.2rem_minmax(0,1fr)] sm:gap-6"
              >
                <div className="col-start-2 pr-2 pt-0.5 text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-neutral-500 sm:col-start-auto">
                  {job.period}
                </div>
                <div className="relative">
                  <div className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-sky-500 shadow-sm dark:border-neutral-950 dark:bg-cyan-400" />
                </div>
                <div className="col-start-2 pb-1 sm:col-start-auto">
                  <div className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl dark:text-neutral-50">
                    {job.title}
                  </div>
                  <div className="mt-1 text-base text-stone-600 dark:text-neutral-400">
                    {job.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-rose-700 dark:text-rose-300">
            Selected Work
          </div>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl dark:text-neutral-50">
            Projects
          </h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <Link
                key={index}
                href={`/projects/${project.slug}`}
                className="group block rounded-3xl border border-stone-200/80 bg-white/75 px-6 py-6 no-underline shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(217,119,6,0.12)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_20px_50px_rgba(34,211,238,0.10)]"
              >
                <div className="mb-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400 dark:from-amber-300 dark:via-rose-300 dark:to-cyan-300" />
                <h3 className="mb-2 text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl dark:text-neutral-100">
                  {project.title}
                </h3>
                <p className="mb-4 text-lg leading-relaxed text-stone-700 dark:text-neutral-300">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="rounded-full border border-stone-200 bg-stone-100/80 px-3 py-1.5 text-sm font-medium text-stone-700 dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-rose-700 transition-colors group-hover:text-amber-700 dark:text-rose-300 dark:group-hover:text-cyan-300">
                  View project
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            Writing
          </div>
          <h2 className="mb-8 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl dark:text-neutral-50">
            Blogs
          </h2>
          {blogs.length > 0 && (
            <>
              <div className="space-y-6">
                {blogs.slice(0, 3).map((blog) => (
                  <Link
                    key={blog.slug}
                    href={`/blogs/${blog.slug}`}
                    className="group block rounded-3xl border border-stone-200/80 bg-white/75 px-6 py-6 no-underline shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(217,119,6,0.12)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_20px_50px_rgba(34,211,238,0.10)]"
                  >
                    <div className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-neutral-500">
                      {blog.date}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl dark:text-neutral-100">
                      {blog.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-stone-700 dark:text-neutral-300">
                      {blog.summary}
                    </p>
                  </Link>
                ))}
              </div>
              <Link
                href="/blogs"
                className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-stone-500 transition-colors hover:text-stone-900 dark:text-neutral-500 dark:hover:text-neutral-100"
              >
                View all blogs
              </Link>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
