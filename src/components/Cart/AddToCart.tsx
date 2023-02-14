import { useMutation } from '@apollo/client';
import {
  useAccessToken,
  useAuthenticationStatus,
  useUserId,
} from '@nhost/nextjs';
import router from 'next/router';
import toast from 'react-hot-toast';

import { INSERT_CART_ONE } from '@/graphql/cart/mutations';
import {
  COUNT_CART_QUANTITY,
  PRODUCT_EXISTS_IN_CART,
} from '@/graphql/cart/queries';
import { AUTH_LOGIN } from '@/routes/paths';

interface IAddToCartProps {
  productId: string;
  quantity: number;
}

export default function AddToCart({ quantity, productId }: IAddToCartProps) {
  const userId = useUserId();
  const accessToken = useAccessToken();

  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  const [insertCartOne, { loading }] = useMutation(INSERT_CART_ONE, {
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

  const handleAddToCart = async () => {
    try {
      await insertCartOne({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
        variables: { productId, quantity, userId },
      });
      toast.success(`Art has been added to cart`, { id: 'art-success' });
    } catch (error) {
      toast.error('Something went wrong, please try again', { id: 'error' });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <button
          className={`btn-primary btn-block btn ${
            loading || isLoading ? 'loading' : ''
          }`}
          onClick={handleAddToCart}
          disabled={loading || isLoading}
        >
          Add to cart
        </button>
      ) : (
        <button className='link' onClick={() => router.push(AUTH_LOGIN)}>
          Login to add to cart
        </button>
      )}
    </>
  );
}
