import { serialize } from 'next-mdx-remote/serialize';
import { customMDX } from '@/components/custommdx';

export async function complieMDX(comments: Blog.Comments) {
  if (comments) {
    const serializeResult = comments.map(async (comment) => {
      const complieContent = await serialize(comment.body, {
        mdxOptions: {
          ...customMDX.options?.mdxOptions,
          development: process.env.NODE_ENV !== 'production',
        },
        parseFrontmatter: true,
      });
      return {
        id: comment.id,
        author_association: comment.author_association,
        created_at: comment.created_at,
        updated_at: comment.updated_at,
        user: comment.user,
        url: comment.url,
        body: complieContent,
      };
    });
    return await Promise.all(serializeResult);
  }
}

export type CompliedComments = Awaited<ReturnType<typeof complieMDX>>;
