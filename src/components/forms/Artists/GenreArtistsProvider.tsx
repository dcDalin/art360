/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';

import UpdateArtistGenresProvider from '@/components/forms/Artists/UpdateArtistGenresProvider';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ARTIST_GENRES } from '@/graphql/artistGenre/queries';

interface IGenreArtistsProviderProps {
  artistGenreData: any;
  artistProfileData: any;
}

export default function GenreArtistsProvider({
  artistGenreData,
  artistProfileData,
}: IGenreArtistsProviderProps) {
  const { firstName, lastName, nickName } = artistProfileData;

  const {
    data: genreData,
    loading: genreLoading,
    error: genreError,
  } = useQuery(READ_ARTIST_GENRES);

  return (
    <div className='max-w-4xl'>
      <h4 className='text-bold text-2xl'>{`${firstName} ${lastName} - ${nickName}'s genres`}</h4>
      {genreLoading ? (
        <TableLoader />
      ) : genreData &&
        genreData.artist_genres &&
        genreData.artist_genres.length ? (
        <UpdateArtistGenresProvider
          artistGenreData={artistGenreData}
          allGenresData={genreData.artist_genres}
        />
      ) : genreError ? (
        <p>Could not fetch artist genres</p>
      ) : genreData &&
        genreData.artist_genres &&
        genreData.artist_genres.length === 0 ? (
        <p className='py-4 font-bold text-red-900'>
          No genres found. Please add artist genres.
        </p>
      ) : null}
    </div>
  );
}
