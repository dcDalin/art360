import { createSlice } from '@reduxjs/toolkit';

export interface AuthFormsSlice {
  isSignUpFormLoading: boolean;
  isLoginFormLoading: boolean;
}

const initialState: AuthFormsSlice = {
  isSignUpFormLoading: false,
  isLoginFormLoading: false,
};

export const authFormsSlice = createSlice({
  name: 'authForms',
  initialState,
  reducers: {
    signUpFormLoading: (state: AuthFormsSlice) => {
      state.isSignUpFormLoading = true;
      state.isLoginFormLoading = false;
    },
    loginFormLoading: (state: AuthFormsSlice) => {
      state.isLoginFormLoading = true;
      state.isSignUpFormLoading = false;
    },
    stopAuthFormLoading: (state: AuthFormsSlice) => {
      state.isLoginFormLoading = false;
      state.isSignUpFormLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signUpFormLoading, loginFormLoading, stopAuthFormLoading } =
  authFormsSlice.actions;

export default authFormsSlice.reducer;
