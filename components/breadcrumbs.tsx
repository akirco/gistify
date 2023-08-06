'use client';

import Link from 'next/link';
import { FC, createRef, useEffect } from 'react';
import { RxSlash } from 'react-icons/rx';

interface BreadcrumbsProps {
  links: Array<{
    href: string;
    title: string;
  }>;
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ links }) => {
  const breadcrumbsRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleScroll = () => {
      if (breadcrumbsRef.current) {
        if (window.scrollY > breadcrumbsRef.current.scrollHeight!) {
          breadcrumbsRef.current.className =
            'fixed left-3 bottom-20 sm:left-[24%] sm:bottom-5 z-[40] px-5 py-2 shadow-lg rounded-md flex items-center bg-transparent backdrop-blur-md transition-all';
        } else {
          breadcrumbsRef.current.className =
            'flex items-center px-5 py-2 m-auto transition-all rounded-md shadow-lg bg-background-secondry';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [breadcrumbsRef]);
  return (
    <div
      ref={breadcrumbsRef}
      className="flex items-center px-5 py-2 m-auto transition-all rounded-md shadow-lg bg-background-secondry"
    >
      {links.map((link, index) => {
        if (index + 1 === links.length) {
          return (
            <p key={link.title + index}>
              <Link href={link.href} className=" hover:text-blue-500">
                {link.title}
              </Link>
            </p>
          );
        }

        return (
          <p key={link.title + index} className="flex items-center">
            <Link href={link.href} className=" hover:text-blue-500">
              {link.title}
            </Link>
            <RxSlash />
          </p>
        );
      })}
    </div>
  );
};
