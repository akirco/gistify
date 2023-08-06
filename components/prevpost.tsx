import { getPre, getPost } from '@/libs/utils/postgres';
import Link from 'next/link';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

export const PrevPost = async ({ id }: { id: string }) => {
  const preData = await getPre(id);
  const postData = await getPost(id);
  return (
    <>
      <Link
        className={`flex gap-2 items-center p-1 rounded-md bg-background-primary ${
          postData?.id ? '' : 'hidden'
        }`}
        href={`${postData?.id}`}
      >
        <MdNavigateBefore />
        {postData?.title}
      </Link>

      <Link
        className={`flex gap-2 items-center p-1 rounded-md bg-background-primary ${
          preData?.id ? '' : 'hidden'
        }`}
        href={`${preData?.id}`}
      >
        {preData?.title}
        <MdNavigateNext />
      </Link>
    </>
  );
};
