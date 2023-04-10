import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_BLOGS_BY_PK } from '@/graphql/blogs/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_BLOGS } from '@/routes/paths';

function EditBlogsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error } = useQuery(READ_BLOGS_BY_PK, {
    variables: { id },
  });

  return (
    <AdminLayout templateTitle='Edit Blog Category'>
      <AdminCrudLayout title='Edit Blog Category' previousLink={ADMIN_BLOGS}>
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Blog not found</p>
        ) : (
          // <EditBlogsProvider data={data.blogs_by_pk} />
          <></>
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditBlogsPage);
