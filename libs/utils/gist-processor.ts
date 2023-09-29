import { getGists, getGist } from '@/libs/gists/gists-api';
import matter from 'gray-matter';
import { snippets, posts } from '@/libs/utils/constants';
import { isArrayContained } from '@/libs/utils/is-array-contained';

interface PostMetaInfo {
  tags: string[];
  categories: string[];
  cover: string;
}

export async function getPosts() {
  const gists = await getGists();
  const postsData = [];
  for (const gist of gists) {
    let postsTable;
    const tags = Object.values(gist.files).map((file) => file.language);
    if (isArrayContained(tags, snippets)) {
      const cover = process.env['DEFAULT_COVER'] as string;
      postsTable = {
        id: gist.id,
        tags,
        cover: [cover],
        categories: ['snippets'],
        title: gist.name,
        public: gist.public,
        created: gist.createdAt,
        updated: gist.updatedAt,
        filecount: gist.fileCount,
      };
      postsData.push(postsTable);
    } else if (isArrayContained(tags, posts)) {
      const cover = process.env['DEFAULT_COVER'] as string;
      const currentGist = await getGist(gist.id);
      const postMetaInfo = Object.values(currentGist.files).map(
        async (file) => {
          if (file.content.startsWith('---')) {
            const meta = matter(file.content).data as PostMetaInfo;
            return {
              cover: meta.cover || cover,
              tags: meta.tags || 'untags',
              categories: meta.categories || 'uncategory',
            };
          } else {
            return {
              cover: cover,
              tags: 'untags',
              categories: 'uncategory',
            };
          }
        }
      );
      const res = await Promise.all(postMetaInfo);
      postsTable = {
        id: gist.id,
        tags: res.map((r) => r.tags).flat(),
        cover: res.map((r) => r.cover).flat(),
        categories: res.map((r) => r.categories).flat(),
        title: gist.name,
        public: gist.public,
        created: gist.createdAt,
        updated: gist.updatedAt,
        filecount: gist.fileCount,
      };
      postsData.push(postsTable);
    }
  }
  return postsData;
}
