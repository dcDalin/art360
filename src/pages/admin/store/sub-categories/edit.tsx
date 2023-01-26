import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import EditSubCategoriesProvider from '@/components/forms/SubCategories/EditSubCategoriesProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_SUB_CATEGORIES_BY_PK } from '@/graphql/subCategories/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_STORE_SUB_CATEGORIES } from '@/routes/paths';

function EditSubCategoriesPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_SUB_CATEGORIES_BY_PK, {
    variables: { id },
  });

  return (
    <AdminLayout templateTitle='Edit Product Sub Category'>
      <AdminCrudLayout
        title='Edit Product Sub Category'
        previousLink={ADMIN_STORE_SUB_CATEGORIES}
      >
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Product sub category not found</p>
        ) : (
          <EditSubCategoriesProvider data={data.sub_categories_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditSubCategoriesPage);
