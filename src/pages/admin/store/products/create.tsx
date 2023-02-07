import CreateProductsProvider from '@/components/forms/Products/CreateProductsProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_STORE_PRODUCTS } from '@/routes/paths';

function CreateProductsPage() {
  return (
    <AdminLayout templateTitle='Create Product'>
      <AdminCrudLayout
        title='Create Product'
        previousLink={ADMIN_STORE_PRODUCTS}
      >
        <CreateProductsProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateProductsPage);
