import { Timeline } from '@/components/timeline';
import { getArchives } from '@/libs/utils/postgres';
import moment from 'moment';

export default async function Archives() {
  const archives = await getArchives();
  const result: { [key: string]: Blog.Posts } = {};
  archives.map((archive) => {
    const time = moment(archive.created).format('YYYY-MM');
    if (result[time]) {
      result[time].push(archive);
    } else {
      result[time] = [archive];
    }
  });

  return (
    <>
      <div className="flex flex-col gap-5 w-full px-2 py-6">
        <div className="w-full md:w-[80%] lg:w-[60%] mx-auto p-5 rounded shadow-lg bg-background-secondry flex flex-col gap-5">
          <Timeline data={result} />
        </div>
      </div>
    </>
  );
}
