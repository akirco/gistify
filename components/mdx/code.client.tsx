'use client';

import { ComponentProps, FC, createRef, useEffect, useState } from 'react';
import { CopyButton } from './copybutton';
import cn from '@/libs/utils/cn';

interface CodeProps extends ComponentProps<'code'> {
  title: string;
}

export const Codeblock: FC<CodeProps> = ({
  title,
  className,
  children,
  ...props
}) => {
  const [codeText, setCodetext] = useState('');
  const codeblockRef = createRef<HTMLElement>();
  useEffect(() => {
    if (codeblockRef.current) {
      setCodetext(codeblockRef.current.textContent || '');
    }
  }, [codeblockRef]);
  return (
    <>
      <span className="w-full flex items-center justify-between bg-background-codeblock border-b-0  rounded-tl-md rounded-tr-md  border border-border-primary px-4 py-2">
        <p></p>
        <p className="items-start">{title}</p>
        <CopyButton text={codeText} />
      </span>
      <code
        ref={codeblockRef}
        className={cn(
          'relative rounded-bl-md rounded-br-md px-[0.3rem] py-[0.2rem] font-mono text-sm  border border-border-primary',
          className
        )}
        {...props}
      >
        {children}
      </code>
    </>
  );
};
