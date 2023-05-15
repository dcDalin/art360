import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import AboutTable from '@/components/tables/AboutTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function BlogsPage() {
  return (
    <AdminLayout templateTitle='About'>
      <AdminCrudLayout title='About' createButton>
        <AboutTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(BlogsPage);
