import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import EditArtistImageProvider from '@/components/forms/Artists/EditArtistImageProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ARTIST_BY_PK } from '@/graphql/artists/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ARTISTS } from '@/routes/paths';

function EditArtistImagePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_ARTIST_BY_PK, {
    variables: { id },
  });

  return (
    <AdminLayout templateTitle='Edit Artist Image'>
      <AdminCrudLayout title='Edit Artist Image' previousLink={ADMIN_ARTISTS}>
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Artist profile not found</p>
        ) : (
          <EditArtistImageProvider data={data.artists_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditArtistImagePage);
