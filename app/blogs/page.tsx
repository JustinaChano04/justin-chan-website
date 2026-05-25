import Link from 'next/link';
import { getBlogs } from '@/lib/content';

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-900 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-10 inline-flex text-sm font-medium text-stone-600 transition-colors hover:text-stone-950 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Back to home
        </Link>

        <div className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-300">
          Writing
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Blogs
        </h1>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-stone-600 dark:text-neutral-400">
          Notes and essays on AI systems, product thinking, and technical work.
        </p>

        <div className="space-y-6">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="group block rounded-3xl border border-stone-200/80 bg-white/75 px-6 py-6 no-underline shadow-[0_14px_40px_rgba(15,23,42,0.05)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_50px_rgba(217,119,6,0.12)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:border-cyan-400/40 dark:hover:shadow-[0_20px_50px_rgba(34,211,238,0.10)]"
            >
              <div className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-stone-500 dark:text-neutral-500">
                {blog.date}
              </div>
              <h2 className="mb-2 text-xl font-medium text-stone-950 sm:text-2xl dark:text-neutral-100">
                {blog.title}
              </h2>
              <p className="text-lg leading-relaxed text-stone-700 dark:text-neutral-300">
                {blog.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
