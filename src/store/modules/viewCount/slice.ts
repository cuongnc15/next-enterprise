import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const countSlice = createSlice({
  name: 'viewCount',
  initialState: initialState,
  reducers: {
    incrementView: (state) => {
      state.value += 1;
    },
  },
});

export const { incrementView } = countSlice.actions;

export default countSlice.reducer;
