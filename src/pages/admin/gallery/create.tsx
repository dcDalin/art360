import CreateGalleryProvider from '@/components/forms/Gallery/CreateGalleryProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_GALLERY } from '@/routes/paths';

function CreateGalleryPage() {
  return (
    <AdminLayout templateTitle='Create Gallery'>
      <AdminCrudLayout title='Create Gallery' previousLink={ADMIN_GALLERY}>
        <CreateGalleryProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateGalleryPage);
