import { combineReducers, configureStore } from "@reduxjs/toolkit";
import calculatorSlice from "./calculatorSlice";
import historySlice from "./historySlice";
const reducer = combineReducers({
  calculator: calculatorSlice,
  history: historySlice,
});

const store = configureStore({
  reducer,
});

export default store;
