import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import ProductsTable from '@/components/tables/ProductsTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function ProductsPage() {
  return (
    <AdminLayout templateTitle='Products'>
      <AdminCrudLayout title='Products' createButton>
        <ProductsTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(ProductsPage);
