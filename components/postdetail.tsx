import type { PostResponse } from '@/libs/utils/post-processor';
import { FC, Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { customMDX } from './custommdx';
import { PrevPost } from './prevpost';
import { PostSkeleton } from './postsskeleton';
import { OauthComment } from './oauthcomment';

const Details: FC<{ data: PostResponse }> = async ({ data }) => {
  return (
    <div className="flex flex-col w-full gap-5 ">
      <div className="w-full md:w-[80%] lg:w-[70%] mx-auto p-5 rounded shadow-lg bg-background-secondry">
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-center scroll-m-20">
          {data.name}
        </h1>
        <div className="flex justify-center gap-5 py-5 text-foreground-secondry">
          <p>created at {data.created}</p>
          <p>updated at {data.updated}</p>
        </div>
        <Suspense fallback={<PostSkeleton />}>
          {data.postContent.map((file) => {
            return (
              <MDXRemote
                key={file?.title}
                source={file?.content}
                components={customMDX.components}
                options={customMDX.options}
              />
            );
          })}
        </Suspense>
      </div>
      <div className="w-full md:w-[80%] lg:w-[70%] mx-auto p-5 rounded shadow-lg bg-background-secondry flex justify-evenly">
        <Suspense fallback={<>loading...</>}>
          <PrevPost id={data.id} />
        </Suspense>
      </div>
      <div className="w-full md:w-[80%] lg:w-[70%] mx-auto p-5 rounded shadow-lg bg-background-secondry flex flex-col gap-4">
        <OauthComment id={data.id} />
      </div>
    </div>
  );
};

export default Details;
