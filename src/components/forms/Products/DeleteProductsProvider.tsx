import { useMutation } from '@apollo/client';
import { useAccessToken } from '@nhost/react';
import router from 'next/router';
import toast from 'react-hot-toast';
import { CiWarning } from 'react-icons/ci';

import { DELETE_PRODUCT_BY_PK } from '@/graphql/products/mutation';
import { FETCH_PRODUCTS } from '@/graphql/products/queries';
import { ADMIN_STORE_PRODUCTS } from '@/routes/paths';

interface IDeleteCategoriesproviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function DeleteProductsProvider({
  data,
}: IDeleteCategoriesproviderProps) {
  const accessToken = useAccessToken();

  const { id, name } = data;

  const [deleteProductByPk, { loading }] = useMutation(DELETE_PRODUCT_BY_PK, {
    refetchQueries: [{ query: FETCH_PRODUCTS }],
  });

  const handleDelete = async () => {
    try {
      await deleteProductByPk({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id },
      });
      toast.success('Product deleted', { id: 'product-deleted' });
      router.replace(ADMIN_STORE_PRODUCTS, undefined, { shallow: true });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  if (!data) return <p>No product found</p>;

  return (
    <div className='max-w-4xl'>
      <div>
        <div>Are you sure you want to delete product</div>
        <h4 className='pl-4 font-bold'>{name}</h4>

        <div className='flex items-center space-x-2 py-4 text-sm font-bold text-red-800'>
          <CiWarning />
          <span>Make sure no orders have been made for this product</span>
        </div>

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
