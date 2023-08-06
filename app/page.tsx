import Posts from '@/components/posts';

export default async function Home() {
  return (
    <main className="py-5 px-5 w-full flex-1 m-auto gap-6 flex flex-col">
      <Posts />
    </main>
  );
}
