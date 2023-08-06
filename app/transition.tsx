'use client';

import Transition from '@/components/transition';
import { usePathname } from 'next/navigation';
import { ReactNode, memo } from 'react';
const TransitionRouter = ({ children }: { children: ReactNode }) => {
  return <Transition location={usePathname()}>{children}</Transition>;
};

export default memo(TransitionRouter);
