import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/nextjs';
import router from 'next/router';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';

import { DELETE_ABOUT } from '@/graphql/about/mutations';
import { READ_ALL_ABOUT } from '@/graphql/about/queries';
import { ADMIN_ABOUT } from '@/routes/paths';

interface IDeleteAboutProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function DeleteAboutProvider({
  data,
}: IDeleteAboutProviderProps) {
  const accessToken = useAccessToken();

  const { path } = data;

  const [deleteAbout, { loading }] = useMutation(DELETE_ABOUT, {
    refetchQueries: [{ query: READ_ALL_ABOUT }],
  });

  const handleDelete = async () => {
    try {
      await deleteAbout({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { path },
      });
      toast.success('About deleted', { id: 'artist-deleted' });
      router.replace(ADMIN_ABOUT, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <div>
        <div>Are you sure you want to delete about</div>
        <h4 className='pl-4 font-bold'>{path}</h4>

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
