import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFilter,
  removeFilter,
  clearFilters,
} from "@/store/filters.slice";

export function useScopedFilters(scope: string) {
  const dispatch = useAppDispatch();

  const filters = useAppSelector(
    (state) => state.filters[scope] ?? {}
  );

  return {
    filters,

    setFilter: (key: string, value: any) =>
      dispatch(setFilter({ scope, key, value })),

    setPage: (page: number) => {
      dispatch(setFilter({ scope, key: "page", value: page }));
    },

    removeFilter: (alias: string | string[]) => {
      if (Array.isArray(alias)) {
        alias.forEach((key) =>
          dispatch(removeFilter({ scope, key }))
        );
        return;
      }

      dispatch(removeFilter({ scope, key: alias }));
    },

    clearFilters: () =>
      dispatch(clearFilters({ scope })),
  };
}