import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  isSettingsModalOpen: boolean;
  modalToOpen: string | null;
}

const initialState: ModalState = {
  isSettingsModalOpen: false,
  modalToOpen: null,
};

export const updateSettingsModalSlice = createSlice({
  name: 'updateSettingsModal',
  initialState,
  reducers: {
    openSettingsModal: (state: ModalState, action: PayloadAction<string>) => {
      state.isSettingsModalOpen = true;
      state.modalToOpen = action.payload;
    },
    closeModals: (state: ModalState) => {
      state.isSettingsModalOpen = false;
      state.modalToOpen = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSettingsModal, closeModals } =
  updateSettingsModalSlice.actions;

export default updateSettingsModalSlice.reducer;
