import Link from 'next/link';
import { FC } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import PostCategory from './postcategory';
import PostCover from './postcover';

interface TimelineProps {
  data: { [key: string]: Blog.Posts };
}

export const Timeline: FC<TimelineProps> = ({ data }) => {
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {Object.keys(data).map((time) => {
        return (
          <li key={time} className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {time}
            </time>
            {data[time].map((post) => {
              return (
                <article key={post.id}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  <Link
                    href={`/article/${post.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                  >
                    Read more
                    <FiArrowRight />
                  </Link>
                  <hr className="mt-3 bg-border-primary h-[1px] border-none" />
                </article>
              );
            })}
          </li>
        );
      })}
    </ol>
  );
};
