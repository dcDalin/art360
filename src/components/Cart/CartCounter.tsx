import { useQuery } from '@apollo/client';
import { useAccessToken, useUserId } from '@nhost/nextjs';
import router from 'next/router';
import { BsCart3 } from 'react-icons/bs';

import TableLoader from '@/components/loaders/TableLoader';

import { COUNT_CART_QUANTITY } from '@/graphql/cart/queries';
import { CART } from '@/routes/paths';

export default function CartCounter() {
  const accessToken = useAccessToken();
  const userId = useUserId();

  const { data, loading, error } = useQuery(COUNT_CART_QUANTITY, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    variables: { _eq: userId },
  });

  if (error)
    return (
      <div onClick={() => router.push(CART)}>
        <BsCart3 className='h-5 w-5' />
      </div>
    );
  return (
    <>
      {loading ? (
        <TableLoader size='sm' />
      ) : data && data.cart_aggregate && data.cart_aggregate.aggregate ? (
        <div className='indicator' onClick={() => router.push(CART)}>
          <span className='badge-secondary badge indicator-item'>
            {data.cart_aggregate.aggregate.sum.quantity
              ? data.cart_aggregate.aggregate.sum.quantity
              : 0}
          </span>
          <BsCart3 className='h-5 w-5' />
        </div>
      ) : (
        <p>no cart</p>
      )}
    </>
  );
}
