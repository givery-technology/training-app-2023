import { createSlice } from '@reduxjs/toolkit';

import { Hello } from '../models';
import { APIService } from '../services';

export type HelloState = {
  hello?: Hello;
};

export const initialState: HelloState = {};

export const helloSlice = createSlice({
  name: 'hello',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(APIService.getHello.fulfilled, (state, action) => {
      state.hello = action.payload;
    });
  },
});

export default helloSlice.reducer;
