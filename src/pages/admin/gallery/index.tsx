import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import GalleryTable from '@/components/tables/GalleryTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function GalleryPage() {
  return (
    <AdminLayout templateTitle='Gallery'>
      <AdminCrudLayout title='Gallery' createButton>
        <GalleryTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(GalleryPage);
