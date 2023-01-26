import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import CategoriesTable from '@/components/tables/CategoriesTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function CategoriesPage() {
  return (
    <AdminLayout templateTitle='Product categories'>
      <AdminCrudLayout title='Product categories' createButton>
        <CategoriesTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CategoriesPage);
