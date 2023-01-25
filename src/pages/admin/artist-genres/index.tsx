import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import ArtistGenresTable from '@/components/tables/ArtistGenresTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function ArtistGenresPage() {
  return (
    <AdminLayout templateTitle='Artist Genres'>
      <AdminCrudLayout title='Artist Genres' createButton>
        <ArtistGenresTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(ArtistGenresPage);
