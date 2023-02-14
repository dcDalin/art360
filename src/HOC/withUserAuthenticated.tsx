import { useAuthenticationStatus } from '@nhost/nextjs';
import { useRouter } from 'next/router';
import { FC } from 'react';

import TableLoader from '@/components/loaders/TableLoader';

import { AUTH_LOGIN } from '@/routes/paths';

type withUserAuthenticatedFn = (Component: FC) => FC;

const withUserAuthenticated: withUserAuthenticatedFn = (Component) => {
  const Authenticated: FC = (props): JSX.Element | null => {
    const { isAuthenticated, isLoading } = useAuthenticationStatus();
    const router = useRouter();

    if (isLoading) return <TableLoader width='full' />;

    if (isAuthenticated) {
      return <Component {...props} />;
    }

    router.push(AUTH_LOGIN);
    return null;
  };

  return Authenticated;
};

export default withUserAuthenticated;
