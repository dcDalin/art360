import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import EditGalleryProvider from '@/components/forms/Gallery/EditGalleryProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import TableLoader from '@/components/loaders/TableLoader';

import { READ_GALLERY_BY_PK } from '@/graphql/gallery/queries';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_GALLERY } from '@/routes/paths';

function EditGalleryItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(READ_GALLERY_BY_PK, {
    variables: { id },
  });

  return (
    <AdminLayout templateTitle='Edit Gallery'>
      <AdminCrudLayout title='Edit Gallery' previousLink={ADMIN_GALLERY}>
        {loading ? (
          <TableLoader />
        ) : error ? (
          <p>Gallery profile not found</p>
        ) : (
          <EditGalleryProvider data={data.gallery_by_pk} />
        )}
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(EditGalleryItemPage);
