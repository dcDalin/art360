import CreateArtistProvider from '@/components/forms/Artists/CreateArtistProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ARTISTS } from '@/routes/paths';

function CreateArtistPage() {
  return (
    <AdminLayout templateTitle='Create Artist'>
      <AdminCrudLayout title='Create Artist' previousLink={ADMIN_ARTISTS}>
        <CreateArtistProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateArtistPage);
