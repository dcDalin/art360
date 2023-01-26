import CreateSponsorProvider from '@/components/forms/Sponsors/CreateSponsorProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_SPONSORS } from '@/routes/paths';

function CreateSponsorPage() {
  return (
    <AdminLayout templateTitle='Create Sponsor'>
      <AdminCrudLayout title='Create Sponsor' previousLink={ADMIN_SPONSORS}>
        <CreateSponsorProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateSponsorPage);
