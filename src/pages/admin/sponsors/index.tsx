import { useDispatch } from 'react-redux';

import AdminCrudLayout from '@/components/layout/AdminCrudLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import SponsorsTable from '@/components/tables/SponsorsTable';

import { CREATE_ADMIN_SPONSORS_MODAL } from '@/constants/modalNames';
import withAdminAuthenticated from '@/HOC/withAdminAuthenticated';
import { openAdminCRUDModal } from '@/redux/modals/adminCRUDModalSlice';

function SponsorsPage() {
  const dispatch = useDispatch();
  return (
    <AdminLayout templateTitle='Sponsors'>
      <AdminCrudLayout
        handleClick={() =>
          dispatch(openAdminCRUDModal(CREATE_ADMIN_SPONSORS_MODAL))
        }
        title='Sponsors'
      >
        <SponsorsTable />
      </AdminCrudLayout>
    </AdminLayout>
  );
}

export default withAdminAuthenticated(SponsorsPage);
