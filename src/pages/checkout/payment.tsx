/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useAccessToken, useUserId } from '@nhost/nextjs';

import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import TableLoader from '@/components/loaders/TableLoader';
import Mpesa from '@/components/Mpesa';

import { CART_SUMMARY } from '@/graphql/cart/queries';
import withUserAuthenticated from '@/HOC/withUserAuthenticated';

function PaymentPage() {
  const userId = useUserId();
  const accessToken = useAccessToken();
  let subTotal = 0;

  const { data, loading } = useQuery(CART_SUMMARY, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    variables: { _eq: userId },
  });

  return (
    <Layout templateTitle='Payment'>
      <SectionWrapper heading='Payment' backButton path='/checkout/shipping'>
        {loading ? (
          <TableLoader width='full' />
        ) : data && data.cart ? (
          <div>
            {data.cart.map(({ product, quantity }: any) => {
              const total = quantity * product.price;
              subTotal += total;
              return <></>;
            })}
            <div>
              <div>
                <div className='stats shadow'>
                  <div className='stat'>
                    <div className='stat-title'>Sub total</div>
                    <div className='stat-value'>{`${subTotal.toLocaleString()}`}</div>
                  </div>
                </div>
                <div className='py-6'>
                  <h1 className='text-2xl font-bold'>Pay using</h1>
                  <Mpesa />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </SectionWrapper>
    </Layout>
  );
}

export default withUserAuthenticated(PaymentPage);
