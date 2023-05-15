import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_ABOUT_BY_PK } from '@/graphql/about/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ABOUT } from '@/routes/paths';

function EditBlogsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error } = useQuery(READ_ABOUT_BY_PK, {
    variables: { path: id },
  });

  return (
    <AdminLayout templateTitle='Edit About Page'>
      <AdminCrudLayout title='Edit About Page' previousLink={ADMIN_ABOUT}>
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>About not found</p>
        ) : (
          // <EditBlogsProvider data={data.blogs_by_pk} />
          <>Under construction... Coming soon</>
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditBlogsPage);
