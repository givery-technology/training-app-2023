import { createAsyncThunk } from '@reduxjs/toolkit';

import { Hello } from '../models';

const API_ENDPOINT_PATH =
  process.env.REACT_APP_API_ENDPOINT_PATH ?? 'http://localhost:9000';

export const getHello = createAsyncThunk<Hello>('getHello', async () => {
  const response = await fetch(`${API_ENDPOINT_PATH}/hello`);
  return await response.json();
});
