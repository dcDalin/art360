import * as React from 'react';

import ContainerLayout from '@/components/layout/ContainerLayout';
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
      <ContainerLayout>
        <div className='flex'>{children}</div>
      </ContainerLayout>
      <MobileBottomNav />
    </>
  );
}
