import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fieldData: [],
};

const fieldSlice = createSlice({
  name: 'field',
  initialState: initialState,
  reducers: {
    getField: (state, action) => {
      state.fieldData = action.payload;
    },
  },
});

export const { getField } = fieldSlice.actions;

export default fieldSlice.reducer;
