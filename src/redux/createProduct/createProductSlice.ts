/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFormData {
  name?: string;
  price?: number;
  description?: string;
}

export interface ProductFormSlice {
  activeFormStep: number;
  formData: IFormData;
  selectedCategory: any;
  selectedSubCategory: any;
  selectedArtist: any;
}

const initialState: ProductFormSlice = {
  activeFormStep: 1,
  formData: {
    name: '',
    price: 0,
    description: '',
  },
  selectedCategory: {
    label: '',
    value: '',
  },
  selectedSubCategory: {
    label: '',
    value: null,
  },
  selectedArtist: {
    label: '',
    value: '',
  },
};

export const createProductSlice = createSlice({
  name: 'creteProduct',
  initialState,
  reducers: {
    changeActiveStep: (
      state: ProductFormSlice,
      action: PayloadAction<number>
    ) => {
      state.activeFormStep = action.payload;
    },
    handleFormData: (
      state: ProductFormSlice,
      action: PayloadAction<IFormData>
    ) => {
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    },
    setSelectedCategory: (
      state: ProductFormSlice,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        selectedCategory: { ...state.selectedCategory, ...action.payload },
      };
    },
    setSelectedSubCategory: (
      state: ProductFormSlice,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        selectedSubCategory: {
          ...state.selectedSubCategory,
          ...action.payload,
        },
      };
    },
    setSelectedArtist: (
      state: ProductFormSlice,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        selectedArtist: { ...state.selectedArtist, ...action.payload },
      };
    },
  },
});

export const {
  changeActiveStep,
  handleFormData,
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedArtist,
} = createProductSlice.actions;

export default createProductSlice.reducer;
