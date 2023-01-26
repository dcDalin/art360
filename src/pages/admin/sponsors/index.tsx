import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import SponsorsTable from '@/components/tables/SponsorsTable';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';

function SponsorsPage() {
  return (
    <AdminLayout templateTitle='Sponsors'>
      <AdminCrudLayout title='Sponsors' createButton>
        <SponsorsTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(SponsorsPage);
