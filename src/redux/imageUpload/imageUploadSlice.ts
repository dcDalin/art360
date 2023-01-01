import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImageUploadSlice {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

const initialState: ImageUploadSlice = {
  image: null,
};

export const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadNewImage: (state: ImageUploadSlice, action: PayloadAction<any>) => {
      state.image = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { uploadNewImage } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
