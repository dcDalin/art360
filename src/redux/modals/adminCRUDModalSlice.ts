/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAdminModalPayload {
  adminModalToOpen: string | null;
  formData: any;
}
export interface ModalState {
  isAdminCRUDModalOpen: boolean;
  adminModalPayload: IAdminModalPayload;
}

const initialState: ModalState = {
  isAdminCRUDModalOpen: false,
  adminModalPayload: {
    adminModalToOpen: null,
    formData: {},
  },
};

export const adminCRUDModalSlice = createSlice({
  name: 'adminCRUDModal',
  initialState,
  reducers: {
    openAdminCRUDModal: (
      state: ModalState,
      action: PayloadAction<IAdminModalPayload>
    ) => {
      state.isAdminCRUDModalOpen = true;
      state.adminModalPayload = action.payload;
    },
    closeModals: (state: ModalState) => {
      state.isAdminCRUDModalOpen = false;
      state.adminModalPayload = {
        adminModalToOpen: null,
        formData: {},
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { openAdminCRUDModal, closeModals } = adminCRUDModalSlice.actions;

export default adminCRUDModalSlice.reducer;
