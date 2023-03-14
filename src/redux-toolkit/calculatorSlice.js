import { createSlice } from "@reduxjs/toolkit";

const calculatorSlice = createSlice({
  name: "calculator",
  initialState: [],
  reducers: {
    addCongThuc: (state, { payload }) => [...state, payload],
  },
});

export const { addCongThuc } = calculatorSlice.actions;
export default calculatorSlice.reducer;
