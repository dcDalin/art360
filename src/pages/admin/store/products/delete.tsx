import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import DeleteProductsProvider from '@/components/forms/Products/DeleteProductsProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { FETCH_PRODUCTS_BY_PK } from '@/graphql/products/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_STORE_PRODUCTS } from '@/routes/paths';

function DeleteCategoriesPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(FETCH_PRODUCTS_BY_PK, {
    variables: { id, _eq: id },
  });

  return (
    <AdminLayout templateTitle='Delete Product'>
      <AdminCrudLayout
        title='Delete Product'
        previousLink={ADMIN_STORE_PRODUCTS}
      >
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Product not found</p>
        ) : (
          <DeleteProductsProvider data={data.products_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(DeleteCategoriesPage);
