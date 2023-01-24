import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import router from 'next/router';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';

import { DELETE_ARTIST } from '@/graphql/artists/mutations';
import { READ_ARTISTS } from '@/graphql/artists/queries';
import { ADMIN_ARTISTS } from '@/routes/paths';

interface IEditArtistProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function DeleteArtistProvider({
  data,
}: IEditArtistProviderProps) {
  const accessToken = useAccessToken();

  const { id, firstName, lastName, nickName } = data;

  const [deleteArtist, { loading }] = useMutation(DELETE_ARTIST, {
    refetchQueries: [{ query: READ_ARTISTS }, 'readArtists'],
  });

  const handleDelete = async () => {
    try {
      await deleteArtist({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id },
      });
      toast.success('Artist deleted', { id: 'artist-deleted' });
      router.replace(ADMIN_ARTISTS, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <div>
        <div>Are you sure you want to delete artist </div>
        <h4 className='pl-4 font-bold'>{`${firstName} ${lastName} - ${nickName}`}</h4>
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
