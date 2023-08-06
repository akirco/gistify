import { Breadcrumbs } from '@/components/breadcrumbs';
import PostCategory from '@/components/postcategory';
import PostCover from '@/components/postcover';
import PostTags from '@/components/posttag';
import { getPostsByTag } from '@/libs/utils/postgres';
import Link from 'next/link';

export default async function Tags({ params }: { params: { name: string } }) {
  const posts = await getPostsByTag(params.name);
  const links = [
    {
      href: '/',
      title: 'home',
    },
    {
      href: '/tags',
      title: 'tags',
    },
    {
      href: '#',
      title: params.name,
    },
  ];
  return (
    <div className="flex flex-col w-full gap-5 px-2 py-6">
      <Breadcrumbs links={links} />
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto p-5 rounded shadow-lg bg-background-secondry flex flex-col gap-5">
        {posts?.map((post) => {
          return (
            <div
              key={post.id}
              className="flex flex-col items-center px-5 py-3 border rounded-lg border-border-primary sm:justify-between sm:flex-row"
            >
              <PostCover
                cover={JSON.parse(`${post.cover}`)}
                className="w-[300px] h-[180px] object-cover rounded-lg"
              />
              <div className="flex flex-col items-center gap-5 sm:items-end">
                <Link
                  className="text-xl hover:text-foreground-secondry"
                  href={`/article/${post.id}`}
                >
                  {post.title}
                </Link>
                <p>{post.created}</p>
                <PostTags tags={JSON.parse(`${post.tags}`)} />
                <PostCategory categories={JSON.parse(`${post.categories}`)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
