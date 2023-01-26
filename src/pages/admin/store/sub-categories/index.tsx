import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import SubCategoriesTable from '@/components/tables/SubCategoriesTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function SubCategoriesPage() {
  return (
    <AdminLayout templateTitle='Product Sub Categories'>
      <AdminCrudLayout title='Product Sub Categories' createButton>
        <SubCategoriesTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(SubCategoriesPage);
