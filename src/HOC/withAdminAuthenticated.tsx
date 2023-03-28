import { useAuthenticationStatus, useUserData } from '@nhost/nextjs';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { HOME } from '@/routes/paths';

type withAdminAuthenticatedFn = (Component: FC) => FC;

const withAdminAuthenticated: withAdminAuthenticatedFn = (Component) => {
  const Authenticated: FC = (props): JSX.Element | null => {
    const { isAuthenticated, isLoading } = useAuthenticationStatus();
    const userData = useUserData();

    const router = useRouter();

    if (isLoading) return <>Loading...</>;

    if (
      (isAuthenticated && userData?.roles.includes('staff')) ||
      (isAuthenticated && userData?.roles.includes('staff-admin'))
    ) {
      return <Component {...props} />;
    }

    router.push(HOME);
    return null;
  };

  return Authenticated;
};

export default withAdminAuthenticated;
