import { createAsyncThunk } from '@reduxjs/toolkit';

import { Hello } from '../models';

const API_ENDPOINT_PATH =
  import.meta.env.VITE_API_ENDPOINT_PATH ?? '';

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return await response.json();
});
