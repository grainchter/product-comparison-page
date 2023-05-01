import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPayload } from "../interfaces/interfaces";

interface storeState {
  values: object;
  countElementsShow: number;
  showData: Array<Object>;
  hideData: Array<Object>;
}

const initialState = {
  values: {
    countElementsShow: 0,
    showData: {},
    hideData: {},
  },
} as storeState;

const storeSlice = createSlice({
  name: "editValues",
  initialState: initialState,
  reducers: {
    changeValue: (state: any, { payload }: PayloadAction<TPayload>) => {
      state.values = payload.values;
    },
  },
});

export const { changeValue } = storeSlice.actions;

export const storeReducer = storeSlice.reducer;
