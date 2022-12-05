import * as React from 'react';

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
      {children}
    </>
  );
}
