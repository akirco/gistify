'use client';
import { useState } from 'react';
import PostCover from './postcover';
import Link from 'next/link';
import PostCategory from './postcategory';
import PostTags from './posttag';
import { useFetchTotal, useFetchPosts } from '@/libs/hooks/use-fetch-posts';
import { PostSkeleton } from './postsskeleton';

const Posts = () => {
  const [pageCount, setPageCount] = useState(0);
  const { data: articles, isLoading } = useFetchPosts(pageCount);
  const { data: total } = useFetchTotal();
  if (isLoading) {
    return <PostSkeleton />;
  }
  return (
    <>
      {articles?.map((article) => {
        return (
          <div
            key={article.id}
            className="flex flex-col gap-3 p-6 m-auto rounded-lg bg-background-secondry"
          >
            <Link
              className="text-xl hover:text-foreground-secondry"
              href={`article/${article.id}`}
            >
              {article.title}
            </Link>
            <h4 className="text-foreground-secondry">
              created at {article.created}
            </h4>
            <PostCover cover={JSON.parse(`${article.cover}`)} />
            <div className="flex justify-between">
              <PostCategory categories={JSON.parse(`${article.categories}`)} />
              <PostTags tags={JSON.parse(`${article.tags}`)} />
            </div>
          </div>
        );
      })}

      <div className="flex items-end justify-center col-start-2 gap-5">
        <button
          disabled={pageCount === 0}
          onClick={() => setPageCount(pageCount - 1)}
          className={`px-3 py-1 rounded-lg bg-background-secondry text-foreground-secondry ${
            pageCount === 0 ? 'hidden' : ''
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPageCount(pageCount + 1)}
          disabled={total && +total.count - pageCount * 10 - 10 <= 0}
          className={`px-3 py-1 rounded-md bg-background-secondry text-foreground-secondry ${
            total && +total.count - pageCount * 10 - 10 <= 0 ? 'hidden' : ''
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Posts;
