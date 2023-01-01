import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function AdminPage() {
  return (
    <AdminLayout templateTitle='Admin Dashboard'>
      <h2>dash goes here</h2>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(AdminPage);
