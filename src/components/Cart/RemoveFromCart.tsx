import { useMutation } from '@apollo/client';
import { useAccessToken, useUserId } from '@nhost/nextjs';
import toast from 'react-hot-toast';
import { BsCartXFill } from 'react-icons/bs';

import { DELETE_FROM_CART } from '@/graphql/cart/mutations';
import {
  COUNT_CART_QUANTITY,
  PRODUCT_EXISTS_IN_CART,
} from '@/graphql/cart/queries';

interface IRemoveFromCartProps {
  productId: string;
  small?: boolean;
}

export default function RemoveFromCart({
  productId,
  small = false,
}: IRemoveFromCartProps) {
  const userId = useUserId();
  const accessToken = useAccessToken();

  const [deleteFromCart, { loading }] = useMutation(DELETE_FROM_CART, {
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

  const handleRemoveFromCart = async () => {
    try {
      await deleteFromCart({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { _eq: userId, _eq1: productId },
      });
      toast.success(`Art has been removed to cart`, { id: 'art-rem-success' });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <button
      className={`btn-outline btn-error btn gap-2 ${loading ? 'loading' : ''} ${
        !small ? 'btn-block' : 'btn-sm'
      }`}
      onClick={handleRemoveFromCart}
      disabled={loading}
    >
      {small ? null : <span>Remove from cart</span>}
      <BsCartXFill />
    </button>
  );
}
