import { Breadcrumbs } from '@/components/breadcrumbs';
import PostCategory from '@/components/postcategory';
import PostCover from '@/components/postcover';
import PostTags from '@/components/posttag';
import { getPostsByCategory } from '@/libs/utils/postgres';
import Link from 'next/link';

export default async function Categories({
  params,
}: {
  params: { name: string };
}) {
  const posts = await getPostsByCategory(params.name);
  const links = [
    {
      href: '/',
      title: 'home',
    },
    {
      href: '/categories',
      title: 'categories',
    },
    {
      href: '#',
      title: params.name,
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full px-2 py-6">
      <Breadcrumbs links={links} />
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto p-5 rounded shadow-lg bg-background-secondry flex flex-col gap-5">
        {posts?.map((post) => {
          return (
            <div
              key={post.id}
              className="border border-border-primary px-5 py-3 rounded-lg flex flex-col items-center sm:justify-between sm:flex-row"
            >
              <PostCover
                cover={JSON.parse(`${post.cover}`)}
                className="w-[300px] h-[180px] object-cover rounded-lg"
              />
              <div className="flex flex-col gap-5 items-center sm:items-end">
                <Link
                  className="text-xl hover:text-foreground-secondry"
                  href={`/article/${post.id}`}
                >
                  {post.title}
                </Link>
                <p>{post.created}</p>
                <PostCategory categories={JSON.parse(`${post.categories}`)} />
                <PostTags tags={JSON.parse(`${post.tags}`)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
