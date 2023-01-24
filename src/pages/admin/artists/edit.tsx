import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import EditArtistProvider from '@/components/forms/Artists/EditArtistProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ARTIST_BY_PK } from '@/graphql/artists/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ARTISTS } from '@/routes/paths';

function EditArtistsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_ARTIST_BY_PK, {
    variables: { id },
  });

  return (
    <AdminLayout templateTitle='Edit Artist'>
      <AdminCrudLayout
        title='Edit Artist'
        previousLink={ADMIN_ARTISTS}
        deleteButton
      >
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Artist profile not found</p>
        ) : (
          <EditArtistProvider data={data.artists_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditArtistsPage);
