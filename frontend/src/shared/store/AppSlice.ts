import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Dummy } from '../models/Dummy';

export type AppState = {
  selectedPost?: Dummy;
};

export const initialState: AppState = {};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<{ post: Dummy }>) => {
      state.selectedPost = action.payload.post;
    }
  },
});

export default appSlice.reducer;
