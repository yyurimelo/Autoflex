import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./pagination.slice";
import filtersReducer from "./filters.slice"

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    filters: filtersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;