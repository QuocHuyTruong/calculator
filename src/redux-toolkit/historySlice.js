import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: [],
  reducers: {
    addHistory: (state, { payload }) => [...state, payload],
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
