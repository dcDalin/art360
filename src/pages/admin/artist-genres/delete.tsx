import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import DeleteArtistGenresProvider from '@/components/forms/ArtistGenre/DeleteArtistGenresProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ARTIST_GENRES_BY_PK } from '@/graphql/artistGenre/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ARTISTS_GENRES } from '@/routes/paths';

function DeleteArtistPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_ARTIST_GENRES_BY_PK, {
    variables: { id },
  });

  return (
    <AdminLayout templateTitle='Edit Artist Genre'>
      <AdminCrudLayout
        title='Delete Artist Genre'
        previousLink={ADMIN_ARTISTS_GENRES}
      >
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Artist genre not found</p>
        ) : (
          <DeleteArtistGenresProvider data={data.artist_genres_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(DeleteArtistPage);
