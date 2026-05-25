import Link from 'next/link';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/MarkdownContent';
import { getBlogBySlug, getBlogs } from '@/lib/content';

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-900 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-stone-600 dark:text-neutral-400">
          <Link
            href="/blogs"
            className="inline-flex transition-colors hover:text-stone-950 dark:hover:text-neutral-100"
          >
            Back to blogs
          </Link>
          <Link
            href="/"
            className="inline-flex transition-colors hover:text-stone-950 dark:hover:text-neutral-100"
          >
            Back to home
          </Link>
        </div>

        <div className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-stone-500 dark:text-neutral-500">
          {blog.date}
        </div>
        <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
          {blog.title}
        </h1>

        <MarkdownContent content={blog.body} />
      </div>
    </main>
  );
}
