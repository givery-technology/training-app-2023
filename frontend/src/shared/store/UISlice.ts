import { createSlice } from '@reduxjs/toolkit';

import { APIService } from '../services';

export type UIState = {
  ready: boolean;
};

export const initialState: UIState = {
  /**
   * ready for rendering
   */
  ready: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(APIService.getUser.fulfilled, (state) => {
      state.ready = true;
    });

    builder.addCase(APIService.getUser.rejected, (state) => {
      state.ready = true;
    });
  },
});

export default uiSlice.reducer;
