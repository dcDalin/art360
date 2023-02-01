import * as React from 'react';

import ContainerLayout from '@/components/layout/ContainerLayout';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/navigation/MobileBottomNav';
import TopNav from '@/components/navigation/TopNav';
import Seo from '@/components/Seo';

export default function Layout({
  children,
  templateTitle,
}: {
  children: React.ReactNode;
  templateTitle: string;
}) {
  // Put Header or Footer Here
  return (
    <>
      <Seo templateTitle={templateTitle} />
      <TopNav />
      <div className='h-screen bg-gray-50'>
        <ContainerLayout>
          <div>{children}</div>
        </ContainerLayout>
      </div>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
