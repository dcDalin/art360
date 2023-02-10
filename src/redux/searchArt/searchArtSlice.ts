/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchArtSlice {
  filtersActive: boolean;
  searchString: string;
  minPrice: number | null;
  maxPrice: number | null;
  artist: string | null;
  category: string | null;
}

const initialState: SearchArtSlice = {
  searchString: '',
  minPrice: null,
  maxPrice: null,
  artist: '',
  category: null,
  filtersActive: false,
};

export const searchArtSlice = createSlice({
  name: 'searchArt',
  initialState,
  reducers: {
    setSearchString: (state: SearchArtSlice, action: PayloadAction<string>) => {
      state.searchString = action.payload;
      state.filtersActive = true;
    },
    setArtist: (
      state: SearchArtSlice,
      action: PayloadAction<string | null>
    ) => {
      state.artist = action.payload;
      state.filtersActive = true;
    },
    setCategoryFilter: (
      state: SearchArtSlice,
      action: PayloadAction<string | null>
    ) => {
      state.category = action.payload;
      state.filtersActive = true;
    },

    clearFilters: (state: SearchArtSlice) => {
      state.searchString = '';
      state.minPrice = null;
      state.maxPrice = null;
      state.artist = null;
      state.category = null;
      state.filtersActive = false;
    },
  },
});

export const { setSearchString, setArtist, clearFilters, setCategoryFilter } =
  searchArtSlice.actions;

export default searchArtSlice.reducer;
