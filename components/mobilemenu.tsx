'use client';
import cn from '@/libs/utils/cn';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import Link from 'next/link';

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MdMenu
        className="block w-6 h-6 sm:hidden"
        onClick={() => setOpen(!open)}
      />
      <Link
        href={'/'}
        className={cn(
          open ? 'hidden' : 'block',
          'sm:block hover:underline hover:text-blue-500'
        )}
      >
        Gistify
      </Link>
      <div
        className={cn(
          open ? 'flex' : 'hidden',
          `flex-col gap-5 sm:flex sm:flex-row px-4 child-hover:underline child-hover:text-blue-500`
        )}
      >
        <Link href={'/categories'}>Categories</Link>
        <Link href={'/tags'}>Tags</Link>
        <Link href={'/archives'}>Archives</Link>
        <Link href={'/about'}>About</Link>
        <Link href={'/projects'}>Projects</Link>
      </div>
    </>
  );
};
