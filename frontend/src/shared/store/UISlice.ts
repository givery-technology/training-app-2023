import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generate } from 'shortid';

import { APIService } from '../services';

export type UIState = {
  ready: boolean;
  toasts: { id: string; message: string }[];
};

export const initialState: UIState = {
  /**
   * ready for rendering
   */
  ready: false,
  /**
   * toast messages
   */
  toasts: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.toasts = [
        ...state.toasts,
        { id: generate(), message: action.payload },
      ];
    },
    hideToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((item) => item.id !== action.payload);
    },
  },
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
