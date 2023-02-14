import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import EditCategoriesProvider from '@/components/forms/Categories/EditCategoriesProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_CATEGORIES_BY_PK } from '@/graphql/categories/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_STORE_CATEGORIES } from '@/routes/paths';

function EditCategoriesPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_CATEGORIES_BY_PK, {
    variables: { id },
  });

  return (
    <AdminLayout templateTitle='Edit Product Category'>
      <AdminCrudLayout
        title='Edit Product Category'
        previousLink={ADMIN_STORE_CATEGORIES}
      >
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Product category not found</p>
        ) : (
          <EditCategoriesProvider data={data.categories_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditCategoriesPage);
