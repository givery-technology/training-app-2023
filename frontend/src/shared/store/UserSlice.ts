import { createSlice } from '@reduxjs/toolkit';

import { User } from '../models';
import { APIService } from '../services';

export type UserState = {
  user?: User;
  signIn: {
    error: boolean;
  };
};

export const initialState: UserState = {
  signIn: { error: false },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(APIService.signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.signIn.error = false;
      window.location.replace('/');
    });

    builder.addCase(APIService.signIn.rejected, (state) => {
      state.signIn.error = true;
    });

    builder.addCase(APIService.getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(APIService.signOut.fulfilled, (state) => {
      state.user = undefined;
      window.location.replace('/');
    });
  },
});

export default userSlice.reducer;
