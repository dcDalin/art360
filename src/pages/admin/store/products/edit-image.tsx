import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import EditProductImagesProvider from '@/components/forms/Products/EditProductImagesProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { FETCH_PRODUCTS_BY_PK } from '@/graphql/products/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function EditProductsImagePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(FETCH_PRODUCTS_BY_PK, {
    variables: { id, _eq: id },
  });

  return (
    <AdminLayout templateTitle='Edit Images'>
      <AdminCrudLayout>
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Product not found</p>
        ) : (
          <EditProductImagesProvider data={data.products_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditProductsImagePage);
