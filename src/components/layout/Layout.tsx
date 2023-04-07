import * as React from 'react';

import Footer from '@/components/Footer';
import ContainerLayout from '@/components/layout/ContainerLayout';
import TopNav from '@/components/navigation/TopNav';
import Seo from '@/components/Seo';

export default function Layout({
  children,
  templateTitle,
}: {
  children: React.ReactNode;
  templateTitle: string;
}) {
  return (
    <>
      <Seo templateTitle={templateTitle} />
      <TopNav />
      <div className='mb-30 h-screen bg-gray-50 pt-4'>
        <ContainerLayout>
          <div>{children}</div>
        </ContainerLayout>
        <Footer />
      </div>
    </>
  );
}
