import CreateBlogsProvider from '@/components/forms/Blogs/CreateBlogsProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_BLOGS } from '@/routes/paths';

function CreateBlogPage() {
  return (
    <AdminLayout templateTitle='Create Blog'>
      <AdminCrudLayout title='Create Blog' previousLink={ADMIN_BLOGS}>
        <CreateBlogsProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateBlogPage);
