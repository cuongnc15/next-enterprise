import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataCandidate: [],
};

const countSlice = createSlice({
  name: 'detailCandidate',
  initialState: initialState,
  reducers: {
    getDetailCandidate: (state, action) => {
      state.dataCandidate = action.payload;
    },
  },
});

export const { getDetailCandidate } = countSlice.actions;

export default countSlice.reducer;
