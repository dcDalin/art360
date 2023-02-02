/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFormData {
  name?: string;
  price?: number;
  description?: string;
}

export interface AuthFormsSlice {
  activeFormStep: number;
  formData: IFormData;
  imageData: any;
}

const initialState: AuthFormsSlice = {
  activeFormStep: 1,
  formData: {
    name: '',
    price: 0,
    description: '',
  },
  imageData: {},
};

export const createProductSlice = createSlice({
  name: 'creteProduct',
  initialState,
  reducers: {
    changeActiveStep: (
      state: AuthFormsSlice,
      action: PayloadAction<number>
    ) => {
      state.activeFormStep = action.payload;
    },
    handleFormData: (
      state: AuthFormsSlice,
      action: PayloadAction<IFormData>
    ) => {
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    },
  },
});

export const { changeActiveStep, handleFormData } = createProductSlice.actions;

export default createProductSlice.reducer;
