import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlockState } from "../types";

/* eslint no-param-reassign: "error" */

const initialState: BlockState = { currentBlock: 0, initialBlock: 0 };

export const blockSlice: any = createSlice({
  name: "Block",
  initialState,
  reducers: {
    setBlock: (state, action: PayloadAction<number>) => {
      if (state.initialBlock === 0) {
        state.initialBlock = action.payload;
      }

      state.currentBlock = action.payload;
    },
  },
});

// Actions
export const { setBlock } = blockSlice.actions;

export default blockSlice.reducer;
