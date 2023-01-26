import CreateCategoriesProvider from '@/components/forms/Categories/CreateCategoriesProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_STORE_CATEGORIES } from '@/routes/paths';

function CreateArtistPage() {
  return (
    <AdminLayout templateTitle='Create Product Category'>
      <AdminCrudLayout
        title='Create Product Category'
        previousLink={ADMIN_STORE_CATEGORIES}
      >
        <CreateCategoriesProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateArtistPage);
