import CreateSubCategoriesProvider from '@/components/forms/SubCategories/CreateSubCategoriesProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_STORE_SUB_CATEGORIES } from '@/routes/paths';

function CreateSubCategoryPage() {
  return (
    <AdminLayout templateTitle='Create Product Sub Category'>
      <AdminCrudLayout
        title='Create Product Sub Category'
        previousLink={ADMIN_STORE_SUB_CATEGORIES}
      >
        <CreateSubCategoriesProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateSubCategoryPage);
