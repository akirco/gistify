import cn from '@/libs/utils/cn';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { FiExternalLink } from 'react-icons/fi';

const isInternal = (href?: string): href is string =>
  !!href?.startsWith('/') || !!href?.startsWith('#');
export const Anchor = ({
  className,
  href,
  children,
  ...props
}: ComponentProps<'a'>) => {
  const classes = cn(
    'font-medium underline underline-offset-4 cursor-pointer sm:flex items-center text-blue-500',
    className
  );
  if (isInternal(href)) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={classes}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      <FiExternalLink className=" text-blue-500" />
    </a>
  );
};
