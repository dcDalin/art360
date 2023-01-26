import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import EditSponsorImageProvider from '@/components/forms/Sponsors/EditSponsorImageProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_SPONSOR_BY_PK } from '@/graphql/sponsors/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_SPONSORS } from '@/routes/paths';

function EditArtistImagePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_SPONSOR_BY_PK, {
    variables: { id },
  });

  return (
    <AdminLayout templateTitle='Edit Sponsor Image'>
      <AdminCrudLayout title='Edit Sponsor Image' previousLink={ADMIN_SPONSORS}>
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Sponsor profile not found</p>
        ) : (
          <EditSponsorImageProvider data={data.sponsors_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditArtistImagePage);
