"use client";

import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eye } from "lucide-react";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

interface PreviewProps {
  content: string;
  className?: string;
}

export default function Preview({ content, className }: PreviewProps) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
        <span className="text-sm font-medium text-zinc-400">PREVIEW</span>
        <Eye className="h-4 w-4 text-zinc-400" />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="prose prose-sm dark:prose-invert prose-headings:font-geist prose-p:font-geist max-w-none p-4 [&_.text-left]:text-left [&_.text-center]:text-center [&_.text-right]:text-right">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              div: ({ className, children }) => {
                if (className?.includes("text-")) {
                  return <div className={className}>{children}</div>;
                }
                return <div>{children}</div>;
              },
              p: ({ children }) => <p className="mt-2">{children}</p>,
              h1: ({ children }) => (
                <h1 className="mt-6 first:mt-0">{children}</h1>
              ),
              h2: ({ children }) => <h2 className="mt-4">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-4">{children}</h3>,
              h4: ({ children }) => <h4 className="mt-4">{children}</h4>,
              h5: ({ children }) => <h5 className="mt-4">{children}</h5>,
              h6: ({ children }) => <h6 className="mt-4">{children}</h6>,
              ul: ({ children }) => (
                <ul className="mt-2 list-disc pl-6">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mt-2 list-decimal pl-6">{children}</ol>
              ),
              li: ({ children }) => <li className="mt-1">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="mt-2 border-l-4 border-zinc-200 pl-4 dark:border-zinc-700">
                  {children}
                </blockquote>
              ),
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter {...rest} PreTag="div" language={match[1]}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="mt-2 overflow-x-auto rounded-lg p-0 bg-transparent">
                  {children}
                </pre>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
