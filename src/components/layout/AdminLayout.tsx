import AdminMenuItem from '@/components/navigation/AdminMenuItem';
import AdminTopNav from '@/components/navigation/AdminTopNav';
import Seo from '@/components/Seo';

interface IAdminLayoutProps {
  children: React.ReactNode;
  templateTitle: string;
}

export default function AdminLayout({
  children,
  templateTitle,
}: IAdminLayoutProps) {
  return (
    <>
      <Seo templateTitle={templateTitle} />

      <div className='flex justify-between'>
        <div className='w-1/6'>
          <AdminMenuItem />
        </div>

        <div className='min-h-screen w-5/6 bg-gray-50 px-1 md:px-4'>
          <AdminTopNav />
          <div className='divider m-0'></div>
          {children}
        </div>
      </div>
    </>
  );
}
