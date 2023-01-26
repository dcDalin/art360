import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import router from 'next/router';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';

import { DELETE_CATEGORIES } from '@/graphql/categories/mutations';
import { READ_CATEGORIES } from '@/graphql/categories/queries';
import { ADMIN_STORE_CATEGORIES } from '@/routes/paths';

interface IDeleteCategoriesproviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function DeleteCategoriesProvider({
  data,
}: IDeleteCategoriesproviderProps) {
  const accessToken = useAccessToken();

  const { id, name } = data;

  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORIES, {
    refetchQueries: [{ query: READ_CATEGORIES }],
  });

  const handleDelete = async () => {
    try {
      await deleteCategory({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id },
      });
      toast.success('Product category deleted', { id: 'artist-deleted' });
      router.replace(ADMIN_STORE_CATEGORIES, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='max-w-4xl'>
      <div>
        <div>Are you sure you want to delete product category</div>
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
