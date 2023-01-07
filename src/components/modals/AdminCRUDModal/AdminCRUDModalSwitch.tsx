import { useDispatch, useSelector } from 'react-redux';

import CreateSponsorProvider from '@/components/forms/Sponsors/CreateSponsorProvider';
import UpdateSponsorImageProvider from '@/components/forms/Sponsors/UpdateSponsorImageProvider';
import UpdateSponsorProvider from '@/components/forms/Sponsors/UpdateSponsorProvider';
import AdminCRUDWrapper from '@/components/modals/AdminCRUDModal/AdminCRUDWrapper';

import {
  CREATE_ADMIN_SPONSORS_MODAL,
  UPDATE_ADMIN_SPONSORS_IMAGE_MODAL,
  UPDATE_ADMIN_SPONSORS_MODAL,
} from '@/constants/modalNames';
import { openAdminCRUDModal } from '@/redux/modals/adminCRUDModalSlice';
import { RootState } from '@/redux/store';

export default function AdminCRUDModalSwitch() {
  const {
    adminModalPayload: { adminModalToOpen },
  } = useSelector((state: RootState) => state.adminCRUDModal);

  const {
    adminModalPayload: {
      formData: { id, imageId, url, title, description },
    },
  } = useSelector((state: RootState) => state.adminCRUDModal);

  const dispatch = useDispatch();

  switch (adminModalToOpen) {
    case CREATE_ADMIN_SPONSORS_MODAL:
      return (
        <AdminCRUDWrapper title='New sponsor'>
          <CreateSponsorProvider />
        </AdminCRUDWrapper>
      );
    case UPDATE_ADMIN_SPONSORS_MODAL:
      return (
        <AdminCRUDWrapper title='Edit sponsor'>
          <UpdateSponsorProvider />
        </AdminCRUDWrapper>
      );
    case UPDATE_ADMIN_SPONSORS_IMAGE_MODAL:
      return (
        <AdminCRUDWrapper
          title='Edit sponsor'
          handleBackButton={() =>
            dispatch(
              openAdminCRUDModal({
                adminModalToOpen: UPDATE_ADMIN_SPONSORS_MODAL,
                formData: { description, id, title, url, imageId },
              })
            )
          }
        >
          <UpdateSponsorImageProvider />
        </AdminCRUDWrapper>
      );

    default:
      return null;
  }
}
