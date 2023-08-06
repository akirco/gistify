import { FaTags } from 'react-icons/fa';
import Link from 'next/link';
const PostTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className=" flex gap-2 items-center">
      <FaTags className="w-5 h-5" />
      {Array.from(new Set(tags)).map((tag) => {
        return (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className=" hover:text-foreground-secondry"
          >
            {tag}
          </Link>
        );
      })}
    </div>
  );
};

export default PostTags;
