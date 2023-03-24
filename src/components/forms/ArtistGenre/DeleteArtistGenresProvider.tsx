import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import router from 'next/router';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';

import { DELETE_ARTIST_GENRE } from '@/graphql/artistGenre/mutations';
import { READ_ARTIST_GENRES } from '@/graphql/artistGenre/queries';
import { READ_ARTISTS_GENRES } from '@/graphql/artistGenrePivot/queries';
import { ADMIN_ARTISTS_GENRES } from '@/routes/paths';

interface IEditArtistProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function DeleteArtistGenresProvider({
  data,
}: IEditArtistProviderProps) {
  const accessToken = useAccessToken();

  const { id, name } = data;

  const [deleteArtistGenre, { loading }] = useMutation(DELETE_ARTIST_GENRE, {
    refetchQueries: [
      { query: READ_ARTIST_GENRES },
      { query: READ_ARTISTS_GENRES },
    ],
  });

  const handleDelete = async () => {
    try {
      await deleteArtistGenre({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id },
      });
      toast.success('Artist genre deleted', { id: 'artist-deleted' });
      router.replace(ADMIN_ARTISTS_GENRES, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <div>
        <div>Are you sure you want to delete artist genre </div>
        <h4 className='pl-4 font-bold'>{name}</h4>
        <div className='flex items-center space-x-2 py-4 text-sm font-bold text-red-800'>
          <CiWarning />
          <span>This action can not be reversed!</span>
        </div>
      </div>
      <button
        className={`btn-error btn my-2 ${loading ? 'loading' : ''}`}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
