import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import router from 'next/router';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';

import { DELETE_SPONSOR } from '@/graphql/sponsors/mutations';
import { READ_SPONSORS } from '@/graphql/sponsors/queries';
import { ADMIN_SPONSORS } from '@/routes/paths';

interface IEditArtistProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function DeleteSponsorProvider({
  data,
}: IEditArtistProviderProps) {
  const accessToken = useAccessToken();

  const { id, title } = data;

  const [deleteSponsor, { loading }] = useMutation(DELETE_SPONSOR, {
    refetchQueries: [{ query: READ_SPONSORS }, 'readSponsors'],
  });

  const handleDelete = async () => {
    try {
      await deleteSponsor({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id },
      });
      toast.success('Sponsor deleted', { id: 'artist-deleted' });
      router.replace(ADMIN_SPONSORS, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <div>
        <div>Are you sure you want to delete sponsor </div>
        <h4 className='pl-4 font-bold'>{title}</h4>
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
