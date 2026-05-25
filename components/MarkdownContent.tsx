import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownContentProps = {
  content: string;
};

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="space-y-5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="pt-4 text-3xl font-semibold tracking-tight text-stone-950 dark:text-neutral-50">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="pt-4 text-2xl font-semibold tracking-tight text-stone-950 dark:text-neutral-50">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="pt-2 text-lg font-semibold uppercase tracking-[0.16em] text-stone-600 dark:text-neutral-400">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-lg leading-relaxed text-stone-700 dark:text-neutral-300">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed text-stone-700 dark:text-neutral-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-6 text-lg leading-relaxed text-stone-700 dark:text-neutral-300">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-sky-700 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-amber-700 dark:text-cyan-300 dark:decoration-neutral-700 dark:hover:text-amber-300"
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-stone-100 px-1.5 py-0.5 text-[0.95em] text-stone-800 dark:bg-neutral-800 dark:text-neutral-100">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-2xl bg-stone-100 p-4 text-sm text-stone-800 dark:bg-neutral-900 dark:text-neutral-100">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-base text-stone-700 dark:text-neutral-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-stone-300 dark:border-neutral-700">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-stone-200 align-top dark:border-neutral-800">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 font-semibold text-stone-950 dark:text-neutral-50">
              {children}
            </th>
          ),
          td: ({ children }) => <td className="px-3 py-2">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
