import { useSelector } from 'react-redux';

import AdminCRUDModalSwitch from '@/components/modals/AdminCRUDModal/AdminCRUDModalSwitch';
import Modal from '@/components/modals/Modal';

import { RootState } from '@/redux/store';

export default function AdminCRUDModal() {
  const { isAdminCRUDModalOpen } = useSelector(
    (state: RootState) => state.adminCRUDModal
  );

  const open = isAdminCRUDModalOpen;
  return (
    <Modal open={open} size='lg'>
      <AdminCRUDModalSwitch />
    </Modal>
  );
}
