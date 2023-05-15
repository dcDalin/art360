import CreateAboutProvider from '@/components/forms/About/CreateAboutProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ABOUT } from '@/routes/paths';

function CreateBlogPage() {
  return (
    <AdminLayout templateTitle='About Page'>
      <AdminCrudLayout title='About Page' previousLink={ADMIN_ABOUT}>
        <CreateAboutProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateBlogPage);
