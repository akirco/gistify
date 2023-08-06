import Details from '@/components/postdetail';
import { getPostById } from '@/libs/utils/post-processor';

export default async function Article({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  return (
    <div className="w-full p-5 flex">
      <Details data={post} />
    </div>
  );
}
