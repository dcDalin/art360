import * as React from 'react';

import Footer from '@/components/Footer';
import TopNav from '@/components/navigation/TopNav';
import Seo from '@/components/Seo';

export default function Layout({
  children,
  templateTitle,
  contained = false,
}: {
  children: React.ReactNode;
  templateTitle: string;
  contained?: boolean;
}) {
  return (
    <>
      <Seo templateTitle={templateTitle} />
      <TopNav />
      <div className='mb-30 h-screen bg-gray-50 pt-4'>
        <div
          className={`${
            contained ? 'mx-auto max-w-screen-xl px-2 md:px-4' : ''
          }`}
        >
          {children}
        </div>

        <Footer />
      </div>
    </>
  );
}
