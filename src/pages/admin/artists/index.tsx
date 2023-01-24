import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import ArtistsTable from '@/components/tables/ArtistsTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function ArtistsPage() {
  return (
    <AdminLayout templateTitle='Artists'>
      <AdminCrudLayout title='Artists' createButton>
        <ArtistsTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(ArtistsPage);
