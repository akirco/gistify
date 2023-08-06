import { edgeConfigClient } from '@/libs/utils/edge';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaCodepen, FaReddit } from 'react-icons/fa';

export default async function About() {
  const about = (await edgeConfigClient.get('about')) as Blog.About;

  const titleMappings: Record<string, () => JSX.Element> = {
    contact: () => (
      <div key="contact" className="flex flex-col gap-3 ">
        <h1 className="text-3xl font-bold ">contact</h1>
        <div className="flex gap-4">
          <Link
            href={about.contact.codepen}
            target="_blank"
            className="px-2 py-2 text-xl border rounded-md hover:bg-background-primary border-border-primary backdrop-blur-md"
          >
            <FaCodepen />
          </Link>
          <Link
            href={about.contact.github}
            target="_blank"
            className="px-2 py-2 text-xl border rounded-md hover:bg-background-primary border-border-primary backdrop-blur-md"
          >
            <FaGithub />
          </Link>
          <Link
            href={about.contact.twitter}
            target="_blank"
            className="px-2 py-2 text-xl border rounded-md hover:bg-background-primary border-border-primary backdrop-blur-md"
          >
            <FaTwitter />
          </Link>
          <Link
            href={about.contact.reddit}
            target="_blank"
            className="px-2 py-2 text-xl border rounded-md hover:bg-background-primary border-border-primary backdrop-blur-md"
          >
            <FaReddit />
          </Link>
        </div>
        <p>{about.contact.email}</p>
      </div>
    ),
    site: () => (
      <div key="site">
        <h1 className="text-3xl font-bold ">site</h1>
        <p>{about.site.description}</p>
        <p>
          {about.site.features.map((fea) => {
            return <li key={fea}>{fea}</li>;
          })}
        </p>
      </div>
    ),
    technology: () => (
      <div key={'technology'}>
        <h1 className="text-3xl font-bold ">technology</h1>
        <div className="flex flex-wrap gap-2 py-5">
          {about.technology.map((r) => {
            return (
              <p
                key={r}
                className="px-3 py-1 rounded-2xl bg-background-primary"
              >
                {r}
              </p>
            );
          })}
        </div>
      </div>
    ),
  };

  return (
    <div className="flex flex-col w-full gap-5 px-2 py-6">
      <div className="w-full md:w-[80%] lg:w-[60%] mx-auto p-5 rounded shadow-lg bg-background-secondry flex flex-col gap-5">
        {Object.keys(about).map((title) => {
          const renderFunction = titleMappings[title];
          if (renderFunction) {
            return renderFunction();
          }
          return null;
        })}
      </div>
    </div>
  );
}
