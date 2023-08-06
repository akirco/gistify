import { getCategories } from '@/libs/utils/postgres';
import Link from 'next/link';

export default async function Categories() {
  const categories = await getCategories();
  const categoriesArray = categories
    ?.map((item) => JSON.parse(item.categories))
    .flat();
  const categoriesMap = categoriesArray?.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {}) as { [key: string]: number };

  return (
    <div className="w-full gap-5 px-2 py-6">
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto p-5 rounded shadow-lg bg-background-secondry flex flex-col gap-5">
        <h1 className="text-3xl font-bold tracking-tight text-center scroll-m-20">
          Categories
        </h1>
        {Object.keys(categoriesMap).map((category) => {
          return (
            <div
              key={category}
              className="flex flex-col items-center px-5 py-3 border rounded-lg border-border-primary sm:justify-between sm:flex-row hover:bg-background-hover"
            >
              <Link
                className="px-2 py-1 rounded-3xl bg-background-highlight"
                href={`/categories/${category}`}
              >
                {category}
              </Link>
              <p className="px-2 py-1 rounded-3xl bg-background-highlight">
                {categoriesMap[category]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
