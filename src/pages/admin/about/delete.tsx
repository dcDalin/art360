import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import DeleteAboutProvider from '@/components/forms/About/DeleteAboutProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ABOUT_BY_PK } from '@/graphql/about/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ABOUT } from '@/routes/paths';

function DeleteAboutPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_ABOUT_BY_PK, {
    variables: { path: id },
  });

  return (
    <AdminLayout templateTitle='Delete About'>
      <AdminCrudLayout title='Delete About' previousLink={ADMIN_ABOUT}>
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>About not found</p>
        ) : data && data.about_by_pk ? (
          <DeleteAboutProvider data={data.about_by_pk} />
        ) : (
          <p>About with specified path not found</p>
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(DeleteAboutPage);
