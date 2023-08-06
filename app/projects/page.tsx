import { edgeConfigClient } from '@/libs/utils/edge';
import Link from 'next/link';
export default async function Projects() {
  const projects = (await edgeConfigClient.get('projects')) as Blog.Projects;
  const baseurl = 'https://github.com/akirco';
  return (
    <div className="w-full gap-5 px-2 py-6">
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto p-5 rounded shadow-lg bg-background-secondry flex flex-col sm:grid  sm:grid-cols-2 gap-5">
        {projects.map((project) => {
          return (
            <Link
              href={`${baseurl}/${project.title}`}
              key={project.title}
              target="_blank"
            >
              <div className="flex flex-col gap-2 p-5 px-5 rounded-md shadow-codeblock bg-background-primary hover:bg-blue-500">
                <p className="text-xl"> {project.title}</p>
                <p className="text-foreground-secondry">
                  {project.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
