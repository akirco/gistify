import { cache } from 'react';

export const getBaseUrl = cache(() =>
  process.env.VERCEL_URL
    ? `https://gistify.extrameta.cn`
    : `http://localhost:${process.env.PORT ?? 3000}`
);
