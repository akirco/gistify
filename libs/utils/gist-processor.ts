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
      const cover = await getPostCover(tags[0]);
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
      const cover = await getPostCover('cat');
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

interface PixabayResponse {
  hits: Array<{
    webformatURL: string;
    webformatWidth: 640;
    webformatHeight: 351;
  }>;
}
export async function getPostCover(image: string) {
  const url = `https://pixabay.com/api/?key=${process.env['PIXABAY_KEY']}=${image}&image_type=photo`;
  const response = await fetch(url, { cache: 'no-cache' });
  const cover = (await response.json()) as PixabayResponse;
  const len = cover.hits.length;

  if (len > 0) {
    try {
      const index = Math.floor(Math.random() * (len + 1));
      return cover.hits[index].webformatURL;
    } catch (error) {
      return process.env['DEFAULT_COVER'] as string;
    }
  } else {
    return process.env['DEFAULT_COVER'] as string;
  }
}
