import { BiCategory } from 'react-icons/bi';
import Link from 'next/link';
const PostCategory = ({ categories }: { categories: string[] }) => {
  return (
    <div className=" flex gap-2 items-center">
      <BiCategory className="w-5 h-5" />
      {Array.from(new Set(categories)).map((category) => {
        return (
          <Link
            key={category}
            href={`/categories/${category}`}
            className="hover:text-foreground-secondry"
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
};

export default PostCategory;
