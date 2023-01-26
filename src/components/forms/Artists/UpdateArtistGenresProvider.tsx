/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import AddGenre from '@/components/forms/Artists/AddGenre';
import RemoveGenre from '@/components/forms/Artists/RemoveGenre';

import {
  DELETE_ARTISTS_GENRES_PIVOT,
  INSERT_ARTISTS_GENRES_PIVOT_ONE,
} from '@/graphql/artistGenrePivot/mutations';
import { READ_ARTISTS_GENRES } from '@/graphql/artistGenrePivot/queries';

interface IUpdateArtistGenresProviderProps {
  artistGenreData: any;
  allGenresData: any;
}

export default function UpdateArtistGenresProvider({
  allGenresData,
  artistGenreData,
}: IUpdateArtistGenresProviderProps) {
  const compareIds = (obj1: any, obj2: any) => {
    return obj1.artist_genre.id === obj2.id;
  };

  const newGenres = allGenresData.filter((b: any) => {
    const indexFound = artistGenreData.findIndex((a: any) => compareIds(a, b));
    return indexFound == -1;
  });

  const [allGenres, setAllGenres] = useState(newGenres);

  const accessToken = useAccessToken();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setAllGenres(newGenres);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistGenreData]);

  const [insertArtistsGenresPivot, { loading: insertLoading }] = useMutation(
    INSERT_ARTISTS_GENRES_PIVOT_ONE,
    {
      refetchQueries: [
        { query: READ_ARTISTS_GENRES }, // DocumentNode object parsed with gql
        'fetchArtistsGenres', // Query name
      ],
    }
  );

  const [deleteArtistsGenresPivot, { loading: deleteLoading }] = useMutation(
    DELETE_ARTISTS_GENRES_PIVOT,
    {
      refetchQueries: [
        { query: READ_ARTISTS_GENRES }, // DocumentNode object parsed with gql
        'fetchArtistsGenres', // Query name
      ],
    }
  );

  const handleAddGenre = async (genreId: string) => {
    try {
      await insertArtistsGenresPivot({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { artistId: id, genreId },
      });
      toast.success(`Genre has been added to user`, { id: 'artist-success' });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  const handleRemoveGenre = async (id: string) => {
    try {
      await deleteArtistsGenresPivot({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id },
      });
      toast.success(`Genre has been removed from user`, {
        id: 'artist-success',
      });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div>
      {artistGenreData && artistGenreData.length ? (
        <RemoveGenre
          genreData={artistGenreData}
          handleClick={handleRemoveGenre}
          loading={deleteLoading}
        />
      ) : (
        <p className='py-4'>No genres assigned</p>
      )}
      <div className='divider'></div>
      {allGenres && allGenres.length ? (
        <div>
          <h4>Add genres</h4>
          <AddGenre
            genreData={allGenres}
            handleClick={handleAddGenre}
            loading={insertLoading}
          />
        </div>
      ) : (
        <p>All genres added to artist</p>
      )}
    </div>
  );
}
