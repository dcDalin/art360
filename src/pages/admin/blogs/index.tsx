import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import BlogsTable from '@/components/tables/BlogsTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function BlogsPage() {
  return (
    <AdminLayout templateTitle='Blogs'>
      <AdminCrudLayout title='Blogs' createButton>
        <BlogsTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(BlogsPage);
