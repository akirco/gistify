import { getBaseUrl } from '@/libs/utils/get-baseURL';
import { snippets, posts } from '@/libs/utils/constants';
import { isArrayContained } from '@/libs/utils/is-array-contained';
export async function getPostById(id: string) {
  const response = await fetch(`${getBaseUrl()}/api/detail?id=${id}`, {
    cache: process.env.NODE_ENV === 'development' ? 'no-cache' : 'force-cache',
  });
  const post = (await response.json()) as Gists.Gist;

  const postContent = Object.values(post.files).map((file) => {
    if (isArrayContained([file.language], snippets)) {
      const markdown = createMarkdownCodeBlock(file.content, file.language);
      return {
        title: file.filename,
        content: markdown,
      };
    } else if (isArrayContained([file.language], posts)) {
      return {
        title: file.filename,
        content: file.content,
      };
    } else {
      return {
        title: 'Error',
        content: `
        ## There is not available content.
        `,
      };
    }
  });
  return {
    id: post.id,
    name: post.name,
    created: post.createdAt,
    updated: post.updatedAt,
    postContent,
  };
}

export type PostResponse = Awaited<ReturnType<typeof getPostById>>;

function createMarkdownCodeBlock(code: string, language: string) {
  return '```' + language + '\n' + code + '\n```';
}
