import { createSlice } from '@reduxjs/toolkit';
import { CountState } from './types';

const initialState: CountState = {
  value: 0,
};

const countSlice = createSlice({
  name: 'count',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = countSlice.actions;

export default countSlice.reducer;
