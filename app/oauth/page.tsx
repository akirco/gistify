'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

export default function Oauth() {
  const params = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      localStorage.setItem('oauthCode', code);
      window.close();
      return;
    }
  }, [code, params]);

  return (
    <Suspense fallback={<>loading...</>}>
      <div>Redirecting...</div>
    </Suspense>
  );
}
