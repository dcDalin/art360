import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  isAdminCRUDModalOpen: boolean;
  adminModalToOpen: string | null;
}

const initialState: ModalState = {
  isAdminCRUDModalOpen: false,
  adminModalToOpen: null,
};

export const adminCRUDModalSlice = createSlice({
  name: 'adminCRUDModal',
  initialState,
  reducers: {
    openAdminCRUDModal: (state: ModalState, action: PayloadAction<string>) => {
      state.isAdminCRUDModalOpen = true;
      state.adminModalToOpen = action.payload;
    },
    closeModals: (state: ModalState) => {
      state.isAdminCRUDModalOpen = false;
      state.adminModalToOpen = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openAdminCRUDModal, closeModals } = adminCRUDModalSlice.actions;

export default adminCRUDModalSlice.reducer;
