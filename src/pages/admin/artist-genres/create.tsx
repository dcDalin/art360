import CreateArtistGenreProvider from '@/components/forms/ArtistGenre/CreateArtistGenresProvider';
import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';

import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { ADMIN_ARTISTS_GENRES } from '@/routes/paths';

function CreateArtistPage() {
  return (
    <AdminLayout templateTitle='Create Artist Genre'>
      <AdminCrudLayout
        title='Create Artist Genre'
        previousLink={ADMIN_ARTISTS_GENRES}
      >
        <CreateArtistGenreProvider />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(CreateArtistPage);
