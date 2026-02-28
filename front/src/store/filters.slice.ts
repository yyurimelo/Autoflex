import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FiltersState = Record<string, Record<string, any>>;

interface RemoveFilterPayload {
  scope: string;
  key: string;
}

const initialState: FiltersState = {};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { scope, key, value } = action.payload;

      if (!state[scope]) state[scope] = {};

      state[scope][key] = value;

      if (key !== "page") {
        state[scope].page = 0;
      }
    },

    removeFilter(state, action: PayloadAction<RemoveFilterPayload>) {
      const { scope, key } = action.payload;
      delete state[scope]?.[key];
    },

    clearFilters(state, action: PayloadAction<{ scope: string }>) {
      delete state[action.payload.scope];
    },
  },
});

export const { setFilter, removeFilter, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;