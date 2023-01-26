import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import GenreArtistsProvider from '@/components/forms/Artists/GenreArtistsProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ARTISTS_GENRES } from '@/graphql/artistGenrePivot/queries';
import { READ_ARTIST_BY_PK } from '@/graphql/artists/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ARTISTS } from '@/routes/paths';

function GenresArtistsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { loading: artistLoading, data: artistProfileData } = useQuery(
    READ_ARTIST_BY_PK,
    {
      variables: { id },
    }
  );

  const {
    data: artistGenreData,
    loading: artistGenreLoading,
    error,
  } = useQuery(READ_ARTISTS_GENRES, {
    variables: { _eq: id },
  });

  return (
    <AdminLayout templateTitle='Artist Genres'>
      <AdminCrudLayout title='Artist Genres' previousLink={ADMIN_ARTISTS}>
        {artistGenreLoading || artistLoading ? (
          <TableLoader />
        ) : error ? (
          <p>Artist profile not found</p>
        ) : (
          <GenreArtistsProvider
            artistProfileData={artistProfileData.artists_by_pk}
            artistGenreData={artistGenreData.artists_genres_pivot}
          />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(GenresArtistsPage);
