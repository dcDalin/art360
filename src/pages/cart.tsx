/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useAccessToken, useUserId } from '@nhost/react';

import nhost from '@/lib/nhost';

import CartSummaryItem from '@/components/Cart/CartSummaryItem';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import TableLoader from '@/components/loaders/TableLoader';

import { CART_SUMMARY } from '@/graphql/cart/queries';
import withUserAuthenticated from '@/HOC/withUserAuthenticated';

function CartPage() {
  let subTotal = 0;
  const userId = useUserId();
  const accessToken = useAccessToken();

  const { data, loading } = useQuery(CART_SUMMARY, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    variables: { _eq: userId },
  });

  return (
    <Layout templateTitle='Cart'>
      <SectionWrapper heading='Cart'>
        <div className='p-0 md:p-4'>
          {loading ? (
            <TableLoader width='full' />
          ) : data && data.cart ? (
            <div className='flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-8 md:space-y-0'>
              <div className='w-full rounded-md bg-base-100 p-4'>
                {data.cart.map(({ id, product, quantity }: any) => {
                  const productImageUrl = nhost.storage.getPublicUrl({
                    fileId: product.product_images[0].imageId,
                  });

                  const total = quantity * product.price;
                  subTotal += total;
                  return (
                    <CartSummaryItem
                      key={id}
                      cartItemId={id}
                      productId={product.id}
                      productName={product.name}
                      productPrice={product.price}
                      productImageUrl={productImageUrl}
                      productQuantity={quantity}
                    />
                  );
                })}
              </div>
              <div className='w-full pb-20 md:w-96'>
                <div className='text-xl font-bold'>Cart Summary</div>
                <div className='py-2'>
                  <div className='mb-4 flex items-center justify-between'>
                    <div className='font-bold'>Subtotal</div>
                    <div className='text-3xl font-bold'>{`${subTotal.toLocaleString()}`}</div>
                  </div>
                  <button className='btn-primary btn-block btn'>
                    Check out
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </SectionWrapper>
    </Layout>
  );
}

export default withUserAuthenticated(CartPage);
