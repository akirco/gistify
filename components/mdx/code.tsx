import cn from '@/libs/utils/cn';
import React, { ComponentProps } from 'react';
import { Codeblock } from './code.client';

export const Code = ({
  className,
  children,
  ...props
}: ComponentProps<'code'>) => {
  const regex = /hljs language-(\w+)/;
  if (className) {
    const match = className.match(regex);
    if (match) {
      return (
        <Codeblock title={match[1]} className={cn(className)} {...props}>
          {children}
        </Codeblock>
      );
    }
  }
  return (
    <code
      className={cn(
        'relative rounded-md px-[0.3rem] py-[0.2rem] font-mono text-sm shadow-codeblock bg-background-code',
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
};
