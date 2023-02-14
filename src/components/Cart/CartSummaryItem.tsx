import { useMutation } from '@apollo/client';
import { useAccessToken, useUserId } from '@nhost/react';
import toast from 'react-hot-toast';

import RemoveFromCart from '@/components/Cart/RemoveFromCart';
import NextImage from '@/components/NextImage';

import { UPDATE_CART_QUANTITY } from '@/graphql/cart/mutations';
import {
  COUNT_CART_QUANTITY,
  PRODUCT_EXISTS_IN_CART,
} from '@/graphql/cart/queries';

interface ICartSummaryItem {
  cartItemId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  productQuantity: number;
}

export default function CartSummaryItem({
  productId,
  productName,
  productPrice,
  productImageUrl,
  productQuantity,
  cartItemId,
}: ICartSummaryItem) {
  const userId = useUserId();
  const accessToken = useAccessToken();

  const [updateCartQuantity, { loading }] = useMutation(UPDATE_CART_QUANTITY, {
    refetchQueries: [
      {
        query: COUNT_CART_QUANTITY,
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { _eq: userId },
      },
      {
        query: PRODUCT_EXISTS_IN_CART,
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { _eq: userId, _eq1: productId },
      },
    ],
  });

  const handleUpdateCartQuantity = async (quantity: number) => {
    try {
      await updateCartQuantity({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { id: cartItemId, quantity },
      });
      toast.success(`Quantity updated`, { id: 'quantity-success' });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <div className='border-b border-gray-300 py-4'>
      <div className='flex items-center space-x-4 py-2'>
        <NextImage
          imgClassName='w-24 h-24 object-cover'
          src={productImageUrl}
          alt='artist'
          width={96}
          height={96}
        />
        <div className='w-full'>{productName}</div>
        <div className='flex flex-col items-end'>
          <div className='font-semibold'>Ksh.</div>
          <div className='text-3xl font-bold'>{`${productPrice.toLocaleString()}`}</div>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <RemoveFromCart small={true} productId={productId} />
        <div className='flex items-center space-x-2'>
          <button
            className='btn-outline btn-sm btn'
            disabled={productQuantity <= 1 || loading}
            onClick={() => handleUpdateCartQuantity(productQuantity - 1)}
          >
            -
          </button>
          <div>{productQuantity}</div>
          <button
            className='btn-outline btn-sm btn'
            onClick={() => handleUpdateCartQuantity(productQuantity + 1)}
            disabled={loading}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
