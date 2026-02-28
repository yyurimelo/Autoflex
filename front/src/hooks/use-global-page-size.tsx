import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPageSize } from "@/store/pagination.slice";

export function useGlobalPageSize() {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector(
    (state) => state.pagination.pageSize
  );

  function setSize(size: number) {
    dispatch(setPageSize(size));
  }

  return {
    pageSize,
    setSize,
  };
}