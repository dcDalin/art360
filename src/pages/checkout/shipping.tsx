/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { useAccessToken, useUserId } from '@nhost/react';

import EditShippingDetailsProvider from '@/components/forms/ShippingDetails/EditShippingDetailsProvider';
import Layout from '@/components/layout/Layout';
import SectionWrapper from '@/components/layout/SectionWrapper';
import TableLoader from '@/components/loaders/TableLoader';

import { FETCH_USER_PROFILE } from '@/graphql/userProfile/queries';
import withUserAuthenticated from '@/HOC/withUserAuthenticated';

function CartPage() {
  const userId = useUserId();
  const accessToken = useAccessToken();

  const {
    data: userProfileData,
    loading: userProfileLoading,
    error,
  } = useQuery(FETCH_USER_PROFILE, {
    context: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    variables: { id: userId },
  });

  if (error) return <p>Could not get user profile</p>;

  return (
    <Layout templateTitle='Shipping details'>
      {userProfileLoading ? (
        <TableLoader width='full' />
      ) : (
        <SectionWrapper heading='Shipping details' backButton path='/cart'>
          <EditShippingDetailsProvider
            data={userProfileData.user_profile_by_pk}
          />
        </SectionWrapper>
      )}
    </Layout>
  );
}

export default withUserAuthenticated(CartPage);
