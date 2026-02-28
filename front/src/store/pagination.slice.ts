
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  pageSize: number;
}

const initialState: PaginationState = {
  pageSize: 10,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
});

export const { setPageSize } = paginationSlice.actions;
export default paginationSlice.reducer;