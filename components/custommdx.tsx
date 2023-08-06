import cn from '@/libs/utils/cn';
import { MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import React, { ComponentProps } from 'react';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import rehypeToc from 'rehype-toc';
import { Anchor } from './mdx/anchor';
import { Code } from './mdx/code';

const customMDX: Omit<MDXRemoteProps, 'source'> = {
  components: {
    p: ({ className, ...props }: ComponentProps<'p'>) => (
      <p
        className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
      />
    ),
    h1: ({ className, ...props }: ComponentProps<'h1'>) => (
      <h1
        className={cn(
          'mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-center',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: ComponentProps<'h2'>) => (
      <h2
        className={cn(
          'mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0  border-b border-border-primary',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: ComponentProps<'h3'>) => (
      <h3
        className={cn(
          'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }: ComponentProps<'h4'>) => (
      <h4
        className={cn(
          'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }: ComponentProps<'h5'>) => (
      <h5
        className={cn(
          'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }: ComponentProps<'h6'>) => (
      <h6
        className={cn(
          'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: ComponentProps<'ul'>) => (
      <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
    ),
    ol: ({ className, children, ...props }: ComponentProps<'ol'>) => {
      if (React.Children.count(children) > 0) {
        return (
          <ol className={cn('my-6 ml-6 list-decimal', className)} {...props}>
            {children}
          </ol>
        );
      } else {
        return <></>;
      }
    },
    li: ({ className, ...props }: ComponentProps<'li'>) => (
      <li className={cn('mt-2', className)} {...props} />
    ),
    blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
      <blockquote
        className={cn(
          'mt-6 border-l-4 pl-3 border-border-primary italic child:text-foreground-secondry',
          className
        )}
        {...props}
      />
    ),
    hr: ({ ...props }: ComponentProps<'hr'>) => (
      <hr className="my-4 md:my-8" {...props} />
    ),
    table: ({ className, ...props }: ComponentProps<'table'>) => (
      <div className="w-full my-6 overflow-y-auto">
        <table className={cn('w-full', className)} {...props} />
      </div>
    ),
    tr: ({ className, ...props }: ComponentProps<'tr'>) => (
      <tr
        className={cn('m-0 border-t p-0 even:bg-muted', className)}
        {...props}
      />
    ),
    th: ({ className, ...props }: ComponentProps<'th'>) => (
      <th
        className={cn(
          'border px-4 py-2 border-border-primary bg-background-th text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: ComponentProps<'td'>) => (
      <td
        className={cn(
          'border px-4 py-2 border-border-primary text-left [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }: ComponentProps<'pre'>) => (
      <pre className={cn('mb-4 mt-6 overflow-x-auto', className)} {...props} />
    ),
    nav: ({ className, children, ...props }: ComponentProps<'nav'>) => {
      if (className?.includes('toc')) {
        return (
          <nav
            className={cn(
              'rounded-md border border-border-primary px-3',
              className
            )}
            {...props}
          >
            {children}
          </nav>
        );
      }
      return (
        <nav className={className} {...props}>
          {children}
        </nav>
      );
    },
    code: Code,
    a: Anchor,
    YouTube: ({ id }: { id: string }) => (
      <iframe
        width="100%"
        height="450"
        src={'https://www.youtube.com/embed/' + id}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    ),
    V: ({ src }: { src: string }) => (
      <video src={src} width="auto" height="auto" controls></video>
    ),
  },
  options: {
    mdxOptions: {
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeToc,
      ],
      remarkPlugins: [remarkGfm, remarkEmoji],
    },
    parseFrontmatter: true,
  },
};

export { customMDX };
