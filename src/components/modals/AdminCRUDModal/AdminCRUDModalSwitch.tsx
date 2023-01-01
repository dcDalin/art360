import { useSelector } from 'react-redux';

import CreateSponsorProvider from '@/components/forms/Sponsors/CreateSponsorProvider';

import { CREATE_ADMIN_SPONSORS_MODAL } from '@/constants/modalNames';
import { RootState } from '@/redux/store';

interface IAdminCRUDModalSwitchProps {
  title: string;
  children: React.ReactNode;
}

function AdminCRUDWrapper({ title, children }: IAdminCRUDModalSwitchProps) {
  return (
    <div>
      <h3 className='mb-4 text-lg font-bold'>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default function AdminCRUDModalSwitch() {
  const { adminModalToOpen } = useSelector(
    (state: RootState) => state.adminCRUDModal
  );

  switch (adminModalToOpen) {
    case CREATE_ADMIN_SPONSORS_MODAL:
      return (
        <AdminCRUDWrapper title='New sponsor'>
          <CreateSponsorProvider />
        </AdminCRUDWrapper>
      );

    default:
      return null;
  }
}
