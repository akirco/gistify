import '../styles/globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Providers from './providers';
import ScrollToTop from '@/components/scrolltotop';
import TransitionRouter from './transition';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: 'Gistify',
    template: 'Gistify | %s',
  },
  description: 'A blog base on next.js and gists.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex flex-col w-full h-full">
            <Navbar />
            <TransitionRouter>{children}</TransitionRouter>
            <footer className="flex flex-col items-center justify-between px-2 py-10 sm:px-20 text-foreground-secondry sm:flex-row">
              <p>© 2023 akirco</p>
              <p className="flex gap-2">
                Powered by
                <Link href={'https://nextjs.org/'} target="_blank">
                  Next.js
                </Link>
                &
                <Link href={'https://gist.github.com/'} target="_blank">
                  Gist
                </Link>
              </p>
            </footer>
          </div>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
